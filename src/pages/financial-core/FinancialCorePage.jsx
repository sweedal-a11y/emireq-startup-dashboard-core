import React, { useState } from 'react';
import FinancialSidebar from '../../components/financial-sidebar/FinancialSidebar';
import Header from './Header';
import LogoutConfirmModal from '../../components/logout-modal/LogoutConfirmModal';
import { useNavigate } from 'react-router-dom';
import './FinancialCorePage.css';

export default function FinancialCorePage() {
  const navigate = useNavigate();
  const [showLogoutModal, setShowLogoutModal] = useState(false);

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

  return (
    <div className="financial-core-page">
      <FinancialSidebar onLogout={handleLogoutClick} />
      <div className="financial-core-main">
        <Header />
        <main className="financial-core-content">
          <div className="financial-core-container">
            {/* Page Header */}
            <div className="financial-page-header">
              <h1>Financial Core</h1>
              <p>Real-time financial intelligence and compliance monitoring</p>
            </div>

            {/* Status Banner */}
            <div className="financial-status-banner">
              <div className="status-banner-content">
                <div className="status-icon">
                  <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                    <circle cx="10" cy="10" r="9" stroke="#10B981" strokeWidth="2" fill="none"/>
                    <path d="M6 10L9 13L14 7" stroke="#10B981" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </div>
                <div className="status-text">
                  <h3>Financial Core is active and healthy</h3>
                  <p>All systems operational • Last sync: 2 minutes ago</p>
                </div>
              </div>
              <div className="status-badge">LIVE</div>
            </div>

            {/* Main Content Grid */}
            <div className="financial-main-grid">
              {/* Left Column - Metrics & Charts */}
              <div className="financial-left-col">
                {/* Metrics Cards */}
                <div className="metrics-grid">
                  <div className="metric-card">
                    <div className="metric-icon cash">
                      <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                        <path d="M10 4V16M4 10H16" stroke="#10B981" strokeWidth="2" strokeLinecap="round"/>
                      </svg>
                    </div>
                    <div className="metric-header">
                      <span className="metric-label">Cash Balance</span>
                      <span className="metric-change positive">
                        <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                          <path d="M6 10V2M6 2L2 6M6 2L10 6" stroke="#10B981" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                        +12.5%
                      </span>
                    </div>
                    <div className="metric-value">$342,500</div>
                    <div className="metric-subtitle">Available funds</div>
                  </div>

                  <div className="metric-card">
                    <div className="metric-icon burn">
                      <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                        <path d="M10 2C8 4 6 6.5 6 9C6 11.21 7.79 13 10 13C12.21 13 14 11.21 14 9C14 6.5 12 4 10 2Z" stroke="#3B82F6" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                        <path d="M10 13V18" stroke="#3B82F6" strokeWidth="1.5" strokeLinecap="round"/>
                      </svg>
                    </div>
                    <div className="metric-header">
                      <span className="metric-label">Monthly Burn</span>
                      <span className="metric-change negative">
                        <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                          <path d="M6 2V10M6 10L2 6M6 10L10 6" stroke="#EF4444" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                        -8.2%
                      </span>
                    </div>
                    <div className="metric-value">$48,000</div>
                    <div className="metric-subtitle">Avg. monthly spend</div>
                  </div>

                  <div className="metric-card">
                    <div className="metric-icon runway">
                      <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                        <rect x="3" y="4" width="14" height="12" rx="2" stroke="#8B5CF6" strokeWidth="1.5"/>
                        <path d="M3 8H17" stroke="#8B5CF6" strokeWidth="1.5"/>
                        <path d="M7 1V4M13 1V4" stroke="#8B5CF6" strokeWidth="1.5" strokeLinecap="round"/>
                      </svg>
                    </div>
                    <div className="metric-header">
                      <span className="metric-label">Runway</span>
                      <span className="metric-change positive">
                        <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                          <path d="M6 10V2M6 2L2 6M6 2L10 6" stroke="#10B981" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                        +0.4 mo
                      </span>
                    </div>
                    <div className="metric-value">7.1 months</div>
                    <div className="metric-subtitle">At current burn</div>
                  </div>

                  <div className="metric-card">
                    <div className="metric-icon revenue">
                      <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                        <path d="M3 13L7 9L10 12L17 5" stroke="#F59E0B" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                        <path d="M13 5H17V9" stroke="#F59E0B" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                    </div>
                    <div className="metric-header">
                      <span className="metric-label">Monthly Revenue</span>
                      <span className="metric-change positive">
                        <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                          <path d="M6 10V2M6 2L2 6M6 2L10 6" stroke="#10B981" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                        +15.3%
                      </span>
                    </div>
                    <div className="metric-value">$67,000</div>
                    <div className="metric-subtitle">Current month</div>
                  </div>
                </div>

                {/* Financial Trends Chart */}
                <div className="chart-card">
                  <div className="chart-header">
                    <h3>Financial Trends</h3>
                    <p>Revenue, expenses, and net balance over time</p>
                  </div>
                  <div className="chart-container">
                    <svg className="financial-chart" viewBox="0 0 600 300" preserveAspectRatio="xMidYMid meet">
                      {/* Y-axis labels */}
                      <text x="30" y="20" className="chart-label">$90M+</text>
                      <text x="30" y="85" className="chart-label">$60M+</text>
                      <text x="30" y="150" className="chart-label">$30M+</text>
                      <text x="30" y="215" className="chart-label">$20M+</text>
                      <text x="45" y="280" className="chart-label">0</text>
                      
                      {/* Grid lines */}
                      <line x1="70" y1="20" x2="580" y2="20" className="chart-grid"/>
                      <line x1="70" y1="85" x2="580" y2="85" className="chart-grid"/>
                      <line x1="70" y1="150" x2="580" y2="150" className="chart-grid"/>
                      <line x1="70" y1="215" x2="580" y2="215" className="chart-grid"/>
                      <line x1="70" y1="280" x2="580" y2="280" className="chart-grid"/>
                      
                      {/* Revenue line (green) */}
                      <path d="M 70 150 L 170 135 L 270 145 L 370 120 L 470 125 L 570 100" className="chart-line revenue" strokeWidth="2.5"/>
                      
                      {/* Expenses line (red) */}
                      <path d="M 70 200 L 170 195 L 270 190 L 370 185 L 470 180 L 570 175" className="chart-line expenses" strokeWidth="2.5"/>
                      
                      {/* Balance line (blue) */}
                      <path d="M 70 250 L 170 235 L 270 245 L 370 230 L 470 235 L 570 220" className="chart-line balance" strokeWidth="2.5"/>
                      
                      {/* Data points */}
                      <circle cx="170" cy="235" r="4" className="chart-point balance"/>
                      <circle cx="370" cy="230" r="4" className="chart-point balance"/>
                      <circle cx="570" cy="220" r="4" className="chart-point balance"/>
                      
                      {/* X-axis labels */}
                      <text x="70" y="295" className="chart-label-x">Jan</text>
                      <text x="170" y="295" className="chart-label-x">Feb</text>
                      <text x="270" y="295" className="chart-label-x">Mar</text>
                      <text x="370" y="295" className="chart-label-x">Apr</text>
                      <text x="470" y="295" className="chart-label-x">May</text>
                      <text x="565" y="295" className="chart-label-x">Jun</text>
                    </svg>
                  </div>
                  <div className="chart-legend">
                    <div className="legend-item">
                      <span className="legend-dot revenue"></span>
                      <span>Revenue</span>
                    </div>
                    <div className="legend-item">
                      <span className="legend-dot expenses"></span>
                      <span>Expenses</span>
                    </div>
                    <div className="legend-item">
                      <span className="legend-dot balance"></span>
                      <span>Balance</span>
                    </div>
                  </div>
                </div>

                {/* Compliance & Audit */}
                <div className="compliance-card">
                  <div className="compliance-header">
                    <div className="compliance-title">
                      <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                        <path d="M10 2L3 5V9C3 13.5 6 17 10 18C14 17 17 13.5 17 9V5L10 2Z" stroke="#3B82F6" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                        <path d="M7 10L9 12L13 8" stroke="#3B82F6" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                      <h3>Compliance & Audit</h3>
                    </div>
                  </div>
                  <div className="compliance-list">
                    <div className="compliance-item">
                      <div className="compliance-info">
                        <h4>Shariah Compliance</h4>
                        <p>All transactions reviewed</p>
                        <span className="compliance-date">Last checked: Today</span>
                      </div>
                      <div className="compliance-status compliant">
                        <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                          <path d="M3 7L6 10L11 4" stroke="#10B981" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                        Compliant
                      </div>
                    </div>
                    
                    <div className="compliance-item">
                      <div className="compliance-info">
                        <h4>Financial Audit</h4>
                        <p>Next audit: Jul 15</p>
                        <span className="compliance-date">Last checked: Q2 2026</span>
                      </div>
                      <div className="compliance-status scheduled">
                        <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                          <circle cx="7" cy="7" r="6" stroke="#3B82F6" strokeWidth="1.5"/>
                          <path d="M7 3V7L10 9" stroke="#3B82F6" strokeWidth="1.5" strokeLinecap="round"/>
                        </svg>
                        Scheduled
                      </div>
                    </div>
                    
                    <div className="compliance-item">
                      <div className="compliance-info">
                        <h4>Tax Filing</h4>
                        <p>Next filing: Sep 15</p>
                        <span className="compliance-date">Last checked: Jun 1</span>
                      </div>
                      <div className="compliance-status compliant">
                        <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                          <path d="M3 7L6 10L11 4" stroke="#10B981" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                        Compliant
                      </div>
                    </div>
                    
                    <div className="compliance-item">
                      <div className="compliance-info">
                        <h4>Regulatory Reports</h4>
                        <p>1 report pending review</p>
                        <span className="compliance-date">Last checked: 5 days ago</span>
                      </div>
                      <div className="compliance-status pending">
                        <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                          <circle cx="7" cy="7" r="6" stroke="#F59E0B" strokeWidth="1.5"/>
                          <path d="M7 4V7" stroke="#F59E0B" strokeWidth="1.5" strokeLinecap="round"/>
                          <circle cx="7" cy="10" r="0.5" fill="#F59E0B"/>
                        </svg>
                        Pending
                      </div>
                    </div>
                  </div>
                  <button className="view-all-btn">View All Reports</button>
                </div>

                {/* Recent Financial Activity */}
                <div className="activity-card">
                  <div className="activity-header">
                    <h3>
                      <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
                        <path d="M9 4V9L12 11" stroke="#6B7280" strokeWidth="1.5" strokeLinecap="round"/>
                        <circle cx="9" cy="9" r="7" stroke="#6B7280" strokeWidth="1.5"/>
                      </svg>
                      Recent Financial Activity
                    </h3>
                    <button className="view-all-link">View All</button>
                  </div>
                  <div className="activity-list">
                    <div className="activity-item">
                      <div className="activity-icon positive">
                        <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                          <path d="M8 12V4M8 4L4 8M8 4L12 8" stroke="#10B981" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                      </div>
                      <div className="activity-details">
                        <h4>Customer payment received</h4>
                        <p>2 hours ago</p>
                      </div>
                      <div className="activity-amount positive">+$12,500</div>
                    </div>
                    
                    <div className="activity-item">
                      <div className="activity-icon negative">
                        <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                          <path d="M8 4V12M8 12L4 8M8 12L12 8" stroke="#EF4444" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                      </div>
                      <div className="activity-details">
                        <h4>Cloud infrastructure (AWS)</h4>
                        <p>5 hours ago</p>
                      </div>
                      <div className="activity-amount negative">-$2,340</div>
                    </div>
                    
                    <div className="activity-item">
                      <div className="activity-icon positive">
                        <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                          <path d="M8 12V4M8 4L4 8M8 4L12 8" stroke="#10B981" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                      </div>
                      <div className="activity-details">
                        <h4>Investor funding tranche 2</h4>
                        <p>1 day ago</p>
                      </div>
                      <div className="activity-amount positive">+$150,000</div>
                    </div>
                    
                    <div className="activity-item">
                      <div className="activity-icon negative">
                        <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                          <path d="M8 4V12M8 12L4 8M8 12L12 8" stroke="#EF4444" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                      </div>
                      <div className="activity-details">
                        <h4>Payroll — June 2026</h4>
                        <p>2 days ago</p>
                      </div>
                      <div className="activity-amount negative">-$28,500</div>
                    </div>
                  </div>
                </div>

                {/* Connected Services */}
                <div className="services-card">
                  <h3>Connected Services</h3>
                  <div className="services-grid">
                    <div className="service-item">
                      <div className="service-logo qb">
                        <span>QB</span>
                      </div>
                      <div className="service-info">
                        <h4>QuickBooks</h4>
                        <p>Last sync: 2 min ago</p>
                      </div>
                      <div className="service-status">
                        <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                          <circle cx="8" cy="8" r="7" stroke="#10B981" strokeWidth="2"/>
                          <path d="M5 8L7 10L11 6" stroke="#10B981" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                      </div>
                    </div>
                    
                    <div className="service-item">
                      <div className="service-logo dl">
                        <span>DL</span>
                      </div>
                      <div className="service-info">
                        <h4>Deloitte</h4>
                        <p>Active engagement</p>
                      </div>
                      <div className="service-status">
                        <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                          <circle cx="8" cy="8" r="7" stroke="#10B981" strokeWidth="2"/>
                          <path d="M5 8L7 10L11 6" stroke="#10B981" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                      </div>
                    </div>
                    
                    <div className="service-item">
                      <div className="service-logo db">
                        <span>DB</span>
                      </div>
                      <div className="service-info">
                        <h4>Dubai Islamic Bank</h4>
                        <p>2 accounts linked</p>
                      </div>
                      <div className="service-status">
                        <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                          <circle cx="8" cy="8" r="7" stroke="#10B981" strokeWidth="2"/>
                          <path d="M5 8L7 10L11 6" stroke="#10B981" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Right Column - Quick Access */}
              <div className="financial-right-col">
                <div className="quick-access-card">
                  <h3>Quick Access</h3>
                  <div className="quick-access-list">
                    <button className="quick-access-item">
                      <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
                        <rect x="2" y="2" width="6" height="6" rx="1" stroke="#6B7280" strokeWidth="1.5"/>
                        <rect x="10" y="2" width="6" height="6" rx="1" stroke="#6B7280" strokeWidth="1.5"/>
                        <rect x="2" y="10" width="6" height="6" rx="1" stroke="#6B7280" strokeWidth="1.5"/>
                        <rect x="10" y="10" width="6" height="6" rx="1" stroke="#6B7280" strokeWidth="1.5"/>
                      </svg>
                      <span>Core Financial Overview</span>
                    </button>
                    
                    <button className="quick-access-item">
                      <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
                        <rect x="2" y="2" width="6" height="6" rx="1" stroke="#6B7280" strokeWidth="1.5"/>
                        <rect x="10" y="2" width="6" height="6" rx="1" stroke="#6B7280" strokeWidth="1.5"/>
                        <rect x="2" y="10" width="6" height="6" rx="1" stroke="#6B7280" strokeWidth="1.5"/>
                        <rect x="10" y="10" width="6" height="6" rx="1" stroke="#6B7280" strokeWidth="1.5"/>
                      </svg>
                      <span>Treasury & Liquidity Management</span>
                    </button>
                    
                    <button className="quick-access-item">
                      <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
                        <rect x="2" y="2" width="6" height="6" rx="1" stroke="#6B7280" strokeWidth="1.5"/>
                        <rect x="10" y="2" width="6" height="6" rx="1" stroke="#6B7280" strokeWidth="1.5"/>
                        <rect x="2" y="10" width="6" height="6" rx="1" stroke="#6B7280" strokeWidth="1.5"/>
                        <rect x="10" y="10" width="6" height="6" rx="1" stroke="#6B7280" strokeWidth="1.5"/>
                      </svg>
                      <span>Asset Management Core</span>
                    </button>
                    
                    <button className="quick-access-item">
                      <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
                        <rect x="2" y="2" width="6" height="6" rx="1" stroke="#6B7280" strokeWidth="1.5"/>
                        <rect x="10" y="2" width="6" height="6" rx="1" stroke="#6B7280" strokeWidth="1.5"/>
                        <rect x="2" y="10" width="6" height="6" rx="1" stroke="#6B7280" strokeWidth="1.5"/>
                        <rect x="10" y="10" width="6" height="6" rx="1" stroke="#6B7280" strokeWidth="1.5"/>
                      </svg>
                      <span>Liability & Obligation Management</span>
                    </button>
                    
                    <button className="quick-access-item">
                      <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
                        <rect x="2" y="2" width="6" height="6" rx="1" stroke="#6B7280" strokeWidth="1.5"/>
                        <rect x="10" y="2" width="6" height="6" rx="1" stroke="#6B7280" strokeWidth="1.5"/>
                        <rect x="2" y="10" width="6" height="6" rx="1" stroke="#6B7280" strokeWidth="1.5"/>
                        <rect x="10" y="10" width="6" height="6" rx="1" stroke="#6B7280" strokeWidth="1.5"/>
                      </svg>
                      <span>Risk Management Core</span>
                    </button>
                    
                    <button className="quick-access-item">
                      <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
                        <rect x="2" y="2" width="6" height="6" rx="1" stroke="#6B7280" strokeWidth="1.5"/>
                        <rect x="10" y="2" width="6" height="6" rx="1" stroke="#6B7280" strokeWidth="1.5"/>
                        <rect x="2" y="10" width="6" height="6" rx="1" stroke="#6B7280" strokeWidth="1.5"/>
                        <rect x="10" y="10" width="6" height="6" rx="1" stroke="#6B7280" strokeWidth="1.5"/>
                      </svg>
                      <span>Compliance & Regulatory Core</span>
                    </button>
                    
                    <button className="quick-access-item">
                      <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
                        <rect x="2" y="2" width="6" height="6" rx="1" stroke="#6B7280" strokeWidth="1.5"/>
                        <rect x="10" y="2" width="6" height="6" rx="1" stroke="#6B7280" strokeWidth="1.5"/>
                        <rect x="2" y="10" width="6" height="6" rx="1" stroke="#6B7280" strokeWidth="1.5"/>
                        <rect x="10" y="10" width="6" height="6" rx="1" stroke="#6B7280" strokeWidth="1.5"/>
                      </svg>
                      <span>Transaction & Payments Core</span>
                    </button>
                    
                    <button className="quick-access-item">
                      <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
                        <rect x="2" y="2" width="6" height="6" rx="1" stroke="#6B7280" strokeWidth="1.5"/>
                        <rect x="10" y="2" width="6" height="6" rx="1" stroke="#6B7280" strokeWidth="1.5"/>
                        <rect x="2" y="10" width="6" height="6" rx="1" stroke="#6B7280" strokeWidth="1.5"/>
                        <rect x="10" y="10" width="6" height="6" rx="1" stroke="#6B7280" strokeWidth="1.5"/>
                      </svg>
                      <span>Investment & Portfolio Intelligence</span>
                    </button>
                    
                    <button className="quick-access-item">
                      <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
                        <rect x="2" y="2" width="6" height="6" rx="1" stroke="#6B7280" strokeWidth="1.5"/>
                        <rect x="10" y="2" width="6" height="6" rx="1" stroke="#6B7280" strokeWidth="1.5"/>
                        <rect x="2" y="10" width="6" height="6" rx="1" stroke="#6B7280" strokeWidth="1.5"/>
                        <rect x="10" y="10" width="6" height="6" rx="1" stroke="#6B7280" strokeWidth="1.5"/>
                      </svg>
                      <span>Market Intelligence Layer</span>
                    </button>
                    
                    <button className="quick-access-item">
                      <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
                        <rect x="2" y="2" width="6" height="6" rx="1" stroke="#6B7280" strokeWidth="1.5"/>
                        <rect x="10" y="2" width="6" height="6" rx="1" stroke="#6B7280" strokeWidth="1.5"/>
                        <rect x="2" y="10" width="6" height="6" rx="1" stroke="#6B7280" strokeWidth="1.5"/>
                        <rect x="10" y="10" width="6" height="6" rx="1" stroke="#6B7280" strokeWidth="1.5"/>
                      </svg>
                      <span>Trust, Credibility & Scoring Engine</span>
                    </button>
                    
                    <button className="quick-access-item">
                      <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
                        <rect x="2" y="2" width="6" height="6" rx="1" stroke="#6B7280" strokeWidth="1.5"/>
                        <rect x="10" y="2" width="6" height="6" rx="1" stroke="#6B7280" strokeWidth="1.5"/>
                        <rect x="2" y="10" width="6" height="6" rx="1" stroke="#6B7280" strokeWidth="1.5"/>
                        <rect x="10" y="10" width="6" height="6" rx="1" stroke="#6B7280" strokeWidth="1.5"/>
                      </svg>
                      <span>AI & Decision Intelligence Core</span>
                    </button>
                    
                    <button className="quick-access-item">
                      <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
                        <rect x="2" y="2" width="6" height="6" rx="1" stroke="#6B7280" strokeWidth="1.5"/>
                        <rect x="10" y="2" width="6" height="6" rx="1" stroke="#6B7280" strokeWidth="1.5"/>
                        <rect x="2" y="10" width="6" height="6" rx="1" stroke="#6B7280" strokeWidth="1.5"/>
                        <rect x="10" y="10" width="6" height="6" rx="1" stroke="#6B7280" strokeWidth="1.5"/>
                      </svg>
                      <span>Reporting & Analytics Core</span>
                    </button>
                    
                    <button className="quick-access-item">
                      <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
                        <rect x="2" y="2" width="6" height="6" rx="1" stroke="#6B7280" strokeWidth="1.5"/>
                        <rect x="10" y="2" width="6" height="6" rx="1" stroke="#6B7280" strokeWidth="1.5"/>
                        <rect x="2" y="10" width="6" height="6" rx="1" stroke="#6B7280" strokeWidth="1.5"/>
                        <rect x="10" y="10" width="6" height="6" rx="1" stroke="#6B7280" strokeWidth="1.5"/>
                      </svg>
                      <span>Access Control & Governance Layer</span>
                    </button>
                    
                    <button className="quick-access-item">
                      <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
                        <rect x="2" y="2" width="6" height="6" rx="1" stroke="#6B7280" strokeWidth="1.5"/>
                        <rect x="10" y="2" width="6" height="6" rx="1" stroke="#6B7280" strokeWidth="1.5"/>
                        <rect x="2" y="10" width="6" height="6" rx="1" stroke="#6B7280" strokeWidth="1.5"/>
                        <rect x="10" y="10" width="6" height="6" rx="1" stroke="#6B7280" strokeWidth="1.5"/>
                      </svg>
                      <span>Cross-Border & Multi-Entity Core</span>
                    </button>
                    
                    <button className="quick-access-item">
                      <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
                        <rect x="2" y="2" width="6" height="6" rx="1" stroke="#6B7280" strokeWidth="1.5"/>
                        <rect x="10" y="2" width="6" height="6" rx="1" stroke="#6B7280" strokeWidth="1.5"/>
                        <rect x="2" y="10" width="6" height="6" rx="1" stroke="#6B7280" strokeWidth="1.5"/>
                        <rect x="10" y="10" width="6" height="6" rx="1" stroke="#6B7280" strokeWidth="1.5"/>
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
