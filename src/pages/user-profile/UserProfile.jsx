import { useEffect, useState } from 'react';
import "./userProfile.scss";
import SignUpPopup from '../../components/popup/sign-up-popup/SignupPopup';
import LoginPopup from '../../components/popup/login-popup/LoginPopup';
import { closedEyeIcon, openEyeIcon, editIcon, sepratorImage, twitterIcon, discordIcon, telegramIcon, calendarBlankIcon } from '../../utils/constants/images';
import { useDispatch, useSelector } from 'react-redux';
import { editUserProfileAPI, getUsersDetailsAPI, updatePasswordAPI } from '../../api-services/userApis';
import { useFormik } from 'formik';
import axios from 'axios';
import Loader from '../../components/loader/Loader';
import defaultImage from '../../assets/fallback-image.png'
import { toast } from 'react-toastify';

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
    const dispatch = useDispatch()
    const userData = useSelector((state) => state.auth)
    const { userDetails } = useSelector((state) => state.user)
    const [active, setActive] = useState('INFORMATION');
    const [isEditMode, setIsEditMode] = useState(false);
    const [isLoginPopupOpen, setIsLoginPopupOpen] = useState(false);
    const [isSignUpPopupOpen, setIsSignUpPopupOpen] = useState(false);
    const [image, setImage] = useState('')
    const [isImageChange, setIsImageChange] = useState(false)
    const [isLoading, setIsLoading] = useState(false)

    const handleActive = (key) => {
        setActive(key);
    }
    const handleEditProfile = () => {
        setIsEditMode(true)
        setValues({
            ...userDetails
        })
    }

    const cancelProfileEdit = () => {
        setIsEditMode(false)
    }

    const initialValues = {
        id: 9,
        firstname: '',
        lastname: '',
        birthday: '',
        username: '',
        bio: '',
        email: '',
        profile_picture: ''
    }

    const formik = useFormik({
        initialValues: initialValues,
        onSubmit: async (values) => {
            handleUpdateDetails(values)
        }
    })
    const { values, setFieldValue, setValues, handleChange, handleSubmit } = formik

    const passwordFormik = useFormik({
        initialValues: {
            oldPassword: '',
            newPassword: '',
            confirmPassword: ''
        }
    })

    const handleUploadImage = (file) => {
        let reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = function () {
            const img = new Image();
            img.onload = function () {
                let base64Url = reader.result;
                setFieldValue('profile_picture', base64Url)
                setImage(file)
                setIsImageChange(true)
            }
            img.src = reader.result;
        };
        reader.onerror = function (error) {
            console.error('Error: ', error);
        };
    }

    const handleUpdateDetails = async (values) => {
        setIsLoading(true)
        let updated_profile_picture = values?.profile_picture
        if (isImageChange) {
            const formData = new FormData();
            formData.append('file', image);
            const response = await axios.post(`${import.meta.env.VITE_IMAGE_UPLOAD_BASE_URL}/`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });
            updated_profile_picture = response?.data.image_url
        }

        const profilePromises = []

        const profileDataPromise = dispatch(editUserProfileAPI({ userData: { ...values, profile_picture: updated_profile_picture }, id: userData?.userId }))
        profilePromises.push(profileDataPromise)

        if (passwordFormik.values.oldPassword && passwordFormik.values.newPassword && passwordFormik.values.confirmPassword) {

            if (passwordFormik.values.newPassword !== passwordFormik.values.confirmPassword) {
                toast.error('New password and confirm password does not match')
            }

            if (passwordFormik.values.oldPassword === passwordFormik.values.newPassword) {
                toast.error('Old password and new password cannot be same')
            }

            const passwordChangeData = {
                "userId": userData?.userId,
                "oldPassword": passwordFormik.values.oldPassword,
                "newPassword": passwordFormik.values.newPassword
            }
            const passwordDataPromise = dispatch(updatePasswordAPI(passwordChangeData))
            profilePromises.push(passwordDataPromise)
        }


        Promise.allSettled(profilePromises).then((response) => {
            const isSuccess = response.every((res) => res.status === 'fulfilled' && res.value?.payload?.success)
            if (isSuccess) {
                toast.success('Profile Updated Successfully')
                cancelProfileEdit()
                setImage('')
                setIsImageChange(false)
                dispatch(getUsersDetailsAPI(userData?.userId))
            }
            else {
                toast.error('Profile Not Updated')
            }
        }).finally(() => {
            setIsLoading(false)
        })
    }

    useEffect(() => {
        dispatch(getUsersDetailsAPI(userData?.userId))
    }, [userData?.userId])


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
                                        <img
                                            src={userDetails?.profile_picture === '' || !userDetails?.profile_picture ? defaultImage : userDetails?.profile_picture}
                                            alt=""
                                            onError={(e) => e.target.src = defaultImage}
                                        />
                                    </div>
                                </div>
                                <div className="profile_description_data">
                                    <div className="form_box">
                                        <h3 className="profile_title">Personal information</h3>
                                        <div className="form_group_data">
                                            <div className="profile_info">
                                                <div className='profile_head'>First Name</div>
                                                <div className='profile_data'>{userDetails?.firstname || '-'}</div>
                                            </div>
                                            <div className="profile_info">
                                                <div className='profile_head'>Last Name</div>
                                                <div className='profile_data'>{userDetails?.lastname || '-'}</div>
                                            </div>
                                            <div className="profile_info">
                                                <div className='profile_head'>Date of birth</div>
                                                <div className='profile_data'>{userDetails?.birthday || '-'}</div>
                                            </div>
                                            <div className="profile_info">
                                                <div className='profile_head'>User Name</div>
                                                <div className='profile_data'>{userDetails?.username || '-'}</div>
                                            </div>
                                        </div>
                                        <div className="profile_bio_data">
                                            <div className='profile_bio_head'>Personal Bio</div>
                                            <div className='profile_bio_data'>{userDetails?.bio || '-'}</div>
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
                                                <div className='mail_data'>{userDetails?.email || '-'}</div>
                                                <div className='mail_desc'>You can reach out for communication via email. Feel free to contact me anytime.</div>
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
                                    <img
                                        src={values.profile_picture === '' || !values.profile_picture ? defaultImage : values.profile_picture}
                                        alt=""
                                        onError={(e) => e.target.src = defaultImage}
                                    />
                                </div>
                                <div className='profile_upload_button'>
                                    <button className="change_photo" onClick={() => {
                                        let input = document.createElement('input');
                                        input.type = 'file';
                                        input.multiple = false
                                        input.accept = '.jpg, .png, .svg, .jpeg';
                                        input.onchange = () => {
                                            let files = Array.from(input.files);
                                            handleUploadImage(files[0]);
                                        }
                                        input.click()
                                    }} > Change Photo</button>
                                </div>
                            </div>
                            <div className="profile_description_form">
                                <div className="form_box">
                                    <h3 className="profile_title">Personal information</h3>
                                    <div className="form_group">
                                        <div className='form_group_row'>
                                            <div className="profile_info">
                                                <label>First Name</label>
                                                <input type="text" name='firstname' value={values.firstname} onChange={handleChange} placeholder='First Name' />
                                            </div>
                                            <div className="profile_info">
                                                <label>Last Name</label>
                                                <input type="text" name='lastname' value={values.lastname} onChange={handleChange} placeholder='Last Name' />
                                            </div>
                                        </div>
                                        <div className='form_group_row'>
                                            <div className="profile_info">
                                                <label>Date of birth</label>
                                                <div className="type_calendar">
                                                    <input id='dateOfBirth' name='birthday' type="date" value={values.birthday} onChange={(e) => {
                                                        setFieldValue('birthday', e.target.value)
                                                    }} placeholder='DD/MM/YYYY' />
                                                    <label htmlFor='dateOfBirth'>
                                                        <span>{values.birthday}</span>
                                                        <img src={calendarBlankIcon} alt=".." />
                                                    </label>
                                                </div>
                                            </div>
                                            <div className="profile_info">
                                                <label>User Name</label>
                                                <input type="text" name='username' value={values?.username} onChange={handleChange} placeholder='Username' />
                                            </div>
                                        </div>
                                    </div>
                                    <div className="profile_bio">
                                        <label> Bio</label>
                                        <textarea className='textArea' name='bio' placeholder='Lorem ipsum'
                                            value={values?.bio}
                                            onChange={handleChange}
                                        />
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
                                            <input name='email' type="text" placeholder='Email' value={values.email} onChange={handleChange} />
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
                                    <div className="contact_info password_info">
                                        <div className="password">
                                            <div className="password_input" >
                                                <label>Old Password</label>
                                                <InputPassword
                                                    name='oldPassword'
                                                    placeholder='Password'
                                                    value={passwordFormik.values.oldPassword}
                                                    onChange={passwordFormik.handleChange}
                                                />
                                            </div>
                                            <div className="password_input" ></div>
                                        </div>
                                    </div>

                                    <div className="contact_info password_info">
                                        <div className="password">
                                            <div className="password_input" >
                                                <label>New Password</label>
                                                <InputPassword
                                                    name='newPassword'
                                                    placeholder='Password'
                                                    value={passwordFormik.values.newPassword}
                                                    onChange={passwordFormik.handleChange}
                                                />
                                            </div>
                                            <div className="password_input" >
                                                <label>Confirm Password</label>
                                                <InputPassword
                                                    name='confirmPassword'
                                                    placeholder='Confirm password'
                                                    value={passwordFormik.values.confirmPassword}
                                                    onChange={passwordFormik.handleChange}
                                                />
                                            </div>
                                        </div>
                                    </div>
                                    <div className="profile_seprator_image">
                                        <img src={sepratorImage} alt="Separator" />
                                    </div>
                                    <div className="submit_form">
                                        <button className="btn_transparent" onClick={cancelProfileEdit}>Cancle</button>
                                        <button className="btn_gray" type='submit' onClick={handleSubmit}>
                                            {isLoading ? <> <Loader loading={isLoading} isItForButton={true} />  <p>Save Change</p></> : 'Save Change'}
                                        </button>
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
