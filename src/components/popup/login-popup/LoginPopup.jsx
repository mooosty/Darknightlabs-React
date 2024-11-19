import './loginPopup.scss';
import PropTypes from 'prop-types';
import closeIcon from '../../../assets/X-icon.png'
import divider from '../../../assets/divider.png'
import { Link } from 'react-router-dom';
import { FaceBookIcon, GoogleIcon, InstagramIcon, TwitterIcon } from '../../../utils/SVGs/SVGs';

const LoginPopup = ({ open, handleClose }) => {

    const handleClick = () => {
        handleClose()
    }

    return (
        <div className={`login-container ${open ? 'active' : ''}`}>
            <div className='login-card-container'>
                <div className='login-card'>
                    <div className='header'>
                        <h3>Login</h3>
                        <button
                            onClick={() => {
                                handleClose()
                            }}>
                            <img src={closeIcon} alt="close" />
                        </button>
                    </div>
                    <div className='body'>
                        <div className="input-wrap">
                            <label>
                                Email Address
                            </label>
                            <input type="email" name="email" placeholder='Email Address' />
                        </div>
                        <div className="input-wrap">
                            <label>
                                Password
                            </label>
                            <input type="text" name="email" placeholder='Password' />
                        </div>
                        <div className="check-box-wrap">
                            <div className='check-box'>
                                <input type="checkbox" name="" id="rememberMe" className='checkbox_input' />
                                <label htmlFor='rememberMe' className='checkbox_label'></label>
                                <span className='checkbox_text'>Remember me</span>
                            </div>
                            <div className="link">
                                <Link>Forgot password?</Link>
                            </div>
                        </div>
                        <div className="login-btn">
                            <button>Login</button>
                        </div>

                        <div className="footer">
                            <div className="logos">
                                <span><FaceBookIcon /></span>
                                <span><InstagramIcon /></span>
                                <span><GoogleIcon /></span>
                                <span><TwitterIcon /></span>
                            </div>
                            <img src={divider} alt=" " />
                            <div className="texts">
                                <span>New here?</span>
                                <div className="link">
                                    <Link onClick={handleClick}>Sign up for new account</Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

LoginPopup.propTypes = {
    open: PropTypes.bool,
    handleClose: PropTypes.func,
}
export default LoginPopup