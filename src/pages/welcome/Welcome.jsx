import React from 'react';
import { useNavigate } from 'react-router-dom';
import './welcome.scss';

const Welcome = () => {
  const navigate = useNavigate();

  const handleGoToProfile = () => {
    navigate('/dashboard');
  };

  return (
    <div className="welcome-page">
      <div className="project_content_body">
        <div className="page_data">
          <div className="popup">
            <div className="popup-content">
              <h2>Welcome to The Win-Win Society!</h2>
              <p>Explore the various features:</p>
              <ul>
                <li><strong>Projects:</strong> Manage and view your projects.</li>
                <li><strong>Synergies:</strong> Collaborate with others.</li>
                <li><strong>Investment:</strong> Explore investment opportunities.</li>
                <li><strong>Chat:</strong> Communicate with your network.</li>
                <li><strong>Karma:</strong> Track your contributions and rewards.</li>
              </ul>
              <p>Some tabs are blocked. Please complete your profile to unlock them.</p>
              <button className='btn_gray' onClick={handleGoToProfile}>Go to Profile</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Welcome; 