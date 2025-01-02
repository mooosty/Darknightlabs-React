import './dashboard.scss';
import axios from 'axios';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';
import { useState, useEffect } from 'react';
import "../../components/layout/layout.scss";
import { ROUTER } from '../../utils/routes/routes';
import { Link, Navigate, useNavigate } from 'react-router-dom';
import CustomDropdown from "../../components/custom-dropdown/CustomDropdown";
import { ProfileNavTabIcon, LogoutNavTabIcon, ThreeDots } from "../../utils/SVGs/SVGs";
import { defaultImg, discordIcon, telegramIcon, twitterIcon } from "../../utils/constants/images";


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
    switch (priority) {
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
AnnouncementCard.propTypes = {
  announcement: PropTypes.array,
}
const Dashboard = () => {
  const navigate = useNavigate();
  const { authDetails } = useSelector(state => state.auth)
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

  if (!authDetails) {
    return <Navigate to={ROUTER.authentication} />
  }

  const getUserName = () => {
    if (!userDetails) return 'Guest';
    return `${userDetails.firstname || ''} ${userDetails.lastname || ''}`.trim() || 'Guest';
  };

  return (
    <>
      <header className="header_wrp">
        <h4 className='header_title'>Darknight Labs</h4>
        <div className="header_right">
          <button
            className="header_btn"
            onClick={() => navigate(`/${ROUTER.profile}`)}
          >
            Dashboard
          </button>
          <div className="sidebar_btn">
            <CustomDropdown
              toggleButton={
                <ThreeDots />
              }
              items={dropdownItems}
            />
          </div>
        </div>
      </header>

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
            <Link to={`/${ROUTER.projects}`} className="view-all-btn">View All Investments</Link>
          </div>

          <div className="grid-section announcements-section">
            <h2>Announcements & News</h2>
            <div className="announcements-list">
              {announcements.map((announcement) => (
                <div key={announcement.id} className={`announcement-item ${announcement.priority}`}>
                  <span className="announcement-title">{announcement.title}</span>
                  {announcement.priority === 'high' && <span className="priority-badge">High Priority</span>}
                </div>
              ))}
            </div>
            <Link to={`/${ROUTER.announcementFeed}`} className="view-all-btn">View All Announcements</Link>
          </div>

          <div className="grid-section leaderboard-section">
            <h2>Community Leaderboard</h2>
            <div className="leaderboard-list">
              {leaderboard.map((user) => (
                <div key={user.rank} className="leaderboard-item">
                  <div className="rank-info">
                    <span className="rank">{user.rank}</span>
                    <span className="username">{user.username}</span>
                  </div>
                  <button className="follow-btn">Follow</button>
                </div>
              ))}
            </div>
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
                  <button className="action-btn">{action.action}</button>
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
          <h2>Social Accounts</h2>
          <div className="social-accounts-list">
            <div className="social-account-item">
              <div className="account-info">
                <span className="platform-name">Twitter</span>
                <span className="connection-status connected">Connected</span>
              </div>
              <button className="connect-btn twitter connected" disabled>
                <img src={twitterIcon} alt="Twitter" />
                Connected
              </button>
            </div>
            <div className="social-account-item">
              <div className="account-info">
                <span className="platform-name">Telegram</span>
                <span className="connection-status">Not Connected</span>
              </div>
              <button className="connect-btn telegram">
                <img src={telegramIcon} alt="Telegram" />
                Link Telegram
              </button>
            </div>
            <div className="social-account-item">
              <div className="account-info">
                <span className="platform-name">Discord</span>
                <span className="connection-status">Not Connected</span>
              </div>
              <button className="connect-btn discord">
                <img src={discordIcon} alt="Discord" />
                Link Discord
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
export default Dashboard; 