import { useEffect } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import { useAppointments } from "./../utils/calendarData";
import { Appointments } from "./Appointments";
import "./css/calendario.css";
import "./css/Button-styles.css";

export const Calendario = ({ servicioId }) => {
  const { date, setDate, turno, bookAppointment, fetchAppointments } =
    useAppointments(servicioId);
  useEffect(() => {
    fetchAppointments();
  }, [date]);
  return (
    <section className="calendar-section">
      <div className="calendar-section-container">
        <h2 className="calendar-section-title font-bold">Agendar Turno</h2>
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
