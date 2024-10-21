import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import "./css/calendario.css";
import { useAppointments } from "../utils/calendarData";
import { useState } from "react";

const initialHolidayForm = {
  fecha: new Date().toISOString().split("T")[0],
  descripcion: "",
};

export const AdminHolidayCalendar = () => {
  const { holiday, setHoliday, addAnnualHolidays } = useAppointments();
  const [holidayForm, setHolidayForm] = useState(initialHolidayForm);

  const handleChangeHolidayDate = (e) => {
    e.preventDefault();
    const { name, value } = e.target;
    setHolidayForm({
      ...holidayForm,
      [name]: value,
    });
  };

  const submitHolidayDate = async (e, holidayForm) => {
    e.preventDefault();
    await addAnnualHolidays(e, holidayForm);
  };

  return (
    <section className="calendar-section">
      <h2 className="calendar-section-title">Agregar Feriados</h2>
      <Calendar
        onChange={(date) => {
          setHoliday(date);
          setHolidayForm({
            ...holidayForm,
            fecha: date.toISOString().split("T")[0],
          });
        }}
        value={holiday}
      />
      <div className="calendar-section-container">
        {/* {holidayList ? (
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
        )} */}
      </div>
      <form action="">
        <label htmlFor="fecha">Fecha</label>
        <input
          type="text"
          name="fecha"
          value={holidayForm.fecha}
          onChange={handleChangeHolidayDate}
        />
        <label htmlFor="descripcion">Descripción</label>
        <input
          type="text"
          name="descripcion"
          placeholder="Nombre del feriado"
          value={holidayForm.descripcion}
          onChange={handleChangeHolidayDate}
        />
        <button
          className="login-button"
          type="submit"
          value="Sign in"
          onClick={(e) => submitHolidayDate(e, holidayForm)}
        >
          Login
        </button>
      </form>
    </section>
  );
};
