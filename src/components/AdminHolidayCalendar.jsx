import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import "./css/calendario.css";
import "./css/calendar-time-section.css";

export const AdminHolidayCalendar = ({
  date,
  saveHolidayToCalendar,
  holidayList,
}) => {
  return (
    <main className="calendar-section">
      <Calendar />
      <section className="admin-holiday-calendar">
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
      </section>
    </main>
  );
};
