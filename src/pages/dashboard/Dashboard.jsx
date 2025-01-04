import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import axios from 'axios';
import './dashboard.scss';
import { ROUTER } from '../../utils/routes/routes';
import { ProfileNavTabIcon, LogoutNavTabIcon } from "../../utils/SVGs/SVGs";
import CustomDropdown from "../../components/custom-dropdown/CustomDropdown";
import { defaultImg, discordIcon, telegramIcon, twitterIcon } from "../../utils/constants/images";
import Sidebar from "../../components/layout/sidebar/Sidebar";
import "../../components/layout/layout.scss";

const AnnouncementCard = ({ announcement }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const maxLength = 150;
  const shouldShowReadMore = announcement.content.length > maxLength;
  
  const displayContent = isExpanded 
    ? announcement.content 
    : `${announcement.content.slice(0, maxLength)}${shouldShowReadMore ? '...' : ''}`;

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const getPriorityColor = (priority) => {
    switch(priority) {
      case 'high':
        return '#DCCA87';
      case 'medium':
        return '#f5efdb';
      case 'low':
        return 'rgba(245, 239, 219, 0.6)';
      default:
        return '#f5efdb';
    }
  };

  return (
    <div className="announcement-card">
      <div className="announcement-header">
        <div className="author-info">
          <img src={defaultImg} alt="DarknightLabs" className="author-image" />
          <div className="author-details">
            <h3>DarknightLabs Team</h3>
            <span className="announcement-date">{formatDate(announcement.created_at)}</span>
          </div>
        </div>
        <div 
          className="announcement-type"
          style={{ 
            backgroundColor: 'rgba(245, 239, 219, 0.1)',
            color: getPriorityColor(announcement.priority)
          }}
        >
          {announcement.priority.charAt(0).toUpperCase() + announcement.priority.slice(1)} Priority
        </div>
      </div>
      
      <div className="announcement-content">
        <h2 className="announcement-title">{announcement.title}</h2>
        <div className="announcement-text">
          <p>{displayContent}</p>
          {shouldShowReadMore && (
            <button 
              className="read-more-btn" 
              onClick={() => setIsExpanded(!isExpanded)}
            >
              {isExpanded ? 'Read Less' : 'Read More'}
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

const Dashboard = () => {
  const navigate = useNavigate();
  const userData = useSelector((state) => state.auth);
  const { userDetails } = useSelector((state) => state.user);
  const [announcements, setAnnouncements] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAnnouncements = async () => {
      try {
        const response = await axios.get('https://winwinsocietyweb3.com/api/announcements');
        setAnnouncements(response.data);
        setLoading(false);
      } catch (error) {
        console.error('Failed to fetch announcements:', error);
        setLoading(false);
      }
    };

    fetchAnnouncements();
  }, []);

  const dropdownItems = [
    {
      label: <button className="dropdown_tab">
        <ProfileNavTabIcon />
        <span>Profile</span>
      </button>,
      onClick: () => navigate(`/${ROUTER.profile}`),
    },
    {
      label: <button className="dropdown_tab logout_tab">
        <LogoutNavTabIcon />
        <span>Logout</span>
      </button>,
      onClick: () => {
        localStorage.clear();
        window.location.href = "/";
      },
    },
  ];

  const investments = [
    { name: 'Project Alpha', progress: 15, type: 'ALPHA' },
    { name: 'Beta Chain', progress: -8, type: 'BETA' },
    { name: 'Gamma Protocol', progress: 30, type: 'GAMMA' }
  ];

  const leaderboard = [
    { rank: 1, username: 'cryptoking', points: 2500, telegram: '@crypto_king', discord: 'cryptoking#1234' },
    { rank: 2, username: 'RedSqueen', points: 2200, telegram: '@red_queen', discord: 'RedQueen#5678' },
    { rank: 3, username: 'satoshifan', points: 2000, telegram: '@satoshi_fan', discord: 'satoshifan#9012' }
  ];

  const actions = [
    { 
      title: 'Boost Project X', 
      description: 'Earn 500 karma', 
      action: 'Take Action',
      route: ROUTER.ambassadorProjects 
    },
    { 
      title: 'Invite valuable people', 
      description: 'Earn even more!', 
      action: 'Take Action',
      route: ROUTER.karma
    }
  ];

  const getUserName = () => {
    if (!userDetails) return 'Guest';
    return `${userDetails.firstname || ''} ${userDetails.lastname || ''}`.trim() || 'Guest';
  };

  return (
    <div className="dashboard-container">
      <div className="welcome-section">
        <div className="welcome-content">
          <h1>Welcome back, {getUserName()}!</h1>
          <div className="stats-container">
            <div className="stat-box">
              <span className="stat-label">Karma Points</span>
              <span className="stat-value karma">{userDetails?.currency_b || 0}</span>
              <Link to={`/${ROUTER.karma}`} className="view-more-btn">View More Details</Link>
            </div>
            <div className="stat-box">
              <span className="stat-label">Active Investments</span>
              <span className="stat-value investments">5</span>
            </div>
          </div>
        </div>
      </div>

      <div className="dashboard-grid">
        <div className="grid-section announcements-section">
          <h2>Announcements & News</h2>
          <div className="announcements-list">
            {loading ? (
              <div className="loading">Loading announcements...</div>
            ) : (
              announcements.slice(0, 3).map((announcement) => (
                <AnnouncementCard 
                  key={announcement.id} 
                  announcement={announcement}
                />
              ))
            )}
          </div>
          <Link to={`/${ROUTER.announcementFeed}`} className="view-all-btn">View All Announcements</Link>
        </div>

        <div className="grid-section actions-section">
          <h2>Take Action</h2>
          <div className="actions-list">
            {actions.map((action, index) => (
              <div key={index} className="action-item">
                <div className="action-info">
                  <h3>{action.title}</h3>
                  <p>{action.description}</p>
                </div>
                <button 
                  className="action-btn"
                  onClick={() => action.route && navigate(`/${action.route}`)}
                  style={{ fontFamily: 'inherit' }}
                >
                  {action.action}
                </button>
              </div>
            ))}
          </div>

          <div className="upcoming-ama">
            <h3>Upcoming AMA</h3>
            <p>Join us for a live AMA with the founders of Project X</p>
            <div className="timer">
              <span>Starts in:</span>
              <span className="time">2d 14h 37m</span>
            </div>
            <button className="reminder-btn">Set Reminder</button>
          </div>
        </div>

        <div className="grid-section investments-section">
          <h2>Your Investments</h2>
          <div className="investments-list">
            {investments.map((investment, index) => (
              <div key={index} className="investment-item">
                <div className="investment-info">
                  <span className="investment-name">{investment.name}</span>
                  <span className="investment-type">{investment.type}</span>
                </div>
                <div className="investment-progress">
                  <div 
                    className={`progress-bar ${investment.progress < 0 ? 'negative' : 'positive'}`}
                    style={{ width: `${Math.abs(investment.progress)}%` }}
                  />
                  <span className="progress-value">{investment.progress}%</span>
                </div>
              </div>
            ))}
          </div>
          <Link to={`/${ROUTER.investment}`} className="view-all-btn">View All Investments</Link>
        </div>

        <div className="grid-section social-accounts-section">
          <h2>Follow our social accounts</h2>
          <div className="social-accounts-list">
            <div className="social-account-item">
              <div className="account-info">
                <span className="platform-name">Twitter</span>
                <span className="connection-status">Follow The Darknight Himself</span>
              </div>
              <a href="https://x.com/DarknightHimslf" target="_blank" rel="noopener noreferrer" style={{ backgroundColor: 'rgba(245, 239, 219, 0.1)', padding: '8px 16px', borderRadius: '4px', color: '#F5EFDB', textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '8px', width: '120px', justifyContent: 'center', padding: '8px 85px' }}>
                <img src={twitterIcon} alt="Twitter" />
                Twitter
              </a>
            </div>
            <div className="social-account-item">
              <div className="account-info">
                <span className="platform-name">Twitter</span>
                <span className="connection-status">Follow Darknight Labs</span>
              </div>
              <a href="https://x.com/DarknightLabs" target="_blank" rel="noopener noreferrer" style={{ backgroundColor: 'rgba(245, 239, 219, 0.1)', padding: '8px 16px', borderRadius: '4px', color: '#F5EFDB', textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '8px', width: '120px', justifyContent: 'center', padding: '8px 85px' }}>
                <img src={twitterIcon} alt="Twitter" />
                Twitter
              </a>
            </div>
            <div className="social-account-item">
              <div className="account-info">
                <span className="platform-name">Twitter</span>
                <span className="connection-status">Follow The Win-Win Society</span>
              </div>
              <a href="https://x.com/WinWinSocietyHQ" target="_blank" rel="noopener noreferrer" style={{ backgroundColor: 'rgba(245, 239, 219, 0.1)', padding: '8px 16px', borderRadius: '4px', color: '#F5EFDB', textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '8px', width: '120px', justifyContent: 'center', padding: '8px 85px' }}>
                <img src={twitterIcon} alt="Twitter" />
                Twitter
              </a>
            </div>
            <div className="social-account-item">
              <div className="account-info">
                <span className="platform-name">Telegram</span>
                <span className="connection-status">Join group</span>
              </div>
              <a href="https://t.me/+9m9gdhpa2CQzNTZk" target="_blank" rel="noopener noreferrer" style={{ backgroundColor: 'rgba(245, 239, 219, 0.1)', padding: '8px 16px', borderRadius: '4px', color: '#F5EFDB', textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '8px', width: '120px', justifyContent: 'center', padding: '8px 85px' }}>
                <img src={telegramIcon} alt="Telegram" />
                Telegram
              </a>
            </div>
            <div className="social-account-item">
              <div className="account-info">
                <span className="platform-name">Discord</span>
                <span className="connection-status">Coming Soon</span>
              </div>
              <button style={{ backgroundColor: 'rgba(245, 239, 219, 0.1)', padding: '8px 16px', borderRadius: '4px', color: '#F5EFDB', border: 'none', display: 'flex', alignItems: 'center', gap: '8px', opacity: 0.5, cursor: 'not-allowed', width: '120px', justifyContent: 'center' , padding: '8px 85px' }} disabled>
                <img src={discordIcon} alt="Discord" />
                Discord
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard; 