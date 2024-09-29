import { lazy, Suspense, useContext, useEffect } from "react";
import ContextoAdministrador from "../context/AuthContext";
import { Route, Routes } from "react-router-dom";
import Loader from "../components/Loader";
const AuthRoutesLazy = lazy(() => import("./AuthRoutes"));
const PublicRoutesLazy = lazy(() => import("./PublicRoutes"));

const AppRouters = () => {
  const { usuarioLogueado, AuthTokenYUsuario } = useContext(
    ContextoAdministrador
  );
  useEffect(() => {
    AuthTokenYUsuario();
  }, [AuthTokenYUsuario]);

  return (
    <Routes>     
      {usuarioLogueado.Auth === false ? (
        <Route
          path="/*"
          element={
            <Suspense fallback={<Loader />}>
              <PublicRoutesLazy />
            </Suspense>
          }
        />
      ) : (
        <Route
          path="/*"
          element={
            <Suspense fallback={<Loader />}>
              <AuthRoutesLazy />
            </Suspense>
          }
        />
      )}
    </Routes>
  );
};

export default AppRouters;
