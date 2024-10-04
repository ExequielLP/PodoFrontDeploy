import { Link } from "react-router-dom";
import useTitle from "./../hooks/useTitle";
import "./css/PageNotFound.css";

const PageNotFound = () => {
  useTitle({ title: "Página no encontrada!" });
  return (
    <main className="error-container">
      <div className="error-text">
        <h1 className="error-number">404</h1>
        <p className="paragraph">¡Ups! Parece que has dado un paso en falso.</p>
        <img
          src="/assets/404-podologa.jpeg"
          alt="Huella de pie"
          width={250}
          height={250}
          className="image"
        />
        <Link to="/" className="admin-btn">
          Volver al Inicio
        </Link>
      </div>
    </main>
  );
};

export default PageNotFound;
