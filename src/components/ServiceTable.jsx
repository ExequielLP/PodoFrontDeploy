import { useContext, useEffect } from "react";
import ServicesContext from "./../context/ServiceContext";
import { priceFormatter } from "../utils/priceFormatter";
import { CalendarCrossIcon, CalendarSettingsIcon } from "../icons/index";
import Table from "../shared/components/Table";
import { TableImage } from "../shared/components/TableImage";
import "../shared/css/Tablas-Admin.css";

export const ServiceTable = ({ onSeleccionarServicio }) => {
  const { eliminarServicioAdmin, listaServicios, listaServiciosAdmin } =
    useContext(ServicesContext);

  useEffect(() => {
    listaServiciosAdmin();
  }, []);

  // Ordenar los servicios alfabéticamente por nombre
  const sortedServices = [...listaServicios].sort((a, b) =>
    a.nombre > b.nombre ? 1 : -1
  );

  const columns = [
    {
      key: "imagen",
      header: "Imagen",
      render: (image) => <TableImage image={image} />,
    },
    { key: "nombre", header: "Nombre del servicio" },
    { key: "descripcion", header: "Descripción del servicio" },
    {
      key: "costo",
      header: "Costo",
      render: (costo) => priceFormatter(costo),
    },
    {
      key: "estado",
      header: "Estado del servicio",
      render: (estado) => (
        <span className={estado ? "habilitado" : "deshabilitado"}>
          {estado ? "Habilitado" : "Deshabilitado"}
        </span>
      ),
    },
  ];

  const actions = [
    {
      label: "Modificar",
      icon: (
        <CalendarSettingsIcon
          size={24}
          color="#050505"
          alt="Modificar servicio"
        />
      ),
      onClick: (servicio) => onSeleccionarServicio(servicio),
    },
    {
      label: "Cancelar",
      icon: (
        <CalendarCrossIcon size={24} color="#050505" alt="Quitar servicio" />
      ),
      onClick: (servicio) => eliminarServicioAdmin(servicio.id),
    },
  ];

  return (
    <section className="tabla-admin" id="TablaServicios">
      <div className="accordion" id="accordionExample">
        <div className="accordion-item">
          <h2 className="accordion-header">
            <button
              className="accordion-button"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#collapseOne"
              aria-expanded="true"
              aria-controls="collapseOne"
            >
              Servicios agregados
            </button>
          </h2>
          <div
            id="collapseOne"
            className="accordion-collapse collapse show"
            data-bs-parent="#accordionExample"
          >
            <div className="accordion-body tabla-admin-body table-responsive">
              {sortedServices && sortedServices.length > 0 ? (
                <Table
                  columns={columns}
                  data={sortedServices}
                  actions={actions}
                />
              ) : (
                <p>No tienes turnos reservados</p>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
