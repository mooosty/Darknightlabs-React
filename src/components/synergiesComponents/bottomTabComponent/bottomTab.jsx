// src/components/synergiesComponents/bottomTab.js
import { tabData } from "../../../constants/synergiesConstants";
import styles from "./bottomTab.module.css";

function BottomTab() {
  return (
    <div className={styles.bottomTabContainer}>
      {tabData.map((tab, i) => (
        <div key={i} className="flex flex-col items-center gap-2 text-white">
          <img
            src={tab.tabIcon}
            className={styles.tabIcon}
            alt="project-tab"
            style={{ fill: "black" }} // Retaining inline style since Tailwind doesn't handle SVG fill color
          />
          <div
            className={`${tab.active ? styles.tabLabel + " " + styles.tabLabelActive : styles.tabLabel + " " + styles.tabLabelInactive}`}
          >
            {tab.tabLabel}
            {tab.tabNum && (
              <h1 className={styles.tabNumber}>
                {tab.tabNum}
              </h1>
            )}
          </div>
        </div>
      ))}
    </div>
  );
}

export default BottomTab;
