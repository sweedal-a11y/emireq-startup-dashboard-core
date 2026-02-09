import React, { useState } from 'react';
import FinancialSidebar from '../../components/financial-sidebar/FinancialSidebar';
import Header from './Header';
import LogoutConfirmModal from '../../components/logout-modal/LogoutConfirmModal';
import { useNavigate } from 'react-router-dom';
import './TreasuryLiquidityManagement.css';

export default function TreasuryLiquidityManagement() {
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
    const reportData = {
      title: 'Treasury & Liquidity Management Report',
      generatedDate: new Date().toLocaleDateString('en-US', { 
        year: 'numeric', 
        month: 'long', 
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
      }),
      liquidityStatus: 'Optimal',
      metrics: {
        totalLiquidity: '$156.2M',
        reserveRequirements: '$28.5M',
        shortTermLiquidity: '$111.7M',
        longTermLiquidity: '$44.5M',
        idleCapitalIdentified: '$8.3M',
        centralTreasuryPool: '$156.2M'
      },
      liquidityBuckets: {
        'T+0 (Immediate)': { amount: '$43.2M', percentage: '49%' },
        'T+7 (1 Week)': { amount: '$68.6M', percentage: '43%' },
        'T+30 (1 Month)': { amount: '$44.5M', percentage: '38%' }
      },
      cashFlowMonitoring: {
        operatingInflows: '$89.3M',
        investmentInflows: '$23.7M',
        financingInflows: '$12.4M',
        projectingOutflows: '$15.2M',
        investmentOutflows: '$18.9M',
        operatingOutflows: '$54.8M'
      },
      stressScenarios: [
        'Mild Stress: Liquidity adequate for 90+ days with no external funding',
        'Moderate Stress: Liquidity adequate for 45+ days; contingency plans available',
        'Severe Stress: Emergency liquidity facilities accessible within 24 hours'
      ]
    };

    const jsonData = JSON.stringify(reportData, null, 2);
    const blob = new Blob([jsonData], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `Treasury_Liquidity_Report_${new Date().toISOString().split('T')[0]}.json`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  const handleQuickAccessClick = (path) => {
    if (path) {
      navigate(path);
    }
  };

  return (
    <div className={`treasury-liquidity-page ${isDarkMode ? 'dark-mode' : ''}`}>
      <FinancialSidebar onLogout={handleLogoutClick} />
      <div className="treasury-liquidity-main">
        <Header isDarkMode={isDarkMode} toggleTheme={toggleTheme} />
        <main className="treasury-liquidity-content">
          <div className="treasury-liquidity-container">
            {/* Page Header */}
            <div className="treasury-page-header">
              <div className="treasury-header-content">
               
                <h1>Treasury & Liquidity Management</h1>
                <p>Control money flow, liquidity, and solvency</p>
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

            {/* Liquidity Status Banner */}
            <div className="liquidity-status-banner">
              <div className="liquidity-banner-left">
                <div className="liquidity-status-indicator">
                  <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <circle cx="10" cy="10" r="8" fill="#0066FF" fillOpacity="0.1" stroke="#0066FF" strokeWidth="2"/>
                    <path d="M6 10L9 13L14 7" stroke="#0066FF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                  <span className="status-label">Liquidity Status: Optimal</span>
                </div>
                <div className="liquidity-main-info">
                  <h2 className="liquidity-amount">$156.2M Total Liquidity</h2>
                  <p className="liquidity-subtitle">71.4% above minimum reserve requirements</p>
                </div>
              </div>
              <div className="liquidity-banner-right">
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M10.6667 5.33333H14.6667V9.33333" stroke="#0066FF" strokeWidth="1.33" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M14.6667 5.33333L9.33333 10.6667L6.66667 8L1.33333 13.3333" stroke="#0066FF" strokeWidth="1.33" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
            </div>

            {/* Main Content Grid */}
            <div className="treasury-main-grid">
              {/* Left Column - Metrics */}
              <div className="treasury-left-col">
                {/* Cash Flow Cards */}
                <div className="cash-flow-grid">
                  {/* Total Cash Flow */}
                  <div className="treasury-metric-card">
                    <div className="treasury-metric-header">
                      <div className="metric-label-row">
                        <h3 className="metric-title">Total Cash Flow (Max)</h3>
                        <span className="metric-status positive">Positive</span>
                      </div>
                    </div>
                    <div className="treasury-metric-value">$42.1M</div>
                    <div className="treasury-metric-footer">
                      <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M10 4H2" stroke="#00A63E" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round"/>
                        <path d="M8 2L10 4L8 6" stroke="#00A63E" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                      <span>Inflows exceed outflows</span>
                    </div>
                  </div>

                  {/* Reserve Requirements */}
                  <div className="treasury-metric-card">
                    <div className="treasury-metric-header">
                      <div className="metric-label-row">
                        <h3 className="metric-title">Reserve Requirements</h3>
                        <span className="metric-status met">Met</span>
                      </div>
                    </div>
                    <div className="treasury-metric-value">$28.5M</div>
                    <div className="treasury-metric-footer">
                      <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <circle cx="6" cy="6" r="5" fill="#00A63E" fillOpacity="0.1" stroke="#00A63E" strokeWidth="1"/>
                        <path d="M4 6L5.5 7.5L8 4.5" stroke="#00A63E" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                      <span>Minimum reserve maintained</span>
                    </div>
                  </div>

                  {/* Short-term Liquidity */}
                  <div className="treasury-metric-card">
                    <div className="treasury-metric-header">
                      <div className="metric-label-row">
                        <h3 className="metric-title">Short-term Liquidity</h3>
                        <span className="metric-status optimal">Optimal</span>
                      </div>
                    </div>
                    <div className="treasury-metric-value">$111.7M</div>
                    <div className="treasury-metric-footer">
                      <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M9 3.5H3V8.5H9V3.5Z" stroke="#00A63E" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round"/>
                        <circle cx="6" cy="6" r="1" fill="#00A63E"/>
                      </svg>
                      <span>Available within 30 days</span>
                    </div>
                  </div>

                  {/* Long-term Liquidity */}
                  <div className="treasury-metric-card">
                    <div className="treasury-metric-header">
                      <div className="metric-label-row">
                        <h3 className="metric-title">Long-term Liquidity</h3>
                        <span className="metric-status adequate">Adequate</span>
                      </div>
                    </div>
                    <div className="treasury-metric-value">$44.5M</div>
                    <div className="treasury-metric-footer">
                      <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <rect x="2" y="2" width="8" height="8" rx="1" stroke="#00A63E" strokeWidth="1"/>
                        <path d="M2 6H10" stroke="#00A63E" strokeWidth="1"/>
                      </svg>
                      <span>Future planning secured</span>
                    </div>
                  </div>

                  {/* Idle Capital Identified */}
                  <div className="treasury-metric-card warning">
                    <div className="treasury-metric-header">
                      <div className="metric-label-row">
                        <h3 className="metric-title">Idle Capital Identified</h3>
                        <span className="metric-status action">Action</span>
                      </div>
                    </div>
                    <div className="treasury-metric-value">$8.3M</div>
                    <div className="treasury-metric-footer">
                      <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <circle cx="6" cy="6" r="4" stroke="#F59E0B" strokeWidth="1"/>
                        <path d="M6 4V6.5" stroke="#F59E0B" strokeWidth="1" strokeLinecap="round"/>
                        <circle cx="6" cy="8" r="0.5" fill="#F59E0B"/>
                      </svg>
                      <span>Optimization opportunity</span>
                    </div>
                  </div>

                  {/* Central Treasury Pool */}
                  <div className="treasury-metric-card">
                    <div className="treasury-metric-header">
                      <div className="metric-label-row">
                        <h3 className="metric-title">Central Treasury Pool</h3>
                        <span className="metric-status healthy">Healthy</span>
                      </div>
                    </div>
                    <div className="treasury-metric-value">$156.2M</div>
                    <div className="treasury-metric-footer">
                      <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <circle cx="6" cy="6" r="4" stroke="#00A63E" strokeWidth="1"/>
                        <circle cx="6" cy="6" r="2" fill="#00A63E"/>
                      </svg>
                      <span>Centralized liquidity</span>
                    </div>
                  </div>
                </div>

                {/* Liquidity Buckets */}
                <div className="liquidity-buckets-card">
                  <div className="buckets-header">
                    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M10 18.3333C14.6024 18.3333 18.3333 14.6024 18.3333 10C18.3333 5.39763 14.6024 1.66667 10 1.66667C5.39763 1.66667 1.66667 5.39763 1.66667 10C1.66667 14.6024 5.39763 18.3333 10 18.3333Z" stroke="currentColor" strokeWidth="1.67" strokeLinecap="round" strokeLinejoin="round"/>
                      <path d="M10 5V10L13.3333 11.6667" stroke="currentColor" strokeWidth="1.67" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                    <h3>Liquidity Buckets</h3>
                  </div>
                  
                  <div className="bucket-item">
                    <div className="bucket-label">
                      <span className="bucket-name">T+0 (Immediate)</span>
                      <span className="bucket-amount">$43.2M <span className="bucket-percentage">(49%)</span></span>
                    </div>
                    <div className="bucket-bar">
                      <div className="bucket-fill immediate" style={{ width: '49%' }}></div>
                    </div>
                  </div>

                  <div className="bucket-item">
                    <div className="bucket-label">
                      <span className="bucket-name">T+7 (1 Week)</span>
                      <span className="bucket-amount">$68.6M <span className="bucket-percentage">(43%)</span></span>
                    </div>
                    <div className="bucket-bar">
                      <div className="bucket-fill week" style={{ width: '43%' }}></div>
                    </div>
                  </div>

                  <div className="bucket-item">
                    <div className="bucket-label">
                      <span className="bucket-name">T+30 (1 Month)</span>
                      <span className="bucket-amount">$44.5M <span className="bucket-percentage">(38%)</span></span>
                    </div>
                    <div className="bucket-bar">
                      <div className="bucket-fill month" style={{ width: '38%' }}></div>
                    </div>
                  </div>
                </div>

                {/* Cash Flow Monitoring */}
                <div className="cash-flow-monitoring-card">
                  <div className="monitoring-header">
                    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M2.5 10H17.5" stroke="currentColor" strokeWidth="1.67" strokeLinecap="round" strokeLinejoin="round"/>
                      <path d="M2.5 5H17.5" stroke="currentColor" strokeWidth="1.67" strokeLinecap="round" strokeLinejoin="round"/>
                      <path d="M2.5 15H17.5" stroke="currentColor" strokeWidth="1.67" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                    <h3>Cash Flow Monitoring</h3>
                  </div>

                  <div className="cash-flow-grid-monitoring">
                    <div className="cash-flow-item">
                      <div className="cash-flow-label">
                        <span className="flow-name">Operating Inflows</span>
                        <div className="flow-indicator positive">
                          <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                            <path d="M2 6L6 2L10 6" stroke="#00A63E" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                            <path d="M6 2V10" stroke="#00A63E" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                          </svg>
                          <span>+12%</span>
                        </div>
                      </div>
                      <div className="flow-amount">$89.3M</div>
                    </div>

                    <div className="cash-flow-item">
                      <div className="cash-flow-label">
                        <span className="flow-name">Investment Inflows</span>
                        <div className="flow-indicator positive">
                          <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                            <path d="M2 6L6 2L10 6" stroke="#00A63E" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                            <path d="M6 2V10" stroke="#00A63E" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                          </svg>
                          <span>+8%</span>
                        </div>
                      </div>
                      <div className="flow-amount">$23.7M</div>
                    </div>

                    <div className="cash-flow-item">
                      <div className="cash-flow-label">
                        <span className="flow-name">Financing Inflows</span>
                        <div className="flow-indicator positive">
                          <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                            <path d="M2 6L6 2L10 6" stroke="#00A63E" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                            <path d="M6 2V10" stroke="#00A63E" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                          </svg>
                          <span>+15%</span>
                        </div>
                      </div>
                      <div className="flow-amount">$12.4M</div>
                    </div>

                    <div className="cash-flow-item">
                      <div className="cash-flow-label">
                        <span className="flow-name">Projecting Outflows</span>
                        <div className="flow-indicator negative">
                          <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                            <path d="M2 6L6 10L10 6" stroke="#DC2626" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                            <path d="M6 2V10" stroke="#DC2626" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                          </svg>
                          <span>-3%</span>
                        </div>
                      </div>
                      <div className="flow-amount">$15.2M</div>
                    </div>

                    <div className="cash-flow-item">
                      <div className="cash-flow-label">
                        <span className="flow-name">Investment Outflows</span>
                        <div className="flow-indicator negative">
                          <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                            <path d="M2 6L6 10L10 6" stroke="#DC2626" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                            <path d="M6 2V10" stroke="#DC2626" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                          </svg>
                          <span>-2%</span>
                        </div>
                      </div>
                      <div className="flow-amount">$18.9M</div>
                    </div>

                    <div className="cash-flow-item">
                      <div className="cash-flow-label">
                        <span className="flow-name">Operating Outflows</span>
                        <div className="flow-indicator negative">
                          <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                            <path d="M2 6L6 10L10 6" stroke="#DC2626" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                            <path d="M6 2V10" stroke="#DC2626" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                          </svg>
                          <span>-5%</span>
                        </div>
                      </div>
                      <div className="flow-amount">$54.8M</div>
                    </div>
                  </div>
                </div>

                {/* Stress-tested Liquidity Scenarios */}
                <div className="stress-scenarios-card">
                  <div className="scenarios-header">
                    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M10 18.3333C14.6024 18.3333 18.3333 14.6024 18.3333 10C18.3333 5.39763 14.6024 1.66667 10 1.66667C5.39763 1.66667 1.66667 5.39763 1.66667 10C1.66667 14.6024 5.39763 18.3333 10 18.3333Z" stroke="currentColor" strokeWidth="1.67" strokeLinecap="round" strokeLinejoin="round"/>
                      <path d="M10 6.66667V10" stroke="currentColor" strokeWidth="1.67" strokeLinecap="round" strokeLinejoin="round"/>
                      <path d="M10 13.3333H10.0083" stroke="currentColor" strokeWidth="1.67" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                    <h3>Stress-tested Liquidity Scenarios</h3>
                  </div>
                  <div className="scenarios-content">
                    <div className="scenario-item">
                      <div className="scenario-bullet mild"></div>
                      <div className="scenario-text">
                        <strong>Mild Stress:</strong> Liquidity adequate for 90+ days with no external funding
                      </div>
                    </div>
                    
                    <div className="scenario-item">
                      <div className="scenario-bullet moderate"></div>
                      <div className="scenario-text">
                        <strong>Moderate Stress:</strong> Liquidity adequate for 45+ days; contingency plans available
                      </div>
                    </div>
                    
                    <div className="scenario-item">
                      <div className="scenario-bullet severe"></div>
                      <div className="scenario-text">
                        <strong>Severe Stress:</strong> Emergency liquidity facilities accessible within 24 hours
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Right Column - Quick Access */}
              <div className="treasury-right-col">
                <div className="quick-access-card">
                  <h3>Quick Access</h3>
                  <div className="quick-access-list">
                    <button className="quick-access-item" onClick={() => handleQuickAccessClick('/financial-core/overview')}>
                      <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
                        <rect x="2" y="2" width="6" height="6" rx="1" stroke="currentColor" strokeWidth="1.5"/>
                        <rect x="10" y="2" width="6" height="6" rx="1" stroke="currentColor" strokeWidth="1.5"/>
                        <rect x="2" y="10" width="6" height="6" rx="1" stroke="currentColor" strokeWidth="1.5"/>
                        <rect x="10" y="10" width="6" height="6" rx="1" stroke="currentColor" strokeWidth="1.5"/>
                      </svg>
                      <span>Core Financial Overview</span>
                    </button>
                    
                    <button className="quick-access-item active" onClick={() => handleQuickAccessClick('/financial-core/treasury-liquidity')}>
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
