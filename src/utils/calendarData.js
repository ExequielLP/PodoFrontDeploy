import { useState } from "react";
import AuthenticationContext from "../context/AuthContext";
import useContextValue from "../hooks/useContextValue";
import showToast from "./toastUtils";

const API_URLS = {
  turnosDelDia: import.meta.env.VITE_ENDPOINT_urlBackTurnosDelDia,
  reservarTurno: import.meta.env.VITE_ENDPOINT_urlBackReservarTurno,
};

export const useAppointments = (servicioId) => {
  const [date, setDate] = useState(new Date());
  const [turno, setTurno] = useState([]);
  const { usuarioLogueado } = useContextValue(AuthenticationContext);

  const fetchAppointments = async () => {
    try {
      const response = await fetch(
        `${API_URLS.turnosDelDia}${date.toISOString().split("T")[0]}`,
        { method: "GET",
          credentials: "include",
        }
      );
      if (!response.ok) {
        throw new Error("Error en la respuesta de la red");
      }
      const data = await response.json();
      setTurno(data);
    } catch (error) {
      console.error("Error al obtener las citas", error);
    }
  };

  const bookAppointment = async (turnoId) => {
    try {
      const response = await fetch(
        `${API_URLS.reservarTurno}${turnoId}/${servicioId}/${usuarioLogueado.id}`,
        {
          method: "POST",
          credentials: "include",
        }
      );
      if (response.ok) {
        showToast(`Turno reservado exitosamente!`, "success");
      } else {
        showToast(`El turno (${turnoId}) ya fue reservado! `, "error");
      }
      fetchAppointments();
    } catch (error) {
      console.error("Error al reservar el turno", error);
    }
  };

  return { date, setDate, turno, fetchAppointments, bookAppointment };
};
