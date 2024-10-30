import Breadcrumb from "../../shared/components/Breadcrumb";
import { SuspendCalendar } from "../components/SuspendCalendar";
import styles from "../components/css/suspendView.module.css";
const currentDate = new Date().getDate();

export const SuspendAppointments = () => {
  return (
    <section
      className={` ${styles.suspendContent} ${styles.suspendSection}dashboard-section-container`}
    >
      <Breadcrumb title={`Suspender turnos ${currentDate}`} />
      <SuspendCalendar />
    </section>
  );
};
