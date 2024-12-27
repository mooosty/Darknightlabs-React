import { CustomDropdown } from "../../../components"
import { useDispatch, useSelector } from 'react-redux';
import './header.scss'
import { ProfileNavTabIcon, LogoutNavTabIcon, BurgerMenuIcon } from "../../../utils/constants/images";
import { useNavigate } from 'react-router-dom';
import { ROUTER } from '../../../utils/routes/routes';
import { handleLogout } from "../../../store/slice/authSlice";


const Header = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { userDetails } = useSelector((state) => state.user);

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
            onClick: () => {
                dispatch(handleLogout())
                localStorage.clear();
                navigate(ROUTER.authentication);
            },
        },
    ];


    return (
        <header className="header_wrp">
            <span className="currency">Balance: {userDetails?.currency_b || 0} KP</span>
            <h4 className='header_title'>Darknight Labs</h4>
            <button className="header_btn">Home page</button>
            <div className="sidebar_btn">
                <CustomDropdown
                    toggleButton={
                        <BurgerMenuIcon />
                    }
                    items={dropdownItems}
                />
            </div>
        </header>
    )
}

export default Header