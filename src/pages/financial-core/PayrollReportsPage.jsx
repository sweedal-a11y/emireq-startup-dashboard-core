import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FiSearch, FiChevronLeft, FiChevronRight, FiPlus, FiBarChart2, FiTrendingUp, FiFileText, FiMoreHorizontal } from 'react-icons/fi';
import FinancialSidebar from '../../components/financial-sidebar/FinancialSidebar';
import Header from './Header';
import LogoutConfirmModal from '../../components/logout-modal/LogoutConfirmModal';
import './ExpensesPayroll.css';

export default function PayrollReportsPage() {
  const navigate = useNavigate();
  const [showLogoutModal, setShowLogoutModal] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [formatFilter, setFormatFilter] = useState('all');
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

  const reports = [
    { id: 'REP-001', name: 'Monthly Payroll Summary – January', type: 'Payroll Summary', period: '2025-09-15', generatedDate: '2025-09-15', generatedBy: 'David Smith', format: 'PDF' },
    { id: 'REP-002', name: 'Tax Deductions Report – Q4 2025', type: 'Tax Report', period: '2025-09-30', generatedDate: '2025-09-30', generatedBy: 'David Smith', format: 'Excel' },
    { id: 'REP-003', name: 'Employee Compensation Analysis', type: 'Compensation Report', period: '2025-10-15', generatedDate: '2025-10-15', generatedBy: 'HR Department', format: 'PDF' },
  ];

  const filtered = reports.filter(r => {
    const matchSearch = r.name.toLowerCase().includes(searchQuery.toLowerCase()) || r.id.toLowerCase().includes(searchQuery.toLowerCase());
    const matchFormat = formatFilter === 'all' || r.format === formatFilter;
    return matchSearch && matchFormat;
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
                <h1>Payroll Reports</h1>
                <p>Generate and download payroll-related compliance reports.</p>
              </div>
              <button className="ep-add-btn"><FiPlus size={16} /> Add New</button>
            </div>

            <div className="ep-metrics-grid">
              <div className="ep-metric-card">
                <div className="ep-metric-header">
                  <span className="ep-metric-label">Total Reports</span>
                  <span className="ep-metric-icon blue"><FiBarChart2 size={18} /></span>
                </div>
                <div className="ep-metric-value">86</div>
                <p className="ep-metric-subtitle neutral">Generated this year</p>
              </div>
              <div className="ep-metric-card">
                <div className="ep-metric-header">
                  <span className="ep-metric-label">This Month</span>
                  <span className="ep-metric-icon green"><FiFileText size={18} /></span>
                </div>
                <div className="ep-metric-value">12</div>
                <p className="ep-metric-subtitle green">January 2026</p>
              </div>
              <div className="ep-metric-card">
                <div className="ep-metric-header">
                  <span className="ep-metric-label">Most Generated</span>
                  <span className="ep-metric-icon teal"><FiTrendingUp size={18} /></span>
                </div>
                <div className="ep-metric-value" style={{ fontSize: '20px' }}>Payroll Summary</div>
                <p className="ep-metric-subtitle neutral">24 reports</p>
              </div>
              <div className="ep-metric-card">
                <div className="ep-metric-header">
                  <span className="ep-metric-label">Report Types</span>
                  <span className="ep-metric-icon orange"><FiFileText size={18} /></span>
                </div>
                <div className="ep-metric-value">8</div>
                <p className="ep-metric-subtitle neutral">Different types</p>
              </div>
            </div>

            <div className="ep-table-card">
              <div className="ep-controls">
                <div className="ep-search-box">
                  <FiSearch size={18} />
                  <input type="text" placeholder="Search Reports..." value={searchQuery} onChange={e => setSearchQuery(e.target.value)} />
                </div>
                <div className="ep-filter-group">
                  <select className="ep-filter" value={statusFilter} onChange={e => setStatusFilter(e.target.value)}>
                    <option value="all">All Status</option>
                    <option value="Generated">Generated</option>
                    <option value="Pending">Pending</option>
                  </select>
                  <select className="ep-filter" value={formatFilter} onChange={e => setFormatFilter(e.target.value)}>
                    <option value="all">All Formats</option>
                    <option value="PDF">PDF</option>
                    <option value="Excel">Excel</option>
                  </select>
                </div>
              </div>

              <div className="ep-table-container">
                <table className="ep-table">
                  <thead>
                    <tr>
                      <th>REPORT NAME</th>
                      <th>TYPE</th>
                      <th>PERIOD</th>
                      <th>GENERATED DATE</th>
                      <th>GENERATED BY</th>
                      <th>FORMAT</th>
                      <th>ACTIONS</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filtered.map(r => (
                      <tr key={r.id}>
                        <td>
                          <div className="ep-report-name-cell">
                            <div className="ep-report-icon"><FiFileText size={16} /></div>
                            <div className="ep-name-cell">
                              <span className="ep-bold">{r.name}</span>
                              <span className="ep-muted">{r.id}</span>
                            </div>
                          </div>
                        </td>
                        <td>{r.type}</td>
                        <td className="ep-date">{r.period}</td>
                        <td className="ep-date">{r.generatedDate}</td>
                        <td>{r.generatedBy}</td>
                        <td><span className={`ep-format ${r.format.toLowerCase()}`}>{r.format}</span></td>
                        <td><button className="ep-actions-btn"><FiMoreHorizontal size={16} /></button></td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              {renderPagination()}
              <div className="ep-disclaimer">
                Market data is updated in real-time. Prices are for reference only and may vary across exchanges.
              </div>
            </div>
          </div>
        </main>
      </div>
      {showLogoutModal && <LogoutConfirmModal onClose={handleCloseLogoutModal} onConfirm={handleConfirmLogout} />}
    </div>
  );
}
