import { useContext, useState } from "react";
import { Link } from "react-router-dom";
import ContextoAdministrador from "../context/ContextLoginRegister";
import "./css/nav.css";

export const Navbar = () => {
  const { usuarioLogeado, logOut } = useContext(ContextoAdministrador);
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  return (
    <header>
      <nav className="navbar1">
        <ul className="nav-links-items">
          <li className="nav-link-item btn">
            <Link className="active-link" to="/">
              Inicio
            </Link>
          </li>
          <li className="nav-link-item btn">
            <Link className="active-link" to="/sobre-nosotros">
              Sobre Nosotros
            </Link>
          </li>
        </ul>
        <Link className="active-link" to="/">
          <img
            className="logo"
            src="/src/assets/ImagenesOptimizadas/CC2E1AA6-02E9-4DF2-BBD6-8BD62A378986.webp"
            alt="Podo Estetica"
          />
        </Link>
        <ul className="nav-links-items">
          <li className="nav-link-item btn">
            <Link className="active-link" to="/registro">
              Registrarse
            </Link>
          </li>
          <li className="nav-link-item btn">
            {usuarioLogeado.Auth === false ? (
              <Link className="active-link" to="/login">
                Login
              </Link>
            ) : (
              <Link
                onClick={() => {
                  logOut();
                }}
              >
                Cerrar Sesión
              </Link>
            )}
          </li>
        </ul>
        <div className="menu-icon" onClick={toggleMenu}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="40"
            height="40"
            viewBox="0 0 24 24"
            fill="none"
            stroke="#ffffff"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="icon icon-tabler icons-tabler-outline icon-tabler-menu-2"
          >
            <path stroke="none" d="M0 0h24v24H0z" fill="none" />
            <path d="M4 6l16 0" />
            <path d="M4 12l16 0" />
            <path d="M4 18l16 0" />
          </svg>
        </div>
        {menuOpen && (
          <div className="dropdown-navbar-menu">
            <div className="close-icon" onClick={toggleMenu}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="40"
                height="40"
                viewBox="0 0 24 24"
                fill="none"
                stroke="#ffffff"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="icon icon-tabler icon-tabler-x"
              >
                <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                <path d="M18 6l-12 12" />
                <path d="M6 6l12 12" />
              </svg>
            </div>
            <ul className="nav-links-items-dropdown">
              <li className="nav-link-item btn">
                <Link className="active-link" to="/" onClick={toggleMenu}>
                  Inicio
                </Link>
              </li>
              <li className="nav-link-item btn">
                <Link
                  className="active-link"
                  to="/sobre-nosotros"
                  onClick={toggleMenu}
                >
                  Sobre Nosotros
                </Link>
              </li>
              <li className="nav-link-item btn">
                <Link
                  className="active-link"
                  to="/registro"
                  onClick={toggleMenu}
                >
                  Registrarse
                </Link>
              </li>
              <li className="nav-link-item btn">
                {usuarioLogeado.Auth === false ? (
                  <Link
                    className="active-link"
                    to="/login"
                    onClick={toggleMenu}
                  >
                    Login
                  </Link>
                ) : (
                  <Link
                    onClick={() => {
                      logOut();
                      toggleMenu();
                    }}
                  >
                    Cerrar Sesión
                  </Link>
                )}
              </li>
            </ul>
          </div>
        )}
      </nav>
    </header>
  );
};
