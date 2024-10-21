import { useState } from "react";
import AuthenticationContext from "../context/AuthContext";
import useContextValue from "../hooks/useContextValue";
import showToast from "./toastUtils";
import useFetch from "../hooks/useFetch";

const API_URLS = {
  turnosDelDia: import.meta.env.VITE_ENDPOINT_urlBackTurnosDelDia,
  reservarTurno: import.meta.env.VITE_ENDPOINT_urlBackReservarTurno,
  annualHolidays: import.meta.env.VITE_ENDPOINT_urlBackAddAnnualHolidays,
};

export const useAppointments = (servicioId = '') => {
  const [date, setDate] = useState(new Date());
  const [turno, setTurno] = useState([]);
  const [holiday, setHoliday] = useState(new Date());
  const { usuarioLogueado, handleUnauthorized } = useContextValue(
    AuthenticationContext
  );

  const { fetchData } = useFetch(handleUnauthorized);
  const fetchAppointments = async () => {
    try {
      const { data: appointment, error: appointmenttokenError } =
        await fetchData(
          `${API_URLS.turnosDelDia}${date.toISOString().split("T")[0]}`,
          {
            method: "GET",
          },
          handleUnauthorized
        );
      setTurno(appointment);
    } catch (error) {
      console.error("Error al obtener las citas", error);
    }
  };

  const bookAppointment = async (turnoId) => {
    try {
      const { data: bookAppointment, error: tokenError } = await fetchData(
        `${API_URLS.reservarTurno}${turnoId}/${servicioId}/${usuarioLogueado.id}`,
        {
          method: "POST",
        },
        handleUnauthorized
      );
      if (bookAppointment) {
        showToast(`Turno reservado exitosamente!`, "success");
      } else {
        showToast(`El turno (${turnoId}) ya fue reservado! `, "error");
      }
      fetchAppointments();
    } catch (error) {
      console.error("Error al reservar el turno", error);
    }
  };

  //Función para cargar los feriados del ADMIN o días no laborales
  const addAnnualHolidays = async (e, holidayForm) => {
    e.preventDefault();
    console.log(holidayForm)
    try {
      const { data: holidayAppointment, error: holidayAppointmentError } =
        await fetchData(
          `${API_URLS.annualHolidays}`,
          {
            method: "POST",
            body: JSON.stringify(holidayForm),
            credentials: "include",
          }
        );
      setHoliday(holidayAppointment);
    } catch (error) {
      console.error("Error al obtener el feriado", error);
    }
  };

  return {
    date,
    addAnnualHolidays,
    bookAppointment,
    fetchAppointments,
    turno,
    setDate,
    holiday,
    setHoliday,
  };
};
