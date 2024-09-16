/* eslint-disable react/prop-types */
import { createContext, useState } from "react";
import { get, getToken, post } from "../utils/http";
import { toast } from "sonner";
import { matchPath } from "react-router-dom";
import { validateForm } from "../utils/register-validations";

//URL login --> http://localhost:8080/api/v1/auth/authenticate
const urlPostLogin = import.meta.env.VITE_ENDPOINT_urlPostLogin;
const urlVerificarExpiracionToken = import.meta.env
  .VITE_ENDPOINT_urlVerificarExpiracionToken;
const urlCrearUsuario = import.meta.env.VITE_ENDPOINT_urlCrearUsuario;
const urlValidateGetUsuario = import.meta.env
  .VITE_ENDPOINT_urlValidateGetUsuario;
const removeCookieFromUser = import.meta.env.VITE_ENDPOINT_removeCookie;
const usuarioLogin = {
  id: "",
  userName: "",
  jwt: "",
  Rol: "",
  Auth: false,
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
  const AuthTokenYUsuario = async () => {
    let token = VerificarExistenciaDeToken();
    //↑↑ Método que devuelve el string JWT ↑↑
    console.log("entrnado a AuthTokenUsuario");
    //Esto se deberia limpiar si no se usa
    const urlFinal = urlVerificarExpiracionToken + token;
    //↑↑ No deberia pasarse al método que devuelve el booleano si el JWT es valido? ↑↑
    const urlValidateGetUsuarioFinal = urlValidateGetUsuario + token;
    const usuarioValido = await GetUsuarioToken(
      urlValidateGetUsuarioFinal,
      token
    );
    console.log("paso el usuarioValido()");
    console.log(usuarioValido);
    if (usuarioLogueado.Auth === false && usuarioValido) {
      const usuarioRespuesta = {
        id: usuarioValido.id,
        userName: usuarioValido.userName,
        jwt: usuarioValido.jwt,
        Rol: usuarioValido.rol,
        Auth: true,
      };
      setUsuarioLogeado(usuarioRespuesta);
    } else if (VerificarExistenciaDeToken() && !usuarioValido) {
      const excludedPaths = ["/login", "/", "/registro", "/servicio/*"]; // Agrega aquí las rutas que quieres excluir
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

  const VerificarExistenciaDeToken = () => {
    console.log("document.cookie");
    console.log(document.cookie);
    let jwt = window.localStorage.getItem("auth_token");
    if (!jwt) return false;
    return jwt;
  };

  //Este método no esta en uso
  const VerificarExperiracionToken = async (urlVerificarExpiracionToken) => {
    const respuesta = await get(urlVerificarExpiracionToken);
    return respuesta;
  };

  const logOut = async () => {
    try {
      const removeCookie = await post(removeCookieFromUser);
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
    VerificarExistenciaDeToken,
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
