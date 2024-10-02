import { useEffect, useContext } from "react";
import { Link, useParams } from "react-router-dom";
import ContextoAdministrador from "../context/AuthContext";
import useTitle from "./../hooks/useTitle";
import { priceFormatter } from "../utils/priceFormatter";
import { Calendario } from "../components/Calendario";
import "./css/servicios.css";
import ServicesContext from "../context/ServiceContext";
import Loader from "./../components/Loader";
import Breadcrumb from "../components/Breadcrumb";
import ServiceCard from "../components/ServiceCard";

const Servicios = () => {
  const { usuarioLogueado } = useContext(ContextoAdministrador);
  const { servicio, seleccionarServicio } = useContext(ServicesContext);
  const { id } = useParams();

  useEffect(() => {
    if (!servicio || servicio.id !== id) {
      seleccionarServicio(id);
    }
  }, [id]);

  useTitle({ title: servicio ? servicio.nombre : "Cargando..." });

  if (!servicio) {
    return <Loader />;
  }

  const imagenBase64 = servicio.imagen.content;
  const imagenURL = `data:${servicio.imagen.mime};base64,${imagenBase64}`;
  return (
    <>
      <main className="service-container">
        <Breadcrumb title={servicio.nombre}/>
        <ServiceCard
          servicio={servicio}
          isAuthenticated={usuarioLogueado.Auth}
        />
        {usuarioLogueado.Auth === true &&
          <Calendario servicioId={servicio.id} />
        }
      </main>
    </>
  );
};

export default Servicios;
