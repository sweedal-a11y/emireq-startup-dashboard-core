import React from 'react';
import './FundingContent.css';

export default function FundingContent({ status = 'approved', sidebarCollapsed }) {
  const getStatusConfig = (status) => {
    switch (status) {
      case 'approved':
        return {
          text: 'Approved',
          bgColor: 'var(--status-approved-bg, #dcfce7)',
          textColor: 'var(--status-approved-text, #166534)',
          iconColor: 'var(--status-approved-text, #166534)'
        };
      case 'pending':
        return {
          text: 'Pending',
          bgColor: 'var(--status-pending-bg, #fef3c7)',
          textColor: 'var(--status-pending-text, #92400e)',
          iconColor: 'var(--status-pending-text, #92400e)'
        };
      case 'rejected':
        return {
          text: 'Rejected',
          bgColor: 'var(--status-rejected-bg, #fee2e2)',
          textColor: 'var(--status-rejected-text, #dc2626)',
          iconColor: 'var(--status-rejected-text, #dc2626)'
        };
      default:
        return {
          text: 'Approved',
          bgColor: 'var(--status-approved-bg, #dcfce7)',
          textColor: 'var(--status-approved-text, #166534)',
          iconColor: 'var(--status-approved-text, #166534)'
        };
    }
  };

  const statusConfig = getStatusConfig(status);

  return (
    <div className={`funding-content ${sidebarCollapsed ? 'funding-content--sidebar-collapsed' : 'funding-content--sidebar-expanded'}`}>
      <div className="funding-content-container">
        <div className="funding-content-text">
          <h1 className="funding-content-title">Funding Status</h1>
          <p className="funding-content-subtitle">Track your fundraising progress and investor activity</p>
        </div>

        <div className="funding-content-status">
          <button className="funding-status-button" style={{
            backgroundColor: statusConfig.bgColor,
            color: statusConfig.textColor
          }}>
            <svg
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="funding-status-icon"
              style={{ color: statusConfig.iconColor }}
            >
              <path
                d="M20 6L9 17L4 12"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            {statusConfig.text}
          </button>
        </div>
      </div>
    </div>
  );
}