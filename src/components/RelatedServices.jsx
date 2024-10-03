import { useContext, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { priceFormatter } from "../utils/priceFormatter";
import ServicesContext from "../context/ServiceContext";
import "./css/related-services.css";

export const RelatedServices = () => {
  const { serviciosBack, listaServicios, seleccionarServicio } =
    useContext(ServicesContext);
  const { id } = useParams();

  useEffect(() => {
    serviciosBack();
  }, []);

  useEffect(() => {
    window.scrollTo(0, 0);
    seleccionarServicio(id);
  }, [id]);

  console.log(listaServicios);
  return (
    <div className="related-services-container">
      <h2 className="related-services-title">Servicios Relacionados</h2>
      <div className="related-services-grid">
        {listaServicios.map((service) => (
          <div key={service.id} className="related-service-card">
            <h3 className="related-service-title">{service.nombre}</h3>
            <p className="related-service-price">
              {priceFormatter(service.costo)}
            </p>
            <Link
              to={`/servicio/${service.id}`}
              className="related-service-link"
            >
              Ver detalles
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};
