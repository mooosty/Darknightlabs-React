import "./investment.scss";
import * as Yup from "yup";
import { useFormik } from "formik";
// import { toast } from "react-toastify";
import toast, { Toaster } from "react-hot-toast";
import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { appendToSheet } from "../../utils/googleSheets";
import { setWhitelistMessage } from "../../store/slice/authSlice";
import { projectTypesOptions } from "../../utils/constants/options";
import PledgeForm from "../../components/investments/PledgeForm/PledgeForm";
import { CustomSearch, EmptyData, MultiselectDropDown } from "../../components";
import ContributionForm from "../../components/investments/ContributionForm/ContributionForm";
import ContributionStatus from "../../components/investments/ContributionStatus/ContributionStatus";
import WhitelistVerification from "../../components/investments/WhitelistVerification/WhitelistVerification";
import {
  cardActor1,
  kc,
  cardActor2,
  cardActor3,
  cardActor4,
  cardActor5,
  cardActor6,
  cardActor7,
  cardActor8,
  cardActor9,
  cardActor10,
  cardActor11,
  cardActor12,
  cardActor13,
  cardActor14,
  cardActor15,
  SearchIcon,
  BackArrow,
  showa,
} from "../../utils/constants/images";

const cardData = [
  {
    investmentName: "🌙 SHOWA : The Community Revolution",
    investorImg: showa,
    tags: ["🎮 #Gaming", "💰 #RWA", "🌐 #Community"],
    investments: [
      {
        head: "Token",
        data: "$SHOWA",
      },
      {
        head: "Revenue",
        data: "10% Steam",
      },
      {
        head: "Launch",
        data: "Dec 19",
      },
    ],
    karmaNeeded: 0,
    state: "PLEDGE",
  },
  {
    investmentName: "⚔️ Karate Combat",
    investorImg: kc,
    tags: ["🥋 #Sports", "💪 #Combat", "🌐 #Web3"],
    investments: [
      {
        head: "Token",
        data: "$KARATE",
      },
      {
        head: "Status",
        data: "Incoming",
      },
      {
        head: "Launch",
        data: "TBA",
      },
    ],
    karmaNeeded: 0,
    state: "PLEDGE",
  },
  {
    investmentName: "Investment name",
    investorImg: cardActor3,
    tags: ["🌐 #Metaverse", "🤖 #AI", "👾 #Gaming"],
    investments: [
      {
        head: "Token name",
        data: "$RIFT",
      },
      {
        head: "Round",
        data: "private",
      },
      {
        head: "FDV",
        data: "20mil",
      },
    ],
    karmaNeeded: 0,
    state: "APPLY",
  },
  {
    investmentName: "Investment name",
    investorImg: cardActor4,
    tags: ["🌐 #Metaverse", "🤖 #AI", "👾 #Gaming"],
    investments: [
      {
        head: "Token name",
        data: "$RIFT",
      },
      {
        head: "Round",
        data: "private",
      },
      {
        head: "FDV",
        data: "20mil",
      },
    ],
    karmaNeeded: 0,
    state: "CLOSED",
  },
  {
    investmentName: "Investment name",
    investorImg: cardActor5,
    tags: ["🌐 #Metaverse", "🤖 #AI", "👾 #Gaming"],
    investments: [
      {
        head: "Token name",
        data: "$RIFT",
      },
      {
        head: "Round",
        data: "private",
      },
      {
        head: "FDV",
        data: "20mil",
      },
    ],
    karmaNeeded: 0,
    state: "OPEN",
  },
  {
    investmentName: "Investment name",
    investorImg: cardActor6,
    tags: ["🌐 #Metaverse", "🤖 #AI", "👾 #Gaming"],
    investments: [
      {
        head: "Token name",
        data: "$RIFT",
      },
      {
        head: "Round",
        data: "private",
      },
      {
        head: "FDV",
        data: "20mil",
      },
    ],
    karmaNeeded: 0,
    state: "MY_INVESTMENTS",
  },
  {
    investmentName: "Investment name",
    investorImg: cardActor7,
    tags: ["🌐 #Metaverse", "🤖 #AI", "👾 #Gaming"],
    investments: [
      {
        head: "Token name",
        data: "$RIFT",
      },
      {
        head: "Round",
        data: "private",
      },
      {
        head: "FDV",
        data: "20mil",
      },
    ],
    karmaNeeded: 0,
    state: "OPEN",
  },
  {
    investmentName: "Investment name",
    investorImg: cardActor8,
    tags: ["🌐 #Metaverse", "🤖 #AI", "👾 #Gaming"],
    investments: [
      {
        head: "Token name",
        data: "$RIFT",
      },
      {
        head: "Round",
        data: "private",
      },
      {
        head: "FDV",
        data: "20mil",
      },
    ],
    karmaNeeded: 0,
    state: "APPLY",
  },
  {
    investmentName: "Investment name",
    investorImg: cardActor9,
    tags: ["🌐 #Metaverse", "🤖 #AI", "👾 #Gaming"],
    investments: [
      {
        head: "Token name",
        data: "$RIFT",
      },
      {
        head: "Round",
        data: "private",
      },
      {
        head: "FDV",
        data: "20mil",
      },
    ],
    karmaNeeded: 0,
    state: "CLOSED",
  },
  {
    investmentName: "Investment name",
    investorImg: cardActor10,
    tags: ["🌐 #Metaverse", "🤖 #AI", "👾 #Gaming"],
    investments: [
      {
        head: "Token name",
        data: "$RIFT",
      },
      {
        head: "Round",
        data: "private",
      },
      {
        head: "FDV",
        data: "20mil",
      },
    ],
    karmaNeeded: 0,
    state: "OPEN",
  },
  {
    investmentName: "Investment name",
    investorImg: cardActor11,
    tags: ["🌐 #Metaverse", "🤖 #AI", "👾 #Gaming"],
    investments: [
      {
        head: "Token name",
        data: "$RIFT",
      },
      {
        head: "Round",
        data: "private",
      },
      {
        head: "FDV",
        data: "20mil",
      },
    ],
    karmaNeeded: 0,
    state: "MY_INVESTMENTS",
  },
  {
    investmentName: "Investment name",
    investorImg: cardActor12,
    tags: ["🌐 #Metaverse", "🤖 #AI", "👾 #Gaming"],
    investments: [
      {
        head: "Token name",
        data: "$RIFT",
      },
      {
        head: "Round",
        data: "private",
      },
      {
        head: "FDV",
        data: "20mil",
      },
    ],
    karmaNeeded: 0,
    state: "OPEN",
  },
  {
    investmentName: "Investment name",
    investorImg: cardActor13,
    tags: ["🌐 #Metaverse", "🤖 #AI", "👾 #Gaming"],
    investments: [
      {
        head: "Token name",
        data: "$RIFT",
      },
      {
        head: "Round",
        data: "private",
      },
      {
        head: "FDV",
        data: "20mil",
      },
    ],
    karmaNeeded: 0,
    state: "APPLY",
  },
  {
    investmentName: "Investment name",
    investorImg: cardActor14,
    tags: ["🌐 #Metaverse", "🤖 #AI", "👾 #Gaming"],
    investments: [
      {
        head: "Token name",
        data: "$RIFT",
      },
      {
        head: "Round",
        data: "private",
      },
      {
        head: "FDV",
        data: "20mil",
      },
    ],
    karmaNeeded: 0,
    state: "CLOSED",
  },
  {
    investmentName: "Investment name",
    investorImg: cardActor15,
    tags: ["🌐 #Metaverse", "🤖 #AI", "👾 #Gaming"],
    investments: [
      {
        head: "Token name",
        data: "$RIFT",
      },
      {
        head: "Round",
        data: "private",
      },
      {
        head: "FDV",
        data: "20mil",
      },
    ],
    karmaNeeded: 0,
    state: "OPEN",
  },
];

const hasMaxContributions = false;
const Investment = () => {
  const dispatch = useDispatch();
  const { walletAddress, isWalletVerified, whitelistMessage } = useSelector((state) => state.auth);
  const [activeLayout, setActiveLayout] = useState(["All"]);
  const [showDetails, setShowDetails] = useState(false);
  // const [selectedInvestment, setSelectedInvestment] = useState(null);
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  const detailsLeftRef = useRef(null);
  const detailsRightRef = useRef(null);
  const [isPhase2, setIsPhase2] = useState(false);
  const toggleContainerRef = useRef(null);
  const [showNavButtons, setShowNavButtons] = useState(false);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(false);

  useEffect(() => {
    const fetchPhase = async () => {
      try {
        const response = await fetch("https://winwinsocietyweb3.com/api/investments/1");
        const data = await response.json();
        setIsPhase2(data.phase === 2);
      } catch (error) {
        console.error("Error fetching phase:", error);
      }
    };

    fetchPhase();
  }, []);

  // Add scroll check effect
  useEffect(() => {
    const checkScroll = () => {
      if (toggleContainerRef.current) {
        const { scrollLeft, scrollWidth, clientWidth } = toggleContainerRef.current;
        setShowNavButtons(scrollWidth > clientWidth);
        setCanScrollLeft(scrollLeft > 0);
        setCanScrollRight(scrollLeft < scrollWidth - clientWidth);
      }
    };

    checkScroll();
    window.addEventListener("resize", checkScroll);
    return () => window.removeEventListener("resize", checkScroll);
  }, []);

  // Add scroll handlers
  const handleScrollLeft = () => {
    if (toggleContainerRef.current) {
      toggleContainerRef.current.scrollBy({
        left: -200,
        behavior: "smooth",
      });
    }
  };

  const handleScrollRight = () => {
    if (toggleContainerRef.current) {
      toggleContainerRef.current.scrollBy({
        left: 200,
        behavior: "smooth",
      });
    }
  };

  // Update scroll state on scroll
  const handleScroll = () => {
    if (toggleContainerRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = toggleContainerRef.current;
      setCanScrollLeft(scrollLeft > 0);
      setCanScrollRight(scrollLeft < scrollWidth - clientWidth);
    }
  };

  const syncScroll = (e) => {
    const source = e.target;
    if (source === detailsLeftRef.current) {
      if (detailsRightRef.current.scrollHeight > detailsRightRef.current.clientHeight) {
        detailsRightRef.current.scrollTop = source.scrollTop;
      }
    } else if (source === detailsRightRef.current) {
      if (detailsLeftRef.current.scrollHeight > detailsLeftRef.current.clientHeight) {
        detailsLeftRef.current.scrollTop = source.scrollTop;
      }

      if (
        detailsRightRef.current.scrollTop + detailsRightRef.current.clientHeight >=
        detailsRightRef.current.scrollHeight
      ) {
        if (detailsLeftRef.current.scrollHeight > detailsLeftRef.current.clientHeight) {
          detailsLeftRef.current.scrollTop = detailsRightRef.current.scrollTop;
        }
      }
    }
  };

  const handleCardClick = (data, index) => {
    if (index === 0) {
      // setSelectedInvestment(data);
      setShowDetails(true);
    }
  };

  const handleBackToList = () => {
    setShowDetails(false);
    // setSelectedInvestment(null);
  };

  const [filter, setFilter] = useState({
    types: [],
    searchBy: "",
  });

  // Add filtering logic
  const filteredCards = cardData.filter((card) => {
    // Filter by search text
    const searchMatch =
      !filter.searchBy ||
      card.investmentName.toLowerCase().includes(filter.searchBy.toLowerCase()) ||
      card.tags.some((tag) => tag.toLowerCase().includes(filter.searchBy.toLowerCase())) ||
      card.investments.some(
        (inv) =>
          inv.head.toLowerCase().includes(filter.searchBy.toLowerCase()) ||
          inv.data.toLowerCase().includes(filter.searchBy.toLowerCase())
      );

    // Filter by selected types
    const typeMatch =
      filter.types.length === 0 ||
      card.tags.some((tag) => filter.types.some((type) => tag.toLowerCase().includes(type.toLowerCase())));

    return searchMatch && typeMatch;
  });

  const [filteredProjects, setFilteredProjects] = useState([...cardData]);

  useEffect(() => {
    if (activeLayout.length === 1 && activeLayout[0].toLowerCase() === "all") {
      setFilteredProjects([...cardData]);
    } else {
      setFilteredProjects(
        cardData.filter((card) => activeLayout.some((type) => card.state.toLowerCase().includes(type.toLowerCase())))
      );
    }
  }, [activeLayout]);

  // Update the search handler
  const handleSearch = (value) => {
    setFilter((prev) => ({
      ...prev,
      searchBy: value,
    }));
  };

  // const handleConnectWallet = (address) => {
  //   dispatch(setWalletAddress({ walletAddress: address }));
  // }

  const handleVerificationComplete = (message) => {
    dispatch(setWhitelistMessage({ whitelistMessage: message }));
  };

  const InvestmentForm = () => {
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submitError, setSubmitError] = useState(null);
    const [submitSuccess, setSubmitSuccess] = useState(false);

    const validationSchema = Yup.object({
      name: Yup.string().required("Name is required"),
      telegram: Yup.string().required("Telegram handle is required"),
      twitter: Yup.string().required("Twitter handle is required"),
      role: Yup.string().required("Role is required"),
      inTelegramGroup: Yup.string().required("Please select an option"),
      investmentAmount: Yup.number()
        .required("Investment amount is required")
        .min(1, "Amount must be greater than 0")
        .max(500, "Maximum investment amount is $500"),
      transactionLink: Yup.string().required("Transaction link is required").url("Must be a valid URL"),
      claimWallet: Yup.string()
        .required("Claim wallet is required")
        .matches(/^0x[a-fA-F0-9]{40}$/, "Must be a valid ETH address"),
      holdsApe: Yup.string().required("This field is required"),
      apeOpenseaLink: Yup.string().required("Opensea link is required").url("Must be a valid URL"),
      followsTwitter: Yup.string().required("Please select an option"),
      joinedTwitterList: Yup.string().required("Please select an option"),
    });

    const formik = useFormik({
      initialValues: {
        name: "",
        telegram: "",
        twitter: "",
        role: "",
        inTelegramGroup: "",
        investmentAmount: "",
        transactionLink: "",
        claimWallet: "",
        holdsApe: "",
        apeOpenseaLink: "",
        followsTwitter: "",
        joinedTwitterList: "",
      },
      validationSchema,
      onSubmit: async (values, { resetForm }) => {
        setIsSubmitting(true);
        setSubmitError(null);
        setSubmitSuccess(false);

        try {
          await appendToSheet(values);
          setSubmitSuccess(true);
          resetForm();
        } catch (error) {
          console.error("Form submission error:", error);
          setSubmitError("Failed to submit form. Please try again.");
        } finally {
          setIsSubmitting(false);
        }
      },
    });

    return (
      <form onSubmit={formik.handleSubmit} className="investment-form">
        <div className="form-group">
          <label htmlFor="name">Name*</label>
          <input
            id="name"
            name="name"
            type="text"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.name}
          />
          {formik.touched.name && formik.errors.name && <div className="error">{formik.errors.name}</div>}
        </div>

        <div className="form-group">
          <label htmlFor="telegram">Telegram*</label>
          <input
            id="telegram"
            name="telegram"
            type="text"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.telegram}
          />
          {formik.touched.telegram && formik.errors.telegram && <div className="error">{formik.errors.telegram}</div>}
        </div>

        <div className="form-group">
          <label htmlFor="twitter">Twitter*</label>
          <input
            id="twitter"
            name="twitter"
            type="text"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.twitter}
          />
          {formik.touched.twitter && formik.errors.twitter && <div className="error">{formik.errors.twitter}</div>}
        </div>

        <div className="form-group">
          <label htmlFor="role">Role in the space*</label>
          <input
            id="role"
            name="role"
            type="text"
            placeholder="founder, KOL, VC, degen..."
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.role}
          />
          {formik.touched.role && formik.errors.role && <div className="error">{formik.errors.role}</div>}
        </div>

        <div className="form-group">
          <label>Are you in the Ape Ventures Telegram Group already?*</label>
          <div className="radio-group">
            <label>
              <input
                type="radio"
                name="inTelegramGroup"
                value="inside"
                onChange={formik.handleChange}
                checked={formik.values.inTelegramGroup === "inside"}
              />
              I&apos;m inside already
            </label>
            <label>
              <input
                type="radio"
                name="inTelegramGroup"
                value="justDMed"
                onChange={formik.handleChange}
                checked={formik.values.inTelegramGroup === "justDMed"}
              />
              Just DMed
            </label>
          </div>
          {formik.touched.inTelegramGroup && formik.errors.inTelegramGroup && (
            <div className="error">{formik.errors.inTelegramGroup}</div>
          )}
        </div>

        <div className="form-group">
          <label htmlFor="investmentAmount">Investment Amount ($USDT)*</label>
          <input
            id="investmentAmount"
            name="investmentAmount"
            type="number"
            max="500"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.investmentAmount}
          />
          <div className="payment-details">
            <p>
              <strong>COIN:</strong> $USDT
            </p>
            <p>
              <strong>NETWORK:</strong> SOLANA
            </p>
            <p>
              <strong>ADDRESS:</strong>
              <span
                className="copy-address"
                onClick={() => {
                  navigator.clipboard.writeText("ABCDEFGHIJKLMNOPQRSTUVWXYZ");
                  toast.success("Address copied!", {
                    position: "bottom-center",
                    autoClose: 2000,
                    hideProgressBar: true,
                    closeOnClick: true,
                    style: {
                      background: "var(--card-background)",
                      color: "var(--primary-white)",
                      fontFamily: "MedievalSharp, cursive",
                    },
                  });
                }}
              >
                ABCDEFGHIJKLMNOPQRSTUVWXYZ
              </span>
            </p>
          </div>
          {formik.touched.investmentAmount && formik.errors.investmentAmount && (
            <div className="error">{formik.errors.investmentAmount}</div>
          )}
        </div>

        <div className="form-group">
          <label htmlFor="transactionLink">Transaction Link*</label>
          <input
            id="transactionLink"
            name="transactionLink"
            type="url"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.transactionLink}
          />
          {formik.touched.transactionLink && formik.errors.transactionLink && (
            <div className="error">{formik.errors.transactionLink}</div>
          )}
        </div>

        <div className="form-group">
          <label htmlFor="claimWallet">BASE Claim Wallet*</label>
          <input
            id="claimWallet"
            name="claimWallet"
            type="text"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.claimWallet}
          />
          {formik.touched.claimWallet && formik.errors.claimWallet && (
            <div className="error">{formik.errors.claimWallet}</div>
          )}
        </div>

        <div className="form-group">
          <label>Do you hold a Mutant or a Bored Ape?*</label>
          <div className="radio-group">
            <label>
              <input
                type="radio"
                name="holdsApe"
                value="yes"
                onChange={formik.handleChange}
                checked={formik.values.holdsApe === "yes"}
              />
              Yes
            </label>
            <label>
              <input
                type="radio"
                name="holdsApe"
                value="no"
                onChange={formik.handleChange}
                checked={formik.values.holdsApe === "no"}
              />
              No
            </label>
          </div>
          {formik.touched.holdsApe && formik.errors.holdsApe && <div className="error">{formik.errors.holdsApe}</div>}
        </div>

        <div className="form-group">
          <label htmlFor="apeOpenseaLink">Opensea Link of Ape*</label>
          <input
            id="apeOpenseaLink"
            name="apeOpenseaLink"
            type="url"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.apeOpenseaLink}
          />
          {formik.touched.apeOpenseaLink && formik.errors.apeOpenseaLink && (
            <div className="error">{formik.errors.apeOpenseaLink}</div>
          )}
        </div>

        <div className="form-group">
          <label>Do you follow Ape Ventures and founders on Twitter?*</label>
          <div className="radio-group">
            <label>
              <input
                type="radio"
                name="followsTwitter"
                value="yes"
                onChange={formik.handleChange}
                checked={formik.values.followsTwitter === "yes"}
              />
              Yes
            </label>
            <label>
              <input
                type="radio"
                name="followsTwitter"
                value="justFollowed"
                onChange={formik.handleChange}
                checked={formik.values.followsTwitter === "justFollowed"}
              />
              Wasn&apos;t but I just did
            </label>
          </div>
          {formik.touched.followsTwitter && formik.errors.followsTwitter && (
            <div className="error">{formik.errors.followsTwitter}</div>
          )}
        </div>

        <div className="form-group">
          <label>Did you join Ape Ventures List on Twitter?*</label>
          <div className="radio-group">
            <label>
              <input
                type="radio"
                name="joinedTwitterList"
                value="yes"
                onChange={formik.handleChange}
                checked={formik.values.joinedTwitterList === "yes"}
              />
              Yes
            </label>
            <label>
              <input
                type="radio"
                name="joinedTwitterList"
                value="justJoined"
                onChange={formik.handleChange}
                checked={formik.values.joinedTwitterList === "justJoined"}
              />
              Wasn&apos;t but I just did
            </label>
          </div>
          {formik.touched.joinedTwitterList && formik.errors.joinedTwitterList && (
            <div className="error">{formik.errors.joinedTwitterList}</div>
          )}
        </div>

        {submitError && <div className="error-message">{submitError}</div>}

        {submitSuccess && <div className="success-message">Form submitted successfully!</div>}

        <button type="submit" className="submit-button" disabled={isSubmitting}>
          {isSubmitting ? "Submitting..." : "Submit"}
        </button>
      </form>
    );
  };

  const handleActive = (type) => {
    const loweCaseType = type.toLowerCase();
    setActiveLayout((prev) => {
      if (loweCaseType === "all") {
        return ["all"];
      }
      const newTypes = prev.includes(loweCaseType)
        ? prev.filter((t) => t !== loweCaseType)
        : [...prev.filter((t) => t.toLowerCase() !== "all"), loweCaseType];
      return newTypes.length === 0 ? ["all"] : newTypes;
    });
  };

  return (
    <div className="investment_wrapper">
      {!showDetails ? (
        <>
          <div className="investments_content_header">
            <div className="content_left">
              <h2>Investment</h2>
              <div className="search_wrap">
                <CustomSearch
                  value={filter.searchBy}
                  onChange={handleSearch}
                  placeholder="Search"
                  isOpen={isSearchOpen}
                  setIsOpen={setIsSearchOpen}
                />
              </div>
            </div>
            {isSearchOpen && (
              <div className="mobile_search">
                <span className="icon">
                  <SearchIcon />
                </span>
                <input
                  value={filter.searchBy}
                  onChange={(e) => handleSearch(e.target.value)}
                  type="text"
                  placeholder="Search"
                />
              </div>
            )}
            <div className="content_right">
              <a href="#">Darknight Labs</a>
            </div>
          </div>
          <div className="investments_page_data">
            <div className={`page_data ${isSearchOpen ? "search_open" : ""}`}>
              <div className="investment_page_header">
                <div className="investment_toggleWrap">
                  {showNavButtons && (
                    <button
                      className={`nav_button prev ${!canScrollLeft ? "hidden" : ""}`}
                      onClick={handleScrollLeft}
                      aria-label="Scroll left"
                    >
                      ←
                    </button>
                  )}
                  <div className="toggle_buttons_container" ref={toggleContainerRef} onScroll={handleScroll}>
                    <button
                      className={`investment_toggle_btn ${activeLayout.includes("all") ? "active" : ""}`}
                      onClick={() => handleActive("ALL")}
                    >
                      <span>All </span>
                    </button>
                    <button
                      className={`investment_toggle_btn ${activeLayout.includes("closed") ? "active" : ""}`}
                      onClick={() => handleActive("CLOSED")}
                    >
                      <span>Closed</span>
                    </button>
                    <button
                      className={`investment_toggle_btn ${activeLayout.includes("open") ? "active" : ""}`}
                      onClick={() => handleActive("OPEN")}
                    >
                      <span>Open</span>
                    </button>
                    <button
                      className={`investment_toggle_btn ${activeLayout.includes("pledge") ? "active" : ""}`}
                      onClick={() => handleActive("PLEDGE")}
                    >
                      <span>Pledge</span>
                    </button>
                    <button
                      className={`investment_toggle_btn ${activeLayout.includes("apply") ? "active" : ""}`}
                      onClick={() => handleActive("APPLY")}
                    >
                      <span>Apply</span>
                    </button>
                    <button
                      className={`investment_toggle_btn ${activeLayout.includes("my_investments") ? "active" : ""}`}
                      onClick={() => handleActive("MY_INVESTMENTS")}
                    >
                      <span>My Investments</span>
                    </button>
                  </div>
                  {showNavButtons && (
                    <button
                      className={`nav_button next ${!canScrollRight ? "hidden" : ""}`}
                      onClick={handleScrollRight}
                      aria-label="Scroll right"
                    >
                      →
                    </button>
                  )}
                </div>
                <div className="selects">
                  <MultiselectDropDown
                    options={projectTypesOptions}
                    placeholder={"All types"}
                    onApply={(currentOptions) => {
                      setFilter({
                        ...filter,
                        types: currentOptions?.map((option) => option.value),
                      });
                    }}
                  />
                </div>
              </div>
              <div className="investment_page_body">
                {walletAddress && !isWalletVerified && (
                  <div className="wallet_details_wrap">
                    <WhitelistVerification
                      walletAddress={walletAddress}
                      onVerificationComplete={handleVerificationComplete}
                    />
                  </div>
                )}

                {walletAddress && isWalletVerified && !hasMaxContributions && (
                  <div className="md:col-span-3">
                    <ContributionForm walletAddress={walletAddress} whitelistSignature={whitelistMessage} />
                  </div>
                )}

                {walletAddress && (
                  <div className="contribution_status_wrap">
                    <ContributionStatus walletAddress={walletAddress} />
                  </div>
                )}

                <div className="card_container">
                  {filteredProjects.length === 0 ? (
                    <EmptyData />
                  ) : (
                    <>
                      {filteredProjects.map((data, index) => {
                        return (
                          <div className="card_wrap" key={index} onClick={() => handleCardClick(data, index)}>
                             <div
                              className="card"
                              style={{
                                filter: data.investmentName?.toLowerCase().includes('showa') || data.investmentName?.toLowerCase().includes('karate') ? 'none' : 'blur(12px)',
                              
                                transition: 'transform 0.2s ease',
                              }}
                            >
                               <div className="card_image">
                                <img src={data.investorImg} alt="" />
                              </div>
                              <div className="card_body">
                                <div className="name">{data.investmentName}</div>
                                <div className="tabs">
                                  {data.investments.map((tag, index) => {
                                    return (
                                      <div className={``} key={index}>
                                        <div className="investment_tag">
                                          <>
                                            {tag.head}:{tag.data}
                                          </>
                                        </div>
                                      </div>
                                    );
                                  })}
                                </div>
                                <div className="tabs">
                                  {data.tags.map((data, index) => {
                                    return (
                                      <div className={``} key={index}>
                                        <div className="meta_tag">
                                          <>{data}</>
                                        </div>
                                      </div>
                                    );
                                  })}
                                </div>
                                {data.karmaNeeded !== undefined && (
                                  <div className="karma_needed">Karma needed: {data.karmaNeeded}</div>
                                )}
                                {(index === 0 || index === 1) && (
                                  <div className={`investment_state ${index === 0 ? (isPhase2 ? "pledge_mode" : "invest_mode") : "incoming_mode"}`}>
                                    {index === 0 ? (isPhase2 ? "Pledge" : "Invest") : "Incoming"}
                                  </div>
                                )}
                              </div>
                            </div>
                          </div>
                        );
                      })}
                    </>
                  )}
                </div>
                {/* <div className="investment_pagination">
                  <div className="investment_pagination_content">
                    <div className="investment_pagination_content_text">
                      <span className='pagination_head'>Row per page:</span>
                      <span className='pagination_dropdown'>
                        <select name="page" id="page" >
                          <option value="12">12</option>
                          <option value="10">10</option>
                          <option value="8">8</option></select></span>
                      <span className='pagination_pages'>1-5 of 13</span>
                      <div className="investment_pagination_content_arrows">
                        <button className={`table_pagination_content_button`}>
                          <LeftIcon />
                        </button>
                        <button className={`table_pagination_content_button`}>
                          <RightIcon />
                        </button>
                      </div>
                    </div>
                  </div>
                </div> */}
              </div>
            </div>
          </div>
        </>
      ) : (
        <div className="investment_details">
          <div className="investments_content_header">
            <div className="content_left">
              <h2>Investment Details</h2>
            </div>
          </div>
          <div className="investments_page_data">
            <h2 className={`floating_form_title ${isPhase2 ? "pledge_mode" : "invest_mode"}`}>
              {isPhase2 ? "Pledge" : "Invest"}
            </h2>
            <div className="page_data">
              <div className="investment_page_body">
                <div className="investment_details_content">
                  <div ref={detailsLeftRef} className="details_left" onScroll={syncScroll}>
                    <div className="investment-header">
                      <button className="back_arrow" onClick={handleBackToList}>
                        <BackArrow />
                      </button>
                      <h1 className="title">🌙 SHOWA : The Community Revolution</h1>
                      <div className="description">
                        <p className="highlight-text">
                          Join the community-driven movement behind Showa American Story, transforming from a banned
                          game to a revolutionary token ecosystem with real utility and Steam revenue sharing.
                        </p>
                      </div>
                    </div>

                    <div className="section vision-section">
                      <h2 className="section-title">💫 Deal Details</h2>
                      
                      <div className="stage-details">
                        <div className="stage-block deal-structure">
                          <h3 className="stage-title">Deal Structure</h3>
                          <ul className="stage-description deal-list">
                            <li><span className="deal-label">FDV of the OTC deal:</span> 10mil FDV</li>
                            <li><span className="deal-label">Vesting:</span> 3 months</li>
                            <li><span className="deal-label">Current FDV in market:</span> 34mil</li>
                            <li><span className="deal-label">Allocation:</span> Extremely tight, it's a strategic round for angel investors who will provide some type of value (social, attention, network, etc)</li>
                          </ul>
                        </div>
                      </div>

                      <div className="section-intro important-notice">
                        <h3 className="important-title">Important:</h3>
                        <p className="important-text">
                          At The Win-Win Society, when we bring strategic rounds, we track a few key elements to ensure 
                          interactions between strategic investors and projects are as win-win as it gets.
                        </p>
                      </div>

                      <div className="stage-details">
                        <div className="stage-block tracking-elements">
                          <h3 className="stage-title">Key Tracking Elements</h3>
                          <ul className="stage-description tracking-list">
                            <li>
                              <span className="score-label">Reputation Score:</span>
                              <span className="score-description">Your value-add delivery - do you do what you actually promise for our partners in these strategic rounds?</span>
                            </li>
                            <li>
                              <span className="score-label">Loyalty Score:</span>
                              <span className="score-description">Your behavior with the tokens you get - as we provide exceptional deals to our members, that often allow you to break even or even profit since the first unlock, we observe your behavior: do you instant dump?</span>
                            </li>
                            <li>
                              <span className="score-label">Karma Score:</span>
                              <span className="score-description">Related to the people you bring in and their caliber (founders, C-levels, VC GPs, whales, influential figures, etc.). <a href="#" className="karma-link">Click here</a> to get your invite code and start increasing your Karma Score.</span>
                            </li>
                          </ul>
                        </div>

                        <div className="stage-block impact-section">
                          <h3 className="stage-title">Impact on Future Deals</h3>
                          <p className="stage-description impact-text">
                            All these elements will impact in different ways your access and prioritization in next deals, 
                            via a mix of objective and subjective metrics.
                          </p>
                          <p className="stage-description impact-text">
                            For example, if you're bringing crazy value to our partners, have the highest Karma score, 
                            but aren't the strongest Diamond Hands, you might still be prioritized in upcoming strategic deals.
                          </p>
                        </div>

                        <div className="stage-block">
                          <p className="stage-description highlight-text best-practice">
                            Best practice is to keep all these in mind, while doubling down on your strengths to be a 
                            highly valued strategic investor, and get access to some crazy deals.
                          </p>
                        </div>
                      </div>
                    </div>

                    <div className="section details-section">
                      <h2 className="section-title">🎮 Project Details</h2>
                      <div className="details-grid">
                        <div className="detail-item">Gaming, Community Token, Revenue Sharing</div>
                        <div className="detail-item">Backed by Real Game Revenue</div>
                        <div className="detail-item">Multiple Growth Catalysts</div>
                        <div className="detail-item">Strong Community Foundation</div>
                      </div>
                    </div>

                    <div className="section features-section">
                      <h2 className="section-title">🚀 Why SHOWA?</h2>
                      <div className="features-grid">
                        <div className="feature-item">
                          <span className="feature-highlight">Real Utility:</span> Integration with TheGame.fun platform
                        </div>
                        <div className="feature-item">
                          <span className="feature-highlight">Revenue Sharing:</span> 10% of lifetime Steam revenue
                        </div>
                        <div className="feature-item">
                          <span className="feature-highlight">Strong Community:</span> 200K members and growing
                        </div>
                        <div className="feature-item">
                          <span className="feature-highlight">Multiple Growth Stages:</span> Planned catalysts for
                          sustainable growth
                        </div>
                      </div>
                    </div>

                    <div className="section backers-section">
                      <h2 className="section-title">👑 Backed by</h2>
                      <div className="backers-grid">
                        <div className="backer-item">Oneness Labs</div>
                        <div className="backer-item">TheGame.fun Platform</div>
                        <div className="backer-item">4K+ NFT Holders</div>
                        <div className="backer-item">100+ Major Buyers</div>
                        <div className="backer-item">200K Community Members</div>
                      </div>
                    </div>

                    <div className="section security-section">
                      <h2 className="section-title">🔒 Security & Ownership</h2>
                      <div className="security-grid">
                        <div className="security-item">Community-Driven Development</div>
                        <div className="security-item">Transparent Revenue Sharing Model</div>
                        <div className="security-item">Multiple Utility Integrations</div>
                        <div className="security-item">Sustainable Growth Strategy</div>
                      </div>
                    </div>

                    <div className="section movement-section">
                      <h2 className="section-title">🌙 Join the SHOWA Revolution</h2>
                      <p className="movement-text">
                        Be part of a unique journey from banned game to revolutionary token ecosystem. Together, we're
                        building something unprecedented in the gaming space!
                      </p>
                      <div className="stars">✨ The Future of Gaming Communities Starts Here ✨</div>
                    </div>
                  </div>
                  <div ref={detailsRightRef} className="details_right" onScroll={syncScroll}>
                    <div className="form_container">
                      {!isPhase2 ? (
                        <InvestmentForm />
                      ) : (
                        <PledgeForm
                          onSubmit={async (pledgeData) => {
                            try {
                              console.log("Pledge submitted:", pledgeData);
                              toast.success("Pledge submitted successfully");
                            } catch (error) {
                              console.error("Error submitting pledge:", error);
                              toast.error("Failed to submit pledge");
                            }
                          }}
                        />
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Investment;
