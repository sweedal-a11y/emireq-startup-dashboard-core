import React from 'react';
import Header from '../header/Header';
import StartupStatsCards from './StartupStatsCards';
import HeroBanner from './HeroBanner';
import CompanySummaryCard from './CompanySummaryCard';
import ChartsRow from './ChartsRow';
import RecentInvestorEngagementTable from './RecentInvestorEngagementTable';
import './StartupOverview.css';

export default function StartupOverview({ isDarkMode, toggleTheme, sidebarCollapsed }) {
  return (
    <div className={`em-startup-overview ${sidebarCollapsed ? 'em-startup-overview--sidebar-collapsed' : ''}`}>
      <Header isDarkMode={isDarkMode} toggleTheme={toggleTheme} />
      
      <div className="em-startup-overview-content">
        {/* Page Intro */}
        <section className="em-page-intro">
          <h1 className="em-page-title">Dashboard Overview</h1>
          <p className="em-page-subtitle">Assalamu Alaikum, welcome to your Islamic investment platform</p>
        </section>

        {/* Stats Cards */}
        <StartupStatsCards />

        {/* Hero Banner */}
        <HeroBanner />

        {/* Company Summary Card */}
        <CompanySummaryCard />

        {/* Charts Row */}
        <ChartsRow sidebarCollapsed={sidebarCollapsed} />

        {/* Recent Investor Engagement Table */}
        <RecentInvestorEngagementTable />
      </div>
    </div>
  );
}
