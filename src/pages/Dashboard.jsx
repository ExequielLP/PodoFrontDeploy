import { useContext, useEffect, useState } from "react";
import ContextoAdministrador from "./../context/ContextLoginRegister";
import { TurnosAdmin } from "./../components/TurnosAdmin";
import { ServiceTable } from "./../components/ServiceTable";
import { RegisterService } from "../components/RegisterService";
import { AdminCardEdit } from "../components/AdminCardEdit";
import { useParams } from "react-router-dom";
import { Toaster } from "sonner";
import "./css/Dashboard.css";

const Dashboard = () => {
  const { section } = useParams();

  const { usuarioLogeado, arrayTurnosAdmin } = useContext(
    ContextoAdministrador
  );

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
      {usuarioLogeado.Auth === true && usuarioLogeado.Rol === "ADMIN" ? (
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
        </>
      ) : (
        <p>Se cerro tu sección</p>
      )}
    </main>
  );
};

export default Dashboard;
