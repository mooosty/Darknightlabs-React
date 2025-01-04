import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './announcementFeed.scss';
import { defaultImg } from "../../utils/constants/images";

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
        return '#ff8a1c';
      case 'medium':
        return '#f5efdb';
      case 'low':
        return '#808080';
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
            whiteSpace: 'nowrap',
            
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

const AnnouncementFeed = () => {
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

  return (
    <>
      <div className="profile_content_header">
        <div className="profile_content_left">
          <h2>Announcements</h2>
        </div>
        <div className="profile_content_right">
          <a href="#">Darknight Labs</a>
        </div>
      </div>
      <div className="profile_page_data">
        <div className="page_data">
          <div className="announcements-container">
            {loading ? (
              <div className="loading">Loading announcements...</div>
            ) : (
              announcements.map((announcement) => (
                <AnnouncementCard 
                  key={announcement.id} 
                  announcement={announcement}
                />
              ))
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default AnnouncementFeed; 