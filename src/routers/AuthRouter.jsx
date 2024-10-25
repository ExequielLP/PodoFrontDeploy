import { Route, Routes } from "react-router-dom";
import { lazy, Suspense } from "react";
import Loader from "../shared/components/Loader";
import PageNotFound from "../pages/PageNotFound";
import ProtectedRoute from "./ProtectedRoute";
import AdminRoutes from "./AdminRoutes";
const About = lazy(() => import("../pages/About"));
const Inicio = lazy(() => import("../pages/Inicio"));
const Login = lazy(() => import("../pages/Login"));
const Servicios = lazy(() => import("../pages/Servicios"));
const UserAppointmentsView = lazy(() => import("../pages/UserAppointmentsView"));

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
              <UserAppointmentsView />
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
