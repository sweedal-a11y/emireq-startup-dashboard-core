import React from 'react';
import './InvestorInquiriesPage.css';
import Header from './Header';
import Investorcontent from './Investorcontent';

export default function InvestorInquiriesPage({ isDarkMode, toggleTheme, sidebarCollapsed }) {
  return (
    <>
      <Header isDarkMode={isDarkMode} toggleTheme={toggleTheme} />
      <Investorcontent sidebarCollapsed={sidebarCollapsed} />
         
    </>
  );
}
