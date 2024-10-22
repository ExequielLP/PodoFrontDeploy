import NavLinks from "./NavLinks";
import { PowerIcon } from "../icons";
import { Link } from "react-router-dom";
import styles from "./SideNav.module.css";

export default function SideNav() {
  return (
    <div className={styles.sideNav}>
      <Link className={styles.logoLink} href="/">
        <div className={styles.logoContainer}>
          <span className={styles.sideNavTitle}>Panel Administrador</span>
        </div>
      </Link>
      <div className={styles.navLinksContainer}>
        <NavLinks />
        <div className={styles.spacer}></div>
        <form>
          <button className={styles.signOutButton}>
            <PowerIcon />
            <div className={styles.signOutText}>Sign Out</div>
          </button>
        </form>
      </div>
    </div>
  );
}
