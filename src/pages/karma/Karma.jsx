import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import "./karma.scss";
import toast, { Toaster } from "react-hot-toast";
import copyIcon from "../../assets/copy-icon.svg";
import { KarmaIcon } from "../../utils/SVGs/SVGs";
import { axiosApi } from "../../api-services/service";

const MAX_VISIBLE_NODES = 5;

const truncateNodes = (nodes = []) => {
    if (!nodes || nodes.length <= 5) return nodes;
    
    const firstTwo = nodes.slice(0, 2);
    const lastTwo = nodes.slice(-2);
    const hiddenCount = nodes.length - 4;
    return [...firstTwo, `...+${hiddenCount * 10}KP`, ...lastTwo];
};

const Karma = () => {
  const [showInvitePopup, setShowInvitePopup] = useState(false);
  const [inviteLink, setInviteLink] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [inviteTree, setInviteTree] = useState({
    level1: [],
    level2: [],
    level3: []
  });
  const userData = useSelector((state) => state.auth);
  const { userDetails } = useSelector((state) => state.user);

  useEffect(() => {
    const fetchInviteTree = async () => {
      try {
        const response = await axiosApi.get(`/invites/tree/${userData?.userId}`);
        setInviteTree(response.data);
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

  if (isLoading) {
    return <div className="karma_page">Loading...</div>;
  }

  // Calculate karma points based on invite levels
  const calculateKarmaPoints = () => {
    const directInvites = inviteTree.level1?.length || 0;
    const level1Invites = inviteTree.level2?.length || 0;
    const level2Invites = inviteTree.level3?.length || 0;

    const directPoints = directInvites * 100;  // 100 KP per direct invite
    const level1Points = level1Invites * 20;   // 20 KP per level 1 referral
    const level2Points = level2Invites * 10;   // 10 KP per level 2 referral

    return {
      totalKarmaPoints: userDetails?.currency_b || (directPoints + level1Points + level2Points),
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

  const handleGenerateLink = async () => {
    try {
      if (!userDetails?.username) {
        toast.dismiss();
        toast("Username not found. Please complete your profile first.");
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
    navigator.clipboard
      .writeText(inviteLink)
      .then(() => {
        toast.success("Link copied to clipboard");
      })
      .catch(() => {
        toast.error("Failed to copy link");
      });
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
            color: "#fff",
            textAlign: "center",
            fontSize: "18px",
            padding: "20px",
            border: "1px solid #ff8a1c",
          },
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
                  <strong>Level 2 Referrals:</strong> Earn 10 KP (10%) when a Level 1 referral's invite brings in a new
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

          <div className="invite_tree">
            <h3>Your Invite Tree</h3>
            <div className="tree_container">
              <div className="tree_node root">
                <div className="node_content">
                  <span className="username">{userDetails?.username || "You"}</span>
                  <span className="invite_count">{karmaStats.directInvites + karmaStats.level1Invites + karmaStats.level2Invites} Total</span>
                </div>
                <div className="branches level1">
                  {truncateNodes(inviteTree.level1)?.map((username, index) => (
                    <div key={index} className="tree_node">
                      <div className="node_content">
                        <span className="username">{username}</span>
                        <span className="invite_count">+100 KP</span>
                      </div>
                      <div className="branches level2">
                        {truncateNodes(
                          inviteTree.level2?.filter((_, i) => 
                            Math.floor(i / (inviteTree.level2.length / inviteTree.level1.length)) === index
                          )
                        )?.map((username, subIndex) => (
                          <div key={subIndex} className="tree_node">
                            <div className="node_content">
                              <span className="username">Level 2 Invite</span>
                              <span className="invite_count">+20 KP</span>
                            </div>
                            <div className="branches level3">
                              {truncateNodes(inviteTree.level3)?.map((username, subSubIndex) => (
                                <div key={subSubIndex} className="tree_node">
                                  <div className="node_content">
                                    <span className="username">
                                      {username.includes('...') ? username : 'Level 3 Invite'}
                                    </span>
                                    <span className="invite_count">
                                      {username.includes('...') ? '' : '+10 KP'}
                                    </span>
                                  </div>
                                </div>
                              ))}
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
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
                <img src={copyIcon} alt="Copy" />
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
