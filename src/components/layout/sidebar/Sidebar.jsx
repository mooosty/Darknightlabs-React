import "./sidebar.scss";
import axios from "axios";
import { useWindowSize } from "@uidotdev/usehooks";
import { getGroupsAPI } from "../../../api-services";
import { useEffect, useMemo, useState } from "react";
import { ROUTER } from "../../../utils/routes/routes";
import { useSelector, useDispatch } from "react-redux";
import karmaIcon from "../../../assets/karma-icon.svg";
import { defaultImg, darknightlabsIcon } from "../../../utils/constants/images";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { getUsersDetailsAPI } from "../../../api-services/userApis";
import { useSocket } from "../../../utils/socket-provider/SocketContext";
import { ProfileNavTabIcon, ChatNavTabIcon, LogoutNavTabIcon, ProjectNavTabIcon, MyContentNavTabIcon, SynergiesNavTabIcon, InvestmentNavTabIcon, PendingSynergiesNavTabIcon, SynergiesManagerNavTabIcon, KarmaIcon, KarmaNavTabIcon, ThreeDots, CollapseRightIcon, CollapseLeftIcon, } from "../../../utils/SVGs/SVGs";
import CustomFooterDropdown from "../../custom-mobile-footer-dropdown/CustomFooterDropdown";

const userRole = "USER";
const Sidebar = () => {
  const dispatch = useDispatch();
  const location = useLocation();
  const size = useWindowSize();
  const navigate = useNavigate();
  const [isCollapse, setIsCollapse] = useState(false);
  const [userProjects, setUserProjects] = useState([]);
  const [isAmbassador, setIsAmbassador] = useState(false);
  const [mobileMenuItems, setMobileMenuItems] = useState([]);
  const [isAmbassadorMode, setIsAmbassadorMode] = useState(false);
  const [mobileDropdownItems, setMobileDropdownItems] = useState([]);

  const userData = useSelector((state) => state.auth);
  const { userDetails } = useSelector((state) => state.user);

  const handleCollapse = () => {
    setIsCollapse(!isCollapse);
  };

  const handleAmbassadorClick = () => {
    if (!isAmbassador) return;
    setIsAmbassadorMode(true);
    navigate(ROUTER.ambassadorProjects); // Redirect to Exclusive Projects
  };

  const handleBackClick = () => {
    setIsAmbassadorMode(false);
  };

  const filterMenuItems = (size, item) => {
    const filters = {
      'Karma': size.width <= 700,
      'Chat': size.width <= 630,
      'Synergies Manager': size.width <= 550,
      'Pending Synergies': size.width <= 470,
      'Investment': size.width <= 400,
      'Synergies': size.width <= 315,
    };

    return !filters[item.label];
  };

  // SOCKET CODE...
  const socket = useSocket()
  const groupData = useSelector((state) => state.group.groups)
  const [unreadMessageCount, setUnreadMessageCount] = useState({});
  const totalUnreadCount = Object.values(unreadMessageCount).reduce((total, count) => total + count, 0);

  const mobileMenuData = useMemo(() => {
    const tmpMobileItems = [
      {
        href: ROUTER.projects,
        label: 'Projects',
        icon: <ProjectNavTabIcon />,
        isDisabled: userProjects?.length !== -1
      },
      {
        href: ROUTER.projectManager,
        label: 'Projects manager',
        icon: <ProjectNavTabIcon />,
        isDisabled: userProjects?.length !== -1
      },
      {
        href: ROUTER.synergies,
        label: 'Synergies',
        icon: <SynergiesNavTabIcon />,
        width: 315,
        isDisabled: userProjects?.length !== -1
      },
      {
        href: ROUTER.investment,
        label: 'Investment',
        icon: <InvestmentNavTabIcon />,
        width: 400,
        isDisabled: false
      }
    ]

    if (userRole === 'ADMIN') {
      tmpMobileItems.push(...[{
        href: ROUTER.synergyRequests,
        label: 'Pending Synergies',
        icon: <PendingSynergiesNavTabIcon />,
        width: 470,
        isDisabled: userProjects?.length !== 0
      },
      {
        href: ROUTER.synergiesManager,
        label: 'Synergies Manager',
        width: 550,
        icon: <SynergiesManagerNavTabIcon />,
        isDisabled: userProjects?.length !== 0
      }])
    }

    tmpMobileItems.push(...[{
      href: ROUTER.chat,
      label: 'Chat',
      icon: <ChatNavTabIcon />,
      width: 630,
      isDisabled: (userProjects?.length !== -1 || userProjects?.length === 0)
    },
    {
      href: ROUTER.karma,
      label: 'Karma',
      width: 700,
      icon: <KarmaNavTabIcon />,
      isDisabled: false
    }])


    return tmpMobileItems
  }, [userProjects?.length, userRole])

  const dropdownData = useMemo(() => {
    return [
      {
        label: (<span className={`mobile_tab drop_tab ${location.pathname === `/${ROUTER.profile}` ? "active" : ""} `}
        ><Link to={ROUTER.profile}>{<ProfileNavTabIcon />}Profile</Link></span>),
      },
      {
        href: null,
        label: (<span className={`mobile_tab drop_tab`} onClick={handleAmbassadorClick}
        > <Link>{<ProjectNavTabIcon />}Ambassadorship</Link></span>),

      }
    ]
  }, [])

  // Get profile picture from either userDetails or userData
  const getProfilePicture = () => {
    if (userDetails?.profile_picture) {
      return userDetails.profile_picture;
    }
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
    return defaultImg;
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

  useEffect(() => {

    if (socket) {
      socket.on('message count', ({ chatId, count }) => {
        setUnreadMessageCount(prev => ({
          ...prev,
          [chatId]: count
        }));
      });

      socket.on('new message count', ({ chatId, count }) => {
        setUnreadMessageCount(prev => ({
          ...prev,
          [chatId]: (prev[chatId] || 0) + count
        }));
      });

      return () => {
        socket.off('message count');
        socket.off('new message count');
      };
    }
  }, [socket]);

  useEffect(() => {
    if (socket && groupData.length > 0 && userData.userId) {
      groupData.forEach(group => {
        socket.emit('fetch message count', {
          chatId: group._id,
          userId: userData.userId
        });
      });
    }
  }, [groupData.length, userData.userId])

  useEffect(() => {
    dispatch(getGroupsAPI())
  }, [])

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


  useEffect(() => {
    let updatedMobileMenuData = mobileMenuData.filter(item => filterMenuItems(size, item));
    let updatedDropdownData = [...dropdownData];

    mobileMenuData.forEach(({ width, label, href, icon, isDisabled }) => {
      if (size.width <= width) {
        const updatedLabel = label === 'Chat'
          ? (
            <span className={`mobile_tab drop_tab ${location.pathname === `/${href}` ? "active" : ""} ${isDisabled ? "disabled" : ""} `}>
              <Link to={href}>
                <span className="chat">
                  {icon}
                  Chat
                  <p className="chat_count">{totalUnreadCount > 99 ? '99+' : totalUnreadCount}</p>
                </span>
              </Link>
            </span>
          )
          : (<span className={`mobile_tab drop_tab ${location.pathname === `/${href}` ? "active" : ""} ${isDisabled ? "disabled" : ""} `} >
            <Link to={href}>{icon}{label}</Link>
          </span>);

        updatedDropdownData.push({
          href: href,
          label: updatedLabel,
          isDisabled: false
        });
      }
    });

    setMobileMenuItems([...updatedMobileMenuData])
    setMobileDropdownItems([...updatedDropdownData])
  }, [mobileMenuData, dropdownData, size])

  return (
    <>
      <div className={`sidebar_container ${isCollapse ? "sidebar_collapsed" : ""}`}>
        <div className="sidebar">
          {isAmbassadorMode && (
            <>
              <h2 className="ambassador_title">Ambassadorship</h2>
            </>
          )}
          <div className="profile_box">
            <div className="profile_info">
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
                <h3 className="user_name">{userData?.name?.split(" ")[0] || userDetails?.firstname || "User"} </h3>
                <p>{userRole}</p>
              </div>
            </div>
            <div className="user_stats">
              <div className="balance" onClick={() => navigate(`/${ROUTER.about}`)} style={{ cursor: "pointer" }}>
                <span>Karma:</span>
                <span>
                  <span className="value">{userDetails?.currency_b || 0}</span>
                  <KarmaIcon style={{ width: "1em", height: "1em" }} />
                </span>
              </div>
              <div className="balance" onClick={() => navigate(`/${ROUTER.about}`)} style={{ cursor: "pointer" }}>
                <span>$winwin:</span>
                <span>
                  <span className="value">{userDetails?.currency_a || 10000}</span>
                  <img src={darknightlabsIcon} alt="Darknight Labs" style={{ width: "1.5em", height: "1.5em" }} />
                </span>
                <div className="winwin-tooltip">
                  <p>Not much has been revealed about $winwin yet.</p>
                  <p>But your Karma and Loyalty levels might have an impact at some point.</p>
                </div>
              </div>
              <div
                className="loyalty-progress"
                onClick={() => navigate(`/${ROUTER.about}`)}
                style={{ cursor: "pointer" }}
              >
                <div className="loyalty-text">
                  <span>Loyalty</span>
                </div>
                <div className="progress-bar">
                  <div className="progress" style={{ width: "50%" }}></div>
                </div>
                <div className="loyalty-tooltip">
                  <p>Your Loyalty increases or decreases based on how long you hold WWS&apos; exclusive deals.</p>
                  <p>Loyalty, alongside with Karma, can give you access to exclusive and scarce deals in the future.</p>
                  <p>The most loyal WWS holders will also get access to additional exclusive perks.</p>
                </div>
              </div>
            </div>

            <button className="collapse_btn" onClick={handleCollapse}>
              {isCollapse ? (
                <CollapseRightIcon />
              ) : (
                <CollapseLeftIcon />
              )}
            </button>
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
                      className={`${location.pathname.startsWith(`/${ROUTER.projects}`) ? "active" : ""
                        } disabled item-progress `}
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
                        className={`${location.pathname.startsWith(`/${ROUTER.projectManager}`) ? "active" : ""} ${userProjects.length === 0 ? "disabled" : ""
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
                        className={`${location.pathname.startsWith(`/${ROUTER.synergies}`) &&
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
                          className={`${location.pathname === `/${ROUTER.synergyRequests}` ? "active" : ""} ${userProjects.length === 0 ? "disabled" : ""
                            }`}
                        >
                          <Link to={ROUTER.synergyRequests}>
                            <SynergiesNavTabIcon />
                            <span className="menu_text">Synergy requests</span>
                          </Link>
                        </li>
                        <li
                          className={`${location.pathname === `/${ROUTER.synergiesManager}` ? "active" : ""} ${userProjects.length === 0 ? "disabled" : ""
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
                        <span className="menu_text">Chat</span>
                        <p className="chat_count">{totalUnreadCount > 99 ? '99+' : totalUnreadCount}</p>
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
                  </ul>
                </div>
                <div className="menu-box">
                  <span className="separator"></span>
                  <ul>
                    <li
                      className={`${location.pathname.includes("ambassador") || location.pathname.includes("my-content")
                        ? "active"
                        : ""
                        } ${!isAmbassador ? "disabled ambassador-disabled" : ""} item-progress`}
                    >
                      <Link to="#" onClick={handleAmbassadorClick} className={!isAmbassador ? "disabled-link" : ""}>
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
              <>
                <div className="menu-box">
                  <ul>
                    {/*   <li className={`${location.pathname === `/${ROUTER.chat}` ? "active" : ""} chat ${userProjects?.length !== -1 ? "disabled" : ""}`}>
                      <Link to={userProjects?.length === 0 ? "#" : ROUTER.chat}>
                        <ChatNavTabIcon />
                        <span className="menu_text">Chat</span>
                        <span className="notification">
                          <span className="notification_text">
                            {totalUnreadCount > 99 ? '99+' : totalUnreadCount}
                          </span>
                        </span>
                      </Link>
                    </li>
                 <li className={`${location.pathname === `/${ROUTER.karma}` ? "active" : ""}`}>
                      <Link to={ROUTER.karma}>
                        <KarmaNavTabIcon />
                        <span className="menu_text">Karma</span>
                      </Link>
                    </li> */}
                    <li className={`${location.pathname === `/${ROUTER.profile}` ? "active" : ""}`}>
                      <Link to={ROUTER.profile}>
                        <ProfileNavTabIcon />
                        <span className="menu_text">Profile</span>
                      </Link>
                    </li>
                  </ul>
                </div>
                <div className="menu-box">
                  <span className="separator"></span>
                  <ul>
                    <li
                      className={`${location.pathname.includes('ambassador') || location.pathname.includes('my-content') ? "active" : ""}`}
                      onClick={handleAmbassadorClick}
                    >
                      <Link to="#">
                        <ProjectNavTabIcon />
                        <span className="menu_text">Projects</span>
                      </Link>
                    </li>
                  </ul>
                </div>
                {/*  <div className="menu-box">
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
              </div> */}
              </>
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
      <div className="mobile_bottom_footer_wrap">
        <div className="mobile_bottom_footer">
          <ul>
            {!isAmbassadorMode ? (
              <>
                {/* //   <li className={`${location.pathname === `/${ROUTER.announcementFeed}` ? "active" : ""}`}> 
             //     <Link to={ROUTER.announcementFeed}> 
              //       <svg 
                      //         xmlns="http://www.w3.org/2000/svg"
                      //         viewBox="0 0 24 24"
                      //         fill="none"
                      //         stroke="currentColor"
                      //         strokeWidth="2"
                      //         strokeLinecap="round"
                      //         strokeLinejoin="round"
                      //         style={{ width: "20px", height: "20px" }}
                      //       >
                      //         <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>
                      //       </svg>
                      //       <span>Announcements</span>
                      //     </Link>
                      //   </li>
                      //   <li className={`${location.pathname === `/${ROUTER.projects}` ? "active" : ""} disabled item-progress`}>
                      //     <Link to="#" className="disabled-link">
                      //       <ProjectNavTabIcon />
                      //       <span>Projects</span>
                      //     </Link>
                      //     <div className="item-tooltip">
                      //       <p>Please complete your profile to unlock</p>
                      //     </div>
                      //   </li>
                      //   {userRole == "ADMIN" && (
                      //     <li
                      //       className={`${location.pathname === `/${ROUTER.projectManager}` ? "active" : ""}  ${userProjects?.length !== -1 ? "disabled" : ""
                      //         }`}
                      //     >
                      //       <Link to={ROUTER.projectManager}>
                      //         <ProfileNavTabIcon />
                      //         <span>Projects manager</span>
                      //       </Link>
                      //     </li>
                      //   )}
                      //   <li
                      //     className={`${location.pathname === `/${ROUTER.synergies}` ? "active" : ""} disabled item-progress`}
                      //   >
                      //     <Link to="#" className="disabled-link">
                      //       <SynergiesNavTabIcon />
                      //       <span>Synergies</span>
                      //     </Link>
                      //     <div className="item-tooltip">
                      //       <p>Please complete your profile to unlock</p>
                      //     </div>
                      //   </li>
                      //   <li className={`${location.pathname === `/${ROUTER.investment}` ? "active" : ""}`}>
                      //     <Link to={ROUTER.investment}>
                      //       <InvestmentNavTabIcon />
                      //       <span>Investments</span>
                      //     </Link>
                      //   </li>
                      //   {userRole == "ADMIN" && (
                      //     <>
                      //       <li
                      //         className={`${location.pathname === `/${ROUTER.synergyRequests}` ? "active" : ""} ${userProjects?.length === 0 ? "disabled" : ""
                      //           }`}
                      //       >
                      //         <Link to={ROUTER.synergyRequests}>
                      //           <PendingSynergiesNavTabIcon />
                      //           <span>Pending Synergies</span>
                      //         </Link>
                      //       </li>
                      //       <li
                      //         className={`${location.pathname === `/${ROUTER.synergiesManager}` ? "active" : ""}  ${userProjects?.length === 0 ? "disabled" : ""
                      //           }`}
                      //       >
                      //         <Link to={ROUTER.synergiesManager}>
                      //           <SynergiesManagerNavTabIcon />
                      //           <span>Synergies Manager</span>
                      //         </Link>
                      //       </li>
                      //     </>
                      //   )}
                      //   <li className={`${location.pathname === `/${ROUTER.chat}` ? "active" : ""} disabled item-progress`}>
                      //     <Link to="#" className="disabled-link">
                      //       <ChatNavTabIcon />
                      //       <span className="chat">Chat</span>
                      //       <p className="chat_count">{totalUnreadCount > 99 ? '99+' : totalUnreadCount}</p>
                      //     </Link>
                      //     <div className="item-tooltip">
                      //       <p>Please complete your profile to unlock</p>
                      //     </div>
                      //   </li>
                      //   <li className={`${location.pathname === `/${ROUTER.karma}` ? "active" : ""}`}>
                      //     <Link to={ROUTER.karma}>
                      //       <img src={karmaIcon} alt="" />
                      //       <span>Karma</span>
                      //     </Link>
                      //   </li>
                      //   <li className={`${location.pathname === `/${ROUTER.profile}` ? "active" : ""}`}>
                      //     <Link to={ROUTER.profile}>
                      //       <ProfileNavTabIcon />
                      //       <span>Profile</span>
                      //     </Link>
                      //   </li>
                      //   <li className={`${location.pathname === `/${ROUTER.about}` ? "active" : ""}`}>
                      //     <Link to={`/${ROUTER.about}`}>
                      //       <svg
                      //         xmlns="http://www.w3.org/2000/svg"
                      //         viewBox="0 0 24 24"
                      //         fill="none"
                      //         stroke="currentColor"
                      //         strokeWidth="2"
                      //         strokeLinecap="round"
                      //         strokeLinejoin="round"
                      //         style={{ width: "20px", height: "20px" }}
                      //       >
                      //         <circle cx="12" cy="12" r="10"></circle>
                      //         <line x1="12" y1="16" x2="12" y2="12"></line>
                      //         <line x1="12" y1="8" x2="12.01" y2="8"></line>
                      //       </svg>
                      //       <span>About</span>
                      //     </Link>
                      //   </li>
                      //   <li className={`${!isAmbassador ? "disabled ambassador-disabled" : ""} item-progress`}>
                      //     <Link to="#" className={!isAmbassador ? "disabled-link" : ""}>
                      //       <ProjectNavTabIcon />
                      //       <span>Ambassadorship</span>
                      //     </Link>
                      //     {!isAmbassador && (
                      //       <div className="item-tooltip">
                      //         <p>Please complete your ambassadorship request in profile section</p>
                      //       </div>
                      //     )}
                      //   </li>     */}
                {
                  mobileMenuItems.map((data, index) => {
                    return (
                      <li
                        key={index}
                        className={`mobile_tab ${location.pathname === `/${data.href}` ? "active" : ""} ${data.isDisabled ? "disabled" : ""} `}
                      >
                        <Link to={data.href}>
                          {data.icon}
                          {data.label === 'Chat' ?
                            <span className="chat">
                              Chat
                              <p className="chat_count">{totalUnreadCount > 99 ? '99+' : totalUnreadCount}</p>
                            </span> :
                            <span>{data.label}</span>
                          }
                        </Link>
                      </li>
                    )
                  })
                }
                <li className="mobile_tab more_tab">
                  <CustomFooterDropdown
                    position="top_right"
                    toggleButton={
                      <ThreeDots />
                    }
                    items={mobileDropdownItems}
                  />
                </li>
              </>
            ) : (
              <>
                <li onClick={handleBackClick}>
                  <Link to="#">
                    <span>←</span>
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
      </div>
    </>
  );
};

export default Sidebar;
