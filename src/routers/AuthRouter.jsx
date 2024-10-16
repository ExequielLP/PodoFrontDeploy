import { Route, Routes } from "react-router-dom";
import { lazy, Suspense } from "react";
import Loader from "../shared/components/Loader";
import PageNotFound from "../pages/PageNotFound";
import ProtectedRoute from "./ProtectedRoute";
const About = lazy(() => import("../pages/About"));
const Inicio = lazy(() => import("../pages/Inicio"));
const Login = lazy(() => import("../pages/Login"));
const Dashboard = lazy(() => import("../pages/Dashboard"));
const Servicios = lazy(() => import("../pages/Servicios"));
const UserAppointments = lazy(() => import("../pages/UserAppointments"));

const AuthRouter = () => {
  return (
    <Suspense fallback={<Loader />}>
    <Routes>
      <Route path="/" element={<Inicio />} />
      <Route path="/sobre-nosotros" element={<About />} />
      <Route path="/login" element={<Login />} />
      <Route path="/servicio/:id" element={<Servicios />} />
      <Route path="/user/turnos" element={<ProtectedRoute><UserAppointments /></ProtectedRoute>} />
      <Route path="/admin/:section" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
      <Route path="*" element={<PageNotFound />} />
    </Routes>
  </Suspense>

  );
};

export default AuthRouter;
