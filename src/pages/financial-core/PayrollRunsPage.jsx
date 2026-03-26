import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FiSearch, FiMoreVertical, FiChevronLeft, FiChevronRight, FiPlus, FiPlay, FiDollarSign, FiClock, FiBarChart2, FiUsers } from 'react-icons/fi';
import FinancialSidebar from '../../components/financial-sidebar/FinancialSidebar';
import Header from './Header';
import LogoutConfirmModal from '../../components/logout-modal/LogoutConfirmModal';
import './ExpensesPayroll.css';

export default function PayrollRunsPage() {
  const navigate = useNavigate();
  const [showLogoutModal, setShowLogoutModal] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = 10;

  const toggleTheme = () => setIsDarkMode(prev => !prev);
  const handleLogoutClick = () => setShowLogoutModal(true);
  const handleCloseLogoutModal = () => setShowLogoutModal(false);
  const handleConfirmLogout = () => {
    localStorage.removeItem("authToken");
    sessionStorage.clear();
    setShowLogoutModal(false);
    navigate("/auth/login");
  };

  const payrollRuns = [
    { id: 'PR-2026-01', subId: 'PR-001', period: 'Jan 28, 2026', payDate: 'Jan 28, 2026', employees: 47, grossAmount: '$91,050', deductions: '-$12,450', netAmount: '+$8,500', status: 'Completed' },
    { id: 'PR-2026-01', subId: 'PR-001', period: 'Jan 27, 2026', payDate: 'Jan 27, 2026', employees: 47, grossAmount: '$118,250', deductions: '-$16,750', netAmount: '+$10,000', status: 'Completed' },
    { id: 'PR-2026-01', subId: 'PR-001', period: 'Jan 26, 2026', payDate: 'Jan 26, 2026', employees: 47, grossAmount: '$104,150', deductions: '-$14,850', netAmount: '+$9,000', status: 'Processing' },
  ];

  const filtered = payrollRuns.filter(p => {
    const matchSearch = p.id.toLowerCase().includes(searchQuery.toLowerCase()) || p.period.toLowerCase().includes(searchQuery.toLowerCase());
    const matchStatus = statusFilter === 'all' || p.status === statusFilter;
    return matchSearch && matchStatus;
  });

  const renderPagination = () => {
    const pages = [];
    for (let i = 1; i <= Math.min(3, totalPages); i++) pages.push(i);
    return (
      <div className="ep-pagination">
        <div className="ep-pagination-info">
          Showing <span className="ep-page-size">{String(filtered.length).padStart(2, '0')}</span> / 15 Results
        </div>
        <div className="ep-pagination-controls">
          <button className="ep-page-btn" disabled={currentPage === 1} onClick={() => setCurrentPage(p => p - 1)}><FiChevronLeft size={14} /></button>
          {pages.map(p => (
            <button key={p} className={`ep-page-num ${currentPage === p ? 'active' : ''}`} onClick={() => setCurrentPage(p)}>{p}</button>
          ))}
          <span className="ep-page-dots">...</span>
          <button className={`ep-page-num ${currentPage === totalPages ? 'active' : ''}`} onClick={() => setCurrentPage(totalPages)}>{totalPages}</button>
          <button className="ep-page-btn" disabled={currentPage === totalPages} onClick={() => setCurrentPage(p => p + 1)}><FiChevronRight size={14} /></button>
        </div>
      </div>
    );
  };

  return (
    <div className={`ep-page ${isDarkMode ? 'dark-mode' : ''}`}>
      <FinancialSidebar onLogout={handleLogoutClick} isDarkMode={isDarkMode} activePage="expenses" />
      <div className="ep-main">
        <Header isDarkMode={isDarkMode} toggleTheme={toggleTheme} />
        <main className="ep-content">
          <div className="ep-container">
            <div className="ep-page-header">
              <div className="header-text">
                <h1>Payroll Runs</h1>
                <p>Execute and monitor monthly payroll processing.</p>
              </div>
              <button className="ep-add-btn"><FiPlus size={16} /> Add New</button>
            </div>

            <div className="ep-metrics-grid">
              <div className="ep-metric-card">
                <div className="ep-metric-header">
                  <span className="ep-metric-label">Total Runs</span>
                  <span className="ep-metric-icon blue"><FiPlay size={18} /></span>
                </div>
                <div className="ep-metric-value">24</div>
                <p className="ep-metric-subtitle neutral">This year</p>
              </div>
              <div className="ep-metric-card">
                <div className="ep-metric-header">
                  <span className="ep-metric-label">Last Run Total</span>
                  <span className="ep-metric-icon green"><FiDollarSign size={18} /></span>
                </div>
                <div className="ep-metric-value">$416,750</div>
                <p className="ep-metric-subtitle green">January 2026</p>
              </div>
              <div className="ep-metric-card">
                <div className="ep-metric-header">
                  <span className="ep-metric-label">Processing</span>
                  <span className="ep-metric-icon orange"><FiClock size={18} /></span>
                </div>
                <div className="ep-metric-value">1</div>
                <p className="ep-metric-subtitle orange">February 2026</p>
              </div>
              <div className="ep-metric-card">
                <div className="ep-metric-header">
                  <span className="ep-metric-label">YTD Payroll</span>
                  <span className="ep-metric-icon purple"><FiBarChart2 size={18} /></span>
                </div>
                <div className="ep-metric-value">$819,230</div>
                <p className="ep-metric-subtitle neutral">Year to date</p>
              </div>
            </div>

            <div className="ep-table-card">
              <div className="ep-controls">
                <div className="ep-search-box">
                  <FiSearch size={18} />
                  <input type="text" placeholder="Search payroll runs..." value={searchQuery} onChange={e => setSearchQuery(e.target.value)} />
                </div>
                <div className="ep-filter-group">
                  <select className="ep-filter" value={statusFilter} onChange={e => setStatusFilter(e.target.value)}>
                    <option value="all">All Status</option>
                    <option value="Completed">Completed</option>
                    <option value="Processing">Processing</option>
                  </select>
                </div>
              </div>

              <div className="ep-table-container">
                <table className="ep-table">
                  <thead>
                    <tr>
                      <th>EMPLOYEE</th>
                      <th>PERIOD</th>
                      <th>PAY DATE</th>
                      <th>EMPLOYEES</th>
                      <th>GROSS AMOUNT</th>
                      <th>DEDUCTIONS</th>
                      <th>NET AMOUNT</th>
                      <th>STATUS</th>
                      <th>ACTIONS</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filtered.map((p, idx) => (
                      <tr key={idx}>
                        <td>
                          <div className="ep-name-cell">
                            <span className="ep-bold">{p.id}</span>
                            <span className="ep-muted">{p.subId}</span>
                          </div>
                        </td>
                        <td className="ep-date">{p.period}</td>
                        <td className="ep-date">{p.payDate}</td>
                        <td><span style={{ display: 'inline-flex', alignItems: 'center', gap: '4px' }}><FiUsers size={14} /> {p.employees}</span></td>
                        <td className="ep-amount">{p.grossAmount}</td>
                        <td className="ep-red">{p.deductions}</td>
                        <td className="ep-green">{p.netAmount}</td>
                        <td><span className={`ep-status ${p.status.toLowerCase()}`}>{p.status}</span></td>
                        <td><button className="ep-actions-btn"><FiMoreVertical size={16} /></button></td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              {renderPagination()}
            </div>
          </div>
        </main>
      </div>
      {showLogoutModal && <LogoutConfirmModal onClose={handleCloseLogoutModal} onConfirm={handleConfirmLogout} />}
    </div>
  );
}
