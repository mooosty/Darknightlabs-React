import './sidebar.scss'
import profileImage from "../../../assets/profile-image.jpeg"
import collapseLeftIcon from "../../../assets/collapse-left-icon.png"
import projectIcon from "../../../assets/project-icon.png"
import pendingIcon from "../../../assets/pending-icon.png"
import synergiesIcon from "../../../assets/synergies-icon.png"
import chatIcon from "../../../assets/chat-icon.png"
import profileIcon from "../../../assets/profile-icon.png"
import logoutIcon from "../../../assets/logout-icon.png"


const Sidebar = () => {
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
                <div className="menu-box active project_manager">
                    <ul>
                        <li>
                            <a href="#">
                                <img src={projectIcon} alt="Project Manager" />
                                Projects manager
                            </a>
                        </li>
                    </ul>
                </div>
                <div className="menu-box synergies_menu">
                    <span className="saprator"></span>
                    <ul>
                        <li>
                            <a href="#">
                                <img src={pendingIcon} alt="Pending Synergies" />
                                Pending Synergies
                            </a>
                        </li>
                        <li>
                            <a href="#">
                                <img src={synergiesIcon} alt="Synergies Manager" />
                                Synergies Manager
                            </a>
                        </li>
                    </ul>
                </div>
                <div className="menu-box chat_profile">
                    <span className="saprator"></span>
                    <ul>
                        <li>
                            <a href="#">
                                <img src={chatIcon} alt="Chat" />
                                Chat <span className="notification">1</span>
                            </a>
                        </li>
                        <li>
                            <a href="#">
                                <img src={profileIcon} alt="Profile" />
                                Profile
                            </a>
                        </li>
                    </ul>
                </div>
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
            </div>

            <div className="mobile_bottom_footer">
                <ul>
                    <li className="active">
                        <a href="#">
                            <img src={projectIcon} alt="" />
                            <span>Projects manager</span>
                        </a>
                    </li>
                    <li>
                        <a href="#">
                            <img src={pendingIcon} alt="" />
                            <span>Pending Synergies</span>
                        </a>
                    </li>
                    <li>
                        <a href="#">
                            <img src={synergiesIcon} alt="" />
                            <span>Synergies Manager</span>
                        </a>
                    </li>
                    <li>
                        <a href="#">
                            <img src={chatIcon} alt="" />
                            <span className="chat">Chat <p className="chat_count">1</p></span>
                        </a>
                    </li>
                    <li>
                        <a href="#">
                            <img src={profileIcon} alt="" />
                            <span>Profile</span>
                        </a>
                    </li>
                </ul>
            </div>
        </>
    )
}

export default Sidebar