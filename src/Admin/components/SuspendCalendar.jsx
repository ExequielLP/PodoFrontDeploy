import { useEffect } from "react";
import Calendar from "react-calendar";
import { CalendarSettingsIcon } from "../../icons";
import { SuspendTable } from "./SuspendTable";
import { useAppointments } from "../../utils/calendarData";
import styles from "./css/suspendView.module.css"

export const SuspendCalendar = () => {
  const { date, setDate, turno, fetchAppointments } = useAppointments();

  useEffect(() => {
    fetchAppointments();
  }, [date]);

  return (
    <div className={`${styles.suspendContainer}`}>
      <div className={`${styles.suspendCalendar}`}>
        <Calendar onChange={setDate} value={date}/>
      </div>
      <SuspendTable date={date} turno={turno} />
    </div>
  );
};
