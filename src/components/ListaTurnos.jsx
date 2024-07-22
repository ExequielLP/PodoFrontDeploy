import { useContext } from "react";
import ContextoAdministrador from "../context/ContextLoginRegister";
import TurnoReservado from "./TurnoReservado";
import "./css/listaTurno.css";

const ListaTurnos = () => {
  const { arrayTurnos } = useContext(ContextoAdministrador);
  return (
    <div className="accordion" id="accordionExample">
      <div className="accordion-item">
        <h2 className="accordion-header">
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
          <div className="accordion-body">
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
  );
};

export default ListaTurnos;
