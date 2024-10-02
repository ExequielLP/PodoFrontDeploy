import { getDayInitials, formatTime } from "../utils/dateFormatter";
import { ClockIcon } from "../icons";
import "./css/day-work-hours.css";

export const Appointments = ({ turno, date, bookAppointment }) => {
  const dayName = date.toLocaleDateString("es-ES", { weekday: "long" });

  const sortedTurnos = turno.sort(
    (a, b) => new Date(a.startTime) - new Date(b.startTime)
  );

  return (
    <div className="day-wrapper">
      {dayName !== "domingo" && dayName !== "sábado" ? (
        sortedTurnos.map((app) => (
          <div
            key={app.id}
            className={`slot-container ${
              !app.estado ? "slot-container-bg" : "slot-container-unavailable"
            }`}
          >
            <div className="time-icon-container">
              <ClockIcon color="#ec4899" />
              <span className="time-text">
                {getDayInitials(app.startTime)} {formatTime(app.startTime)} -{" "}
                {formatTime(app.endTime)}
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
              {!app.estado ? "Reservar" : "Reservado"}
            </button>
          </div>
        ))
      ) : (
        <h3 className="m-5">No hay turnos sábados y domingos</h3>
      )}
    </div>
  );
};
