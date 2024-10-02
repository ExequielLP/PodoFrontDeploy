import { ClockIcon } from "../icons";
import "./css/day-work-hours.css";

export const Appointments = ({ turno, date, bookAppointment }) => {
  const dayName = date.toLocaleDateString("es-ES", { weekday: "long" });
  console.log(turno);
  return (
    <div className="day-wrapper">
      {dayName !== "domingo" && dayName !== "sábado" ? (
        turno.map((app) => (
          <div
            key={app.id}
            className={`slot-container ${
              !app.estado ? "slot-container-bg" : "slot-container-unavailable"
            }`}
          >
            <div className="time-icon-container">
              <ClockIcon className="time-icon" />
              <span>
                {new Date(app.startTime).toLocaleTimeString()}hs -{" "}
                {new Date(app.endTime).toLocaleTimeString()}hs
              </span>
            </div>
            <button
              className={`reserve-button ${
                !app.estado
                  ? "reserve-button-available"
                  : "reserve-button-unavailable"
              }`}
              onClick={() => bookAppointment(app.id)}
              disabled={app.estado}
            >
              {!app.estado ? "Reservar" : "No disponible"}
            </button>
          </div>
        ))
      ) : (
        <h3 className="m-5">No hay turnos sábados y domingos</h3>
      )}
    </div>
  );
};
