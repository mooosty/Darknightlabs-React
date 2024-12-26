import "./sidebar.scss";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { ROUTER } from "../../../utils/routes/routes";
import { useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { ProfileNavTabIcon, CollapseLeftIcon, CollapseRightIcon, ThreeDots, ChatNavTabIcon, LogoutNavTabIcon, ProjectNavTabIcon, MyContentNavTabIcon, SynergiesNavTabIcon, InvestmentNavTabIcon, PendingSynergiesNavTabIcon, SynergiesManagerNavTabIcon, KarmaNavTabIcon } from "../../../utils/constants/images";
import { handleLogout } from "../../../store/slice/authSlice";
import { useWindowSize } from "@uidotdev/usehooks";
import { CustomFooterDropdown } from "../../../components";
import { KarmaIcon } from "../../../utils/SVGs/SVGs";
import { useSocket } from "../../../utils/socket-provider/SocketContext";
import { getGroupsAPI } from "../../../api-services";

const userRole = "ADMIN";
const Sidebar = () => {
  const size = useWindowSize();
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [isCollapse, setIsCollapse] = useState(false);
  const [userProjects, setUserProjects] = useState([]);
  const [mobileMenuItems, setMobileMenuItems] = useState([]);
  const [mobileDropdownItems, setMobileDropdownItems] = useState([]);
  const [isAmbassadorMode, setIsAmbassadorMode] = useState(false);

  const userData = useSelector((state) => state.auth);
  const { userDetails } = useSelector((state) => state.user);


  const handleCollapse = () => {
    setIsCollapse(!isCollapse);
  };

  const handleAmbassadorClick = () => {
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

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const response = await axios.get(`https://winwinsocietyweb3.com/api/userprojects/all/${userData.userId}`, {
          headers: {
            Authorization: `Bearer eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6IjZmNjg4Y2I0LTk3MmItNDZhNy1iZWMwLTJjOTEyNTVlYjUyMyJ9.eyJraWQiOiI2ZjY4OGNiNC05NzJiLTQ2YTctYmVjMC0yYzkxMjU1ZWI1MjMiLCJhdWQiOiJodHRwOi8vbG9jYWxob3N0OjUxNzMiLCJpc3MiOiJhcHAuZHluYW1pY2F1dGguY29tL2QxZmZjZWVhLTg5Y2UtNGM4Zi1iYTMyLTBiODAyZmFiODgyMiIsInN1YiI6IjM4NDM3NWQ1LTJiNjUtNDQzMC1iZTQ4LWYwYzE4N2Q0YTg5ZiIsInNpZCI6Ijk2YWJhMGJiLTU3YWYtNGU4YS1hOTkyLTc0ZTYzNmNhZGU4YSIsImVtYWlsIjoic2Ftc2F3bG8xMDBAZ21haWwuY29tIiwiZW52aXJvbm1lbnRfaWQiOiJkMWZmY2VlYS04OWNlLTRjOGYtYmEzMi0wYjgwMmZhYjg4MjIiLCJsaXN0cyI6W10sIm1pc3NpbmdfZmllbGRzIjpbXSwidmVyaWZpZWRfY3JlZGVudGlhbHMiOlt7ImFkZHJlc3MiOiIweEM5QTZjZjZjZTc4RUI0OTkxQjFkMUFBNTgwOTJjNjBiNUVkNkZEQTgiLCJjaGFpbiI6ImVpcDE1NSIsImlkIjoiYzY0NjFlZjAtNmMxZC00ZjdhLWI4NDUtODEzMTg5NDIzYTU5IiwibmFtZV9zZXJ2aWNlIjp7fSwicHVibGljX2lkZW50aWZpZXIiOiIweEM5QTZjZjZjZTc4RUI0OTkxQjFkMUFBNTgwOTJjNjBiNUVkNkZEQTgiLCJ3YWxsZXRfbmFtZSI6InR1cm5rZXloZCIsIndhbGxldF9wcm92aWRlciI6ImVtYmVkZGVkV2FsbGV0Iiwid2FsbGV0X3Byb3BlcnRpZXMiOnsidHVybmtleVN1Yk9yZ2FuaXphdGlvbklkIjoiMmI1M2RmODktNWM0My00MzNmLTg2Y2MtZGJmZDg5ZTEyNDNiIiwidHVybmtleUhEV2FsbGV0SWQiOiJkMmVlOWMwZC0wNTkwLTVmMmEtYjMwMi1kODFiYjZjMTA4NzMiLCJpc0F1dGhlbnRpY2F0b3JBdHRhY2hlZCI6ZmFsc2UsInR1cm5rZXlVc2VySWQiOiI0Zjk2MjE3My0wMzAwLTRiODAtODBhOC05MzRiMmM5NTRiN2MiLCJpc1Nlc3Npb25LZXlDb21wYXRpYmxlIjpmYWxzZSwidmVyc2lvbiI6IlYxIn0sImZvcm1hdCI6ImJsb2NrY2hhaW4iLCJsYXN0U2VsZWN0ZWRBdCI6IjIwMjQtMTItMDZUMTU6MTI6MjguOTUzWiIsInNpZ25JbkVuYWJsZWQiOmZhbHNlfSx7ImVtYWlsIjoic2Ftc2F3bG8xMDBAZ21haWwuY29tIiwiaWQiOiJmNDU3NzJkNy0yM2FmLTQ3ZmQtYmQ1YS1lZjJjMGRmNzcxNmQiLCJwdWJsaWNfaWRlbnRpZmllciI6InNhbXNhd2xvMTAwQGdtYWlsLmNvbSIsImZvcm1hdCI6ImVtYWlsIiwic2lnbkluRW5hYmxlZCI6dHJ1ZX0seyJpZCI6IjZlZGM1NmM5LTQwN2QtNDlmYi04NGQ4LTZmMmI4ZTI5NDQxZSIsInB1YmxpY19pZGVudGlmaWVyIjoiTGFoY2VuIiwiZm9ybWF0Ijoib2F1dGgiLCJvYXV0aF9wcm92aWRlciI6InR3aXR0ZXIiLCJvYXV0aF91c2VybmFtZSI6ImxhaGNlbnJhaGxhb3VpIiwib2F1dGhfZGlzcGxheV9uYW1lIjoiTGFoY2VuIiwib2F1dGhfYWNjb3VudF9pZCI6IjEyMTQzMjk3NjIzNzE1NTk0MjQiLCJvYXV0aF9hY2NvdW50X3Bob3RvcyI6WyJodHRwczovL3Bicy50d2ltZy5jb20vcHJvZmlsZV9pbWFnZXMvMTQ2MDMwMjE5OTQ5MDI5Mzc2Ni8yeDhTYUE4Tl9ub3JtYWwuanBnIl0sIm9hdXRoX2VtYWlscyI6W10sIm9hdXRoX21ldGFkYXRhIjp7ImlkIjoiMTIxNDMyOTc2MjM3MTU1OTQyNCIsIm5hbWUiOiJMYWhjZW4iLCJwdWJsaWNfbWV0cmljcyI6eyJmb2xsb3dlcnNfY291bnQiOjIsImZvbGxvd2luZ19jb3VudCI6MTUsInR3ZWV0X2NvdW50IjowLCJsaXN0ZWRfY291bnQiOjAsImxpa2VfY291bnQiOjIsIm1lZGlhX2NvdW50IjowfSwicHJvZmlsZV9pbWFnZV91cmwiOiJodHRwczovL3Bicy50d2ltZy5jb20vcHJvZmlsZV9pbWFnZXMvMTQ2MDMwMjE5OTQ5MDI5Mzc2Ni8yeDhTYUE4Tl9ub3JtYWwuanBnIiwiZGVzY3JpcHRpb24iOiIiLCJ1c2VybmFtZSI6ImxhaGNlbnJhaGxhb3VpIn0sInNpZ25JbkVuYWJsZWQiOnRydWV9XSwibGFzdF92ZXJpZmllZF9jcmVkZW50aWFsX2lkIjoiNmVkYzU2YzktNDA3ZC00OWZiLTg0ZDgtNmYyYjhlMjk0NDFlIiwiZmlyc3RfdmlzaXQiOiIyMDI0LTEyLTA1VDE1OjAzOjExLjAxOFoiLCJsYXN0X3Zpc2l0IjoiMjAyNC0xMi0wNlQxNToxMjoyOC41NzNaIiwibmV3X3VzZXIiOmZhbHNlLCJtZXRhZGF0YSI6e30sInZlcmlmaWVkQ3JlZGVudGlhbHNIYXNoZXMiOnsiYmxvY2tjaGFpbiI6ImQ0NzQxYmJjMjA3OWVlOTI4M2EzNmExMGI4ODg3ODdlIiwiZW1haWwiOiI0MzVjY2FiZTEzNmFlNTk3NWNhYTE3ZWVlM2NlNTI0NCIsIm9hdXRoIjoiNjliOWMwYjliMmRmMDk1NWU3NjMwNmM0YTQ0NjNiNjIifSwiaWF0IjoxNzMzNDk3OTQ5LCJleHAiOjE3MzYwODk5NDl9.KoZZuNpDFD8nuGvtz--5qbuUQuXpqHxG5Vfnph-piOZb62eR7DvbP_pJAq48FU4WonGSix75CNeuwzbJhuu2pv3ihgCoPFb77mSRWFBUrgQIBnbYCx_wcVQk-I20_gugsR-pVoGbhpA4EMweOeJ3rSWmQ9TtFJhkCIHgVj6hYr4wVzxDq0pbWYgN-nIS6hGF6l4rMQvq_5aQY9ySLGNstvo9spW6H52R9UuzMSv2V54DX_0RixZr-yMSJhZivUUU8f53DW5iGktZJH5KsN5egzmHR5Yp3JUMy2NAc2cRPHXOAUZ1SjKKqOUsyBFRO1H-w1KjJU1NoH-egFlv7xU9DPtv8i_Ls9SyokRS7WOsgLI64ah29dSDcIJf5k0C1Ovh12qpQynE0JM8J7ZzgkW0-sBTDlcL9wZKzXMI58t0fHUG9-mcjoBtfecakWKwe2xfoXs_3cn3lhyKHQD0I0bxDiz6v_YpCC84i7Xk3N3Fn1_8SOzg3HKFbyTfUtlKZPpWdlK_RltQdDTjivBpz6v-irNZChvAljrczwiw8fln62mB49VAuT2XBI_sLVAalr1CdJCFnVg3TEe53Q-hznT9pxdUF_9QP1b6aTs0X2N60B4Tk3TOfFGgt0Njn6usbkR63fh676v5fFL5y3aibP8JSNDlYRCdowmjAz8oVoMGblc`,
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
            <h2 className="ambassador_title">Ambassadorship</h2>
          )}
          <div className="profile_box">
            <div className="profile_image">
              <img src={userData.profile_picture} alt="Profile" />
            </div>
            <div className="user_name">
              <h3>{userData.name.split(" ")[0]}</h3>
              <p>User</p>
              <div className="balance">
                <span>Balance: </span>
                <span>{userDetails?.currency_b || 0}
                  <KarmaIcon style={{ width: '1em', height: '1em' }} /></span>
              </div>
              <button className="collapse_btn" onClick={handleCollapse}>
                {isCollapse ? (
                  <CollapseRightIcon />
                ) : (
                  <CollapseLeftIcon />
                )}
              </button>
            </div>
          </div>

          {!isAmbassadorMode ? (
            // Regular menu items
            <>
              <div className="menu-box">
                <ul>
                  <li className={`${location.pathname.startsWith(`/${ROUTER.projects}`) ? "active" : ""} ${userProjects.length !== -1 ? "disabled" : ""}`}>
                    <Link to={ROUTER.projects}>
                      <ProfileNavTabIcon />
                      <span className="menu_text">Projects</span>
                    </Link>
                  </li>
                  {userRole == "ADMIN" && (
                    <li className={`${location.pathname.startsWith(`/${ROUTER.projectManager}`) ? "active" : ""} ${userProjects.length === 0 ? "disabled" : ""}`}>
                      <Link to={ROUTER.projectManager}>
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
                        } ${userProjects.length !== -1 ? "disabled" : ""}`}
                    >
                      <Link to={ROUTER.synergies}>
                        <SynergiesNavTabIcon />
                        <span className="menu_text">Synergies</span>
                      </Link>
                    </li>
                    <li className={`${location.pathname === `/${ROUTER.investment}` ? "active" : ""}`}>
                      <Link to={ROUTER.investment}>
                        <InvestmentNavTabIcon />
                        <span className="menu_text">Investment </span>
                      </Link>
                    </li>
                  </>

                  {userRole == "ADMIN" && (
                    <>
                      <li className={`${location.pathname === `/${ROUTER.synergyRequests}` ? "active" : ""} ${userProjects.length === 0 ? "disabled" : ""}`}>
                        <Link to={ROUTER.synergyRequests}>
                          <SynergiesNavTabIcon />
                          <span className="menu_text">Synergy requests</span>
                        </Link>
                      </li>
                      <li className={`${location.pathname === `/${ROUTER.synergiesManager}` ? "active" : ""} ${userProjects.length === 0 ? "disabled" : ""}`}>
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
                  <li className={`${location.pathname === `/${ROUTER.chat}` ? "active" : ""} chat ${userProjects?.length !== -1 ? "disabled" : ""}`}>
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
                  </li>
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
                      <span className="menu_text">Ambassadorship</span>
                    </Link>
                  </li>
                </ul>
              </div>
            </>
          ) : (
            // Ambassador mode menu items
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
                    <span className="menu_text">Exclusive Projects</span>
                  </Link>
                </li>
              </ul>
            </div>
          )}

          <div className="menu-box sidebar_bottom">
            <span className="separator"></span>
            <ul>
              {isAmbassadorMode ? (
                <li>
                  <Link to="#" onClick={handleBackClick} style={{ color: '#e8efdb' }}>
                    ←<span className="menu_text"> Back to Menu</span>
                  </Link>
                </li>
              ) : (
                <li>
                  <Link
                    to={ROUTER.authentication}
                    onClick={() => {
                      dispatch(handleLogout())
                      localStorage.clear();
                    }}
                  >
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
                {/* <li className={`mobile_tab ${location.pathname === `/${ROUTER.projects}` ? "active" : ""} ${userProjects?.length !== -1 ? "disabled" : ""}`}>
                  <Link to={ROUTER.projects}>
                    <ProjectNavTabIcon />
                    <span>Projects</span>
                  </Link>
                </li>
                {userRole == "ADMIN" && (
                  <li className={`mobile_tab ${location.pathname === `/${ROUTER.projectManager}` ? "active" : ""}  ${userProjects?.length !== -1 ? "disabled" : ""}`}>
                    <Link to={ROUTER.projectManager}>
                      <ProfileNavTabIcon />
                      <span>Projects manager</span>
                    </Link>
                  </li>
                )}
                <li className={`mobile_tab ${location.pathname === `/${ROUTER.synergies}` ? "active" : ""}  ${userProjects?.length !== -1 ? "disabled" : ""}`}>
                  <Link to={ROUTER.synergies}>
                    <SynergiesNavTabIcon />
                    <span>Synergies</span>
                  </Link>
                </li>
                <li className={`mobile_tab ${location.pathname === `/${ROUTER.investment}` ? "active" : ""}`}>
                  <Link to={ROUTER.investment}>
                    <InvestmentNavTabIcon />
                    <span>Investment</span>
                  </Link>
                </li>
                {userRole == "ADMIN" && (
                  <>
                    <li className={`mobile_tab ${location.pathname === `/${ROUTER.synergyRequests}` ? "active" : ""} ${userProjects?.length === 0 ? "disabled" : ""}`}>
                      <Link to={ROUTER.synergyRequests}>
                        <PendingSynergiesNavTabIcon />
                        <span>Pending Synergies</span>
                      </Link>
                    </li>
                    <li className={`mobile_tab ${location.pathname === `/${ROUTER.synergiesManager}` ? "active" : ""}  ${userProjects?.length === 0 ? "disabled" : ""}`}>
                      <Link to={ROUTER.synergiesManager}>
                        <SynergiesManagerNavTabIcon />
                        <span>Synergies Manager</span>
                      </Link>
                    </li>
                  </>
                )}
                <li className={`mobile_tab ${location.pathname === `/${ROUTER.chat}` ? "active" : ""} ${userProjects?.length !== -1 ? "disabled" : ""}`}>
                  <Link to={userProjects?.length === 0 ? "#" : ROUTER.chat}>
                    <ChatNavTabIcon />
                    <span className="chat">
                      Chat
                       <p className="chat_count">
                        {totalUnreadCount > 99 ? '99+' : totalUnreadCount}
                      </p>
                    </span>
                  </Link>
                </li>
                <li className={`mobile_tab ${location.pathname === `/${ROUTER.karma}` ? "active" : ""}`}>
                  <Link to={ROUTER.karma}>
                    <KarmaNavTabIcon />
                    <span>Karma</span>
                  </Link>
                </li>
                */}
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
                <li className="mobile_tab" onClick={handleBackClick}>
                  <Link to="#">
                    <span>←</span>
                    <span>Back</span>
                  </Link>
                </li>
                <li className={`mobile_tab ${location.pathname === `/${ROUTER.myContent}` ? "active" : ""}`}>
                  <Link to={ROUTER.myContent}>
                    <MyContentNavTabIcon />
                    <span>My Content</span>
                  </Link>
                </li>
                <li className={`mobile_tab ${location.pathname === `/${ROUTER.ambassadorProjects}` ? "active" : ""}`}>
                  <Link to={ROUTER.ambassadorProjects}>
                    <ProjectNavTabIcon />
                    <span>Exclusive Projects</span>
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
