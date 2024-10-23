import { useEffect } from "react";
import ServicesContext from "../../context/ServiceContext";
import useContextValue from "../../hooks/useContextValue";
import useTitle from "../../hooks/useTitle";
import "./css/Dashboard.css";
import AuthenticationContext from "../../context/AuthContext";

const Dashboard = () => {
  useTitle({ title: "Panel Administrador" });
  const { arrayTurnosAdmin } = useContextValue(ServicesContext);
const { usuarioLogueado}= useContextValue(AuthenticationContext);

  useEffect(() => {}, [arrayTurnosAdmin]);

  return (
    <main className="dashboard-section">
      <h1 className="admin-title">
        ¡Bienvenido <span className="admin-userName">{usuarioLogueado.userName}</span>!
      </h1>
    </main>
  );
};
export default Dashboard;
