import NavLinks from "./NavLinks";
import { PowerIcon } from "../icons";
import { Link } from "react-router-dom";
import "./SideNav.css";

export default function SideNav() {
  return (
    <div className="side-nav">
      <Link className="logo-link" href="/">
        <div className="logo-container">
          <p className="hero-title font-bold">Pedicuría La Plata</p>
        </div>
      </Link>
      <div className="nav-links-container">
        <NavLinks />
        <div className="spacer"></div>
        <form>
          <button className="sign-out-button">
            <PowerIcon className="w-6" />
            <div className="sign-out-button">Sign Out</div>
          </button>
        </form>
      </div>
    </div>
  );
}
