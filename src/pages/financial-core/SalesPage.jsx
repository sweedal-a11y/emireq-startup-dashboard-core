import React, { useState } from 'react';
import FinancialSidebar from '../../components/financial-sidebar/FinancialSidebar';
import Header from './Header';
import LogoutConfirmModal from '../../components/logout-modal/LogoutConfirmModal';
import './SalesPage.css';

export default function SalesPage() {
  const [showLogoutModal, setShowLogoutModal] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [activeTab, setActiveTab] = useState('overview');
  const [enterpriseControls, setEnterpriseControls] = useState({
    creditLimit: false,
    autoPayment: false,
    customerPortal: false,
    auditLock: false,
    multiEntity: false
  });

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

  const toggleControl = (controlName) => {
    setEnterpriseControls(prev => ({
      ...prev,
      [controlName]: !prev[controlName]
    }));
  };

  const tabs = [
    { id: 'overview', label: 'Overview' },
    { id: 'customers', label: 'Customers' },
    { id: 'invoices', label: 'Invoices' },
    { id: 'payments', label: 'Payments' },
    { id: 'aging', label: 'Aging Analysis' }
  ];

  const recentActivity = [
    {
      id: 1,
      type: 'paid',
      company: 'TechStart Solutions',
      amount: '₹1,00,000',
      time: '2 hours ago',
      icon: 'check'
    },
    {
      id: 2,
      type: 'issued',
      company: 'Acme Corporation',
      amount: '₹1,25,000',
      time: '3 hours ago',
      icon: 'file'
    },
    {
      id: 3,
      type: 'received',
      company: 'Global Retail Inc',
      amount: '₹50,000',
      time: '1 day ago',
      icon: 'check'
    },
    {
      id: 4,
      type: 'overdue',
      company: 'Bluesky Construction',
      amount: '₹85,000',
      time: '2 days ago',
      icon: 'alert'
    }
  ];

  const topCustomers = [
    {
      id: 1,
      company: 'TechStart Solutions Pvt Ltd',
      invoices: '3 open invoices',
      amount: '₹4,50,000',
      status: 'overdue',
      overdueAmount: '₹120,000 overdue'
    },
    {
      id: 2,
      company: 'Acme Corporation',
      invoices: '2 open invoices',
      amount: '₹1,25,000',
      status: 'current',
      overdueAmount: '₹36,000 overdue'
    },
    {
      id: 3,
      company: 'Global Retail Inc',
      invoices: '5 open invoices',
      amount: '₹2,80,000',
      status: 'overdue',
      overdueAmount: '₹120,000 overdue'
    },
    {
      id: 4,
      company: 'BuildRight Construction',
      invoices: '4 open invoices',
      amount: '₹1,25,000',
      status: 'current',
      overdueAmount: '₹36,000 overdue'
    }
  ];

  return (
    <div className={`sales-page ${isDarkMode ? 'dark-mode' : ''}`}>
      <FinancialSidebar onLogout={handleLogoutClick} isDarkMode={isDarkMode} activePage="sales" />
      <div className="sales-main">
        <Header isDarkMode={isDarkMode} toggleTheme={toggleTheme} />
        <main className="sales-content">
          <div className="sales-container">
            {/* Page Header */}
            <div className="sales-page-header">
              <h1>Sales (Accounts Receivable)</h1>
              <p>Real-time accounts receivable monitoring and management</p>
            </div>

            {/* Tabs */}
            <div className="sales-tabs">
              {tabs.map(tab => (
                <button
                  key={tab.id}
                  className={`sales-tab ${activeTab === tab.id ? 'active' : ''}`}
                  onClick={() => setActiveTab(tab.id)}
                >
                  {tab.label}
                </button>
              ))}
            </div>

            {/* Metrics Cards */}
            <div className="sales-metrics-grid">
              {/* Card 1 - Total Receivables */}
              <div className="sales-metric-card">
                <div className="metric-header">
                  <div className="metric-icon-wrapper blue">
                    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M10 1.66602V18.3327" stroke="#155DFC" stroke-width="1.66667" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M14.1667 4.16602H7.91667C7.14312 4.16602 6.40125 4.47331 5.85427 5.02029C5.30729 5.56727 5 6.30913 5 7.08268C5 7.85623 5.30729 8.5981 5.85427 9.14508C6.40125 9.69206 7.14312 9.99935 7.91667 9.99935H12.0833C12.8569 9.99935 13.5987 10.3066 14.1457 10.8536C14.6927 11.4006 15 12.1425 15 12.916C15 13.6896 14.6927 14.4314 14.1457 14.9784C13.5987 15.5254 12.8569 15.8327 12.0833 15.8327H5" stroke="#155DFC" stroke-width="1.66667" stroke-linecap="round" stroke-linejoin="round"/>
</svg>

                  </div>
                 
                </div>
                <div className="metric-content">
                  <h3 className="metric-label">Total Receivables</h3>
                  <div className="metric-value">$349,000</div>
                  <p className="metric-subtitle"><span style={{color: '#00A63E'}}>+12.5%</span> vs last month</p>
                </div>
              </div>

              {/* Card 2 - Outstanding Invoices */}
              <div className="sales-metric-card">
                <div className="metric-header">
                  <div className="metric-icon-wrapper purple">
                    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M12.5 1.66602H5.00004C4.55801 1.66602 4.13409 1.84161 3.82153 2.15417C3.50897 2.46673 3.33337 2.89065 3.33337 3.33268V16.666C3.33337 17.108 3.50897 17.532 3.82153 17.8445C4.13409 18.1571 4.55801 18.3327 5.00004 18.3327H15C15.4421 18.3327 15.866 18.1571 16.1786 17.8445C16.4911 17.532 16.6667 17.108 16.6667 16.666V5.83268L12.5 1.66602Z" stroke="#9810FA" stroke-width="1.66667" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M11.6666 1.66602V4.99935C11.6666 5.44138 11.8422 5.8653 12.1548 6.17786C12.4673 6.49042 12.8913 6.66602 13.3333 6.66602H16.6666" stroke="#9810FA" stroke-width="1.66667" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M8.33329 7.5H6.66663" stroke="#9810FA" stroke-width="1.66667" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M13.3333 10.834H6.66663" stroke="#9810FA" stroke-width="1.66667" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M13.3333 14.166H6.66663" stroke="#9810FA" stroke-width="1.66667" stroke-linecap="round" stroke-linejoin="round"/>
</svg>

                  </div>
                  
                </div>
                <div className="metric-content">
                  <h3 className="metric-label">Outstanding Invoices</h3>
                  <div className="metric-value">24</div>
                  <p className="metric-subtitle"><span style={{color: '#E02424'}}>-3</span> vs last month</p>
                </div>
              </div>

              {/* Card 3 - Overdue Amount */}
              <div className="sales-metric-card">
                <div className="metric-header">
                  <div className="metric-icon-wrapper red">
                    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M10 18.3327C14.6024 18.3327 18.3334 14.6017 18.3334 9.99935C18.3334 5.39698 14.6024 1.66602 10 1.66602C5.39765 1.66602 1.66669 5.39698 1.66669 9.99935C1.66669 14.6017 5.39765 18.3327 10 18.3327Z" stroke="#E7000B" stroke-width="1.66667" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M10 6.66602V9.99935" stroke="#E7000B" stroke-width="1.66667" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M10 13.334H10.0083" stroke="#E7000B" stroke-width="1.66667" stroke-linecap="round" stroke-linejoin="round"/>
</svg>

                  </div>
                  
                </div>
                <div className="metric-content">
                  <h3 className="metric-label">Overdue Amount</h3>
                  <div className="metric-value">$45,000</div>
                  <p className="metric-subtitle"><span style={{color: '#00A63E'}}>+8.2%</span> vs last month</p>
                </div>
              </div>

              {/* Card 4 - Cash Collected */}
              <div className="sales-metric-card">
                <div className="metric-header">
                  <div className="metric-icon-wrapper green">
                    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M18.1675 8.33357C18.548 10.2013 18.2768 12.1431 17.399 13.8351C16.5212 15.527 15.0899 16.8669 13.3437 17.6313C11.5976 18.3957 9.64215 18.5384 7.80354 18.0355C5.96494 17.5327 4.35429 16.4147 3.24019 14.8681C2.12609 13.3214 1.5759 11.4396 1.68135 9.53639C1.7868 7.63318 2.54153 5.82364 3.81967 4.40954C5.09781 2.99545 6.82211 2.06226 8.70502 1.76561C10.5879 1.46897 12.5156 1.82679 14.1666 2.7794" stroke="#00A63E" stroke-width="1.66667" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M7.5 9.16732L10 11.6673L18.3333 3.33398" stroke="#00A63E" stroke-width="1.66667" stroke-linecap="round" stroke-linejoin="round"/>
</svg>

                  </div>
                  
                </div>
                <div className="metric-content">
                  <h3 className="metric-label">Cash Collected (MTD)</h3>
                  <div className="metric-value">$127,000</div>
                  <p className="metric-subtitle"><span style={{color: '#00A63E'}}>+15.3%</span> vs last month</p>
                </div>
              </div>

              {/* Card 5 - Avg Collection */}
              <div className="sales-metric-card">
                <div className="metric-header">
                  <div className="metric-icon-wrapper orange">
                   <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M9.99999 18.3327C14.6024 18.3327 18.3333 14.6017 18.3333 9.99935C18.3333 5.39698 14.6024 1.66602 9.99999 1.66602C5.39762 1.66602 1.66666 5.39698 1.66666 9.99935C1.66666 14.6017 5.39762 18.3327 9.99999 18.3327Z" stroke="#F54900" stroke-width="1.66667" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M10 5V10L13.3333 11.6667" stroke="#F54900" stroke-width="1.66667" stroke-linecap="round" stroke-linejoin="round"/>
</svg>

                  </div>
                  
                </div>
                <div className="metric-content">
                  <h3 className="metric-label">Avg Collection (DSO)</h3>
                  <div className="metric-value">28 days</div>
                  <p className="metric-subtitle"><span style={{color: '#E02424'}}>-2 days</span> vs last month</p>
                </div>
              </div>
            </div>

            {/* Content Grid */}
            <div className="sales-content-grid">
              {/* Recent Activity */}
              <div className="sales-section recent-activity">
                <div className="section-header">
                  <div className="section-icon">
                    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M18.3333 9.99935H16.2666C15.9024 9.99857 15.548 10.1171 15.2576 10.3368C14.9671 10.5565 14.7566 10.8653 14.6583 11.216L12.7 18.1827C12.6873 18.226 12.661 18.264 12.625 18.291C12.5889 18.3181 12.545 18.3327 12.5 18.3327C12.4549 18.3327 12.411 18.3181 12.375 18.291C12.3389 18.264 12.3126 18.226 12.3 18.1827L7.69996 1.81602C7.68734 1.77274 7.66102 1.73473 7.62496 1.70768C7.5889 1.68064 7.54504 1.66602 7.49996 1.66602C7.45488 1.66602 7.41102 1.68064 7.37496 1.70768C7.3389 1.73473 7.31258 1.77274 7.29996 1.81602L5.34163 8.78268C5.24368 9.13198 5.03444 9.43978 4.74568 9.65936C4.45691 9.87894 4.10439 9.99831 3.74163 9.99935H1.66663" stroke="#155DFC" stroke-width="1.66667" stroke-linecap="round" stroke-linejoin="round"/>
                    </svg>
                  </div>
                  <h2>Recent Activity</h2>
                </div>

                <div className="activity-list">
                  {recentActivity.map(activity => (
                    <div key={activity.id} className={`activity-item ${activity.type}`}>
                      <div className={`activity-icon ${activity.type}`}>
                        {activity.icon === 'check' && (
                         <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M0 10C0 4.47715 4.47715 0 10 0H22C27.5228 0 32 4.47715 32 10V22C32 27.5228 27.5228 32 22 32H10C4.47715 32 0 27.5228 0 22V10Z" fill="#D0FAE5"/>
<g clip-path="url(#clip0_261_4008)">
<path d="M16 22.6673C19.6819 22.6673 22.6667 19.6825 22.6667 16.0007C22.6667 12.3188 19.6819 9.33398 16 9.33398C12.3181 9.33398 9.33337 12.3188 9.33337 16.0007C9.33337 19.6825 12.3181 22.6673 16 22.6673Z" stroke="#007A55" stroke-width="1.33333" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M14 15.9993L15.3333 17.3327L18 14.666" stroke="#007A55" stroke-width="1.33333" stroke-linecap="round" stroke-linejoin="round"/>
</g>
<defs>
<clipPath id="clip0_261_4008">
<rect width="16" height="16" fill="white" transform="translate(8 8)"/>
</clipPath>
</defs>
</svg>

                        )}
                        {activity.icon === 'file' && (
                          <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M0 10C0 4.47715 4.47715 0 10 0H22C27.5228 0 32 4.47715 32 10V22C32 27.5228 27.5228 32 22 32H10C4.47715 32 0 27.5228 0 22V10Z" fill="#DBEAFE"/>
<path d="M18 9.33398H12C11.6463 9.33398 11.3072 9.47446 11.0572 9.72451C10.8071 9.97456 10.6666 10.3137 10.6666 10.6673V21.334C10.6666 21.6876 10.8071 22.0267 11.0572 22.2768C11.3072 22.5268 11.6463 22.6673 12 22.6673H20C20.3536 22.6673 20.6927 22.5268 20.9428 22.2768C21.1928 22.0267 21.3333 21.6876 21.3333 21.334V12.6673L18 9.33398Z" stroke="#1447E6" stroke-width="1.33333" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M17.3334 9.33398V12.0007C17.3334 12.3543 17.4739 12.6934 17.7239 12.9435C17.9739 13.1935 18.3131 13.334 18.6667 13.334H21.3334" stroke="#1447E6" stroke-width="1.33333" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M14.6667 14H13.3334" stroke="#1447E6" stroke-width="1.33333" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M18.6667 16.666H13.3334" stroke="#1447E6" stroke-width="1.33333" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M18.6667 19.334H13.3334" stroke="#1447E6" stroke-width="1.33333" stroke-linecap="round" stroke-linejoin="round"/>
</svg>

                        )}
                        {activity.icon === 'alert' && (
                          <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M0 10C0 4.47715 4.47715 0 10 0H22C27.5228 0 32 4.47715 32 10V22C32 27.5228 27.5228 32 22 32H10C4.47715 32 0 27.5228 0 22V10Z" fill="#FFE4E6"/>
<g clip-path="url(#clip0_261_4056)">
<path d="M22.4866 19.9995L17.1533 10.6662C17.037 10.461 16.8684 10.2903 16.6646 10.1715C16.4608 10.0528 16.2291 9.99023 15.9933 9.99023C15.7574 9.99023 15.5258 10.0528 15.322 10.1715C15.1182 10.2903 14.9496 10.461 14.8333 10.6662L9.49995 19.9995C9.38241 20.2031 9.32077 20.4341 9.32129 20.6692C9.32181 20.9042 9.38447 21.135 9.50292 21.338C9.62136 21.5411 9.79138 21.7092 9.99575 21.8254C10.2001 21.9415 10.4316 22.0016 10.6666 21.9995H21.3333C21.5672 21.9993 21.797 21.9375 21.9995 21.8204C22.202 21.7032 22.3701 21.5349 22.487 21.3322C22.6038 21.1296 22.6653 20.8998 22.6653 20.6658C22.6652 20.4319 22.6036 20.2021 22.4866 19.9995Z" stroke="#C70036" stroke-width="1.33333" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M16 14V16.6667" stroke="#C70036" stroke-width="1.33333" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M16 19.334H16.0067" stroke="#C70036" stroke-width="1.33333" stroke-linecap="round" stroke-linejoin="round"/>
</g>
<defs>
<clipPath id="clip0_261_4056">
<rect width="16" height="16" fill="white" transform="translate(8 8)"/>
</clipPath>
</defs>
</svg>

                        )}
                      </div>
                      <div className="activity-details">
                        <div className="activity-type">
                          {activity.type === 'paid' && 'Invoice paid'}
                          {activity.type === 'issued' && 'Invoice issued'}
                          {activity.type === 'received' && 'Payment received'}
                          {activity.type === 'overdue' && 'Invoice overdue'}
                        </div>
                        <div className="activity-company">{activity.company}</div>
                      </div>
                      <div className="activity-right">
                        <div className="activity-amount">{activity.amount}</div>
                        <div className="activity-time">{activity.time}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Top Customers */}
              <div className="sales-section top-customers">
                <div className="section-header">
                  <div className="section-icon">
                   <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M18.3334 5.83398L11.25 12.9173L7.08335 8.75065L1.66669 14.1673" stroke="#155DFC" stroke-width="1.66667" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M13.3333 5.83398H18.3333V10.834" stroke="#155DFC" stroke-width="1.66667" stroke-linecap="round" stroke-linejoin="round"/>
</svg>

                  </div>
                  <h2>Top Customers by Outstanding</h2>
                </div>

                <div className="customers-list">
                  {topCustomers.map(customer => (
                    <div key={customer.id} className="customer-item">
                      <div className="customer-icon">
                       <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M0 10C0 4.47715 4.47715 0 10 0H22C27.5228 0 32 4.47715 32 10V22C32 27.5228 27.5228 32 22 32H10C4.47715 32 0 27.5228 0 22V10Z" fill="#DBEAFE"/>
<g clip-path="url(#clip0_261_4080)">
<path d="M12 22.6673V10.6673C12 10.3137 12.1405 9.97456 12.3905 9.72451C12.6406 9.47446 12.9797 9.33398 13.3333 9.33398H18.6667C19.0203 9.33398 19.3594 9.47446 19.6095 9.72451C19.8595 9.97456 20 10.3137 20 10.6673V22.6673H12Z" stroke="#1447E6" stroke-width="1.33333" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M12 16H10.6666C10.313 16 9.97389 16.1405 9.72384 16.3905C9.47379 16.6406 9.33331 16.9797 9.33331 17.3333V21.3333C9.33331 21.687 9.47379 22.0261 9.72384 22.2761C9.97389 22.5262 10.313 22.6667 10.6666 22.6667H12" stroke="#1447E6" stroke-width="1.33333" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M20 14H21.3333C21.687 14 22.0261 14.1405 22.2761 14.3905C22.5262 14.6406 22.6667 14.9797 22.6667 15.3333V21.3333C22.6667 21.687 22.5262 22.0261 22.2761 22.2761C22.0261 22.5262 21.687 22.6667 21.3333 22.6667H20" stroke="#1447E6" stroke-width="1.33333" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M14.6667 12H17.3334" stroke="#1447E6" stroke-width="1.33333" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M14.6667 14.666H17.3334" stroke="#1447E6" stroke-width="1.33333" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M14.6667 17.334H17.3334" stroke="#1447E6" stroke-width="1.33333" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M14.6667 20H17.3334" stroke="#1447E6" stroke-width="1.33333" stroke-linecap="round" stroke-linejoin="round"/>
</g>
<defs>
<clipPath id="clip0_261_4080">
<rect width="16" height="16" fill="white" transform="translate(8 8)"/>
</clipPath>
</defs>
</svg>

                      </div>
                      <div className="customer-details">
                        <div className="customer-company">{customer.company}</div>
                        <div className="customer-invoices">{customer.invoices}</div>
                      </div>
                      <div className="customer-right">
                        <div className="customer-amount">{customer.amount}</div>
                        <div className={`customer-status ${customer.status}`}>
                          {customer.overdueAmount}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Enterprise Controls */}
            <div className="sales-section enterprise-controls">
              <div className="section-header has-subtitle">
                <div className="header-top">
                  <div className="section-icon">
                    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M10.1833 1.66602H9.81667C9.37464 1.66602 8.95072 1.84161 8.63816 2.15417C8.3256 2.46673 8.15 2.89065 8.15 3.33268V3.48268C8.1497 3.77495 8.07255 4.06201 7.92628 4.31505C7.78002 4.56809 7.56978 4.77821 7.31667 4.92435L6.95834 5.13268C6.70497 5.27896 6.41756 5.35597 6.125 5.35597C5.83244 5.35597 5.54503 5.27896 5.29167 5.13268L5.16667 5.06602C4.78422 4.8454 4.32987 4.78555 3.90334 4.89961C3.47681 5.01366 3.11296 5.2923 2.89167 5.67435L2.70833 5.99102C2.48772 6.37346 2.42787 6.82782 2.54192 7.25435C2.65598 7.68088 2.93461 8.04472 3.31667 8.26602L3.44167 8.34935C3.69356 8.49477 3.90302 8.70359 4.04921 8.95504C4.1954 9.20649 4.27325 9.49183 4.275 9.78268V10.2077C4.27617 10.5014 4.19971 10.7901 4.05337 11.0448C3.90703 11.2994 3.69601 11.5108 3.44167 11.6577L3.31667 11.7327C2.93461 11.954 2.65598 12.3178 2.54192 12.7444C2.42787 13.1709 2.48772 13.6252 2.70833 14.0077L2.89167 14.3243C3.11296 14.7064 3.47681 14.985 3.90334 15.0991C4.32987 15.2131 4.78422 15.1533 5.16667 14.9327L5.29167 14.866C5.54503 14.7197 5.83244 14.6427 6.125 14.6427C6.41756 14.6427 6.70497 14.7197 6.95834 14.866L7.31667 15.0743C7.56978 15.2205 7.78002 15.4306 7.92628 15.6837C8.07255 15.9367 8.1497 16.2237 8.15 16.516V16.666C8.15 17.108 8.3256 17.532 8.63816 17.8445C8.95072 18.1571 9.37464 18.3327 9.81667 18.3327H10.1833C10.6254 18.3327 11.0493 18.1571 11.3618 17.8445C11.6744 17.532 11.85 17.108 11.85 16.666V16.516C11.8503 16.2237 11.9275 15.9367 12.0737 15.6837C12.22 15.4306 12.4302 15.2205 12.6833 15.0743L13.0417 14.866C13.295 14.7197 13.5824 14.6427 13.875 14.6427C14.1676 14.6427 14.455 14.7197 14.7083 14.866L14.8333 14.9327C15.2158 15.1533 15.6701 15.2131 16.0967 15.0991C16.5232 14.985 16.887 14.7064 17.1083 14.3243L17.2917 13.9993C17.5123 13.6169 17.5721 13.1625 17.4581 12.736C17.344 12.3095 17.0654 11.9456 16.6833 11.7243L16.5583 11.6577C16.304 11.5108 16.093 11.2994 15.9466 11.0448C15.8003 10.7901 15.7238 10.5014 15.725 10.2077V9.79102C15.7238 9.49733 15.8003 9.20855 15.9466 8.95393C16.093 8.6993 16.304 8.48786 16.5583 8.34102L16.6833 8.26602C17.0654 8.04472 17.344 7.68088 17.4581 7.25435C17.5721 6.82782 17.5123 6.37346 17.2917 5.99102L17.1083 5.67435C16.887 5.2923 16.5232 5.01366 16.0967 4.89961C15.6701 4.78555 15.2158 4.8454 14.8333 5.06602L14.7083 5.13268C14.455 5.27896 14.1676 5.35597 13.875 5.35597C13.5824 5.35597 13.295 5.27896 13.0417 5.13268L12.6833 4.92435C12.4302 4.77821 12.22 4.56809 12.0737 4.31505C11.9275 4.06201 11.8503 3.77495 11.85 3.48268V3.33268C11.85 2.89065 11.6744 2.46673 11.3618 2.15417C11.0493 1.84161 10.6254 1.66602 10.1833 1.66602Z" stroke="#155DFC" stroke-width="1.66667" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M10 12.5C11.3807 12.5 12.5 11.3807 12.5 10C12.5 8.61929 11.3807 7.5 10 7.5C8.61929 7.5 7.5 8.61929 7.5 10C7.5 11.3807 8.61929 12.5 10 12.5Z" stroke="#155DFC" stroke-width="1.66667" stroke-linecap="round" stroke-linejoin="round"/>
</svg>

                  </div>
                  <h2>Enterprise Controls</h2>
                </div>
                <p className="section-subtitle">Configure AR automation and compliance settings</p>
              </div>

              <div className="controls-grid">
                {/* Credit Limit Enforcement */}
                <div className="control-item">
                  <div className="control-left">
                    <div className="control-icon blue">
                     <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M13.3333 8.66762C13.3333 12.001 11 13.6676 8.22663 14.6343C8.0814 14.6835 7.92365 14.6811 7.77996 14.6276C4.99996 13.6676 2.66663 12.001 2.66663 8.66762V4.00095C2.66663 3.82414 2.73686 3.65457 2.86189 3.52955C2.98691 3.40452 3.15648 3.33428 3.33329 3.33428C4.66663 3.33428 6.33329 2.53428 7.49329 1.52095C7.63453 1.40028 7.8142 1.33398 7.99996 1.33398C8.18572 1.33398 8.36539 1.40028 8.50663 1.52095C9.67329 2.54095 11.3333 3.33428 12.6666 3.33428C12.8434 3.33428 13.013 3.40452 13.138 3.52955C13.2631 3.65457 13.3333 3.82414 13.3333 4.00095V8.66762Z" stroke="#1447E6" stroke-width="1.33333" stroke-linecap="round" stroke-linejoin="round"/>
</svg>


                    </div>
                    <div className="control-text">
                      <h3>Credit Limit Enforcement</h3>
                      <p>Block invoice creation when limit exceeded</p>
                    </div>
                  </div>
                  <label className="toggle-switch">
                    <input
                      type="checkbox"
                      checked={enterpriseControls.creditLimit}
                      onChange={() => toggleControl('creditLimit')}
                    />
                    <span className="toggle-slider"></span>
                  </label>
                </div>

                {/* Auto Payment Reminders */}
                <div className="control-item">
                  <div className="control-left">
                    <div className="control-icon yellow">
                     <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M6.84534 14C6.96237 14.2027 7.13068 14.371 7.33337 14.488C7.53605 14.605 7.76597 14.6666 8 14.6666C8.23404 14.6666 8.46396 14.605 8.66664 14.488C8.86933 14.371 9.03764 14.2027 9.15467 14" stroke="#BB4D00" stroke-width="1.33333" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M2.17467 10.218C2.08758 10.3134 2.0301 10.4321 2.00924 10.5597C1.98837 10.6872 2.00501 10.818 2.05714 10.9363C2.10926 11.0545 2.19462 11.155 2.30284 11.2256C2.41105 11.2962 2.53745 11.3339 2.66667 11.334H13.3333C13.4625 11.334 13.589 11.2965 13.6972 11.2261C13.8055 11.1556 13.891 11.0552 13.9433 10.937C13.9955 10.8188 14.0123 10.688 13.9916 10.5605C13.9709 10.433 13.9136 10.3142 13.8267 10.2187C12.94 9.30465 12 8.33332 12 5.33398C12 4.27312 11.5786 3.2557 10.8284 2.50556C10.0783 1.75541 9.06087 1.33398 8 1.33398C6.93914 1.33398 5.92172 1.75541 5.17157 2.50556C4.42143 3.2557 4 4.27312 4 5.33398C4 8.33332 3.05933 9.30465 2.17467 10.218Z" stroke="#BB4D00" stroke-width="1.33333" stroke-linecap="round" stroke-linejoin="round"/>
</svg>

                    </div>
                    <div className="control-text">
                      <h3>Auto Payment Reminders</h3>
                      <p>Send automated reminders before due date</p>
                    </div>
                  </div>
                  <label className="toggle-switch">
                    <input
                      type="checkbox"
                      checked={enterpriseControls.autoPayment}
                      onChange={() => toggleControl('autoPayment')}
                    />
                    <span className="toggle-slider"></span>
                  </label>
                </div>

                {/* Customer Portal */}
                <div className="control-item">
                  <div className="control-left">
                    <div className="control-icon green">
                      <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
<g clip-path="url(#clip0_261_4198)">
<path d="M8.00004 14.6673C11.6819 14.6673 14.6667 11.6825 14.6667 8.00065C14.6667 4.31875 11.6819 1.33398 8.00004 1.33398C4.31814 1.33398 1.33337 4.31875 1.33337 8.00065C1.33337 11.6825 4.31814 14.6673 8.00004 14.6673Z" stroke="#007A55" stroke-width="1.33333" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M8.00004 1.33398C6.2882 3.13142 5.33337 5.51848 5.33337 8.00065C5.33337 10.4828 6.2882 12.8699 8.00004 14.6673C9.71188 12.8699 10.6667 10.4828 10.6667 8.00065C10.6667 5.51848 9.71188 3.13142 8.00004 1.33398Z" stroke="#007A55" stroke-width="1.33333" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M1.33337 8H14.6667" stroke="#007A55" stroke-width="1.33333" stroke-linecap="round" stroke-linejoin="round"/>
</g>
<defs>
<clipPath id="clip0_261_4198">
<rect width="16" height="16" fill="white"/>
</clipPath>
</defs>
</svg>

                    </div>
                    <div className="control-text">
                      <h3>Customer Portal</h3>
                      <p>Allow customers to view invoices and pay online</p>
                    </div>
                  </div>
                  <label className="toggle-switch">
                    <input
                      type="checkbox"
                      checked={enterpriseControls.customerPortal}
                      onChange={() => toggleControl('customerPortal')}
                    />
                    <span className="toggle-slider"></span>
                  </label>
                </div>

                {/* Audit Lock */}
                <div className="control-item">
                  <div className="control-left">
                    <div className="control-icon red">
                     <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
<g clip-path="url(#clip0_261_4212)">
<path d="M12.6667 7.33398H3.33333C2.59695 7.33398 2 7.93094 2 8.66732V13.334C2 14.0704 2.59695 14.6673 3.33333 14.6673H12.6667C13.403 14.6673 14 14.0704 14 13.334V8.66732C14 7.93094 13.403 7.33398 12.6667 7.33398Z" stroke="#C70036" stroke-width="1.33333" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M4.66669 7.33398V4.66732C4.66669 3.78326 5.01788 2.93542 5.643 2.3103C6.26812 1.68517 7.11597 1.33398 8.00002 1.33398C8.88408 1.33398 9.73192 1.68517 10.357 2.3103C10.9822 2.93542 11.3334 3.78326 11.3334 4.66732V7.33398" stroke="#C70036" stroke-width="1.33333" stroke-linecap="round" stroke-linejoin="round"/>
</g>
<defs>
<clipPath id="clip0_261_4212">
<rect width="16" height="16" fill="white"/>
</clipPath>
</defs>
</svg>

                    </div>
                    <div className="control-text">
                      <h3>Audit Lock (Post-Issue)</h3>
                      <p>Lock invoices from edits after issuance</p>
                    </div>
                  </div>
                  <label className="toggle-switch">
                    <input
                      type="checkbox"
                      checked={enterpriseControls.auditLock}
                      onChange={() => toggleControl('auditLock')}
                    />
                    <span className="toggle-slider"></span>
                  </label>
                </div>

                {/* Multi-Entity Billing */}
                <div className="control-item">
                  <div className="control-left">
                    <div className="control-icon purple">
                     <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
<g clip-path="url(#clip0_261_4225)">
<path d="M4 14.6673V2.66732C4 2.3137 4.14048 1.97456 4.39052 1.72451C4.64057 1.47446 4.97971 1.33398 5.33333 1.33398H10.6667C11.0203 1.33398 11.3594 1.47446 11.6095 1.72451C11.8595 1.97456 12 2.3137 12 2.66732V14.6673H4Z" stroke="#432DD7" stroke-width="1.33333" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M4.00004 8H2.66671C2.31309 8 1.97395 8.14048 1.7239 8.39052C1.47385 8.64057 1.33337 8.97971 1.33337 9.33333V13.3333C1.33337 13.687 1.47385 14.0261 1.7239 14.2761C1.97395 14.5262 2.31309 14.6667 2.66671 14.6667H4.00004" stroke="#432DD7" stroke-width="1.33333" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M12 6H13.3333C13.687 6 14.0261 6.14048 14.2761 6.39052C14.5262 6.64057 14.6667 6.97971 14.6667 7.33333V13.3333C14.6667 13.687 14.5262 14.0261 14.2761 14.2761C14.0261 14.5262 13.687 14.6667 13.3333 14.6667H12" stroke="#432DD7" stroke-width="1.33333" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M6.66663 4H9.33329" stroke="#432DD7" stroke-width="1.33333" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M6.66663 6.66602H9.33329" stroke="#432DD7" stroke-width="1.33333" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M6.66663 9.33398H9.33329" stroke="#432DD7" stroke-width="1.33333" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M6.66663 12H9.33329" stroke="#432DD7" stroke-width="1.33333" stroke-linecap="round" stroke-linejoin="round"/>
</g>
<defs>
<clipPath id="clip0_261_4225">
<rect width="16" height="16" fill="white"/>
</clipPath>
</defs>
</svg>

                    </div>
                    <div className="control-text">
                      <h3>Multi-Entity Billing</h3>
                      <p>Enable invoicing from multiple legal entities</p>
                    </div>
                  </div>
                  <label className="toggle-switch">
                    <input
                      type="checkbox"
                      checked={enterpriseControls.multiEntity}
                      onChange={() => toggleControl('multiEntity')}
                    />
                    <span className="toggle-slider"></span>
                  </label>
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
