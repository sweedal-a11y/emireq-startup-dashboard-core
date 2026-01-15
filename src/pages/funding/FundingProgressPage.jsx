import React from 'react';
import Header from './Header';
import FundingContent from './FundingContent';
import FundingOverview from './FundingOverview';

export default function FundingProgressPage({ toggleTheme, sidebarCollapsed }) {
  return (
    <>
      <Header toggleTheme={toggleTheme} />
      <FundingContent sidebarCollapsed={sidebarCollapsed} />
      <FundingOverview sidebarCollapsed={sidebarCollapsed} />
    </>
  );
}
