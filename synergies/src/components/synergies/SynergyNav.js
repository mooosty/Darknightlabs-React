import React from "react";
import "./SynergyNav.css";
import { FaAlignJustify } from "react-icons/fa6";
import { FaBorderAll } from "react-icons/fa6";
import { FaFilter } from "react-icons/fa6";
import { FaPlus } from "react-icons/fa6";

export default function SynergyNav({
  setAddSynergy,
  setShowFilter,
  showFilter,
}) {
  return (
    <div className="add-syn-container">
      {/* <div className="syn-layout-wrap"> */}
        <div className="syn-btn-container-layout">
          <button className="syn-btn-layout">
            <FaAlignJustify />
          </button>
          <button className="syn-btn-layout inactive">
            <FaBorderAll />
          </button>
        </div>
      {/* </div> */}

      <div className="syn-btn-container">
        <button className="syn-btn" onClick={() => setShowFilter(!showFilter)}>
          <p>Filter</p>
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M5.40039 2.10001H18.6004C19.7004 2.10001 20.6004 3.00001 20.6004 4.10001V6.30001C20.6004 7.10001 20.1004 8.10001 19.6004 8.60001L15.3004 12.4C14.7004 12.9 14.3004 13.9 14.3004 14.7V19C14.3004 19.6 13.9004 20.4 13.4004 20.7L12.0004 21.6C10.7004 22.4 8.90039 21.5 8.90039 19.9V14.6C8.90039 13.9 8.50039 13 8.10039 12.5L4.30039 8.50001C3.80039 8.00001 3.40039 7.10001 3.40039 6.50001V4.20001C3.40039 3.00001 4.30039 2.10001 5.40039 2.10001Z"
              stroke="#F5EFDB"
              strokeWidth="1.5"
              strokeMiterlimit="10"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M10.93 2.10001L6 10"
              stroke="#F5EFDB"
              strokeWidth="1.5"
              strokeMiterlimit="10"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </button>
        <button className="syn-btn" onClick={() => setAddSynergy(true)}>
          <p>Add New Synergy</p>
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M6 12H18"
              stroke="#F5EFDB"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M12 18V6"
              stroke="#F5EFDB"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </button>
      </div>
    </div>
  );
}
