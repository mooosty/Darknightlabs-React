import './header.scss'
import { useDispatch } from 'react-redux';
import { CustomDropdown } from "../../../components"
import { ROUTER } from '../../../utils/routes/routes';
import { handleLogout } from "../../../store/slice/authSlice";
import { useNavigate, useLocation } from 'react-router-dom';
import { ProfileNavTabIcon, LogoutNavTabIcon, BurgerMenuIcon } from "../../../utils/constants/images";

const Header = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const location = useLocation();

    const dropdownItems = [
        {
            label: <button className="dropdown_tab">
                <ProfileNavTabIcon />
                <span>Profile</span>
            </button>,
            onClick: () => navigate(`/${ROUTER.profile}`),
        },
        {
            label: <button className="dropdown_tab logout_tab">
                <LogoutNavTabIcon />
                <span>Logout</span>
            </button>,
            onClick: () => {
                dispatch(handleLogout())
                localStorage.clear();
                navigate(`/${ROUTER.authentication}`);
            },
        },
    ];

    const isOnHomepage = location.pathname === `/${ROUTER.dashboard}` || location.pathname === '/';

    return (
        <header className="header_wrp">
            <h4 className='header_title'>Darknight Labs</h4>
            <div className="header_right">
                <button
                    className="header_btn"
                    onClick={() => isOnHomepage ? navigate(`/${ROUTER.profile}`) : navigate(`/${ROUTER.dashboard}`)}
                >
                    {isOnHomepage ? 'Dashboard' : 'Home page'}
                </button>
                <div className="sidebar_btn">
                    <CustomDropdown
                        toggleButton={
                            <BurgerMenuIcon />
                        }
                        items={dropdownItems}
                    />
                </div>
            </div>
        </header>
    )
}

export default Header