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
    const excludedPaths = ["/login", "/", "/registro", "/servicio/*", "/password-recovery", "/sobre-nosotros", "/create-new-password/*"];
    const isExcluded = excludedPaths.some((path) =>
      matchPath({ path, exact: true }, location.pathname)
    );

    if (!isExcluded) {
      setUsuarioLogueado(initialUserState);
      console.log("!isExcluded")
      setTimeout(() => navigate("/login"), 2000);
      return
    } else if (usuarioLogueado.auth === true && isExcluded) {
      setUsuarioLogueado(initialUserState);
      setTimeout(() => navigate("/login"), 1000);
      return
    }
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
      console.error("Usuario no logueado:",userError)
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
    isAuthenticated,
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
