import { createContext, useCallback, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import AuthenticationContext from "./AuthContext";
import useContextValue from "../hooks/useContextValue";
import { get, getWithAuth, postImagen, put } from "../utils/http";
import showToast from "../utils/toastUtils";

const API_URLS = {
  crearServicio: import.meta.env.VITE_ENDPOINT_urlCrearServicio,
  listaServicios: import.meta.env.VITE_ENDPOINT_urlListaServicios,
  servicioGet: import.meta.env.VITE_ENDPOINT_urlServicioGet,
  backListaTurno: import.meta.env.VITE_ENDPOINT_urlBackListaTurno,
  backCancelarTurno: import.meta.env.VITE_ENDPOINT_urlBackCancelarTurno,
  backListaTurnosAdmin: import.meta.env.VITE_ENDPOINT_urlBackListaTurnosAdmin,
  backCancelarTurnoAdmin: import.meta.env
    .VITE_ENDPOINT_urlBackCancelarTurnoAdmin,
  backListaServiciosAdmin: import.meta.env
    .VITE_ENDPOINT_urlBackListaServiciosAdmin,
  darDeBajaServicioAdmin: import.meta.env
    .VITE_ENDPOINT_urlBackDarDeBajaServicioAdmin,
  modificarServicio: import.meta.env.VITE_ENDPOINT_urlBackModificaServicio,
};

const ServicesContext = createContext();

const ServicesProvider = ({ children }) => {
  const { usuarioLogueado, setUsuarioLogueado } = useContextValue(AuthenticationContext);
  const [servicio, setServicio] = useState(null);
  const [listaServicios, setListaServicios] = useState([]);
  const [arrayTurnos, setArrayTurnos] = useState([]);
  const [arrayTurnosAdmin, setArrayTurnosAdmin] = useState([]);
  const location = useLocation();
  const navigate = useNavigate();
  const authToken = window.localStorage.getItem("auth_token");

  const serviciosBack = useCallback(async () => {
    try {
      const response = await get(API_URLS.listaServicios);
      setListaServicios(response);
    } catch (error) {
      console.log("Error al cargar los servicios", error);
      showToast("Error al cargar los servicios", "error");
    }
  }, []);

  const submitCrearServicio = async (e, serviPodo) => {
    e.preventDefault();
    try {
      const response = await postImagen(API_URLS.crearServicio, serviPodo);
      if (response) {
        showToast(`¡${serviPodo.nombre} creado exitosamente!`, "success");
        navigate("/login");
      } else {
        showToast("¡Error al crear el servicio!", "error");
      }
    } catch (error) {
      console.error("Error al cargar el servicio:", error);
      showToast(
        "Ocurrió un error al crear el servicio. Inténtalo de nuevo.",
        "error"
      );
    }
  };

  const seleccionarServicio = async (idServicio) => {
    try {
      const response = await get(`${API_URLS.servicioGet}${idServicio}`);
      setServicio(response);
    } catch (error) {
      console.error(`Error al seleccionar servicio: ${idServicio}`, error);
    }
  };

  const listaServiciosAdmin = async () => {
    try {
      const response = await getWithAuth(
        API_URLS.backListaServiciosAdmin,
        authToken
      );
      setListaServicios(response);
    } catch (error) {
      console.error(
        "Error al cargar la lista de servicios en el panel admin:",
        error
      );
    }
  };

  const eliminarServicioAdmin = async (servicioId) => {
    try {
      const response = await put(
        `${API_URLS.darDeBajaServicioAdmin}${servicioId}`,
        authToken
      );
      if (response.ok) {
        showToast(`¡Servicio: ${servicioId} dado de baja!`, "success");
        listaServiciosAdmin();
      }
    } catch (error) {
      console.error(`Error al eliminar el servicio ${servicioId}:`, error);
      showToast(`Error: ${servicioId} no ha sido dado de baja!`, "error");
    }
  };

  const listaTurnos = useCallback(async () => {
    if (!usuarioLogueado || !usuarioLogueado.id) {
      console.error("Usuario no logueado o ID no disponible");
      return;
    }
    try {
      const response = await getWithAuth(
        `${API_URLS.backListaTurno}${usuarioLogueado.id}`
      );
      if (Array.isArray(response)) {
        setArrayTurnos(response);
      } else {
        console.error("La respuesta no es un array:", response);
        setArrayTurnos([]);
      }
    } catch (error) {
      console.error("Error al listar los turnos:", error);
    }
  }, [usuarioLogueado]);

  const eliminarTurno = async (turnoId) => {
    try {
      const response = await getWithAuth(
        `${API_URLS.backCancelarTurno}${turnoId}`,
        authToken
      );
      if (response) {
        showToast(`Turno: ${turnoId} eliminado con éxito!`, "success");
        return true; // Indica éxito
      }
    } catch (error) {
      console.error("Error al eliminar el turno:", error);
      return false; // Indica fallo
    }
  };

  const listaTurnosAdmin = async (pageNumber = 0) => {
    try {
      const response = await getWithAuth(
        `${API_URLS.backListaTurnosAdmin}?page=${pageNumber}&size=10`,
        authToken
      );
      setArrayTurnosAdmin(response);
    } catch (error) {
      console.error("Error al traer los turnos del Administrador:", error);
    }
  };

  const eliminarTurnoAdmin = async (turnoId) => {
    try {
      const response = await put(
        `${API_URLS.backCancelarTurnoAdmin}${turnoId}`
      );
      if (response.ok) {
        showToast(`Turno: ${turnoId} eliminado con éxito!`, "success");
        // Devuelve la cantidad de turnos restantes
        return arrayTurnosAdmin.content.length - 1; // Decrementa en 1
      }
      // const turnosRestantes = arrayTurnosAdmin.content.length - 1;
      // listaTurnosAdmin(
      //   turnosRestantes === 0 && pageNumber > 0 ? pageNumber - 1 : pageNumber
      // );
    } catch (error) {
      console.error("Error al eliminar el turno admin:", error);
      return -1; // Indica error
    }
  };

  const submitModificarServicio = async (e, form) => {
    e.preventDefault();
    const formData = new FormData();
    // Object.entries(form).forEach(([key, value]) => formData.append(key, value));
    formData.append("id", form.id);
    formData.append("nombre", form.nombre);
    formData.append("descripcion", form.descripcion);
    formData.append("costo", form.costo);
    formData.append("file", form.file);
    try {
      const response = await fetch(API_URLS.modificarServicio, {
        method: "PUT",
        credentials: "include",
        body: formData,
      });
      if (response.ok) {
        showToast(`¡Servicio: ${form.nombre} actualizado!`, "success");
        listaServiciosAdmin();
        window.location.hash = "#TablaServicios";
      } else {
        console.log("hola serviv¿ici context")
        console.log(usuarioLogueado)
        const usuarioNoAuth = {
          auth: false,
          email: "",
          id: "",
          jwt: "",
          rol: "",
          userName: "",
        };
        setUsuarioLogueado(usuarioNoAuth);
        console.log("holis")
        showToast(`¡Error al actualizar ${form.nombre}!`, "error");
      }
    } catch (error) {
      console.error(
        "Error en la solicitud de modificación del servicio:",
        error
      );
      showToast("Ocurrió un error al modificar el servicio.", "error");
    }
  };

  const servicesValues = {
    arrayTurnos,
    arrayTurnosAdmin,
    listaServicios,
    servicio,
    eliminarServicioAdmin,
    eliminarTurno,
    eliminarTurnoAdmin,
    listaServiciosAdmin,
    listaTurnos,
    listaTurnosAdmin,
    seleccionarServicio,
    serviciosBack,
    submitCrearServicio,
    submitModificarServicio,
  };

  return (
    <ServicesContext.Provider value={servicesValues}>
      {children}
    </ServicesContext.Provider>
  );
};

export { ServicesProvider };
export default ServicesContext;
