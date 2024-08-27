import './sidebar.scss'
import profileImage from "../../../assets/profile-image.jpeg"
import collapseLeftIcon from "../../../assets/collapse-left-icon.png"
import projectIcon from "../../../assets/project-icon.png"
import pendingIcon from "../../../assets/pending-icon.png"
import synergiesIcon from "../../../assets/synergies-icon.png"
import chatIcon from "../../../assets/chat-icon.png"
import profileIcon from "../../../assets/profile-icon.png"
import logoutIcon from "../../../assets/logout-icon.png"
import { Link, useLocation } from 'react-router-dom'
import { ROUTER } from '../../../utils/routes/routes'


const Sidebar = () => {
    const location = useLocation()

    return (
        <>
            <div className="sidbar">
                <div className="profile_box">
                    <div className="profile_image">
                        <img src={profileImage} alt="Profile" />
                    </div>
                    <div className="user_name">
                        <h3>Username</h3>
                        <p>Admin</p>
                    </div>
                    <a className="collapse_btn" href="#">
                        <img src={collapseLeftIcon} alt="Collapse" />
                    </a>
                </div>
                <div className="menu-box project_manager">
                    <ul>
                        <li className={`${location.pathname === `/${ROUTER.projectManager}` ? 'active' : ''}`}>
                            <Link to={ROUTER.projectManager}>
                                <img src={projectIcon} alt="Project Manager" />
                                Projects manager
                            </Link>
                        </li>
                    </ul>
                </div>
                <div className="menu-box synergies_menu">
                    <span className="saprator"></span>
                    <ul>
                        <li className={`${location.pathname === `/${ROUTER.pendingSynergies}` ? 'active' : ''}`}>
                            <Link to={ROUTER.pendingSynergies}>
                                <img src={pendingIcon} alt="Pending Synergies" />
                                Pending Synergies
                            </Link>
                        </li>
                        <li className={`${location.pathname === `/${ROUTER.synergiesManager}` ? 'active' : ''}`}>
                            <Link to={ROUTER.synergiesManager}>
                                <img src={synergiesIcon} alt="Synergies Manager" />
                                Synergies Manager
                            </Link>
                        </li>
                    </ul>
                </div>
                <div className="menu-box chat_profile">
                    <span className="saprator"></span>
                    <ul>
                        <li className={`${location.pathname === `/${ROUTER.chat}` ? 'active' : ''}`}>
                            <Link  to={ROUTER.chat}>
                                <img src={chatIcon} alt="Chat" />
                                Chat <span className="notification">1</span>
                            </Link>
                        </li>
                        <li className={`${location.pathname === `/${ROUTER.profile}` ? 'active' : ''}`}>
                            <Link to={ROUTER.profile}>
                                <img src={profileIcon} alt="Profile" />
                                Profile
                            </Link>
                        </li>
                    </ul >
                </div >
                <div className="menu-box sidbar_bottom">
                    <span className="saprator"></span>
                    <ul>
                        <li>
                            <a href="#">
                                <img src={logoutIcon} alt="Logout" />
                                Logout
                            </a>
                        </li>
                    </ul>
                </div>
            </div >

            <div className="mobile_bottom_footer">
                <ul>
                    <li className={`${location.pathname === `/${ROUTER.projectManager}` ? 'active' : ''}`} >
                        <Link to={ROUTER.projectManager}>
                            <img src={projectIcon} alt="" />
                            <span>Projects manager</span>
                        </Link>
                    </li>
                    <li className={`${location.pathname === `/${ROUTER.pendingSynergies}` ? 'active' : ''}`}>
                        <Link to={ROUTER.pendingSynergies}>
                            <img src={pendingIcon} alt="" />
                            <span>Pending Synergies</span>
                        </Link>
                    </li>
                    <li className={`${location.pathname === `/${ROUTER.synergiesManager}` ? 'active' : ''}`}>
                        <Link to={ROUTER.synergiesManager}>
                            <img src={synergiesIcon} alt="" />
                            <span>Synergies Manager</span>
                        </Link>
                    </li>
                    <li className={`${location.pathname === `/${ROUTER.chat}` ? 'active' : ''}`}>
                        <Link to={ROUTER.chat}>
                            <img src={chatIcon} alt="" />
                            <span className="chat">Chat <p className="chat_count">1</p></span>
                        </Link>
                    </li>
                    <li className={`${location.pathname === `/${ROUTER.profile}` ? 'active' : ''}`}>
                        <Link to={ROUTER.profile}>
                            <img src={profileIcon} alt="" />
                            <span>Profile</span>
                        </Link>
                    </li>
                </ul>
            </div>
        </>
    )
}

export default Sidebar