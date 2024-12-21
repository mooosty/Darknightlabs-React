
import './header.scss'
import sidbarMenu from "../../../assets/menu.png"
import CustomDropdown from "../../custom-dropdown/CustomDropdown"
import { ProfileNavTabIcon, LogoutNavTabIcon } from "../../../utils/SVGs/SVGs";
import { useNavigate } from 'react-router-dom';
import { ROUTER } from '../../../utils/routes/routes';


const Header = () => {
    const navigate = useNavigate();

    const dropdownItems = [
        {
            label: <button className="dropdown_tab">
                <ProfileNavTabIcon />
                <span>Profile</span>
            </button>,
            onClick: () => navigate(ROUTER.profile),
        },
        {
            label: <button className="dropdown_tab logout_tab">
                <LogoutNavTabIcon />
                <span>Logout</span>
            </button>,
            onClick: () => { localStorage.clear(); window.location.href = "/"; },
        },
    ];
    
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