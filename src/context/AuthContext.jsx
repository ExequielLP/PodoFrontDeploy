/* eslint-disable react/prop-types */
import { createContext, useState } from "react";
import { get, getToken, post, postLogout } from "../utils/http";
import { toast } from "sonner";
import { matchPath } from "react-router-dom";
import { validateForm } from "../utils/register-validations";

//URL login --> http://localhost:8080/api/v1/auth/authenticate
const urlPostLogin = import.meta.env.VITE_ENDPOINT_urlPostLogin;
const urlVerificarExpiracionToken = import.meta.env.VITE_ENDPOINT_urlVerificarExpiracionToken;
const urlCrearUsuario = import.meta.env.VITE_ENDPOINT_urlCrearUsuario;
const urlValidateGetUsuario = import.meta.env.VITE_ENDPOINT_urlValidateGetUsuario;
const removeCookieFromUser = import.meta.env.VITE_ENDPOINT_removeCookie;
const usuarioLogin = {
  Auth: false,
  email: "",
  id: "",
  jwt: "",
  Rol: "",
  userName: "",
};

const ContextoAdministrador = createContext();

const AuthProvider = ({ children }) => {
  const [usuarioLogueado, setUsuarioLogeado] = useState(usuarioLogin);

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

  const SubmitLogin = async (e, formlogin) => {
    e.preventDefault();
    try {
      const respuesta = await post(urlPostLogin, formlogin);
      const usuarioRespuesta = {
        Auth: true,
        email: respuesta.email,
        id: respuesta.id,
        jwt: respuesta.jwt,
        Rol: respuesta.rol,
        userName: respuesta.userName,
      };
      setUsuarioLogeado(usuarioRespuesta);
      window.location.href = "/";
    } catch (error) {
      console.log("Error al ingresar los datos de usuario");
      toast.error(`¡Error al ingresar datos del usuario!`, {
        className: "toast-error",
        style: { width: "fit-content" },
      });
    }
  };

  //VERIFICACION DE LOGIN AUTOMATICA
  const AuthTokenYUsuario = async () => {
    let cookieTokenExist = await VerificarExperiracionToken(urlVerificarExpiracionToken);
    console.log(cookieTokenExist)


    const usuarioValido = await GetUsuarioToken(urlValidateGetUsuario);
    console.log(usuarioLogin)

    if (usuarioLogueado.Auth === false && usuarioValido) {
      const usuarioRespuesta = {
        id: usuarioValido.id,
        email: usuarioValido.email,
        jwt: usuarioValido.jwt,
        Rol: usuarioValido.rol,
        Auth: true,
      };
      setUsuarioLogeado(usuarioRespuesta);
    } else if (cookieTokenExist && !usuarioValido) {
      const excludedPaths = ["/login", "/", "/registro", "/servicio/*"];
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

  const GetUsuarioToken = async (urlValidateGetUsuarioFinal) => {
    try {
      const respuesta = await getToken(urlValidateGetUsuarioFinal);
      return respuesta;
    } catch (error) {
      return false;
    }
  };



  //Este método no esta en uso
  const VerificarExperiracionToken = async (urlVerificarExpiracionToken) => {
    const respuesta = await get(urlVerificarExpiracionToken);
    return respuesta;
  };

  const logOut = async () => {
    try {
      const removeCookie = await postLogout(removeCookieFromUser);
      console.log("reemovecokiee");
      console.log(removeCookie)
      if (removeCookie.ok) {
        console.log("Logout exitoso");
        window.location.href = "/login";
      } else {
        console.log("Error en el logout");
      }
    } catch (error) {
      console.log(`Error catch Logout ${error}`);
    }
  };

  const data = {
    AuthTokenYUsuario,
    logOut,
    SubmitLogin,
    SubmitRegistro,
    VerificarExperiracionToken,
    usuarioLogueado,
  };
  return (
    <ContextoAdministrador.Provider value={data}>
      {children}
    </ContextoAdministrador.Provider>
  );
};

export { AuthProvider };
export default ContextoAdministrador;
