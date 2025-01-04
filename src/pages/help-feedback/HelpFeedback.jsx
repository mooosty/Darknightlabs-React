import React from 'react';
import './help-feedback.scss';

const HelpFeedback = () => {
  return (
    <div className="content_header_wrap">
      <div className="content_header">
        <div className="content_left">
          <h2>Help & Feedback</h2>
        </div>
      </div>
      <div className="content_body">
        <div className="help_feedback_content">
          <div className="help_feedback_card">
            <div className="icon_container">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"></path>
              </svg>
            </div>
            <div className="text_container">
              <h3>We're Here to Help!</h3>
              <p>Need help with something, or have some valuable feedback to share?</p>
              <div className="telegram_link">
                <p>Please DM us on Telegram</p>
                <a href="https://t.me/winwincyborg" target="_blank" rel="noopener noreferrer" className="telegram_button">
                  <svg 
                    xmlns="http://www.w3.org/2000/svg" 
                    viewBox="0 0 24 24" 
                    fill="none" 
                    stroke="currentColor" 
                    strokeWidth="2" 
                    strokeLinecap="round" 
                    strokeLinejoin="round"
                    className="telegram_icon"
                  >
                    <path d="M21.198 2.433a2.242 2.242 0 0 0-1.022.215l-16.5 7.5a2.25 2.25 0 0 0 .126 4.216l3.9 1.3v5.786c0 .566.664.875 1.1.5l2.9-2.9 5.361 4.35a2.25 2.25 0 0 0 3.27-.856l5.4-13.5a2.25 2.25 0 0 0-1.045-2.611z"/>
                  </svg>
                  @winwincyborg
                </a>
                <p className="response_time">We'll get back to you ASAP!</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HelpFeedback; 