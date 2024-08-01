import { useState } from "react";
import role from "../../../assets/images/Role.png";
import backIcon from "../../../assets/icons/back-icon.png";
import projectsIcon from "../../../assets/icons/project-tab.png";
import synergiesIcon from "../../../assets/icons/Synergy.png";
import investmentIcon from "../../../assets/icons/presention-chart.png";
import chatIcon from "../../../assets/icons/message-text.png";
import profileIcon from "../../../assets/icons/user-square.png";
import logoutIcon from "../../../assets/icons/logout.png";
import styles from "./sideBar.module.css";

function SideBar() {
  const [activeButton, setActiveButton] = useState(null);

  const handleButtonClick = (buttonName) => {
    setActiveButton(buttonName);
  };

  return (
    <div className={styles.sideBarContainer}>
      <div className={styles.profileHeader}>
        <div className={styles.profileDetails}>
          <img src={role} className={styles.profilePic} alt="profile-pic" />
          <div className={styles.profileText}>
            <h1 className={styles.username}>Username</h1>
            <p className={styles.role}>Role</p>
          </div>
        </div>
        <img
          src={backIcon}
          className={`${styles.backIcon} ${styles.iconSize}`}
          alt="back-icon"
        />
      </div>
      <div className={styles.menuItem}>
        <img
          src={projectsIcon}
          className={styles.iconSize}
          alt="projects-icon"
        />
        <button
          className={`${styles.menuItemText} ${
            activeButton === "Projects" ? styles.active : ""
          }`}
          onClick={() => handleButtonClick("Projects")}
        >
          Projects
        </button>
      </div>
      <div className={styles.divider}>
        <div className={styles.menuItem}>
          <img
            src={synergiesIcon}
            className={styles.synergiesIcon}
            alt="synergies-icon"
          />
          <button
            className={`${styles.menuItemText} ${
              activeButton === "Synergies" ? styles.active : ""
            }`}
            onClick={() => handleButtonClick("Synergies")}
          >
            Synergies
          </button>
        </div>
        <div className={styles.menuItem}>
          <img
            src={investmentIcon}
            className={styles.iconSize}
            alt="investment-icon"
          />
          <button
            className={`${styles.menuItemText} ${
              activeButton === "Investment" ? styles.active : ""
            }`}
            onClick={() => handleButtonClick("Investment")}
          >
            Investment
          </button>
        </div>
      </div>
      <div className={styles.divider}>
        <div className={styles.menuItem}>
          <img src={chatIcon} className={styles.iconSize} alt="chat-icon" />
          <button
            className={`${styles.menuItemText} ${
              activeButton === "Chat" ? styles.active : ""
            }`}
            onClick={() => handleButtonClick("Chat")}
          >
            Chat
          </button>
          <p className={styles.chatNotification}>1</p>
        </div>
        <div className={styles.menuItem}>
          <img
            src={profileIcon}
            className={styles.iconSize}
            alt="profile-icon"
          />
          <button
            className={`${styles.menuItemText} ${
              activeButton === "Profile" ? styles.active : ""
            }`}
            onClick={() => handleButtonClick("Profile")}
          >
            Profile
          </button>
        </div>
      </div>
      <div className={`${styles.divider} ${styles.marginTop300}`}>
        <div className={styles.menuItem}>
          <img src={logoutIcon} className={styles.iconSize} alt="logout-icon" />
          <h1 className={styles.logoutText}>Logout</h1>
        </div>
      </div>
    </div>
  );
}

export default SideBar;
