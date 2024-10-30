import { Link } from "react-router-dom";

const Card = ({ listaServicios }) => {
  const { nombre, imagen, descripcion, id } = listaServicios;
  const { mime, content, name } = imagen;

  // Convierte la imagen base64 en una URL de objeto -> `data:${imagen.mime};base64,${imagenBase64}
  return (
    <article className="article-container">
      <img
        className="service-img"
        src={`data:${mime};base64,${content}`}
        alt={name}
      />
      <div className="article-text-container">
        <h3 className="article-title">{nombre}</h3>
        <p className="article-text">{descripcion}</p>
      </div>
      <Link to={`/servicio/${id}`} className="article-button">
        Mas informacion
      </Link>
    </article>
  );
};

export default Card;
