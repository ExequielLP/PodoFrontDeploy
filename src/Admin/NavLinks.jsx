import { NavLink } from "react-router-dom";
import {
  HomeIcon,
  UsersIcon,
  WorkIcon,
  CalendarSettingsIcon,
  CalendarCrossIcon,
} from "../icons/index";
import styles from "./NavLinks.module.css";
const links = [
  { name: "Home", href: "/dashboard", icon: HomeIcon },
  {
    name: "Servicios",
    href: "/dashboard/servicios",
    icon: WorkIcon,
  },
  {
    name: "Turnos",
    href: "/dashboard/turnos",
    icon: UsersIcon,
  },
  {
    name: "Agregar Feriados",
    href: "/dashboard/calendario-feriados",
    icon: CalendarSettingsIcon,
  },
  {
    name: "Suspender Turnos",
    href: "/dashboard/suspender-turnos",
    icon: CalendarCrossIcon,
  },
];

export default function NavLinks() {
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
