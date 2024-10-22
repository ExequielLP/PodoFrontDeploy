import { Route, Routes } from "react-router-dom";
import { Suspense, lazy } from "react";
import Loader from "../shared/components/Loader";
import PageNotFound from "../pages/PageNotFound";
import DashboardLayout from "../Admin/DashboardLayout";
const About = lazy(() => import("../pages/About"));
const Inicio = lazy(() => import("../pages/Inicio"));
const Login = lazy(() => import("../pages/Login"));
const Register = lazy(() => import("../pages/Register"));
const Servicios = lazy(() => import("../pages/Servicios"));
const PasswordRecovery = lazy(() => import("../pages/Password-recovery"));
const CreateNewPassword = lazy(() => import("../pages/Create-new-password"));
import { AdminHolidayCalendar } from "../components/AdminHolidayCalendar";
import { TurnosAdmin } from "../components/TurnosAdmin";
import { RegisterService } from "../components/RegisterService";

const PublicRouter = () => {
  return (
    <Suspense fallback={<Loader />}>
      <Routes>
        <Route path="/" element={<Inicio />} />
        <Route path="/sobre-nosotros" element={<About />} />
        <Route path="/login" element={<Login />} />
        <Route path="/registro" element={<Register />} />
        <Route path="/servicio/:id" element={<Servicios />} />
        <Route path="/password-recovery" element={<PasswordRecovery />} />
        <Route path="/dashboard" element={<DashboardLayout />}>
          <Route index element={<AdminHolidayCalendar />} />
          <Route path="register-service" element={<RegisterService />} />
          <Route path="turnos-admin" element={<TurnosAdmin />} />
          <Route
            path="another"
            element={
              <div>
                <h2>Turnos</h2>
              </div>
            }
          />
        </Route>
        <Route
          path="/create-new-password/:jwt"
          element={<CreateNewPassword />}
        />
        <Route path="*" element={<PageNotFound />} />
      </Routes>
    </Suspense>
  );
};

export default PublicRouter;
