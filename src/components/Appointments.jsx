export const Appointments = ({ turno, date, bookAppointment }) => {
  const appointmentsForDay = turno.filter(
    (app) => new Date(app.startTime).toDateString() === date.toDateString()
  );

  return (
    <div>
      {appointmentsForDay.map((app) => (
        <div key={app.id} className="date-container">
          <p className="date-text">
            {new Date(app.startTime).toLocaleTimeString()}hs -{" "}
            {new Date(app.endTime).toLocaleTimeString()}hs
            <button
              className="button-generic-styles"
              onClick={() => bookAppointment(app.id)}
              disabled={app.estado}
            >
              {app.estado ? "Reservado" : "Reservar"}
            </button>
          </p>
        </div>
      ))}
    </div>
  );
};
