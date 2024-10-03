import { useContext, useState } from "react";
import { Link } from "react-router-dom";
import ContextoAdministrador from "../context/AuthContext";
import { MenuIcon, CloseIcon } from "../icons/index";
import { Logo } from "./Logo";
import { NavItem } from "./NavItem";
import "./css/nav.css";

export const Navbar = () => {
  const { usuarioLogueado, logOut } = useContext(ContextoAdministrador);
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  return (
    <header className="header-container">
      <nav className="navbar-styles">
        <ul className="nav-links-items">
          <NavItem className="active-link" link="Inicio" to="/" />
          <NavItem
            className="active-link"
            link="Sobre Nosotros"
            to="/sobre-nosotros"
          />
          <Link className="active-link" to="/">
            <Logo height={80} width={80} />
          </Link>
          {usuarioLogueado.Auth === false ? (
            <NavItem
              className="active-link"
              link="Registrarse"
              to="/registro"
            />
          ) : usuarioLogueado.Rol === "ADMIN" ? (
            <NavItem
              className="active-link"
              link="Panel Admin"
              to="/admin/turnos"
            />
          ) : (
            <NavItem
              className="active-link"
              link="Mis turnos"
              to="/user/turnos"
            />
          )}
          {usuarioLogueado.Auth === false ? (
            <NavItem
              className="active-link"
              link="Iniciar Sesión"
              to="/login"
            />
          ) : (
            <Link
              className="active-link"
              onClick={() => {
                logOut();
              }}
            >
              Cerrar Sesión
            </Link>
          )}
        </ul>
        <div className="menu-icon" onClick={toggleMenu}>
          <Link className="dropdown-logo-link" to="/">
            <Logo height={60} width={60} />
          </Link>
          <MenuIcon size={40} color="#ffffff" />
        </div>
        {menuOpen && (
          <div className="dropdown-navbar-menu">
            <div className="close-icon" onClick={toggleMenu}>
              <CloseIcon size={40} color="#ffffff" />
            </div>
            <ul className="nav-links-items-dropdown">
              <NavItem
                className="active-link"
                link="Inicio"
                to="/"
                onClick={toggleMenu}
              />
              <NavItem
                className="active-link"
                link="Sobre Nosotros"
                to="/sobre-nosotros"
                onClick={toggleMenu}
              />
              {usuarioLogueado.Auth === false ? (
                <NavItem
                  className="active-link"
                  link="Registrarse"
                  to="/registro"
                  onClick={toggleMenu}
                />
              ) : usuarioLogueado.Rol === "ADMIN" ? (
                <NavItem
                  className="active-link"
                  link="Panel Admin"
                  to="/admin/turnos"
                  onClick={toggleMenu}
                />
              ) : (
                <NavItem
                  className="active-link"
                  link="Mis turnos"
                  to="/user/turnos"
                  onClick={toggleMenu}
                />
              )}
              {usuarioLogueado.Auth === false ? (
                <NavItem
                  className="active-link"
                  link="Iniciar Sesión"
                  to="/login"
                  onClick={toggleMenu}
                />
              ) : (
                <Link
                  className="active-link"
                  onClick={() => {
                    logOut();
                    toggleMenu();
                  }}
                >
                  Cerrar Sesión
                </Link>
              )}
            </ul>
          </div>
        )}
      </nav>
    </header>
  );
};
