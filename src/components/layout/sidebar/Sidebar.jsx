import "./sidebar.scss";
import karmaIcon from "../../../assets/karma-icon.svg";
import darknightlabsIcon from "../../../assets/darknightlabs.svg";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { ROUTER } from "../../../utils/routes/routes";
import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import axios from "axios";
import toast from "react-hot-toast";
import { defaultImg } from "../../../utils/constants/images";
import { getUsersDetailsAPI } from "../../../api-services/userApis";
import {
  ProfileNavTabIcon,
  ChatNavTabIcon,
  LogoutNavTabIcon,
  ProjectNavTabIcon,
  MyContentNavTabIcon,
  SynergiesNavTabIcon,
  InvestmentNavTabIcon,
  PendingSynergiesNavTabIcon,
  SynergiesManagerNavTabIcon,
  KarmaIcon,
  BackNavTabIcon,
} from "../../../utils/SVGs/SVGs";

const userRole = "User";
const Sidebar = ({ isSidebarOpen, setIsSidebarOpen }) => {
  const dispatch = useDispatch();
  const location = useLocation();
  const navigate = useNavigate();
  const [isAmbassadorMode, setIsAmbassadorMode] = useState(false);
  const [userProjects, setUserProjects] = useState([]);
  const [isAmbassador, setIsAmbassador] = useState(false);
  const userData = useSelector((state) => state.auth);
  const { userDetails } = useSelector((state) => state.user);

  // Fetch user details when component mounts or userData changes
  useEffect(() => {
    if (userData?.userId) {
      dispatch(getUsersDetailsAPI(userData.userId));
    }
  }, [userData?.userId]);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const response = await axios.get(`https://winwinsocietyweb3.com/api/userprojects/all/${userData.userId}`, {
          headers: {
            Authorization: `Bearer ${userData.authDetails?.token}`,
          },
        });
        setUserProjects(response.data.data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchProjects();
  }, []);

  useEffect(() => {
    const checkAmbassadorStatus = async () => {
      if (!userData?.userId) return;

      try {
        const response = await axios.get(`https://winwinsocietyweb3.com/api/ambassadors/uid/${userData.userId}`);
        setIsAmbassador(!!response.data);
      } catch (error) {
        console.error("Error checking ambassador status:", error);
        setIsAmbassador(false);
      }
    };

    checkAmbassadorStatus();
  }, [userData?.userId]);

  const handleAmbassadorClick = () => {
    if (!isAmbassador) return;
    setIsAmbassadorMode(true);
    navigate(ROUTER.ambassadorProjects);
  };

  const handleBackClick = () => {
    setIsAmbassadorMode(false);
  };

  // Get profile picture from either userDetails or userData
  const getProfilePicture = () => {
    // First try userDetails since it's most up-to-date
    if (userDetails?.profile_picture) {
      return userDetails.profile_picture;
    }
    // Then try userData
    if (userData?.profile_picture) {
      return userData.profile_picture;
    }
    // Then try Twitter profile picture from auth details if available
    if (userData?.authDetails?.user?.verifiedCredentials) {
      const twitterCred = userData.authDetails.user.verifiedCredentials.find(
        (cred) => cred.format === "oauth" && cred.oauth_provider === "twitter"
      );
      if (twitterCred?.oauth_account_photos?.[0]) {
        return twitterCred.oauth_account_photos[0].replace("_normal", "");
      }
    }
    // Finally fallback to default
    const defaultImage = userData?.authDetails?.user?.verifiedCredentials[2]?.oauthAccountPhotos[0].replace("_normal", "");

    return defaultImage;
  };

  const handleLogout = () => {
    localStorage.removeItem("dynamic_auth_expires_at");
    localStorage.removeItem("dynamic_authentication_token");
    localStorage.removeItem("dynamic_context_session_settings");
    localStorage.removeItem("dynamic_min_authentication_token");
    localStorage.removeItem("dynamic_social_storage");
    localStorage.removeItem("dynamic_store");
    localStorage.removeItem("persist:darknight");

    dispatch(handleLogout());
    navigate("/");
  };


  // const [isSidebarOpen, setIsSidebarOpen] = useState(false);  


  return (
    <>
      <div className="sidebar_container">
        <div className="sidebar">
          {isAmbassadorMode && (
            <>
              <h2 className="ambassador_title">Ambassadorship</h2>
            </>
          )}
          <div className="profile_box">
            <div className="profile_info" onClick={() => navigate(`/${ROUTER.profile}`)} style={{ cursor: "pointer" }}>
              <div className="profile_image">
                <img
                  src={getProfilePicture()}
                  alt="Profile"
                  onError={(e) => {
                    e.target.onerror = null; // Prevent infinite loop
                    e.target.src = defaultImg;
                  }}
                />
              </div>
              <div className="user_details">
                <h3>{userData?.name?.split(" ")[0] || userDetails?.firstname || "User"}</h3>
                <p>{userRole}</p>
              </div>
            </div>
            <div className="user_stats">
              <div className="balance" onClick={() => navigate(`/${ROUTER.about}`)} style={{ cursor: "pointer" }}>
                <span>Karma:</span>
                <span className="value">{userDetails?.currency_b || 0}</span>
                <KarmaIcon style={{ width: "1em", height: "1em" }} />
                <div className="karma-tooltip">
                  <p>Karma points are rewards for users, click on karma to read more</p>
                </div>
              </div>
              <div className="balance" onClick={() => navigate(`/${ROUTER.about}`)} style={{ cursor: "pointer" }}>
                <span>$winwin:</span>
                <span className="value">{userDetails?.currency_a || 10000}</span>
                <img src={darknightlabsIcon} alt="Darknight Labs" style={{ width: "1.5em", height: "1.5em" }} />
                <div className="winwin-tooltip">
                  <p>Not much has been revealed about $winwin yet.</p>
                  <p>But your Karma and Loyalty levels might have an impact at some point.</p>
                </div>
              </div>
              <div className="loyalty-progress" onClick={() => navigate(`/${ROUTER.about}`)} style={{ cursor: "pointer" }}>
                <div className="loyalty-text">
                  <span>Loyalty</span>
                </div>
                <div className="progress-bar">
                  <div className="progress" style={{ width: "50%" }}></div>
                </div>
                <div className="loyalty-tooltip">
                  <div className="tooltip-content-full">
                    <p>Your Loyalty increases or decreases based on how long you hold WWS' exclusive deals.</p>
                    <p>Loyalty, alongside with Karma, can give you access to exclusive and scarce deals in the future.</p>
                    <p>The most loyal WWS holders will also get access to additional exclusive perks.</p>
                  </div>
                  <div className="tooltip-content-short">
                    <p>Click here to learn more</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="menu-section">
            {!isAmbassadorMode ? (
              <>
                <div className="menu-box">
                  <ul>
                    <li className={`${location.pathname.startsWith(`/${ROUTER.announcementFeed}`) ? "active" : ""}`}>
                      <Link to={`/${ROUTER.announcementFeed}`}>
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          style={{ width: "20px", height: "20px" }}
                        >
                          <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>
                        </svg>
                        <span className="menu_text">Announcements</span>
                      </Link>
                    </li>
                    <li
                      className={`${location.pathname.startsWith(`/${ROUTER.projects}`) ? "active" : ""} disabled item-progress `}
                    >
                      <Link to="#" className="disabled-link item-text  ">
                        <ProfileNavTabIcon />
                        <span className="menu_text">Projects</span>
                      </Link>
                      <div className="item-tooltip">
                        <p>Please complete your profile to unlock</p>
                      </div>
                    </li>

                    {userRole == "ADMIN" && (
                      <li
                        className={`${location.pathname.startsWith(`/${ROUTER.projectManager}`) ? "active" : ""} ${
                          userProjects.length === 0 ? "disabled" : ""
                        }`}
                      >
                        <Link to={`/${ROUTER.projectManager}`}>
                          <ProjectNavTabIcon />
                          <span className="menu_text">Projects Manager</span>
                        </Link>
                      </li>
                    )}
                  </ul>
                </div>
                <div className="menu-box">
                  <span className="separator"></span>
                  <ul>
                    <>
                      <li
                        className={`${
                          location.pathname.startsWith(`/${ROUTER.synergies}`) &&
                          location.pathname !== `/${ROUTER.synergiesManager}`
                            ? "active"
                            : ""
                        } disabled  item-progress `}
                      >
                        <Link to="#" className="disabled-link item-text  ">
                          <SynergiesNavTabIcon />
                          <span className="menu_text">Synergies</span>
                        </Link>
                        <div className="item-tooltip">
                          <p>Please complete your profile to unlock</p>
                        </div>
                      </li>
                      <li className={`${location.pathname === `/${ROUTER.investment}` ? "active" : ""}`}>
                        <Link to={ROUTER.investment}>
                          <InvestmentNavTabIcon />
                          <span className="menu_text">Investments </span>
                        </Link>
                      </li>
                    </>

                    {userRole == "ADMIN" && (
                      <>
                        <li
                          className={`${location.pathname === `/${ROUTER.synergyRequests}` ? "active" : ""} ${
                            userProjects.length === 0 ? "disabled" : ""
                          }`}
                        >
                          <Link to={ROUTER.synergyRequests}>
                            <SynergiesNavTabIcon />
                            <span className="menu_text">Synergy requests</span>
                          </Link>
                        </li>
                        <li
                          className={`${location.pathname === `/${ROUTER.synergiesManager}` ? "active" : ""} ${
                            userProjects.length === 0 ? "disabled" : ""
                          }`}
                        >
                          <Link to={ROUTER.synergiesManager}>
                            <SynergiesManagerNavTabIcon />
                            <span className="menu_text">Synergies Manager </span>
                          </Link>
                        </li>
                      </>
                    )}
                  </ul>
                </div>
                <div className="menu-box">
                  <span className="separator"></span>
                  <ul>
                    <li className={`${location.pathname === `/${ROUTER.chat}` ? "active" : ""} disabled item-progress`}>
                      <Link to="#" className="disabled-link">
                        <ChatNavTabIcon />
                        <span className="chat">Chat</span>
                      </Link>
                      <div className="item-tooltip">
                        <p>Please complete your profile to unlock</p>
                      </div>
                    </li>
                    <li className={`${location.pathname === `/${ROUTER.karma}` ? "active" : ""}`}>
                      <Link to={`/${ROUTER.karma}`}>
                        <img src={karmaIcon} alt="Karma" />
                        <span className="menu_text">Karma</span>
                      </Link>
                    </li>
                    <li className={`${location.pathname === `/${ROUTER.profile}` ? "active" : ""}`}>
                      <Link to={`/${ROUTER.profile}`}>
                        <ProfileNavTabIcon />
                        <span className="menu_text">Profile</span>
                      </Link>
                    </li>
                    <li className={`${location.pathname === `/${ROUTER.about}` ? "active" : ""}`}>
                      <Link to={`/${ROUTER.about}`}>
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          style={{ width: "20px", height: "20px" }}
                        >
                          <circle cx="12" cy="12" r="10"></circle>
                          <line x1="12" y1="16" x2="12" y2="12"></line>
                          <line x1="12" y1="8" x2="12.01" y2="8"></line>
                        </svg>
                        <span className="menu_text">About</span>
                      </Link>
                    </li>
                    <li className={`${location.pathname === `/${ROUTER.helpFeedback}` ? "active" : ""}`}>
                      <Link to={`/${ROUTER.helpFeedback}`}>
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          style={{ width: "20px", height: "20px" }}
                        >
                          <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"></path>
                        </svg>
                        <span className="menu_text">Help & Feedback</span>
                      </Link>
                    </li>
                  </ul>
                </div>
                <div className="menu-box">
                  <span className="separator"></span>
                  <ul>
                    <li
                      className={`${
                        location.pathname.includes("ambassador") || location.pathname.includes("my-content") ? "active" : ""
                      } ${!isAmbassador ? "disabled ambassador-disabled" : ""} item-progress`}
                    >
                      <Link
                        to={ROUTER.myContent}
                        onClick={handleAmbassadorClick}
                        className={!isAmbassador ? "disabled-link" : ""}
                      >
                        <ProjectNavTabIcon />
                        <span className="menu_text">Ambassadorship</span>
                      </Link>
                      {!isAmbassador && (
                        <div className="item-tooltip">
                          <p>Please complete your profile to unlock</p>
                        </div>
                      )}
                    </li>
                  </ul>
                </div>
              </>
            ) : (
              <div className="menu-box">
                <ul>
                  <li className={`${location.pathname.startsWith(`/${ROUTER.myContent}`) ? "active" : ""}`}>
                    <Link to={ROUTER.myContent}>
                      <MyContentNavTabIcon />
                      <span className="menu_text">My Content</span>
                    </Link>
                  </li>
                  <li className={`${location.pathname.startsWith(`/${ROUTER.ambassadorProjects}`) ? "active" : ""}`}>
                    <Link to={ROUTER.ambassadorProjects}>
                      <ProjectNavTabIcon />
                      <span className="menu_text">Projects</span>
                    </Link>
                  </li>
                </ul>
              </div>
            )}
          </div>

          <div className="menu-box sidebar_bottom">
            <span className="separator"></span>
            <ul>
              {isAmbassadorMode ? (
                <li>
                  <Link to="#" onClick={handleBackClick} style={{ color: "#e8efdb" }}>
                    <span className="menu_text">← Back to Menu</span>
                  </Link>
                </li>
              ) : (
                <li>
                  <Link to="/" onClick={handleLogout}>
                    <LogoutNavTabIcon />
                    <span className="menu_text">Logout</span>
                  </Link>
                </li>
              )}
            </ul>
          </div>
        </div>
      </div>

      {/* Mobile view */}

      <div
        className="sidebar_container_mobile"
        style={{
          transform: isSidebarOpen ? "translateX(0)" : "translateX(-100%)",
          transition: "transform 0.3s ease-in-out",
          height: "100% !important",
        }}
        onClick={() => setIsSidebarOpen(false)}
      >
        <div className="sidebar">
          {isAmbassadorMode && (
            <>
              <h2 className="ambassador_title">Ambassadorship</h2>
            </>
          )}
          <div className="profile_box">
            <div className="profile_info" onClick={() => navigate(`/${ROUTER.profile}`)} style={{ cursor: "pointer" }}>
              <div className="profile_image">
                <img
                  src={getProfilePicture()}
                  alt="Profile"
                  onError={(e) => {
                    e.target.onerror = null; // Prevent infinite loop
                    e.target.src = defaultImg;
                  }}
                />
              </div>
              <div className="user_details">
                <h3>{userData?.name?.split(" ")[0] || userDetails?.firstname || "User"}</h3>
                <p>{userRole}</p>
              </div>
            </div>
            <div className="user_stats">
              <div className="balance" onClick={() => navigate(`/${ROUTER.about}`)} style={{ cursor: "pointer" }}>
                <span>Karma:</span>
                <span className="value">{userDetails?.currency_b || 0}</span>
                <KarmaIcon style={{ width: "1em", height: "1em" }} />
                <div className="karma-tooltip">
                  <p>Karma points are rewards for users, click on karma to read more</p>
                </div>
              </div>
              <div className="balance" onClick={() => navigate(`/${ROUTER.about}`)} style={{ cursor: "pointer" }}>
                <span>$winwin:</span>
                <span className="value">{userDetails?.currency_a || 10000}</span>
                <img src={darknightlabsIcon} alt="Darknight Labs" style={{ width: "1.5em", height: "1.5em" }} />
                <div className="winwin-tooltip">
                  <p>Not much has been revealed about $winwin yet.</p>
                  <p>But your Karma and Loyalty levels might have an impact at some point.</p>
                </div>
              </div>
              <div className="loyalty-progress" onClick={() => navigate(`/${ROUTER.about}`)} style={{ cursor: "pointer" }}>
                <div className="loyalty-text">
                  <span>Loyalty</span>
                </div>
                <div className="progress-bar">
                  <div className="progress" style={{ width: "50%" }}></div>
                </div>
                <div className="loyalty-tooltip">
                  <div className="tooltip-content-full">
                    <p>Your Loyalty increases or decreases based on how long you hold WWS' exclusive deals.</p>
                    <p>Loyalty, alongside with Karma, can give you access to exclusive and scarce deals in the future.</p>
                    <p>The most loyal WWS holders will also get access to additional exclusive perks.</p>
                  </div>
                  <div className="tooltip-content-short">
                    <p>Click here to learn more</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="menu-section">
            {!isAmbassadorMode ? (
              <>
                <div className="menu-box">
                  <ul>
                    <li className={`${location.pathname.startsWith(`/${ROUTER.announcementFeed}`) ? "active" : ""}`}>
                      <Link to={`/${ROUTER.announcementFeed}`}>
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          style={{ width: "20px", height: "20px" }}
                        >
                          <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>
                        </svg>
                        <span className="menu_text">Announcements</span>
                      </Link>
                    </li>
                    <li
                      className={`${location.pathname.startsWith(`/${ROUTER.projects}`) ? "active" : ""} disabled item-progress `}
                    >
                      <Link to="#" className="disabled-link item-text  ">
                        <ProfileNavTabIcon />
                        <span className="menu_text">Projects</span>
                      </Link>
                      <div className="item-tooltip">
                        <p>Please complete your profile to unlock</p>
                      </div>
                    </li>

                    {userRole == "ADMIN" && (
                      <li
                        className={`${location.pathname.startsWith(`/${ROUTER.projectManager}`) ? "active" : ""} ${
                          userProjects.length === 0 ? "disabled" : ""
                        }`}
                      >
                        <Link to={`/${ROUTER.projectManager}`}>
                          <ProjectNavTabIcon />
                          <span className="menu_text">Projects Manager</span>
                        </Link>
                      </li>
                    )}
                  </ul>
                </div>
                <div className="menu-box">
                  <span className="separator"></span>
                  <ul>
                    <>
                      <li
                        className={`${
                          location.pathname.startsWith(`/${ROUTER.synergies}`) &&
                          location.pathname !== `/${ROUTER.synergiesManager}`
                            ? "active"
                            : ""
                        } disabled  item-progress `}
                      >
                        <Link to="#" className="disabled-link item-text  ">
                          <SynergiesNavTabIcon />
                          <span className="menu_text">Synergies</span>
                        </Link>
                        <div className="item-tooltip">
                          <p>Please complete your profile to unlock</p>
                        </div>
                      </li>
                      <li className={`${location.pathname === `/${ROUTER.investment}` ? "active" : ""}`}>
                        <Link to={ROUTER.investment}>
                          <InvestmentNavTabIcon />
                          <span className="menu_text">Investments </span>
                        </Link>
                      </li>
                    </>

                    {userRole == "ADMIN" && (
                      <>
                        <li
                          className={`${location.pathname === `/${ROUTER.synergyRequests}` ? "active" : ""} ${
                            userProjects.length === 0 ? "disabled" : ""
                          }`}
                        >
                          <Link to={ROUTER.synergyRequests}>
                            <SynergiesNavTabIcon />
                            <span className="menu_text">Synergy requests</span>
                          </Link>
                        </li>
                        <li
                          className={`${location.pathname === `/${ROUTER.synergiesManager}` ? "active" : ""} ${
                            userProjects.length === 0 ? "disabled" : ""
                          }`}
                        >
                          <Link to={ROUTER.synergiesManager}>
                            <SynergiesManagerNavTabIcon />
                            <span className="menu_text">Synergies Manager </span>
                          </Link>
                        </li>
                      </>
                    )}
                  </ul>
                </div>
                <div className="menu-box">
                  <span className="separator"></span>
                  <ul>
                    <li className={`${location.pathname === `/${ROUTER.chat}` ? "active" : ""} disabled item-progress`}>
                      <Link to="#" className="disabled-link">
                        <ChatNavTabIcon />
                        <span className="chat">Chat</span>
                      </Link>
                      <div className="item-tooltip">
                        <p>Please complete your profile to unlock</p>
                      </div>
                    </li>
                    <li className={`${location.pathname === `/${ROUTER.karma}` ? "active" : ""}`}>
                      <Link to={`/${ROUTER.karma}`}>
                        <img src={karmaIcon} alt="Karma" />
                        <span className="menu_text">Karma</span>
                      </Link>
                    </li>
                    <li className={`${location.pathname === `/${ROUTER.profile}` ? "active" : ""}`}>
                      <Link to={`/${ROUTER.profile}`}>
                        <ProfileNavTabIcon />
                        <span className="menu_text">Profile</span>
                      </Link>
                    </li>
                    <li className={`${location.pathname === `/${ROUTER.about}` ? "active" : ""}`}>
                      <Link to={`/${ROUTER.about}`}>
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          style={{ width: "20px", height: "20px" }}
                        >
                          <circle cx="12" cy="12" r="10"></circle>
                          <line x1="12" y1="16" x2="12" y2="12"></line>
                          <line x1="12" y1="8" x2="12.01" y2="8"></line>
                        </svg>
                        <span className="menu_text">About</span>
                      </Link>
                    </li>
                    <li className={`${location.pathname === `/${ROUTER.helpFeedback}` ? "active" : ""}`}>
                      <Link to={`/${ROUTER.helpFeedback}`}>
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          style={{ width: "20px", height: "20px" }}
                        >
                          <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"></path>
                        </svg>
                        <span className="menu_text">Help & Feedback</span>
                      </Link>
                    </li>
                  </ul>
                </div>
                <div className="menu-box">
                  <span className="separator"></span>
                  <ul>
                    <li
                      className={`${
                        location.pathname.includes("ambassador") || location.pathname.includes("my-content") ? "active" : ""
                      } ${!isAmbassador ? "disabled ambassador-disabled" : ""} item-progress`}
                    >
                      <Link
                        to={ROUTER.myContent}
                        onClick={handleAmbassadorClick}
                        className={!isAmbassador ? "disabled-link" : ""}
                      >
                        <ProjectNavTabIcon />
                        <span className="menu_text">Ambassadorship</span>
                      </Link>
                      {!isAmbassador && (
                        <div className="item-tooltip">
                          <p>Please complete your profile to unlock</p>
                        </div>
                      )}
                    </li>
                  </ul>

                  {/* <div className="menu-box sidebar_bottom">
            <span className="separator"></span>
            <ul>
              {isAmbassadorMode ? (
                <li>
                  <Link to="#" onClick={handleBackClick} style={{ color: "#e8efdb" }}>
                    <span className="menu_text">← Back to Menu</span>
                  </Link>
                </li>
              ) : (
                <li>
                  <Link to="/" onClick={handleLogout}>
                    <LogoutNavTabIcon />
                    <span className="menu_text">Logout</span>
                  </Link>
                </li>
              )}
            </ul>
          </div> */}


                </div>
              </>
            ) : (
              <div className="menu-box">
                <ul>
                  <li className={`${location.pathname.startsWith(`/${ROUTER.myContent}`) ? "active" : ""}`}>
                    <Link to={ROUTER.myContent}>
                      <MyContentNavTabIcon />
                      <span className="menu_text">My Content</span>
                    </Link>
                  </li>
                  <li className={`${location.pathname.startsWith(`/${ROUTER.ambassadorProjects}`) ? "active" : ""}`}>
                    <Link to={ROUTER.ambassadorProjects}>
                      <ProjectNavTabIcon />
                      <span className="menu_text">Projects</span>
                    </Link>
                  </li>
                </ul>
              </div>
            )}
          </div>

          <div className="menu-box sidebar_bottom">
            <span className="separator"></span>
            <ul>
              {isAmbassadorMode ? (
                <li>
                  <Link to="#" onClick={handleBackClick} style={{ color: "#e8efdb" }}>
                    <span className="menu_text">← Back to Menu</span>
                  </Link>
                </li>
              ) : (
                <li>
                  <Link to="/" onClick={handleLogout}>
                    <LogoutNavTabIcon />
                    <span className="menu_text">Logout</span>
                  </Link>
                </li>
              )}
            </ul>
          </div>
        </div>
      </div>

      {/* <div className="mobile_bottom_footer_wrap">
        <div className="mobile_bottom_footer">
          <ul>
            {!isAmbassadorMode ? (
              <>
                <li className={`${location.pathname === `/${ROUTER.announcementFeed}` ? "active" : ""}`}>
                  <Link to={ROUTER.announcementFeed}>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      style={{ width: "20px", height: "20px" }}
                    >
                      <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>
                    </svg>
                    <span>Announcements</span>
                  </Link>
                </li>
                <li className={`${location.pathname === `/${ROUTER.projects}` ? "active" : ""} disabled `}
                onClick={()=>{
                  toast("Please complete your profile to unlock")
                }}
                >
                  <Link to="#" className="disabled-link">
                    <ProjectNavTabIcon />
                    <span>Projects</span>
                  </Link>
                  
                </li>
                {userRole == "ADMIN" && (
                  <li
                    className={`${location.pathname === `/${ROUTER.projectManager}` ? "active" : ""}  ${
                      userProjects?.length !== -1 ? "disabled" : ""
                    }`}
                  >
                    <Link to={ROUTER.projectManager}>
                      <ProfileNavTabIcon />
                      <span>Projects manager</span>
                    </Link>
                  </li>
                )}
                <li
                  className={`${location.pathname === `/${ROUTER.synergies}` ? "active" : ""} disabled `}
                onClick={()=>{
                  toast("Please complete your profile to unlock")
                }}
               >
                  <Link to="#" className="disabled-link">
                    <SynergiesNavTabIcon />
                    <span>Synergies</span>
                  </Link>
                
                </li>
                <li className={`${location.pathname === `/${ROUTER.investment}` ? "active" : ""}`}>
                  <Link to={ROUTER.investment}>
                    <InvestmentNavTabIcon />
                    <span>Investments</span>
                  </Link>
                </li>
                {userRole == "ADMIN" && (
                  <>
                    <li
                      className={`${location.pathname === `/${ROUTER.synergyRequests}` ? "active" : ""} ${
                        userProjects?.length === 0 ? "disabled" : ""
                      }`}
                    >
                      <Link to={ROUTER.synergyRequests}>
                        <PendingSynergiesNavTabIcon />
                        <span>Pending Synergies</span>
                      </Link>
                    </li>
                    <li
                      className={`${location.pathname === `/${ROUTER.synergiesManager}` ? "active" : ""}  ${
                        userProjects?.length === 0 ? "disabled" : ""
                      }`}
                    >
                      <Link to={ROUTER.synergiesManager}>
                        <SynergiesManagerNavTabIcon />
                        <span>Synergies Manager</span>
                      </Link>
                    </li>
                  </>
                )}
                <li className={`${location.pathname === `/${ROUTER.chat}` ? "active" : ""} disabled `}
                onClick={()=>{
                  toast("Please complete your profile to unlock")
                }}
                >
                  <Link to="#" className="disabled-link">
                    <ChatNavTabIcon />
                    <span className="chat">Chat</span>
                  </Link>
                
                </li>
                <li className={`${location.pathname === `/${ROUTER.karma}` ? "active" : ""}`}>
                  <Link to={ROUTER.karma}>
                    <img src={karmaIcon} alt="" />
                    <span>Karma</span>
                  </Link>
                </li>
                <li className={`${location.pathname === `/${ROUTER.profile}` ? "active" : ""}`}>
                  <Link to={ROUTER.profile}>
                    <ProfileNavTabIcon />
                    <span>Profile</span>
                  </Link>
                </li>
                <li className={`${location.pathname === `/${ROUTER.about}` ? "active" : ""}`}>
                  <Link to={`/${ROUTER.about}`}>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      style={{ width: "20px", height: "20px" }}
                    >
                      <circle cx="12" cy="12" r="10"></circle>
                      <line x1="12" y1="16" x2="12" y2="12"></line>
                      <line x1="12" y1="8" x2="12.01" y2="8"></line>
                    </svg>
                    <span className="menu_text">About</span>
                  </Link>
                </li>
                <li className={`${location.pathname === `/${ROUTER.helpFeedback}` ? "active" : ""}`}>
                  <Link to={`/${ROUTER.helpFeedback}`}>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      style={{ width: "20px", height: "20px" }}
                    >
                      <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"></path>
                    </svg>
                    <span className="menu_text">Help & Feedback</span>
                  </Link>
                </li>
                <li className={`${!isAmbassador ? "disabled ambassador-disabled" : ""} `}
                onClick={()=>{
                  if(!isAmbassador){
                  toast("Please complete your ambassadorship request in profile section")
                }}}
                >
                  <Link to={ROUTER.myContent}
                        onClick={handleAmbassadorClick} 
                        className={!isAmbassador ? "disabled-link" : ""}>
                    <ProjectNavTabIcon />
                    <span>Ambassadorship</span>
                  </Link>
                  {!isAmbassador && (
                    <div className=""
                    
                    >
                     
                    </div>
                  )}
                </li>
              </>
            ) : (
              <>
                <li onClick={handleBackClick}>
                  <Link to="#">
                   
                    <BackNavTabIcon />
                    <span>Back</span>
                  </Link>
                </li>
                <li className={`${location.pathname === `/${ROUTER.myContent}` ? "active" : ""}`}>
                  <Link to={ROUTER.myContent}>
                    <MyContentNavTabIcon />
                    <span>My Content</span>
                  </Link>
                </li>
                <li className={`${location.pathname === `/${ROUTER.ambassadorProjects}` ? "active" : ""}`}>
                  <Link to={ROUTER.ambassadorProjects}>
                    <ProjectNavTabIcon />
                    <span>Projects</span>
                  </Link>
                </li>
              </>
            )}
          </ul>
        </div>
      </div> */}
    </>
  );
};

export default Sidebar;
