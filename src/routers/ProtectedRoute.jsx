import { Navigate, Outlet } from "react-router-dom";
import useContextValue from "../hooks/useContextValue";
import AuthenticationContext from "../context/AuthContext";

const ProtectedRoute = ({ children }) => {
  const { usuarioLogueado } = useContextValue(AuthenticationContext);


  if (!usuarioLogueado.auth) {
    return <Navigate to="/login" />;
  }

  return children ? children : <Outlet />;

};

export default ProtectedRoute;