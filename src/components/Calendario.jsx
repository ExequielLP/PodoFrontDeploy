import Calendar from "react-calendar";
import { useAppointments } from "./../utils/calendarData";
import { Appointments } from "./Appointments";
import "react-calendar/dist/Calendar.css";
import "./css/calendario.css";
import "./css/Button-styles.css";
import { useEffect } from "react";

export const Calendario = ({ servicioId }) => {
  const { date, setDate, turno, bookAppointment, fetchAppointments } =
    useAppointments(servicioId);
  useEffect(() => {
    fetchAppointments();
  }, [date]);
  return (
    <section className="calendar-section">
      <div className="calendar-section-container">
        <h2 className="calendar-section-title">Agendar Turno</h2>
        <Calendar onChange={setDate} value={date} />
        <Appointments
          turno={turno}
          date={date}
          bookAppointment={bookAppointment}
        />
      </div>
    </section>
  );
};
