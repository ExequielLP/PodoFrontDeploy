import { Navigate } from "react-router-dom";
import useContextValue from "../hooks/useContextValue";
import AuthenticationContext from "../context/AuthContext";

const ProtectedRoute = ({ children }) => {
  const { usuarioLogueado } = useContextValue(AuthenticationContext);

  return usuarioLogueado.auth ? children : <Navigate to="/login" />;
};

export default ProtectedRoute;