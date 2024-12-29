import React, { useState, useEffect } from 'react';
import './announcementFeed.scss';
import axios from 'axios';
import { defaultImg } from "../../utils/constants/images";

const AnnouncementFeed = () => {
  const [announcements, setAnnouncements] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAnnouncements = async () => {
      try {
        const response = await axios.get('https://winwinsocietyweb3.com/api/announcements');
        setAnnouncements(response.data);
      } catch (error) {
        console.error('Failed to fetch announcements:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchAnnouncements();
  }, []);

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

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

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
                <div key={announcement.id} className="announcement-card">
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
                      <p>{announcement.content}</p>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default AnnouncementFeed; 