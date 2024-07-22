import { Route, Routes } from "react-router-dom";
import Inicio from "../pages/Inicio";
import Login from "../pages/Login";
import Servicios from "../pages/Servicios";
import Dashboard from "../pages/Dashboard";
import ContextoAdministrador from "./../context/ContextLoginRegister";
import { useContext } from "react";

const AuthRoutes = () => {
  const { usuarioLogeado } = useContext(ContextoAdministrador);
  console.log(usuarioLogeado);
  return (
    <>
      <Routes>
        <Route path="/" element={<Inicio />} />
        <Route path="/servicio/:id" element={<Servicios />} />
        <Route path="/login" element={<Login />} />
        {usuarioLogeado.Auth === true && usuarioLogeado.Rol === "ADMIN" ? (
          <Route path="/admin/:section" element={<Dashboard />} />
        ) : (
          <Route path="/login" element={<Login />} />
        )}
      </Routes>
    </>
  );
};

export default AuthRoutes;
