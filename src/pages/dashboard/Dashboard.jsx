import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import './dashboard.scss';
import { ROUTER } from '../../utils/routes/routes';
import { ProfileNavTabIcon, LogoutNavTabIcon } from "../../utils/SVGs/SVGs";
import CustomDropdown from "../../components/custom-dropdown/CustomDropdown";

const Dashboard = () => {
  const navigate = useNavigate();
  const userData = useSelector((state) => state.auth);
  const { userDetails } = useSelector((state) => state.user);

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

  const announcements = [
    { id: 1, title: 'New Partnership Announcement', priority: 'high' },
    { id: 2, title: 'Community Milestone: 100k Users!', priority: 'medium' },
    { id: 3, title: 'Upcoming AMA with Project X', priority: 'medium' }
  ];

  const leaderboard = [
    { rank: 1, username: 'cryptoking', points: 2500 },
    { rank: 2, username: 'RedSqueen', points: 2200 },
    { rank: 3, username: 'satoshifan', points: 2000 }
  ];

  const actions = [
    { title: 'Boost Project X', description: 'Earn 500 karma', action: 'Take Action' },
    { title: 'Invite Friends', description: 'Earn even more!', action: 'Take Action' }
  ];

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
                <ProfileNavTabIcon />
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
    </>
  );
};

export default Dashboard; 