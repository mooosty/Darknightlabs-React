import sidbarMenu from "../../../assets/menu.png"
import './header.scss'

const Header = () => {

    return (
        <header className="header_wrp">
            <h4 className='header_title'>Darknight Labs</h4>
            <button className="header_btn">Home page</button>
            <button className='sidbar_btn'>
                <img src={sidbarMenu} alt="" />
            </button>
        </header>
    )
}

export default Header