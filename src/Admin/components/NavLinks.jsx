import { NavLink } from "react-router-dom";
import {
  EditIcon,
  HomeIcon,
  UsersIcon,
  WorkIcon,
  CalendarSettingsIcon,
  CalendarCrossIcon,
} from "../../icons/index";
import styles from "./css/NavLinks.module.css";
const links = [
  { name: "Home", href: "/dashboard", icon: HomeIcon },
  {
    name: "Agregar Feriados",
    href: "/dashboard/calendario-feriados",
    icon: CalendarSettingsIcon,
  },
  {
    name: "Agregar Servicio",
    href: "/dashboard/agregar-servicio",
    icon: WorkIcon,
  },
  {
    name: "Ver Servicios",
    href: "/dashboard/editar-servicios",
    icon: EditIcon,
  },
  {
    name: "Ver Turnos",
    href: "/dashboard/turnos",
    icon: UsersIcon,
  },
  {
    name: "Suspender Turnos",
    href: "/dashboard/suspender-turnos",
    icon: CalendarCrossIcon,
  },
];

export default function NavLinks() {

// const sortedLinks= links.sort((a, b) =>
//   a.name > b.name ? 1 : -1
// );

  return (
    <>
      {links.map((link) => {
        const LinkIcon = link.icon;
        return (
          <NavLink
            key={link.name}
            to={link.href}
            className={({ isActive }) =>
              `${styles.navLink} ${isActive ? styles.active : ""}`
            }
            end
          >
            <LinkIcon />
            <span className={styles.linkText}>{link.name}</span>
          </NavLink>
        );
      })}
    </>
  );
}
