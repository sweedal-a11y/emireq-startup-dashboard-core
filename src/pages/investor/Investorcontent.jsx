import React from 'react';
import './Investorcontent.css';
import InvestorCards from './InvestorCards';
import InvestorInquiryPipeline from './InvestorInquiryPipeline';

const Investorcontent = ({ sidebarCollapsed }) => {
  return (
    <div className={`outreach-content ${sidebarCollapsed ? 'outreach-content--sidebar-collapsed' : ''}`}>
      <div className="outreach-header">
        <h1 className="outreach-title">Investor Inquires</h1>
        <p className="outreach-description">Manage Investor reaching out to your startup</p>
      </div>
      <InvestorCards />
      <InvestorInquiryPipeline sidebarCollapsed={sidebarCollapsed} />
    </div>
  );
};

export default Investorcontent;
