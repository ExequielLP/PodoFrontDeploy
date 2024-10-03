import { Route, Routes } from "react-router-dom";
import { Suspense, lazy } from "react";
import Loader from "../shared/components/Loader";
import PageNotFound from "../pages/PageNotFound";
const About = lazy(() => import("../pages/About"));
const Inicio = lazy(() => import("../pages/Inicio"));
const Login = lazy(() => import("../pages/Login"));
const Register = lazy(() => import("../pages/Register"));
const Servicios = lazy(() => import("../pages/Servicios"));
const PasswordRecovery = lazy(() => import("../pages/Password-recovery"));
const CreateNewPassword = lazy(() => import("../pages/Create-new-password"));

const PublicRoutes = () => {
  return (
    <>
      <Routes>
        <Route
          path="/"
          element={
            <Suspense fallback={<Loader />}>
              <Inicio />
            </Suspense>
          }
        />
        <Route
          path="/sobre-nosotros"
          element={
            <Suspense fallback={<Loader />}>
              <About />
            </Suspense>
          }
        />
        <Route
          path="/login"
          element={
            <Suspense fallback={<Loader />}>
              <Login />
            </Suspense>
          }
        />
        <Route
          path="/registro"
          element={
            <Suspense fallback={<Loader />}>
              <Register />
            </Suspense>
          }
        />
        <Route
          path="/servicio/:id"
          element={
            <Suspense fallback={<Loader />}>
              <Servicios />
            </Suspense>
          }
        />
        <Route
          path="/password-recovery"
          element={
            <Suspense fallback={<Loader />}>
              <PasswordRecovery />
            </Suspense>
          }
        />
        <Route
          path="/create-new-password/:jwt"
          element={
            <Suspense fallback={<Loader />}>
              <CreateNewPassword />
            </Suspense>
          }
        />
        <Route path="*" element={<PageNotFound />} />
      </Routes>
    </>
  );
};

export default PublicRoutes;
