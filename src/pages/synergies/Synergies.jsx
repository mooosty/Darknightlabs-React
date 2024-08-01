// src/pages/Project.js
import styles from "./synergies.module.css";
import NavComponent from "../../components/synergiesComponents/navComponent/navComponent";
import SearchComponent from "../../components/synergiesComponents/searchComponent/searchComponent";
import BottomTab from "../../components/synergiesComponents/bottomTabComponent/bottomTab";
import SideBar from "../../components/synergiesComponents/sideBar/sideBar";
import shadowFrameTop from "../../assets/images/shadow-frame-top.png";
import SynergiesCard from "../../components/synergiesComponents/synergiesCard/synergiesCard";

function Synergies() {
  return (
    <div className={styles.mainContainer}>
      <div className="border-b-2">
        <NavComponent />
        <div className={styles.midContainer}>
          <SideBar />
          <div className="xl:w-[1280px]">
            <SearchComponent tabName={"Synergies"} />
            <img
              src={shadowFrameTop}
              className="absolute top-[230px] ml-[8px]"
              alt="shadow-frame"
            />
            <SynergiesCard synergies={true} />
          </div>
        </div>
        <BottomTab />
      </div>
      {/* <div className="w-full 2xl:w-[1620px] flex justify-end"> */}
    </div>
    // </div>
  );
}

export default Synergies;
