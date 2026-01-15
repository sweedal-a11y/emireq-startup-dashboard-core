import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './FundingOverview.css';

export default function FundingOverview({ sidebarCollapsed }) {
  const navigate = useNavigate();
  const [totalRaised] = useState(0);
  const [targetAmount] = useState(250000);
  const [activeInvestors] = useState(0);
  const [currentStage, setCurrentStage] = useState('Idea');
  const [showStageModal, setShowStageModal] = useState(false);
  const progress = targetAmount > 0 ? ((totalRaised / targetAmount) * 100).toFixed(1) : 0;

  const fundingStages = [
    'Idea',
    'Pre-Seed',
    'Seed',
    'Series A',
    'Series B',
    'Series C',
    'Series D+',
    'IPO'
  ];

  const handleExportClick = () => {
    // Prepare export data
    const exportData = {
      totalRaised,
      targetAmount,
      activeInvestors,
      progress: `${progress}%`,
      timestamp: new Date().toISOString(),
      investments: [] // Would contain actual investment data
    };

    // Create a blob and download
    const dataStr = JSON.stringify(exportData, null, 2);
    const blob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `investment-activity-${new Date().toISOString().split('T')[0]}.json`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  const handleViewInvestors = () => {
    // Navigate to investors page
    navigate('/investor-inquiries');
  };

  const handleUpdateStage = () => {
    setShowStageModal(true);
  };

  const handleStageSelect = (stage) => {
    setCurrentStage(stage);
    setShowStageModal(false);
  };

  const handleCloseModal = () => {
    setShowStageModal(false);
  };

  const handleViewTermSheet = () => {
    // Open term sheet in new window or download
    window.open('/term-sheet.pdf', '_blank');
  };

  return (
    <div className={`funding-overview ${sidebarCollapsed ? 'funding-overview--sidebar-collapsed' : 'funding-overview--sidebar-expanded'}`}>
      <div className="funding-overview-container">
        {/* Top Metric Cards */}
        <div className="metric-cards-row">
          {/* Total Raised Card */}
          <div className="metric-card metric-card--blue" role="button" tabIndex={0} aria-label="Total raised: $0">
            <div className="metric-card-wave"></div>
            <div className="metric-card-content">
              <div className="metric-card-header">
                <span className="metric-card-label">TOTAL RAISED</span>
              </div>
              <div className="metric-card-value">${totalRaised.toLocaleString()}</div>
              <div className="metric-card-footer">
               <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
<g clip-path="url(#clip0_40_4105)">
<path d="M8 1.33331V14.6666" stroke="#DBEAFE" stroke-width="1.33333" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M11.3333 3.33331H6.33333C5.71449 3.33331 5.121 3.57915 4.68342 4.01673C4.24583 4.45432 4 5.04781 4 5.66665C4 6.28548 4.24583 6.87898 4.68342 7.31656C5.121 7.75415 5.71449 7.99998 6.33333 7.99998H9.66667C10.2855 7.99998 10.879 8.24581 11.3166 8.6834C11.7542 9.12098 12 9.71447 12 10.3333C12 10.9522 11.7542 11.5456 11.3166 11.9832C10.879 12.4208 10.2855 12.6666 9.66667 12.6666H4" stroke="#DBEAFE" stroke-width="1.33333" stroke-linecap="round" stroke-linejoin="round"/>
</g>
<defs>
<clipPath id="clip0_40_4105">
<rect width="16" height="16" fill="white"/>
</clipPath>
</defs>
</svg>

                <span className="metric-card-description">Ready to grow</span>
              </div>
            </div>
          </div>

          {/* Target Amount Card */}
          <div className="metric-card metric-card--purple" role="button" tabIndex={0} aria-label="Target amount: $250,000">
            <div className="metric-card-wave"></div>
            <div className="metric-card-content">
              <div className="metric-card-header">
                <span className="metric-card-label">TARGET AMOUNT</span>
              </div>
              <div className="metric-card-value">${targetAmount.toLocaleString()}</div>
              <div className="metric-card-footer">
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
<g clip-path="url(#clip0_40_4119)">
<path d="M7.99992 14.6666C11.6818 14.6666 14.6666 11.6819 14.6666 7.99998C14.6666 4.31808 11.6818 1.33331 7.99992 1.33331C4.31802 1.33331 1.33325 4.31808 1.33325 7.99998C1.33325 11.6819 4.31802 14.6666 7.99992 14.6666Z" stroke="#F3E8FF" stroke-width="1.33333" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M8 12C10.2091 12 12 10.2091 12 8C12 5.79086 10.2091 4 8 4C5.79086 4 4 5.79086 4 8C4 10.2091 5.79086 12 8 12Z" stroke="#F3E8FF" stroke-width="1.33333" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M7.99984 9.33335C8.73622 9.33335 9.33317 8.7364 9.33317 8.00002C9.33317 7.26364 8.73622 6.66669 7.99984 6.66669C7.26346 6.66669 6.6665 7.26364 6.6665 8.00002C6.6665 8.7364 7.26346 9.33335 7.99984 9.33335Z" stroke="#F3E8FF" stroke-width="1.33333" stroke-linecap="round" stroke-linejoin="round"/>
</g>
<defs>
<clipPath id="clip0_40_4119">
<rect width="16" height="16" fill="white"/>
</clipPath>
</defs>
</svg>

                <span className="metric-card-description">Seed Round goal</span>
              </div>
            </div>
          </div>

          {/* Active Investors Card */}
          <div className="metric-card metric-card--green" role="button" tabIndex={0} aria-label="Active investors: 0">
            <div className="metric-card-wave"></div>
            <div className="metric-card-content">
              <div className="metric-card-header">
                <span className="metric-card-label">ACTIVE INVESTORS</span>
              </div>
              <div className="metric-card-value">{activeInvestors}</div>
              <div className="metric-card-footer">
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M10.6668 14V12.6667C10.6668 11.9594 10.3859 11.2811 9.88578 10.781C9.38568 10.281 8.70741 10 8.00016 10H4.00016C3.29292 10 2.61464 10.281 2.11454 10.781C1.61445 11.2811 1.3335 11.9594 1.3335 12.6667V14" stroke="#DCFCE7" stroke-width="1.33333" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M10.6665 2.08533C11.2383 2.23357 11.7448 2.5675 12.1063 3.0347C12.4678 3.5019 12.664 4.07592 12.664 4.66666C12.664 5.2574 12.4678 5.83142 12.1063 6.29862C11.7448 6.76582 11.2383 7.09975 10.6665 7.24799" stroke="#DCFCE7" stroke-width="1.33333" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M14.6665 14V12.6667C14.6661 12.0758 14.4694 11.5019 14.1074 11.0349C13.7454 10.5679 13.2386 10.2344 12.6665 10.0867" stroke="#DCFCE7" stroke-width="1.33333" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M6.00016 7.33333C7.47292 7.33333 8.66683 6.13943 8.66683 4.66667C8.66683 3.19391 7.47292 2 6.00016 2C4.5274 2 3.3335 3.19391 3.3335 4.66667C3.3335 6.13943 4.5274 7.33333 6.00016 7.33333Z" stroke="#DCFCE7" stroke-width="1.33333" stroke-linecap="round" stroke-linejoin="round"/>
</svg>

                <span className="metric-card-description">Committed partners</span>
              </div>
            </div>
          </div>





          {/* Progress Card */}
          <div className="metric-card metric-card--orange" role="button" tabIndex={0} aria-label={`Progress: ${progress}%`}>
            <div className="metric-card-wave"></div>
            <div className="metric-card-content">
              <div className="metric-card-header">
                <span className="metric-card-label">PROGRESS</span>
              </div>
              <div className="metric-card-value">{progress}%</div>
              <div className="metric-card-footer">
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M2 2V12.6667C2 13.0203 2.14048 13.3594 2.39052 13.6095C2.64057 13.8595 2.97971 14 3.33333 14H14" stroke="#FFEDD4" stroke-width="1.33333" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M12 11.3333V6" stroke="#FFEDD4" stroke-width="1.33333" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M8.6665 11.3333V3.33331" stroke="#FFEDD4" stroke-width="1.33333" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M5.3335 11.3333V9.33331" stroke="#FFEDD4" stroke-width="1.33333" stroke-linecap="round" stroke-linejoin="round"/>
</svg>

                <span className="metric-card-description">Of target reached</span>
              </div>
            </div>
          </div>
        </div>
        





        {/* Seed Round Progress Card */}
        <div className="seed-progress-card">
          <div className="seed-progress-header">
            <div className="seed-progress-title-section">
              <div className="seed-progress-title-wrapper">
                <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
<g clip-path="url(#clip0_40_4448)">
<path d="M8.28086 12.9167C8.20647 12.6283 8.05615 12.3651 7.84555 12.1545C7.63494 11.9439 7.37176 11.7935 7.08336 11.7192L1.97086 10.4008C1.88364 10.3761 1.80687 10.3235 1.75221 10.2512C1.69754 10.1788 1.66797 10.0907 1.66797 9.99998C1.66797 9.90931 1.69754 9.82112 1.75221 9.74878C1.80687 9.67644 1.88364 9.62391 1.97086 9.59915L7.08336 8.27998C7.37166 8.20566 7.63477 8.05546 7.84537 7.84502C8.05596 7.63457 8.20634 7.37156 8.28086 7.08332L9.5992 1.97082C9.6237 1.88325 9.67618 1.8061 9.74863 1.75115C9.82108 1.69619 9.90951 1.66644 10.0004 1.66644C10.0914 1.66644 10.1798 1.69619 10.2523 1.75115C10.3247 1.8061 10.3772 1.88325 10.4017 1.97082L11.7192 7.08332C11.7936 7.37171 11.9439 7.6349 12.1545 7.8455C12.3651 8.0561 12.6283 8.20642 12.9167 8.28082L18.0292 9.59832C18.1171 9.62257 18.1946 9.67499 18.2499 9.74755C18.3052 9.8201 18.3351 9.90878 18.3351 9.99998C18.3351 10.0912 18.3052 10.1799 18.2499 10.2524C18.1946 10.325 18.1171 10.3774 18.0292 10.4017L12.9167 11.7192C12.6283 11.7935 12.3651 11.9439 12.1545 12.1545C11.9439 12.3651 11.7936 12.6283 11.7192 12.9167L10.4009 18.0292C10.3764 18.1167 10.3239 18.1939 10.2514 18.2488C10.179 18.3038 10.0905 18.3335 9.99961 18.3335C9.90868 18.3335 9.82025 18.3038 9.7478 18.2488C9.67535 18.1939 9.62287 18.1167 9.59836 18.0292L8.28086 12.9167Z" stroke="#155DFC" stroke-width="1.66667" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M16.6667 2.5V5.83333" stroke="#155DFC" stroke-width="1.66667" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M18.3333 4.16669H15" stroke="#155DFC" stroke-width="1.66667" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M3.33325 14.1667V15.8334" stroke="#155DFC" stroke-width="1.66667" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M4.16667 15H2.5" stroke="#155DFC" stroke-width="1.66667" stroke-linecap="round" stroke-linejoin="round"/>
</g>
<defs>
<clipPath id="clip0_40_4448">
<rect width="20" height="20" fill="white"/>
</clipPath>
</defs>
</svg>

                <h2 className="seed-progress-title">Seed Round Progress</h2>
              </div>
              <p className="seed-progress-subtitle">Track your fundraising journey to reach your goal</p>
            </div>
            <div className="seed-progress-badge">{progress}% Complete</div>
          </div>
          <div className="seed-progress-bar-section">
            <div className="seed-progress-labels">
              <span className="seed-progress-label-left">${totalRaised.toLocaleString()} raised</span>
              <span className="seed-progress-label-right">Goal: ${targetAmount.toLocaleString()}</span>
            </div>
            <div className="seed-progress-bar-track">
              <div className="seed-progress-bar-fill" style={{ width: `${progress}%` }}></div>
            </div>
          </div>
        </div>

        {/* Recent Investment Activity */}
        <div className="recent-investment-activity">
          <div className="activity-header">
            <div className="activity-header-left">
             <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
<g clip-path="url(#clip0_40_4849)">
<path d="M6.66675 11.6667C9.42817 11.6667 11.6667 9.42811 11.6667 6.66669C11.6667 3.90526 9.42817 1.66669 6.66675 1.66669C3.90532 1.66669 1.66675 3.90526 1.66675 6.66669C1.66675 9.42811 3.90532 11.6667 6.66675 11.6667Z" stroke="#FFC300" stroke-width="1.66667" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M15.075 8.64166C15.8628 8.93535 16.5638 9.42294 17.1132 10.0593C17.6625 10.6957 18.0426 11.4604 18.2182 12.2826C18.3937 13.1047 18.3591 13.9579 18.1176 14.7632C17.876 15.5685 17.4353 16.2998 16.8362 16.8897C16.2371 17.4795 15.499 17.9087 14.69 18.1377C13.8811 18.3666 13.0275 18.3879 12.2081 18.1995C11.3888 18.0112 10.6301 17.6192 10.0024 17.06C9.37465 16.5007 8.89806 15.7922 8.6167 15" stroke="#FFC300" stroke-width="1.66667" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M5.83325 5H6.66659V8.33333" stroke="#FFC300" stroke-width="1.66667" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M13.9251 11.5667L14.5084 12.1583L12.1584 14.5083" stroke="#FFC300" stroke-width="1.66667" stroke-linecap="round" stroke-linejoin="round"/>
</g>
<defs>
<clipPath id="clip0_40_4849">
<rect width="20" height="20" fill="white"/>
</clipPath>
</defs>
</svg>

              <div className="activity-header-text">
                <h2 className="activity-title">Recent Investment Activity</h2>
                <p className="activity-subtitle">Monitor incoming investments and commitments</p>
              </div>
            </div>
            <button className="export-button" onClick={handleExportClick} aria-label="Export investment activity data">
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M17.5 12.5V15.8333C17.5 16.2754 17.3244 16.6993 17.0118 17.0118C16.6993 17.3244 16.2754 17.5 15.8333 17.5H4.16667C3.72464 17.5 3.30072 17.3244 2.98816 17.0118C2.67559 16.6993 2.5 16.2754 2.5 15.8333V12.5" stroke="white" strokeWidth="1.67" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M5.83334 8.33331L10 12.5L14.1667 8.33331" stroke="white" strokeWidth="1.67" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M10 12.5V2.5" stroke="white" strokeWidth="1.67" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
              Export
            </button>
          </div>

          <div className="activity-empty-state">
            <div className="empty-state-icon">
              <svg width="80" height="80" viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M0 40C0 17.9086 17.9086 0 40 0C62.0914 0 80 17.9086 80 40C80 62.0914 62.0914 80 40 80C17.9086 80 0 62.0914 0 40Z" fill="url(#paint0_linear_40_4783)"/>
<path d="M33.3335 43.3333C38.8563 43.3333 43.3335 38.8562 43.3335 33.3333C43.3335 27.8105 38.8563 23.3333 33.3335 23.3333C27.8106 23.3333 23.3335 27.8105 23.3335 33.3333C23.3335 38.8562 27.8106 43.3333 33.3335 43.3333Z" stroke="#90A1B9" stroke-width="3.33333" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M50.1501 37.2833C51.7256 37.8707 53.1275 38.8459 54.2263 40.1187C55.3251 41.3914 56.0852 42.9207 56.4363 44.5651C56.7874 46.2095 56.7182 47.9159 56.2351 49.5264C55.7521 51.137 54.8706 52.5997 53.6724 53.7793C52.4742 54.959 50.9979 55.8175 49.38 56.2754C47.7621 56.7333 46.0549 56.7758 44.4162 56.3991C42.7775 56.0223 41.2603 55.2385 40.0048 54.12C38.7493 53.0015 37.7961 51.5845 37.2334 50" stroke="#90A1B9" stroke-width="3.33333" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M31.6665 30H33.3332V36.6667" stroke="#90A1B9" stroke-width="3.33333" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M47.8502 43.1333L49.0169 44.3166L44.3169 49.0166" stroke="#90A1B9" stroke-width="3.33333" stroke-linecap="round" stroke-linejoin="round"/>
<defs>
<linearGradient id="paint0_linear_40_4783" x1="0" y1="0" x2="80" y2="80" gradientUnits="userSpaceOnUse">
<stop stop-color="#F1F5F9"/>
<stop offset="1" stop-color="#E2E8F0"/>
</linearGradient>
</defs>
</svg>

            </div>
            <h3 className="empty-state-title">No investment activity yet</h3>
            <p className="empty-state-description">
              Start reaching out to investors to track funding progress. Once<br/>
              you receive commitments, they'll appear here.
            </p>
            <button className="view-investors-button" onClick={handleViewInvestors} aria-label="Navigate to investors page">
             <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M10.6668 14V12.6667C10.6668 11.9594 10.3859 11.2811 9.88578 10.781C9.38568 10.281 8.70741 10 8.00016 10H4.00016C3.29292 10 2.61464 10.281 2.11454 10.781C1.61445 11.2811 1.3335 11.9594 1.3335 12.6667V14" stroke="white" stroke-width="1.33333" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M10.6665 2.08533C11.2383 2.23357 11.7448 2.5675 12.1063 3.0347C12.4678 3.5019 12.664 4.07592 12.664 4.66666C12.664 5.2574 12.4678 5.83142 12.1063 6.29862C11.7448 6.76582 11.2383 7.09975 10.6665 7.24799" stroke="white" stroke-width="1.33333" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M14.6665 14V12.6667C14.6661 12.0758 14.4694 11.5019 14.1074 11.0349C13.7454 10.5679 13.2386 10.2344 12.6665 10.0867" stroke="white" stroke-width="1.33333" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M6.00016 7.33333C7.47292 7.33333 8.66683 6.13943 8.66683 4.66667C8.66683 3.19391 7.47292 2 6.00016 2C4.5274 2 3.3335 3.19391 3.3335 4.66667C3.3335 6.13943 4.5274 7.33333 6.00016 7.33333Z" stroke="white" stroke-width="1.33333" stroke-linecap="round" stroke-linejoin="round"/>
</svg>

              View Investors
            </button>
          </div>
        </div>

        {/* Bottom Two Column Layout */}
        <div className="bottom-section">
          <div className="bottom-left">
            <div className="funding-stage-card">
              {/* Header with Icon and Title */}
              <div className="funding-stage-header-main">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="funding-stage-lightbulb-icon">
                  <path d="M15 14C15.2 13 15.7 12.3 16.5 11.5C17.6 10.6 18 9.3 18 8C18 6.4087 17.3679 4.88258 16.2426 3.75736C15.1174 2.63214 13.5913 2 12 2C10.4087 2 8.88258 2.63214 7.75736 3.75736C6.63214 4.88258 6 6.4087 6 8C6 9 6.2 10.2 7.5 11.5C8.2 12.2 8.8 13 9 14" stroke="#3B82F6" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M9 18H15" stroke="#3B82F6" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M10 22H14" stroke="#3B82F6" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
                <div className="funding-stage-header-text">
                  <h2 className="funding-stage-title">Funding Stage</h2>
                  <p className="funding-stage-subtitle">Your Current fundraising phase</p>
                </div>
              </div>

              {/* Current Stage Card */}
              <div className="current-stage-card-new">
                <div className="current-stage-content">
                  <div className="current-stage-info">
                    <div className="current-stage-label-new">CURRENT STAGE</div>
                    <div className="current-stage-value-new">{currentStage}</div>
                  </div>
                  <span className="current-stage-badge">Active</span>
                </div>
              </div>

              {/* Founded Card */}
              <div className="founded-card">
                <div className="founded-icon-wrapper">
                 <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
<mask id="path-1-inside-1_40_5019" fill="white">
<path d="M0 10C0 4.47715 4.47715 0 10 0H30C35.5228 0 40 4.47715 40 10V30C40 35.5228 35.5228 40 30 40H10C4.47715 40 0 35.5228 0 30V10Z"/>
</mask>
<path d="M0 10C0 4.47715 4.47715 0 10 0H30C35.5228 0 40 4.47715 40 10V30C40 35.5228 35.5228 40 30 40H10C4.47715 40 0 35.5228 0 30V10Z" fill="white"/>
<path d="M10 0V0.8H30V0V-0.8H10V0ZM40 10H39.2V30H40H40.8V10H40ZM30 40V39.2H10V40V40.8H30V40ZM0 30H0.8V10H0H-0.8V30H0ZM10 40V39.2C4.91898 39.2 0.8 35.081 0.8 30H0H-0.8C-0.8 35.9647 4.03533 40.8 10 40.8V40ZM40 30H39.2C39.2 35.081 35.081 39.2 30 39.2V40V40.8C35.9647 40.8 40.8 35.9647 40.8 30H40ZM30 0V0.8C35.081 0.8 39.2 4.91898 39.2 10H40H40.8C40.8 4.03533 35.9647 -0.8 30 -0.8V0ZM10 0V-0.8C4.03533 -0.8 -0.8 4.03533 -0.8 10H0H0.8C0.8 4.91898 4.91898 0.8 10 0.8V0Z" fill="#E2E8F0" mask="url(#path-1-inside-1_40_5019)"/>
<g clip-path="url(#clip0_40_5019)">
<path d="M16.6667 11.6666V15" stroke="#43536D" stroke-width="1.66667" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M23.3333 11.6666V15" stroke="#43536D" stroke-width="1.66667" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M25.8333 13.3334H14.1667C13.2462 13.3334 12.5 14.0796 12.5 15V26.6667C12.5 27.5872 13.2462 28.3334 14.1667 28.3334H25.8333C26.7538 28.3334 27.5 27.5872 27.5 26.6667V15C27.5 14.0796 26.7538 13.3334 25.8333 13.3334Z" stroke="#43536D" stroke-width="1.66667" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M12.5 18.3334H27.5" stroke="#43536D" stroke-width="1.66667" stroke-linecap="round" stroke-linejoin="round"/>
</g>
<defs>
<clipPath id="clip0_40_5019">
<rect width="20" height="20" fill="white" transform="translate(10 10)"/>
</clipPath>
</defs>
</svg>

                </div>
                <div className="founded-text">
                  <div className="founded-label">Founded</div>
                  <div className="founded-value">2024</div>
                </div>
              </div>

              {/* Update Stage Button */}
              <button 
                className="update-stage-button-new" 
                onClick={handleUpdateStage} 
                aria-label="Update funding stage"
              >
                <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M14.1667 2.5H5.83333C5.39131 2.5 4.96738 2.67559 4.65482 2.98816C4.34226 3.30072 4.16667 3.72464 4.16667 4.16667V15.8333C4.16667 16.2754 4.34226 16.6993 4.65482 17.0118C4.96738 17.3244 5.39131 17.5 5.83333 17.5H14.1667C14.6087 17.5 15.0326 17.3244 15.3452 17.0118C15.6577 16.6993 15.8333 16.2754 15.8333 15.8333V4.16667C15.8333 3.72464 15.6577 3.30072 15.3452 2.98816C15.0326 2.67559 14.6087 2.5 14.1667 2.5Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M7.5 7.5H12.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M7.5 10.8333H12.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M7.5 14.1667H10" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
                Update Stage
              </button>
            </div>
          </div>
          
          <div className="bottom-right">
            <div className="investment-terms-card">
              {/* Header with Icon and Title */}
              <div className="investment-terms-header-main">
                <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M12.5002 1.66663H5.00016C4.55814 1.66663 4.13421 1.84222 3.82165 2.15478C3.50909 2.46734 3.3335 2.89127 3.3335 3.33329V16.6666C3.3335 17.1087 3.50909 17.5326 3.82165 17.8451C4.13421 18.1577 4.55814 18.3333 5.00016 18.3333H15.0002C15.4422 18.3333 15.8661 18.1577 16.1787 17.8451C16.4912 17.5326 16.6668 17.1087 16.6668 16.6666V5.83329L12.5002 1.66663Z" stroke="#00B031" stroke-width="1.66667" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M11.6665 1.66663V4.99996C11.6665 5.44199 11.8421 5.86591 12.1547 6.17847C12.4672 6.49103 12.8911 6.66663 13.3332 6.66663H16.6665" stroke="#00B031" stroke-width="1.66667" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M8.33317 7.5H6.6665" stroke="#00B031" stroke-width="1.66667" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M13.3332 10.8334H6.6665" stroke="#00B031" stroke-width="1.66667" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M13.3332 14.1666H6.6665" stroke="#00B031" stroke-width="1.66667" stroke-linecap="round" stroke-linejoin="round"/>
</svg>

                <div className="investment-terms-header-text">
                  <h2 className="investment-terms-title">Investments Terms</h2>
                  <p className="investment-terms-subtitle">Key terms for potential investors</p>
                </div>
              </div>

              {/* Minimum Investment Card */}
              <div className="terms-minimum-investment-card">
                <div className="terms-minimum-label">MINIMUM INVESTMENT</div>
                <div className="terms-minimum-value">$25,000</div>
              </div>

              {/* Equity Offered Card */}
              <div className="terms-equity-card">
                <div className="terms-equity-icon-wrapper">
                 <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
<mask id="path-1-inside-1_40_5073" fill="white">
<path d="M0 10C0 4.47715 4.47715 0 10 0H30C35.5228 0 40 4.47715 40 10V30C40 35.5228 35.5228 40 30 40H10C4.47715 40 0 35.5228 0 30V10Z"/>
</mask>
<path d="M0 10C0 4.47715 4.47715 0 10 0H30C35.5228 0 40 4.47715 40 10V30C40 35.5228 35.5228 40 30 40H10C4.47715 40 0 35.5228 0 30V10Z" fill="white"/>
<path d="M10 0V0.8H30V0V-0.8H10V0ZM40 10H39.2V30H40H40.8V10H40ZM30 40V39.2H10V40V40.8H30V40ZM0 30H0.8V10H0H-0.8V30H0ZM10 40V39.2C4.91898 39.2 0.8 35.081 0.8 30H0H-0.8C-0.8 35.9647 4.03533 40.8 10 40.8V40ZM40 30H39.2C39.2 35.081 35.081 39.2 30 39.2V40V40.8C35.9647 40.8 40.8 35.9647 40.8 30H40ZM30 0V0.8C35.081 0.8 39.2 4.91898 39.2 10H40H40.8C40.8 4.03533 35.9647 -0.8 30 -0.8V0ZM10 0V-0.8C4.03533 -0.8 -0.8 4.03533 -0.8 10H0H0.8C0.8 4.91898 4.91898 0.8 10 0.8V0Z" fill="#E2E8F0" mask="url(#path-1-inside-1_40_5073)"/>
<path d="M23.3335 15.8334H28.3335V20.8334" stroke="#43536D" stroke-width="1.66667" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M28.3332 15.8334L21.2498 22.9167L17.0832 18.75L11.6665 24.1667" stroke="#43536D" stroke-width="1.66667" stroke-linecap="round" stroke-linejoin="round"/>
</svg>

                </div>
                <div className="terms-equity-content">
                  <div className="terms-equity-label">Equity offered</div>
                  <div className="terms-equity-value">To be discussed</div>
                  <p className="terms-equity-description">Negotiate based on investment amount and strategic value</p>
                </div>
              </div>

              {/* View Term Sheet Button */}
              <button 
                className="view-term-sheet-button" 
                aria-label="View term sheet document"
              >
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M4.6665 4.66663H11.3332V11.3333" stroke="#121212" stroke-width="1.33333" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M4.6665 11.3333L11.3332 4.66663" stroke="#121212" stroke-width="1.33333" stroke-linecap="round" stroke-linejoin="round"/>
</svg>

                View Term Sheet
              </button>
            </div>
          </div>
        </div>
        
      </div>

      {/* Stage Update Modal */}
      {showStageModal && (
        <div className="stage-modal-overlay" onClick={handleCloseModal}>
          <div className="stage-modal-content" onClick={(e) => e.stopPropagation()}>
            <div className="stage-modal-header">
              <h3 className="stage-modal-title">Update Funding Stage</h3>
              <button 
                className="stage-modal-close" 
                onClick={handleCloseModal}
                aria-label="Close modal"
              >
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M18 6L6 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M6 6L18 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </button>
            </div>
            <p className="stage-modal-subtitle">Select your current funding stage</p>
            <div className="stage-options-grid">
              {fundingStages.map((stage) => (
                <button
                  key={stage}
                  className={`stage-option-button ${currentStage === stage ? 'stage-option-button--active' : ''}`}
                  onClick={() => handleStageSelect(stage)}
                >
                  <span className="stage-option-text">{stage}</span>
                  {currentStage === stage && (
                    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg" className="stage-option-check">
                      <path d="M16.6667 5L7.50004 14.1667L3.33337 10" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  )}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}