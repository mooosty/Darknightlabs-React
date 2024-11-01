import './sidebar.scss'
import profileImage from "../../../assets/profile-image.jpeg"
import collapseLeftIcon from "../../../assets/collapse-left-icon.png"
import collapseRightIcon from "../../../assets/collapse-right-icon.png"
import projectIcon from "../../../assets/project-icon.png"
import pendingIcon from "../../../assets/pending-icon.png"
import synergiesIcon from "../../../assets/synergies-icon.png"
import chatIcon from "../../../assets/chat-icon.png"
import profileIcon from "../../../assets/profile-icon.png"
import logoutIcon from "../../../assets/logout-icon.png"
import { Link, useLocation } from 'react-router-dom'
import { ROUTER } from '../../../utils/routes/routes'
import { useState } from 'react'


const Sidebar = () => {
    const location = useLocation()
    const [isCollapse, setIsCollapse] = useState(false);
    const handleCollapse = () => {
        setIsCollapse(!isCollapse);
    }
    return (
        <>
            <div className={`sidebar ${isCollapse ? 'sidebar_collapsed' : ''}`}>
                <div className="profile_box">
                    <div className="profile_image">
                        <img src={profileImage} alt="Profile" />
                    </div>
                    <div className="user_name">
                        <h3>Username</h3>
                        <p>Admin</p>
                    </div>
                    <button className="collapse_btn" onClick={handleCollapse} >
                        {isCollapse ?
                            <img src={collapseRightIcon} alt="Collapse" />
                            :
                            <img src={collapseLeftIcon} alt="Collapse" />
                        }
                    </button>
                </div>
                <div className="menu-box">
                    <ul>
                        <li className={`${location.pathname.startsWith(`/${ROUTER.projectManager}`) ? 'active' : ''}`}>
                            <Link to={ROUTER.projectManager}>
                                <img src={projectIcon} alt="Project Manager" />
                                <span className='menu_text'>Projects Manager</span>
                            </Link>
                        </li>
                    </ul>
                </div>
                <div className="menu-box">
                    <span className="separator"></span>
                    <ul>
                        <li className={`${location.pathname === `/${ROUTER.pendingSynergies}` ? 'active' : ''}`}>
                            <Link to={ROUTER.pendingSynergies}>
                                <img src={pendingIcon} alt="Pending Synergies" />
                                <span className='menu_text'>Pending Synergies</span>
                            </Link>
                        </li>
                        <li className={`${location.pathname === `/${ROUTER.synergiesManager}` ? 'active' : ''}`}>
                            <Link to={ROUTER.synergiesManager}>
                                <img src={synergiesIcon} alt="Synergies Manager" />
                                <span className='menu_text'>Synergies Manager </span>
                            </Link>
                        </li>
                    </ul>
                </div>
                <div className="menu-box">
                    <span className="separator"></span>
                    <ul>
                        <li className={`${location.pathname === `/${ROUTER.chat}` ? 'active' : ''} chat`}>
                            <Link to={ROUTER.chat}>
                                <img src={chatIcon} alt="Chat" />
                                <span className='menu_text'>Chat</span>
                                <span className="notification">
                                    <span className="notification_text">1</span>
                                </span>
                            </Link>
                        </li>
                        <li className={`${location.pathname === `/${ROUTER.profile}` ? 'active' : ''}`}>
                            <Link to={ROUTER.profile}>
                                <img src={profileIcon} alt="Profile" />
                                <span className='menu_text'>Profile</span>
                            </Link>
                        </li>
                    </ul >
                </div >
                <div className="menu-box sidebar_bottom">
                    <span className="separator"></span>
                    <ul>
                        <li>
                            <Link href="#">
                                <img src={logoutIcon} alt="Logout" />
                                <span className='menu_text'>Logout</span>
                            </Link>
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