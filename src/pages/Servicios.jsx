import { useEffect, useContext } from "react";
import { Link, useParams } from "react-router-dom";
import ContextoAdministrador from "../context/ContextLoginRegister";
import useTitle from "./../hooks/useTitle";
import Calendario from "../components/Calendario";
import "./css/servicios.css";

const Servicios = () => {
  const { servicio, seleccionarServicio, usuarioLogeado, AuthTokenYUsiario } = useContext(
    ContextoAdministrador
  );
  const { id } = useParams();

  useEffect(() => {
    if (!servicio || servicio.id !== id) {
      seleccionarServicio(id);
    }
  }, [id]);

  useTitle({ title: servicio ? servicio.nombre : "Cargando..." });

  if (!servicio) {
    return <div>Cargando...Servicio</div>;
  }

  const imagenBase64 = servicio.imagen.content;
  const imagenURL = `data:${servicio.imagen.mime};base64,${imagenBase64}`;
  return (
    <>
      <section className="hero-service-section">
        <div className="hero-service-container">
          <img className="hero-service-img" src={imagenURL} alt="Spa de pies" />
          <img
            className="hero-img2"
            src="/src/assets/ImagenesOptimizadas/spa-treatment-product-female-feet-hand-spa_1150-37700.jpg.url"
            alt="Spa de pies"
          />
          <div className="hero-service-text-container">
            <h5 className="hero-service-title">{servicio.nombre}</h5>
            <p className="hero-service-text">{servicio.descripcion}</p>
            <div className="service-price-section">
              <p className="hero-service-text-price">
                Valor del servicio:
                <small className="service-price">${servicio.costo}</small>
              </p>
            </div>
          </div>
        </div>
      </section>

      {usuarioLogeado.Auth === false ? (
        <Link className="hero-service-button" to={"/login"}>
          Contratar
        </Link>
      ) : (
        <Calendario servicioId={servicio.id} />
      )}
    </>
  );
};

export default Servicios;
