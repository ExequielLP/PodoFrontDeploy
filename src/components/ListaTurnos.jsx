import { useContext } from "react";
import ContextoAdministrador from "../context/AuthContext";
import TurnoReservado from "./TurnoReservado";
import "./css/listaTurno.css";
import ServicesContext from "../context/ServiceContext";

const ListaTurnos = () => {
  const { usuarioLogueado } = useContext(ContextoAdministrador);
  const { arrayTurnos } = useContext(ServicesContext);
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
              {arrayTurnos &&
              arrayTurnos.length > 0 &&
              arrayTurnos.some((e) => e.estado === true) ? (
                <table className="table align-middle">
                  <thead className="tabla-header">
                    <tr>
                      <th scope="col">Nombre del servicio</th>
                      <th scope="col">Hora del turno</th>

                      <th scope="col">Costo</th>
                      <th scope="col">Modificar</th>
                    </tr>
                  </thead>
                  {arrayTurnos.map((e) =>
                    e.estado === true ? (
                      <TurnoReservado listaTurnos={e} key={e.id} />
                    ) : null
                  )}
                </table>
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
