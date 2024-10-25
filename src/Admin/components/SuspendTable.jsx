import { getDayInitials, formatTime } from "../../utils/dateFormatter";
import {
  CalendarCheckIcon,
  CalendarOffIcon,
  CalendarSettingsIcon,
  ClockIcon,
} from "../../icons";
import styles from "./css/suspendView.module.css";

export const SuspendTable = ({ date, turno }) => {
  const dayName = date.toLocaleDateString("es-ES", { weekday: "long" });

  const sortedTurnos = turno.sort(
    (a, b) => new Date(a.startTime) - new Date(b.startTime)
  );
  return (
    <div className={`${styles.suspendTableContainer}`}>
      <div className={`${styles.suspendFooter}`}>
        <CalendarSettingsIcon size={"20"} color="#6b7280" />
        <h3 className={`${styles.suspendDateSelected}`}>
          Día Seleccionado:{" "}
          <span className={`${styles.suspendDay}`}>
            {date.toISOString().split("T")[0]}
          </span>
        </h3>
      </div>
      <table className={`${styles.table}`}>
        <thead>
          <tr>
            <th>Hora del turno</th>
            <th>Acción</th>
          </tr>
        </thead>
        <tbody>
          {sortedTurnos.length > 0 ? (
            sortedTurnos.map((appointment, i) => (
              <tr
                key={appointment.id}
                className={`${i !== 0 ? "holidayTableItemBorder" : ""}`}
              >
                <td className="">
                  <ClockIcon color="#ec4899" />
                  <span className="time-text">
                    {getDayInitials(appointment.startTime)}{" "}
                    {formatTime(appointment.startTime)} -{" "}
                    {formatTime(appointment.endTime)}
                  </span>
                </td>
                <td className="actions">
                  <button
                    // onClick={() => handleSaveHoliday(holiday)}
                    className={`status-button ${
                      appointment.estado ? "active" : "inactive"
                    }`}
                    title={
                      appointment.estado ? "Suspender Turno" : "Reactivar Turno"
                    }
                  >
                    {appointment.estado ? (
                      <CalendarCheckIcon color="green" />
                    ) : (
                      <CalendarOffIcon color="red" />
                    )}
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={3} className="">
                No hay turnos suspendidos para el día {dayName}
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};
