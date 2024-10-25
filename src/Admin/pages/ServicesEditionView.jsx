import { useState } from "react";
import { ServiceTable } from "../components/ServiceTable";
import { EditService } from "../components/EditService";
import { Toaster } from "sonner";
import Breadcrumb from "../../shared/components/Breadcrumb";

export const ServicesEditionView = () => {
  const [servicioSeleccionado, setServicioSeleccionado] = useState(null);

  const handleSeleccionarServicio = (servicio) => {
    setServicioSeleccionado(servicio);
  };

  return (
    <section className="dashboard-section-container">
      <Breadcrumb title="Ver Servicios - Editar Servicios" />
      <ServiceTable onSeleccionarServicio={handleSeleccionarServicio} />
      {servicioSeleccionado && (
        <>
          <EditService servicio={servicioSeleccionado} />
          <Toaster className="toast-success toast-error toast-warning" />
        </>
      )}
    </section>
  );
};
