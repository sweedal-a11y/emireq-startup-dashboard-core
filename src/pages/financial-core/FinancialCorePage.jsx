import React, { useState } from 'react';
import FinancialSidebar from '../../components/financial-sidebar/FinancialSidebar';
import Header from './Header';
import LogoutConfirmModal from '../../components/logout-modal/LogoutConfirmModal';
import { useNavigate } from 'react-router-dom';
import './FinancialCorePage.css';

export default function FinancialCorePage() {
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

  return (
    <div className={`financial-core-page ${isDarkMode ? 'dark-mode' : ''}`}>
      <FinancialSidebar onLogout={handleLogoutClick} isDarkMode={isDarkMode} />
      <div className="financial-core-main">
        <Header isDarkMode={isDarkMode} toggleTheme={toggleTheme} />
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
                 <svg width="28" height="28" viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M0 14C0 6.26801 6.26801 0 14 0C21.732 0 28 6.26801 28 14C28 21.732 21.732 28 14 28C6.26801 28 0 21.732 0 14Z" fill="#00A63E"/>
<path d="M14 22.3333C18.6023 22.3333 22.3333 18.6024 22.3333 14C22.3333 9.39762 18.6023 5.66666 14 5.66666C9.39759 5.66666 5.66663 9.39762 5.66663 14C5.66663 18.6024 9.39759 22.3333 14 22.3333Z" stroke="white" stroke-width="1.66667" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M11.5 14L13.1667 15.6667L16.5 12.3333" stroke="white" stroke-width="1.66667" stroke-linecap="round" stroke-linejoin="round"/>
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
                  <div className="metric-card cash-card">
                    <div className="metric-icon-wrapper">
                      <div className="metric-icon cash">
                       <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M10 1.66669V18.3334" stroke="#00A63E" stroke-width="1.66667" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M14.1667 4.16669H7.91667C7.14312 4.16669 6.40125 4.47398 5.85427 5.02096C5.30729 5.56794 5 6.30981 5 7.08335C5 7.8569 5.30729 8.59877 5.85427 9.14575C6.40125 9.69273 7.14312 10 7.91667 10H12.0833C12.8569 10 13.5987 10.3073 14.1457 10.8543C14.6927 11.4013 15 12.1431 15 12.9167C15 13.6902 14.6927 14.4321 14.1457 14.9791C13.5987 15.5261 12.8569 15.8334 12.0833 15.8334H5" stroke="#00A63E" stroke-width="1.66667" stroke-linecap="round" stroke-linejoin="round"/>
</svg>

                      </div>
                      <div className="metric-change positive">
                      <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M10.6666 4.66669H14.6666V8.66669" stroke="#00A63E" stroke-width="1.33333" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M14.6667 4.66669L9.00004 10.3334L5.66671 7.00002L1.33337 11.3334" stroke="#00A63E" stroke-width="1.33333" stroke-linecap="round" stroke-linejoin="round"/>
</svg>

                        <span>+12.5%</span>
                      </div>
                    </div>
                    <div className="metric-content">
                      <h3 className="metric-label">Cash Balance</h3>
                      <div className="metric-value">$342,500</div>
                      <p className="metric-subtitle">Available funds</p>
                    </div>
                  </div>

                  <div className="metric-card burn-card">
                    <div className="metric-icon-wrapper">
                      <div className="metric-icon burn">
                        <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M13.3334 14.1667H18.3334V9.16669" stroke="#155DFC" stroke-width="1.66667" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M18.3333 14.1666L11.25 7.08331L7.08329 11.25L1.66663 5.83331" stroke="#155DFC" stroke-width="1.66667" stroke-linecap="round" stroke-linejoin="round"/>
</svg>

                      </div>
                      <div className="metric-change negative">
                        <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M5.33337 11.3334H1.33337V7.33335" stroke="#00A63E" stroke-width="1.33333" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M1.33337 11.3334L7.00004 5.66669L10.3334 9.00002L14.6667 4.66669" stroke="#00A63E" stroke-width="1.33333" stroke-linecap="round" stroke-linejoin="round"/>
</svg>

                        <span>-8.2%</span>
                      </div>
                    </div>
                    <div className="metric-content">
                      <h3 className="metric-label">Monthly Burn</h3>
                      <div className="metric-value">$48,000</div>
                      <p className="metric-subtitle">Avg. monthly spend</p>
                    </div>
                  </div>

                  <div className="metric-card runway-card">
                    <div className="metric-icon-wrapper">
                      <div className="metric-icon runway">
                        <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M6.66663 1.66669V5.00002" stroke="#9810FA" stroke-width="1.66667" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M13.3334 1.66669V5.00002" stroke="#9810FA" stroke-width="1.66667" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M15.8333 3.33331H4.16667C3.24619 3.33331 2.5 4.07951 2.5 4.99998V16.6666C2.5 17.5871 3.24619 18.3333 4.16667 18.3333H15.8333C16.7538 18.3333 17.5 17.5871 17.5 16.6666V4.99998C17.5 4.07951 16.7538 3.33331 15.8333 3.33331Z" stroke="#9810FA" stroke-width="1.66667" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M2.5 8.33331H17.5" stroke="#9810FA" stroke-width="1.66667" stroke-linecap="round" stroke-linejoin="round"/>
</svg>

                      </div>
                      <div className="metric-change positive">
                       <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M10.6666 4.66669H14.6666V8.66669" stroke="#00A63E" stroke-width="1.33333" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M14.6667 4.66669L9.00004 10.3334L5.66671 7.00002L1.33337 11.3334" stroke="#00A63E" stroke-width="1.33333" stroke-linecap="round" stroke-linejoin="round"/>
</svg>

                        <span>+0.4 mo</span>
                      </div>
                    </div>
                    <div className="metric-content">
                      <h3 className="metric-label">Runway</h3>
                      <div className="metric-value">7.1 months</div>
                      <p className="metric-subtitle">At current burn</p>
                    </div>
                  </div>

                  <div className="metric-card revenue-card">
                    <div className="metric-icon-wrapper">
                      <div className="metric-icon revenue">
                        <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M13.3334 5.83331H18.3334V10.8333" stroke="#F54900" stroke-width="1.66667" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M18.3333 5.83331L11.25 12.9166L7.08329 8.74998L1.66663 14.1666" stroke="#F54900" stroke-width="1.66667" stroke-linecap="round" stroke-linejoin="round"/>
</svg>

                      </div>
                      <div className="metric-change positive">
                        <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M10.6666 4.66669H14.6666V8.66669" stroke="#00A63E" stroke-width="1.33333" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M14.6667 4.66669L9.00004 10.3334L5.66671 7.00002L1.33337 11.3334" stroke="#00A63E" stroke-width="1.33333" stroke-linecap="round" stroke-linejoin="round"/>
</svg>

                        <span>+15.3%</span>
                      </div>
                    </div>
                    <div className="metric-content">
                      <h3 className="metric-label">Monthly Revenue</h3>
                      <div className="metric-value">$67,000</div>
                      <p className="metric-subtitle">Current month</p>
                    </div>
                  </div>
                </div>

                {/* Financial Trends Chart */}
                <div className="chart-card">
                  <div className="chart-header">
                    <h3>Financial Trends</h3>
                    <p>Revenue, expenses, and net balance over time</p>
                  </div>
                  <div className="chart-container">
                    <svg className="financial-chart" viewBox="0 0 716 250" preserveAspectRatio="xMidYMid meet">
                      <defs>
                        <linearGradient id="revenueGradient" x1="57.812" y1="39.136" x2="57.812" y2="217.91" gradientUnits="userSpaceOnUse">
                          <stop offset="0.05" stopColor="#22C55E" stopOpacity="0.1"/>
                          <stop offset="0.95" stopColor="#22C55E" stopOpacity="0"/>
                        </linearGradient>
                        <linearGradient id="expensesGradient" x1="57.8123" y1="89.832" x2="57.8123" y2="217.91" gradientUnits="userSpaceOnUse">
                          <stop offset="0.05" stopColor="#EF4444" stopOpacity="0.1"/>
                          <stop offset="0.95" stopColor="#EF4444" stopOpacity="0"/>
                        </linearGradient>
                      </defs>
                      
                      {/* Horizontal Grid Lines */}
                      <line x1="57.812" y1="217.91" x2="693.752" y2="217.91" className="chart-grid-dashed"/>
                      <line x1="57.812" y1="164.544" x2="693.752" y2="164.544" className="chart-grid-dashed"/>
                      <line x1="57.812" y1="111.179" x2="693.752" y2="111.179" className="chart-grid-dashed"/>
                      <line x1="57.812" y1="57.8132" x2="693.752" y2="57.8132" className="chart-grid-dashed"/>
                      <line x1="57.812" y1="4.44739" x2="693.752" y2="4.44739" className="chart-grid-dashed"/>
                      
                      {/* Vertical Grid Lines */}
                      <line x1="57.812" y1="4.44739" x2="57.812" y2="217.91" className="chart-grid-dashed"/>
                      <line x1="185" y1="4.44739" x2="185" y2="217.91" className="chart-grid-dashed"/>
                      <line x1="312.188" y1="4.44739" x2="312.188" y2="217.91" className="chart-grid-dashed"/>
                      <line x1="439.376" y1="4.44739" x2="439.376" y2="217.91" className="chart-grid-dashed"/>
                      <line x1="566.565" y1="4.44739" x2="566.565" y2="217.91" className="chart-grid-dashed"/>
                      <line x1="693.752" y1="4.44739" x2="693.752" y2="217.91" className="chart-grid-dashed"/>
                      
                      {/* X-axis */}
                      <line x1="57.8129" y1="217.91" x2="693.753" y2="217.91" className="chart-axis"/>
                      <line x1="57.8126" y1="223.247" x2="57.8126" y2="217.911" className="chart-axis"/>
                      
                      {/* Y-axis labels */}
                      <text x="47" y="221" className="chart-label">0</text>
                      <text x="18" y="168" className="chart-label">20000</text>
                      <text x="18" y="114" className="chart-label">40000</text>
                      <text x="18" y="61" className="chart-label">60000</text>
                      <text x="18" y="11" className="chart-label">80000</text>
                      
                      {/* Revenue Area with Gradient */}
                      <path d="M 57.812 97.8382C100.208 88.4992 142.604 79.1602 185 79.1602C227.396 79.1602 269.792 89.8333 312.188 89.8333C354.584 89.8333 396.98 55.1457 439.376 55.1457C481.773 55.1457 524.168 63.1505 566.564 63.1505C608.961 63.1505 651.356 51.1433 693.752 39.136V217.911C651.356 217.911 608.961 217.911 566.564 217.911C524.168 217.911 481.773 217.911 439.376 217.911C396.98 217.911 354.584 217.911 312.188 217.911C269.792 217.911 227.396 217.911 185 217.911C142.604 217.911 100.208 217.911 57.812 217.911V97.8382Z" fill="url(#revenueGradient)" fillOpacity="0.6"/>
                      
                      {/* Revenue Line */}
                      <path d="M 57.812 97.8382C100.208 88.4992 142.604 79.1602 185 79.1602C227.396 79.1602 269.792 89.8333 312.188 89.8333C354.584 89.8333 396.98 55.1457 439.376 55.1457C481.773 55.1457 524.168 63.1505 566.564 63.1505C608.961 63.1505 651.356 51.1433 693.752 39.136" className="chart-line revenue" strokeWidth="1.77885"/>
                      
                      {/* Expenses Area with Gradient */}
                      <path d="M 57.8123 132.525C100.209 129.856 142.604 127.188 185 124.52C227.397 121.851 269.792 119.628 312.188 116.515C354.585 113.402 396.98 108.955 439.376 105.842C481.773 102.729 524.168 100.505 566.565 97.8369C608.961 95.1686 651.356 92.5003 693.753 89.832V217.91C651.356 217.91 608.961 217.91 566.565 217.91C524.168 217.91 481.773 217.91 439.376 217.91C396.98 217.91 354.585 217.91 312.188 217.91C269.792 217.91 227.397 217.91 185 217.91C142.604 217.91 100.209 217.91 57.8123 217.91V132.525Z" fill="url(#expensesGradient)" fillOpacity="0.6"/>
                      
                      {/* Expenses Line */}
                      <path d="M 57.8123 132.525C100.209 129.856 142.604 127.188 185 124.52C227.397 121.851 269.792 119.628 312.188 116.515C354.585 113.402 396.98 108.955 439.376 105.842C481.773 102.729 524.168 100.505 566.565 97.8369C608.961 95.1686 651.356 92.5003 693.753 89.832" className="chart-line expenses" strokeWidth="1.77885"/>
                      
                      {/* Balance Line */}
                      <path d="M 57.813 183.223C100.209 177.886 142.605 172.55 185.001 172.55C227.397 172.55 269.793 191.228 312.189 191.228C354.585 191.228 396.981 167.213 439.377 167.213C481.773 167.213 524.169 183.223 566.565 183.223C608.962 183.223 651.357 175.218 693.753 167.213" className="chart-line balance" strokeWidth="1.77885"/>
                      
                      {/* Balance Data Points */}
                      <circle cx="57.8126" cy="183.223" r="3.558" className="chart-point balance"/>
                      <circle cx="185" cy="172.55" r="3.558" className="chart-point balance"/>
                      <circle cx="312.189" cy="191.228" r="3.558" className="chart-point balance"/>
                      <circle cx="439.377" cy="167.213" r="3.558" className="chart-point balance"/>
                      <circle cx="566.565" cy="183.223" r="3.558" className="chart-point balance"/>
                      <circle cx="693.753" cy="167.213" r="3.558" className="chart-point balance"/>
                      
                      {/* X-axis Labels */}
                      <text x="52" y="232" className="chart-label-x">Jan</text>
                      <text x="177" y="232" className="chart-label-x">Feb</text>
                      <text x="304" y="232" className="chart-label-x">Mar</text>
                      <text x="431" y="232" className="chart-label-x">Apr</text>
                      <text x="558" y="232" className="chart-label-x">May</text>
                      <text x="685" y="232" className="chart-label-x">Jun</text>
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
                     <svg width="21" height="21" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M20 13C20 18 16.5 20.5 12.34 21.95C12.1222 22.0238 11.8855 22.0203 11.67 21.94C7.5 20.5 4 18 4 13V5.99996C4 5.73475 4.10536 5.48039 4.29289 5.29286C4.48043 5.10532 4.73478 4.99996 5 4.99996C7 4.99996 9.5 3.79996 11.24 2.27996C11.4519 2.09896 11.7214 1.99951 12 1.99951C12.2786 1.99951 12.5481 2.09896 12.76 2.27996C14.51 3.80996 17 4.99996 19 4.99996C19.2652 4.99996 19.5196 5.10532 19.7071 5.29286C19.8946 5.48039 20 5.73475 20 5.99996V13Z" stroke="#155DFC" stroke-width="1.66667" stroke-linecap="round" stroke-linejoin="round"/>
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
                    <div className="activity-title-wrapper">
                      <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M18.3333 10.0001H16.2666C15.9024 9.9993 15.548 10.1178 15.2576 10.3376C14.9671 10.5573 14.7566 10.8661 14.6583 11.2167L12.7 18.1834C12.6873 18.2267 12.661 18.2647 12.625 18.2917C12.5889 18.3188 12.545 18.3334 12.5 18.3334C12.4549 18.3334 12.411 18.3188 12.375 18.2917C12.3389 18.2647 12.3126 18.2267 12.3 18.1834L7.69996 1.81675C7.68734 1.77347 7.66102 1.73546 7.62496 1.70841C7.5889 1.68137 7.54504 1.66675 7.49996 1.66675C7.45488 1.66675 7.41102 1.68137 7.37496 1.70841C7.3389 1.73546 7.31258 1.77347 7.29996 1.81675L5.34163 8.78341C5.24368 9.13271 5.03444 9.44051 4.74568 9.66009C4.45691 9.87967 4.10439 9.99904 3.74163 10.0001H1.66663" stroke="#155DFC" stroke-width="1.66667" stroke-linecap="round" stroke-linejoin="round"/>
</svg>

                      <h3>Recent Financial Activity</h3>
                    </div>
                    <button className="view-all-btn-activity">View All</button>
                  </div>
                  
                  <div className="activity-list">
                    <div className="activity-item">
                      <div className="activity-icon-wrapper positive">
                        <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path d="M5.33337 4.66669H10.6667V9.99998" stroke="#00A63E" strokeWidth="1.33333" strokeLinecap="round" strokeLinejoin="round"/>
                          <path d="M10.6667 4.66669L5.33337 10" stroke="#00A63E" strokeWidth="1.33333" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                      </div>
                      <div className="activity-details">
                        <h4>Customer payment received</h4>
                        <p>2 hours ago</p>
                      </div>
                      <div className="activity-amount positive">+$12,500</div>
                    </div>

                    <div className="activity-item">
                      <div className="activity-icon-wrapper negative">
                        <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path d="M10.6666 11.3334H5.33329V6.00002" stroke="#E7000B" strokeWidth="1.33333" strokeLinecap="round" strokeLinejoin="round"/>
                          <path d="M5.33329 11.3334L10.6666 6.00002" stroke="#E7000B" strokeWidth="1.33333" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                      </div>
                      <div className="activity-details">
                        <h4>Cloud infrastructure (AWS)</h4>
                        <p>5 hours ago</p>
                      </div>
                      <div className="activity-amount negative">−$2,340</div>
                    </div>

                    <div className="activity-item">
                      <div className="activity-icon-wrapper positive">
                        <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path d="M5.33337 4.66669H10.6667V9.99998" stroke="#00A63E" strokeWidth="1.33333" strokeLinecap="round" strokeLinejoin="round"/>
                          <path d="M10.6667 4.66669L5.33337 10" stroke="#00A63E" strokeWidth="1.33333" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                      </div>
                      <div className="activity-details">
                        <h4>Investor funding tranche 2</h4>
                        <p>1 day ago</p>
                      </div>
                      <div className="activity-amount positive">+$150,000</div>
                    </div>

                    <div className="activity-item">
                      <div className="activity-icon-wrapper negative">
                        <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path d="M10.6666 11.3334H5.33329V6.00002" stroke="#E7000B" strokeWidth="1.33333" strokeLinecap="round" strokeLinejoin="round"/>
                          <path d="M5.33329 11.3334L10.6666 6.00002" stroke="#E7000B" strokeWidth="1.33333" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                      </div>
                      <div className="activity-details">
                        <h4>Payroll – June 2026</h4>
                        <p>2 days ago</p>
                      </div>
                      <div className="activity-amount negative">−$28,500</div>
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
                        <p className="service-category">Accounting</p>
                        <p className="service-status-text">Last sync: 2 min ago</p>
                      </div>
                      <div className="service-status">
                        <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path d="M10 18.3333C14.6023 18.3333 18.3333 14.6024 18.3333 10C18.3333 5.39762 14.6023 1.66666 10 1.66666C5.39759 1.66666 1.66663 5.39762 1.66663 10C1.66663 14.6024 5.39759 18.3333 10 18.3333Z" stroke="#00A63E" strokeWidth="1.66667" strokeLinecap="round" strokeLinejoin="round"/>
                          <path d="M7.5 10L9.16667 11.6667L12.5 8.33334" stroke="#00A63E" strokeWidth="1.66667" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                      </div>
                    </div>
                    
                    <div className="service-item">
                      <div className="service-logo dl">
                        <span>DL</span>
                      </div>
                      <div className="service-info">
                        <h4>Deloitte</h4>
                        <p className="service-category">Audit</p>
                        <p className="service-status-text">Active engagement</p>
                      </div>
                      <div className="service-status">
                        <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path d="M10 18.3333C14.6023 18.3333 18.3333 14.6024 18.3333 10C18.3333 5.39762 14.6023 1.66666 10 1.66666C5.39759 1.66666 1.66663 5.39762 1.66663 10C1.66663 14.6024 5.39759 18.3333 10 18.3333Z" stroke="#00A63E" strokeWidth="1.66667" strokeLinecap="round" strokeLinejoin="round"/>
                          <path d="M7.5 10L9.16667 11.6667L12.5 8.33334" stroke="#00A63E" strokeWidth="1.66667" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                      </div>
                    </div>
                    
                    <div className="service-item">
                      <div className="service-logo db">
                        <span>DB</span>
                      </div>
                      <div className="service-info">
                        <h4>Dubai Islamic Bank</h4>
                        <p className="service-category">Banking</p>
                        <p className="service-status-text">2 accounts linked</p>
                      </div>
                      <div className="service-status">
                        <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path d="M10 18.3333C14.6023 18.3333 18.3333 14.6024 18.3333 10C18.3333 5.39762 14.6023 1.66666 10 1.66666C5.39759 1.66666 1.66663 5.39762 1.66663 10C1.66663 14.6024 5.39759 18.3333 10 18.3333Z" stroke="#00A63E" strokeWidth="1.66667" strokeLinecap="round" strokeLinejoin="round"/>
                          <path d="M7.5 10L9.16667 11.6667L12.5 8.33334" stroke="#00A63E" strokeWidth="1.66667" strokeLinecap="round" strokeLinejoin="round"/>
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
                    <button className="quick-access-item" onClick={() => navigate('/financial-core/overview')}>
                      <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
                        <rect x="2" y="2" width="6" height="6" rx="1" stroke="#6B7280" strokeWidth="1.5"/>
                        <rect x="10" y="2" width="6" height="6" rx="1" stroke="#6B7280" strokeWidth="1.5"/>
                        <rect x="2" y="10" width="6" height="6" rx="1" stroke="#6B7280" strokeWidth="1.5"/>
                        <rect x="10" y="10" width="6" height="6" rx="1" stroke="#6B7280" strokeWidth="1.5"/>
                      </svg>
                      <span>Core Financial Overview</span>
                    </button>
                    
                    <button className="quick-access-item" onClick={() => navigate('/financial-core/treasury-liquidity')}>
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
