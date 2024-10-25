import { useContext, useState } from "react";
import { format } from "date-fns";
import AuthenticationContext from "../context/AuthContext";
import { useModalContext } from "../context/ModalContext";
import { Modal } from "../shared/components/Modal";
import Table from "../shared/components/Table";
import { priceFormatter } from "../utils/priceFormatter";
import { CalendarCrossIcon } from "../icons/index";
import "./css/listaTurno.css";

const ListaTurnos = ({ turnos, onEliminarTurno }) => {
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
    <section className="tabla-user">
      <h1 className="user-title">
        ¡Bienvenido{" "}
        <span className="user-userName">{usuarioLogueado.userName}</span>!
      </h1>
      <h3 className="user-subtitle">
        Consulta o modifica tus turnos reservados aquí 👇
      </h3>
      <div className="accordion" id="accordionExample">
        <div className="accordion-item">
          <h2 className="accordion-header" id="headingOne">
            <button
              className="accordion-button"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#collapseOne"
              aria-expanded="true"
              aria-controls="collapseOne"
            >
              Turnos reservados
            </button>
          </h2>
          <div
            id="collapseOne"
            className="accordion-collapse collapse show"
            data-bs-parent="#accordionExample"
          >
            <div className="accordion-body table-responsive">
              {turnosReservados.length > 0 ? (
                <>
                  <Table
                    columns={columns}
                    data={turnosReservados}
                    actions={actions}
                  />
                  <Modal>
                    {selectedTurno && (
                      <div className="modal-inset-border">
                        <header className="modal-header-seciton">
                          <h2 className="modal-appointment-title">
                            Confirmar cancelación de turno
                          </h2>
                        </header>
                        <section className="modal-description">
                          <p>
                            ¿Está seguro que desea cancelar el siguiente turno?
                          </p>
                          <div className="modal-appointment-details">
                            <p>
                              <strong>Servicio:</strong>{" "}
                              {selectedTurno.nombreServicio}
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
                </>
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
export default ListaTurnos;
