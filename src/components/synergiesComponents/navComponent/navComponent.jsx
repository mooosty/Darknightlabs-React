// src/components/synergiesComponents/navComponent.js
import React from "react";
import menuIcon from "../../../assets/icons/menu-icons.png";
import styles from "./navComponent.module.css";

function NavComponent() {
  return (
    <div className={styles.navContainer}>
      <div className={styles.navWrapper}>
        <div className={styles.navTitle}>
          Darknight Labs
        </div>
        <div className={styles.navLinks}>
          <h1 className={styles.navLink}>Home page</h1>
        </div>
        <img
          src={menuIcon}
          alt="menu"
          className={styles.menuIcon}
        />
      </div>
    </div>
  );
}

export default NavComponent;
