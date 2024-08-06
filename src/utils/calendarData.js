import { useState, useEffect, useContext } from "react";
import ContextoAdministrador from "../context/ContextLoginRegister";
import { toast } from "sonner";

const urlBackTurnosDelDia = import.meta.env.VITE_ENDPOINT_urlBackTurnosDelDia;
const urlBackReservarTurno = import.meta.env.VITE_ENDPOINT_urlBackReservarTurno;

export const useAppointments = (servicioId) => {
  const [date, setDate] = useState(new Date());
  const [turno, setTurno] = useState([]);
  const { usuarioLogeado } = useContext(ContextoAdministrador);

  useEffect(() => {
    fetchAppointments();
  }, [date]);

  const fetchAppointments = async () => {
    const token = localStorage.getItem("auth_token");
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
      setTurno(data);
    } catch (error) {
      console.error("Error fetching appointments", error);
    }
  };

  const bookAppointment = async (turnoId) => {
    const token = localStorage.getItem("auth_token");
    try {
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
        fetchAppointments();
      } else {
        toast.error(`¡Error: El turno ya fue reservado! Turno: ${turnoId}`, {
          className: "toast-error",
          style: { width: "fit-content" },
        });
        console.error("Error booking appointment");
        fetchAppointments();
      }
    } catch (error) {
      console.error("Error booking appointment", error);
    }
  };

  return { date, setDate, turno, fetchAppointments, bookAppointment };
};
