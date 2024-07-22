/* eslint-disable react/prop-types */
import { useContext } from "react";
import { format } from "date-fns";
import ContextoAdministrador from "../context/ContextLoginRegister";

const TurnoReservado = ({ listaTurnos }) => {
  const { eliminarTurno } = useContext(ContextoAdministrador);
  const formattedStartTime = format(
    new Date(listaTurnos.startTime),
    "hh:mm a dd/MM/yyyy"
  );
  return (
    <tbody>
      <tr>
        <td>{listaTurnos.servicioPodo.nombre}</td>
        <td>{formattedStartTime}</td>
        <td>{listaTurnos.servicioPodo.costo}</td>
        <td>
          <button
            className="tabla-turno-btn"
            onClick={(e) => {
              eliminarTurno(e, listaTurnos.id);
            }}
          >
            Cancelar Turno
          </button>
        </td>
      </tr>
    </tbody>
  );
};

export default TurnoReservado;
