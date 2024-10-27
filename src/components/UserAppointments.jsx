import { useContext, useState } from "react";
import { format } from "date-fns";
import AuthenticationContext from "../context/AuthContext";
import { useModalContext } from "../context/ModalContext";
import { priceFormatter } from "../utils/priceFormatter";
import { CalendarCrossIcon } from "../icons/index";
import { Modal } from "../shared/components/Modal";
import { ModalCancelAppointment } from "../shared/components/ModalCancelAppointment";
import Table from "../shared/components/Table";
import "./css/userAppointment.css";

const UserAppointments = ({ turnos, onEliminarTurno }) => {
  const { usuarioLogueado } = useContext(AuthenticationContext);
  const { setExclusiveModal } = useModalContext();
  const [selectedTurno, setSelectedTurno] = useState(null);

  const openModal = (turno) => {
    setSelectedTurno(turno);
    setExclusiveModal('action');
  };

  // Filtrando y ordenando los turnos que están confirmados por fecha
  const turnosReservados = (turnos || [])
    .filter((e) => e.estado === true)
    .sort((a, b) => new Date(a.startTime) - new Date(b.startTime));

  const columns = [
    { header: "Nombre del servicio", key: "nombreServicio" },
    {
      header: "Hora del turno",
      key: "startTime",
      render: (startTime) => format(new Date(startTime), "hh:mm a dd/MM/yyyy"),
    },
    {
      header: "Costo",
      key: "costo",
      render: (costo) => priceFormatter(costo),
    },
  ];

  const actions = [
    {
      label: "Acción",
      title: "Cancelar Turno",
      icon: (
        <CalendarCrossIcon size={20} color="#171D2C" alt="Cancelar Turno" />
      ),
      onClick: openModal,
    },
  ];

  return (
    <section className="table-layout">
      <h2 className="appointment-table-header user-subtitle text-center">
        Tus turnos reservados 👇
      </h2>
      {turnosReservados.length > 0 ? (
        <div className="appointment-table-container">
          <Table columns={columns} data={turnosReservados} actions={actions} />
          <Modal modalType="action">
            {selectedTurno && (
              <ModalCancelAppointment
                appointment={selectedTurno}
                onClick={onEliminarTurno}
              />
            )}
          </Modal>
        </div>
      ) : (
        <p>No tienes turnos reservados</p>
      )}
    </section>
  );
};
export default UserAppointments;
