import React, { useState, useMemo } from 'react';
import './OutreachContactList.css';
import Engagement from './Engagement';
import Status from './Status';
import Upcoming from './Upcoming';
import Calendar from './Calendar';
import SmartInsights from './SmartInsights';

export default function OutreachContactList({ sidebarCollapsed = false }) {
  const [statusFilter, setStatusFilter] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [showStatusDropdown, setShowStatusDropdown] = useState(false);
  const [hoveredRow, setHoveredRow] = useState(null);

  const allInvestors = [
    {
      id: 1,
      name: 'Sarah Johnson',
      initial: 'S',
      firm: 'Novocure Ventures',
      round: 'Seed',
      location: 'Switzerland',
      status: 'In Discussion',
      statusColor: 'green',
      lastContact: 'Nov 3, 2025',
      nextFollowUp: 'Nov 6, 2025'
    },
    {
      id: 2,
      name: 'Michael Chen',
      initial: 'M',
      firm: 'Crescent Capital',
      round: 'Series A',
      location: 'UAE',
      status: 'Interested',
      statusColor: 'blue',
      lastContact: 'Nov 1, 2025',
      nextFollowUp: '–'
    },
    {
      id: 3,
      name: 'Emily Rodriguez',
      initial: 'E',
      firm: 'FutureTech Angels',
      round: 'Pre-Seed',
      location: 'USA',
      status: 'No Response',
      statusColor: 'purple',
      lastContact: 'Oct 25, 2025',
      nextFollowUp: 'Nov 8, 2025'
    },
    {
      id: 4,
      name: 'David Park',
      initial: 'D',
      firm: 'NeoFund Global',
      round: 'Series B',
      location: 'Singapore',
      status: 'Follow up needed',
      statusColor: 'orange',
      lastContact: 'Oct 15, 2025',
      nextFollowUp: '–'
    }
  ];

  const totalResults = 1280;
  const resultsPerPage = 4;

  // Filter investors based on status and search term
  const filteredInvestors = useMemo(() => {
    return allInvestors.filter(investor => {
      const matchesStatus = statusFilter === 'all' || 
        investor.status.toLowerCase().replace(/\s+/g, '-') === statusFilter;
      
      const matchesSearch = searchTerm === '' || 
        investor.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        investor.firm.toLowerCase().includes(searchTerm.toLowerCase()) ||
        investor.location.toLowerCase().includes(searchTerm.toLowerCase());
      
      return matchesStatus && matchesSearch;
    });
  }, [allInvestors, statusFilter, searchTerm]);

  const getStatusClass = (color) => `em-contact-status-badge em-contact-status-badge--${color}`;

  const totalPages = Math.ceil(totalResults / resultsPerPage);

  const handlePageChange = (page) => {
    setCurrentPage(page);
    console.log('📄 Page changed to:', page);
  };

  const handleRowClick = (investor) => {
    console.log('👤 Row clicked:', investor.name);
  };

  const handleStatusClick = () => {
    setShowStatusDropdown(!showStatusDropdown);
    console.log('📊 Status filter clicked');
  };

  return (
    <>
      <div className={`em-contact-list-container ${sidebarCollapsed ? 'em-contact-list-container--sidebar-collapsed' : ''}`}>
        {/* Header */}
        <div className="em-contact-header">
          <div className="em-contact-title-group">
            <div className="em-contact-title-row">
              <h3 className="em-contact-title">Investor Contact List</h3>
              <button 
                className="em-contact-info-icon"
                aria-label="Information"
                type="button"
                title="View contact list information"
              >
                <svg width="4" height="11" viewBox="0 0 4 11" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path fillRule="evenodd" clipRule="evenodd" d="M3.28849 2.2312C3.41288 2.01352 3.48285 1.76086 3.48285 1.49265C3.48285 0.668582 2.81426 0 1.9902 0C1.16613 0 0.49755 0.668582 0.49755 1.49265C0.49755 2.31672 1.16613 2.9853 1.9902 2.9853C2.54605 2.9853 3.03194 2.6821 3.28849 2.2312ZM0.995099 3.9804H1.49265H2.48775C3.03777 3.9804 3.48285 4.42547 3.48285 4.9755V5.97059V9.95099C3.48285 10.501 3.03777 10.9461 2.48775 10.9461C1.93772 10.9461 1.49265 10.501 1.49265 9.95099V6.71692C1.49265 6.30489 1.15836 5.97059 0.746324 5.97059C0.334291 5.97059 0 5.6363 0 5.22427V4.9755C0 4.62566 0.18075 4.31663 0.452848 4.13977C0.608332 4.0387 0.794913 3.9804 0.995099 3.9804Z" fill="white"/>
                </svg>
              </button>
            </div>
            <p className="em-contact-subtitle">Manage your outreach and follow-up progress.</p>
          </div>
        </div>

        {/* Controls */}
        <div className="em-contact-controls">
          <div className="em-contact-status-filter-wrapper">
            <button 
              className="em-contact-status-filter"
              onClick={handleStatusClick}
              type="button"
            >
              <span>Status</span>
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M4 6L8 10L12 6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </button>
            {showStatusDropdown && (
              <div className="em-contact-status-dropdown">
                <button 
                  className={`em-contact-status-option ${statusFilter === 'all' ? 'active' : ''}`}
                  onClick={() => {
                    setStatusFilter('all');
                    setShowStatusDropdown(false);
                  }}
                  type="button"
                >
                  All Status
                </button>
                <button 
                  className={`em-contact-status-option ${statusFilter === 'in-discussion' ? 'active' : ''}`}
                  onClick={() => {
                    setStatusFilter('in-discussion');
                    setShowStatusDropdown(false);
                  }}
                  type="button"
                >
                  In Discussion
                </button>
                <button 
                  className={`em-contact-status-option ${statusFilter === 'interested' ? 'active' : ''}`}
                  onClick={() => {
                    setStatusFilter('interested');
                    setShowStatusDropdown(false);
                  }}
                  type="button"
                >
                  Interested
                </button>
                <button 
                  className={`em-contact-status-option ${statusFilter === 'no-response' ? 'active' : ''}`}
                  onClick={() => {
                    setStatusFilter('no-response');
                    setShowStatusDropdown(false);
                  }}
                  type="button"
                >
                  No Response
                </button>
                <button 
                  className={`em-contact-status-option ${statusFilter === 'follow-up-needed' ? 'active' : ''}`}
                  onClick={() => {
                    setStatusFilter('follow-up-needed');
                    setShowStatusDropdown(false);
                  }}
                  type="button"
                >
                  Follow up needed
                </button>
              </div>
            )}
          </div>

          <div className="em-contact-search-wrapper">
            <svg className="em-contact-search-icon" width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M9 17A8 8 0 1 0 9 1a8 8 0 0 0 0 16zM19 19l-4.35-4.35" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            <input
              type="text"
              className="em-contact-search-input"
              placeholder="Search"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>

        {/* Table */}
        <div className="em-contact-table-container">
          <table className="em-contact-table">
            <thead>
              <tr>
                <th className="em-contact-table-header">INVESTOR</th>
                <th className="em-contact-table-header">FIRM</th>
                <th className="em-contact-table-header">ROUND</th>
                <th className="em-contact-table-header">LOCATION</th>
                <th className="em-contact-table-header">STATUS</th>
                <th className="em-contact-table-header">LAST CONTACT</th>
                <th className="em-contact-table-header">NEXT FOLLOW UP</th>
              </tr>
            </thead>
            <tbody>
              {filteredInvestors.map((investor) => (
                <tr 
                  key={investor.id} 
                  className="em-contact-table-row"
                  onMouseEnter={() => setHoveredRow(investor.id)}
                  onMouseLeave={() => setHoveredRow(null)}
                  onClick={() => handleRowClick(investor)}
                >
                  <td className="em-contact-table-cell em-contact-investor-cell">
                    <div className="em-contact-investor-info">
                      <div className="em-contact-investor-avatar">
                        {investor.initial}
                      </div>
                      <div className="em-contact-investor-name">{investor.name}</div>
                    </div>
                  </td>
                  <td className="em-contact-table-cell em-contact-firm-cell">
                    {investor.firm}
                  </td>
                  <td className="em-contact-table-cell em-contact-round-cell">
                    {investor.round}
                  </td>
                  <td className="em-contact-table-cell em-contact-location-cell">
                    {investor.location}
                  </td>
                  <td className="em-contact-table-cell em-contact-status-cell">
                    <span className={getStatusClass(investor.statusColor)}>
                      {investor.status}
                    </span>
                  </td>
                  <td className="em-contact-table-cell em-contact-last-contact-cell">
                    {investor.lastContact}
                  </td>
                  <td className="em-contact-table-cell em-contact-next-followup-cell">
                    {investor.nextFollowUp}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className="em-contact-footer">
          <div className="em-contact-results-info">
            Showing <span className="em-contact-results-count">04</span> / {totalResults} Results
          </div>
          <div className="em-contact-pagination">
            <button 
              className="em-contact-page-btn em-contact-page-btn--prev"
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
              className={`em-contact-page-number ${currentPage === 1 ? 'em-contact-page-number--active' : ''}`}
              onClick={() => handlePageChange(1)}
              type="button"
              aria-label="Page 1"
              title="Go to page 1"
            >
              1
            </button>
            <button 
              className={`em-contact-page-number ${currentPage === 2 ? 'em-contact-page-number--active' : ''}`}
              onClick={() => handlePageChange(2)}
              type="button"
              aria-label="Page 2"
              title="Go to page 2"
            >
              2
            </button>
            <button 
              className={`em-contact-page-number ${currentPage === 3 ? 'em-contact-page-number--active' : ''}`}
              onClick={() => handlePageChange(3)}
              type="button"
              aria-label="Page 3"
              title="Go to page 3"
            >
              3
            </button>
            <span className="em-contact-page-ellipsis">...</span>
            <button 
              className={`em-contact-page-number ${currentPage === 20 ? 'em-contact-page-number--active' : ''}`}
              onClick={() => handlePageChange(20)}
              type="button"
              aria-label="Page 20"
              title="Go to page 20"
            >
              20
            </button>
            <button 
              className="em-contact-page-btn em-contact-page-btn--next"
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
        <div className="em-contact-disclaimer">
          Market data is updated in real-time. Prices are for reference only and may vary across exchanges.
        </div>
      </div>

      {/* Engagement Analytics */}
      <div className="engagement-analytics">
        <Engagement />
        <Status />
      </div>

      {/* Upcoming and Calendar */}
      <div className="upcoming-calendar-analytics">
        <Upcoming />
        <Calendar />
      </div>

      {/* Smart Insights */}
      <div className="smart-insights-wrapper">
        <SmartInsights />
      </div>
    </>
  );
}
