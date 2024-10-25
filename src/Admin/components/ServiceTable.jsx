import { useContext, useEffect, useState } from "react";
import ServicesContext from "../../context/ServiceContext";
import { priceFormatter } from "../../utils/priceFormatter";
import {
  CalendarCrossIcon,
  CalendarSettingsIcon,
  CheckIcon,
  XIcon,
} from "../../icons/index";
import Table from "../../shared/components/Table";
import { TableImage } from "../../shared/components/TableImage";
import "../../shared/css/tables.css";
import SearchComponent from "../../components/SearchComponent";

export const ServiceTable = ({ onSeleccionarServicio }) => {
  const { eliminarServicioAdmin, listaServicios, listaServiciosAdmin } =
    useContext(ServicesContext);

  const [searchType, setSearchType] = useState("cliente");
  const [searchResult, setSearchResult] = useState("");

  const handleSearch = (searchValue) => {
    // Maneja el valor de búsqueda emitido por el componente hijo
    console.log(`Buscando ${searchType}: ${searchValue}`);
    setSearchResult(searchValue);
  };

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
      className: "td-image-container",
      render: (image) => (
        <TableImage
          image={image}
          className="table-img"
          height={40}
          width={40}
        />
      ),
    },
    { key: "nombre", header: "Servicio" },
    {
      key: "descripcion",
      header: "Descripción",
      className: "service-description",
    },
    {
      key: "costo",
      header: "Costo",
      render: (costo) => priceFormatter(costo),
    },
    {
      key: "estado",
      header: "Estado",
      render: (estado) => (
        <span className={estado ? "status enable" : "status disable"}>
          {estado ? (
            <>
              Habilitado{" "}
              <CheckIcon color="#fff" size={18} className="check-icon" />
            </>
          ) : (
            <>
              Deshabilitado
              <XIcon color="#fff" size={18} className="x-icon" />
            </>
          )}
        </span>
      ),
    },
  ];

  const actions = [
    {
      label: "Modificar",
      title: "Editar Servicio",
      icon: (
        <CalendarSettingsIcon
          size={20}
          color="#171D2C"
          alt="Modificar servicio"
        />
      ),
      onClick: (servicio) => onSeleccionarServicio(servicio),
    },
    {
      label: "Cancelar",
      title: "Cancelar Servicio",
      icon: (
        <CalendarCrossIcon size={20} color="#171D2C" alt="Quitar servicio" />
      ),
      onClick: (servicio) => eliminarServicioAdmin(servicio.id),
    },
  ];

  return (
    <section className="appointments-content">
      <h2 className="appointment-table-header">Lista de Servicios</h2>
      <SearchComponent searchType={searchType} onSearch={handleSearch} />
        {sortedServices && sortedServices.length > 0 ? (
          <div className="appointment-table-container">
            <Table columns={columns} data={sortedServices} actions={actions} />
          </div>
        ) : (
          <p>No tienes turnos reservados</p>
        )}
    </section>
  );
};
