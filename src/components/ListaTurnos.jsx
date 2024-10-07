import { useContext } from "react";
import AuthenticationContext from "../context/AuthContext";
import ServicesContext from "../context/ServiceContext";
import { format } from "date-fns";
import { priceFormatter } from "../utils/priceFormatter";
import Table from "../shared/components/Table";
import { CalendarCrossIcon } from "../icons/index";
import "./css/listaTurno.css";

const ListaTurnos = ({ turnos,onEliminarTurno }) => {
  const { usuarioLogueado } = useContext(AuthenticationContext);

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
      label: "Cancelar Turno",
      icon: (
        <CalendarCrossIcon size={24} color="#050505" alt="Cancelar Turno" />
      ),
      onClick: (turno) => onEliminarTurno(turno.id),
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
                <Table
                  columns={columns}
                  data={turnosReservados}
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
export default ListaTurnos;
