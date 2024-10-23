import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Toaster } from "sonner";
import AuthenticationContext from "./../context/AuthContext";
import ServicesContext from "../context/ServiceContext";
import useContextValue from "../hooks/useContextValue";
import useTitle from "./../hooks/useTitle";
import { EditService } from "../components/EditService";
import { AdminHolidayCalendar } from "../components/AdminHolidayCalendar";
import { RegisterService } from "../components/RegisterService";
import { ServiceTable } from "./../components/ServiceTable";
import { TurnosAdmin } from "./../components/TurnosAdmin";
import "./css/Dashboard.css";

const Dashboard = () => {
  const { section } = useParams();
  useTitle({ title: "Panel Administrador" });

  const { usuarioLogueado } = useContextValue(AuthenticationContext);
  const { arrayTurnosAdmin } = useContextValue(ServicesContext);
  const [servicioSeleccionado, setServicioSeleccionado] = useState(null);

  const handleSeleccionarServicio = (servicio) => {
    setServicioSeleccionado(servicio);
  };

  useEffect(() => {}, [arrayTurnosAdmin]);

  //Esto se renderiza en el Outlet
  const renderSectionContent = () => {
    switch (section) {
      case "turnos":
        return <TurnosAdmin />;
      case "servicios":
        return (
          <>
            <RegisterService />
            <ServiceTable onSeleccionarServicio={handleSeleccionarServicio} />
            {servicioSeleccionado && (
              <>
                <EditService servicio={servicioSeleccionado} />
                <Toaster className="toast-success toast-error toast-warning" />
              </>
            )}
          </>
        );
      case "calendarioAdmin":
        return <AdminHolidayCalendar />;
      default:
        return <p>Se cerró tu sección</p>;
    }
  };

  return (
    <main className="dashboard-section">
      <h1 className="admin-title">
        ¡Bienvenido <span className="admin-userName">Admin</span>!
      </h1>
      {usuarioLogueado.auth && usuarioLogueado.rol === "ADMIN" ? (
        renderSectionContent()
      ) : (
        <p>Acceso denegado</p>
      )}
    </main>
  );
};
export default Dashboard;
