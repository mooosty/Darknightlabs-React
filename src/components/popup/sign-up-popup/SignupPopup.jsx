import './signupPopup.scss';
import closeIcon from '../../../assets/X-icon.png';
import divider from '../../../assets/divider.png';
import { Link } from 'react-router-dom';
import { FaceBookIcon, GoogleIcon, InstagramIcon, TwitterIcon } from '../../../utils/SVGs/SVGs';
import PropTypes from 'prop-types';

const SignupPopup = ({ open, handleClose }) => {

    const handleClick = () => {
        handleClose()
    }
    
    return (
        <div className={`signUp-container ${open ? 'active' : ''}`}>
            <div className='signUp-card-container'>
                <div className='signUp-card'>
                    <div className='header'>
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
                            <input type="text" name="email" placeholder='Password' />
                        </div>
                        <div className="input-wrap">
                            <label>
                                Confirm Password
                            </label>
                            <input type="text" name="email" placeholder='Password' />
                        </div>
                        <div className="input-wrap">
                            <label>
                                Date of Birth
                            </label>
                            <input type="date" name="email" placeholder='DD/MM/YYYY' />
                            <span>We may have a gift for you for that day</span>
                        </div>
                        <div className="signUp-btn">
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
    )
}

SignupPopup.propTypes = {
    open: PropTypes.bool,
    handleClose: PropTypes.func,
}

export default SignupPopup