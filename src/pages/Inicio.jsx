import { lazy, Suspense, useContext, useEffect } from "react";
import { Link } from "react-router-dom";
import ContextoAdministrador from "../context/AuthContext";
import useTitle from "./../hooks/useTitle";
import Cards from "../components/Cards";
//import Introduccion from "../components/Introduccion";
import ListaTurnos from "../components/ListaTurnos";
//import Seccion from "../components/Seccion";
import "./css/inicio.css";
import ServicesContext from "../context/ServiceContext";
import Loader from "../components/Loader";

const Intro = lazy(() => import("../components/Introduccion"));
const Section = lazy(() => import("../components/Seccion"));

const Inicio = () => {
  useTitle({ title: "Inicio" });

  const { usuarioLogueado } = useContext(ContextoAdministrador);
  const { serviciosBack, listaTurnos, listaServicios } =
    useContext(ServicesContext);

  useEffect(() => {
    serviciosBack();
    listaTurnos();
  }, []);

  return (
    <>
      <Suspense fallback={<Loader />}>
        <Section />
        <Intro />
        <section className="d-flex justify-content-center my-5 align-items-center">
          {usuarioLogueado.Auth === true && usuarioLogueado.Rol === "ADMIN" ? (
            <div className="admin-section-buttons">
              <Link className="admin-btn" to={"/admin/servicios"}>
                Servicios <span>&#11208;</span>
              </Link>
              <Link className="admin-btn" to={"/admin/turnos"}>
                Turnos <span>&#11208;</span>
              </Link>
              <Link className="admin-btn" to={"/admin/calendarioAdmin"}>
                Calendario <span>&#11208;</span>
              </Link>
            </div>
          ) : null}
          {usuarioLogueado.Auth === true && usuarioLogueado.Rol === "USER" ? (
            <ListaTurnos />
          ) : null}
        </section>
        <Cards listaServicios={listaServicios} />
      </Suspense>
    </>
  );
};
export default Inicio;
