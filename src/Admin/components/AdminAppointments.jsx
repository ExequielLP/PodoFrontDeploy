import { useEffect, useState } from "react";
import { format } from "date-fns";
import ServicesContext from "../../context/ServiceContext";
import useContextValue from "../../hooks/useContextValue";
import { priceFormatter } from "../../utils/priceFormatter";
import Pagination from "../../shared/components/Pagination";
import Table from "../../shared/components/Table";
import SearchComponent from "../../components/SearchComponent";
import {
  CalendarCrossIcon,
  CheckIcon,
  XIcon,
} from "../../icons/index";
import "../../shared/css/tables.css";
import { Modal } from "../../shared/components/Modal";
import { ModalCancelAppointment } from "../../shared/components/ModalCancelAppointment";
import { useModalContext } from "../../context/ModalContext";

export const AdminAppointments = () => {
  const { arrayTurnosAdmin, listaTurnosAdmin, eliminarTurnoAdmin } =
    useContextValue(ServicesContext);

  const [pageNumber, setPageNumber] = useState(0);
  //const [pageSize, setpageSize] = useState(10);
  const [shouldReload, setShouldReload] = useState(false); // Estado para controlar la recarga
  const [searchType, setSearchType] = useState("cliente");
  const [searchResult, setSearchResult] = useState("");
  const { toggleModal } = useModalContext();
  const [selectedTurno, setSelectedTurno] = useState(null);

  const openModal = (appointment) => {
    setSelectedTurno(appointment);
    toggleModal('cancelAppointmentAdmin');
  };


  // Ordenar turnos reservados por fecha
  const turnosReservados = arrayTurnosAdmin.content
    ?.filter((turno) => turno.estado === true)
    .sort((a, b) => new Date(a.startTime) - new Date(b.startTime));


  const handleSearch = (searchValue) => {
    // Maneja el valor de búsqueda emitido por el componente hijo
    console.log(`Buscando ${searchType}: ${searchValue}`);
    setSearchResult(searchValue);
  };

  useEffect(() => {
    listaTurnosAdmin(pageNumber);
  }, [pageNumber, shouldReload]);

  const handleEliminarTurno = async (turnoId) => {
    const remainingTurnos = await eliminarTurnoAdmin(turnoId);
    if (remainingTurnos >= 0) {
      if (remainingTurnos === 0 && pageNumber > 0) {
        setPageNumber((prev) => prev - 1); // Cambia a la página anterior si es posible
      }
      setShouldReload((prev) => !prev); // Cambia el estado para forzar la recarga
    } else {
      // Manejar el error (puedes mostrar un mensaje al usuario)
      console.error("Error al eliminar el turno");
    }
  };

  const handlePageChange = (newPageNumber) => {
    console.log(newPageNumber);
    setPageNumber(newPageNumber - 1); // Asegúrate de restar 1 para convertir a base 0
  };

  const columns = [
    { key: "nombreUsuario", header: "Cliente" },
    { key: "nombreServicio", header: "Servicio" },
    {
      key: "startTime",
      header: "Hora del turno",
      render: (startTime) => format(new Date(startTime), "hh:mm a dd/MM/yyyy"),
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
              Confirmado{" "}
              <CheckIcon color="#fff" size={18} className="check-icon" />
            </>
          ) : (
            <>
              Cancelado
              <XIcon color="#fff" size={18} className="x-icon" />
            </>
          )}
        </span>
      ),
    },
  ];

  const actions = [
    {
      label: "Cancelar",
      title: "Cancelar Turno",
      icon: <CalendarCrossIcon size={20} color="#050505" alt="Quitar turno" />,
      onClick: openModal,
      //(turno) => handleEliminarTurno(turno.id)
    },
  ];

  return (
    <section className="appointments-content">
      <SearchComponent searchType={searchType} onSearch={handleSearch} />
      <h2 className="appointment-table-header"> Lista de Turnos Reservados</h2>
      {turnosReservados && turnosReservados.length > 0 ? (
        <>
          <div className="appointment-table-container">
            <Table
              columns={columns}
              data={turnosReservados}
              actions={actions}
            />
            <Pagination
              page={pageNumber}
              totalPages={arrayTurnosAdmin.totalPages}
              onPageChange={handlePageChange}
            />
          </div>
          <Modal modalType="cancelAppointmentAdmin">
            <ModalCancelAppointment
              appointment={selectedTurno}
              onClick={handleEliminarTurno}
            />
          </Modal>
        </>
      ) : (
        <p>No tienes turnos reservados</p>
      )}
    </section>
  );
};
