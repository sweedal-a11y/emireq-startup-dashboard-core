import React from 'react';
import './MessagesHeader.css';

export default function MessagesHeader({ status = 'online', sidebarCollapsed = false }) {
  const getStatusConfig = (status) => {
    switch (status) {
      case 'online':
        return {
          text: 'Online',
          bgColor: '#10B981',
          textColor: '#ffffff',
          iconColor: '#ffffff'
        };
      case 'offline':
        return {
          text: 'Offline',
          bgColor: '#6B7280',
          textColor: '#ffffff',
          iconColor: '#ffffff'
        };
      case 'away':
        return {
          text: 'Away',
          bgColor: '#F59E0B',
          textColor: '#ffffff',
          iconColor: '#ffffff'
        };
      default:
        return {
          text: 'Online',
          bgColor: '#10B981',
          textColor: '#ffffff',
          iconColor: '#ffffff'
        };
    }
  };

  const statusConfig = getStatusConfig(status);

  const handleNewMessage = () => {
    // Placeholder for new message functionality
    console.log('New message clicked');
  };

  const handleStatusClick = () => {
    // Placeholder for status functionality
    console.log('Status clicked');
  };

  return (
    <div className={`messages-header ${sidebarCollapsed ? 'messages-header--sidebar-collapsed' : 'messages-header--sidebar-expanded'}`}>
      <div className="messages-header-container">
        <div className="messages-header-text">
          <h1 className="messages-header-title">Messages</h1>
          <p className="messages-header-subtitle">Communicate with investors and partners</p>
        </div>

        <div className="messages-header-status">
          <button
            className="messages-new-btn"
            onClick={handleNewMessage}
            aria-label="Create new message"
          >
            <svg
              className="messages-new-icon"
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M12 4V20M4 12H20"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            New Message
          </button>

          <button
            className="messages-status-button"
            onClick={handleStatusClick}
            aria-label={`Status: ${statusConfig.text}`}
          >
            <svg
              className="messages-status-icon"
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <circle cx="12" cy="12" r="10" fill={statusConfig.bgColor} />
              <circle cx="12" cy="12" r="4" fill={statusConfig.iconColor} />
            </svg>
            {statusConfig.text}
          </button>
        </div>
      </div>
    </div>
  );
}