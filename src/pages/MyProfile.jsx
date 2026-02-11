import { useState, useRef, useEffect } from "react";
import "./MyProfile.css";
import avatar from "../assets/arab1.png";
import { getProfileData } from "../apiCalls/startupAPI/startupAPICall";
import { STARTUP_PROFILE } from "../services/endPoints";

export default function MyProfile({ toggleTheme }) {
  const [activeTab, setActiveTab] = useState("company-info");
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

  useEffect(() => {
    handleGetProfileData();
  }, []);

  const handleGetProfileData = () => {
    const response = getProfileData(STARTUP_PROFILE);
    console.log(response);
  };

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
            <p className="profile-card-subtitle">
              Core details about your startup and business modal
            </p>
            <div className="profile-divider"></div>

            <div className="profile-info-grid">
              <div className="profile-info-column">
                <div className="profile-info-item">
                  <div className="profile-info-label">STARTUP NAME</div>
                  <div className="profile-info-value">ABC Inc</div>
                </div>
                <div className="profile-info-item">
                  <div className="profile-info-label">STAGE</div>
                  <div className="profile-info-value">Idea</div>
                </div>
              </div>
              <div className="profile-info-column">
                <div className="profile-info-item">
                  <div className="profile-info-label">FOUNDED YEAR</div>
                  <div className="profile-info-value">2025</div>
                </div>
                <div className="profile-info-item">
                  <div className="profile-info-label">FUNDING TARGET</div>
                  <div className="profile-info-value">Not provided</div>
                </div>
              </div>
            </div>

            <div className="profile-divider"></div>

            <div className="profile-info-rows">
              <div className="profile-info-row">
                <div className="contact-title-container">
                  <svg
                    width="16"
                    height="16"
                    viewBox="0 0 16 16"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    style={{ marginTop: "-24px" }}
                  >
                    <g clip-path="url(#clip0_12_854)">
                      <path
                        d="M10 9.33331C10.1333 8.66665 10.4667 8.19998 11 7.66665C11.6667 7.06665 12 6.19998 12 5.33331C12 4.27245 11.5786 3.25503 10.8284 2.50489C10.0783 1.75474 9.06087 1.33331 8 1.33331C6.93913 1.33331 5.92172 1.75474 5.17157 2.50489C4.42143 3.25503 4 4.27245 4 5.33331C4 5.99998 4.13333 6.79998 5 7.66665C5.46667 8.13331 5.86667 8.66665 6 9.33331"
                        stroke="#717182"
                        stroke-width="1.33333"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                      />
                      <path
                        d="M6 12H10"
                        stroke="#717182"
                        stroke-width="1.33333"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                      />
                      <path
                        d="M6.66666 14.6667H9.33332"
                        stroke="#717182"
                        stroke-width="1.33333"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                      />
                    </g>
                    <defs>
                      <clipPath id="clip0_12_854">
                        <rect width="16" height="16" fill="white" />
                      </clipPath>
                    </defs>
                  </svg>
                  <div className="profile-info-content">
                    <div className="profile-info-label">PROBLEM STATEMENT</div>
                    <div className="profile-info-value1">
                      Solving ABC Problems
                    </div>
                  </div>
                </div>
              </div>

              <div className="profile-info-row">
                <div className="contact-title-container">
                  <svg
                    width="16"
                    height="16"
                    viewBox="0 0 16 16"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    style={{ marginTop: "-24px" }}
                  >
                    <path
                      d="M2.99999 11C1.99999 11.84 1.66666 14.3334 1.66666 14.3334C1.66666 14.3334 4.15999 14 4.99999 13C5.47332 12.44 5.46666 11.58 4.93999 11.06C4.68086 10.8127 4.33952 10.6698 3.98147 10.6587C2.99999 11Z"
                      stroke="#717182"
                      stroke-width="1.33333"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    />
                    <path
                      d="M8 10L6 8.00002C6.35476 7.07964 6.80147 6.1974 7.33333 5.36669C8.11012 4.12468 9.19175 3.10206 10.4753 2.39608C11.7589 1.69011 13.2018 1.32427 14.6667 1.33336C14.6667 3.14669 14.1467 6.33336 10.6667 8.66669C9.82459 9.19917 8.93123 9.64585 8 10Z"
                      stroke="#717182"
                      stroke-width="1.33333"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    />
                    <path
                      d="M5.99999 8.00003H2.66666C2.66666 8.00003 3.03332 5.98003 3.99999 5.33337C5.07999 4.61337 7.33332 5.33337 7.33332 5.33337"
                      stroke="#717182"
                      stroke-width="1.33333"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    />
                    <path
                      d="M8 10V13.3334C8 13.3334 10.02 12.9667 10.6667 12C11.3867 10.92 10.6667 8.66669 10.6667 8.66669"
                      stroke="#717182"
                      stroke-width="1.33333"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    />
                  </svg>
                  <div className="profile-info-content">
                    <div className="profile-info-label">
                      PRODUCT DESCRIPTION
                    </div>
                    <div className="profile-info-value1">ABC Products</div>
                  </div>
                </div>
              </div>

              <div className="profile-info-row">
                <div className="contact-title-container">
                  <svg
                    width="16"
                    height="16"
                    viewBox="0 0 16 16"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    style={{ marginTop: "-24px" }}
                  >
                    <g clip-path="url(#clip0_12_873)">
                      <path
                        d="M8.00001 14.6666C11.6819 14.6666 14.6667 11.6819 14.6667 7.99998C14.6667 4.31808 11.6819 1.33331 8.00001 1.33331C4.31811 1.33331 1.33334 4.31808 1.33334 7.99998C1.33334 11.6819 4.31811 14.6666 8.00001 14.6666Z"
                        stroke="#717182"
                        stroke-width="1.33333"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                      />
                      <path
                        d="M8 12C10.2091 12 12 10.2091 12 8C12 5.79086 10.2091 4 8 4C5.79086 4 4 5.79086 4 8C4 10.2091 5.79086 12 8 12Z"
                        stroke="#717182"
                        stroke-width="1.33333"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                      />
                      <path
                        d="M7.99999 9.33335C8.73637 9.33335 9.33332 8.7364 9.33332 8.00002C9.33332 7.26364 8.73637 6.66669 7.99999 6.66669C7.26361 6.66669 6.66666 7.26364 6.66666 8.00002C6.66666 8.7364 7.26361 9.33335 7.99999 9.33335Z"
                        stroke="#717182"
                        stroke-width="1.33333"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                      />
                    </g>
                    <defs>
                      <clipPath id="clip0_12_873">
                        <rect width="16" height="16" fill="white" />
                      </clipPath>
                    </defs>
                  </svg>
                  <div className="profile-info-content">
                    <div className="profile-info-label">TARGET CUSTOMERS</div>
                    <div className="profile-info-value1">ABC Customers</div>
                  </div>
                </div>
              </div>

              <div className="profile-info-row">
                <div className="contact-title-container">
                  <svg
                    width="16"
                    height="16"
                    viewBox="0 0 16 16"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    style={{ marginTop: "-24px" }}
                  >
                    <g clip-path="url(#clip0_12_882)">
                      <path
                        d="M10.318 8.59332L11.328 14.2773C11.3393 14.3443 11.3299 14.413 11.3011 14.4745C11.2722 14.5359 11.2253 14.5871 11.1666 14.6212C11.1079 14.6553 11.0402 14.6706 10.9725 14.6651C10.9049 14.6597 10.8405 14.6337 10.788 14.5907L8.40132 12.7993C8.2861 12.7132 8.14614 12.6667 8.00232 12.6667C7.8585 12.6667 7.71854 12.7132 7.60332 12.7993L5.21265 14.59C5.1602 14.6329 5.0959 14.6589 5.02832 14.6644C4.96074 14.6698 4.8931 14.6545 4.83443 14.6206C4.77576 14.5866 4.72884 14.5355 4.69993 14.4742C4.67103 14.4129 4.66151 14.3442 4.67265 14.2773L5.68199 8.59332"
                        stroke="#717182"
                        stroke-width="1.33333"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                      />
                      <path
                        d="M8 9.33331C10.2091 9.33331 12 7.54245 12 5.33331C12 3.12417 10.2091 1.33331 8 1.33331C5.79086 1.33331 4 3.12417 4 5.33331C4 7.54245 5.79086 9.33331 8 9.33331Z"
                        stroke="#717182"
                        stroke-width="1.33333"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                      />
                    </g>
                    <defs>
                      <clipPath id="clip0_12_882">
                        <rect width="16" height="16" fill="white" />
                      </clipPath>
                    </defs>
                  </svg>
                  <div className="profile-info-content">
                    <div className="profile-info-label">KEY DIFFERENTIATOR</div>
                    <div className="profile-info-value1">Unique Advantages</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );
      case "vision":
        return (
          <div className="profile-vision-grid">
            <div className="profile-card">
              <div className="vision-info-rows">
                <div className="vision-info-row">
                  <div className="contact-title-container">
                    <svg
                      width="20"
                      height="20"
                      viewBox="0 0 24 24"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                      style={{ marginTop: "-24px" }}
                    >
                      <path
                        d="M3 17L7 13L10 16L17 9"
                        stroke="#6B7280"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                      <path
                        d="M13 9H17V13"
                        stroke="#6B7280"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                    <div className="vision-info-content">
                      <div className="vision-info-label">SHORT-TERM VISION</div>
                      <div className="vision-info-subtitle">
                        Your goals for the next 6–12 months
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="profile-divider"></div>
              <p className="vision-value">Onboarding as much customers</p>
            </div>

            <div className="profile-card">
              <div className="vision-info-rows">
                <div className="vision-info-row">
                  <div className="contact-title-container">
                    <svg
                      width="20"
                      height="20"
                      viewBox="0 0 24 24"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                      style={{ marginTop: "-24px" }}
                    >
                      <path
                        d="M1.5 12C3.5 7 8 4.5 12 4.5C16 4.5 20.5 7 22.5 12C20.5 17 16 19.5 12 19.5C8 19.5 3.5 17 1.5 12Z"
                        stroke="#6B7280"
                        strokeWidth="1.5"
                      />
                      <circle
                        cx="12"
                        cy="12"
                        r="3.5"
                        stroke="#6B7280"
                        strokeWidth="1.5"
                      />
                    </svg>
                    <div className="vision-info-content">
                      <div className="vision-info-label">LONG-TERM VISION</div>
                      <div className="vision-info-subtitle">
                        Your goals for the next 6–12 months
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="profile-divider"></div>
              <p className="vision-value">Getting Acquired</p>
            </div>
          </div>
        );
      case "founders":
        return (
          <div className="profile-card">
            <div className="founders-header">
              <div className="contact-title-container">
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 20 20"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  style={{ marginTop: "-22px" }}
                >
                  <path
                    d="M13.3334 17.5V15.8333C13.3334 14.9493 12.9822 14.1014 12.3571 13.4763C11.732 12.8512 10.8841 12.5 10.0001 12.5H5.00008C4.11603 12.5 3.26818 12.8512 2.64306 13.4763C2.01794 14.1014 1.66675 14.9493 1.66675 15.8333V17.5"
                    stroke="#717182"
                    stroke-width="1.66667"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                  <path
                    d="M13.3333 2.60666C14.048 2.79197 14.6811 3.20938 15.133 3.79338C15.5849 4.37738 15.8301 5.0949 15.8301 5.83333C15.8301 6.57175 15.5849 7.28927 15.133 7.87327C14.6811 8.45727 14.048 8.87468 13.3333 9.05999"
                    stroke="#717182"
                    stroke-width="1.66667"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                  <path
                    d="M18.3333 17.5V15.8333C18.3327 15.0948 18.0869 14.3773 17.6344 13.7936C17.1819 13.2099 16.5484 12.793 15.8333 12.6083"
                    stroke="#717182"
                    stroke-width="1.66667"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                  <path
                    d="M7.50008 9.16667C9.34103 9.16667 10.8334 7.67428 10.8334 5.83333C10.8334 3.99238 9.34103 2.5 7.50008 2.5C5.65913 2.5 4.16675 3.99238 4.16675 5.83333C4.16675 7.67428 5.65913 9.16667 7.50008 9.16667Z"
                    stroke="#717182"
                    stroke-width="1.66667"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                </svg>
                <div className="founders-header-text">
                  <h3 className="founders-header-title">Founders & Team</h3>
                  <p className="founders-header-subtitle">
                    Information about your founding team and their expertise
                  </p>
                </div>
              </div>
            </div>
            <div className="profile-divider"></div>

            <div className="founders-header">
              <div className="founders-header-text">
                <h3 className="founders-labels">Founders list</h3>
                <p className="founders-values">ABC Founder 1, ABC Founder 2</p>
              </div>
            </div>

            <div className="profile-divider1"></div>

            <div className="founders-section">
              <div className="founders-item">
                <div className="founders-label">PROFESSIONAL BACKGROUNDS</div>
                <div className="founders-value">From ABC University</div>
              </div>

              <div className="founders-item">
                <div className="founders-label">ORIGIN STORY</div>
                <div className="founders-value">Story</div>
              </div>

              <div className="founders-item">
                <div className="founders-label">MOTIVATION</div>
                <div className="founders-value">ABC Motivation</div>
              </div>

              <div className="founders-item">
                <div className="founders-label">TEAM ROLES</div>
                <div className="founders-value">ABC Team's Roles</div>
              </div>

              <div className="founders-item">
                <div className="founders-label">KEY STRENGTHS</div>
                <div className="founders-value">
                  ABC Team's Founder's Strength
                </div>
              </div>
            </div>
          </div>
        );
      case "contact":
        return (
          <div className="profile-card">
            <div className="contact-title-container">
              <svg
                width="20"
                height="20"
                viewBox="0 0 20 20"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M18.3332 5.83334L10.8407 10.6058C10.5864 10.7535 10.2976 10.8313 10.0036 10.8313C9.70956 10.8313 9.42076 10.7535 9.1665 10.6058L1.6665 5.83334"
                  stroke="#717182"
                  stroke-width="1.66667"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
                <path
                  d="M16.6665 3.33334H3.33317C2.4127 3.33334 1.6665 4.07954 1.6665 5.00001V15C1.6665 15.9205 2.4127 16.6667 3.33317 16.6667H16.6665C17.587 16.6667 18.3332 15.9205 18.3332 15V5.00001C18.3332 4.07954 17.587 3.33334 16.6665 3.33334Z"
                  stroke="#717182"
                  stroke-width="1.66667"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
              </svg>

              <h3 className="profile-card-title">Contact Information</h3>
            </div>
            <p className="profile-card-subtitle">
              How investors and partners can reach you
            </p>
            <div className="profile-divider"></div>

            <div className="contact-grid">
              <div className="contact-item">
                <div className="contact-item-container">
                  <svg
                    width="20"
                    height="20"
                    viewBox="0 0 20 20"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M18.3332 5.83334L10.8407 10.6058C10.5864 10.7535 10.2976 10.8313 10.0036 10.8313C9.70956 10.8313 9.42076 10.7535 9.1665 10.6058L1.6665 5.83334"
                      stroke="#717182"
                      stroke-width="1.66667"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    />
                    <path
                      d="M16.6665 3.33334H3.33317C2.4127 3.33334 1.6665 4.07954 1.6665 5.00001V15C1.6665 15.9205 2.4127 16.6667 3.33317 16.6667H16.6665C17.587 16.6667 18.3332 15.9205 18.3332 15V5.00001C18.3332 4.07954 17.587 3.33334 16.6665 3.33334Z"
                      stroke="#717182"
                      stroke-width="1.66667"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    />
                  </svg>
                  <div className="contact-item-content">
                    <div className="contact-label">EMAIL</div>
                    <div className="contact-value">abc@abc.com</div>
                  </div>
                </div>
              </div>

              <div className="contact-item">
                <div className="contact-item-container">
                  <svg
                    width="18"
                    height="18"
                    viewBox="0 0 16 16"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M8.00016 14.6666C11.6821 14.6666 14.6668 11.6819 14.6668 7.99998C14.6668 4.31808 11.6821 1.33331 8.00016 1.33331C4.31826 1.33331 1.3335 4.31808 1.3335 7.99998C1.3335 11.6819 4.31826 14.6666 8.00016 14.6666Z"
                      stroke="#717182"
                      stroke-width="1.33333"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    />
                    <path
                      d="M8.00016 1.33331C6.28832 3.13075 5.3335 5.51781 5.3335 7.99998C5.3335 10.4822 6.28832 12.8692 8.00016 14.6666C9.71201 12.8692 10.6668 10.4822 10.6668 7.99998C10.6668 5.51781 9.71201 3.13075 8.00016 1.33331Z"
                      stroke="#717182"
                      stroke-width="1.33333"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    />
                    <path
                      d="M1.3335 8H14.6668"
                      stroke="#717182"
                      stroke-width="1.33333"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    />
                  </svg>

                  <div className="contact-item-content">
                    <div className="contact-label">WEBSITE</div>
                    <div className="contact-value">www.abc.com</div>
                  </div>
                </div>
              </div>

              <div className="contact-item">
                <div className="contact-item-container">
                  <svg
                    width="18"
                    height="18"
                    viewBox="0 0 16 16"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M13.3332 6.66665C13.3332 9.99531 9.6405 13.462 8.4005 14.5326C8.28499 14.6195 8.14437 14.6665 7.99984 14.6665C7.85531 14.6665 7.71469 14.6195 7.59917 14.5326C6.35917 13.462 2.6665 9.99531 2.6665 6.66665C2.6665 5.25216 3.22841 3.8956 4.2286 2.89541C5.2288 1.89522 6.58535 1.33331 7.99984 1.33331C9.41433 1.33331 10.7709 1.89522 11.7711 2.89541C12.7713 3.8956 13.3332 5.25216 13.3332 6.66665Z"
                      stroke="#717182"
                      stroke-width="1.33333"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    />
                    <path
                      d="M8 8.66669C9.10457 8.66669 10 7.77126 10 6.66669C10 5.56212 9.10457 4.66669 8 4.66669C6.89543 4.66669 6 5.56212 6 6.66669C6 7.77126 6.89543 8.66669 8 8.66669Z"
                      stroke="#717182"
                      stroke-width="1.33333"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    />
                  </svg>

                  <div className="contact-item-content">
                    <div className="contact-label">LOCATION</div>
                    <div className="contact-value">San Francisco, CA</div>
                  </div>
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
            <svg
              width="16"
              height="16"
              viewBox="0 0 16 16"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <g clipPath="url(#clip0_114_12193)">
                <path
                  d="M7.99935 11.3327C9.8403 11.3327 11.3327 9.8403 11.3327 7.99935C11.3327 6.1584 9.8403 4.66602 7.99935 4.66602C6.1584 4.66602 4.66602 6.1584 4.66602 7.99935C4.66602 9.8403 6.1584 11.3327 7.99935 11.3327Z"
                  stroke="#2F2F33"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M8 0.666016V1.99935"
                  stroke="#2F2F33"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M8 14V15.3333"
                  stroke="#2F2F33"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M2.8125 2.8125L3.75917 3.75917"
                  stroke="#2F2F33"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M12.2402 12.2402L13.1869 13.1869"
                  stroke="#2F2F33"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M0.666016 8H1.99935"
                  stroke="#2F2F33"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M14 8H15.3333"
                  stroke="#2F2F33"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M2.8125 13.1869L3.75917 12.2402"
                  stroke="#2F2F33"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M12.2402 3.75917L13.1869 2.8125"
                  stroke="#2F2F33"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </g>
              <defs>
                <clipPath id="clip0_114_12193">
                  <rect width="16" height="16" fill="white" />
                </clipPath>
              </defs>
            </svg>
          </button>

          <div className="em-header-search">
            <svg
              width="16"
              height="16"
              viewBox="0 0 16 16"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="em-header-search-icon"
            >
              <path
                d="M7.33333 12.6667C10.2789 12.6667 12.6667 10.2789 12.6667 7.33333C12.6667 4.38781 10.2789 2 7.33333 2C4.38781 2 2 4.38781 2 7.33333C2 10.2789 4.38781 12.6667 7.33333 12.6667Z"
                stroke="#2F2F33"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M13.9996 13.9996L11.0996 11.0996"
                stroke="#2F2F33"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            <input
              type="text"
              placeholder="Search"
              className="em-header-search-input"
            />
          </div>

          <button className="em-header-notification">
            <svg
              width="16"
              height="16"
              viewBox="0 0 16 16"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="em-header-notification-icon"
            >
              <path
                d="M12 5.33398C12 4.27312 11.5786 3.2557 10.8284 2.50556C10.0783 1.75541 9.06087 1.33398 8 1.33398C6.93913 1.33398 5.92172 1.75541 5.17157 2.50556C4.42143 3.2557 4 4.27312 4 5.33398C4 10.0007 2 11.334 2 11.334H14C14 11.334 12 10.0007 12 5.33398Z"
                stroke="#2F2F33"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M9.15237 14C9.03516 14.2021 8.86693 14.3698 8.66452 14.4864C8.46211 14.6029 8.23262 14.6643 7.99904 14.6643C7.76545 14.6643 7.53596 14.6029 7.33355 14.4864C7.13114 14.3698 6.96291 14.2021 6.8457 14"
                stroke="#2F2F33"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            <span className="em-header-notification-dot" />
          </button>

          <div className="em-header-profile" ref={profileRef}>
            <button
              className="em-header-profile-menu"
              onClick={(e) => {
                e.stopPropagation();
                setProfileOpen((prev) => !prev);
              }}
            >
              <svg width="16" height="8" viewBox="0 0 16 8" fill="none">
                <path
                  d="M0.75 0.75H14.75"
                  stroke="#2F2F33"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                />
                <path
                  d="M0.75 6.75H11.75"
                  stroke="#2F2F33"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                />
              </svg>
            </button>

            <div className="em-header-profile-avatar">
              <img
                src={avatar}
                alt="User profile"
                className="em-header-avatar-img"
              />
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

      <div className="my-profile-page">
        <div className="page-title-section">
          <h1 className="page-title">My Profile</h1>
          <p className="page-subtitle">
            Manage your company information and settings
          </p>
        </div>

        <div className="profile-header-card">
          <div className="profile-header-left">
            <div className="profile-avatar">AB</div>
            <div className="profile-info-block">
              <div className="profile-company-name-wrapper">
                <h1 className="profile-company-name">ABC Inc</h1>
                <span className="profile-status-pill">Idea</span>
              </div>
              <div className="profile-meta-row">
                <span className="profile-meta-item">
                  <svg
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <rect
                      x="3"
                      y="4"
                      width="18"
                      height="18"
                      rx="2"
                      ry="2"
                    ></rect>
                    <line x1="16" y1="2" x2="16" y2="6"></line>
                    <line x1="8" y1="2" x2="8" y2="6"></line>
                    <line x1="3" y1="10" x2="21" y2="10"></line>
                  </svg>
                  Founded 2025
                </span>
                <span className="profile-meta-separator">•</span>
                <span className="profile-meta-item">
                  <svg
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
                    <circle cx="12" cy="10" r="3"></circle>
                  </svg>
                  San Francisco, CA
                </span>
              </div>
            </div>
          </div>
          <div className="profile-header-right">
            <button className="profile-edit-btn">
              <svg
                width="16"
                height="16"
                viewBox="0 0 16 16"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M8 13.3333H14"
                  stroke="#121212"
                  stroke-width="1.33333"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
                <path
                  d="M10.9173 2.41467C11.1827 2.14928 11.5426 2.00018 11.9179 2.00018C12.2933 2.00018 12.6532 2.14928 12.9186 2.41467C13.184 2.68007 13.3331 3.04002 13.3331 3.41534C13.3331 3.79066 13.184 4.15061 12.9186 4.41601L4.91194 12.4233C4.75334 12.5819 4.55729 12.698 4.34194 12.7607L2.42728 13.3193C2.36991 13.3361 2.3091 13.3371 2.25122 13.3222C2.19333 13.3074 2.1405 13.2773 2.09824 13.235C2.05599 13.1928 2.02587 13.14 2.01104 13.0821C1.99621 13.0242 1.99721 12.9634 2.01394 12.906L2.57261 10.9913C2.63542 10.7762 2.75144 10.5804 2.90994 10.422L10.9173 2.41467Z"
                  stroke="#121212"
                  stroke-width="1.33333"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
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

        <div className="profile-tab-content">{renderTabContent()}</div>
      </div>
    </>
  );
}
