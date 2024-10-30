import { useContext, useEffect, useState } from "react";
import ServicesContext from "../../context/ServiceContext";
import { priceFormatter } from "../../utils/priceFormatter";
import {
  CalendarCrossIcon,
  CheckIcon,
  EditIcon,
  XIcon,
} from "../../icons/index";
import Table from "../../shared/components/Table";
import { TableImage } from "../../shared/components/TableImage";
import "../../shared/css/tables.css";
import SearchComponent from "../../components/SearchComponent";
import { Modal } from "../../shared/components/Modal";
import { ModalCancelService } from "../components/modals/ModalCancelService";
import { useModalContext } from "../../context/ModalContext";
import { EditService } from "./EditService";

export const ServiceTable = ({ onSeleccionarServicio }) => {
  const { eliminarServicioAdmin, listaServicios, listaServiciosAdmin } =
    useContext(ServicesContext);
  const { toggleModal } = useModalContext();
  const [searchType, setSearchType] = useState("cliente");
  const [searchResult, setSearchResult] = useState("");
  const [selectedService, setSelectedService] = useState(null);

  // Función para abrir modal de acción y establecer el servicio seleccionado
  const openModal = (service, actionType) => {
    setSelectedService(service);
    toggleModal(actionType); // Abre modal dependiendo la acción
  };

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
        <EditIcon
          size={20}
          color="#171D2C"
          alt="Modificar servicio"
        />
      ),
      // (servicio) => onSeleccionarServicio(servicio)
      onClick: (service) => openModal(service, "editService"),
    },
    {
      label: "Cancelar",
      title: "Cancelar Servicio",
      icon: (
        <CalendarCrossIcon size={20} color="#171D2C" alt="Quitar servicio" />
      ),
      onClick: (service) => openModal(service, "cancelService"),
    },
  ];

  return (
    <section className="appointments-content">
      <h2 className="appointment-table-header">Lista de Servicios</h2>
      <SearchComponent searchType={searchType} onSearch={handleSearch} />
      {sortedServices && sortedServices.length > 0 ? (
        <div className="appointment-table-container">
          <Table columns={columns} data={sortedServices} actions={actions} />
          <Modal modalType="cancelService">
            {selectedService && (
              <ModalCancelService
                service={selectedService}
                onClick={eliminarServicioAdmin}
              />
            )}
          </Modal>
          <Modal modalType="editService">
            {selectedService && <EditService service={selectedService} />}
          </Modal>
        </div>
      ) : (
        <p>No tienes turnos reservados</p>
      )}
    </section>
  );
};
