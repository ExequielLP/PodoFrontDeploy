import { useState } from "react";
import useContextValue from "../../hooks/useContextValue";
import AuthenticationContext from "../../context/AuthContext";
import { MenuIcon, CloseIcon } from "../../icons/index";
import { Logo } from "./Logo";
import { NavItem } from "./NavItem";
import "../css/nav.css";

export const Navbar = () => {
  const { usuarioLogueado, logOut } = useContextValue(AuthenticationContext);
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => {
    setMenuOpen((prev) => !prev);
  };

  const handleLogOut = () => {
    logOut();
    toggleMenu();
  };

  return (
    <header className="header-container">
      <nav className="navbar-styles">
        <ul className="nav-links-items">
          <NavItem link="Inicio" to="/" />
          <NavItem link="Sobre Nosotros" to="/sobre-nosotros" />
          <NavItem to="/">
            <Logo height={80} width={80} />
          </NavItem>
          {usuarioLogueado.auth === false ? (
            <NavItem link="Registrarse" to="/registro" />
          ) : usuarioLogueado.rol === "ADMIN" ? (
            <NavItem link="Panel Admin" to="/admin/turnos" />
          ) : (
            <NavItem link="Mis turnos" to="/user/turnos" />
          )}
          {usuarioLogueado.auth === false ? (
            <NavItem link="Iniciar Sesión" to="/login" />
          ) : (
            <NavItem link="Cerrar Sesión" onClick={handleLogOut} />
          )}
        </ul>
        <ul className="menu-icon" onClick={toggleMenu}>
          <NavItem className="dropdown-logo-link" to="/">
            <Logo height={60} width={60} />
          </NavItem>
          <MenuIcon size={40} color="#ffffff" />
        </ul>
        {menuOpen && (
          <div className="dropdown-navbar-menu">
            <div className="close-icon" onClick={toggleMenu}>
              <CloseIcon size={40} color="#ffffff" />
            </div>
            <ul className="nav-links-items-dropdown">
              <NavItem link="Inicio" to="/" onClick={toggleMenu} />
              <NavItem
                link="Sobre Nosotros"
                to="/sobre-nosotros"
                onClick={toggleMenu}
              />
              {usuarioLogueado.auth === false ? (
                <NavItem
                  link="Registrarse"
                  to="/registro"
                  onClick={toggleMenu}
                />
              ) : usuarioLogueado.rol === "ADMIN" ? (
                <NavItem
                  link="Panel Admin"
                  to="/admin/turnos"
                  onClick={toggleMenu}
                />
              ) : (
                <NavItem
                  link="Mis turnos"
                  to="/user/turnos"
                  onClick={toggleMenu}
                />
              )}
              {usuarioLogueado.auth === false ? (
                <NavItem
                  link="Iniciar Sesión"
                  to="/login"
                  onClick={toggleMenu}
                />
              ) : (
                <NavItem link="Cerrar Sesión" onClick={handleLogOut} />
              )}
            </ul>
          </div>
        )}
      </nav>
    </header>
  );
};
