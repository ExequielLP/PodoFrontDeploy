import { Link } from "react-router-dom";
import { HomeIcon, UsersIcon, WorkIcon, CalendarSettingsIcon } from "../icons/index";
import "./NavLinks.css"
const links = [
  { name: "Home", href: "/dashboard", icon: HomeIcon },
  {
    name: "Servicios",
    href: "/dashboard/register-service",
    icon: WorkIcon,
  },
  {
    name: "Mis Turnos",
    href: "/dashboard/turnos-admin",
    icon: UsersIcon,
  },
  {
    name: "Calendario",
    href: "/dashboard/calendar",
    icon: CalendarSettingsIcon,
  },
];

export default function NavLinks() {
  return (
    <>
      {links.map((link) => {
        const LinkIcon = link.icon;
        return (
          <Link
            key={link.name}
            to={link.href}
            className={`nav-link {pathname === link.href ? 'active' : ''}`}
          >
            <LinkIcon className="w-6" />
            <p className="hidden md:block">{link.name}</p>
          </Link>
        );
      })}
    </>
  );
}
