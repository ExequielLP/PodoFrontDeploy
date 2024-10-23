import { Route, Routes } from "react-router-dom";
import { lazy, Suspense } from "react";
import Loader from "../shared/components/Loader";
import PageNotFound from "../pages/PageNotFound";
import ProtectedRoute from "./ProtectedRoute";
const About = lazy(() => import("../pages/About"));
const Inicio = lazy(() => import("../pages/Inicio"));
const Login = lazy(() => import("../pages/Login"));
const Servicios = lazy(() => import("../pages/Servicios"));
const UserAppointments = lazy(() => import("../pages/UserAppointments"));
import Dashboard from "../Admin/pages/Dashboard";
import { AdminHolidayCalendar } from "../Admin/components/AdminHolidayCalendar";
import { RegisterService } from "../Admin/components/RegisterService";
import { ServicesEditionView } from "../Admin/pages/ServicesEditionView";
import { SuspendAppointments } from "../Admin/pages/SuspendAppointments";
import { TurnosAdmin } from "../Admin/components/TurnosAdmin";
import DashboardLayout from "../Admin/DashboardLayout";

// AdminRoutes defined within AuthRouter for simplicity
const AdminRoutes = () => (
  <Routes>
    <Route path="/" element={<DashboardLayout />}>
      <Route index element={<Dashboard />} />
      <Route path="agregar-servicio" element={<RegisterService />} />
      <Route path="editar-servicios" element={<ServicesEditionView />} />
      <Route path="turnos" element={<TurnosAdmin />} />
      <Route path="calendario-feriados" element={<AdminHolidayCalendar />} />
      <Route path="suspender-turnos" element={<SuspendAppointments />} />
    </Route>
  </Routes>
);

const AuthRouter = () => {
  return (
    <Suspense fallback={<Loader />}>
      <Routes>
        <Route path="/" element={<Inicio />} />
        <Route path="/sobre-nosotros" element={<About />} />
        <Route path="/login" element={<Login />} />
        <Route path="/servicio/:id" element={<Servicios />} />
        <Route
          path="/user/turnos"
          element={
            <ProtectedRoute>
              <UserAppointments />
            </ProtectedRoute>
          }
        />
        <Route
          path="/dashboard/*"
          element={
            <ProtectedRoute>
              <AdminRoutes />
            </ProtectedRoute>
          }
        />
        <Route path="*" element={<PageNotFound />} />
      </Routes>
    </Suspense>
  );
};

export default AuthRouter;
