import { SuspendCalendar} from "../components/SuspendCalendar"
import styles from "../components/css/suspendView.module.css"
const currentDate = new Date().getDate();

export const SuspendAppointments = () => {
  return (
    <section className={`${styles.suspendContent} ${styles.suspendSection}`}>
      <div className={`${styles.suspendHeader}`}>
        <h2 className={`${styles.suspendTitle}`}>Suspender turnos {currentDate}</h2>
      </div>
      <SuspendCalendar/>
    </section>
  );
};
