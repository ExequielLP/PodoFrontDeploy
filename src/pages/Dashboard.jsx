import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Toaster } from "sonner";
import ContextoAdministrador from "./../context/AuthContext";
import ServicesContext from "../context/ServiceContext";
import useTitle from "./../hooks/useTitle";
import { AdminCardEdit } from "../components/AdminCardEdit";
import { AdminHolidayCalendar } from "../components/AdminHolidayCalendar";
import { RegisterService } from "../components/RegisterService";
import { ServiceTable } from "./../components/ServiceTable";
import { TurnosAdmin } from "./../components/TurnosAdmin";
import "./css/Dashboard.css";

const Dashboard = () => {
  const { section } = useParams();
  useTitle({ title: "Panel Administrador" });

  const { usuarioLogueado } = useContext(ContextoAdministrador);
  const { arrayTurnosAdmin } = useContext(ServicesContext);

  const [servicioSeleccionado, setServicioSeleccionado] = useState(null);

  const handleSeleccionarServicio = (servicio) => {
    setServicioSeleccionado(servicio);
  };

  useEffect(() => {}, [arrayTurnosAdmin]);

  return (
    <main className="dashboard-section">
      <h1 className="admin-title">
        ¡Bienvenido <span className="admin-userName">Admin</span>!
      </h1>
      {usuarioLogueado.Auth === true && usuarioLogueado.Rol === "ADMIN" ? (
        <>
          {section === "turnos" && <TurnosAdmin />}
          {section === "servicios" && (
            <>
              {" "}
              <RegisterService />
              <ServiceTable onSeleccionarServicio={handleSeleccionarServicio} />
              {servicioSeleccionado && (
                <>
                  <AdminCardEdit servicio={servicioSeleccionado} />
                  <Toaster className="toast-success toast-error toast-warning" />
                </>
              )}
            </>
          )}
          {section === "calendarioAdmin" && <AdminHolidayCalendar />}
        </>
      ) : (
        <p>Se cerro tu sección</p>
      )}
    </main>
  );
};

export default Dashboard;
