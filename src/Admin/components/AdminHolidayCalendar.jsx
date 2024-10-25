import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import "../../components/css/calendario.css";
import { useAppointments } from "../../utils/calendarData";
import { useState } from "react";
import { FormField } from "../../shared/components/FormField";
import "./css/holidayCalendar.css";
import {
  CalendarCheckIcon,
  CalendarPlusIcon,
  CalendarCrossIcon,
  CalendarOffIcon,
  CalendarSettingsIcon,
} from "../../icons/index";
import { DashboardSectionTitle } from "./DashboardSectionTitle";

const initialHolidayForm = {
  fecha: new Date().toISOString().split("T")[0],
  descripcion: "",
};

//EJEMPLO PARA VER COMO SE VERIA CON FERIADOS CARGADOS
const holidaysByYear = {
  2024: [
    {
      id: "13",
      date: "2024-11-20",
      name: "Día de la Soberanía Nacional",
      estado: false,
    },
    {
      id: "14",
      date: "2024-12-08",
      name: "Inmaculada Concepción de María",
      estado: true,
    },
    { id: "15", date: "2024-12-25", name: "Navidad", estado: true },
    {
      id: "13",
      date: "2024-11-20",
      name: "Día de la Soberanía Nacional",
      estado: false,
    },
    {
      id: "14",
      date: "2024-12-08",
      name: "Inmaculada Concepción de María",
      estado: true,
    },
    { id: "15", date: "2024-12-25", name: "Navidad", estado: true },
    {
      id: "13",
      date: "2024-11-20",
      name: "Día de la Soberanía Nacional",
      estado: false,
    },
    {
      id: "14",
      date: "2024-12-08",
      name: "Inmaculada Concepción de María",
      estado: true,
    },
    { id: "15", date: "2024-12-25", name: "Navidad", estado: true },
  ],
  2025: [],
};

const initialDate = new Date();

//ESTA PROP NO VA A HACER FALTA --> SE PUEDE INICIALIZAR FUERA DEL COMPONENTE
export const AdminHolidayCalendar = () => {
  const { holiday, setHoliday, addAnnualHolidays } = useAppointments();
  const [holidayForm, setHolidayForm] = useState(initialHolidayForm);
  const [selectedYear, setSelectedYear] = useState(
    initialDate.getFullYear().toString()
  );
  //OTRO EJEMPLO PARA TOMAR LOS AÑOS
  const [years, setYears] = useState(["2024", "2025"]);

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
    <section className="holiday-section">
      <div className="holiday-container">
        <div className="holiday-content">
          <div className="holiday-calendar-controls">
            <div className="year-controls">
              <div className="year-select-container">
                <label htmlFor="year-select">Año</label>
                <select
                  id="year-select"
                  value={selectedYear}
                  onChange={(e) => setSelectedYear(e.target.value)}
                >
                  {years.map((year) => (
                    <option key={year} value={year}>
                      {year}
                    </option>
                  ))}
                </select>
              </div>
              <button className="copy-button">
                {/* <Copy className="icon" /> */}
                Copiar al próximo año
              </button>
            </div>
            <form className="holiday-form-container">
              <FormField
                className="holiday-input holiday-input-date"
                label="Fecha"
                type="text"
                id="fecha"
                name="fecha"
                placeholder="Fecha del feriado"
                value={holidayForm.fecha}
                onChange={handleChangeHolidayDate}
              />
              <FormField
                className="holiday-input holiday-input-date-name"
                label="Nombre del feriado"
                type="text"
                id="description"
                name="descripcion"
                placeholder="Nombre del feriado"
                value={holidayForm.descripcion}
                onChange={handleChangeHolidayDate}
              />
              <button
                className="holiday-button"
                type="submit"
                onClick={(e) => submitHolidayDate(e, holidayForm)}
              >
                <CalendarPlusIcon size={24} />
                Agregar
              </button>
            </form>
          </div>
          <div className="holiday-calendar-container">
            <div className="calendar-admin">
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
              <div className="holiday-footer">
                <CalendarSettingsIcon size={"24"} color="#6b7280" />
                <h3 className="next-holiday">
                  Próximo Feriado:{" "}
                  <span className="next-holiday-day">{"19-11-2024"}</span>
                </h3>
              </div>
            </div>
            <div className="holiday-list">
              <div className="holiday-table-container">
                <table>
                  <thead>
                    <tr>
                      <th>Fecha</th>
                      <th>Nombre</th>
                      <th>Acciones</th>
                    </tr>
                  </thead>
                  <tbody>
                    {holidaysByYear[selectedYear] &&
                    holidaysByYear[selectedYear].length > 0 ? (
                      holidaysByYear[selectedYear].map((holiday, i) => (
                        <tr
                          key={holiday.id}
                          className={`${
                            i !== 0 ? "holidayTableItemBorder" : ""
                          }`}
                        >
                          <td>{holiday.date}</td>
                          <td>{holiday.name}</td>
                          <td className="actions">
                            {/* <button
                              // onClick={() => handleSaveHoliday(holiday)}
                              className={`status-button ${
                                holiday.estado ? "active" : "inactive"
                              }`}
                              title={
                                holiday.estado
                                  ? "Desactivar feriado"
                                  : "Activar feriado"
                              }
                            >
                              {holiday.estado ? (
                                <CalendarCheckIcon color="green" />
                              ) : (
                                <CalendarOffIcon color="red" />
                              )}
                            </button> */}
                            <button
                              // onClick={() => removeHoliday(holiday.id, selectedYear)}
                              className="delete-button"
                              title="Eliminar feriado"
                            >
                              <CalendarCrossIcon size={20} color="#171D2C" />
                            </button>
                          </td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td colSpan={3} className="no-holidays">
                          No hay feriados agregados para {selectedYear}
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
