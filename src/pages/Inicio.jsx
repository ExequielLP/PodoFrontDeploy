import { useContext, useEffect } from "react";
import { Link } from "react-router-dom";
import ContextoAdministrador from "../context/ContextLoginRegister";
import useTitle from "./../hooks/useTitle";
import Cards from "../components/Cards";
import Introduccion from "../components/Introduccion";
import ListaTurnos from "../components/ListaTurnos";
import Seccion from "../components/Seccion";
import "./css/inicio.css";

const Inicio = () => {
  useTitle({ title: "Inicio" });

  const { usuarioLogeado, listaServicios, serviciosBack, listaTurnos, AuthTokenYUsiario } =
    useContext(ContextoAdministrador);

  useEffect(() => {
    serviciosBack();
    listaTurnos();
  }, []);

  return (
    <>
      <Seccion />
      <Introduccion />
      <section className="d-flex justify-content-center my-5 align-items-center">
        {usuarioLogeado.Auth === true && usuarioLogeado.Rol === "ADMIN" ? (
          <div className="admin-section-buttons">
            <Link className="admin-btn" to={"/admin/servicios"}>
              Servicios <span>&#11208;</span>
            </Link>
            <Link className="admin-btn" to={"/admin/turnos"}>
              Turnos <span>&#11208;</span>
            </Link>
          </div>
        ) : null}
        {usuarioLogeado.Auth === true && usuarioLogeado.Rol === "USER" ? (
          <ListaTurnos />
        ) : null}
      </section>
      <Cards listaServicios={listaServicios} />
    </>
  );
};
export default Inicio;
