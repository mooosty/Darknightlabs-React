import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import axios from 'axios';
import './karma.scss';
import { toast } from 'react-toastify';
import copyIcon from '../../assets/copy-icon.svg';

const Karma = () => {
    const [showInvitePopup, setShowInvitePopup] = useState(false);
    const [inviteLink, setInviteLink] = useState("");
    const userData = useSelector((state) => state.auth);
    const { userDetails } = useSelector((state) => state.user);

    // Use currency_b as karma points
    const karmaStats = {
        totalKarmaPoints: userDetails?.currency_b || 0,
        directInvites: 0,
        level1Invites: 0,
        level2Invites: 0,
        karmaBreakdown: [
            { label: 'Direct Invites', points: 0, count: 0 },
            { label: 'Level 1 Referrals', points: 0, count: 0 },
            { label: 'Level 2 Referrals', points: 0, count: 0 }
        ]
    };

    const handleGenerateLink = async () => {
        try {
            const response = await axios.post('https://winwinsocietyweb3.com/api/tiny-url/', {
                alias: userData?.userId.toString(),
                username: userDetails?.username
            });
            setInviteLink(response.data.tiny_url);
            setShowInvitePopup(true);
        } catch (error) {
            toast.error("Failed to generate invite link");
        }
    };

    const handleCopyLink = () => {
        navigator.clipboard.writeText(inviteLink)
            .then(() => {
                toast.success("Link copied to clipboard");
            })
            .catch(() => {
                toast.error("Failed to copy link");
            });
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
                    <div className="karma_overview">
                        <div className="karma_total">
                            <h3>Total Karma Points</h3>
                            <div className="points">{karmaStats.totalKarmaPoints} KP</div>
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
                                <li><strong>Direct Invites (Level 0):</strong> Earn 100 KP when someone you invited completes registration</li>
                                <li><strong>Level 1 Referrals:</strong> Earn 20 KP (20%) when someone invited by your direct invite brings in a new member</li>
                                <li><strong>Level 2 Referrals:</strong> Earn 10 KP (10%) when a Level 1 referral's invite brings in a new member</li>
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
                        <h3>Here is your invite link, share it to receive karma points</h3>
                        <div className="link_container">
                            <p>{inviteLink}</p>
                            <button className="copy_btn" onClick={handleCopyLink}>
                                <img src={copyIcon} alt="Copy" />
                            </button>
                        </div>
                        <button className="btn_gray" onClick={() => setShowInvitePopup(false)}>Close</button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Karma; 