import { Route, Routes } from "react-router-dom";
import { lazy, Suspense, useContext } from "react";
import ContextoAdministrador from "./../context/AuthContext";
import Loader from "../components/Loader";
import PageNotFound from "../pages/PageNotFound";
const About = lazy(() => import("../pages/About"));
const Inicio = lazy(() => import("../pages/Inicio"));
const Login = lazy(() => import("../pages/Login"));
const Dashboard = lazy(() => import("../pages/Dashboard"));
const Servicios = lazy(() => import("../pages/Servicios"));
const ListaTurnos = lazy(() => import("../components/ListaTurnos"));

const AuthRoutes = () => {
  const { usuarioLogueado } = useContext(ContextoAdministrador);
  console.log(usuarioLogueado);
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
          path="/user/turnos"
          element={
            <Suspense fallback={<Loader />}>
              <ListaTurnos />
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
          path="/login"
          element={
            <Suspense fallback={<Loader />}>
              <Login />
            </Suspense>
          }
        />
        {usuarioLogueado.Auth === true && usuarioLogueado.Rol === "ADMIN" ? (
          <Route
            path="/admin/:section"
            element={
              <Suspense fallback={<Loader />}>
                <Dashboard />
              </Suspense>
            }
          />
        ) : (
          <Route
            path="/login"
            element={
              <Suspense fallback={<Loader />}>
                <Login />
              </Suspense>
            }
          />
        )}
         <Route path="*" element={<PageNotFound />} />
      </Routes>
    </>
  );
};

export default AuthRoutes;
