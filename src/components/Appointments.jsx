

export const Appointments = ({ turno, date, bookAppointment }) => {

  const dayName = date.toLocaleDateString('es-ES', { weekday: 'long' });
  //aaa
  return (
    <div>
      {dayName !== 'domingo' && dayName !== 'sábado' ? (
        turno
          .filter((app) => !app.estado) // Filtrar los turnos donde estado es false
          .map((app) => (
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
          ))
      ) : (
        <h1 className="m-5">No hay turnos sábados y domingos</h1>
      )}
    </div>
  );
};
