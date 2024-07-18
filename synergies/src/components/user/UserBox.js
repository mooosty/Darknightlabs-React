import React, { useContext, useEffect } from "react";
import "./UserBox.css";
import { synCtx } from "../../context/context";
import { Link, NavLink, useLocation } from "react-router-dom";
import { LuLayoutPanelLeft } from "react-icons/lu";
import { RiCheckboxMultipleLine } from "react-icons/ri";

import { FaSpinner } from "react-icons/fa6";
import { PiChatText } from "react-icons/pi";

import { TbUserSquare } from "react-icons/tb";

import { LuArrowLeftToLine } from "react-icons/lu";

import { BsBoxArrowLeft } from "react-icons/bs";

export default function UserBox({ setShowSideBar }) {
  const { dbData } = useContext(synCtx);
  const [activeNav, setActiveNav] = React.useState("projectsmanager");
  const location = useLocation();

  useEffect(() => {
    // Step 3: Get the current path
    const currentPath = location.pathname;
    // Step 4: Check if the current path is /synergies
    if (currentPath === "/synergies") {
      // Step 5: Update activeNav state
      setActiveNav("synergies");
    } else if (currentPath === "/projectsmanager") {
      setActiveNav("projectsmanager");
    } else if (currentPath === "/pendingSynergies") {
      setActiveNav("pendingsynergies");
    } else if (currentPath === "/chat") {
      setActiveNav("chat");
    } else if (currentPath === "/profile") {
      setActiveNav("profile");
    }
  }, [location]);

  // console.log(dbData);

  return (
    <div className="user-container">
      {dbData ? (
        <div className="user-info-box">
          {/* Show/Hide Bar Button */}

          {/* image */}
          <img src={dbData.user.profileImage} alt="avatar" />
          {/* username */}
          <div className="user-info">
            <h2>{dbData.user.username}</h2>
            <p>{dbData.user.role}</p>
          </div>
          <button className="hide-btn" onClick={() => setShowSideBar(false)}>
            <svg
              width=".9em"
              height=".9em"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <g clipPath="url(#clip0_658_17597)">
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M0 18.375C0 18.6734 0.118526 18.9595 0.329505 19.1705C0.540483 19.3815 0.826631 19.5 1.125 19.5C1.42337 19.5 1.70952 19.3815 1.9205 19.1705C2.13147 18.9595 2.25 18.6734 2.25 18.375V5.625C2.25 5.32663 2.13147 5.04048 1.9205 4.8295C1.70952 4.61853 1.42337 4.5 1.125 4.5C0.826631 4.5 0.540483 4.61853 0.329505 4.8295C0.118526 5.04048 0 5.32663 0 5.625L0 18.375ZM11.7615 6.33C11.9722 6.54094 12.0905 6.82687 12.0905 7.125C12.0905 7.42313 11.9722 7.70906 11.7615 7.92L8.8065 10.875H22.875C23.1734 10.875 23.4595 10.9935 23.6705 11.2045C23.8815 11.4155 24 11.7016 24 12C24 12.2984 23.8815 12.5845 23.6705 12.7955C23.4595 13.0065 23.1734 13.125 22.875 13.125H8.8065L11.7615 16.08C11.872 16.183 11.9607 16.3072 12.0222 16.4452C12.0837 16.5832 12.1167 16.7322 12.1194 16.8832C12.1221 17.0343 12.0943 17.1843 12.0377 17.3244C11.9811 17.4645 11.8969 17.5917 11.7901 17.6986C11.6832 17.8054 11.556 17.8896 11.4159 17.9462C11.2758 18.0028 11.1258 18.0306 10.9747 18.0279C10.8237 18.0252 10.6747 17.9922 10.5367 17.9307C10.3987 17.8692 10.2745 17.7805 10.1715 17.67L5.295 12.795L4.5 12L5.295 11.205L10.17 6.33C10.2745 6.22546 10.3985 6.14253 10.5351 6.08594C10.6716 6.02936 10.818 6.00024 10.9657 6.00024C11.1135 6.00024 11.2599 6.02936 11.3964 6.08594C11.533 6.14253 11.657 6.22546 11.7615 6.33Z"
                  fill="#F5EFDB"
                />
              </g>
              <defs>
                <clipPath id="clip0_658_17597">
                  <rect width="24" height="24" fill="white" />
                </clipPath>
              </defs>
            </svg>
          </button>
        </div>
      ) : (
        <p>Loading...</p>
      )}
      <div className="user-nav-container">
        <div className="usernav-link">
          <div
            className={
              activeNav === "projectsmanager"
                ? "usernav-link-icon-wrap active"
                : "usernav-link-icon-wrap"
            }
          >
            <LuLayoutPanelLeft />
            <NavLink
              activeclassname="active"
              onClick={() => setActiveNav("projectsmanager")}
              to="projectsmanager"
            >
              Projects Manager
            </NavLink>
          </div>
        </div>
        <div
          style={{
            width: "100%",
            display: "flex",
            justifyContent: "center",
          }}
        >
          <div className="divider"></div>
        </div>
        <div className="usernav-link">
          <div
            className={
              activeNav === "pendingsynergies"
                ? "usernav-link-icon-wrap active"
                : "usernav-link-icon-wrap"
            }
          >
            <svg
              width=".9em"
              height=".9em"
              viewBox="0 0 20 20"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M7.49935 18.3333H12.4993C16.666 18.3333 18.3327 16.6667 18.3327 12.5V7.50001C18.3327 3.33334 16.666 1.66667 12.4993 1.66667H7.49935C3.33268 1.66667 1.66602 3.33334 1.66602 7.50001V12.5C1.66602 16.6667 3.33268 18.3333 7.49935 18.3333Z"
                stroke="#F5EFDB"
                strokeWidth="1.5"
                strokeLinecap="round"
              />
              <path
                d="M8.82617 6.39999H12.3595V9.94166"
                stroke="#F5EFDB"
                strokeWidth="1.5"
                strokeLinecap="round"
              />
              <path
                d="M12.3592 6.39999L7.64258 11.1167"
                stroke="#F5EFDB"
                strokeWidth="1.5"
                strokeLinecap="round"
              />
              <path
                d="M5 13.7583C8.24167 14.8417 11.7583 14.8417 15 13.7583"
                stroke="#F5EFDB"
                strokeWidth="1.5"
                strokeLinecap="round"
              />
            </svg>

            <NavLink
              activeclassname="active"
              onClick={() => setActiveNav("pendingsynergies")}
              to="pendingsynergies"
            >
              Pending Synergies
            </NavLink>
          </div>
          <div
            className={
              activeNav === "synergies"
                ? "usernav-link-icon-wrap active"
                : "usernav-link-icon-wrap"
            }
          >
            <RiCheckboxMultipleLine />
            <NavLink
              activeclassname="active"
              onClick={() => setActiveNav("synergies")}
              to="synergies"
            >
              Synergies Manager
            </NavLink>
          </div>
        </div>
        <div
          style={{
            width: "100%",
            display: "flex",
            justifyContent: "center",
          }}
        >
          <div className="divider"></div>
        </div>
        <div className="usernav-link">
          <div
            className={
              activeNav === "chat"
                ? "usernav-link-icon-wrap active"
                : "usernav-link-icon-wrap"
            }
          >
            <svg
              width=".9em"
              height=".9em"
              viewBox="0 0 20 20"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M13.3327 18.9583H2.49935C1.69935 18.9583 1.04102 18.3 1.04102 17.5V6.66667C1.04102 2.98333 2.98268 1.04167 6.66602 1.04167H13.3327C17.016 1.04167 18.9577 2.98333 18.9577 6.66667V13.3333C18.9577 17.0167 17.016 18.9583 13.3327 18.9583ZM6.66602 2.29167C3.68268 2.29167 2.29102 3.68333 2.29102 6.66667V17.5C2.29102 17.6167 2.38268 17.7083 2.49935 17.7083H13.3327C16.316 17.7083 17.7077 16.3167 17.7077 13.3333V6.66667C17.7077 3.68333 16.316 2.29167 13.3327 2.29167H6.66602Z"
                fill="#F5EFDB"
              />
              <path
                d="M14.1673 8.54167H5.83398C5.49232 8.54167 5.20898 8.25833 5.20898 7.91667C5.20898 7.575 5.49232 7.29167 5.83398 7.29167H14.1673C14.509 7.29167 14.7923 7.575 14.7923 7.91667C14.7923 8.25833 14.509 8.54167 14.1673 8.54167Z"
                fill="#F5EFDB"
              />
              <path
                d="M11.6673 12.7083H5.83398C5.49232 12.7083 5.20898 12.425 5.20898 12.0833C5.20898 11.7417 5.49232 11.4583 5.83398 11.4583H11.6673C12.009 11.4583 12.2923 11.7417 12.2923 12.0833C12.2923 12.425 12.009 12.7083 11.6673 12.7083Z"
                fill="#F5EFDB"
              />
            </svg>

            <NavLink
              activeclassname="active"
              onClick={() => setActiveNav("chat")}
              to="chat"
            >
              Chat
            </NavLink>
          </div>
          <div
            className={
              activeNav === "profile"
                ? "usernav-link-icon-wrap active"
                : "usernav-link-icon-wrap"
            }
          >
            <TbUserSquare />
            <NavLink
              activeclassname="active"
              onClick={() => setActiveNav("profile")}
              to="profile"
            >
              Profile
            </NavLink>
          </div>
        </div>
        <div className="footer">
          <div className="divider"></div>
        </div>
        <div className="usernav-link-icon-wrap logout">
          <svg
            width="20"
            height="20"
            viewBox="0 0 20 20"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M7.41602 6.30001C7.67435 3.30001 9.21602 2.07501 12.591 2.07501H12.6993C16.4243 2.07501 17.916 3.56668 17.916 7.29168V12.725C17.916 16.45 16.4243 17.9417 12.6993 17.9417H12.591C9.24102 17.9417 7.69935 16.7333 7.42435 13.7833"
              stroke="#FF9E98"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M12.5009 10H3.01758"
              stroke="#FF9E98"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M4.87565 7.20834L2.08398 10L4.87565 12.7917"
              fill="#FF9E98"
            />
            <path
              d="M4.87565 7.20834L2.08398 10L4.87565 12.7917"
              stroke="#FF9E98"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>

          <NavLink activeclassname="active" to="logout">
            Logout
          </NavLink>
        </div>
      </div>
    </div>
  );
}
