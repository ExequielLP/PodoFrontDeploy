/* eslint-disable react/prop-types */
import { createContext, useState } from "react";
import { get, getToken, post, postImagen, put } from "../utils/http";
import { toast } from "sonner";
import { matchPath } from "react-router-dom";
import { validateForm } from "../utils/validations";

// http://localhost:8080/api/v1/auth/authenticate
//url para hacer login
const urlPostLogin = import.meta.env.VITE_ENDPOINT_urlPostLogin
const urlVerificarExpiracionToken = import.meta.env.VITE_ENDPOINT_urlVerificarExpiracionToken
const urlCrearServicio = import.meta.env.VITE_ENDPOINT_urlCrearServicio
const urlCrearUsuario = import.meta.env.VITE_ENDPOINT_urlCrearUsuario
const urlListaServicios = import.meta.env.VITE_ENDPOINT_urlListaServicios
const urlServicioGet = import.meta.env.VITE_ENDPOINT_urlServicioGet
const urlBackListaTurno = import.meta.env.VITE_ENDPOINT_urlBackListaTurno
const urlBackCancelarTurno = import.meta.env.VITE_ENDPOINT_urlBackCancelarTurno
const urlBackListaTurnosAdmin = import.meta.env.VITE_ENDPOINT_urlBackListaTurnosAdmin
const urlBackCancelarTurnoAdmin = import.meta.env.VITE_ENDPOINT_urlBackListaTurnosAdmin
const urlBackListaServiciosAdmin = import.meta.env.VITE_ENDPOINT_urlBackCancelarTurnoAdmin
const urlBackDarDeBajaServicioAdmin = import.meta.env.VITE_ENDPOINT_urlBackListaServiciosAdmin
const urlValidateGetUsuario = import.meta.env.VITE_ENDPOINT_urlValidateGetUsuario

const usuarioLogin = {
  id: "",
  userName: "",
  jwt: "",
  Rol: "",
  Auth: false,
};

const ContextoAdministrador = createContext();

const ContextLoginRegister = ({ children }) => {
  // creo el estado de usarios
  const [usuarioLogeado, setUsuarioLogeado] = useState(usuarioLogin);
  const [servicio, setServicio] = useState(null);
  const [listaServicios, setlistaServicios] = useState([]);
  const [arrayTurnos, setarrayTurnos] = useState([]);
  const [arrayTurnosAdmin, setArrayTurnosAdmin] = useState([]);

  const SubmitRegistro = async (e, formRegistro) => {
    e.preventDefault();

    // Llama a la función de validación
    const errors = validateForm(formRegistro);
    if (errors.length > 0) {
      errors.forEach((error) => {
        toast.warning(error, {
          className: "toast-warning",
          style: { width: "fit-content" },
        });
      });
      return;
    }

    try {
      const respuesta = await post(urlCrearUsuario, formRegistro);
      if (respuesta) {
        window.location.href = "/login";
      }
    } catch (error) {
      console.log(error);
      console.log("Error al ingresar los datos de usuario");
      toast.error(`¡Error al ingresar datos del usuario: ${errors}!`, {
        className: "toast-error",
        style: { width: "fit-content" },
      });
    }
  };

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

  // ACCION PARA LOGUEARSE Y RECIBIR EL TOKEN
  const SubmitLogin = async (e, formlogin) => {
    e.preventDefault();
    try {
      const respuesta = await post(urlPostLogin, formlogin);

      const usuarioRespuesta = {
        id: respuesta.id,
        userName: respuesta.userName,
        jwt: respuesta.jwt,
        Rol: respuesta.rol,
        Auth: true,
      };

      setUsuarioLogeado(usuarioRespuesta);
      window.localStorage.setItem("auth_token", respuesta.jwt);
    } catch (error) {
      console.log("Error al ingresar los datos de usuario");
      toast.error(`¡Error al ingresar datos del usuario!`, {
        className: "toast-error",
        style: { width: "fit-content" },
      });
    }
  };
  //VERIFICACION DE LOGIN AUTOMATICA
  const AuthTokenYUsiario = async () => {
    let token = verificarExistenciaToken();

    const urlFinal = urlVerificarExpiracionToken + token;
    const urlValidateGetUsuarioFinal = urlValidateGetUsuario + token;
    const usuarioValido = await GetUsuarioToken(
      urlValidateGetUsuarioFinal,
      token
    );
    console.log(usuarioLogeado.Auth);
    if (usuarioLogeado.Auth === false && usuarioValido) {
      const usuarioRespuesta = {
        id: usuarioValido.id,
        userName: usuarioValido.userName,
        jwt: usuarioValido.jwt,
        Rol: usuarioValido.rol,
        Auth: true,
      };
      setUsuarioLogeado(usuarioRespuesta);
    } else if (verificarExistenciaToken() && !usuarioValido) {
      const excludedPaths = ["/login", "registro", "/", "/servicio/*"]; // Agrega aquí las rutas que quieres excluir
      const isExcluded = excludedPaths.some((path) =>
        matchPath({ path, exact: true }, location.pathname)
      );
      if (!isExcluded) {
        toast.warning("Su sesión expiro. Usted sera redirigido!", {
          className: "toast-warning",
          style: { width: "fit-content" },
        });
        setTimeout(function () {
          window.location.href = "/login";
        }, 2000);
      }
    }
  };

  const GetUsuarioToken = async (urlValidateGetUsuarioFinal, token) => {
    try {
      const respuesta = await getToken(urlValidateGetUsuarioFinal, token);
      return respuesta;
    } catch (error) {
      return false;
    }
  };

  const verificarExistenciaToken = () => {
    let jwt = window.localStorage.getItem("auth_token");
    if (!jwt) return false;
    return jwt;
  };

  const VerificarExpericacionToken = async (urlVerificarExpiracionToken) => {
    const respuesta = await get(urlVerificarExpiracionToken);
    return respuesta;
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
      console.log("holuuuu oasi ek serListaServicio");
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

  const logOut = () => {
    window.localStorage.removeItem("auth_token");
    window.location.href = "/login";
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
      const response = await fetch(
        "http://localhost:8080/adminController/ModificarServicio",
        {
          method: "PUT",
          headers: {
            Authorization: `Bearer ${token}`,
          },
          body: formData,
        }
      );
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
    VerificarExpericacionToken,
    SubmitLogin,
    usuarioLogeado,
    AuthTokenYUsiario,
    SubmintCrearServicio,
    SubmitRegistro,
    listaServicios,
    serviciosBack,
    seleccionarServicio,
    servicio,
    arrayTurnos,
    listaTurnos,
    eliminarTurno,
    arrayTurnosAdmin,
    listaTurnosAdmin,
    eliminarTurnoAdmin,
    listaServiciosAdmin,
    eliminarServicioAdmin,
    logOut,
    submitModificarServicio,
  };
  return (
    <ContextoAdministrador.Provider value={data}>
      {children}
    </ContextoAdministrador.Provider>
  );
};

export { ContextLoginRegister };
export default ContextoAdministrador;
