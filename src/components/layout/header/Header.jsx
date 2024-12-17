import { useState } from "react";
import sidbarMenu from "../../../assets/menu.png"
import CustomDropdown from "../../custom-dropdown/CustomDropdown"
import profileIcon from "../../../assets/profile-icon.png";
import logoutIcon from "../../../assets/logout-icon.png";


import './header.scss'

const dropdownItems = [
    {
        label: 'Profile',
        icon: profileIcon,
        onClick: () => alert("Box 1 clicked!"),
    },
    {
        label: "Logout",
        icon: logoutIcon,
        onClick: () => alert("Box 2 clicked!"),
    },
];

const Header = () => {
    const [isOpen, setIsOpen] = useState(false);
    const toggleDropdown = () => {
        setIsOpen(!isOpen);
    };
    return (
        <header className="header_wrp">
            <h4 className='header_title'>Darknight Labs</h4>
            <button className="header_btn">Home page</button>
            {/* <CustomDropdown
                isOpen={isOpen}
                toggleDropdown={toggleDropdown}
                items={dropdownItems}
            />
            <button className='sidbar_btn' onClick={toggleDropdown}>
                <img src={sidbarMenu} alt="" />
            </button> */}
        </header>
    )
}

export default Header