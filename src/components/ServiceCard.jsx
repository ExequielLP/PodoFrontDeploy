import { Link } from "react-router-dom";
import "./css/service-card.css";
import { priceFormatter } from "../utils/priceFormatter";
import { CalendarDownIcon } from "../icons";

const ServiceCard = ({ servicio, isAuthenticated = false }) => {
  const imagenBase64 = servicio.imagen.content;
  const imagenURL = `data:${servicio.imagen.mime};base64,${imagenBase64}`;
  return (
    <main className="service-card-container">
      <section className="service-card-content">
        <aside className="service-image-wrapper">
          <div className="image-container image-container-md">
            <img
              className="service-image"
              src={imagenURL}
              alt={servicio.nombre}
              height={330}
              width={330}
            />
          </div>
        </aside>
        <article className="service-content-padding">
          <header className="flex justify-between items-center">
            <h3 className="service-card-title">{servicio.nombre}</h3>
          </header>
          <p className="service-description">{servicio.descripcion}</p>
          <div className="service-price-container">
            <span className="service-price">{priceFormatter(servicio.costo)}</span>
          </div>
          <footer className="service-button">
            {isAuthenticated === false ? (
              <Link to="/login" className="admin-btn">
                Contratar Servicio
              </Link>
            ) : (
              <button className="admin-btn calendar-icon-btn">
                Agendar visita
                <CalendarDownIcon className="calendar-icon"/>
              </button>
            )}
          </footer>
        </article>
      </section>
    </main>
  );
};

export default ServiceCard;
