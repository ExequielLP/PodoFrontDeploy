import { useModalContext } from "../../../context/ModalContext";
import { priceFormatter } from "../../../utils/priceFormatter";

export const ModalCancelService = ({ service, onClick }) => {
  const { toggleModal } = useModalContext();
  return (
    <div className="modal-inset-border">
      <header className="modal-header-seciton">
        <h2 className="modal-appointment-title">
          Confirmar cancelación del servicio
        </h2>
      </header>
      <section className="modal-description">
        <p>¿Está seguro que desea cancelar el siguiente servicio?</p>
        <div className="modal-appointment-details">
          <p>
            <strong>Servicio:</strong> {service.nombre}
          </p>
          <p>
            <strong>Costo:</strong> {priceFormatter(service.costo)}
          </p>
        </div>
      </section>
      <footer className="modal-footer">
        <button
          className="modal-button modal-button-outline"
          onClick={() => toggleModal("cancelService")}
        >
          Volver
        </button>
        <button
          className="modal-button modal-button-destructive"
          onClick={() => {
            onClick(service.id);
            toggleModal("cancelService");
          }}
        >
          Cancelar
        </button>
      </footer>
    </div>
  );
};
