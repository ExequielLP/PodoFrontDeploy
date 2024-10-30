import { Link } from "react-router-dom";
import "../css/nav-links.css";

export const NavItem = ({ link = "", to = "/", onClick, children  }) => {
  const handleClick = (e) => {
    if (onClick) {
      onClick();
    }
  };

  return (
    <li className={children ? "" :"nav-link-item"}>
      <Link className={children ? "" : "link-text active-link"} to={to} onClick={handleClick}>
      {children || link}
      </Link>
    </li>
  );
};
