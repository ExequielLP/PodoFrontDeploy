import { useContext, useEffect } from "react";
import ContextoAdministrador from "../context/ContextLoginRegister";
import { matchPath, Route, Routes } from "react-router-dom";
import PublicRoutes from "./PublicRoutes";
import AuthRoutes from "./AuthRoutes";

const AppRouters = () => {
  const { usuarioLogeado, AuthTokenYUsiario } = useContext(
    ContextoAdministrador
  );
  useEffect(() => {
    AuthTokenYUsiario();
  }, [AuthTokenYUsiario]);

  /* !!! */

  /* 
  --> AuthTokenYUsiario()
  1) BUSCAR SI HAY TOKEN EN LOCALSTRORAGE
  2) TRAER EL LOCAL SI HAY
  3) MANDAR A VALIDAR EL TOKEN SI EXPIRO O NO 
  4) TRAER EL USUARIO SI EL TOKEN NO EXPIRO
  5) RENDERIZAR COMPONENTE CORRESPONDIENTE AL USUARIO LOGEADO
  */

  return (
    <Routes>
      {usuarioLogeado.Auth === false ? (
        <Route path="/*" element={<PublicRoutes />} />
      ) : (
        <Route path="/*" element={<AuthRoutes />} />
      )}
    </Routes>
  );
};

export default AppRouters;
