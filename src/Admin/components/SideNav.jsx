import NavLinks from "./NavLinks";
import { PowerIcon } from "../../icons";
import { Link } from "react-router-dom";
import styles from "./css/SideNav.module.css";
import useContextValue from "../../hooks/useContextValue";
import AuthenticationContext from "../../context/AuthContext";

export default function SideNav() {
  const { logOut } = useContextValue(AuthenticationContext);
  return (
    <div className={styles.sideNav}>
      <Link className={styles.logoLink} to="/dashboard">
        <div className={styles.logoContainer}>
          <span className={styles.sideNavTitle}>Panel Administrador</span>
        </div>
      </Link>
      <div className={styles.navLinksContainer}>
        <NavLinks />
        <div className={styles.spacer}></div>
        <form>
          <button className={styles.signOutButton} onClick={logOut}>
            <PowerIcon />
            <div className={styles.signOutText}>Sign Out</div>
          </button>
        </form>
      </div>
    </div>
  );
}
