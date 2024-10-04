import { lazy, Suspense, useContext, useEffect } from "react";
import { Link } from "react-router-dom";
import ContextoAdministrador from "../context/AuthContext";
import ServicesContext from "../context/ServiceContext";
import useTitle from "./../hooks/useTitle";
import Loader from "../shared/components/Loader";
import Cards from "../components/Cards";
import ContactInfo from "../components/ContactInfo";
import ListaTurnos from "../components/ListaTurnos";
import "./css/inicio.css";

const Intro = lazy(() => import("../components/Introduction"));
const Section = lazy(() => import("../components/HeroContainer"));

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
        <ContactInfo />
      </Suspense>
    </>
  );
};
export default Inicio;
