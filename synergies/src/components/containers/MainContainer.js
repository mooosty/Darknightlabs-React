import React from "react";
import "./MainContainer.css";
import UserBox from "../user/UserBox";
import SynergiesBox from "../synergies/SynergiesBox";
import { Outlet, Route, Routes } from "react-router-dom";
import Aboutpage from "../../pages/Aboutpage"
import { FaArrowRightToBracket } from "react-icons/fa6";


export default function MainContainer() {
  const [showSideBar, setShowSideBar] = React.useState(true);

  return (
    <main className={showSideBar === true ? "main-content" : "main-content-center-hidden"}>
      {showSideBar === false ? (
        <div className="frb-div">
          <button className="show-sidebar-btn" onClick={() => setShowSideBar(true)}>
            <FaArrowRightToBracket />
          </button>
        </div>
      ) : (
        null
      )}
      <div className={showSideBar === true ? "ctr" : "ctrhidden"}>
        <UserBox setShowSideBar={setShowSideBar} />
      </div>
      <div className={showSideBar === true ? "ctr2" : "ctr2-hidden"}>
        {/* <SynergiesBox /> */}
        <Routes>
          <Route path="/synergies" element={<SynergiesBox />} />
          <Route path="/about" element={<Aboutpage />} />
        </Routes>
        <Outlet />
      </div>

    </main>
  );
}
