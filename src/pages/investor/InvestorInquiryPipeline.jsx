import React, { useState } from 'react';
import './InvestorInquiryPipeline.css';

// Import avatar images (using existing assets as placeholders)
import avatar1 from '../../assets/emireq-logo1.png.jpg'; // Placeholder
import avatar2 from '../../assets/emireq-logo2.png.png';
import avatar3 from '../../assets/emireq-logo3.png.jpg';
import avatar4 from '../../assets/emireq-logo4.png.jpg';

const InvestorInquiryPipeline = ({ sidebarCollapsed = false }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');
  const [stageFilter, setStageFilter] = useState('All');
  const [dateFilter, setDateFilter] = useState('Last 30 days');

  const investors = [
    {
      id: 1,
      name: 'Sarah Chen',
      firm: 'Sequoia Capital',
      location: 'San Francisco, CA',
      status: 'In Discussion',
      investmentRange: '$500K - $2M',
      stageFocus: 'Series A',
      interests: ['HealthTech', 'FinTech'],
      lastContact: '2 days ago',
      hasMeeting: true,
      avatar: avatar1
    },
    {
      id: 2,
      name: 'Michael Rodriguez',
      firm: 'Andreessen Horowitz',
      location: 'Menlo Park, CA',
      status: 'Awaiting Reply',
      investmentRange: '$1M - $5M',
      stageFocus: 'Series B',
      interests: ['Blockchain', 'AI'],
      lastContact: '1 week ago',
      hasMeeting: false,
      avatar: avatar2
    },
    {
      id: 3,
      name: 'Emily Johnson',
      firm: 'Lightspeed Venture',
      location: 'Palo Alto, CA',
      status: 'Interested',
      investmentRange: '$250K - $1M',
      stageFocus: 'Seed',
      interests: ['SaaS', 'E-commerce'],
      lastContact: '3 days ago',
      hasMeeting: false,
      avatar: avatar3
    },
    {
      id: 4,
      name: 'David Kim',
      firm: 'Index Ventures',
      location: 'London, UK',
      status: 'Closed',
      investmentRange: '$2M - $10M',
      stageFocus: 'Series C',
      interests: ['Enterprise', 'Cloud'],
      lastContact: '2 weeks ago',
      hasMeeting: false,
      avatar: avatar4
    }
  ];

 const meetings = [
    {
      id: 1,
      initials: "MG",
      title: "Call with Monica",
      name: "Monica Gonzalez",
      time: "Nov 4, 2025 • 10:00 AM",
    },
    {
      id: 2,
      initials: "SV",
      title: "Intro — Summit Ventures",
      name: "Monica Gonzalez",
      time: "Nov 4, 2025 • 10:00 AM",
    },
  ];

  const savedFilters = [
    { name: 'High Priority', count: 12 },
    { name: 'Recent Contacts', count: 8 },
    { name: 'Series A Focus', count: 15 }
  ];

  // Filter investors based on search term and filters
  const filteredInvestors = investors.filter(investor => {
    // Search filter - check if search term matches name or firm
    const matchesSearch = searchTerm === '' || 
      investor.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      investor.firm.toLowerCase().includes(searchTerm.toLowerCase());
    
    // Status filter
    const matchesStatus = statusFilter === 'All' || investor.status === statusFilter;
    
    // Stage filter
    const matchesStage = stageFilter === 'All' || investor.stageFocus === stageFilter;
    
    // Date filter - simple implementation based on lastContact text
    let matchesDate = true;
    if (dateFilter !== 'Last 90 days') {
      const daysAgo = parseInt(investor.lastContact);
      if (dateFilter === 'Last 7 days') {
        matchesDate = investor.lastContact.includes('day') && daysAgo <= 7;
      } else if (dateFilter === 'Last 30 days') {
        matchesDate = investor.lastContact.includes('day') && daysAgo <= 30;
      }
    }
    
    return matchesSearch && matchesStatus && matchesStage && matchesDate;
  });

  return (
    <div className={`inquiry-pipeline ${sidebarCollapsed ? 'inquiry-pipeline--sidebar-collapsed' : 'inquiry-pipeline--sidebar-expanded'}`}>
      <div className="pipeline-content">
        <div className="pipeline-main">
          <div className="pipeline-header">
            <div className="title-with-icon">
              <h2 className="pipeline-title">Inquiry Pipeline</h2>
                <button 
              className="em-info-icon"
              aria-label="Information"
              type="button"
              title="View chart information"
            >
              <svg width="4" height="11" viewBox="0 0 4 11" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path fillRule="evenodd" clipRule="evenodd" d="M3.28849 2.2312C3.41288 2.01352 3.48285 1.76086 3.48285 1.49265C3.48285 0.668582 2.81426 0 1.9902 0C1.16613 0 0.49755 0.668582 0.49755 1.49265C0.49755 2.31672 1.16613 2.9853 1.9902 2.9853C2.54605 2.9853 3.03194 2.6821 3.28849 2.2312ZM0.995099 3.9804H1.49265H2.48775C3.03777 3.9804 3.48285 4.42547 3.48285 4.9755V5.97059V9.95099C3.48285 10.501 3.03777 10.9461 2.48775 10.9461C1.93772 10.9461 1.49265 10.501 1.49265 9.95099V6.71692C1.49265 6.30489 1.15836 5.97059 0.746324 5.97059C0.334291 5.97059 0 5.6363 0 5.22427V4.9755C0 4.62566 0.18075 4.31663 0.452848 4.13977C0.608332 4.0387 0.794913 3.9804 0.995099 3.9804Z" fill="white"/>
              </svg>
            </button>
            </div>
            <p className="pipeline-subtitle">Track and manage all incoming investor inquiries</p>
          </div>
          <div
            className={`pipeline-controls ${
              sidebarCollapsed ? "collapsed" : ""
            }`}
          >
            {/* SEARCH */}
            <div className="search-container">
              

              <input
                type="text"
                placeholder="Search"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="search-input"
              />
            </div>

            {/* FILTERS */}
            <div className="filters">
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="filter-select"
              >
                <option value="All">All</option>
                <option value="In Discussion">In Discussion</option>
                <option value="Awaiting Reply">Awaiting Reply</option>
                <option value="Interested">Interested</option>
                <option value="Closed">Closed</option>
              </select>

              <select
                value={stageFilter}
                onChange={(e) => setStageFilter(e.target.value)}
                className="filter-select"
              >
                <option value="All">All</option>
                <option value="Seed">Seed</option>
                <option value="Series A">Series A</option>
                <option value="Series B">Series B</option>
                <option value="Series C">Series C</option>
              </select>

              <select
                value={dateFilter}
                onChange={(e) => setDateFilter(e.target.value)}
                className="filter-select"
              >
                <option value="Last 30 days">Last 30 days</option>
                <option value="Last 7 days">Last 7 days</option>
                <option value="Last 90 days">Last 90 days</option>
              </select>
            </div>
          </div>

          <div className="investor-cards">
            {filteredInvestors.map((investor) => (
              <div key={investor.id} className="investor-card">
                {/* HEADER */}
                <div className="investor-header">
  <div className="investor-profile">
    <img
      src={investor.avatar}
      alt={investor.name}
      className="investor-avatar"
    />

    <div className="investor-info">
      <h3 className="investor-name">{investor.name}</h3>

      <div className="investor-meta">
        {/* Firm icon */}
        <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
<g clip-path="url(#clip0_87_3970)">
<path d="M3.5 12.8332V2.33317C3.5 2.02375 3.62292 1.72701 3.84171 1.50821C4.0605 1.28942 4.35725 1.1665 4.66667 1.1665H9.33333C9.64275 1.1665 9.9395 1.28942 10.1583 1.50821C10.3771 1.72701 10.5 2.02375 10.5 2.33317V12.8332H3.5Z" stroke="#90A1B9" stroke-width="1.16667" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M3.49984 7H2.33317C2.02375 7 1.72701 7.12292 1.50821 7.34171C1.28942 7.5605 1.1665 7.85725 1.1665 8.16667V11.6667C1.1665 11.9761 1.28942 12.2728 1.50821 12.4916C1.72701 12.7104 2.02375 12.8333 2.33317 12.8333H3.49984" stroke="#90A1B9" stroke-width="1.16667" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M10.5 5.25H11.6667C11.9761 5.25 12.2728 5.37292 12.4916 5.59171C12.7104 5.8105 12.8333 6.10725 12.8333 6.41667V11.6667C12.8333 11.9761 12.7104 12.2728 12.4916 12.4916C12.2728 12.7104 11.9761 12.8333 11.6667 12.8333H10.5" stroke="#90A1B9" stroke-width="1.16667" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M5.8335 3.5H8.16683" stroke="#90A1B9" stroke-width="1.16667" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M5.8335 5.8335H8.16683" stroke="#90A1B9" stroke-width="1.16667" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M5.8335 8.1665H8.16683" stroke="#90A1B9" stroke-width="1.16667" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M5.8335 10.5H8.16683" stroke="#90A1B9" stroke-width="1.16667" stroke-linecap="round" stroke-linejoin="round"/>
</g>
<defs>
<clipPath id="clip0_87_3970">
<rect width="14" height="14" fill="white"/>
</clipPath>
</defs>
</svg>

        <span>{investor.firm}</span>

        {/* Location icon */}
        <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
          <path
            d="M11.667 5.833c0 2.913-3.231 5.946-4.316 6.883a.583.583 0 01-.702 0C5.564 11.78 2.333 8.747 2.333 5.833A4.667 4.667 0 017 1.167a4.667 4.667 0 014.667 4.666Z"
            stroke="currentColor"
            strokeWidth="1.2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M7 7.583a1.75 1.75 0 100-3.5 1.75 1.75 0 000 3.5Z"
            stroke="currentColor"
            strokeWidth="1.2"
          />
        </svg>
        <span>{investor.location}</span>
      </div>
    </div>
  </div>

  <span
    className={`status-badge ${investor.status
      .toLowerCase()
      .replace(/\s/g, "-")}`}
  >
    <span className="dot" />
    {investor.status}
  </span>
</div>


                {/* DETAILS GRID */}
                <div className="investor-details">
  <div className="detail-item">
    <span className="detail-label">Investment Range</span>
    <span className="detail-value">{investor.investmentRange}</span>
  </div>

  <div className="detail-item">
    <span className="detail-label">Stage Focus</span>
    <span className="stage-chip">{investor.stageFocus}</span>
  </div>

  <div className="detail-item">
    <span className="detail-label">Interests</span>
    <div className="interests-chips">
      {investor.interests.map((interest, index) => (
        <span key={index} className="interest-chip">
          {interest}
        </span>
      ))}
    </div>
  </div>

  <div className="detail-item align-right">
    <span className="detail-label">Last Contact</span>
    <span className={`detail-value ${investor.lastContact === '2 weeks ago' ? 'david-kim-contact' : ''}`}>{investor.lastContact}</span>
  </div>
</div>


                {/* MEETING HIGHLIGHT */}
                {investor.hasMeeting && (
  <div className="meeting-highlight" role="button" tabIndex={0}>
    <svg
      className="meeting-icon"
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <rect
        x="3"
        y="4"
        width="18"
        height="14"
        rx="3"
        stroke="currentColor"
        strokeWidth="2"
      />
      <path
        d="M3 8L12 13L21 8"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>

    <span className="meeting-text">
      Call with Monica — Nov 4, 2025 at 10:00 AM
    </span>
  </div>
)}


                {/* ACTIONS */}
                    <div className="investor-actions">
  {/* PRIMARY */}
  <button className="send-message-btn" type="button">
  <svg
    viewBox="0 0 24 24"
    aria-hidden="true"
    className="send-icon"
  >
    <rect x="3" y="4" width="18" height="14" rx="2" />
    <path d="M3 8L12 13L21 8" />
  </svg>
  Send Message
</button>


{/* Secondary */}
  <button className="schedule-call-btn" type="button">
    <svg width="15" height="15" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M13.7587 10.4467V12.4467C13.7595 12.6324 13.7215 12.8162 13.6471 12.9863C13.5727 13.1564 13.4636 13.3091 13.3268 13.4346C13.19 13.5602 13.0285 13.6557 12.8526 13.7152C12.6767 13.7747 12.4903 13.7968 12.3054 13.7801C10.254 13.5572 8.28341 12.8562 6.55208 11.7334C4.9413 10.7098 3.57564 9.34418 2.55208 7.7334C1.4254 5.9942 0.72424 4.01406 0.505411 1.9534C0.488751 1.76904 0.510661 1.58324 0.569745 1.40781C0.628828 1.23239 0.723792 1.07119 0.848588 0.934479C0.973385 0.797767 1.12528 0.688538 1.29461 0.613746C1.46393 0.538954 1.64697 0.500239 1.83208 0.500065H3.83208C4.15562 0.49688 4.46927 0.61145 4.71459 0.82242C4.9599 1.03339 5.12013 1.32636 5.16541 1.64673C5.24983 2.28678 5.40638 2.91522 5.63208 3.52006C5.72177 3.75868 5.74119 4.01801 5.68802 4.26732C5.63485 4.51663 5.51132 4.74547 5.33208 4.92673L4.48541 5.7734C5.43445 7.44243 6.81638 8.82436 8.48541 9.7734L9.33208 8.92673C9.51334 8.74749 9.74218 8.62396 9.99149 8.57079C10.2408 8.51762 10.5001 8.53704 10.7387 8.62673C11.3436 8.85243 11.972 9.00898 12.6121 9.0934C12.9359 9.13909 13.2317 9.3022 13.4431 9.55173C13.6545 9.80125 13.7669 10.1198 13.7587 10.4467Z" stroke="#43536D" stroke-linecap="round" stroke-linejoin="round"/>
</svg>

    Schedule Call
  </button>


<button className="view-history-btn" type="button">
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
<g clip-path="url(#clip0_87_4026)">
<path d="M1.37468 8.23224C1.31912 8.08256 1.31912 7.91792 1.37468 7.76824C1.91581 6.45614 2.83435 5.33427 4.01386 4.54484C5.19336 3.75541 6.58071 3.33398 8.00001 3.33398C9.41932 3.33398 10.8067 3.75541 11.9862 4.54484C13.1657 5.33427 14.0842 6.45614 14.6253 7.76824C14.6809 7.91792 14.6809 8.08256 14.6253 8.23224C14.0842 9.54434 13.1657 10.6662 11.9862 11.4556C10.8067 12.2451 9.41932 12.6665 8.00001 12.6665C6.58071 12.6665 5.19336 12.2451 4.01386 11.4556C2.83435 10.6662 1.91581 9.54434 1.37468 8.23224Z" stroke="#43536D" stroke-width="1.33333" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M8 10C9.10457 10 10 9.10457 10 8C10 6.89543 9.10457 6 8 6C6.89543 6 6 6.89543 6 8C6 9.10457 6.89543 10 8 10Z" stroke="#43536D" stroke-width="1.33333" stroke-linecap="round" stroke-linejoin="round"/>
</g>
<defs>
<clipPath id="clip0_87_4026">
<rect width="16" height="16" fill="white"/>
</clipPath>
</defs>
</svg>

  View History
</button>



</div>
    
              </div>
            ))}
          </div>
        </div>





        

        <div className="pipeline-sidebar">
                    <div className="sidebar-card quick-actions-card">
      {/* Header */}
      <div className="quick-actions-header">
        <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M12.5 11.6665C12.6667 10.8332 13.0833 10.2498 13.75 9.58317C14.5833 8.83317 15 7.74984 15 6.6665C15 5.34042 14.4732 4.06865 13.5355 3.13097C12.5979 2.19329 11.3261 1.6665 10 1.6665C8.67392 1.6665 7.40215 2.19329 6.46447 3.13097C5.52678 4.06865 5 5.34042 5 6.6665C5 7.49984 5.16667 8.49984 6.25 9.58317C6.83333 10.1665 7.33333 10.8332 7.5 11.6665" stroke="#155DFC" stroke-width="1.66667" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M7.5 15H12.5" stroke="#155DFC" stroke-width="1.66667" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M8.3335 18.3335H11.6668" stroke="#155DFC" stroke-width="1.66667" stroke-linecap="round" stroke-linejoin="round"/>
</svg>

        <h4>Quick Actions</h4>
      </div>

      {/* Actions */}
      <div className="quick-actions-body">
        <button className="qa-btn qa-primary">
          <span className="qa-icon"><svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M3.3335 8H12.6668" stroke="white" stroke-width="1.33333" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M8 3.3335V12.6668" stroke="white" stroke-width="1.33333" stroke-linecap="round" stroke-linejoin="round"/>
</svg>
</span>
          Add New Investor
        </button>

        <button className="qa-btn qa-secondary">
         <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M8 2V10" stroke="#121212" stroke-width="1.33333" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M11.3332 5.33333L7.99984 2L4.6665 5.33333" stroke="#121212" stroke-width="1.33333" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M14 10V12.6667C14 13.0203 13.8595 13.3594 13.6095 13.6095C13.3594 13.8595 13.0203 14 12.6667 14H3.33333C2.97971 14 2.64057 13.8595 2.39052 13.6095C2.14048 13.3594 2 13.0203 2 12.6667V10" stroke="#121212" stroke-width="1.33333" stroke-linecap="round" stroke-linejoin="round"/>
</svg>

          Import from CSV
        </button>

        <button className="qa-btn qa-secondary">
         <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M8 10V2" stroke="#121212" stroke-width="1.33333" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M14 10V12.6667C14 13.0203 13.8595 13.3594 13.6095 13.6095C13.3594 13.8595 13.0203 14 12.6667 14H3.33333C2.97971 14 2.64057 13.8595 2.39052 13.6095C2.14048 13.3594 2 13.0203 2 12.6667V10" stroke="#121212" stroke-width="1.33333" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M4.6665 6.6665L7.99984 9.99984L11.3332 6.6665" stroke="#121212" stroke-width="1.33333" stroke-linecap="round" stroke-linejoin="round"/>
</svg>

          Export Data
        </button>
      </div>
    </div>




          <div className="sidebar-card">
            <div className="upcoming-meetings">
  {/* Header */}
  <div className="um-header">
    <h4 className="um-title">Upcoming Meetings</h4>
    <span className="um-count">2</span>
  </div>

  {/* List */}
  <div className="um-list">
    {/* Item 1 */}
    <div className="um-item" tabIndex="0">
      <div className="um-avatar">MG</div>

      <div className="um-content">
        <p className="um-meeting-title">Call with Monica</p>
        <p className="um-name">Monica Gonzalez</p>

        <div className="um-time">
          <svg
            className="um-clock"
            width="14"
            height="14"
            viewBox="0 0 24 24"
            fill="none"
          >
            <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="2" />
            <path
              d="M12 7v5l3 2"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
            />
          </svg>
          <span>Nov 4, 2025 • 10:00 AM</span>
        </div>
      </div>
    </div>

    {/* Item 2 */}
    <div className="um-item" tabIndex="0">
      <div className="um-avatar">SV</div>

      <div className="um-content">
        <p className="um-meeting-title">Intro — Summit Ventures</p>
        <p className="um-name">Monica Gonzalez</p>

        <div className="um-time">
          <svg
            className="um-clock"
            width="14"
            height="14"
            viewBox="0 0 24 24"
            fill="none"
          >
            <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="2" />
            <path
              d="M12 7v5l3 2"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
            />
          </svg>
          <span>Nov 4, 2025 • 10:00 AM</span>
        </div>
      </div>
    </div>
  </div>
</div>

          </div>



         





          <div className="sidebar-card">
            <div className="saved-filters">
  {/* Header */}
  <div className="sf-header">
    <h4 className="sf-title">Saved Filters</h4>
  </div>

  {/* Filters List */}
  <div className="sf-list">
    <div className="sf-item" tabIndex="0">
      <span className="sf-label">Seed Stage</span>
      <span className="sf-count">12</span>
    </div>

    <div className="sf-item" tabIndex="0">
      <span className="sf-label">MENA Region</span>
      <span className="sf-count">5</span>
    </div>

    <div className="sf-item" tabIndex="0">
      <span className="sf-label">HealthTech Focus</span>
      <span className="sf-count">8</span>
    </div>
  </div>
</div>

          </div>











          <div className="pro-tip-card" role="note" aria-label="Pro Tip">
  <div className="pro-tip-header">
    <span className="pro-tip-icon" aria-hidden="true">
      <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M0 10C0 4.47715 4.47715 0 10 0H22C27.5228 0 32 4.47715 32 10V22C32 27.5228 27.5228 32 22 32H10C4.47715 32 0 27.5228 0 22V10Z" fill="#155DFC"/>
<g clip-path="url(#clip0_87_2851)">
<path d="M14.6248 18.3332C14.5653 18.1025 14.445 17.8919 14.2765 17.7234C14.1081 17.5549 13.8975 17.4347 13.6668 17.3752L9.57679 16.3205C9.50701 16.3007 9.4456 16.2587 9.40186 16.2008C9.35813 16.1429 9.33447 16.0724 9.33447 15.9998C9.33447 15.9273 9.35813 15.8567 9.40186 15.7989C9.4456 15.741 9.50701 15.699 9.57679 15.6792L13.6668 14.6238C13.8974 14.5644 14.1079 14.4442 14.2764 14.2759C14.4449 14.1075 14.5652 13.8971 14.6248 13.6665L15.6795 9.57651C15.6991 9.50645 15.741 9.44474 15.799 9.40077C15.857 9.35681 15.9277 9.33301 16.0005 9.33301C16.0732 9.33301 16.144 9.35681 16.2019 9.40077C16.2599 9.44474 16.3019 9.50645 16.3215 9.57651L17.3755 13.6665C17.435 13.8972 17.5552 14.1078 17.7237 14.2763C17.8922 14.4447 18.1027 14.565 18.3335 14.6245L22.4235 15.6785C22.4938 15.6979 22.5558 15.7398 22.6 15.7979C22.6442 15.8559 22.6682 15.9269 22.6682 15.9998C22.6682 16.0728 22.6442 16.1437 22.6 16.2018C22.5558 16.2598 22.4938 16.3018 22.4235 16.3212L18.3335 17.3752C18.1027 17.4347 17.8922 17.5549 17.7237 17.7234C17.5552 17.8919 17.435 18.1025 17.3755 18.3332L16.3208 22.4232C16.3012 22.4932 16.2592 22.5549 16.2012 22.5989C16.1433 22.6429 16.0725 22.6667 15.9998 22.6667C15.927 22.6667 15.8563 22.6429 15.7983 22.5989C15.7404 22.5549 15.6984 22.4932 15.6788 22.4232L14.6248 18.3332Z" stroke="white" stroke-width="1.33333" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M21.3335 10V12.6667" stroke="white" stroke-width="1.33333" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M22.6667 11.3335H20" stroke="white" stroke-width="1.33333" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M10.6665 19.3335V20.6668" stroke="white" stroke-width="1.33333" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M11.3333 20H10" stroke="white" stroke-width="1.33333" stroke-linecap="round" stroke-linejoin="round"/>
</g>
<defs>
<clipPath id="clip0_87_2851">
<rect width="16" height="16" fill="white" transform="translate(8 8)"/>
</clipPath>
</defs>
</svg>

    </span>

    <span className="pro-tip-title">Pro Tip</span>
  </div>

  <p className="pro-tip-text">
    Respond to investor inquiries within <strong>24 hours</strong> to
    increase your chances of securing meetings.
  </p>
</div>

        </div>
      </div>
    </div>
  );
};

export default InvestorInquiryPipeline;