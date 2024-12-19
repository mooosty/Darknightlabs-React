
import './header.scss'
import sidbarMenu from "../../../assets/menu.png"
import CustomDropdown from "../../custom-dropdown/CustomDropdown"
import { ProfileNavTabIcon, LogoutNavTabIcon } from "../../../utils/SVGs/SVGs";
import { searchIcon } from '../../../utils/constants/images';

const dropdownItems = [
    {
        label: <button className="dropdown_tab">
            <ProfileNavTabIcon />
            <span>Profile</span>
        </button>,
        onClick: () => console.log('Item 1 clicked'),
    },
    {
        label: <button className="dropdown_tab logout_tab">
            <LogoutNavTabIcon />
            <span>Logout</span>
        </button>,
        onClick: () => console.log('Item 2 clicked'),
    },
];

const Header = () => {
    return (
        <header className="header_wrp">
            <div className=""></div>
            <h4 className='header_title'>Darknight Labs</h4>
            <button className="header_btn">Home page</button>
            <div className="sidbar_btn">
                <CustomDropdown
                    toggleButton={
                        <img src={sidbarMenu} alt="" />
                    }
                    items={dropdownItems}
                /></div>

        </header>
    )
}

export default Header