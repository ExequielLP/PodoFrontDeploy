import Breadcrumb from "../../shared/components/Breadcrumb";
import { AdminHolidayCalendar } from "../components/AdminHolidayCalendar";
export const AddHolidaysView = () => {
  return (
    <section className="dashboard-section-container">
      <Breadcrumb title={`Gestión de Feriados`} />
      <AdminHolidayCalendar />
    </section>
  );
};
