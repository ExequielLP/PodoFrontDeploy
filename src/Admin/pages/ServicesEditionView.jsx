import { useState } from "react";
import { ServiceTable } from "../components/ServiceTable";
import { EditService } from "../components/EditService";
import { Toaster } from "sonner";

export const ServicesEditionView = () => {
  const [servicioSeleccionado, setServicioSeleccionado] = useState(null);

  const handleSeleccionarServicio = (servicio) => {
    setServicioSeleccionado(servicio);
  };

  return (
    <>
      <ServiceTable onSeleccionarServicio={handleSeleccionarServicio} />
      {servicioSeleccionado && (
        <>
          <EditService servicio={servicioSeleccionado} />
          <Toaster className="toast-success toast-error toast-warning" />
        </>
      )}
    </>
  );
};
