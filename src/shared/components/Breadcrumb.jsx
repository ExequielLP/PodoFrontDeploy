import { Link } from "react-router-dom";
import { ChevronRightIcon } from "../../icons/index";
import "../css/breadcrumb.css";
import useContextValue from "../../hooks/useContextValue";
import AuthenticationContext from "../../context/AuthContext";

const Breadcrumb = ({ title = "" }) => {
  const { usuarioLogueado } = useContextValue(AuthenticationContext);

  return (
    <nav className="breadcrumb-nav" aria-label="Breadcrumb">
      <ol className="breadcrumb-list">
        <li className="breadcrumb-item">
          {usuarioLogueado.rol === "ADMIN" ? (
            <Link to="/dashboard" className={`breadcrumb-link`}>
              Home
            </Link>
          ) : (
            <Link to="/" className={`breadcrumb-link`}>
              Inicio
            </Link>
          )}
          <ChevronRightIcon className="breadcrumb-icon" />
        </li>
        <li className="current-link">{title}</li>
      </ol>
    </nav>
  );
};

export default Breadcrumb;
