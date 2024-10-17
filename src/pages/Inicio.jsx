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
import { useModalContext } from "../context/ModalContext";
import { Modal } from "../shared/components/Modal";

const Intro = lazy(() => import("../components/Introduction"));
const Section = lazy(() => import("../components/HeroContainer"));

const Inicio = () => {
  useTitle({ title: "Inicio" });
  const { setState } = useModalContext();
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
    listaTurnos();
  }, [serviciosBack, listaTurnos]);

  //Abre la modal
  const openModal = () => {
    console.log("me abri?")
    setState(true)
  }

  const handleEliminarTurno = async (turnoId) => {
    const success = await eliminarTurno(turnoId);
    if (success) {
      showToast(`Turno ${turnoId} eliminado con éxito`, "success");
      listaTurnos(); // Actualiza la lista de turnos después de la eliminación
    } else {
      showToast(`Error al eliminar el turno ${turnoId}`, "error");
    }
  };

  const renderAdminButtons = () => (
    <div className="admin-section-buttons">
      <Link className="admin-btn" to="/admin/servicios">
        Servicios <span>&#11208;</span>
      </Link>
      <Link className="admin-btn" to="/admin/turnos">
        Turnos <span>&#11208;</span>
      </Link>
      <Link className="admin-btn" to="/admin/calendarioAdmin">
        Calendario <span>&#11208;</span>
      </Link>
    </div>
  );

  return (
    <Suspense fallback={<Loader />}>
      <Section />
      <Intro />
      <section className="d-flex justify-content-center my-5 align-items-center">
        <button onClick={openModal}>Abrete sésamo</button>
        {usuarioLogueado.auth &&
          (usuarioLogueado.rol === "ADMIN" ? (
            renderAdminButtons()
          ) : (
            <ListaTurnos
              onEliminarTurno={handleEliminarTurno}
              turnos={arrayTurnos}
            />
          ))}
      </section>
      <Cards listaServicios={listaServicios} />
      <ContactInfo />
    </Suspense>
  );
};
export default Inicio;
