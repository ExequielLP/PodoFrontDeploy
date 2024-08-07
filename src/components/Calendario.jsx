import Calendar from "react-calendar";
import { useAppointments } from "./../utils/calendarData";
import { Appointments } from "./Appointments";
import "react-calendar/dist/Calendar.css";
import "./css/calendario.css";
import "./css/calendar-time-section.css";
import "./css/Button-styles.css";
import { useEffect } from "react";

export const Calendario = ({ servicioId }) => {
  const { date, setDate, turno, bookAppointment, fetchAppointments } = useAppointments(servicioId);
  useEffect(() => {
    fetchAppointments();
  }, [date]);
  /* const tileClassName = ({ date, view }) => {
    if (view === "month") {
      const dateString = date.toISOString().split("T")[0];
      const appointment = turno.find(
        (app) => app.fechaInicio && app.fechaInicio.startsWith(dateString)
      );
      if (appointment) {
        return appointment.estado ? "booked" : "available";
      } else {
        return "hide-day"; // Agregar una clase para ocultar los días sin citas
      }
    }
    return null;
  }; */

  return (
    <main className="calendar-section calendar">
      <Calendar onChange={setDate} value={date} />
      <Appointments
        turno={turno}
        date={date}
        bookAppointment={bookAppointment}
      />
    </main>
  );
};
