import React, { useState } from 'react';
import './RecentInvestorEngagementTable.css';

export default function RecentInvestorEngagementTable({ sidebarCollapsed = false }) {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [showStatusDropdown, setShowStatusDropdown] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [hoveredRow, setHoveredRow] = useState(null);

  const investors = [
    {
      id: 1,
      name: 'Sarah Johnson',
      company: 'Venture Capital Partners',
      status: 'Meeting Scheduled',
      statusColor: 'green',
      amount: 250,
      lastContact: '2 hours ago',
      initial: 'S'
    },
    {
      id: 2,
      name: 'Michael Chen',
      company: 'Tech Angles Fund',
      status: 'Interested',
      statusColor: 'blue',
      amount: 250,
      lastContact: '1 day ago',
      initial: 'M'
    },
    {
      id: 3,
      name: 'Emily Rodriguez',
      company: 'Growth Equity LLC',
      status: 'Contacted',
      statusColor: 'purple',
      amount: 250,
      lastContact: '3 days ago',
      initial: 'E'
    },
    {
      id: 4,
      name: 'David Park',
      company: 'Seed Stage Ventures',
      status: 'Meeting Scheduled',
      statusColor: 'green',
      amount: 250,
      lastContact: '5 days ago',
      initial: 'D'
    },
    {
      id: 5,
      name: 'John Doe',
      company: 'Venture Capital Partners',
      status: 'Due Diligence',
      statusColor: 'orange',
      amount: 250,
      lastContact: '6 days ago',
      initial: 'J'
    }
  ];

  const totalResults = 1280;
  const resultsPerPage = 5;
  const totalPages = Math.ceil(totalResults / resultsPerPage);

  const filteredInvestors = investors.filter(investor => {
    const matchesSearch = investor.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         investor.company.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || investor.status.toLowerCase() === statusFilter.toLowerCase();
    return matchesSearch && matchesStatus;
  });

  const getStatusClass = (color) => `em-status-badge em-status-badge--${color}`;

  const handleInfoClick = () => {
    console.log('ℹ️ Info button clicked');
  };

  const handleStatusClick = () => {
    setShowStatusDropdown(!showStatusDropdown);
    console.log('📊 Status filter clicked');
  };

  const handleEmailClick = (investor) => {
    console.log('✉️ Email clicked for:', investor.name);
  };

  const handlePhoneClick = (investor) => {
    console.log('📞 Phone clicked for:', investor.name);
  };

  const handleMoreClick = (investor) => {
    console.log('⋮ More options clicked for:', investor.name);
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
    console.log('📄 Page changed to:', page);
  };

  const handleRowClick = (investor) => {
    console.log('👤 Row clicked:', investor.name);
  };

  return (
    <div className={`em-investor-engagement ${sidebarCollapsed ? 'em-investor-engagement--sidebar-collapsed' : ''}`}>
      {/* Header */}
      <div className="em-engagement-header">
        <div className="em-engagement-title-group">
          <div className="em-engagement-title-row">
            <h3 className="em-engagement-title">Recent Investor Engagement</h3>
              <button 
              className="em-info-icon-recent"
              aria-label="Information"
              type="button"
              title="View chart information"
            >
              <svg width="4" height="11" viewBox="0 0 4 11" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path fillRule="evenodd" clipRule="evenodd" d="M3.28849 2.2312C3.41288 2.01352 3.48285 1.76086 3.48285 1.49265C3.48285 0.668582 2.81426 0 1.9902 0C1.16613 0 0.49755 0.668582 0.49755 1.49265C0.49755 2.31672 1.16613 2.9853 1.9902 2.9853C2.54605 2.9853 3.03194 2.6821 3.28849 2.2312ZM0.995099 3.9804H1.49265H2.48775C3.03777 3.9804 3.48285 4.42547 3.48285 4.9755V5.97059V9.95099C3.48285 10.501 3.03777 10.9461 2.48775 10.9461C1.93772 10.9461 1.49265 10.501 1.49265 9.95099V6.71692C1.49265 6.30489 1.15836 5.97059 0.746324 5.97059C0.334291 5.97059 0 5.6363 0 5.22427V4.9755C0 4.62566 0.18075 4.31663 0.452848 4.13977C0.608332 4.0387 0.794913 3.9804 0.995099 3.9804Z" fill="white"/>
              </svg>
            </button> 
          </div>
          <p className="em-engagement-subtitle">Track your investor conversations</p>
        </div>
      </div>

      {/* Controls */}
      <div className="em-engagement-controls">
        <div className="em-status-filter-wrapper">
          <button 
            className="em-status-filter"
            onClick={handleStatusClick}
            type="button"
          >
            <span>Status</span>
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M4 6L8 10L12 6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </button>
          {showStatusDropdown && (
            <div className="em-status-dropdown">
              <button 
                className={`em-status-option ${statusFilter === 'all' ? 'active' : ''}`}
                onClick={() => {
                  setStatusFilter('all');
                  setShowStatusDropdown(false);
                  console.log('Status filter: All');
                }}
                type="button"
              >
                All Status
              </button>
              <button 
                className={`em-status-option ${statusFilter === 'meeting scheduled' ? 'active' : ''}`}
                onClick={() => {
                  setStatusFilter('meeting scheduled');
                  setShowStatusDropdown(false);
                  console.log('Status filter: Meeting Scheduled');
                }}
                type="button"
              >
                Meeting Scheduled
              </button>
              <button 
                className={`em-status-option ${statusFilter === 'interested' ? 'active' : ''}`}
                onClick={() => {
                  setStatusFilter('interested');
                  setShowStatusDropdown(false);
                  console.log('Status filter: Interested');
                }}
                type="button"
              >
                Interested
              </button>
              <button 
                className={`em-status-option ${statusFilter === 'contacted' ? 'active' : ''}`}
                onClick={() => {
                  setStatusFilter('contacted');
                  setShowStatusDropdown(false);
                  console.log('Status filter: Contacted');
                }}
                type="button"
              >
                Contacted
              </button>
              <button 
                className={`em-status-option ${statusFilter === 'due diligence' ? 'active' : ''}`}
                onClick={() => {
                  setStatusFilter('due diligence');
                  setShowStatusDropdown(false);
                  console.log('Status filter: Due Diligence');
                }}
                type="button"
              >
                Due Diligence
              </button>
            </div>
          )}
        </div>

        <div className="em-search-wrapper">
          <svg className="em-search-icon" width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M9 17A8 8 0 1 0 9 1a8 8 0 0 0 0 16zM19 19l-4.35-4.35" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
          <input
            type="text"
            className="em-search-input"
            placeholder="Search"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      {/* Table */}
      <div className="em-table-container">
        <table className="em-engagement-table">
          <thead>
            <tr>
              <th className="em-table-header">INVESTOR</th>
              <th className="em-table-header">STATUS</th>
              <th className="em-table-header">AMOUNT ($K)</th>
              <th className="em-table-header">LAST CONTACT</th>
              <th className="em-table-header em-table-header--actions">ACTIONS</th>
            </tr>
          </thead>
          <tbody>
            {filteredInvestors.map((investor) => (
              <tr 
                key={investor.id} 
                className="em-table-row"
                onMouseEnter={() => setHoveredRow(investor.id)}
                onMouseLeave={() => setHoveredRow(null)}
                onClick={() => handleRowClick(investor)}
              >
                <td className="em-table-cell em-investor-cell">
                  <div className="em-investor-info">
                    <div className="em-investor-avatar">
                      {investor.initial}
                    </div>
                    <div className="em-investor-details">
                      <div className="em-investor-name">{investor.name}</div>
                      <div className="em-investor-company">{investor.company}</div>
                    </div>
                  </div>
                </td>
                <td className="em-table-cell">
                  <span className={getStatusClass(investor.statusColor)}>
                    {investor.status}
                  </span>
                </td>
                <td className="em-table-cell em-amount-cell">
                  ${investor.amount}k
                </td>
                <td className="em-table-cell em-contact-cell">
                  {investor.lastContact}
                </td>
                <td className="em-table-cell em-actions-cell">
                  <div className="em-action-buttons">
                    <button 
                      className="em-action-btn"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleEmailClick(investor);
                      }}
                      title="Send email"
                      type="button"
                    >
                      <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M14.6667 4.66663L8.67271 8.48463C8.4693 8.60277 8.23827 8.665 8.00304 8.665C7.76782 8.665 7.53678 8.60277 7.33337 8.48463L1.33337 4.66663" stroke="#717182" strokeWidth="1.33333" strokeLinecap="round" strokeLinejoin="round"/>
                        <path d="M13.3334 2.66663H2.66671C1.93033 2.66663 1.33337 3.26358 1.33337 3.99996V12C1.33337 12.7363 1.93033 13.3333 2.66671 13.3333H13.3334C14.0698 13.3333 14.6667 12.7363 14.6667 12V3.99996C14.6667 3.26358 14.0698 2.66663 13.3334 2.66663Z" stroke="#717182" strokeWidth="1.33333" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                    </button>
                    <button 
                      className="em-action-btn"
                      onClick={(e) => {
                        e.stopPropagation();
                        handlePhoneClick(investor);
                      }}
                      title="Call"
                      type="button"
                    >
                      <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M9.22137 11.0454C9.35906 11.1086 9.51417 11.1231 9.66117 11.0863C9.80816 11.0496 9.93826 10.9639 10.03 10.8434L10.2667 10.5334C10.3909 10.3678 10.5519 10.2334 10.7371 10.1408C10.9222 10.0482 11.1264 10 11.3334 10H13.3334C13.687 10 14.0261 10.1405 14.2762 10.3906C14.5262 10.6406 14.6667 10.9798 14.6667 11.3334V13.3334C14.6667 13.687 14.5262 14.0261 14.2762 14.2762C14.0261 14.5262 13.687 14.6667 13.3334 14.6667C10.1508 14.6667 7.09853 13.4024 4.84809 11.152C2.59766 8.90155 1.33337 5.8493 1.33337 2.66671C1.33337 2.31309 1.47385 1.97395 1.7239 1.7239C1.97395 1.47385 2.31309 1.33337 2.66671 1.33337H4.66671C5.02033 1.33337 5.35947 1.47385 5.60952 1.7239C5.85956 1.97395 6.00004 2.31309 6.00004 2.66671V4.66671C6.00004 4.8737 5.95185 5.07785 5.85928 5.26299C5.76671 5.44813 5.6323 5.60918 5.46671 5.73337L5.15471 5.96737C5.03232 6.06083 4.94605 6.19376 4.91057 6.34361C4.87508 6.49345 4.89256 6.65096 4.96004 6.78937C5.87116 8.63995 7.36966 10.1366 9.22137 11.0454Z" stroke="#717182" strokeWidth="1.33333" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                    </button>
                    <button 
                      className="em-action-btn"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleMoreClick(investor);
                      }}
                      title="More options"
                      type="button"
                    >
                      <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M8.00004 8.66671C8.36823 8.66671 8.66671 8.36823 8.66671 8.00004C8.66671 7.63185 8.36823 7.33337 8.00004 7.33337C7.63185 7.33337 7.33337 7.63185 7.33337 8.00004C7.33337 8.36823 7.63185 8.66671 8.00004 8.66671Z" stroke="#717182" strokeWidth="1.33333" strokeLinecap="round" strokeLinejoin="round"/>
                        <path d="M12.6667 8.66671C13.0349 8.66671 13.3333 8.36823 13.3333 8.00004C13.3333 7.63185 13.0349 7.33337 12.6667 7.33337C12.2985 7.33337 12 7.63185 12 8.00004C12 8.36823 12.2985 8.66671 12.6667 8.66671Z" stroke="#717182" strokeWidth="1.33333" strokeLinecap="round" strokeLinejoin="round"/>
                        <path d="M3.33329 8.66671C3.70148 8.66671 3.99996 8.36823 3.99996 8.00004C3.99996 7.63185 3.70148 7.33337 3.33329 7.33337C2.9651 7.33337 2.66663 7.63185 2.66663 8.00004C2.66663 8.36823 2.9651 8.66671 3.33329 8.66671Z" stroke="#717182" strokeWidth="1.33333" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="em-engagement-footer">
        <div className="em-results-info">
          Showing <span className="em-results-count">05</span> / {totalResults} Results
        </div>
        <div className="em-pagination">
          <button 
            className="em-page-btn em-page-btn--prev"
            onClick={() => handlePageChange(Math.max(1, currentPage - 1))}
            disabled={currentPage === 1}
            type="button"
            aria-label="Previous page"
            title="Previous page"
          >
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M12 16L6 10L12 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </button>
          <button 
            className={`em-page-number ${currentPage === 1 ? 'em-page-number--active' : ''}`}
            onClick={() => handlePageChange(1)}
            type="button"
            aria-label="Page 1"
            title="Go to page 1"
          >
            1
          </button>
          <button 
            className={`em-page-number ${currentPage === 2 ? 'em-page-number--active' : ''}`}
            onClick={() => handlePageChange(2)}
            type="button"
            aria-label="Page 2"
            title="Go to page 2"
          >
            2
          </button>
          <button 
            className={`em-page-number ${currentPage === 3 ? 'em-page-number--active' : ''}`}
            onClick={() => handlePageChange(3)}
            type="button"
            aria-label="Page 3"
            title="Go to page 3"
          >
            3
          </button>
          <span className="em-page-ellipsis">...</span>
          <button 
            className={`em-page-number ${currentPage === 20 ? 'em-page-number--active' : ''}`}
            onClick={() => handlePageChange(20)}
            type="button"
            aria-label="Page 20"
            title="Go to page 20"
          >
            20
          </button>
          <button 
            className="em-page-btn em-page-btn--next"
            onClick={() => handlePageChange(Math.min(totalPages, currentPage + 1))}
            disabled={currentPage === 20 || currentPage === totalPages}
            type="button"
            aria-label="Next page"
            title="Next page"
          >
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M8 4L14 10L8 16" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </button>
        </div>
      </div>

      {/* Disclaimer */}
      <div className="em-engagement-disclaimer">
        Market data is updated in real-time. Prices are for reference only and may vary across exchanges.
      </div>
    </div>
  );
}
