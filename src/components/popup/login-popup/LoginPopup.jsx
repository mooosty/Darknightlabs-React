import './loginPopup.scss';
import PropTypes from 'prop-types';
import closeIcon from '../../../assets/X-icon.png'
import divider from '../../../assets/divider.png'
import { Link } from 'react-router-dom';
import { CloseEyeIcon, FaceBookIcon, GoogleIcon, InstagramIcon, OpenEyeIcon, TwitterIcon } from '../../../utils/SVGs/SVGs';
import { useState } from 'react';

const LoginPopup = ({ open, handleClose }) => {
    const [isPassEyeOpen, setIsPassEyeOpen] = useState(false);
    const handleClick = () => {
        handleClose()
    }
    return (
        <div className={`model_bg ${open ? 'active' : ''} `}>
            <div className={`login_popup`}>
                <div className='model_box'>
                    <div className='model_body'>
                        <div className='model_header'>
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
                                <div className="type_password">
                                    <input type={isPassEyeOpen ? 'text' : 'password'} name="email" placeholder='Password' />
                                    <div className="eye_icon" onClick={() => setIsPassEyeOpen(!isPassEyeOpen)}>
                                        {isPassEyeOpen ? <OpenEyeIcon /> : <CloseEyeIcon />}
                                    </div>
                                </div>
                            </div>
                            <div className="check-box-wrap">
                                <div className='check-box'>
                                    <input type="checkbox" name="rememberMe" id="rememberMe" className='checkbox_input' />
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
                                <img src={divider} alt=" " className='divider'/>
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
        </div>
    )
}

LoginPopup.propTypes = {
    open: PropTypes.bool,
    handleClose: PropTypes.func,
}
export default LoginPopup