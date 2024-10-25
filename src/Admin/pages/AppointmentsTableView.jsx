import Breadcrumb from "../../shared/components/Breadcrumb";
import { AdminAppointments } from "../components/AdminAppointments";

export const AppointmentsTableView = () => {
  return (
    <section className="dashboard-section-container">
      <Breadcrumb title={`Ver turnos administrador`} />
      <AdminAppointments />
    </section>
  );
};
