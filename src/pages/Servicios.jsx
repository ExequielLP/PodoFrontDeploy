import { useEffect } from "react";
import { useParams } from "react-router-dom";
import AuthenticationContext from "../context/AuthContext";
import ServicesContext from "../context/ServiceContext";
import useContextValue from "../hooks/useContextValue";
import useTitle from "./../hooks/useTitle";
import Loader from "../shared/components/Loader";
import Breadcrumb from "../components/Breadcrumb";
import { Calendario } from "../components/Calendario";
import { FaqSection } from "../components/FaqSection";
import { Metrics } from "../components/Metrics";
import { RelatedServices } from "../components/RelatedServices";
import ServiceCard from "../components/ServiceCard";
import "./css/servicios.css";

const Servicios = () => {
  const { usuarioLogueado } = useContextValue(AuthenticationContext);
  const { servicio, seleccionarServicio } = useContextValue(ServicesContext);
  const { id } = useParams();
  useTitle({ title: servicio ? servicio.nombre : "Cargando..." });

  useEffect(() => {
    if (!servicio || servicio.id !== id) {
      seleccionarServicio(id);
    }
  }, [id]);

  if (!servicio) {
    return <Loader />;
  }

  const imagenURL = `data:${servicio.imagen.mime};base64,${servicio.imagen.content}`;

  return (
    <main className="service-container">
      <Breadcrumb title={servicio.nombre} />
      <ServiceCard servicio={servicio} isAuthenticated={usuarioLogueado.auth} />
      {usuarioLogueado.auth && <Calendario servicioId={servicio.id} />}
      <RelatedServices />
      <FaqSection />
      <Metrics />
    </main>
  );
};

export default Servicios;
