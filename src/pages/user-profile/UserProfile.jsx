import { useState } from 'react';
import "./userProfile.scss";
import soldierPhoto from "../../assets/Rectangle 3.png";
import editIcon from "../../assets/edit-icon.svg";
import sepratorImage from "../../assets/seprator-image.png"
import twitterIcon from "../../assets/pajamas_twitter.svg"
import discordIcon from "../../assets/teenyicons_discord-outline.svg"
import telegramIcon from "../../assets/basil_telegram-outline.svg"
import closedEyeIcon from "../../assets/EyeSlash.svg"
import openEyeIcon from "../../assets/OpenEyeSlash.svg"
import calendarBlankIcon from "../../assets/CalendarBlank.svg"
import SignUpPopup from '../../components/popup/sign-up-popup/SignupPopup';
import LoginPopup from '../../components/popup/login-popup/LoginPopup';


const InputPassword = (props) => {
    const [isPasswordVisible, setIsPasswordVisible] = useState(false);

    const toggleVisibility = () => {
        setIsPasswordVisible(!isPasswordVisible)
    }

    return (
        <div className="type_password">
            <input
                type={isPasswordVisible ? 'text' : 'password'}
                {...props}
            />
            <div onClick={toggleVisibility}>
                {!isPasswordVisible ?
                    <img src={closedEyeIcon} alt=" " />
                    :
                    <img src={openEyeIcon} alt=" " />
                }
            </div>
        </div>
    )
}


const UserProfile = () => {
    const [active, setActive] = useState('INFORMATION');
    const [isEditMode, setIsEditMode] = useState(false);
    const [isLoginPopupOpen, setIsLoginPopupOpen] = useState(false);
    const [isSignUpPopupOpen, setIsSignUpPopupOpen] = useState(false);

    const handleActive = (key) => {
        setActive(key);
    }

    const handleEditProfile = () => {
        setIsEditMode(true)
    }

    const cancelProfileEdit = () => {
        setIsEditMode(false)
    }


    return (
        <>
            {!isEditMode ?
                <>
                    <div className="profile_content_header">

                        <div className="profile_content_left">
                            <h2>Profile</h2>
                        </div>
                        <div className="profile_content_right">
                            <a href="#">Darknight Labs</a>
                        </div>
                    </div>
                    <div className="profile_page_data">
                        <div className="page_data">
                            <div className="header_button">
                                <div className={`buttons ${active === 'INFORMATION' ? 'active' : ''}`} onClick={() => handleActive('INFORMATION')} >PERSONAL INFORMATION</div>
                                <div className={`buttons ${active === 'INVOLVEMENT' ? 'active' : ''}`} onClick={() => handleActive('INVOLVEMENT')} >PROJECT INVOLVEMENT</div>
                            </div>
                            <div className="profile_page_header">
                                <div className="pagination">
                                    <span>Profile</span>
                                </div>
                                <button className="btn_gray" onClick={handleEditProfile}><img src={editIcon} alt="" />Edit profile</button>
                            </div>
                            <div className="profile_page_content">
                                <div className="project_profile">
                                    <div className="profile_upload_profile">
                                        <img src={soldierPhoto} alt="" />
                                    </div>
                                </div>
                                <div className="profile_description_data">
                                    <div className="form_box">
                                        <h3 className="profile_title">Personal information</h3>
                                        <div className="form_group_data">
                                            <div className="profile_info">
                                                <div className='profile_head'>First Name</div>
                                                <div className='profile_data'>Duncan</div>
                                            </div>
                                            <div className="profile_info">
                                                <div className='profile_head'>Last Name</div>
                                                <div className='profile_data'>Cameron</div>
                                            </div>
                                            <div className="profile_info">
                                                <div className='profile_head'>Date of birth</div>
                                                <div className='profile_data'>16/12/1998</div>
                                            </div>
                                            <div className="profile_info">
                                                <div className='profile_head'>User Name</div>
                                                <div className='profile_data'>sir_cameron</div>
                                            </div>
                                        </div>
                                        <div className="profile_bio_data">
                                            <div className='profile_bio_head'>Personal Bio</div>
                                            <div className='profile_bio_data'>The NFKT Knight: a digital crusade wielding blockchain magic, paving the way for artists to thrive in the boundless metaverse.</div>
                                        </div>
                                    </div>

                                    <div className="profile_seprator_image">
                                        <img src={sepratorImage} alt="Separator" />
                                    </div>
                                    <div className="form_box">
                                        <h3 className="profile_title">Contact information</h3>
                                        <div className="contact_info_data">
                                            <div className="mail">
                                                <div className='mail_head'>Email</div>
                                                <div className='mail_data'>sir.cameron@gmail.com</div>
                                                <div className='mail_desc'>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Magnam eos enim tenetur excepturi culpa neque modi quisquam, sunt magni</div>
                                            </div>
                                            <div className="social_media_wrp">
                                                <div className='social_media'>
                                                    <h2 className='social_media_title'>Connected accounts</h2>
                                                    <button className="btn_gray"><img src={twitterIcon} alt="" />Conect with Twitter</button>
                                                    <button className="btn_gray"><img src={discordIcon} alt="" />Conect with Discord</button>
                                                    <button className="btn_gray"><img src={telegramIcon} alt="" />Conect with Telegram</button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="profile_seprator_image">
                                        <img src={sepratorImage} alt="Separator" />
                                    </div>

                                    <div className="form_box">
                                        <h3 className="profile_title">Password</h3>
                                        <div className="password_info_data">
                                            <div className='password_head'>Current password</div>
                                            <div className='password_data'>************</div>
                                            <div className='password_desc'>Last updated at 12/12/23 118:04</div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </>
                :
                <div className="profile_page_data edit_mode">
                    <div className="page_data">
                        <div className="profile_page_header">
                            <div className="pagination">
                                <span> Edit Profile</span>
                            </div>
                        </div>
                        <div className="profile_page_content">
                            <div className="project_profile">
                                <div className="profile_upload_profile">
                                    <img src={soldierPhoto} alt="" />
                                </div>
                                <div className='profile_upload_button'>
                                    <button className="change_photo" > Change Photo</button>
                                </div>
                            </div>
                            <div className="profile_description_form">
                                <div className="form_box">
                                    <h3 className="profile_title">Personal information</h3>
                                    <div className="form_group">
                                        <div className='form_group_row'>
                                            <div className="profile_info">
                                                <label>First Name</label>
                                                <input type="text" value="Duncan" placeholder='First Name' />
                                            </div>
                                            <div className="profile_info">
                                                <label>Last Name</label>
                                                <input type="text" value="Cameron" placeholder='Last Name' />
                                            </div>
                                        </div>
                                        <div className='form_group_row'>
                                            <div className="profile_info">
                                                <label>Date of birth</label>
                                                <div className="type_calendar">
                                                    <input id='dateOfBirth' type="date" placeholder='DD/MM/YYYY' />   {/** Use this input for date field control */}
                                                    <label htmlFor='dateOfBirth'>
                                                        <span>{'16/12/1998'}</span>    {/** Display value here */}
                                                        <img src={calendarBlankIcon} alt=".." />
                                                    </label>
                                                </div>
                                            </div>
                                            <div className="profile_info">
                                                <label>User Name</label>
                                                <input type="text" value="sir_cameron" placeholder='Username' />
                                            </div>
                                        </div>
                                    </div>
                                    <div className="profile_bio">
                                        <label> Bio</label>
                                        <textarea className='textArea' placeholder='Lorem ipsum' value="The NFKT Knight: a digital crusade wielding blockchain magic, paving the way for artists to thrive in the boundless metaverse." />
                                    </div>
                                </div>

                                <div className="profile_seprator_image">
                                    <img src={sepratorImage} alt="Separator" />
                                </div>
                                <div className="form_box">
                                    <h3 className="profile_title">Contact information</h3>
                                    <div className="contact_info">
                                        <div className="mail">
                                            <div className='profile_head'>Email</div>
                                            <input type="text" placeholder='Email' value="sir.cameron@gmail.com" />
                                            <div className='profile_desc'>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Magnam eos enim tenetur excepturi culpa neque modi quisquam, sunt magni</div>
                                        </div>
                                        <div className="social_media_wrp">
                                            <div className='social_media'>
                                                <h2 className='social_media_title'>Connected accounts</h2>
                                                <button className="btn_gray"><img src={twitterIcon} alt="" />Conect with Twitter</button>
                                                <button className="btn_gray"><img src={discordIcon} alt="" />Conect with Discord</button>
                                                <button className="btn_gray"><img src={telegramIcon} alt="" />Conect with Telegram</button>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div className="profile_seprator_image">
                                    <img src={sepratorImage} alt="Separator" />
                                </div>

                                <div className="form_box">
                                    <h3 className="profile_title">Password</h3>
                                    <div className="contact_info">
                                        <div className="password">
                                            <div className="password_input" >
                                                <label>New Password</label>
                                                <InputPassword
                                                    placeholder='Password'
                                                    value='Test123'
                                                />
                                            </div>
                                            <div className="password_input" >
                                                <label>Confirm Password</label>
                                                <InputPassword
                                                    placeholder='Confirm password'
                                                    value='Test123'
                                                />
                                            </div>
                                        </div>
                                    </div>
                                    <div className="profile_seprator_image">
                                        <img src={sepratorImage} alt="Separator" />
                                    </div>
                                    <div className="submit_form">
                                        <button className="btn_transparent" onClick={cancelProfileEdit}>Cancle</button>
                                        <button className="btn_gray" onClick={cancelProfileEdit}>Save Change</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            }
            
            <LoginPopup
                open={isLoginPopupOpen}
                handleClose={() => setIsLoginPopupOpen(false)}
            />
            <SignUpPopup
                open={isSignUpPopupOpen}
                handleClose={() => setIsSignUpPopupOpen(false)}
            />
        </>
    )
}

export default UserProfile
