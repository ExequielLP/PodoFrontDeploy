import { Link, useLocation } from "react-router-dom";
import { ChevronRightIcon } from "../../icons/index";
import "../css/breadcrumb.css";
import useContextValue from "../../hooks/useContextValue";
import AuthenticationContext from "../../context/AuthContext";

const Breadcrumb = ({ title = "" }) => {
  const { usuarioLogueado } = useContextValue(AuthenticationContext);
  const location = useLocation();

  const getBreadcrumbLink = () => {
    if (usuarioLogueado.rol === "ADMIN") {
      if (location.pathname.startsWith("/dashboard")) {
        return "/dashboard";
      } else {
        return "/";
      }
    } else {
      return "/";
    }
  };

  return (
    <nav className="breadcrumb-nav" aria-label="Breadcrumb">
      <ol className="breadcrumb-list">
        <li className="breadcrumb-item">
        <Link to={getBreadcrumbLink()} className="breadcrumb-link">
            {usuarioLogueado.rol === "ADMIN" ? "Home" : "Inicio"}
          </Link>
          <ChevronRightIcon className="breadcrumb-icon" />
        </li>
        <li className="current-link">{title}</li>
      </ol>
    </nav>
  );
};

export default Breadcrumb;
