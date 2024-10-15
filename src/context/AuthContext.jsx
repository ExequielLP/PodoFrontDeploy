import { createContext, useEffect, useState, useCallback } from "react";
import { useLocation, useNavigate, matchPath } from "react-router-dom";
import { validateForm } from "../utils/register-validations";
import showToast from "../utils/toastUtils";
import useFetch from "../hooks/useFetch";

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

  // Maneja la acción cuando la autorización falla
  const handleUnauthorized = () => {
    console.log("handleUnauthorized")
    console.log(usuarioLogueado)
    console.log(window.location.pathname)

    // if (window.location.pathname === "/" && usuarioLogueado.rol === "USER") {
    //   console.log("REDIRIGE?")
    //   setUsuarioLogueado(initialUserState);
    //   navigate("/login");
    //   return
    // } else if (window.location.pathname === "/servicio/*" && usuarioLogueado.rol === "USER") {
    //   console.log("REDIRIGE?")
    //   setUsuarioLogueado(initialUserState);
    //   navigate("/login");
    //   return
    // }


    const excludedPaths = ["/login", "/", "/registro", "/servicio/*"];
    const isExcluded = excludedPaths.some((path) =>
      matchPath({ path, exact: true }, location.pathname)
    );

    if (!isExcluded) {
      setUsuarioLogueado(initialUserState);
      setTimeout(() => navigate("/login"), 2000);
      return
    } else if (isExcluded && usuarioLogueado.auth === true)
      setUsuarioLogueado(initialUserState);
    setTimeout(() => navigate("/login"), 2000);
    return
  }

  //INICIALIZA EL HOOK POSTERIOR A LA FUNCIÓN
  const { fetchData } = useFetch(handleUnauthorized);

  const verifyAuthentication = async () => {
    const { data: tokenData, error: tokenError } = await fetchData(
      urlVerificarExpiracionToken,
      { method: "GET" },
      handleUnauthorized
    );
    const { data: userData, error: userError } = await fetchData(
      urlValidateGetUsuario,
      { method: "GET" },
      handleUnauthorized
    );

    if (tokenData && usuarioLogueado.auth === false) {
      updateUser(userData);
    } else if (userError) {
      showToast("Error al obtener usuario desde el token.", "error");
    }
  };

  useEffect(() => {
    verifyAuthentication();
  }, [usuarioLogueado]);

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

  const handleSessionExpiration = useCallback(() => {
    const excludedPaths = ["/login", "/", "/registro", "/servicio/*"];
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
        showToast(`Error al cargar ${error} en el registro`, "error");
      });
      return;
    }
    try {
      const { data: registerUser, error: registerError } = await fetchData(
        urlCrearUsuario,
        { method: "POST", body: JSON.stringify(formRegistro) }
      );
      if (registerUser) {
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
      const { data: loginData, error: loginError } = await fetchData(
        urlPostLogin,
        { method: "POST", body: JSON.stringify(formlogin) }
      );
      if (loginError) {
        showToast("¡Error al ingresar datos del usuario!", "error");
      } else {
        updateUser(loginData);
      }
      navigate("/");
    } catch (error) {
      showToast("¡Error al ingresar datos del usuario!", "error");
      console.error("Error al ingresar los datos de usuario", error);
    }
  };

  const logOut = async () => {
    try {
      const { data: cookieData, error: cookieError } = await fetchData(
        removeCookieFromUser,
        { method: "POST" }
      );
      if (cookieData) {
        setUsuarioLogueado(initialUserState);
        navigate("/login");
      } else {
        showToast("No estás autenticado. Por favor, inicia sesión.", "warning");
        console.log(cookieError);
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
    handleUnauthorized,
  };

  return (
    <AuthenticationContext.Provider value={authContextValue}>
      {children}
    </AuthenticationContext.Provider>
  );
}

export { AuthProvider };
export default AuthenticationContext;
