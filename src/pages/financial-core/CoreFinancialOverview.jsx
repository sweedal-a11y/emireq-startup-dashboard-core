import React, { useState } from 'react';
import FinancialSidebar from '../../components/financial-sidebar/FinancialSidebar';
import Header from './Header';
import LogoutConfirmModal from '../../components/logout-modal/LogoutConfirmModal';
import { useNavigate } from 'react-router-dom';
import './CoreFinancialOverview.css';

export default function CoreFinancialOverview() {
  const navigate = useNavigate();
  const [showLogoutModal, setShowLogoutModal] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);

  const toggleTheme = () => {
    setIsDarkMode(prev => !prev);
  };

  const handleLogoutClick = () => {
    setShowLogoutModal(true);
  };

  const handleCloseLogoutModal = () => {
    setShowLogoutModal(false);
  };

  const handleConfirmLogout = () => {
    localStorage.removeItem("authToken");
    sessionStorage.clear();
    setShowLogoutModal(false);
    navigate("/auth/login");
  };

  const handleExportReport = () => {
    // Create report data
    const reportData = {
      title: 'Core Financial Overview Report',
      generatedDate: new Date().toLocaleDateString('en-US', { 
        year: 'numeric', 
        month: 'long', 
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
      }),
      healthScore: '92/100',
      metrics: {
        totalAssets: '$847.3M',
        totalLiabilities: '$312.8M',
        netFinancialPosition: '$534.5M',
        cashLiquidity: '$156.2M',
        capitalAdequacyRatio: '18.4%',
        systemExposure: '$1.2B',
        stabilityIndex: '876',
        healthScore: '92/100'
      },
      summary: [
        'Financial Position: Net assets increased by 18.7% driven by strong operational performance and asset appreciation.',
        'Liquidity Status: Cash reserves exceed minimum requirements with 156.2M readily available.',
        'Capital Strength: CAR of 18.4% significantly above regulatory minimum of 10.5%.',
        'Risk Alert: System-wide exposure requires monitoring due to increased market positions.'
      ]
    };

    // Convert to JSON string with formatting
    const jsonData = JSON.stringify(reportData, null, 2);
    
    // Create blob and download
    const blob = new Blob([jsonData], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `Financial_Overview_Report_${new Date().toISOString().split('T')[0]}.json`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);

    // Show success feedback
    console.log('Report exported successfully!');
  };

  const handleQuickAccessClick = (path) => {
    if (path) {
      navigate(path);
    }
  };

  return (
    <div className={`core-financial-overview-page ${isDarkMode ? 'dark-mode' : ''}`}>
      <FinancialSidebar onLogout={handleLogoutClick} />
      <div className="core-financial-main">
        <Header isDarkMode={isDarkMode} toggleTheme={toggleTheme} />
        <main className="core-financial-content">
          <div className="core-financial-container">
            {/* Page Header */}
            <div className="core-page-header">
              <div className="core-header-content">
                <h1>Core Financial Overview</h1>
                <p>Executive Layer - Single-glance health of the entire financial ecosystem</p>
              </div>
              <button className="export-report-btn" onClick={handleExportReport}>
                <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M17.5 12.5V15.8333C17.5 16.2754 17.3244 16.6993 17.0118 17.0118C16.6993 17.3244 16.2754 17.5 15.8333 17.5H4.16667C3.72464 17.5 3.30072 17.3244 2.98816 17.0118C2.67559 16.6993 2.5 16.2754 2.5 15.8333V12.5" stroke="currentColor" strokeWidth="1.66667" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M5.83333 8.33333L10 12.5L14.1667 8.33333" stroke="currentColor" strokeWidth="1.66667" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M10 12.5V2.5" stroke="currentColor" strokeWidth="1.66667" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
                Export Report
              </button>
            </div>

            {/* Health Status Banner */}
            <div className="health-status-banner">
              <div className="health-banner-left">
                <div className="health-status-indicator">
                  <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
<g clip-path="url(#clip0_37_7494)">
<path d="M18.3333 9.99999H16.2667C15.9025 9.99921 15.548 10.1177 15.2576 10.3375C14.9671 10.5572 14.7567 10.866 14.6583 11.2167L12.7 18.1833C12.6874 18.2266 12.6611 18.2646 12.625 18.2917C12.5889 18.3187 12.5451 18.3333 12.5 18.3333C12.4549 18.3333 12.4111 18.3187 12.375 18.2917C12.3389 18.2646 12.3126 18.2266 12.3 18.1833L7.7 1.81666C7.68738 1.77338 7.66106 1.73537 7.625 1.70832C7.58894 1.68128 7.54507 1.66666 7.5 1.66666C7.45492 1.66666 7.41106 1.68128 7.375 1.70832C7.33894 1.73537 7.31262 1.77338 7.3 1.81666L5.34166 8.78332C5.24372 9.13262 5.03448 9.44042 4.74572 9.66C4.45695 9.87958 4.10443 9.99895 3.74166 9.99999H1.66666" stroke="#00A63E" stroke-width="1.66667" stroke-linecap="round" stroke-linejoin="round"/>
</g>
<defs>
<clipPath id="clip0_37_7494">
<rect width="20" height="20" fill="white"/>
</clipPath>
</defs>
</svg>

                  <span className="status-label">System Status: Healthy</span>
                </div>
                <div className="health-score-section">
                  <h2 className="health-score-title">Financial Health Score: <span className="score-value">92/100</span></h2>
                  <p className="health-score-subtitle" style={{ color: '#00A63E' }}>All core metrics within optimal range</p>
                </div>
              </div>
              <div className="health-banner-right">
                <div className="score-change">
               
                  <span style={{ color: '#00B031' }}>+3 points</span>
                </div>
                <span className="period-label" style={{ color: '#00B031' }}>vs last period</span>
              </div>
            </div>

            {/* Main Content Grid */}
            <div className="core-main-grid">
              {/* Left Column - Metrics */}
              <div className="core-left-col">
                {/* Financial Metrics Grid */}
                <div className="core-metrics-grid">
                  {/* Total Assets Under Monitoring */}
                  <div className="core-metric-card">
                    <div className="core-metric-header">
                      <h3 className="metric-title">Total Assets Under Monitoring</h3>
                      <div className="metric-change-indicator positive">
                        <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path d="M9.33337 4.08331H12.8334V7.58331" stroke="#00A63E" strokeWidth="1.16667" strokeLinecap="round" strokeLinejoin="round"/>
                          <path d="M12.8334 4.08331L7.58337 9.33331L4.95837 6.70831L1.16669 10.5" stroke="#00A63E" strokeWidth="1.16667" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                        <span>+12.4%</span>
                      </div>
                    </div>
                    <div className="core-metric-value">$847.3M</div>
                    <div className="core-metric-footer">vs last period</div>
                  </div>

                  {/* Total Liabilities */}
                  <div className="core-metric-card">
                    <div className="core-metric-header">
                      <h3 className="metric-title">Total Liabilities</h3>
                      <div className="metric-change-indicator negative">
                        <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path d="M4.66663 9.91669H1.16663V6.41669" stroke="#00A63E" strokeWidth="1.16667" strokeLinecap="round" strokeLinejoin="round"/>
                          <path d="M1.16663 9.91669L6.41663 4.66669L9.04163 7.29169L12.8333 3.5" stroke="#00A63E" strokeWidth="1.16667" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                        <span>-3.2%</span>
                      </div>
                    </div>
                    <div className="core-metric-value">$312.8M</div>
                    <div className="core-metric-footer">vs last period</div>
                  </div>

                  {/* Net Financial Position */}
                  <div className="core-metric-card">
                    <div className="core-metric-header">
                      <h3 className="metric-title">Net Financial Position</h3>
                      <div className="metric-change-indicator positive">
                        <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path d="M9.33337 4.08331H12.8334V7.58331" stroke="#00A63E" strokeWidth="1.16667" strokeLinecap="round" strokeLinejoin="round"/>
                          <path d="M12.8334 4.08331L7.58337 9.33331L4.95837 6.70831L1.16669 10.5" stroke="#00A63E" strokeWidth="1.16667" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                        <span>+18.7%</span>
                      </div>
                    </div>
                    <div className="core-metric-value">$534.5M</div>
                    <div className="core-metric-footer">vs last period</div>
                  </div>

                  {/* Cash & Liquidity Position */}
                  <div className="core-metric-card">
                    <div className="core-metric-header">
                      <h3 className="metric-title">Cash & Liquidity Position</h3>
                      <div className="metric-change-indicator positive">
                        <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path d="M9.33337 4.08331H12.8334V7.58331" stroke="#00A63E" strokeWidth="1.16667" strokeLinecap="round" strokeLinejoin="round"/>
                          <path d="M12.8334 4.08331L7.58337 9.33331L4.95837 6.70831L1.16669 10.5" stroke="#00A63E" strokeWidth="1.16667" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                        <span>+8.9%</span>
                      </div>
                    </div>
                    <div className="core-metric-value">$156.2M</div>
                    <div className="core-metric-footer">vs last period</div>
                  </div>

                  {/* Capital Adequacy Ratio */}
                  <div className="core-metric-card">
                    <div className="core-metric-header">
                      <h3 className="metric-title">Capital Adequacy Ratio</h3>
                      <div className="metric-change-indicator positive">
                        <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path d="M9.33337 4.08331H12.8334V7.58331" stroke="#00A63E" strokeWidth="1.16667" strokeLinecap="round" strokeLinejoin="round"/>
                          <path d="M12.8334 4.08331L7.58337 9.33331L4.95837 6.70831L1.16669 10.5" stroke="#00A63E" strokeWidth="1.16667" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                        <span>+2.1%</span>
                      </div>
                    </div>
                    <div className="core-metric-value">18.4%</div>
                    <div className="core-metric-footer">vs last period</div>
                  </div>

                  {/* System-wide Exposure */}
                  <div className="core-metric-card warning" style={{ borderColor: '#F59E0B' }}>
                    <div className="core-metric-header">
                      <h3 className="metric-title">System-wide Exposure</h3>
                      <div className="metric-change-indicator warning">
                        <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path d="M9.33337 4.08331H12.8334V7.58331" stroke="#F59E0B" strokeWidth="1.16667" strokeLinecap="round" strokeLinejoin="round"/>
                          <path d="M12.8334 4.08331L7.58337 9.33331L4.95837 6.70831L1.16669 10.5" stroke="#F59E0B" strokeWidth="1.16667" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                        <span>+5.3%</span>
                      </div>
                    </div>
                    <div className="core-metric-value">$1.2B</div>
                    <div className="core-metric-footer">vs last period</div>
                    <div className="warning-badge" style={{ position: 'absolute', top: '12px', right: '12px' }}>
                      <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <circle cx="6" cy="6" r="5" stroke="#F59E0B" strokeWidth="1"/>
                        <path d="M6 3.5V6.5" stroke="#F59E0B" strokeWidth="1" strokeLinecap="round"/>
                        <circle cx="6" cy="8.5" r="0.5" fill="#F59E0B"/>
                      </svg>
                    </div>
                  </div>

                  {/* Financial Stability Index */}
                  <div className="core-metric-card">
                    <div className="core-metric-header">
                      <h3 className="metric-title">Financial Stability Index</h3>
                      <div className="metric-change-indicator positive">
                        <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path d="M9.33337 4.08331H12.8334V7.58331" stroke="#00A63E" strokeWidth="1.16667" strokeLinecap="round" strokeLinejoin="round"/>
                          <path d="M12.8334 4.08331L7.58337 9.33331L4.95837 6.70831L1.16669 10.5" stroke="#00A63E" strokeWidth="1.16667" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                        <span>+4.2</span>
                      </div>
                    </div>
                    <div className="core-metric-value">876</div>
                    <div className="core-metric-footer">vs last period</div>
                  </div>

                  {/* Real-time Financial Health Score */}
                  <div className="core-metric-card">
                    <div className="core-metric-header">
                      <h3 className="metric-title">Real-time Financial Health Score</h3>
                      <div className="metric-change-indicator positive">
                        <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path d="M9.33337 4.08331H12.8334V7.58331" stroke="#00A63E" strokeWidth="1.16667" strokeLinecap="round" strokeLinejoin="round"/>
                          <path d="M12.8334 4.08331L7.58337 9.33331L4.95837 6.70831L1.16669 10.5" stroke="#00A63E" strokeWidth="1.16667" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                        <span>+3</span>
                      </div>
                    </div>
                    <div className="core-metric-value">92/100</div>
                    <div className="core-metric-footer">vs last period</div>
                  </div>
                </div>

                {/* Executive Summary */}
                <div className="executive-summary-card">
                  <h3 className="summary-title">Executive Summary</h3>
                  <div className="summary-content">
                    <div className="summary-item">
                      <div className="summary-bullet"></div>
                      <div className="summary-text">
                        <strong>Financial Position:</strong> Net assets increased by 18.7% driven by strong operational performance and asset appreciation.
                      </div>
                    </div>
                    
                    <div className="summary-item">
                      <div className="summary-bullet"></div>
                      <div className="summary-text">
                        <strong>Liquidity Status:</strong> Cash reserves exceed minimum requirements with 156.2M readily available.
                      </div>
                    </div>
                    
                    <div className="summary-item">
                      <div className="summary-bullet"></div>
                      <div className="summary-text">
                        <strong>Capital Strength:</strong> CAR of 18.4% significantly above regulatory minimum of 10.5%.
                      </div>
                    </div>
                    
                    <div className="summary-item">
                      <div className="summary-bullet"></div>
                      <div className="summary-text">
                        <strong>Risk Alert:</strong> System-wide exposure requires monitoring due to increased market positions.
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Right Column - Quick Access */}
              <div className="core-right-col">
                <div className="quick-access-card">
                  <h3>Quick Access</h3>
                  <div className="quick-access-list">
                    <button className="quick-access-item active" onClick={() => handleQuickAccessClick('/financial-core/overview')}>
                      <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
                        <rect x="2" y="2" width="6" height="6" rx="1" stroke="currentColor" strokeWidth="1.5"/>
                        <rect x="10" y="2" width="6" height="6" rx="1" stroke="currentColor" strokeWidth="1.5"/>
                        <rect x="2" y="10" width="6" height="6" rx="1" stroke="currentColor" strokeWidth="1.5"/>
                        <rect x="10" y="10" width="6" height="6" rx="1" stroke="currentColor" strokeWidth="1.5"/>
                      </svg>
                      <span>Core Financial Overview</span>
                    </button>
                    
                    <button className="quick-access-item" onClick={() => handleQuickAccessClick('/financial-core/treasury-liquidity')}>
                      <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
                        <rect x="2" y="2" width="6" height="6" rx="1" stroke="currentColor" strokeWidth="1.5"/>
                        <rect x="10" y="2" width="6" height="6" rx="1" stroke="currentColor" strokeWidth="1.5"/>
                        <rect x="2" y="10" width="6" height="6" rx="1" stroke="currentColor" strokeWidth="1.5"/>
                        <rect x="10" y="10" width="6" height="6" rx="1" stroke="currentColor" strokeWidth="1.5"/>
                      </svg>
                      <span>Treasury & Liquidity Management</span>
                    </button>
                    
                    <button className="quick-access-item" onClick={() => handleQuickAccessClick('/financial-core')}>
                      <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
                        <rect x="2" y="2" width="6" height="6" rx="1" stroke="currentColor" strokeWidth="1.5"/>
                        <rect x="10" y="2" width="6" height="6" rx="1" stroke="currentColor" strokeWidth="1.5"/>
                        <rect x="2" y="10" width="6" height="6" rx="1" stroke="currentColor" strokeWidth="1.5"/>
                        <rect x="10" y="10" width="6" height="6" rx="1" stroke="currentColor" strokeWidth="1.5"/>
                      </svg>
                      <span>Asset Management Core</span>
                    </button>
                    
                    <button className="quick-access-item" onClick={() => handleQuickAccessClick('/financial-core')}>
                      <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
                        <rect x="2" y="2" width="6" height="6" rx="1" stroke="currentColor" strokeWidth="1.5"/>
                        <rect x="10" y="2" width="6" height="6" rx="1" stroke="currentColor" strokeWidth="1.5"/>
                        <rect x="2" y="10" width="6" height="6" rx="1" stroke="currentColor" strokeWidth="1.5"/>
                        <rect x="10" y="10" width="6" height="6" rx="1" stroke="currentColor" strokeWidth="1.5"/>
                      </svg>
                      <span>Liability & Obligation Management</span>
                    </button>
                    
                    <button className="quick-access-item" onClick={() => handleQuickAccessClick('/financial-core')}>
                      <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
                        <rect x="2" y="2" width="6" height="6" rx="1" stroke="currentColor" strokeWidth="1.5"/>
                        <rect x="10" y="2" width="6" height="6" rx="1" stroke="currentColor" strokeWidth="1.5"/>
                        <rect x="2" y="10" width="6" height="6" rx="1" stroke="currentColor" strokeWidth="1.5"/>
                        <rect x="10" y="10" width="6" height="6" rx="1" stroke="currentColor" strokeWidth="1.5"/>
                      </svg>
                      <span>Risk Management Core</span>
                    </button>
                    
                    <button className="quick-access-item" onClick={() => handleQuickAccessClick('/financial-core')}>
                      <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
                        <rect x="2" y="2" width="6" height="6" rx="1" stroke="currentColor" strokeWidth="1.5"/>
                        <rect x="10" y="2" width="6" height="6" rx="1" stroke="currentColor" strokeWidth="1.5"/>
                        <rect x="2" y="10" width="6" height="6" rx="1" stroke="currentColor" strokeWidth="1.5"/>
                        <rect x="10" y="10" width="6" height="6" rx="1" stroke="currentColor" strokeWidth="1.5"/>
                      </svg>
                      <span>Compliance & Regulatory Core</span>
                    </button>
                    
                    <button className="quick-access-item" onClick={() => handleQuickAccessClick('/financial-core')}>
                      <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
                        <rect x="2" y="2" width="6" height="6" rx="1" stroke="currentColor" strokeWidth="1.5"/>
                        <rect x="10" y="2" width="6" height="6" rx="1" stroke="currentColor" strokeWidth="1.5"/>
                        <rect x="2" y="10" width="6" height="6" rx="1" stroke="currentColor" strokeWidth="1.5"/>
                        <rect x="10" y="10" width="6" height="6" rx="1" stroke="currentColor" strokeWidth="1.5"/>
                      </svg>
                      <span>Transaction & Payments Core</span>
                    </button>
                    
                    <button className="quick-access-item" onClick={() => handleQuickAccessClick('/financial-core')}>
                      <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
                        <rect x="2" y="2" width="6" height="6" rx="1" stroke="currentColor" strokeWidth="1.5"/>
                        <rect x="10" y="2" width="6" height="6" rx="1" stroke="currentColor" strokeWidth="1.5"/>
                        <rect x="2" y="10" width="6" height="6" rx="1" stroke="currentColor" strokeWidth="1.5"/>
                        <rect x="10" y="10" width="6" height="6" rx="1" stroke="currentColor" strokeWidth="1.5"/>
                      </svg>
                      <span>Investment & Portfolio Intelligence</span>
                    </button>
                    
                    <button className="quick-access-item" onClick={() => handleQuickAccessClick('/financial-core')}>
                      <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
                        <rect x="2" y="2" width="6" height="6" rx="1" stroke="currentColor" strokeWidth="1.5"/>
                        <rect x="10" y="2" width="6" height="6" rx="1" stroke="currentColor" strokeWidth="1.5"/>
                        <rect x="2" y="10" width="6" height="6" rx="1" stroke="currentColor" strokeWidth="1.5"/>
                        <rect x="10" y="10" width="6" height="6" rx="1" stroke="currentColor" strokeWidth="1.5"/>
                      </svg>
                      <span>Market Intelligence Layer</span>
                    </button>
                    
                    <button className="quick-access-item" onClick={() => handleQuickAccessClick('/financial-core')}>
                      <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
                        <rect x="2" y="2" width="6" height="6" rx="1" stroke="currentColor" strokeWidth="1.5"/>
                        <rect x="10" y="2" width="6" height="6" rx="1" stroke="currentColor" strokeWidth="1.5"/>
                        <rect x="2" y="10" width="6" height="6" rx="1" stroke="currentColor" strokeWidth="1.5"/>
                        <rect x="10" y="10" width="6" height="6" rx="1" stroke="currentColor" strokeWidth="1.5"/>
                      </svg>
                      <span>Trust, Credibility & Scoring Engine</span>
                    </button>
                    
                    <button className="quick-access-item" onClick={() => handleQuickAccessClick('/financial-core')}>
                      <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
                        <rect x="2" y="2" width="6" height="6" rx="1" stroke="currentColor" strokeWidth="1.5"/>
                        <rect x="10" y="2" width="6" height="6" rx="1" stroke="currentColor" strokeWidth="1.5"/>
                        <rect x="2" y="10" width="6" height="6" rx="1" stroke="currentColor" strokeWidth="1.5"/>
                        <rect x="10" y="10" width="6" height="6" rx="1" stroke="currentColor" strokeWidth="1.5"/>
                      </svg>
                      <span>AI & Decision Intelligence Core</span>
                    </button>
                    
                    <button className="quick-access-item" onClick={() => handleQuickAccessClick('/financial-core')}>
                      <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
                        <rect x="2" y="2" width="6" height="6" rx="1" stroke="currentColor" strokeWidth="1.5"/>
                        <rect x="10" y="2" width="6" height="6" rx="1" stroke="currentColor" strokeWidth="1.5"/>
                        <rect x="2" y="10" width="6" height="6" rx="1" stroke="currentColor" strokeWidth="1.5"/>
                        <rect x="10" y="10" width="6" height="6" rx="1" stroke="currentColor" strokeWidth="1.5"/>
                      </svg>
                      <span>Reporting & Analytics Core</span>
                    </button>
                    
                    <button className="quick-access-item" onClick={() => handleQuickAccessClick('/financial-core')}>
                      <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
                        <rect x="2" y="2" width="6" height="6" rx="1" stroke="currentColor" strokeWidth="1.5"/>
                        <rect x="10" y="2" width="6" height="6" rx="1" stroke="currentColor" strokeWidth="1.5"/>
                        <rect x="2" y="10" width="6" height="6" rx="1" stroke="currentColor" strokeWidth="1.5"/>
                        <rect x="10" y="10" width="6" height="6" rx="1" stroke="currentColor" strokeWidth="1.5"/>
                      </svg>
                      <span>Access Control & Governance Layer</span>
                    </button>
                    
                    <button className="quick-access-item" onClick={() => handleQuickAccessClick('/financial-core')}>
                      <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
                        <rect x="2" y="2" width="6" height="6" rx="1" stroke="currentColor" strokeWidth="1.5"/>
                        <rect x="10" y="2" width="6" height="6" rx="1" stroke="currentColor" strokeWidth="1.5"/>
                        <rect x="2" y="10" width="6" height="6" rx="1" stroke="currentColor" strokeWidth="1.5"/>
                        <rect x="10" y="10" width="6" height="6" rx="1" stroke="currentColor" strokeWidth="1.5"/>
                      </svg>
                      <span>Cross-Border & Multi-Entity Core</span>
                    </button>
                    
                    <button className="quick-access-item" onClick={() => handleQuickAccessClick('/financial-core')}>
                      <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
                        <rect x="2" y="2" width="6" height="6" rx="1" stroke="currentColor" strokeWidth="1.5"/>
                        <rect x="10" y="2" width="6" height="6" rx="1" stroke="currentColor" strokeWidth="1.5"/>
                        <rect x="2" y="10" width="6" height="6" rx="1" stroke="currentColor" strokeWidth="1.5"/>
                        <rect x="10" y="10" width="6" height="6" rx="1" stroke="currentColor" strokeWidth="1.5"/>
                      </svg>
                      <span>Financial Resilience & Crisis Module</span>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>

      {showLogoutModal && (
        <LogoutConfirmModal
          onClose={handleCloseLogoutModal}
          onConfirm={handleConfirmLogout}
        />
      )}
    </div>
  );
}
