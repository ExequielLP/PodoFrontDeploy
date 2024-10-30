import { lazy, Suspense } from "react";
import { Route, Routes } from "react-router-dom";
import useContextValue  from "../hooks/useContextValue";
import AuthenticationContext from "../context/AuthContext";
import Loader from "../shared/components/Loader";
const AuthRouterLazy = lazy(() => import("./AuthRouter"));
const PublicRouterLazy = lazy(() => import("./PublicRouter"));

const AppRouters = () => {
  const { usuarioLogueado } = useContextValue(AuthenticationContext);

  return (
    <Suspense fallback={<Loader />}>
      <Routes>
        <Route
          path="/*"
          element={
            usuarioLogueado.auth ? <AuthRouterLazy /> : <PublicRouterLazy />
          }
        />
      </Routes>
    </Suspense>
  );
};

export default AppRouters;
