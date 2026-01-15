import { useState, useRef, useEffect } from "react";
import "./profile.css";
import avatar from "../../assets/arab1.png";

export default function ProfilePage({ toggleTheme }) {
  const [profileOpen, setProfileOpen] = useState(false);
  const [activeTab, setActiveTab] = useState("company-info");
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

  const tabs = [
    { id: "company-info", label: "Company Information" },
    { id: "vision", label: "Vision" },
    { id: "founders", label: "Founders & Team" },
    { id: "contact", label: "Contact Information" },
  ];

  const renderTabContent = () => {
    switch (activeTab) {
      case "company-info":
        return (
          <div className="profile-card">
            <h3 className="profile-card-title">Company Information</h3>
            <p className="profile-card-subtitle">Basic details about your startup</p>
            <div className="profile-divider"></div>
            
            <div className="profile-info-grid">
              <div className="profile-info-row">
                <div className="profile-info-icon">
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                    <path d="M8 8C9.65685 8 11 6.65685 11 5C11 3.34315 9.65685 2 8 2C6.34315 2 5 3.34315 5 5C5 6.65685 6.34315 8 8 8Z" stroke="#6B7280" strokeWidth="1.5"/>
                    <path d="M8 10C4.68629 10 2 12.6863 2 16H14C14 12.6863 11.3137 10 8 10Z" stroke="#6B7280" strokeWidth="1.5"/>
                  </svg>
                </div>
                <div className="profile-info-content">
                  <div className="profile-info-label">STARTUP NAME</div>
                  <div className="profile-info-value">ABC Inc</div>
                </div>
              </div>

              <div className="profile-info-row">
                <div className="profile-info-icon">
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                    <path d="M8 2V14M2 8H14" stroke="#6B7280" strokeWidth="1.5"/>
                  </svg>
                </div>
                <div className="profile-info-content">
                  <div className="profile-info-label">FOUNDED YEAR</div>
                  <div className="profile-info-value">2024</div>
                </div>
              </div>

              <div className="profile-info-row">
                <div className="profile-info-icon">
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                    <path d="M8 2L10 6L14 6.5L11 9.5L12 14L8 11.5L4 14L5 9.5L2 6.5L6 6L8 2Z" stroke="#6B7280" strokeWidth="1.5"/>
                  </svg>
                </div>
                <div className="profile-info-content">
                  <div className="profile-info-label">STAGE</div>
                  <div className="profile-info-value">Idea</div>
                </div>
              </div>

              <div className="profile-info-row">
                <div className="profile-info-icon">
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                    <path d="M12 2H4C2.89543 2 2 2.89543 2 4V12C2 13.1046 2.89543 14 4 14H12C13.1046 14 14 13.1046 14 12V4C14 2.89543 13.1046 2 12 2Z" stroke="#6B7280" strokeWidth="1.5"/>
                    <path d="M8 6V10M6 8H10" stroke="#6B7280" strokeWidth="1.5"/>
                  </svg>
                </div>
                <div className="profile-info-content">
                  <div className="profile-info-label">FUNDING TARGET</div>
                  <div className="profile-info-value">$500K</div>
                </div>
              </div>
            </div>
          </div>
        );
      case "vision":
        return (
          <div className="profile-vision-grid">
            <div className="profile-card">
              <h3 className="profile-card-title">Short-Term Vision</h3>
              <p className="profile-card-subtitle">Goals for the next 12 months</p>
              <div className="profile-divider"></div>
              <p className="profile-vision-text">Launch MVP and acquire first 100 customers</p>
            </div>
            
            <div className="profile-card">
              <h3 className="profile-card-title">Long-Term Vision</h3>
              <p className="profile-card-subtitle">5-year strategic goals</p>
              <div className="profile-divider"></div>
              <p className="profile-vision-text">Become market leader in sustainable tech solutions</p>
            </div>
          </div>
        );
      case "founders":
        return (
          <div className="profile-card">
            <h3 className="profile-card-title">Founders & Team</h3>
            <p className="profile-card-subtitle">Meet the team behind the vision</p>
            <div className="profile-divider"></div>
            
            <div className="profile-info-grid">
              <div className="profile-info-row">
                <div className="profile-info-label">FOUNDERS</div>
                <div className="profile-info-value">John Doe, Jane Smith</div>
              </div>
              
              <div className="profile-info-row">
                <div className="profile-info-label">TEAM SIZE</div>
                <div className="profile-info-value">5 members</div>
              </div>
              
              <div className="profile-info-row">
                <div className="profile-info-label">KEY STRENGTHS</div>
                <div className="profile-info-value">Technical expertise, Market knowledge</div>
              </div>
            </div>
          </div>
        );
      case "contact":
        return (
          <div className="profile-card">
            <h3 className="profile-card-title">Contact Information</h3>
            <p className="profile-card-subtitle">How to reach your startup</p>
            <div className="profile-divider"></div>
            
            <div className="profile-contact-grid">
              <div className="profile-info-row">
                <div className="profile-info-icon">
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                    <path d="M3 5L8 8L13 5" stroke="#6B7280" strokeWidth="1.5"/>
                    <path d="M3 3H13C13.5523 3 14 3.44772 14 4V12C14 12.5523 13.5523 13 13 13H3C2.44772 13 2 12.5523 2 12V4C2 3.44772 2.44772 3 3 3Z" stroke="#6B7280" strokeWidth="1.5"/>
                  </svg>
                </div>
                <div className="profile-info-content">
                  <div className="profile-info-label">EMAIL</div>
                  <div className="profile-info-value">contact@abcinc.com</div>
                </div>
              </div>

              <div className="profile-info-row">
                <div className="profile-info-icon">
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                    <path d="M8 2L14 8L8 14L2 8L8 2Z" stroke="#6B7280" strokeWidth="1.5"/>
                  </svg>
                </div>
                <div className="profile-info-content">
                  <div className="profile-info-label">WEBSITE</div>
                  <div className="profile-info-value">www.abcinc.com</div>
                </div>
              </div>

              <div className="profile-info-row">
                <div className="profile-info-icon">
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                    <path d="M8 2C8 2 2 6 2 10C2 11.1046 2.89543 12 4 12H12C13.1046 12 14 11.1046 14 10C14 6 8 2 8 2Z" stroke="#6B7280" strokeWidth="1.5"/>
                  </svg>
                </div>
                <div className="profile-info-content">
                  <div className="profile-info-label">LOCATION</div>
                  <div className="profile-info-value">San Francisco, CA</div>
                </div>
              </div>
            </div>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <>
      <div className="header-container">
        <div className="breadcrumb-section">
          <span className="breadcrumb-item inactive">Dashboard</span>
          <span className="separator">›</span>
          <span className="breadcrumb-item inactive">Startups</span>
          <span className="separator">›</span>
          <span className="breadcrumb-item active">My Profile</span>
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
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg" className="em-header-notification-icon">
              <path d="M12 5.33398C12 4.27312 11.5786 3.2557 10.8284 2.50556C10.0783 1.75541 9.06087 1.33398 8 1.33398C6.93913 1.33398 5.92172 1.75541 5.17157 2.50556C4.42143 3.2557 4 4.27312 4 5.33398C4 10.0007 2 11.334 2 11.334H14C14 11.334 12 10.0007 12 5.33398Z" stroke="#2F2F33" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M9.15237 14C9.03516 14.2021 8.86693 14.3698 8.66452 14.4864C8.46211 14.6029 8.23262 14.6643 7.99904 14.6643C7.76545 14.6643 7.53596 14.6029 7.33355 14.4864C7.13114 14.3698 6.96291 14.2021 6.8457 14" stroke="#2F2F33" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
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

      <div className="profile-page">
        <div className="profile-header">
          <h1 className="profile-title">My Profile</h1>
          <p className="profile-subtitle">Manage your company information and settings</p>
        </div>

        <div className="profile-hero-card">
          <div className="profile-hero-left">
            <div className="profile-avatar">AB</div>
            <div className="profile-hero-info">
              <h2 className="profile-company-name">ABC Inc</h2>
              <div className="profile-meta-row">
                <span className="profile-meta-item">Founded 2024</span>
                <span className="profile-meta-separator">•</span>
                <span className="profile-meta-item">San Francisco, CA</span>
              </div>
            </div>
          </div>
          <div className="profile-hero-right">
            <button className="profile-edit-btn">
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                <path d="M11.3333 2.66667L13.3333 4.66667M12.6667 1.33333L14.6667 3.33333M2.66667 11.3333L8 6L10 8L4.66667 13.3333H2.66667V11.3333Z" stroke="#6B7280" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
              Edit Profile
            </button>
          </div>
        </div>

        <div className="profile-tabs">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              className={`profile-tab ${activeTab === tab.id ? "active" : ""}`}
              onClick={() => setActiveTab(tab.id)}
            >
              {tab.label}
            </button>
          ))}
        </div>

        <div className="profile-tab-content">
          {renderTabContent()}
        </div>
      </div>
    </>
  );
}
