import React from 'react';
import Header from './Header';
import DocumentContent from './DocumentContent';
import ComplianceDashboard from './ComplianceDashboard';

export default function DocumentsPage({ toggleTheme, sidebarCollapsed }) {
  return (
    <>
      <Header toggleTheme={toggleTheme} />
      <DocumentContent sidebarCollapsed={sidebarCollapsed} />
      <ComplianceDashboard />
    </>
  );
}