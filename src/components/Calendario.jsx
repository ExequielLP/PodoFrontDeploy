import { useState, useEffect, useContext } from "react";
import Calendar from "react-calendar";
import ContextoAdministrador from "../context/ContextLoginRegister";
import "react-calendar/dist/Calendar.css";
import "./css/calendario.css";
import "./css/calendar-time-section.css";
import "./css/Button-styles.css";
const urlBackTurnosDelDia = import.meta.env.VITE_ENDPOINT_urlBackTurnosDelDia;
const urlBackReservarTurno = import.meta.env.VITE_ENDPOINT_urlBackReservarTurno;
import { toast } from "sonner";

const Calendario = ({ servicioId }) => {
  const [date, setDate] = useState(new Date());
  const [turno, setturno] = useState([]);
  const { usuarioLogeado } = useContext(ContextoAdministrador);
  useEffect(() => {
    fetchAppointments();
  }, [date]);

  const fetchAppointments = async () => {
    const token = localStorage.getItem("auth_token"); // Asume que el token está almacenado en localStorage
    try {
      const response = await fetch(
        `${urlBackTurnosDelDia}${date.toISOString().split("T")[0]}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const data = await response.json();
      setturno(data);
    } catch (error) {
      console.error("Error fetching appointments", error);
    }
  };

  const bookAppointment = async (turnoId) => {
    console.log("entrando a reservar");
    const token = localStorage.getItem("auth_token"); // Asume que el token está almacenado en localStorage
    try {
      console.log(turnoId);
      const response = await fetch(
        `${urlBackReservarTurno}${turnoId}/${servicioId}/${usuarioLogeado.id}`,
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (response.ok) {
        fetchAppointments(); // Refresh appointments
      } else {
        toast.error(`¡Error: El turno ya fue reservado! Turno: ${turnoId}`, {
          className: "toast-error",
          style: { width: "fit-content" },
        });
        console.error("Error booking appointment");
        fetchAppointments(); //limpia los turnos q ya fueron reservados.
      }
    } catch (error) {
      console.error("Error booking appointment", error);
    }
  };

  const tileClassName = ({ date, view }) => {
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
  };

  const renderAppointments = () => {
    const appointmentsForDay = turno.filter(
      (app) => new Date(app.startTime).toDateString() === date.toDateString()
    );
    return appointmentsForDay.map((app) => (
      <div key={app.id} className="date-container">
        <p className="date-text">
          {new Date(app.startTime).toLocaleTimeString()}hs -{" "}
          {new Date(app.endTime).toLocaleTimeString()}hs
          <button
            className="button-generic-styles"
            onClick={() => bookAppointment(app.id)}
            disabled={app.estado}
          >
            {" "}
            {app.estado ? "Reservado" : "Reservar"}
          </button>
        </p>
      </div>
    ));
  };

  return (
    <main className="calendar-section calendar">
      <Calendar onChange={setDate} value={date} tileClassName={tileClassName} />
      <div>{renderAppointments()}</div>
    </main>
  );
};

export default Calendario;
