import { format } from "date-fns";
import { useModalContext } from "../../context/ModalContext";
import { priceFormatter } from "../../utils/priceFormatter";

export const ModalCancelAppointment = ({ appointment, onClick }) => {
  const { toggleModal } = useModalContext();
  return (
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
            <strong>Servicio:</strong> {appointment.nombreServicio}
          </p>
          <p>
            <strong>Hora:</strong>{" "}
            {format(new Date(appointment.startTime), "hh:mm a dd/MM/yyyy")}
          </p>
          <p>
            <strong>Costo:</strong> {priceFormatter(appointment.costo)}
          </p>
          <p>
            <strong>Cliente:</strong> {appointment.nombreUsuario}
          </p>
        </div>
      </section>
      <footer className="modal-footer">
        <button
          className="modal-button modal-button-outline"
          onClick={() => toggleModal("cancelAppointment")}
        >
          Volver
        </button>
        <button
          className="modal-button modal-button-destructive"
          onClick={() => {
            onClick(appointment.id);
            toggleModal("cancelAppointment");
          }}
        >
          Cancelar
        </button>
      </footer>
    </div>
  );
};
