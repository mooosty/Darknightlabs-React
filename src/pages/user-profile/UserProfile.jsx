import axios from "axios";
import { axiosApi } from "../../api-services/service";
import "./userProfile.scss";
import { useFormik } from "formik";
// import { toast } from "react-toastify";
import toast, { Toaster } from "react-hot-toast";
import { useEffect, useState, useRef } from "react";
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
import CryptoJS from "crypto-js";
import { apiRoutes } from "../../utils/constants/apiUrl";
import { startTour } from '../../utils/tourConfig';

const copyIcon =
  "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='24' height='24' viewBox='0 0 24 24' fill='none' stroke='%23f5efdb' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3E%3Crect x='9' y='9' width='13' height='13' rx='2' ry='2'%3E%3C/rect%3E%3Cpath d='M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1'%3E%3C/path%3E%3C/svg%3E";

const TelegramVerifyPopup = ({ isOpen, onClose, verificationCode }) => {
  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text);
    toast.success("Copied to clipboard!");
  };

  if (!isOpen) return null;

  return (
    <div className="popup-overlay">
      <div className="popup-content">
        <h3>Verify Your Telegram Account</h3>
        <p>
          Add{" "}
          <span
            className="telegram-bot-name"
            onClick={() => copyToClipboard("@WinWinCyborg")}
            style={{
              cursor: "pointer",
              color: "#229ED9",
              textDecoration: "underline",
            }}
          >
            @WinWinCyborg
          </span>{" "}
          and type{" "}
          <span
            onClick={() => copyToClipboard("/verify")}
            style={{
              cursor: "pointer",
              color: "#f5efdb",
              fontWeight: "bold",
              textDecoration: "underline",
            }}
          >
            /verify
          </span>{" "}
          then send this code to verify your account:
        </p>
        <div className="verification-code">
          <code>{verificationCode}</code>
          <button onClick={() => copyToClipboard(verificationCode)} className="copy-button" title="Copy to clipboard">
            <img src={copyIcon} alt="Copy" />
          </button>
        </div>
        <button onClick={onClose} className="close-button">
          Close
        </button>
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

const DiscordAuthButton = ({ onSuccess }) => {
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
    const telegramVerified = urlParams.get("telegram_verified");

    if (telegramVerified === "true") {
      checkTelegramStatus();
      handleSocialConnect();
      toast.success("Successfully connected to Telegram!");
      window.history.replaceState({}, document.title, window.location.pathname);
    }

    if (discordDataParam) {
      try {
        // Decode the URL-encoded JSON string
        const decodedData = decodeURIComponent(discordDataParam);
        const discordData = JSON.parse(decodedData);

        if (discordData.success && discordData.user?.id) {
          // Update discord ID in backend
          axiosApi
            .post("/discord/update-discord-id", {
              id: userData?.userId,
              discord_id: discordData.user.id,
            })
            .then(() => {
              setStatus("");
              checkDiscordStatus();
              toast.success("Successfully connected to Discord!");
              if (onSuccess) {
                onSuccess();
              }
            })
            .catch((error) => {
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
  }, [userData?.userId, onSuccess]);

  return (
    <button
      className={`btn_gray save_button ${hasDiscord ? "verified" : ""}`}
      onClick={handleDiscordAuth}
      disabled={loading || hasDiscord}
    >
      <img src={discordIcon} alt="" />
      {loading ? (
        "Connecting..."
      ) : hasDiscord ? (
        <span style={{ display: "flex", alignItems: "center", gap: "8px" }}>
          Discord Connected
          <svg
            className="checkmark"
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M20 6L9 17L4 12" stroke="#4CAF50" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </span>
      ) : (
        "Connect Discord"
      )}
      {status && <div className={`status-message ${status.includes("Error") ? "error" : "success"}`}>{status}</div>}
    </button>
  );
};

// Add this constant at the top of the file with other imports
const MAJOR_CITIES = [
  "New York, USA",
  "London, UK",
  "Paris, France",
  "Tokyo, Japan",
  "Singapore, Singapore",
  "Dubai, UAE",
  "Hong Kong, China",
  "Los Angeles, USA",
  "Shanghai, China",
  "Toronto, Canada",
  "Sydney, Australia",
  "Berlin, Germany",
  "Mumbai, India",
  "Seoul, South Korea",
  "São Paulo, Brazil",
  "Amsterdam, Netherlands",
  "Madrid, Spain",
  "Miami, USA",
  "San Francisco, USA",
  "Chicago, USA",
  "Bangkok, Thailand",
  "Beijing, China",
  "Istanbul, Turkey",
  "Moscow, Russia",
  "Mexico City, Mexico",
  "Jakarta, Indonesia",
  "Manila, Philippines",
  "Kuala Lumpur, Malaysia",
  "Rome, Italy",
  "Vienna, Austria",
  "Stockholm, Sweden",
  "Zurich, Switzerland",
  "Vancouver, Canada",
  "Melbourne, Australia",
  "Barcelona, Spain",
  "Munich, Germany",
  "Tel Aviv, Israel",
  "Copenhagen, Denmark",
  "Brussels, Belgium",
  "Oslo, Norway",
  "Dublin, Ireland",
  "Helsinki, Finland",
  "Prague, Czech Republic",
  "Warsaw, Poland",
  "Budapest, Hungary",
  "Athens, Greece",
  "Lisbon, Portugal",
  "Buenos Aires, Argentina",
  "Santiago, Chile",
  "Lima, Peru",
];

const CityAutocomplete = ({ value, onChange, placeholder, label }) => {
  const [suggestions, setSuggestions] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [inputValue, setInputValue] = useState(value || "");
  const wrapperRef = useRef(null);

  useEffect(() => {
    setInputValue(value || "");
  }, [value]);

  useEffect(() => {
    // Click outside handler
    const handleClickOutside = (event) => {
      if (wrapperRef.current && !wrapperRef.current.contains(event.target)) {
        setShowSuggestions(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleInputChange = (e) => {
    const value = e.target.value;
    setInputValue(value);
    setShowSuggestions(true);

    if (value.length < 2) {
      setSuggestions([]);
      return;
    }

    // Filter cities based on input
    const filteredCities = MAJOR_CITIES.filter((city) => city.toLowerCase().includes(value.toLowerCase())).slice(0, 10);

    setSuggestions(filteredCities);
  };

  const handleSuggestionClick = (city) => {
    setInputValue(city);
    onChange(city);
    setShowSuggestions(false);
    setSuggestions([]);
  };

  return (
    <div className="city-autocomplete-wrapper" ref={wrapperRef}>
      <label>{label}</label>
      <div className="city-input-container">
        <input
          type="text"
          value={inputValue}
          onChange={handleInputChange}
          onFocus={() => setShowSuggestions(true)}
          placeholder={placeholder}
          className="city-input"
        />
      </div>
      {showSuggestions && suggestions.length > 0 && (
        <ul className="city-suggestions">
          {suggestions.map((city, index) => (
            <li key={index} onClick={() => handleSuggestionClick(city)} className="city-suggestion-item">
              {city}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

// Add this helper function near the top of the file
const isInvestor = (roles) => {
  return roles?.includes("Angel Investor") || roles?.includes("Venture Capital");
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
  const [verificationCode, setVerificationCode] = useState("");
  const [hasTelegram, setHasTelegram] = useState(false);
  const [telegramData, setTelegramData] = useState(null);
  const [refreshTrigger, setRefreshTrigger] = useState(0);
  const [initialInvestorValues, setInitialInvestorValues] = useState(null);
  const [isSaveEnabled, setIsSaveEnabled] = useState(false);

  const { authDetails } = useSelector((state) => state.auth);


  const defaultImage =
    authDetails?.user?.verifiedCredentials[1]?.oauthAccountPhotos[0]?.replace("_normal", "") || defaultImg;

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
    ticket_size: [],
    investment_stage: [],
    investment_description: "",
    previous_investments: "",
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

    // Clean up ticket size values before stringifying
    const cleanTicketSizes = (values.ticket_size || []).map((size) =>
      typeof size === "string" ? size.replace(/^"(.*)"$/, "$1").replace(/^'(.*)'$/, "$1") : size
    );

    // Handle investment thesis with other category
    let investmentThesis = values.investment_thesis || [];
    if (investmentThesis.includes("Other") && values.other_investment_thesis) {
      // Replace "Other" with the actual value
      investmentThesis = investmentThesis.map((thesis) =>
        thesis === "Other" ? values.other_investment_thesis : thesis
      );
    }

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
        investment_thesis: JSON.stringify(investmentThesis),
        ticket_size: JSON.stringify(cleanTicketSizes),
        investment_stage: JSON.stringify(values.investment_stage || []),
        investment_description: values.investment_description || "",
        previous_investments: values.previous_investments || "",
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
      investment_thesis:
        typeof userDetails?.investment_thesis === "string"
          ? JSON.parse(userDetails.investment_thesis)
          : userDetails?.investment_thesis || [],
      ticket_size:
        typeof userDetails?.ticket_size === "string"
          ? JSON.parse(userDetails.ticket_size).map((size) =>
              // Clean up the stored values by removing extra quotes
              size.replace(/^"(.*)"$/, "$1").replace(/^'(.*)'$/, "$1")
            )
          : Array.isArray(userDetails?.ticket_size)
          ? userDetails.ticket_size.map((size) =>
              // Clean up array values
              typeof size === "string" ? size.replace(/^"(.*)"$/, "$1").replace(/^'(.*)'$/, "$1") : size
            )
          : userDetails?.ticket_size
          ? [userDetails.ticket_size.toString()]
          : [],
      investment_stage:
        typeof userDetails?.investment_stage === "string"
          ? JSON.parse(userDetails.investment_stage)
          : Array.isArray(userDetails?.investment_stage)
          ? userDetails.investment_stage
          : userDetails?.investment_stage
          ? [userDetails.investment_stage]
          : [],
      investment_description: userDetails?.investment_description || "",
      previous_investments: userDetails?.previous_investments || "",
    });
    
    // Restart tour in edit mode after a short delay to allow state update
    setTimeout(() => {
      startTour('profile', true);
    }, 100);
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
        const response = await axiosApi.get(`${apiRoutes.USER_PROJECT}/all/${userData.userId}`);
        setUserProjects(response.data.data ?? []);
      } catch (error) {
        console.error("error", error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchProjects();
  }, [dispatch]);

  // Add this function to check if investor fields have changed
  const checkInvestorFieldsChanged = (currentValues) => {
    if (!initialInvestorValues) return false;

    // Helper function to compare arrays
    const areArraysEqual = (arr1, arr2) => {
      if (!arr1 || !arr2) return false;
      if (arr1.length !== arr2.length) return true;
      return arr1.some((item, index) => item !== arr2[index]);
    };

    // Compare each field
    const hasChanges =
      areArraysEqual(currentValues.ticket_size, initialInvestorValues.ticket_size) ||
      areArraysEqual(currentValues.investment_thesis, initialInvestorValues.investment_thesis) ||
      areArraysEqual(currentValues.investment_stage, initialInvestorValues.investment_stage) ||
      currentValues.investment_description !== initialInvestorValues.investment_description ||
      currentValues.previous_investments !== initialInvestorValues.previous_investments ||
      currentValues.other_investment_thesis !== initialInvestorValues.other_investment_thesis;

    setIsSaveEnabled(hasChanges);
  };

  // Modify the useEffect that sets initial values to also set initialInvestorValues
  useEffect(() => {
    if (userDetails) {
      // Parse ticket_size if it's a string
      let parsedTicketSize = [];
      try {
        if (typeof userDetails.ticket_size === "string") {
          parsedTicketSize = JSON.parse(userDetails.ticket_size).map((size) =>
            size.replace(/^"(.*)"$/, "$1").replace(/^'(.*)'$/, "$1")
          );
        } else if (Array.isArray(userDetails.ticket_size)) {
          parsedTicketSize = userDetails.ticket_size.map((size) =>
            typeof size === "string" ? size.replace(/^"(.*)"$/, "$1").replace(/^'(.*)'$/, "$1") : size
          );
        } else if (userDetails.ticket_size) {
          parsedTicketSize = [userDetails.ticket_size.toString()];
        }
      } catch (e) {
        console.error("Error parsing ticket_size:", e);
      }

      // Parse investment_stage if it's a string
      let parsedInvestmentStage = [];
      try {
        if (typeof userDetails.investment_stage === "string") {
          parsedInvestmentStage = JSON.parse(userDetails.investment_stage);
        } else if (Array.isArray(userDetails.investment_stage)) {
          parsedInvestmentStage = userDetails.investment_stage;
        } else if (userDetails.investment_stage) {
          parsedInvestmentStage = [userDetails.investment_stage];
        }
      } catch (e) {
        console.error("Error parsing investment_stage:", e);
      }

      // Parse investment_thesis if it's a string
      let parsedInvestmentThesis = [];
      try {
        if (typeof userDetails.investment_thesis === "string") {
          parsedInvestmentThesis = JSON.parse(userDetails.investment_thesis);
        } else if (Array.isArray(userDetails.investment_thesis)) {
          parsedInvestmentThesis = userDetails.investment_thesis;
        }

        // Check for custom categories
        const predefinedCategories = [
          "Gaming/Metaverse/GameFi",
          "AI",
          "RWA",
          "DePin",
          "DeFi",
          "Infrastructure",
          "L1/L2/L3",
          "Data",
          "IP",
          "Other",
        ];

        // If there are custom categories, make sure "Other" is included
        const hasCustomCategories = parsedInvestmentThesis.some(
          thesis => !predefinedCategories.includes(thesis)
        );
        
        if (hasCustomCategories && !parsedInvestmentThesis.includes("Other")) {
          parsedInvestmentThesis.push("Other");
        }

      } catch (e) {
        console.error("Error parsing investment_thesis:", e);
      }

      // Set initial investor values
      setInitialInvestorValues({
        ticket_size: parsedTicketSize,
        investment_thesis: parsedInvestmentThesis,
        investment_stage: parsedInvestmentStage,
        investment_description: userDetails?.investment_description || "",
        previous_investments: userDetails?.previous_investments || "",
      });

      // Set form values
      setValues({
        ...initialValues,
        ...userDetails,
        roles: userDetails?.roles?.split(",") || [],
        telegram_username: telegramUsername || userDetails.telegram_username,
        investment_stage: parsedInvestmentStage,
        investment_thesis: parsedInvestmentThesis,
        ticket_size: parsedTicketSize,
        previous_investments: userDetails?.previous_investments || "",
      });
    }
  }, [userDetails, telegramUsername]);

  // Add effect to check for changes when values change
  useEffect(() => {
    if (values && initialInvestorValues) {
      checkInvestorFieldsChanged(values);
    }
  }, [
    values?.ticket_size,
    values?.investment_thesis,
    values?.investment_stage,
    values?.investment_description,
    values?.previous_investments,
    values?.other_investment_thesis,
  ]);

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
    if (hasTelegram) return;
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

      const defaultImage =
        authDetails?.user?.verifiedCredentials[2]?.oauthAccountPhotos[0]?.replace("_normal", "") || defaultImg;

      return defaultImage;
    } else {
      if (userData?.profile_picture) {
        return userData.profile_picture.replace("_normal", "");
      }
      if (userDetails?.profile_picture) {
        return userDetails.profile_picture;
      }
      const defaultImage =
        authDetails?.user?.verifiedCredentials[2]?.oauthAccountPhotos[0]?.replace("_normal", "") || defaultImg;

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
  }, [userData?.userId, refreshTrigger]);

  const handleSocialConnect = () => {
    setRefreshTrigger((prev) => prev + 1);
    dispatch(getUsersDetailsAPI(userData?.userId));
  };

  useEffect(() => {
    if (userData?.userId) {
      checkTelegramStatus();
      dispatch(getUsersDetailsAPI(userData?.userId));
    }
  }, [userData?.userId, refreshTrigger]);

  // Initialize tour when component mounts or mode changes
  useEffect(() => {
    if (active === "INFORMATION") {
      startTour('profile', isEditMode);
    }
  }, [isEditMode, active]);

  // When switching to project involvement tab
  useEffect(() => {
    if (active === "INVOLVEMENT" && !addNewProject) {
      startTour('project');
    }
  }, [active, addNewProject]);

  // When switching to ambassadors tab
  useEffect(() => {
    if (active === "AMBASSADORS") {
      startTour('ambassador');
    }
  }, [active]);

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
                    <div className="profile_actions">{/* Edit profile button removed from here */}</div>
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
                          <div className="profile_head">Username</div>
                          <div className="profile_data">
                            {userDetails?.username || authDetails?.user?.verifiedCredentials?.[2]?.oauthUsername || "-"}
                          </div>
                        </div>

                        <div className="profile_info">
                          <div className="profile_head">LinkedIn</div>
                          <div className="profile_data">{userDetails?.linkedin || "-"}</div>
                        </div>
                        <div className="profile_info">
                          <div className="profile_head">Telegram</div>
                          <div className="profile_data">
                            {telegramUsername || userDetails?.telegram_username ? (
                              <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                                {telegramUsername || userDetails?.telegram_username}
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
                              </div>
                            ) : (
                              "-"
                            )}
                          </div>
                        </div>
                        <div className="profile_info">
                          <div className="profile_head">Twitter</div>
                          <div className="profile_data">
                            {userDetails?.username ? (
                              <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                                <a
                                  href={`https://twitter.com/${authDetails?.user?.verifiedCredentials[1]?.oauthUsername}`}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="twitter-link"
                                >
                                  {authDetails?.user?.verifiedCredentials[1]?.oauthUsername}
                                </a>
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
                              </div>
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
                          <div className="profile_data role-squares">
                            {userDetails?.roles?.split(",").map((role, index) => {
                              let displayRole;
                              let emoji;
                              switch (role.trim()) {
                                case "A Founder":
                                case "Founder":
                                  displayRole = "Founder";
                                  emoji = "👑";
                                  break;
                                case "A C-level":
                                case "C-level":
                                  displayRole = "C-level";
                                  emoji = "💼";
                                  break;
                                case "A Web3 employee":
                                case "Web3 employee":
                                  displayRole = "Web3 Employee";
                                  emoji = "💻";
                                  break;
                                case "A KOL / Ambassador / Content Creator":
                                case "KOL / Ambassador / Content Creator":
                                  displayRole = "Content Creator";
                                  emoji = "🎥";
                                  break;
                                case "An Angel Investor":
                                case "Angel Investor":
                                  displayRole = "Angel Investor";
                                  emoji = "👼";
                                  break;
                                case "BD":
                                  displayRole = "BD";
                                  emoji = "🤝";
                                  break;
                                case "Community Manager":
                                  displayRole = "Community Manager";
                                  emoji = "👥";
                                  break;
                                case "Collab Manager":
                                  displayRole = "Collab Manager";
                                  emoji = "🤝";
                                  break;
                                case "Outreach Team":
                                  displayRole = "Outreach";
                                  emoji = "📢";
                                  break;
                                case "KOL":
                                  displayRole = "KOL";
                                  emoji = "⭐";
                                  break;
                                case "Ambassador":
                                  displayRole = "Ambassador";
                                  emoji = "🌟";
                                  break;
                                case "Alpha Caller":
                                  displayRole = "Alpha Caller";
                                  emoji = "📱";
                                  break;
                                case "Venture Capital":
                                  displayRole = "VC";
                                  emoji = "💰";
                                  break;
                                default:
                                  displayRole = role.trim();
                                  emoji = "🔹";
                              }
                              return (
                                <div key={index} className="role-square">
                                  <span className="role-emoji">{emoji}</span>
                                  <span className="role-text">{displayRole}</span>
                                </div>
                              );
                            }) || "-"}
                          </div>
                        </div>
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
                          {userDetails?.bio || authDetails?.user?.verifiedCredentials?.[2]?.description || "-"}
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
                          <div className="profile_head">Average ticket size {isInvestor(values?.roles) ? "*" : ""}</div>
                          <div className="profile_data">
                            {isInvestor(values?.roles) ? (
                              <>
                                <div className="options_container">
                                  <div className="default_options">
                                    {[">$5k", "5k-10k", "10k-25k", "25k-100k", "100k-250k", "250k-500k", "1mil+"].map(
                                      (role, index) => (
                                        <div
                                          key={index}
                                          className={`option default ${
                                            values?.ticket_size?.includes(role) ? "selected" : ""
                                          }`}
                                          onClick={() => {
                                            const currentSizes = Array.isArray(values?.ticket_size)
                                              ? values.ticket_size.map((size) =>
                                                  size.replace(/^"(.*)"$/, "$1").replace(/^'(.*)'$/, "$1")
                                                )
                                              : values?.ticket_size
                                              ? [values.ticket_size]
                                              : [];
                                            const newSizes = currentSizes.includes(role)
                                              ? currentSizes.filter((size) => size !== role)
                                              : [...currentSizes, role];
                                            setFieldValue("ticket_size", newSizes);
                                          }}
                                        >
                                          <label>{role}</label>
                                        </div>
                                      )
                                    )}
                                  </div>
                                </div>
                              </>
                            ) : (
                              <span className="disabled-message">Available for Angel Investors only and VCs</span>
                            )}
                          </div>
                        </div>

                        {/* Right Column */}
                        <div className="profile_info">
                          <div className="profile_head">
                            Investment Categories {isInvestor(values?.roles) ? "*" : ""}
                          </div>
                          <div className="profile_data">
                            {isInvestor(values?.roles) ? (
                              <>
                                <div className="options_container">
                                  <div className="default_options">
                                    {[
                                      "Gaming/Metaverse/GameFi",
                                      "AI",
                                      "RWA",
                                      "DePin",
                                      "DeFi",
                                      "Infrastructure",
                                      "L1/L2/L3",
                                      "Data",
                                      "IP",
                                      "Other",
                                    ].map((role, index) => (
                                      <div
                                        key={index}
                                        className={`option default ${
                                          values?.investment_thesis?.includes(role) ? "selected" : ""
                                        }`}
                                        onClick={() => handleInvestmentThesisChange(role)}
                                      >
                                        <label>{role}</label>
                                      </div>
                                    ))}
                                  </div>
                                  {values?.investment_thesis?.includes("Other") && (
                                    <div className="add_custom_field">
                                      <input
                                        type="text"
                                        placeholder="Add custom category"
                                        value={values.other_investment_thesis || ""}
                                        onChange={(e) => {
                                          setFieldValue("other_investment_thesis", e.target.value);
                                        }}
                                        onKeyPress={(e) => {
                                          if (e.key === "Enter" && values.other_investment_thesis?.trim()) {
                                            e.preventDefault();
                                            const newThesis = values.other_investment_thesis.trim();
                                            setFieldValue("investment_thesis", [...values.investment_thesis, newThesis]);
                                            setFieldValue("other_investment_thesis", "");
                                          }
                                        }}
                                      />
                                      <button
                                        onClick={() => {
                                          if (values.other_investment_thesis?.trim()) {
                                            const newThesis = values.other_investment_thesis.trim();
                                            setFieldValue("investment_thesis", [...values.investment_thesis, newThesis]);
                                            setFieldValue("other_investment_thesis", "");
                                          }
                                        }}
                                      >
                                        Add
                                      </button>
                                    </div>
                                  )}
                                  <div className="custom_options">
                                    {values?.investment_thesis
                                      ?.filter(
                                        (thesis) =>
                                          ![
                                            "Gaming/Metaverse/GameFi",
                                            "AI",
                                            "RWA",
                                            "DePin",
                                            "DeFi",
                                            "Infrastructure",
                                            "L1/L2/L3",
                                            "Data",
                                            "IP",
                                            "Other",
                                          ].includes(thesis)
                                      )
                                      .map((thesis, index) => (
                                        <div key={`custom-${index}`} className="option custom selected">
                                          <div>
                                            <label>{thesis}</label>
                                          </div>
                                          <span
                                            className="delete-btn"
                                            onClick={(e) => {
                                              e.stopPropagation();
                                              setFieldValue(
                                                "investment_thesis",
                                                values.investment_thesis.filter((t) => t !== thesis)
                                              );
                                            }}
                                          >
                                            ×
                                          </span>
                                        </div>
                                      ))}
                                  </div>
                                </div>
                              </>
                            ) : (
                              <span className="disabled-message">Available for Angel Investors only and VCs</span>
                            )}
                          </div>
                        </div>

                        {/* Bottom Section - Full Width */}
                        <div className="profile_info">
                          <div className="profile_head">
                            What's your investment thesis? {isInvestor(values?.roles) ? "*" : ""}
                          </div>
                          <div className="profile_data">
                            {isInvestor(values?.roles) ? (
                              <>
                                <div className="options_container">
                                  <div className="default_options">
                                    {[
                                      "Early (pre-seed, seed)",
                                      "Decent traction (strategic, private)",
                                      "Hyped (public)",
                                    ].map((role, index) => (
                                      <div
                                        key={index}
                                        className={`option default ${
                                          values?.investment_stage?.includes(role) ? "selected" : ""
                                        }`}
                                        onClick={() => {
                                          const currentSizes = Array.isArray(values?.investment_stage)
                                            ? values.investment_stage.map((size) =>
                                                size.replace(/^"(.*)"$/, "$1").replace(/^'(.*)'$/, "$1")
                                              )
                                            : values?.investment_stage
                                            ? [values.investment_stage]
                                            : [];
                                          const newSizes = currentSizes.includes(role)
                                            ? currentSizes.filter((size) => size !== role)
                                            : [...currentSizes, role];
                                          setFieldValue("investment_stage", newSizes);
                                        }}
                                      >
                                        <label>{role}</label>
                                      </div>
                                    ))}
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
                                <div className="question_desc">
                                  Previous investments and ticket sizes (if you feel comfortable sharing — will give us
                                  more insights on what makes sense to you, thus bring you tailored deals)
                                </div>
                                <textarea
                                  className="textArea"
                                  name="previous_investments"
                                  placeholder="Share your previous investments and ticket sizes..."
                                  value={values?.previous_investments}
                                  onChange={handleChange}
                                />
                                <div className="save_button_container">
                                  <button
                                    className={`btn_gray save_button ${!isSaveEnabled ? "disabled" : ""}`}
                                    type="submit"
                                    onClick={handleSubmit}
                                    disabled={!isSaveEnabled}
                                    style={{
                                      opacity: !isSaveEnabled ? "0.5" : "1",
                                      cursor: !isSaveEnabled ? "not-allowed" : "pointer",
                                      backgroundColor: !isSaveEnabled ? "#4a4a4a" : undefined,
                                      transition: "all 0.3s ease",
                                    }}
                                  >
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
                              <span className="disabled-message">Available for Angel Investors only and VCs</span>
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
                          <label>Username</label>
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
                          <CityAutocomplete
                            value={values?.primary_city}
                            onChange={(value) => setFieldValue("primary_city", value)}
                            placeholder="Enter your main city"
                            label="Main City (for timezone and events)"
                          />
                        </div>
                        <div className="profile_info">
                          <CityAutocomplete
                            value={values?.secondary_city}
                            onChange={(value) => setFieldValue("secondary_city", value)}
                            placeholder="Enter your secondary city"
                            label="Secondary City"
                          />
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
                                "Venture Capital",
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
                                      "Venture Capital",
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
                          <div className="profile_data role-squares">
                            {userDetails?.roles?.split(",").map((role, index) => {
                              let displayRole;
                              let emoji;
                              switch (role.trim()) {
                                case "A Founder":
                                case "Founder":
                                  displayRole = "Founder";
                                  emoji = "👑";
                                  break;
                                case "A C-level":
                                case "C-level":
                                  displayRole = "C-level";
                                  emoji = "💼";
                                  break;
                                case "A Web3 employee":
                                case "Web3 employee":
                                  displayRole = "Web3 Employee";
                                  emoji = "💻";
                                  break;
                                case "A KOL / Ambassador / Content Creator":
                                case "KOL / Ambassador / Content Creator":
                                  displayRole = "Content Creator";
                                  emoji = "🎥";
                                  break;
                                case "An Angel Investor":
                                case "Angel Investor":
                                  displayRole = "Angel Investor";
                                  emoji = "👼";
                                  break;
                                case "BD":
                                  displayRole = "BD";
                                  emoji = "🤝";
                                  break;
                                case "Community Manager":
                                  displayRole = "Community Manager";
                                  emoji = "👥";
                                  break;
                                case "Collab Manager":
                                  displayRole = "Collab Manager";
                                  emoji = "🤲";
                                  break;
                                case "Outreach Team":
                                  displayRole = "Outreach";
                                  emoji = "📢";
                                  break;
                                case "KOL":
                                  displayRole = "KOL";
                                  emoji = "⭐";
                                  break;
                                case "Ambassador":
                                  displayRole = "Ambassador";
                                  emoji = "🌟";
                                  break;
                                case "Alpha Caller":
                                  displayRole = "Alpha Caller";
                                  emoji = "📱";
                                  break;
                                case "Venture Capital":
                                  displayRole = "VC";
                                  emoji = "💰";
                                  break;
                                default:
                                  displayRole = role.trim();
                                  emoji = "🔹";
                              }
                              return (
                                <div key={index} className="role-square">
                                  <span className="role-emoji">{emoji}</span>
                                  <span className="role-text">{displayRole}</span>
                                </div>
                              );
                            }) || "-"}
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
                            <DiscordAuthButton onSuccess={handleSocialConnect} />
                            <button
                              className={`btn_gray save_button ${hasTelegram ? "verified" : ""}`}
                              onClick={handleVerifyTelegram}
                              disabled={hasTelegram}
                            >
                              <img src={telegramIcon} alt="" />
                              {hasTelegram ? (
                                <span style={{ display: "flex", alignItems: "center", gap: "3px" }}>
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
                                </span>
                              ) : (
                                "Verify Telegram Account"
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
