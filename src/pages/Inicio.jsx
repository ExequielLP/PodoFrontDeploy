import { lazy, Suspense, useEffect } from "react";
import { Link } from "react-router-dom";
import ServicesContext from "../context/ServiceContext";
import AuthenticationContext from "../context/AuthContext";
import useContextValue from "../hooks/useContextValue";
import useTitle from "./../hooks/useTitle";
import Loader from "../shared/components/Loader";
import Cards from "../components/Cards";
import ContactInfo from "../components/ContactInfo";
import ListaTurnos from "../components/ListaTurnos";
import "./css/inicio.css";
import showToast from "../utils/toastUtils";

const Intro = lazy(() => import("../components/Introduction"));
const Section = lazy(() => import("../components/HeroContainer"));

const Inicio = () => {
  useTitle({ title: "Inicio" });
  const { usuarioLogueado } = useContextValue(AuthenticationContext);
  const {
    arrayTurnos,
    serviciosBack,
    listaTurnos,
    listaServicios,
    eliminarTurno,
  } = useContextValue(ServicesContext);

  useEffect(() => {
    serviciosBack();

    {
      usuarioLogueado.rol === "USER" ? listaTurnos() : null;
    }
  }, [serviciosBack, listaTurnos]);

  const handleEliminarTurno = async (turnoId) => {
    const success = await eliminarTurno(turnoId);
    if (success) {
      showToast(`Turno ${turnoId} eliminado con éxito`, "success");
      listaTurnos(); // Actualiza la lista de turnos después de la eliminación
    } else {
      showToast(`Error al eliminar el turno ${turnoId}`, "error");
    }
  };

  return (
    <Suspense fallback={<Loader />}>
      <Section />
      <Intro />
      <section className="d-flex justify-content-center my-5 align-items-center">
        {usuarioLogueado.auth && usuarioLogueado.rol === "USER" && (
          <ListaTurnos
            onEliminarTurno={handleEliminarTurno}
            turnos={arrayTurnos}
          />
        )}
      </section>
      <Cards listaServicios={listaServicios} />
      <ContactInfo />
    </Suspense>
  );
};
export default Inicio;
