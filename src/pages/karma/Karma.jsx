import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import axios from "axios";
import "./karma.scss";
// import { toast } from "react-toastify";
import toast, { Toaster } from "react-hot-toast";
import { CopyIcon, CheckIcon } from "../../utils/constants/images";
import { KarmaIcon } from "../../utils/SVGs/SVGs";
 

const Karma = () => {
  const [showInvitePopup, setShowInvitePopup] = useState(false);
  const [inviteLink, setInviteLink] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [isCopyLink, setIsCopyLink] = useState(false);
  const userData = useSelector((state) => state.auth);
  const { userDetails } = useSelector((state) => state.user);

  useEffect(() => {
    // Simple check to ensure we have user details
    const checkUserDetails = () => {
      if (userDetails) {
        setIsLoading(false);
      } else {
        // If no user details, you might want to redirect to login
        toast.error("Please login to view karma points");
        setIsLoading(false);
      }
    };

    checkUserDetails();
  }, [userDetails]);

  if (isLoading) {
    return <div className="karma_page">Loading...</div>;
  }

  // Use currency_b as karma points
  const karmaStats = {
    totalKarmaPoints: userDetails?.currency_b || 0,
    directInvites: 0,
    level1Invites: 0,
    level2Invites: 0,
    karmaBreakdown: [
      { label: "Direct Invites", points: 0, count: 0 },
      { label: "Level 1 Referrals", points: 0, count: 0 },
      { label: "Level 2 Referrals", points: 0, count: 0 },
    ],
  };

  const handleGenerateLink = async () => {
    console.log("userDetails.username");

    try {
      if (!userDetails?.username) {
        toast.dismiss();
        toast("Username not found. Please complete your profile first.");
        return;
      }
      const response = await axios.post("https://winwinsocietyweb3.com/api/tiny-url/", {
        alias: userData?.userId.toString(),
        username: userDetails.username,
      });
      setInviteLink(response.data.tiny_url);
      setShowInvitePopup(true);
    } catch (error) {
      console.error("Error generating link:", error);
      toast.error("Failed to generate invite link");
    }
  };

  const handleCopyLink = () => {
    setIsCopyLink(true)
    navigator.clipboard
      .writeText(inviteLink)
      .then(() => {
        toast.success("Link copied to clipboard");
      })
      .catch(() => {
        toast.error("Failed to copy link");
      });
    setTimeout(() => {
      setIsCopyLink(false);
    }, 1000);
  };

  return (
    <div className="karma_page">
      <Toaster
        position="bottom-center"
        toastOptions={{
          className: "",
          duration: 5000,
          style: {
            background: "#242623",
            color: "var(--primary-white)",
            textAlign: "center", // Center the text
            fontSize: "18px", // Increase the font size
            padding: "20px", // Add some padding
            border: "1px solid #ff8a1c", // Add orange border top
          },
          // Default options for specific types
          success: {
            duration: 3000,
            theme: {
              primary: "green",
              secondary: "black",
            },
          },
        }}
      />
      <div className="karma_content_header">
        <div className="karma_content_left">
          <h2>Karma Points</h2>
        </div>
      </div>

      <div className="karma_page_data">
        <div className="page_data">
          <div className="karma_overview">
            <div className="karma_total">
              <h3>Total Karma Points</h3>
              <div className="points">
                {karmaStats.totalKarmaPoints}
                <KarmaIcon style={{ width: '1em', height: '1em' }} />
              </div>
            </div>

            <div className="karma_stats">
              <div className="stat_item">
                <span className="label">Direct Invites</span>
                <span className="value">{karmaStats.directInvites}</span>
              </div>
              <div className="stat_item">
                <span className="label">Level 1 Referrals</span>
                <span className="value">{karmaStats.level1Invites}</span>
              </div>
              <div className="stat_item">
                <span className="label">Level 2 Referrals</span>
                <span className="value">{karmaStats.level2Invites}</span>
              </div>
            </div>

            <button className="generate_link_btn" onClick={handleGenerateLink}>
              Generate Invite Link
            </button>
          </div>

          <div className="karma_explanation">
            <h3>How Karma Points Work</h3>
            <div className="explanation_content">
              <p>Earn Karma Points (KP) by inviting new members to join our community:</p>
              <ul>
                <li>
                  <strong>Direct Invites (Level 0):</strong> Earn 100 KP when someone you invited completes registration
                </li>
                <li>
                  <strong>Level 1 Referrals:</strong> Earn 20 KP (20%) when someone invited by your direct invite brings
                  in a new member
                </li>
                <li>
                  <strong>Level 2 Referrals:</strong> Earn 10 KP (10%) when a Level 1 referral&apos;s invite brings in a new
                  member
                </li>
              </ul>
            </div>
          </div>

          <div className="karma_breakdown">
            <h3>Your Karma Breakdown</h3>
            <div className="breakdown_list">
              {karmaStats.karmaBreakdown.map((item, index) => (
                <div key={index} className="breakdown_item">
                  <div className="breakdown_label">{item.label}</div>
                  <div className="breakdown_details">
                    <span className="count">{item.count} invites</span>
                    <span className="points">+{item.points} KP</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {showInvitePopup && (
        <div className="popup_overlay">
          <div className="popup_content">
            <h3>Here is your invite link, share it to receive Karma Points (KP)</h3>
            <div className="link_container">
              <p>{inviteLink}0</p>
              <button className="copy_btn" onClick={handleCopyLink}>
                {isCopyLink ? <CheckIcon /> : <CopyIcon />}
              </button>
            </div>
            <button className="btn_gray" onClick={() => setShowInvitePopup(false)}>
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Karma;
