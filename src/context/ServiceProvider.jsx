import { createContext, useContext, useState } from "react";
import { get, getToken, postImagen, put } from "../utils/http";
import ContextoAdministrador from "./ContextLoginRegister";
import { toast } from "sonner";

const urlCrearServicio = import.meta.env.VITE_ENDPOINT_urlCrearServicio;
const urlListaServicios = import.meta.env.VITE_ENDPOINT_urlListaServicios;
const urlServicioGet = import.meta.env.VITE_ENDPOINT_urlServicioGet;
const urlBackListaTurno = import.meta.env.VITE_ENDPOINT_urlBackListaTurno;
const urlBackCancelarTurno = import.meta.env.VITE_ENDPOINT_urlBackCancelarTurno;
const urlBackListaTurnosAdmin = import.meta.env
  .VITE_ENDPOINT_urlBackListaTurnosAdmin;
const urlBackCancelarTurnoAdmin = import.meta.env
  .VITE_ENDPOINT_urlBackCancelarTurnoAdmin;
const urlBackListaServiciosAdmin = import.meta.env
  .VITE_ENDPOINT_urlBackListaServiciosAdmin;
const urlBackDarDeBajaServicioAdmin = import.meta.env
  .VITE_ENDPOINT_urlBackDarDeBajaServicioAdmin;
const VITE_ENDPOINT_urlBackModificaServicio = import.meta.env
  .VITE_ENDPOINT_urlBackModificaServicio;

const ServicesContext = createContext();

const ServicesProvider = ({ children }) => {
  const { usuarioLogeado, verificarExistenciaToken } = useContext(
    ContextoAdministrador
  );
  const [servicio, setServicio] = useState(null);
  const [listaServicios, setlistaServicios] = useState([]);
  const [arrayTurnos, setarrayTurnos] = useState([]);
  const [arrayTurnosAdmin, setArrayTurnosAdmin] = useState([]);

  /// Lista de SERVICIOS  para mostrarlos en inicio
  const serviciosBack = async () => {
    try {
      const respuesta = await get(urlListaServicios);
      setlistaServicios(respuesta);
    } catch (error) {
      console.log(error);
      console.log("Error al cargar los servicios");
    }
  };

  const SubmintCrearServicio = async (e, serviPodo) => {
    e.preventDefault();

    // Validación de campos requeridos
    /*     if (
          !serviPodo.nombre ||
          !serviPodo.descripcion ||
          !serviPodo.costo ||
          !serviPodo.imagen
        ) {
          toast.warning("Por favor, completa todos los campos requeridos.", {
            className: "toast-warning",
            style: { width: "fit-content" },
          });
          return;
        } */

    try {
      const token = verificarExistenciaToken();
      const respuest = await postImagen(urlCrearServicio, serviPodo, token);
      if (respuest) {
        toast.success(`¡${serviPodo.nombre} creado exitosamente!`, {
          className: "toast-success",
          style: { width: "fit-content" },
        });
        window.location.href = "/login";
      } else {
        toast.error(`¡Error al crear el servicio!`, {
          className: "toast-error",
          style: { width: "fit-content" },
        });
      }
      return console.log(respuest);
    } catch (error) {
      console.log("Error al cargar el servicio!");
      toast.error(
        "Ocurrió un error al crear el servicio. Inténtalo de nuevo.",
        {
          className: "toast-error",
          style: { width: "fit-content" },
        }
      );
    }
  };

  const seleccionarServicio = async (idServicio) => {
    try {
      const urlServicioId = urlServicioGet + idServicio;
      const respuest = await get(urlServicioId);
      setServicio(respuest);
    } catch (error) {
      console.log(error);
      console.log(`Error al seleccionar servicio: ${idServicio}`);
    }
  };

  const listaServiciosAdmin = async () => {
    try {
      const urlback = urlBackListaServiciosAdmin;
      let jwt = window.localStorage.getItem("auth_token");
      const respuesta = await getToken(urlback, jwt);
      setlistaServicios(
        respuesta
      ); /* si lo comentas, no se ejecuta el useEffect */
      console.log(listaServicios);
    } catch (error) {
      console.log("error al cargar la lista de servicios en el panel admin");
    }
  };

  const eliminarServicioAdmin = async (e, servicioId) => {
    try {
      e.preventDefault();
      let jwt = window.localStorage.getItem("auth_token");
      const urlCancelarServicio = urlBackDarDeBajaServicioAdmin + servicioId;
      const respuesta = await put(urlCancelarServicio, jwt);
      if (respuesta.ok) {
        toast.success(`¡Servicio: ${servicioId} dado de baja!`, {
          className: "toast-success",
          style: { width: "fit-content" },
        });
      }
      listaServiciosAdmin();
    } catch (error) {
      toast.error(`Error: ${servicioId} no ha sido dado de baja!`, {
        className: "toast-success",
        style: { width: "fit-content" },
      });
      console.log(
        "Error al eliminar un servicios de la lista de servicios en el admin dashboard "
      );
    }
  };

  const listaTurnos = async () => {
    try {
      const urlback = urlBackListaTurno + usuarioLogeado.id;
      let jwt = window.localStorage.getItem("auth_token");
      console.log("Hola desde listaTurnos()");
      const respuesta = await getToken(urlback, jwt);
      setarrayTurnos(respuesta);
    } catch (error) {
      console.log("Error al listar los turnos");
    }
  };

  const eliminarTurno = async (e, turnoId) => {
    try {
      e.preventDefault();
      let jwt = window.localStorage.getItem("auth_token");
      const urlCancelarTurno = urlBackCancelarTurno + turnoId;
      console.log("Hola desde eliminarTurno()");
      const respuesta = await getToken(urlCancelarTurno, jwt);
      if (respuesta.ok) {
        toast.success(`Turno: ${turnoId} eliminado con exíto!`, {
          className: "toast-success",
          style: { width: "fit-content" },
        });
      }
      listaTurnos();
    } catch (error) {
      console.log("error ");
    }
  };

  const listaTurnosAdmin = async () => {
    try {
      const urlback = urlBackListaTurnosAdmin;
      let jwt = window.localStorage.getItem("auth_token");
      console.log("Hola desde listaTurnosAdmin()");
      const respuesta = await getToken(urlback, jwt);
      setArrayTurnosAdmin(respuesta);
    } catch (error) {
      console.log("Error al traer los turnos del Administrador");
    }
  };

  const eliminarTurnoAdmin = async (e, turnoId) => {
    try {
      e.preventDefault();
      let jwt = window.localStorage.getItem("auth_token");
      const urlCancelarTurno = urlBackCancelarTurnoAdmin + turnoId;
      const respuesta = await put(urlCancelarTurno, jwt);
      if (respuesta.ok) {
        toast.success(`Turno: ${turnoId} eliminado con exíto!`, {
          className: "toast-success",
          style: { width: "fit-content" },
        });
      }
      listaTurnosAdmin();
    } catch (error) {
      console.log("error ");
    }
  };

  const submitModificarServicio = async (e, form) => {
    e.preventDefault();

    console.log("****Hola desde el modificarServicio****");
    const formData = new FormData();
    formData.append("id", form.id);
    formData.append("nombre", form.nombre);
    formData.append("descripcion", form.descripcion);
    formData.append("costo", form.costo);
    formData.append("file", form.file);
    try {
      let token = localStorage.getItem("auth_token");
      const response = await fetch(`${VITE_ENDPOINT_urlBackModificaServicio}`, {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: formData,
      });
      listaServiciosAdmin();

      if (response.ok) {
        toast.success(`¡Servicio: ${form.nombre} actualizado!`, {
          className: "toast-success",
          style: { width: "fit-content" },
        });

        window.location.hash = "#TablaServicios";
      } else {
        toast.error(`¡Error al actualizar ${form.nombre}!`, {
          className: "toast-error",
          style: { width: "fit-content" },
        });
        console.error("Error al modificar el servicio");
      }
    } catch (error) {
      console.error("Error en la solicitud:", error);
    }
  };

  const data = {
    servicio,
    listaServicios,
    arrayTurnos,
    arrayTurnosAdmin,
    serviciosBack,
    SubmintCrearServicio,
    seleccionarServicio,
    listaServiciosAdmin,
    eliminarServicioAdmin,
    listaTurnos,
    eliminarTurno,
    listaTurnosAdmin,
    eliminarTurnoAdmin,
    submitModificarServicio,
  };

  return (
    <ServicesContext.Provider value={data}>{children}</ServicesContext.Provider>
  );
};

export { ServicesProvider };
export default ServicesContext;
