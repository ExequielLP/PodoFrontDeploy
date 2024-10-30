import { Routes, Route } from "react-router-dom";
import Dashboard from "../Admin/pages/Dashboard";
import { AddHolidaysView } from "../Admin/pages/AddHolidaysView";
import { AddServiceView } from "../Admin/pages/AddServiceView";
import { ServicesEditionView } from "../Admin/pages/ServicesEditionView";
import { SuspendAppointments } from "../Admin/pages/SuspendAppointments";
import { AppointmentsTableView } from "../Admin/pages/AppointmentsTableView";
import DashboardLayout from "../Admin/DashboardLayout";

export default function AdminRoutes() {
  return (
    <Routes>
      <Route path="/" element={<DashboardLayout />}>
        <Route index element={<Dashboard />} />
        <Route path="agregar-servicio" element={<AddServiceView />} />
        <Route path="editar-servicios" element={<ServicesEditionView />} />
        <Route path="turnos" element={<AppointmentsTableView />} />
        <Route path="calendario-feriados" element={<AddHolidaysView />} />
        <Route path="suspender-turnos" element={<SuspendAppointments />} />
      </Route>
    </Routes>
  );
}
