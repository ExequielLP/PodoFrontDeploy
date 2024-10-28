import { useModalContext } from "../../../context/ModalContext";
import showToast from "../../../utils/toastUtils";
import { useAppointments } from "../../../utils/calendarData";
import { formatTime, getDayInitials } from "../../../utils/dateFormatter";

export const ModalSuspendAppointment = ({ appointment }) => {
  const { toggleModal } = useModalContext();
  const { fetchSuspendAppointments } = useAppointments();

  console.log(appointment);
  const handleSuspendAppointment = async (appointmentID) => {
    const success = await fetchSuspendAppointments(appointmentID);
    if (success) {
      showToast(`Turno ${appointmentID} suspendido con éxito`, "success");
    } else {
      showToast(`Error al suspender el turno ${appointmentID}`, "error");
    }
  };

  return (
    <div className="modal-inset-border">
      {appointment.estado ? (
        <>
          <header className="modal-header-seciton">
            <h2 className="modal-appointment-title">
              Confirmar suspénsión del turno
            </h2>
          </header>
          <section className="modal-description">
            <p>¿Está seguro que desea suspender el siguiente turno?</p>

            <div className="modal-appointment-details">
              <p>
                <strong>Hora:</strong>
                {getDayInitials(appointment.startTime)}{" "}
                {formatTime(appointment.startTime)} -{" "}
                {formatTime(appointment.endTime)}
              </p>
            </div>
          </section>
        </>
      ) : (
        <>
          <header className="modal-header-seciton">
            <h2 className="modal-appointment-title">
              Confirmar reactivación del turno
            </h2>
          </header>
          <section className="modal-description">
            <p>¿Está seguro que desea reactivar el siguiente turno?</p>

            <div className="modal-appointment-details">
              <p>
                <strong>Hora:</strong>
                {getDayInitials(appointment.startTime)}{" "}
                {formatTime(appointment.startTime)} -{" "}
                {formatTime(appointment.endTime)}
              </p>
            </div>
          </section>
        </>
      )}
      <footer className="modal-footer">
        <button
          className="modal-button modal-button-outline"
          onClick={() => toggleModal("suspendAppointment")}
        >
          Volver
        </button>
        <button
          className={`modal-button ${
            appointment.estado
              ? "modal-button-destructive"
              : "modal-button-check"
          }`}
          onClick={() => {
            handleSuspendAppointment(appointment.id);
            toggleModal("suspendAppointment");
          }}
        >
          {appointment.estado ? "Suspender" : "Activar"}
        </button>
      </footer>
    </div>
  );
};
