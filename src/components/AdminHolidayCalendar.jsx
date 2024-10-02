import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import "./css/calendario.css";

export const AdminHolidayCalendar = ({
  date,
  saveHolidayToCalendar,
  holidayList,
}) => {
  return (
    <section className="calendar-section">
      <h2 className="calendar-section-title">Agregar Feriados</h2>
      <Calendar />
      <div className="calendar-section-container">
        {holidayList ? (
          holidayList.map((holiday) => (
            <div key={holiday.id} className="date-container">
              <p className="date-text">
                {`${holiday.date} -  ${holiday.name}`}
                <button
                  className="button-generic-styles"
                  onClick={() => saveHolidayToCalendar(holiday.id)}
                  disabled={holiday.estado}
                >
                  {holiday.estado ? "Guardar" : "Modificar"}
                </button>
              </p>
            </div>
          ))
        ) : (
          <p className="date-text admin-calendar-text">
            Aún no cargaste tus feriados
          </p>
        )}
      </div>
    </section>
  );
};
