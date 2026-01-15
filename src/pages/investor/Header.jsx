import React, { useState, useRef, useEffect } from 'react';
import avatar from "../../assets/arab1.png";

export default function Header({ isDarkMode, toggleTheme }) {
  const [profileOpen, setProfileOpen] = useState(false);
  const profileRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (profileRef.current && !profileRef.current.contains(e.target)) {
        setProfileOpen(false);
      }
    };

    document.addEventListener("click", handleClickOutside);
    return () => document.removeEventListener("click", handleClickOutside);
  }, []);

  return (
    <div className="header-container">
      <div className="breadcrumb-section">
        <span className="breadcrumb-item inactive">Dashboard</span>
        <span className="separator">›</span>
        <span className="breadcrumb-item active">Investor Inquiries</span>
      </div>

      <div className="em-header-actions">
        <button
          className="em-header-theme-toggle"
          onClick={toggleTheme}
          aria-label="Toggle theme"
        >
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
            <g clipPath="url(#clip0_114_12193)">
              <path d="M7.99935 11.3327C9.8403 11.3327 11.3327 9.8403 11.3327 7.99935C11.3327 6.1584 9.8403 4.66602 7.99935 4.66602C6.1584 4.66602 4.66602 6.1584 4.66602 7.99935C4.66602 9.8403 6.1584 11.3327 7.99935 11.3327Z" stroke="#2F2F33" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M8 0.666016V1.99935" stroke="#2F2F33" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M8 14V15.3333" stroke="#2F2F33" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M2.8125 2.8125L3.75917 3.75917" stroke="#2F2F33" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M12.2402 12.2402L13.1869 13.1869" stroke="#2F2F33" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M0.666016 8H1.99935" stroke="#2F2F33" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M14 8H15.3333" stroke="#2F2F33" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M2.8125 13.1869L3.75917 12.2402" stroke="#2F2F33" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M12.2402 3.75917L13.1869 2.8125" stroke="#2F2F33" strokeLinecap="round" strokeLinejoin="round"/>
            </g>
            <defs>
              <clipPath id="clip0_114_12193">
                <rect width="16" height="16" fill="white"/>
              </clipPath>
            </defs>
          </svg>
        </button>

        <div className="em-header-search">
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg" className="em-header-search-icon">
            <path d="M7.33333 12.6667C10.2789 12.6667 12.6667 10.2789 12.6667 7.33333C12.6667 4.38781 10.2789 2 7.33333 2C4.38781 2 2 4.38781 2 7.33333C2 10.2789 4.38781 12.6667 7.33333 12.6667Z" stroke="#2F2F33" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M13.9996 13.9996L11.0996 11.0996" stroke="#2F2F33" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
          <input type="text" placeholder="Search" className="em-header-search-input" />
        </div>

        <button className="em-header-notification">
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M12 5.33333C12 4.27247 11.5786 3.25505 10.8284 2.50491C10.0783 1.75476 9.06087 1.33333 8 1.33333C6.93913 1.33333 5.92172 1.75476 5.17157 2.50491C4.42143 3.25505 4 4.27247 4 5.33333C4 10 2 11.3333 2 11.3333H14C14 11.3333 12 10 12 5.33333Z" stroke="#2F2F33" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M9.15335 14C9.03614 14.2021 8.86791 14.3698 8.6655 14.4864C8.46309 14.6029 8.2336 14.6643 8.00001 14.6643C7.76643 14.6643 7.53694 14.6029 7.33453 14.4864C7.13212 14.3698 6.96389 14.2021 6.84668 14" stroke="#2F2F33" stroke-linecap="round" stroke-linejoin="round"/>
</svg>

          <span className="em-header-notification-dot" />
        </button>

        <div className="em-header-profile" ref={profileRef}>
          <button className="em-header-profile-menu" onClick={(e) => { e.stopPropagation(); setProfileOpen((prev) => !prev); }}>
            <svg width="16" height="8" viewBox="0 0 16 8" fill="none">
              <path d="M0.75 0.75H14.75" stroke="#2F2F33" strokeWidth="1.5" strokeLinecap="round"/>
              <path d="M0.75 6.75H11.75" stroke="#2F2F33" strokeWidth="1.5" strokeLinecap="round"/>
            </svg>
          </button>

          <div className="em-header-profile-avatar">
            <img src={avatar} alt="User profile" className="em-header-avatar-img" />
          </div>

          {profileOpen && (
            <div className="em-profile-dropdown">
              <div className="em-profile-user">
                <img src={avatar} alt="User" />
                <div>
                  <div className="em-profile-name">John Doe</div>
                  <div className="em-profile-email">johndoe@gmail.com</div>
                </div>
              </div>
              <div className="em-profile-divider" />
              <button className="em-profile-item">
                <span className="em-profile-item-icon">👤</span>
                My Profile
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
