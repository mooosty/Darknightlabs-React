import axios from "axios";
import { axiosApi } from "../../api-services/service";
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
  ThreeDots,
} from "../../utils/constants/images";
import { Loader, CustomDropdown } from "../../components";
import ProjectInvolvment from "./project-manager-edit/ProjectInvolvment";
import ProjectsUser from "./project-manager/ProjectsUser";
import Ambassadors from "./Ambassadors/Ambassadors";
import CryptoJS from 'crypto-js';


const copyIcon = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='24' height='24' viewBox='0 0 24 24' fill='none' stroke='%23f5efdb' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3E%3Crect x='9' y='9' width='13' height='13' rx='2' ry='2'%3E%3C/rect%3E%3Cpath d='M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1'%3E%3C/path%3E%3C/svg%3E";

const TelegramVerifyPopup = ({ isOpen, onClose, verificationCode }) => {
  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text);
    toast.success('Copied to clipboard!');
  };

  if (!isOpen) return null;

  return (
    <div className="popup-overlay">
      <div className="popup-content">
        <h3>Verify Your Telegram Account</h3>
        <p>Add <span 
          className="telegram-bot-name" 
          onClick={() => copyToClipboard('@WinWinCyborg')}
          style={{ 
            cursor: 'pointer', 
            color: '#229ED9',
            textDecoration: 'underline'
          }}
        >@WinWinCyborg</span> and type <span
          onClick={() => copyToClipboard('/verify')}
          style={{
            cursor: 'pointer',
            color: '#f5efdb',
            fontWeight: 'bold',
            textDecoration: 'underline'
          }}
        >/verify</span> then send this code to verify your account:</p>
        <div className="verification-code">
          <code>{verificationCode}</code>
          <button onClick={() => copyToClipboard(verificationCode)} className="copy-button" title="Copy to clipboard">
            <img src={copyIcon} alt="Copy" />
          </button>
        </div>
        <button onClick={onClose} className="close-button">Close</button>
      </div>
    </div>
  );
};

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

const TelegramAuthButton = ({ onSuccess }) => {
  const [status, setStatus] = useState("");
  const [showButton, setShowButton] = useState(false);
  const userData = useSelector((state) => state.auth);
  const { authDetails } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  const telegramCred = authDetails?.user?.verifiedCredentials?.find(
    (cred) => cred.format === "oauth" && cred.oauth_provider === "telegram"
  );

  // Function to check status that can be shared between components
  const checkTelegramStatus = async () => {
    try {
      const response = await axiosApi.get(`/telegram/check/${userData.userId}`);
      const { db, sheet } = response.data;

      // Show button if either (sheet=1 and db=0) OR (sheet=0 and db=0)
      setShowButton((sheet === 1 && db === 0) || (sheet === 0 && db === 0));

      // Dispatch an event to notify TwitterAuthButton
      if (sheet === 1 && db === 1) {
        window.dispatchEvent(
          new CustomEvent("telegramStatusUpdated", {
            detail: { sheet, db },
          })
        );
      }
    } catch (error) {
      console.error("Failed to check Telegram status:", error);
      setShowButton(false);
    }
  };

  useEffect(() => {
    checkTelegramStatus();
  }, [userData.userId]);

  useEffect(() => {
    if (!showButton) return;

    const script = document.createElement("script");
    script.src = "https://telegram.org/js/telegram-widget.js?22";
    script.setAttribute("data-telegram-login", "TheWinWinSocietyBot");
    script.setAttribute("data-size", "medium");
    script.setAttribute("data-onauth", "onTelegramAuth(user)");
    script.setAttribute("data-request-access", "write");
    script.async = true;

    const container = document.getElementById("telegram-login-button");
    if (container) {
      container.innerHTML = "";
      container.appendChild(script);
    }

    window.onTelegramAuth = async (telegramUser) => {
      try {
        const response = await axiosApi.post("/telegram/auth", {
          ...telegramUser,
          userId: userData.userId,
        });

        if (response.data.success) {
          toast.success("Successfully connected to Telegram!");
          setShowButton(false);
          await checkTelegramStatus();
          if (onSuccess) {
            await onSuccess();
          }
        }
      } catch (error) {
        console.error("Failed to connect:", error);
        toast.error(error.response?.data?.error || "Failed to connect to Telegram");
      }
    };

    return () => {
      delete window.onTelegramAuth;
    };
  }, [userData.userId, showButton, onSuccess]);

  if (!showButton) return null;

  return (
    <div className="profile_upload_button">
      <button
        className="change_photo dark-theme"
        style={{
          background: "#000000",
          border: "none",
          fontFamily: "Inter, sans-serif",
          fontSize: "14px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          gap: "8px",
          padding: "10px 20px",
          width: "100%",
          position: "relative",
        }}
        disabled={telegramCred}
      >
        <img src={telegramIcon} alt="Telegram" style={{ width: "16px", height: "16px" }} />
        {telegramCred ? "Connected to Telegram" : "Connect Telegram"}
        <div
          id="telegram-login-button"
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            opacity: 0,
            cursor: "pointer",
          }}
        ></div>
      </button>
    </div>
  );
};

const TwitterAuthButton = () => {
  const [status, setStatus] = useState("");
  const [loading, setLoading] = useState(false);
  const [showButton, setShowButton] = useState(false);
  const { authDetails } = useSelector((state) => state.auth);
  const userData = useSelector((state) => state.auth);

  const twitterCred = authDetails?.user?.verifiedCredentials?.find(
    (cred) => cred.format === "oauth" && cred.oauth_provider === "twitter"
  );

  const checkTelegramStatus = async () => {
    try {
      const response = await axiosApi.get(`/telegram/check/${userData.userId}`);
      const { db, sheet } = response.data;

      // Only show Twitter button if both sheet=1 and db=1
      setShowButton(sheet === 1 && db === 1);
    } catch (error) {
      console.error("Failed to check Telegram status:", error);
      setShowButton(false);
    }
  };

  useEffect(() => {
    checkTelegramStatus();

    // Listen for updates from TelegramAuthButton
    const handleTelegramUpdate = (event) => {
      const { sheet, db } = event.detail;
      setShowButton(sheet === 1 && db === 1);
    };

    window.addEventListener("telegramStatusUpdated", handleTelegramUpdate);

    return () => {
      window.removeEventListener("telegramStatusUpdated", handleTelegramUpdate);
    };
  }, [userData.userId]);

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const twitterAuth = urlParams.get("twitter_auth");
    const message = urlParams.get("message");

    if (twitterAuth === "success") {
      setStatus("");
      window.history.replaceState({}, document.title, window.location.pathname);
    } else if (twitterAuth === "error") {
      setStatus(`Error: ${message || "Unknown error"}`);
      window.history.replaceState({}, document.title, window.location.pathname);
    }
  }, []);

  const handleTwitterAuth = async () => {
    try {
      setLoading(true);
      setStatus("");

      const returnUrl = window.location.href;
      const response = await axiosApi.get(`/twitter/login?returnUrl=${encodeURIComponent(returnUrl)}`);

      if (response.data.error) {
        throw new Error(response.data.error);
      }

      if (response.data.authUrl) {
        window.location.href = response.data.authUrl;
      } else {
        throw new Error("No auth URL received from server");
      }
    } catch (error) {
      console.error("Twitter auth error:", error);
      setStatus(error.message || "Failed to connect to Twitter");
      setLoading(false);
    }
  };

  if (!showButton) return null;

  return (
    <div className="profile_upload_button">
      <button
        onClick={handleTwitterAuth}
        disabled={loading || twitterCred}
        className="change_photo dark-theme"
        style={{
          background: "#000000",
          border: "none",
          fontFamily: "Inter, sans-serif",
          fontSize: "14px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          gap: "8px",
        }}
      >
        <img src={twitterIcon} alt="Twitter" style={{ width: "16px", height: "16px" }} />
        {loading ? "Connecting..." : twitterCred ? "Connected to Twitter" : "Connect Twitter"}
      </button>

      {status && <div className={`status-message ${status.includes("Error") ? "error" : "success"}`}>{status}</div>}
    </div>
  );
};

const DiscordAuthButton = () => {
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState("");
  const [hasDiscord, setHasDiscord] = useState(false);
  const [discordData, setDiscordData] = useState(null);
  const { authDetails } = useSelector((state) => state.auth);
  const userData = useSelector((state) => state.auth);

  const checkDiscordStatus = async () => {
    try {
      const response = await axiosApi.get(`/discord/has-discord/${userData?.userId}`);
      if (response.data.success === 1 && response.data.hasDiscord) {
        setHasDiscord(true);
        setDiscordData(response.data.data);
      } else {
        setHasDiscord(false);
        setDiscordData(null);
      }
    } catch (error) {
      console.error("Failed to check Discord status:", error);
      setHasDiscord(false);
      setDiscordData(null);
    }
  };

  useEffect(() => {
    if (userData?.userId) {
      checkDiscordStatus();
    }
  }, [userData?.userId]);

  const handleDiscordAuth = async () => {
    try {
      setLoading(true);
      setStatus("");

      const returnUrl = window.location.href;
      const response = await axiosApi.get(`/discord/auth?returnUrl=${encodeURIComponent(returnUrl)}`);

      if (response.data.error) {
        throw new Error(response.data.error);
      }

      if (response.data.authUrl) {
        window.location.href = response.data.authUrl;
      } else {
        throw new Error("No auth URL received from server");
      }
    } catch (error) {
      console.error("Discord auth error:", error);
      setStatus(error.message || "Failed to connect to Discord");
      setLoading(false);
      toast.error("Failed to connect to Discord");
    }
  };

  useEffect(() => {
    // Check for discord_data in URL params
    const urlParams = new URLSearchParams(window.location.search);
    const discordDataParam = urlParams.get("discord_data");

    if (discordDataParam) {
      try {
        // Decode the URL-encoded JSON string
        const decodedData = decodeURIComponent(discordDataParam);
        const discordData = JSON.parse(decodedData);

        if (discordData.success && discordData.user?.id) {
          // Update discord ID in backend
          axiosApi.post('/discord/update-discord-id', {
            id: userData?.userId,
            discord_id: discordData.user.id
          }).then(() => {
            setStatus("");
            checkDiscordStatus();
            toast.success("Successfully connected to Discord!");
          }).catch((error) => {
            console.error("Failed to update Discord ID:", error);
            toast.error("Failed to complete Discord connection");
          });
        }
      } catch (error) {
        console.error("Failed to parse Discord data:", error);
        toast.error("Failed to process Discord connection data");
      }
      
      // Clean up URL parameters
      window.history.replaceState({}, document.title, window.location.pathname);
    }
  }, [userData?.userId]);

  return (
    <button 
      className={`btn_gray save_button ${hasDiscord ? 'verified' : ''}`}
      onClick={handleDiscordAuth}
      disabled={loading || hasDiscord}
    >
      <img src={discordIcon} alt="" />
      {loading ? "Connecting..." : hasDiscord ? (
        <>
          Discord Connected
          <svg 
            className="checkmark" 
            width="16" 
            height="16" 
            viewBox="0 0 24 24" 
            fill="none" 
            xmlns="http://www.w3.org/2000/svg"
          >
            <path 
              d="M20 6L9 17L4 12" 
              stroke="#4CAF50" 
              strokeWidth="2" 
              strokeLinecap="round" 
              strokeLinejoin="round"
            />
          </svg>
        </>
      ) : "Connect Discord"}
      {status && <div className={`status-message ${status.includes("Error") ? "error" : "success"}`}>{status}</div>}
    </button>
  );
};

const UserProfile = () => {
  const dispatch = useDispatch();
  const userData = useSelector((state) => state.auth);
  const { userDetails } = useSelector((state) => state.user);
  const [active, setActive] = useState("INFORMATION");
  const [isEditMode, setIsEditMode] = useState(false);
  const [image, setImage] = useState("");
  const [isImageChange, setIsImageChange] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [userProjects, setUserProjects] = useState([]);
  const [addNewProject, setAddNewProject] = useState(false);
  const [telegramUsername, setTelegramUsername] = useState(null);
  const [isVerifyPopupOpen, setIsVerifyPopupOpen] = useState(false);
  const [verificationCode, setVerificationCode] = useState('');
  const [hasTelegram, setHasTelegram] = useState(false);
  const [telegramData, setTelegramData] = useState(null);

  const { authDetails } = useSelector((state) => state.auth);

  const defaultImage =  authDetails?.user?.verifiedCredentials[2]?.oauthAccountPhotos[0]?.replace("_normal", "") || defaultImg;

  // Add function to fetch Telegram username
  const fetchTelegramUsername = async () => {
    try {
      const response = await axiosApi.get(`/telegram/check/${userData.userId}`);
      const { username } = response.data;
      if (username) {
        setTelegramUsername(username);
        // Also update the formik values if in edit mode
        if (isEditMode) {
          setFieldValue("telegram_username", username);
        }
      }
    } catch (error) {
      console.error("Failed to fetch Telegram username:", error);
    }
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
    telegram_username: "",
    linkedin: "",
    roles: [],
    other: "",
    question1: "",
    question2: "",
    primary_city: "",
    secondary_city: "",
    investment_thesis: [],
    ticket_size: "",
    investment_stage: "",
    investment_description: "",
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

    if (isImageChange && image) {
      try {
        const formData = new FormData();
        formData.append("file", image);
        const response = await axios.post(`${import.meta.env.VITE_IMAGE_UPLOAD_BASE_URL}/`, formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        });
        updated_profile_picture = response?.data.image_url;
      } catch (error) {
        console.error("Error uploading image:", error);
        toast.error("Failed to upload profile picture");
        setIsLoading(false);
        return;
      }
    }

    const profilePromises = [];

    // Basic profile data
    const payload = {
      id: userData?.userId,
      userData: {
        firstname: values.firstname,
        lastname: values.lastname,
        birthday: values.birthday,
        username: values.username,
        bio: values.bio,
        email: values.email,
        profile_picture: updated_profile_picture || userDetails?.profile_picture,
        telegram_username: values.telegram_username || "",
        linkedin: values.linkedin || "",
        roles: values.roles.join(","),
        question1: values.question1 || "",
        question2: values.question2 || "",
        primary_city: values.primary_city || "",
        secondary_city: values.secondary_city || "",
        investment_thesis: JSON.stringify(values.investment_thesis || []),
        ticket_size: values.ticket_size || "",
        investment_stage: values.investment_stage || "",
        investment_description: values.investment_description || "",
      },
    };

    const profileDataPromise = dispatch(editUserProfileAPI(payload));
    profilePromises.push(profileDataPromise);

    // Handle password update if needed
    if (
      passwordFormik.values.oldPassword &&
      passwordFormik.values.newPassword &&
      passwordFormik.values.confirmPassword
    ) {
      if (passwordFormik.values.newPassword !== passwordFormik.values.confirmPassword) {
        toast.error("New password and confirm password do not match");
        setIsLoading(false);
        return;
      }

      if (passwordFormik.values.oldPassword === passwordFormik.values.newPassword) {
        toast.error("Old password and new password cannot be same");
        setIsLoading(false);
        return;
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

  const handleRoleChange = (role) => {
    let tmpRoles = values?.roles;

    tmpRoles = tmpRoles.map((r) => {
      switch (r) {
        case "A Founder":
          return "Founder";
        case "A C-level":
          return "C-level";
        case "A Web3 employee":
          return "Web3 employee";
        case "A KOL / Ambassador / Content Creator":
          return "KOL / Ambassador / Content Creator";
        case "An Angel Investor":
          return "Angel Investor";
        default:
          return r;
      }
    });

    if (role === "Other") {
      if (tmpRoles.includes(role)) {
        // If Other is already selected, just remove it
        tmpRoles = tmpRoles.filter((r) => r !== role);
      } else {
        // Add Other while keeping existing selections
        tmpRoles.push(role);
      }
    } else {
      if (tmpRoles.includes(role)) {
        tmpRoles = tmpRoles.filter((r) => r !== role);
      } else {
        tmpRoles.push(role);
      }
    }

    setFieldValue("roles", tmpRoles);

    // Clear the "other" text field if "Other" role is removed
    if (role === "Other" && !tmpRoles.includes("Other")) {
      setFieldValue("other", "");
    }
  };

  const handleQuestionChange = (question, value) => {
    setFieldValue(question, value);
  };

  const handleActive = (key) => {
    setActive(key);
  };

  const handleEditProfile = () => {
    setIsEditMode(true);
    setValues({
      ...initialValues,
      firstname: userDetails?.firstname || "",
      lastname: userDetails?.lastname || "",
      email: userDetails?.email || "",
      bio: userDetails?.bio || "",
      birthday: userDetails?.birthday || "",
      username: userDetails?.username || "",
      profile_picture: userDetails?.profile_picture || "",
      telegram_username: userDetails?.telegram_username || "",
      linkedin: userDetails?.linkedin || "",
      roles: userDetails?.roles?.split(",") || [],
      question1: userDetails?.question1 || "",
      question2: userDetails?.question2 || "",
      primary_city: userDetails?.primary_city || "",
      secondary_city: userDetails?.secondary_city || "",
      investment_thesis: userDetails?.investment_thesis || [],
      ticket_size: userDetails?.ticket_size || "",
      investment_stage: userDetails?.investment_stage || "",
      investment_description: userDetails?.investment_description || "",
    });
  };

  const cancelProfileEdit = () => {
    setIsEditMode(false);
  };

  const headerToggleButton = [
    {
      label: "PERSONAL INFORMATION",
      key: "INFORMATION",
      onClick: () => handleActive("INFORMATION"),
    },
    {
      label: " PROJECT INVOLVEMENT",
      key: "INVOLVEMENT",
      onClick: () => handleActive("INVOLVEMENT"),
    },
    {
      label: "AMBASSADORS",
      key: "AMBASSADORS",
      onClick: () => handleActive("AMBASSADORS"),
    },
  ];

  useEffect(() => {
    const fetchProjects = async () => {
      setIsLoading(true);
      try {
        const response = await axios.get(`${import.meta.env.VITE_APP_BASE_URL}/userprojects/all/${userData.userId}`, {
          headers: {
            Authorization: `Bearer ${authDetails?.token}`,
          },
        });

        setUserProjects(response.data.data ?? []);
      } catch (error) {
        console.error("error", error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchProjects();
  }, [dispatch]);

  useEffect(() => {
    if (userDetails) {
      const roles =
        userDetails.roles?.split(",").map((r) => {
          switch (r.trim()) {
            case "A Founder":
              return "Founder";
            case "A C-level":
              return "C-level";
            case "A Web3 employee":
              return "Web3 employee";
            case "A KOL / Ambassador / Content Creator":
              return "KOL / Ambassador / Content Creator";
            case "An Angel Investor":
              return "Angel Investor";
            default:
              return r.trim();
          }
        }) || [];

      setValues({
        ...initialValues,
        ...userDetails,
        roles: roles,
        telegram_username: telegramUsername || userDetails.telegram_username, // Use Telegram username if available
      });
    }
  }, [userDetails, telegramUsername]);

  const handleInvestmentThesisChange = (value) => {
    const currentThesis = values?.investment_thesis || [];
    let newThesis;

    if (currentThesis.includes(value)) {
      newThesis = currentThesis.filter((item) => item !== value);
    } else {
      newThesis = [...currentThesis, value];
    }

    setFieldValue("investment_thesis", newThesis);
  };

  const generateVerificationCode = () => {
    const timestamp = new Date().getTime();
    const dataToEncrypt = `${userData?.userId},${timestamp}`;
    const encrypted = CryptoJS.AES.encrypt(dataToEncrypt, import.meta.env.VITE_TELEGRAM_SECRET_KEY).toString();
    return encrypted;
  };

  const handleVerifyTelegram = () => {
    if (hasTelegram) return; // Don't do anything if already connected
    const code = generateVerificationCode();
    setVerificationCode(code);
    setIsVerifyPopupOpen(true);
  };

  // Modify TelegramAuthButton to accept onSuccess prop
  const handleTelegramSuccess = async () => {
    await fetchTelegramUsername();
    dispatch(getUsersDetailsAPI(userData?.userId));
  };

  useEffect(() => {
    if (userData?.userId) {
      dispatch(getUsersDetailsAPI(userData.userId));
    }
  }, [userData?.userId]);

  const getProfileImage = () => {
    if (isEditMode) {
      if (values.profile_picture) {
        return values.profile_picture;
      }
      if (userData?.profile_picture) {
        return userData.profile_picture.replace("_normal", "");
      }


       const defaultImage = authDetails?.user?.verifiedCredentials[2]?.oauthAccountPhotos[0]?.replace("_normal", "") || defaultImg;
 
      return defaultImage;
    } else {
      if (userData?.profile_picture) {
        return userData.profile_picture.replace("_normal", "");
      }
      if (userDetails?.profile_picture) {
        return userDetails.profile_picture;
      }
       const defaultImage = authDetails?.user?.verifiedCredentials[2]?.oauthAccountPhotos[0]?.replace("_normal", "") || defaultImg;

      return defaultImage;
    }
  };

  const checkTelegramStatus = async () => {
    try {
      const response = await axiosApi.get(`/wws/has-telegram/${userData?.userId}`);
      if (response.data.success === 1 && response.data.hasTelegram) {
        setHasTelegram(true);
        setTelegramData(response.data.data);
      } else {
        setHasTelegram(false);
        setTelegramData(null);
      }
    } catch (error) {
      console.error("Failed to check Telegram status:", error);
      setHasTelegram(false);
      setTelegramData(null);
    }
  };

  useEffect(() => {
    if (userData?.userId) {
      checkTelegramStatus();
    }
  }, [userData?.userId]);

  return (
    <div className="profile_content_wrapper">
      {active === "INFORMATION" &&
        (!isEditMode ? (
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
                  <div className="header_toggle_button">
                    {headerToggleButton.map((data) => {
                      return (
                        <div
                          key={data.key}
                          className={`buttons ${active === data.key ? "active" : ""}`}
                          onClick={data.onClick}
                        >
                          {data.label}
                        </div>
                      );
                    })}
                  </div>
                  <div className="header_toggle_dropDown">
                    <CustomDropdown toggleButton={<ThreeDots />} items={headerToggleButton} />
                  </div>
                </div>
                <div className="profile_page_header">
                  <div className="pagination">
                    <span>Profile</span>
                  </div>
                  <button className="btn_gray save_button" onClick={handleEditProfile}>
                    <img src={editIcon} alt="" />
                    Edit profile
                  </button>
                </div>
                <div className="profile_page_content">
                  <div className="project_profile">
                    <div className="profile_upload_profile">
                      <img
                        src={getProfileImage()}
                        alt=""
                        onError={(e) => {
                          e.target.onerror = null;
                          e.target.src = defaultImage;
                        }}
                      />
                    </div>
                    <div className="profile_actions">
                      {/* Edit profile button removed from here */}
                    </div>
                  </div>
                  <div className="profile_description_data">
                    <div className="form_box">
                      <h3 className="profile_title">Personal information</h3>
                      <div className="form_group_data">
                        <div className="profile_info">
                          <div className="profile_head">First Name</div>
                          <div className="profile_data">{userDetails?.firstname || userData?.name || "-"}</div>
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
                          <div className="profile_head">User name</div>
                          <div className="profile_data">
                            {userDetails?.username ||
                              (authDetails?.user?.verifiedCredentials?.[2]?.oauthUsername) ||
                              "-"}
                          </div>
                        </div>

                        <div className="profile_info">
                          <div className="profile_head">LinkedIn</div>
                          <div className="profile_data">{userDetails?.linkedin || "-"}</div>
                        </div>
                        <div className="profile_info">
                          <div className="profile_head">Telegram</div>
                          <div className="profile_data">
                            {telegramUsername || userDetails?.telegram_username || "-"}
                          </div>
                        </div>
                        <div className="profile_info">
                          <div className="profile_head">Twitter</div>
                          <div className="profile_data">
                            {userDetails?.username ? (
                              <a
                                href={`https://twitter.com/${userDetails.username}`}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="twitter-link"
                              >
                                {userDetails.username}
                              </a>
                            ) : (
                              "-"
                            )}
                          </div>
                        </div>
                        <div className="profile_info">
                          <div className="profile_head">Angel investor</div>
                          <div className="profile_data">{userDetails?.question1 || "-"}</div>
                        </div>
                        <div className="profile_info">
                          <div className="profile_head">Role</div>
                          <div className="profile_data">
                            {userDetails?.roles
                              ?.split(",")
                              .map((role) => {
                                switch (role.trim()) {
                                  case "A Founder":
                                    return "Founder";
                                  case "A C-level":
                                    return "C-level";
                                  case "A Web3 employee":
                                    return "Web3 employee";
                                  case "A KOL / Ambassador / Content Creator":
                                    return "KOL / Ambassador / Content Creator";
                                  case "An Angel Investor":
                                    return "Angel Investor";
                                  default:
                                    return role.trim();
                                }
                              })
                              .join(", ") || "-"}
                          </div>
                        </div>
                        {/* <div className="profile_info">
                          <div className="profile_head">Angel investor</div>
                          <div className="profile_data">{userDetails?.question1 || "-"}</div>
                        </div> */}
                        <div className="profile_info">
                          <div className="profile_head">Go to Web3 events</div>
                          <div className="profile_data">{userDetails?.question2 || "-"}</div>
                        </div>
                        <div className="profile_info">
                          <div className="profile_head">Main City</div>
                          <div className="profile_data">{userDetails?.primary_city || "-"}</div>
                        </div>
                        <div className="profile_info">
                          <div className="profile_head">Secondary Cities</div>
                          <div className="profile_data">{userDetails?.secondary_city || "-"}</div>
                        </div>
                      </div>
                      <div className="profile_bio_data">
                        <div className="profile_bio_head">Personal Bio</div>
                        <div className="profile_bio_data">
                          {userDetails?.bio || 
                           (authDetails?.user?.verifiedCredentials?.[2]?.description) || 
                           "-"}
                        </div>
                      </div>
                    </div>

                    <div className="profile_seprator_image ">
                      <img src={sepratorImage} alt="Separator" />
                    </div>

                    <div className="form_box">
                      <h3 className="profile_title">Investor's Information</h3>
                      <div className="investment_details">
                        {/* Left Column */}
                        <div className="profile_info">
                          <div className="profile_head">
                            Average ticket size {values?.roles?.includes("Angel Investor") ? "*" : ""}
                          </div>
                          <div className="profile_data">
                            {values?.roles?.includes("Angel Investor") ? (
                              <>
                                <label className="radio_box" htmlFor="5k">
                                  <input
                                    type="radio"
                                    id="5k"
                                    name="ticket_size"
                                    value=">$5k"
                                    checked={values?.ticket_size === ">$5k"}
                                    onChange={handleChange}
                                  />
                                  <span className="radio-custom"></span>
                                  <span className="radio-label">{">"}$5k</span>
                                </label>
                                <label className="radio_box" htmlFor="5k-10k">
                                  <input
                                    type="radio"
                                    id="5k-10k"
                                    name="ticket_size"
                                    value="5k-10k"
                                    checked={values?.ticket_size === "5k-10k"}
                                    onChange={handleChange}
                                  />
                                  <span className="radio-custom"></span>
                                  <span className="radio-label">5k-10k</span>
                                </label>
                                <label className="radio_box" htmlFor="10k-25k">
                                  <input
                                    type="radio"
                                    id="10k-25k"
                                    name="ticket_size"
                                    value="10k-25k"
                                    checked={values?.ticket_size === "10k-25k"}
                                    onChange={handleChange}
                                  />
                                  <span className="radio-custom"></span>
                                  <span className="radio-label">10k-25k</span>
                                </label>
                                <label className="radio_box" htmlFor="25k-100k">
                                  <input
                                    type="radio"
                                    id="25k-100k"
                                    name="ticket_size"
                                    value="25k-100k"
                                    checked={values?.ticket_size === "25k-100k"}
                                    onChange={handleChange}
                                  />
                                  <span className="radio-custom"></span>
                                  <span className="radio-label">25k-100k</span>
                                </label>
                                <label className="radio_box" htmlFor="100k-250k">
                                  <input
                                    type="radio"
                                    id="100k-250k"
                                    name="ticket_size"
                                    value="100k-250k"
                                    checked={values?.ticket_size === "100k-250k"}
                                    onChange={handleChange}
                                  />
                                  <span className="radio-custom"></span>
                                  <span className="radio-label">100k-250k</span>
                                </label>
                                <label className="radio_box" htmlFor="250k-500k">
                                  <input
                                    type="radio"
                                    id="250k-500k"
                                    name="ticket_size"
                                    value="250k-500k"
                                    checked={values?.ticket_size === "250k-500k"}
                                    onChange={handleChange}
                                  />
                                  <span className="radio-custom"></span>
                                  <span className="radio-label">250k-500k</span>
                                </label>
                                <label className="radio_box" htmlFor="1mil+">
                                  <input
                                    type="radio"
                                    id="1mil+"
                                    name="ticket_size"
                                    value="1mil+"
                                    checked={values?.ticket_size === "1mil+"}
                                    onChange={handleChange}
                                  />
                                  <span className="radio-custom"></span>
                                  <span className="radio-label">1mil+</span>
                                </label>
                              </>
                            ) : (
                              <span className="disabled-message">Available for Angel Investors only</span>
                            )}
                          </div>
                        </div>

                        {/* Right Column */}
                        <div className="profile_info">
                          <div className="profile_head">
                            Investment Thesis {values?.roles?.includes("Angel Investor") ? "*" : ""}
                          </div>
                          <div className="profile_data">
                            {values?.roles?.includes("Angel Investor") ? (
                              <>
                                <label className="check_box" htmlFor="gaming">
                                  <input
                                    type="checkbox"
                                    id="gaming"
                                    className="costum_checkbox_input"
                                    checked={values?.investment_thesis?.includes("Gaming/Metaverse/GameFi")}
                                    onChange={() => handleInvestmentThesisChange("Gaming/Metaverse/GameFi")}
                                  />
                                  <span className="costum_checkbox_label"></span>
                                  <span className="label">Gaming/Metaverse/GameFi</span>
                                </label>
                                <label className="check_box" htmlFor="ai">
                                  <input
                                    type="checkbox"
                                    id="ai"
                                    className="costum_checkbox_input"
                                    checked={values?.investment_thesis?.includes("AI")}
                                    onChange={() => handleInvestmentThesisChange("AI")}
                                  />
                                  <span className="costum_checkbox_label"></span>
                                  <span className="label">AI</span>
                                </label>
                                <label className="check_box" htmlFor="rwa">
                                  <input
                                    type="checkbox"
                                    id="rwa"
                                    className="costum_checkbox_input"
                                    checked={values?.investment_thesis?.includes("RWA")}
                                    onChange={() => handleInvestmentThesisChange("RWA")}
                                  />
                                  <span className="costum_checkbox_label"></span>
                                  <span className="label">RWA</span>
                                </label>
                                <label className="check_box" htmlFor="depin">
                                  <input
                                    type="checkbox"
                                    id="depin"
                                    className="costum_checkbox_input"
                                    checked={values?.investment_thesis?.includes("DePin")}
                                    onChange={() => handleInvestmentThesisChange("DePin")}
                                  />
                                  <span className="costum_checkbox_label"></span>
                                  <span className="label">DePin</span>
                                </label>
                                <label className="check_box" htmlFor="defi">
                                  <input
                                    type="checkbox"
                                    id="defi"
                                    className="costum_checkbox_input"
                                    checked={values?.investment_thesis?.includes("DeFi")}
                                    onChange={() => handleInvestmentThesisChange("DeFi")}
                                  />
                                  <span className="costum_checkbox_label"></span>
                                  <span className="label">DeFi</span>
                                </label>
                                <label className="check_box" htmlFor="infrastructure">
                                  <input
                                    type="checkbox"
                                    id="infrastructure"
                                    className="costum_checkbox_input"
                                    checked={values?.investment_thesis?.includes("Infrastructure")}
                                    onChange={() => handleInvestmentThesisChange("Infrastructure")}
                                  />
                                  <span className="costum_checkbox_label"></span>
                                  <span className="label">Infrastructure</span>
                                </label>
                                <label className="check_box" htmlFor="l1l2l3">
                                  <input
                                    type="checkbox"
                                    id="l1l2l3"
                                    className="costum_checkbox_input"
                                    checked={values?.investment_thesis?.includes("L1/L2/L3")}
                                    onChange={() => handleInvestmentThesisChange("L1/L2/L3")}
                                  />
                                  <span className="costum_checkbox_label"></span>
                                  <span className="label">L1/L2/L3</span>
                                </label>
                                <label className="check_box" htmlFor="data">
                                  <input
                                    type="checkbox"
                                    id="data"
                                    className="costum_checkbox_input"
                                    checked={values?.investment_thesis?.includes("Data")}
                                    onChange={() => handleInvestmentThesisChange("Data")}
                                  />
                                  <span className="costum_checkbox_label"></span>
                                  <span className="label">Data</span>
                                </label>
                                <label className="check_box" htmlFor="ip">
                                  <input
                                    type="checkbox"
                                    id="ip"
                                    className="costum_checkbox_input"
                                    checked={values?.investment_thesis?.includes("IP")}
                                    onChange={() => handleInvestmentThesisChange("IP")}
                                  />
                                  <span className="costum_checkbox_label"></span>
                                  <span className="label">IP</span>
                                </label>
                                <label className="check_box" htmlFor="other">
                                  <input
                                    type="checkbox"
                                    id="other"
                                    className="costum_checkbox_input"
                                    checked={values?.investment_thesis?.includes("Other")}
                                    onChange={() => handleInvestmentThesisChange("Other")}
                                  />
                                  <span className="costum_checkbox_label"></span>
                                  <span className="label">Other</span>
                                </label>
                                {values?.investment_thesis?.includes("Other") && (
                                  <input
                                    type="text"
                                    className="other-thesis-input"
                                    placeholder="Please specify other investment thesis..."
                                    value={values?.other_investment_thesis || ""}
                                    onChange={(e) => setFieldValue("other_investment_thesis", e.target.value)}
                                  />
                                )}
                              </>
                            ) : (
                              <span className="disabled-message">Available for Angel Investors only</span>
                            )}
                          </div>
                        </div>

                        {/* Bottom Section - Full Width */}
                        <div className="profile_info">
                          <div className="profile_head">
                            What's your investment thesis? {values?.roles?.includes("Angel Investor") ? "*" : ""}
                          </div>
                          <div className="profile_data">
                            {values?.roles?.includes("Angel Investor") ? (
                              <>
                                <div className="radio_group">
                                  <div
                                    className="radio_box"
                                    onClick={() => handleQuestionChange("investment_stage", "Early")}
                                  >
                                    <input
                                      type="radio"
                                      name="investment_stage"
                                      value="Early"
                                      checked={values?.investment_stage === "Early"}
                                    />
                                    <label></label>
                                    <span>Early (pre-seed, seed)</span>
                                  </div>
                                  <div
                                    className="radio_box"
                                    onClick={() => handleQuestionChange("investment_stage", "Decent traction")}
                                  >
                                    <input
                                      type="radio"
                                      name="investment_stage"
                                      value="Decent traction"
                                      checked={values?.investment_stage === "Decent traction"}
                                    />
                                    <label></label>
                                    <span>Decent traction (strategic, private)</span>
                                  </div>
                                  <div
                                    className="radio_box"
                                    onClick={() => handleQuestionChange("investment_stage", "Hyped")}
                                  >
                                    <input
                                      type="radio"
                                      name="investment_stage"
                                      value="Hyped"
                                      checked={values?.investment_stage === "Hyped"}
                                    />
                                    <label></label>
                                    <span>Hyped (public)</span>
                                  </div>
                                </div>
                                <div className="question_desc">
                                  Describe your investment thesis in your own words so we can bring you exactly what you
                                  need *
                                </div>
                                <textarea
                                  className="textArea"
                                  name="investment_description"
                                  placeholder="Custom description..."
                                  value={values?.investment_description}
                                  onChange={handleChange}
                                />
                                <div className="save_button_container">
                                  <button className="btn_gray save_button" type="submit" onClick={handleSubmit}>
                                    {isLoading ? (
                                      <>
                                        <Loader loading={isLoading} isItForButton={true} /> <p>Saving...</p>
                                      </>
                                    ) : (
                                      "Save Changes"
                                    )}
                                  </button>
                                </div>
                              </>
                            ) : (
                              <span className="disabled-message">Available for Angel Investors only</span>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="profile_seprator_image">
                      <img src={sepratorImage} alt="Separator" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <TelegramVerifyPopup 
              isOpen={isVerifyPopupOpen}
              onClose={() => setIsVerifyPopupOpen(false)}
              verificationCode={verificationCode}
            />
          </>
        ) : (
          // Edit mode
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
                        values.profile_picture === "" || !values.profile_picture ? defaultImage : values.profile_picture
                      }
                      alt=""
                      onError={(e) => (e.target.src = defaultImage)}
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

                      <div className="form_group_row">
                        <div className="profile_info">
                          <label>LinkedIn</label>
                          <input
                            type="text"
                            name="linkedin"
                            value={values?.linkedin}
                            onChange={handleChange}
                            placeholder="LinkedIn"
                          />
                        </div>
                        <div className="profile_info">
                          <label>Telegram</label>
                          <input
                            type="text"
                            name="telegram_username"
                            value={values?.telegram_username}
                            onChange={handleChange}
                            placeholder="Telegram"
                          />
                        </div>
                      </div>

                      <div className="form_group_row">
                        <div className="profile_info">
                          <label>Main City (for timezone and events) e.g. Paris, France </label>
                          <input
                            type="text"
                            name="primary_city"
                            value={values?.primary_city}
                            onChange={handleChange}
                            placeholder="Primary City"
                          />
                        </div>
                        <div className="profile_info">
                          <label>Secondary cities (separate each with a '/')</label>
                          <input
                            type="text"
                            name="secondary_city"
                            value={values?.secondary_city}
                            onChange={handleChange}
                            placeholder="Secondary Cities"
                          />
                        </div>
                      </div>

                      <div className="form_group_row">
                        <div className="profile_info">
                          <div className="profile_head">Go to Web3 events</div>
                          <div className="profile_data">{userDetails?.question2 || "-"}</div>
                        </div>
                        <div className="profile_info">
                          <div className="profile_head">Role</div>
                          <div className="profile_data">
                            {userDetails?.roles
                              ?.split(",")
                              .map((role) => {
                                switch (role.trim()) {
                                  case "A Founder":
                                    return "Founder";
                                  case "A C-level":
                                    return "C-level";
                                  case "A Web3 employee":
                                    return role.trim();
                                  case "A KOL / Ambassador / Content Creator":
                                    return role.trim();
                                  case "An Angel Investor":
                                    return "Angel Investor";
                                  default:
                                    return role.trim();
                                }
                              })
                              .join(", ") || "-"}
                          </div>
                        </div>
                      </div>

                      <div className="form_group_row">
                        <div className="profile_info full_width">
                          <label>Role</label>
                          <div className="options_container">
                            <div className="default_options">
                              {[
                                "Founder",
                                "C-level",
                                "BD",
                                "Community Manager",
                                "Collab Manager",
                                "Outreach Team",
                                "KOL",
                                "Ambassador",
                                "Content Creator",
                                "Alpha Caller",
                                "Angel Investor",
                              ].map((role, index) => (
                                <div
                                  key={index}
                                  className={`option default ${values?.roles?.includes(role) ? "selected" : ""}`}
                                  onClick={() => handleRoleChange(role)}
                                >
                                  <label>{role}</label>
                                </div>
                              ))}
                            </div>
                            <div className="custom_options">
                              {values?.roles
                                ?.filter(
                                  (role) =>
                                    ![
                                      "Founder",
                                      "C-level",
                                      "BD",
                                      "Community Manager",
                                      "Collab Manager",
                                      "Outreach Team",
                                      "KOL",
                                      "Ambassador",
                                      "Content Creator",
                                      "Alpha Caller",
                                      "Angel Investor",
                                    ].includes(role) && role !== "Other"
                                )
                                .map((role, index) => (
                                  <div key={`custom-${index}`} className={`option custom selected`}>
                                    <div onClick={() => handleRoleChange(role)}>
                                      <label>{role}</label>
                                    </div>
                                    <span
                                      className="delete-btn"
                                      onClick={(e) => {
                                        e.stopPropagation();
                                        setFieldValue(
                                          "roles",
                                          values.roles.filter((r) => r !== role)
                                        );
                                      }}
                                    >
                                      ×
                                    </span>
                                  </div>
                                ))}
                            </div>
                          </div>
                          <div className="add_custom_field">
                            <input
                              type="text"
                              placeholder="Add custom role"
                              value={values.other || ""}
                              onChange={(e) => {
                                setFieldValue("other", e.target.value);
                              }}
                              onKeyPress={(e) => {
                                if (e.key === "Enter" && values.other?.trim()) {
                                  e.preventDefault();
                                  const newRole = values.other.trim();
                                  if (!values.roles.includes(newRole)) {
                                    setFieldValue("roles", [...values.roles, newRole]);
                                  }
                                  setFieldValue("other", "");
                                }
                              }}
                            />
                            <button
                              onClick={() => {
                                if (values.other?.trim()) {
                                  const newRole = values.other.trim();
                                  if (!values.roles.includes(newRole)) {
                                    setFieldValue("roles", [...values.roles, newRole]);
                                  }
                                  setFieldValue("other", "");
                                }
                              }}
                            >
                              Add
                            </button>
                          </div>
                        </div>
                      </div>

                      <div className="form_group_row">
                        <div className="profile_info full_width">
                          <label>
                            Are you a VC / Angel investor and do you invest in early stage rounds (seed, strategic,
                            private) ?{" "}
                          </label>
                          <div
                            className="radio_box"
                            onClick={() => handleQuestionChange("question1", "Yes, frequently")}
                          >
                            <input
                              type="radio"
                              name="question1"
                              value="Yes, frequently"
                              checked={values?.question1 === "Yes, frequently"}
                            />
                            <label></label>
                            <span>Yes, frequently</span>
                          </div>
                          <div
                            className="radio_box"
                            onClick={() => handleQuestionChange("question1", "Yes, sometimes")}
                          >
                            <input
                              type="radio"
                              name="question1"
                              value="Yes, sometimes"
                              checked={values?.question1 === "Yes, sometimes"}
                            />
                            <label></label>
                            <span>Yes, sometimes</span>
                          </div>
                          <div className="radio_box" onClick={() => handleQuestionChange("question1", "No")}>
                            <input type="radio" name="question1" value="No" checked={values?.question1 === "No"} />
                            <label></label>
                            <span>No</span>
                          </div>
                        </div>
                      </div>

                      <div className="form_group_row">
                        <div className="profile_info full_width">
                          <label>
                            Do you ever go to IRL Web3 events (main events, side events, private investors events...) ?{" "}
                          </label>
                          <div className="radio_box" onClick={() => handleQuestionChange("question2", "Often")}>
                            <input
                              type="radio"
                              name="question2"
                              value="Often"
                              checked={values?.question2 === "Often"}
                            />
                            <label></label>
                            <span>Often</span>
                          </div>
                          <div className="radio_box" onClick={() => handleQuestionChange("question2", "Sometimes")}>
                            <input
                              type="radio"
                              name="question2"
                              value="Sometimes"
                              checked={values?.question2 === "Sometimes"}
                            />
                            <label></label>
                            <span>Sometimes</span>
                          </div>
                          <div className="radio_box" onClick={() => handleQuestionChange("question2", "Never")}>
                            <input
                              type="radio"
                              name="question2"
                              value="Never"
                              checked={values?.question2 === "Never"}
                            />
                            <label></label>
                            <span>Never</span>
                          </div>
                          <span className="question_desc">
                            (This will allow us to invite you to exclusive events we&apos;re co-hosting with our
                            partners at Forbes, Karate Combat and others.)
                          </span>
                        </div>
                      </div>

                      <div className="form_group_row">
                        <div className="profile_info">
                          <div className="profile_head">Main City</div>
                          <div className="profile_data">{userDetails?.primary_city || "-"}</div>
                        </div>
                        <div className="profile_info">
                          <div className="profile_head">Secondary Cities</div>
                          <div className="profile_data">{userDetails?.secondary_city || "-"}</div>
                        </div>
                      </div>

                      <div className="form_group_row">
                        <div className="profile_info">
                          <div className="profile_head">Go to Web3 events</div>
                          <div className="profile_data">{userDetails?.question2 || "-"}</div>
                        </div>
                        <div className="profile_info">
                          <div className="profile_head">Role</div>
                          <div className="profile_data">
                            {userDetails?.roles
                              ?.split(",")
                              .map((role) => {
                                switch (role.trim()) {
                                  case "A Founder":
                                    return "Founder";
                                  case "A C-level":
                                    return "C-level";
                                  case "A Web3 employee":
                                    return role.trim();
                                  case "A KOL / Ambassador / Content Creator":
                                    return role.trim();
                                  case "An Angel Investor":
                                    return "Angel Investor";
                                  default:
                                    return role.trim();
                                }
                              })
                              .join(", ") || "-"}
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="profile_bio">
                      <label> Bio</label>
                      <textarea
                        className="textArea"
                        name="bio"
                        placeholder="Your bio..."
                        value={values?.bio}
                        onChange={handleChange}
                      />
                    </div>
                  </div>

                  <div className="profile_seprator_image">
                    <img src={sepratorImage} alt="Separator" />
                  </div>
                  <div className="form_box">
                    <div className="contact_info">
                      <div className="section_headers">
                        <h3 className="profile_title">Contact information</h3>
                        <h3 className="profile_title">Connected accounts</h3>
                      </div>
                      <div className="content_wrapper">
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
                            {!userData?.authDetails?.isAuthenticated && (
                              <button className="btn_gray">
                                <img src={twitterIcon} alt="" />
                                Connect Twitter
                              </button>
                            )}
                            <DiscordAuthButton />
                            <button 
                              className={`btn_gray save_button ${hasTelegram ? 'verified' : ''}`} 
                              onClick={handleVerifyTelegram}
                              disabled={hasTelegram}
                            >
                              <img src={telegramIcon} alt="" />
                              {hasTelegram ? (
                                <>
                                  Telegram Connected
                                  <svg 
                                    className="checkmark" 
                                    width="16" 
                                    height="16" 
                                    viewBox="0 0 24 24" 
                                    fill="none" 
                                    xmlns="http://www.w3.org/2000/svg"
                                  >
                                    <path 
                                      d="M20 6L9 17L4 12" 
                                      stroke="#4CAF50" 
                                      strokeWidth="2" 
                                      strokeLinecap="round" 
                                      strokeLinejoin="round"
                                    />
                                  </svg>
                                </>
                              ) : (
                                'Verify Telegram Account'
                              )}
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="profile_seprator_image">
                    <img src={sepratorImage} alt="Separator" />
                  </div>

                  <div className="form_box">
                    <h3 className="profile_title">Password</h3>
                    <div className="form_group">
                      <div className="form_group_row">
                        <div className="profile_info">
                          <label>Old Password</label>
                          <InputPassword
                            name="oldPassword"
                            placeholder="Enter old password"
                            value={passwordFormik.values.oldPassword}
                            onChange={passwordFormik.handleChange}
                          />
                        </div>
                      </div>
                      <div className="form_group_row">
                        <div className="profile_info">
                          <label>New Password</label>
                          <InputPassword
                            name="newPassword"
                            placeholder="Enter new password"
                            value={passwordFormik.values.newPassword}
                            onChange={passwordFormik.handleChange}
                          />
                        </div>
                        <div className="profile_info">
                          <label>Confirm Password</label>
                          <InputPassword
                            name="confirmPassword"
                            placeholder="Confirm new password"
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
                        Cancel
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
        ))}
      {active === "INVOLVEMENT" &&
        (addNewProject ? (
          <ProjectInvolvment setAddNewProject={setAddNewProject} />
        ) : (
          <ProjectsUser
            userProjects={userProjects}
            setAddNewProject={setAddNewProject}
            handleActive={handleActive}
            active={active}
          />
        ))}
      {active === "AMBASSADORS" && (
        <Ambassadors handleActive={handleActive} active={active} uid={userData?.userId} userData={userData} />
      )}
      <TelegramVerifyPopup 
        isOpen={isVerifyPopupOpen}
        onClose={() => setIsVerifyPopupOpen(false)}
        verificationCode={verificationCode}
      />
    </div>
  );
};

export default UserProfile;
