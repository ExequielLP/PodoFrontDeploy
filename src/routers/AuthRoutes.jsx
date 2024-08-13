import { Route, Routes } from "react-router-dom";
import Inicio from "../pages/Inicio";
import Login from "../pages/Login";
import Servicios from "../pages/Servicios";
import Dashboard from "../pages/Dashboard";
import ContextoAdministrador from "./../context/AuthContext";
import { useContext } from "react";
import { About } from "./../pages/About";
import ListaTurnos from "../components/ListaTurnos";

const AuthRoutes = () => {
  const { usuarioLogueado } = useContext(ContextoAdministrador);
  console.log(usuarioLogueado);
  return (
    <>
      <Routes>
        <Route path="/" element={<Inicio />} />
        <Route path="/sobre-nosotros" element={<About />} />
        <Route path="/user/turnos" element={<ListaTurnos />} />
        <Route path="/servicio/:id" element={<Servicios />} />
        <Route path="/login" element={<Login />} />
        {usuarioLogueado.Auth === true && usuarioLogueado.Rol === "ADMIN" ? (
          <Route path="/admin/:section" element={<Dashboard />} />
        ) : (
          <Route path="/login" element={<Login />} />
        )}
      </Routes>
    </>
  );
};

export default AuthRoutes;
