import './signupPopup.scss';
import closeIcon from '../../../assets/X-icon.png';
import divider from '../../../assets/divider.png';
import { Link } from 'react-router-dom';
import { CalendarIcon, CloseEyeIcon, FaceBookIcon, GoogleIcon, InstagramIcon, OpenEyeIcon, TwitterIcon } from '../../../utils/SVGs/SVGs';
import PropTypes from 'prop-types';
import { useState } from 'react';

const SignupPopup = ({ open, handleClose }) => {
    const [isPassEyeOpen, setIsPassEyeOpen] = useState(false);
    const [isConfirmPassEyeOpen, setIsConfirmPassEyeOpen] = useState(false);

    const handleClick = () => {
        handleClose()
    }


    return (
        <div className={`model_bg ${open ? 'active' : ''} `}>
            <div className={`sign_up_popup`}>
                <div className='model_box'>
                    <div className='model_body'>
                        <div className='model_header'>
                            <h3>Sign Up</h3>
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
                            <div className="input-wrap">
                                <label>
                                    Confirm Password
                                </label>
                                <div className="type_password">
                                    <input type={isConfirmPassEyeOpen ? 'text' : 'password'} name="email" placeholder='Password' />
                                    <div className="eye_icon" onClick={() => setIsConfirmPassEyeOpen(!isConfirmPassEyeOpen)}>
                                        {isConfirmPassEyeOpen ? <OpenEyeIcon /> : <CloseEyeIcon />}
                                    </div>
                                </div>
                            </div>
                            <div className="input-wrap">
                                <label>
                                    Date of Birth
                                </label>
                                <div className="type_date">
                                    <input type="date" name="email" placeholder='DD/MM/YYYY' />
                                    <div className="calendar_icon">
                                        <CalendarIcon />
                                    </div>
                                </div>
                                <span>We may have a gift for you for that day</span>
                            </div>
                            <div className="signUp-btn">
                                <button>Sign up</button>
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
                                    <span>Have account?</span>
                                    <div className="link">
                                        <Link onClick={handleClick}>Login</Link>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div >

    )
}

SignupPopup.propTypes = {
    open: PropTypes.bool,
    handleClose: PropTypes.func,
}

export default SignupPopup