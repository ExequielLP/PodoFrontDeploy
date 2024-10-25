import { useContext, useState } from "react";
import { format } from "date-fns";
import AuthenticationContext from "../context/AuthContext";
import { useModalContext } from "../context/ModalContext";
import { Modal } from "../shared/components/Modal";
import Table from "../shared/components/Table";
import { priceFormatter } from "../utils/priceFormatter";
import { CalendarCrossIcon } from "../icons/index";
import "./css/userAppointment.css";

const UserAppointments = ({ turnos, onEliminarTurno }) => {
  const { usuarioLogueado } = useContext(AuthenticationContext);
  const { state, setState } = useModalContext();
  const [selectedTurno, setSelectedTurno] = useState(null);

  const openModal = (turno) => {
    setSelectedTurno(turno);
    setState(true);
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
          <Modal>
            {selectedTurno && (
              <div className="modal-inset-border">
                <header className="modal-header-seciton">
                  <h2 className="modal-appointment-title">
                    Confirmar cancelación de turno
                  </h2>
                </header>
                <section className="modal-description">
                  <p>¿Está seguro que desea cancelar el siguiente turno?</p>
                  <div className="modal-appointment-details">
                    <p>
                      <strong>Servicio:</strong> {selectedTurno.nombreServicio}
                    </p>
                    <p>
                      <strong>Hora:</strong>{" "}
                      {format(
                        new Date(selectedTurno.startTime),
                        "hh:mm a dd/MM/yyyy"
                      )}
                    </p>
                    <p>
                      <strong>Costo:</strong>{" "}
                      {priceFormatter(selectedTurno.costo)}
                    </p>
                  </div>
                </section>
                <footer className="modal-footer">
                  <button
                    className="modal-button modal-button-outline"
                    onClick={() => setState(false)}
                  >
                    Volver
                  </button>
                  <button
                    className="modal-button modal-button-destructive"
                    onClick={() => {
                      onEliminarTurno(selectedTurno.id);
                      setState(false);
                    }}
                  >
                    Cancelar
                  </button>
                </footer>
              </div>
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
