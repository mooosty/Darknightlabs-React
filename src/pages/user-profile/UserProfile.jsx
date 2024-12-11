import axios from "axios";
import "./userProfile.scss";
import { useFormik } from "formik";
import { toast } from "react-toastify";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { editUserProfileAPI, getUsersDetailsAPI, updatePasswordAPI } from "../../api-services/userApis";
import {
  closedEyeIcon,
  openEyeIcon,
  editIcon,
  sepratorImage,
  twitterIcon,
  discordIcon,
  telegramIcon,
  calendarBlankIcon,
  defaultImg,
} from "../../utils/constants/images";
import { Loader, LoginPopup, SignupPopup } from "../../components";
import ProjectInvolvment from "./project-manager-edit/ProjectInvolvment";
import ProjectsUser from "./project-manager/ProjectsUser";

const InputPassword = (props) => {
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  const toggleVisibility = () => {
    setIsPasswordVisible(!isPasswordVisible);
  };

  return (
    <div className="type_password">
      <input type={isPasswordVisible ? "text" : "password"} {...props} />
      <div onClick={toggleVisibility}>
        {!isPasswordVisible ? <img src={closedEyeIcon} alt=" " /> : <img src={openEyeIcon} alt=" " />}
      </div>
    </div>
  );
};

const UserProfile = () => {
  const dispatch = useDispatch();
  const userData = useSelector((state) => state.auth);
  const { userDetails } = useSelector((state) => state.user);

  const [active, setActive] = useState("INFORMATION");
  const [isEditMode, setIsEditMode] = useState(false);
  const [isLoginPopupOpen, setIsLoginPopupOpen] = useState(false);
  const [isSignUpPopupOpen, setIsSignUpPopupOpen] = useState(false);
  const [image, setImage] = useState("");
  const [isImageChange, setIsImageChange] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [userProjects, setUserProjects] = useState([]);
  const [addNewProject, setAddNewProject] = useState(false);


  useEffect(() => {
    const fetchProjects = async () => {
      setIsLoading(true);
      try {
        const response = await axios.get(`${import.meta.env.VITE_APP_BASE_URL}/userprojects/all/${userData.userId}`, {
          headers: {
            Authorization: `Bearer eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6IjZmNjg4Y2I0LTk3MmItNDZhNy1iZWMwLTJjOTEyNTVlYjUyMyJ9.eyJraWQiOiI2ZjY4OGNiNC05NzJiLTQ2YTctYmVjMC0yYzkxMjU1ZWI1MjMiLCJhdWQiOiJodHRwOi8vbG9jYWxob3N0OjUxNzMiLCJpc3MiOiJhcHAuZHluYW1pY2F1dGguY29tL2QxZmZjZWVhLTg5Y2UtNGM4Zi1iYTMyLTBiODAyZmFiODgyMiIsInN1YiI6IjM4NDM3NWQ1LTJiNjUtNDQzMC1iZTQ4LWYwYzE4N2Q0YTg5ZiIsInNpZCI6Ijk2YWJhMGJiLTU3YWYtNGU4YS1hOTkyLTc0ZTYzNmNhZGU4YSIsImVtYWlsIjoic2Ftc2F3bG8xMDBAZ21haWwuY29tIiwiZW52aXJvbm1lbnRfaWQiOiJkMWZmY2VlYS04OWNlLTRjOGYtYmEzMi0wYjgwMmZhYjg4MjIiLCJsaXN0cyI6W10sIm1pc3NpbmdfZmllbGRzIjpbXSwidmVyaWZpZWRfY3JlZGVudGlhbHMiOlt7ImFkZHJlc3MiOiIweEM5QTZjZjZjZTc4RUI0OTkxQjFkMUFBNTgwOTJjNjBiNUVkNkZEQTgiLCJjaGFpbiI6ImVpcDE1NSIsImlkIjoiYzY0NjFlZjAtNmMxZC00ZjdhLWI4NDUtODEzMTg5NDIzYTU5IiwibmFtZV9zZXJ2aWNlIjp7fSwicHVibGljX2lkZW50aWZpZXIiOiIweEM5QTZjZjZjZTc4RUI0OTkxQjFkMUFBNTgwOTJjNjBiNUVkNkZEQTgiLCJ3YWxsZXRfbmFtZSI6InR1cm5rZXloZCIsIndhbGxldF9wcm92aWRlciI6ImVtYmVkZGVkV2FsbGV0Iiwid2FsbGV0X3Byb3BlcnRpZXMiOnsidHVybmtleVN1Yk9yZ2FuaXphdGlvbklkIjoiMmI1M2RmODktNWM0My00MzNmLTg2Y2MtZGJmZDg5ZTEyNDNiIiwidHVybmtleUhEV2FsbGV0SWQiOiJkMmVlOWMwZC0wNTkwLTVmMmEtYjMwMi1kODFiYjZjMTA4NzMiLCJpc0F1dGhlbnRpY2F0b3JBdHRhY2hlZCI6ZmFsc2UsInR1cm5rZXlVc2VySWQiOiI0Zjk2MjE3My0wMzAwLTRiODAtODBhOC05MzRiMmM5NTRiN2MiLCJpc1Nlc3Npb25LZXlDb21wYXRpYmxlIjpmYWxzZSwidmVyc2lvbiI6IlYxIn0sImZvcm1hdCI6ImJsb2NrY2hhaW4iLCJsYXN0U2VsZWN0ZWRBdCI6IjIwMjQtMTItMDZUMTU6MTI6MjguOTUzWiIsInNpZ25JbkVuYWJsZWQiOmZhbHNlfSx7ImVtYWlsIjoic2Ftc2F3bG8xMDBAZ21haWwuY29tIiwiaWQiOiJmNDU3NzJkNy0yM2FmLTQ3ZmQtYmQ1YS1lZjJjMGRmNzcxNmQiLCJwdWJsaWNfaWRlbnRpZmllciI6InNhbXNhd2xvMTAwQGdtYWlsLmNvbSIsImZvcm1hdCI6ImVtYWlsIiwic2lnbkluRW5hYmxlZCI6dHJ1ZX0seyJpZCI6IjZlZGM1NmM5LTQwN2QtNDlmYi04NGQ4LTZmMmI4ZTI5NDQxZSIsInB1YmxpY19pZGVudGlmaWVyIjoiTGFoY2VuIiwiZm9ybWF0Ijoib2F1dGgiLCJvYXV0aF9wcm92aWRlciI6InR3aXR0ZXIiLCJvYXV0aF91c2VybmFtZSI6ImxhaGNlbnJhaGxhb3VpIiwib2F1dGhfZGlzcGxheV9uYW1lIjoiTGFoY2VuIiwib2F1dGhfYWNjb3VudF9pZCI6IjEyMTQzMjk3NjIzNzE1NTk0MjQiLCJvYXV0aF9hY2NvdW50X3Bob3RvcyI6WyJodHRwczovL3Bicy50d2ltZy5jb20vcHJvZmlsZV9pbWFnZXMvMTQ2MDMwMjE5OTQ5MDI5Mzc2Ni8yeDhTYUE4Tl9ub3JtYWwuanBnIl0sIm9hdXRoX2VtYWlscyI6W10sIm9hdXRoX21ldGFkYXRhIjp7ImlkIjoiMTIxNDMyOTc2MjM3MTU1OTQyNCIsIm5hbWUiOiJMYWhjZW4iLCJwdWJsaWNfbWV0cmljcyI6eyJmb2xsb3dlcnNfY291bnQiOjIsImZvbGxvd2luZ19jb3VudCI6MTUsInR3ZWV0X2NvdW50IjowLCJsaXN0ZWRfY291bnQiOjAsImxpa2VfY291bnQiOjIsIm1lZGlhX2NvdW50IjowfSwicHJvZmlsZV9pbWFnZV91cmwiOiJodHRwczovL3Bicy50d2ltZy5jb20vcHJvZmlsZV9pbWFnZXMvMTQ2MDMwMjE5OTQ5MDI5Mzc2Ni8yeDhTYUE4Tl9ub3JtYWwuanBnIiwiZGVzY3JpcHRpb24iOiIiLCJ1c2VybmFtZSI6ImxhaGNlbnJhaGxhb3VpIn0sInNpZ25JbkVuYWJsZWQiOnRydWV9XSwibGFzdF92ZXJpZmllZF9jcmVkZW50aWFsX2lkIjoiNmVkYzU2YzktNDA3ZC00OWZiLTg0ZDgtNmYyYjhlMjk0NDFlIiwiZmlyc3RfdmlzaXQiOiIyMDI0LTEyLTA1VDE1OjAzOjExLjAxOFoiLCJsYXN0X3Zpc2l0IjoiMjAyNC0xMi0wNlQxNToxMjoyOC41NzNaIiwibmV3X3VzZXIiOmZhbHNlLCJtZXRhZGF0YSI6e30sInZlcmlmaWVkQ3JlZGVudGlhbHNIYXNoZXMiOnsiYmxvY2tjaGFpbiI6ImQ0NzQxYmJjMjA3OWVlOTI4M2EzNmExMGI4ODg3ODdlIiwiZW1haWwiOiI0MzVjY2FiZTEzNmFlNTk3NWNhYTE3ZWVlM2NlNTI0NCIsIm9hdXRoIjoiNjliOWMwYjliMmRmMDk1NWU3NjMwNmM0YTQ0NjNiNjIifSwiaWF0IjoxNzMzNDk3OTQ5LCJleHAiOjE3MzYwODk5NDl9.KoZZuNpDFD8nuGvtz--5qbuUQuXpqHxG5Vfnph-piOZb62eR7DvbP_pJAq48FU4WonGSix75CNeuwzbJhuu2pv3ihgCoPFb77mSRWFBUrgQIBnbYCx_wcVQk-I20_gugsR-pVoGbhpA4EMweOeJ3rSWmQ9TtFJhkCIHgVj6hYr4wVzxDq0pbWYgN-nIS6hGF6l4rMQvq_5aQY9ySLGNstvo9spW6H52R9UuzMSv2V54DX_0RixZr-yMSJhZivUUU8f53DW5iGktZJH5KsN5egzmHR5Yp3JUMy2NAc2cRPHXOAUZ1SjKKqOUsyBFRO1H-w1KjJU1NoH-egFlv7xU9DPtv8i_Ls9SyokRS7WOsgLI64ah29dSDcIJf5k0C1Ovh12qpQynE0JM8J7ZzgkW0-sBTDlcL9wZKzXMI58t0fHUG9-mcjoBtfecakWKwe2xfoXs_3cn3lhyKHQD0I0bxDiz6v_YpCC84i7Xk3N3Fn1_8SOzg3HKFbyTfUtlKZPpWdlK_RltQdDTjivBpz6v-irNZChvAljrczwiw8fln62mB49VAuT2XBI_sLVAalr1CdJCFnVg3TEe53Q-hznT9pxdUF_9QP1b6aTs0X2N60B4Tk3TOfFGgt0Njn6usbkR63fh676v5fFL5y3aibP8JSNDlYRCdowmjAz8oVoMGblc`,
          },
        });

        console.log("response.data");
        console.log(response);
        setUserProjects(response.data.data ?? []);
      } catch (error) {
        console.log(error.message);
      } finally {
        setIsLoading(false);
      }
    };
    fetchProjects();
  }, [dispatch]);


  /********************* */
  const handleActive = (key) => {
    setActive(key);
  };
  const handleEditProfile = () => {
    setIsEditMode(true);
    setValues({
      ...userDetails,
    });
  };

  const cancelProfileEdit = () => {
    setIsEditMode(false);
  };

  const initialValues = {
    id: 9,
    firstname: "",
    lastname: "",
    birthday: "",
    username: "",
    bio: "",
    email: "",
    profile_picture: "",
  };

  const formik = useFormik({
    initialValues: initialValues,
    onSubmit: async (values) => {
      handleUpdateDetails(values);
    },
  });
  const { values, setFieldValue, setValues, handleChange, handleSubmit } = formik;

  const passwordFormik = useFormik({
    initialValues: {
      oldPassword: "",
      newPassword: "",
      confirmPassword: "",
    },
  });

  const handleUploadImage = (file) => {
    let reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = function () {
      const img = new Image();
      img.onload = function () {
        let base64Url = reader.result;
        setFieldValue("profile_picture", base64Url);
        setImage(file);
        setIsImageChange(true);
      };
      img.src = reader.result;
    };
    reader.onerror = function (error) {
      console.error("Error: ", error);
    };
  };

  const handleUpdateDetails = async (values) => {
    setIsLoading(true);
    let updated_profile_picture = values?.profile_picture;
    if (isImageChange) {
      const formData = new FormData();
      formData.append("file", image);
      const response = await axios.post(`${import.meta.env.VITE_IMAGE_UPLOAD_BASE_URL}/`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      updated_profile_picture = response?.data.image_url;
    }

    const profilePromises = [];

    const profileDataPromise = dispatch(
      editUserProfileAPI({ userData: { ...values, profile_picture: updated_profile_picture }, id: userData?.userId })
    );
    profilePromises.push(profileDataPromise);

    if (
      passwordFormik.values.oldPassword &&
      passwordFormik.values.newPassword &&
      passwordFormik.values.confirmPassword
    ) {
      if (passwordFormik.values.newPassword !== passwordFormik.values.confirmPassword) {
        toast.error("New password and confirm password does not match");
      }

      if (passwordFormik.values.oldPassword === passwordFormik.values.newPassword) {
        toast.error("Old password and new password cannot be same");
      }

      const passwordChangeData = {
        userId: userData?.userId,
        oldPassword: passwordFormik.values.oldPassword,
        newPassword: passwordFormik.values.newPassword,
      };
      const passwordDataPromise = dispatch(updatePasswordAPI(passwordChangeData));
      profilePromises.push(passwordDataPromise);
    }

    Promise.allSettled(profilePromises)
      .then((response) => {
        const isSuccess = response.every((res) => res.status === "fulfilled" && res.value?.payload?.success);
        if (isSuccess) {
          toast.success("Profile Updated Successfully");
          cancelProfileEdit();
          setImage("");
          setIsImageChange(false);
          dispatch(getUsersDetailsAPI(userData?.userId));
        } else {
          toast.error("Profile Not Updated");
        }
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  useEffect(() => {
    dispatch(getUsersDetailsAPI(userData?.userId));
  }, [userData?.userId]);

  return (
    <>
      {active === "INFORMATION" ? (
        !isEditMode ? (
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
                  <div
                    className={`buttons ${active === "INFORMATION" ? "active" : ""}`}
                    onClick={() => handleActive("INFORMATION")}
                  >
                    PERSONAL INFORMATION
                  </div>
                  <div
                    className={`buttons ${active === "INVOLVEMENT" ? "active" : ""}`}
                    onClick={() => handleActive("INVOLVEMENT")}
                  >
                    PROJECT INVOLVEMENT
                  </div>
                </div>
                <div className="profile_page_header">
                  <div className="pagination">
                    <span>Profile</span>
                  </div>
                  <button className="btn_gray" onClick={handleEditProfile}>
                    <img src={editIcon} alt="" />
                    Edit profile
                  </button>
                </div>
                <div className="profile_page_content">
                  <div className="project_profile">
                    <div className="profile_upload_profile">
                      <img
                        src={userData?.profile_picture}
                      // src={userDetails?.profile_picture === '' || userData?.profile_picture || !userDetails?.profile_picture ? defaultImg : userDetails?.profile_picture}
                      // alt=""
                      // onError={(e) => e.target.src = defaultImg}
                      />
                    </div>
                  </div>
                  <div className="profile_description_data">
                    <div className="form_box">
                      <h3 className="profile_title">Personal information</h3>
                      <div className="form_group_data">
                        <div className="profile_info">
                          <div className="profile_head">First Name</div>
                          <div className="profile_data">{userDetails?.name || userData?.name || "-"}</div>
                        </div>
                        <div className="profile_info">
                          <div className="profile_head">Last Name</div>
                          <div className="profile_data">{userDetails?.lastname || "-"}</div>
                        </div>
                        <div className="profile_info">
                          <div className="profile_head">Date of birth</div>
                          <div className="profile_data">{userDetails?.birthday || "-"}</div>
                        </div>
                        <div className="profile_info">
                          <div className="profile_head">User Name</div>
                          <div className="profile_data">
                            {userDetails?.username ||
                              userData?.authDetails?.user?.verifiedCredentials[2].oauthUsername ||
                              "-"}
                          </div>
                        </div>
                      </div>
                      <div className="profile_bio_data">
                        <div className="profile_bio_head">Personal Bio</div>
                        <div className="profile_bio_data">
                          {userDetails?.bio || userData?.authDetails?.user?.verifiedCredentials[2].description || "-"}
                        </div>
                      </div>
                    </div>

                    <div className="profile_seprator_image">
                      <img src={sepratorImage} alt="Separator" />
                    </div>
                    <div className="form_box">
                      <h3 className="profile_title">Contact information</h3>
                      <div className="contact_info_data">
                        <div className="mail">
                          <div className="mail_head">Email</div>
                          <div className="mail_data">{userDetails?.email || userData?.email || "-"}</div>
                          <div className="mail_desc">
                            You can reach out for communication via email. Feel free to contact me anytime.
                          </div>
                        </div>
                        <div className="social_media_wrp">
                          <div className="social_media">
                            <h2 className="social_media_title">Connected accounts</h2>
                            <button className="btn_gray">
                              <img src={twitterIcon} alt="" />
                              Conect with Twitter
                            </button>
                            <button className="btn_gray">
                              <img src={discordIcon} alt="" />
                              Conect with Discord
                            </button>
                            <button className="btn_gray">
                              <img src={telegramIcon} alt="" />
                              Conect with Telegram
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="profile_seprator_image ">
                      <img src={sepratorImage} alt="Separator" />
                    </div>

                    {/* <div className="form_box">
                                        <h3 className="profile_title">Password</h3>
                                        <div className="password_info_data">
                                            <div className='password_head'>Current password</div>
                                            <div className='password_data'>************</div>
                                            <div className='password_desc'>Last updated at 12/12/23 118:04</div>
                                        </div>
                                    </div> */}
                  </div>
                </div>
              </div>
            </div>
          </>
        ) : (
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
                      src={
                        values.profile_picture === "" || !values.profile_picture ? defaultImg : values.profile_picture
                      }
                      alt=""
                      onError={(e) => (e.target.src = defaultImg)}
                    />
                  </div>
                  <div className="profile_upload_button">
                    <button
                      className="change_photo"
                      onClick={() => {
                        let input = document.createElement("input");
                        input.type = "file";
                        input.multiple = false;
                        input.accept = ".jpg, .png, .svg, .jpeg";
                        input.onchange = () => {
                          let files = Array.from(input.files);
                          handleUploadImage(files[0]);
                        };
                        input.click();
                      }}
                    >
                      {" "}
                      Change Photo
                    </button>
                  </div>
                </div>
                <div className="profile_description_form">
                  <div className="form_box">
                    <h3 className="profile_title">Personal information</h3>
                    <div className="form_group">
                      <div className="form_group_row">
                        <div className="profile_info">
                          <label>First Name</label>
                          <input
                            type="text"
                            name="firstname"
                            value={values.firstname}
                            onChange={handleChange}
                            placeholder="First Name"
                          />
                        </div>
                        <div className="profile_info">
                          <label>Last Name</label>
                          <input
                            type="text"
                            name="lastname"
                            value={values.lastname}
                            onChange={handleChange}
                            placeholder="Last Name"
                          />
                        </div>
                      </div>
                      <div className="form_group_row">
                        <div className="profile_info">
                          <label>Date of birth</label>
                          <div className="type_calendar">
                            <input
                              id="dateOfBirth"
                              name="birthday"
                              type="date"
                              value={values.birthday}
                              onChange={(e) => {
                                setFieldValue("birthday", e.target.value);
                              }}
                              placeholder="DD/MM/YYYY"
                            />
                            <label htmlFor="dateOfBirth">
                              <span>{values.birthday}</span>
                              <img src={calendarBlankIcon} alt=".." />
                            </label>
                          </div>
                        </div>
                        <div className="profile_info">
                          <label>User Name</label>
                          <input
                            type="text"
                            name="username"
                            value={values?.username}
                            onChange={handleChange}
                            placeholder="Username"
                          />
                        </div>
                      </div>
                    </div>
                    <div className="profile_bio">
                      <label> Bio</label>
                      <textarea
                        className="textArea"
                        name="bio"
                        placeholder="Lorem ipsum"
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
                        <div className="profile_head">Email</div>
                        <input
                          name="email"
                          type="text"
                          placeholder="Email"
                          value={values.email}
                          onChange={handleChange}
                        />
                        <div className="profile_desc">
                          Lorem, ipsum dolor sit amet consectetur adipisicing elit. Magnam eos enim tenetur excepturi
                          culpa neque modi quisquam, sunt magni
                        </div>
                      </div>
                      <div className="social_media_wrp">
                        <div className="social_media">
                          <h2 className="social_media_title">Connected accounts</h2>
                          <button className="btn_gray">
                            <img src={twitterIcon} alt="" />
                            Conect with Twitter
                          </button>
                          <button className="btn_gray">
                            <img src={discordIcon} alt="" />
                            Conect with Discord
                          </button>
                          <button className="btn_gray">
                            <img src={telegramIcon} alt="" />
                            Conect with Telegram
                          </button>
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
                        <div className="password_input">
                          <label>Old Password</label>
                          <InputPassword
                            name="oldPassword"
                            placeholder="Password"
                            value={passwordFormik.values.oldPassword}
                            onChange={passwordFormik.handleChange}
                          />
                        </div>
                        <div className="password_input"></div>
                      </div>
                    </div>

                    <div className="contact_info password_info">
                      <div className="password">
                        <div className="password_input">
                          <label>New Password</label>
                          <InputPassword
                            name="newPassword"
                            placeholder="Password"
                            value={passwordFormik.values.newPassword}
                            onChange={passwordFormik.handleChange}
                          />
                        </div>
                        <div className="password_input">
                          <label>Confirm Password</label>
                          <InputPassword
                            name="confirmPassword"
                            placeholder="Confirm password"
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
                      <button className="btn_transparent" onClick={cancelProfileEdit}>
                        Cancle
                      </button>
                      <button className="btn_gray" type="submit" onClick={handleSubmit}>
                        {isLoading ? (
                          <>
                            {" "}
                            <Loader loading={isLoading} isItForButton={true} /> <p>Save Change</p>
                          </>
                        ) : (
                          "Save Change"
                        )}
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )
      ) : addNewProject ? (
        <ProjectInvolvment setAddNewProject={setAddNewProject} />
      ) : (
        <ProjectsUser
          userProjects={userProjects}
          setAddNewProject={setAddNewProject}
          handleActive={handleActive}
          active={active}
        />
      )}
      <LoginPopup open={isLoginPopupOpen} handleClose={() => setIsLoginPopupOpen(false)} />
      <SignupPopup open={isSignUpPopupOpen} handleClose={() => setIsSignUpPopupOpen(false)} />
    </>
  );
};

export default UserProfile;
