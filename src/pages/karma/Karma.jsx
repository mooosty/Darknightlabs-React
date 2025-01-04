import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { FaChevronDown } from "react-icons/fa";
import "./karma.scss";
import toast, { Toaster } from "react-hot-toast";
import { CopyIcon, CheckIcon } from "../../utils/constants/images";
import { KarmaIcon } from "../../utils/SVGs/SVGs";
import { axiosApi } from "../../api-services/service";
import { useNavigate } from "react-router-dom";

const Karma = () => {
  const navigate = useNavigate();
  const [currentKarma, setCurrentKarma] = useState(0);

  const [isExpanded, setIsExpanded] = useState(false);
  const [showInvitePopup, setShowInvitePopup] = useState(false);
  const [inviteLink, setInviteLink] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [isCopyLink, setIsCopyLink] = useState(false);
  const [inviteData, setInviteData] = useState({
    level1: [],
    level2: [],
    level3: [],
  });
  const userData = useSelector((state) => state.auth);
  const { userDetails } = useSelector((state) => state.user);

  useEffect(() => {
    const fetchInviteTree = async () => {
      try {
        const response = await axiosApi.get(`/invites/tree/${userData?.userId}`);
        setInviteData(response.data);
        setIsLoading(false);
      } catch (error) {
        console.error("Error fetching invite tree:", error);
        toast.error("Failed to fetch invite data");
        setIsLoading(false);
      }
    };

    if (userData?.userId) {
      fetchInviteTree();
    } else {
      setIsLoading(false);
    }
  }, [userData?.userId]);

  const calculateKarmaPoints = () => {
    const directInvites = inviteData.level1?.length || 0;
    const level1Invites = inviteData.level2?.length || 0;
    const level2Invites = inviteData.level3?.length || 0;

    const directPoints = directInvites * 100; // 100 KP per direct invite
    const level1Points = level1Invites * 20; // 20 KP per level 1 referral
    const level2Points = level2Invites * 10; // 10 KP per level 2 referral

    return {
      totalKarmaPoints: userDetails?.currency_b || directPoints + level1Points + level2Points,
      directInvites,
      level1Invites,
      level2Invites,
      karmaBreakdown: [
        { label: "Direct Invites", points: directPoints, count: directInvites },
        { label: "Level 1 Referrals", points: level1Points, count: level1Invites },
        { label: "Level 2 Referrals", points: level2Points, count: level2Invites },
      ],
    };
  };

  const karmaStats = calculateKarmaPoints();

  useEffect(() => {
    const incrementKarma = () => {
      if (currentKarma < karmaStats.totalKarmaPoints) {
        setCurrentKarma(Math.min(karmaStats.totalKarmaPoints, currentKarma + 5));
      }
    };

    const timeoutId = setTimeout(incrementKarma, 0.01); // Adjust the delay as needed

    return () => clearTimeout(timeoutId); // Cleanup on component unmount
  }, [currentKarma, karmaStats.totalKarmaPoints]);

  const handleGenerateLink = async () => {
    try {
      if (!userDetails?.username) {
        toast.dismiss();
        toast((t) => (
          <span onClick={() => {
            toast.dismiss(t.id);
            navigate("/profile");
          }} style={{ cursor: "pointer" }}>
            Username not found. Please complete your profile first.
          </span>
        ));
        return;
      }
      const response = await axiosApi.post("/tiny-url/", {
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
    setIsCopyLink(true);
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

  const toggleExpand = () => {
    setIsExpanded(!isExpanded);
  };

  return (
    <div className="karma_page">
      

      <div className="karma_content_header">
        <div className="karma_content_left">
          <h2>Karma Points</h2>
        </div>
      </div>

      <div className="karma_page_data">
        <div className="page_data">
          <div className="karma_overview" style={{ cursor: 'default' }}>
            <div className="section-header">
              <h3>Total Karma Points</h3>
            </div>

            <div className="karma_total">
              <div className="points">
                {currentKarma}
                <KarmaIcon style={{ width: "1.2em", height: "1.2em", marginLeft: "8px" }} />
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

          <div className="karma_explanation_section">
            <div
              className="section-header"
              onClick={toggleExpand}
              style={{
                display: "flex",
                justifyContent: "space-between",
                // alignItems: "center",
                marginBottom: "16px",
                cursor: "pointer",
              }}
            >
              <h3>How Karma Points Work</h3>
              <div
                className="read-more-btn"
                onClick={(e) => {
                  e.stopPropagation();
                  toggleExpand();
                }}
                style={{
                  background: "none",
                  border: "none",
                  color: "#DCCA87",
                  cursor: "pointer",
                  fontSize: "16px",
                  // padding: "4px 8px",
                  marginLeft: "auto",
                  fontFamily: "MedievalSharp",
                  letterSpacing: "0.5px",
                  textTransform: "capitalize",
                }}
              >
                {isExpanded ? "Read Less" : "Read More"}
              </div>
            </div>
            <div className={`karma_explanation ${isExpanded ? "expanded" : ""}`}>
              {isExpanded ? (
                <>
                  <div className="karma-details" style={{ marginTop: "24px" }}>
                    {/* <h3 style={{ color: '#f5efdb' }}>KARMA</h3>
                    
                    <div className="section" style={{ marginTop: '16px' }}>
                      <h4 style={{ color: '#DCCA87' }}>How Karma Points Work</h4>
                      <p style={{ marginTop: '8px' }}>Karma Points (KP) are earned through a multi-level referral system:</p>
                      <ul style={{ marginTop: '8px' }}>
                        <li>Direct invites: <span className="highlight">100 KP</span> for each person you invite</li>
                        <li>Level 1 referrals: <span className="highlight">20 KP</span> for each person your invitees invite</li>
                        <li>Level 2 referrals: <span className="highlight">10 KP</span> for each person your Level 1 referrals invite</li>
                      </ul>
                    </div> */}

                    <div className="section" style={{ marginTop: "24px" }}>
                      <h4 style={{ color: "#DCCA87" }}>What are Karma Points?</h4>
                      <p style={{ marginTop: "8px" }}>
                        Karma Points (KP) are a measure of your contribution and influence in The Win-Win Society. They serve multiple purposes:
                      </p>
                      <ul style={{ marginTop: "8px" }}>
                        <li>Access to exclusive deals and opportunities</li>
                        <li>Priority in oversubscribed investments</li>
                        <li>Recognition within the community</li>
                        <li>Unlock special features and benefits</li>
                      </ul>
                    </div>

                    <p style={{ marginTop: "24px", color: "#DCCA87", fontSize: "18px", fontWeight: "bold" }}>
                      There are two ways to increase your Karma level in The Win-Win Society:
                    </p>

                    <ol style={{ marginTop: "16px" }}>
                      <li>
                        <strong className="highlight" style={{ color: "#DCCA87" }}>
                          Invite high tier individuals.
                        </strong>{" "}
                        Founders, VC partners, Family offices, Influencial people, etc.
                        <p style={{ marginTop: "8px" }}>
                          You get <span className="highlight">100 Karma minimum</span> everytime someone new is coming from you (after being vetted
                          and accepted)
                        </p>
                        <p style={{ marginTop: "8px" }}>
                          For the highest tier people, you will get bonuses (e.g. if you bring Elon Musk to The Win-Win Society, we'll give you more
                          than 100 Karma Points)
                        </p>
                        <p style={{ marginTop: "8px" }}>
                          Furthermore, if they invite people themselves, you get <span className="highlight">20%</span> of the Karma they generated
                          back to you.
                        </p>
                        <p style={{ marginTop: "8px" }}>
                          And if their people invite more people, you then get <span className="highlight">10%</span> of these in Karma. Therefore,
                          there is an incentive to bring people with a rich network, as it will benefit you too.
                        </p>
                      </li>

                      <li style={{ marginTop: "16px" }}>
                        <strong className="highlight" style={{ color: "#DCCA87" }}>
                          Win, then pay what you want.
                        </strong>
                        <p style={{ marginTop: "8px" }}>
                          The Win-Win Society doesn't charge any fees from your investments. No cut, no management fees, no carry, no nothing.
                        </p>
                        <p style={{ marginTop: "8px" }}>
                          However, we give you the possibility, once you win with us, to give back — if you desire to do so. (hence "win, then pay
                          what you want)
                        </p>
                        <p style={{ marginTop: "8px" }}>
                          Say you put in 10k and it turns to 100k, you might feel like you wanna give 10%, 15%, 20% of that.
                        </p>
                        <p style={{ marginTop: "8px" }}>
                          If you decide to give back, you will earn KARMA, which will give you priority access for next deals with limited supply.
                        </p>
                        <p style={{ marginTop: "8px" }}>
                          Additionally, if you bring people in who end up giving back as well, you will get <span className="highlight">20%</span> of
                          their KARMA based on their contribution. And if they bring their own network in, you will get{" "}
                          <span className="highlight">10%</span> from the people they invite.
                        </p>
                        <p style={{ marginTop: "8px" }}>This makes it win-win for you as well to bring people in who will invest and give back.</p>
                      </li>
                    </ol>

                    <div className="section" style={{ marginTop: "24px" }}>
                      <h4 style={{ color: "#DCCA87" }}>Why the "Win, then pay what you want" model?</h4>
                      <p style={{ marginTop: "8px" }}>
                        WWS is not a charity, rather a bet on the natural law of reciprocity that is inherent to human beings (especially those with a
                        win-win mindset, the people who we are targeting).
                      </p>
                      <p style={{ marginTop: "8px" }}>
                        It's also a testimony in our confidence in the fact that we know we can deliver great deals, we therefore give you the leeway
                        to win first, then contribute back later - if you decide to do so -, making our incentives very aligned, as we're not making
                        money off of you either way, just by taking a cut from any raise, no matter if it perform well or not.
                      </p>
                      <p style={{ marginTop: "8px" }}>
                        Finally, we believe that it emphasizes our win-win frame in a very powerful way. As you contribute back based on your own
                        initiative, we anticipate that to solidify an exceptional level of trust and goodwill, making it a truly healthy, win-win
                        ecosystem.
                      </p>
                    </div>
                  </div>

                  <div style={{ marginTop: "24px" }}>
                    <p style={{ marginTop: "16px" }}>Your Karma Points are calculated based on your referral network:</p>
                    <ul style={{ marginTop: "8px", marginBottom: "16px" }}>
                      <li>
                        <strong>Direct Invites:</strong> 100 KP for each person you directly invite
                      </li>
                      <li>
                        <strong>Level 1 Referrals:</strong> 20 KP for each person your invitees bring in
                      </li>
                      <li>
                        <strong>Level 2 Referrals:</strong> 10 KP for each person your Level 1 referrals invite
                      </li>
                    </ul>
                  </div>
                </>
              ) : (
                <>
                  <p style={{ marginTop: "16px" }}>Your Karma Points are calculated based on your referral network:</p>
                  <ul style={{ marginTop: "8px", marginBottom: "16px" }}>
                    <li>
                      <strong>Direct Invites:</strong> 100 KP for each person you directly invite
                    </li>
                    <li>
                      <strong>Level 1 Referrals:</strong> 20 KP for each person your invitees bring in
                    </li>
                    <li>
                      <strong>Level 2 Referrals:</strong> 10 KP for each person your Level 1 referrals invite
                    </li>
                  </ul>
                </>
              )}
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
              <p>{inviteLink}</p>
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
