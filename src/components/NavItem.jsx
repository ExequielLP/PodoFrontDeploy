import { Link } from "react-router-dom";
import "./css/nav-links.css";

export const NavItem = ({ link = "", to = "/" }) => {
  return (
    <li className="nav-link-item">
      <Link className="link-text active-link" to={to}>
        {link}
      </Link>
    </li>
  );
};
