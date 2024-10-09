import { createContext, useEffect, useState, useCallback } from "react";
import { useLocation, useNavigate, matchPath } from "react-router-dom";
import { validateForm } from "../utils/register-validations";
import showToast from "../utils/toastUtils";
import { useHttp } from "../utils/http";

const {
  VITE_ENDPOINT_urlPostLogin: urlPostLogin,
  VITE_ENDPOINT_urlVerificarExpiracionToken: urlVerificarExpiracionToken,
  VITE_ENDPOINT_urlCrearUsuario: urlCrearUsuario,
  VITE_ENDPOINT_urlValidateGetUsuario: urlValidateGetUsuario,
  VITE_ENDPOINT_removeCookie: removeCookieFromUser,
} = import.meta.env;

const initialUserState = {
  auth: false,
  email: "",
  id: "",
  jwt: "",
  rol: "",
  userName: "",
};

const AuthenticationContext = createContext();
AuthenticationContext.displayName = "AuthenticationContext";

const AuthProvider = ({ children }) => {
  const [usuarioLogueado, setUsuarioLogueado] = useState(initialUserState);
  const location = useLocation();
  const navigate = useNavigate();

  
  const verifyAuthentication = useCallback(async () => {
          //DEVUELVE BOOLEAN TOKEN
          const cookieTokenExist = await verifyTokenExpiration();
          //DEVUELVE USUARIO LOGUEADO --> USUARIO LOGUEADO O NULL
          const isUserValid = await getUserFromToken();
    try {
      //!isUserValid->TRUE - cookieTokenExist-> FASLE - isAuthenticated() -> FASLE
      console.log("isUserValid", isUserValid, "cookieTokenExist", cookieTokenExist, "isAUTHENTICATED",isAuthenticated());
      if (isUserValid && cookieTokenExist && isAuthenticated()) {
        handleSessionExpiration()
      }

    } catch (error) {
      console.error("CATCH",error)
    }
  }, [usuarioLogueado]);

  useEffect(() => {
    verifyAuthentication();
  }, [usuarioLogueado]);

  const { get, getWithAuth, post, postLogout } = useHttp(
    verifyAuthentication()
  );

  const getUserFromToken = async () => {
    try {
      return await getWithAuth(urlValidateGetUsuario);
    } catch {
      showToast("Error al obtener usuario desde el token.", "error");
      return false;
    }
  };



  const updateUser = (usuario) => {
    setUsuarioLogueado({
      auth: true,
      email: usuario.email,
      id: usuario.id,
      jwt: usuario.jwt,
      rol: usuario.rol,
      userName: usuario.userName,
    });
  };

  // Verifica si el usuario está autenticado
  const isAuthenticated = () => {
    return usuarioLogueado.auth;
  };

  // Maneja la acción cuando la autorización falla
  const handleUnauthorized = () => {
    showToast("No estás autenticado. Por favor, inicia sesión.", "warning");
    setUsuarioLogueado(initialUserState);
    navigate("/login");
  };

  const handleSessionExpiration = useCallback(() => {
    const excludedPaths = ["/login", "/","/registro", "/servicio/*"];
    const isExcluded = excludedPaths.some((path) =>
      matchPath({ path, exact: true }, location.pathname)
    );

    if (!isExcluded) {
      showToast(
        "Su sesión ha expirado. Será redirigido a la página de inicio de sesión.",
        "warning"
      );
      setUsuarioLogueado(initialUserState);
      setTimeout(() => navigate("/login"), 2000);
    }
  }, [setUsuarioLogueado, navigate]);



  const submitRegistro = async (e, formRegistro) => {
    e.preventDefault();
    const errors = validateForm(formRegistro);
    if (errors.length > 0) {
      errors.forEach((error) => {
        showToast(error, "warning", {
          className: "toast-warning",
          style: { width: "fit-content" },
        });
      });
      return;
    }
    try {
      const respuesta = await post(urlCrearUsuario, formRegistro);
      if (respuesta) {
        navigate("/login");
      }
    } catch (error) {
      showToast("¡Error al ingresar datos del usuario!", "error");
      console.log(error, "Error al ingresar los datos de usuario");
    }
  };

  const submitLogin = async (e, formlogin) => {
    e.preventDefault();
    try {
      const respuesta = await post(urlPostLogin, formlogin);
      const usuarioRespuesta = {
        auth: true,
        email: respuesta.email,
        id: respuesta.id,
        jwt: respuesta.jwt,
        rol: respuesta.rol,
        userName: respuesta.userName,
      };
      setUsuarioLogueado(usuarioRespuesta);
      navigate("/");
    } catch (error) {
      showToast("¡Error al ingresar datos del usuario!", "error");
      console.error("Error al ingresar los datos de usuario", error);
    }
  };

  const logOut = async () => {
    try {
      const response = await postLogout(removeCookieFromUser);
      if (response.ok) {
        setUsuarioLogueado(initialUserState);
        navigate("/login");
      } else {
        showToast("No estás autenticado. Por favor, inicia sesión.", "warning");
      }
    } catch (error) {
      console.log(`Error en el Logout: ${error}`);
    }
  };

  const authContextValue = {
    logOut,
    submitLogin,
    submitRegistro,
    usuarioLogueado,
    setUsuarioLogueado,
    isAuthenticated, // Añadido para el interceptor
    handleUnauthorized, // Añadido para el interceptor
  };
  return (
    <AuthenticationContext.Provider value={authContextValue}>
      {children}
    </AuthenticationContext.Provider>
  );
};

export { AuthProvider };
export default AuthenticationContext;
