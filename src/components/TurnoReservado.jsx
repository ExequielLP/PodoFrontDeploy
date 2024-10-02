/* eslint-disable react/prop-types */
import { useContext } from "react";
import { format } from "date-fns";
import {priceFormatter} from '../utils/priceFormatter';
import ServicesContext from "../context/ServiceContext";

const TurnoReservado = ({ listaTurnos }) => {
  const { eliminarTurno } = useContext(ServicesContext);
  const formattedStartTime = format(
    new Date(listaTurnos.startTime),
    "hh:mm a dd/MM/yyyy"
  );
  return (
    <tbody>
      <tr>
        <td>{listaTurnos.nombreServicio}</td>
        <td>{formattedStartTime}</td>
        <td>{priceFormatter(listaTurnos.costo)}</td>
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
