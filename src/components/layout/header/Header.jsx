import { useState, useEffect } from "react";
import sidbarMenu from "../../../assets/menu.png"
import CustomDropdown from "../../custom-dropdown/CustomDropdown"
import profileIcon from "../../../assets/profile-icon.png";
import logoutIcon from "../../../assets/logout-icon.png";
import { useDispatch, useSelector } from 'react-redux';
import { getUserWalletAPI } from '../../../api-services/userApis';

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
    const dispatch = useDispatch();
    const { userId } = useSelector(state => state.auth);
    const { currency_b, loading } = useSelector(state => state.wallet);

    useEffect(() => {
        if (userId) {
            dispatch(getUserWalletAPI(userId));
        }
    }, [userId, dispatch]);

    return (
        <header className="header_wrp">
            <h4 className='header_title'>Darknight Labs</h4>
            <button className="header_btn">Home page</button>
            <div className="wallet-balance">
                {loading ? 'Loading...' : `Balance: ${currency_b || 0} B`}
            </div>
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