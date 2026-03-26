import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FiSearch, FiMoreVertical, FiChevronLeft, FiChevronRight, FiPlus, FiClock, FiCheckCircle, FiFileText, FiXCircle } from 'react-icons/fi';
import FinancialSidebar from '../../components/financial-sidebar/FinancialSidebar';
import Header from './Header';
import LogoutConfirmModal from '../../components/logout-modal/LogoutConfirmModal';
import './ExpensesPayroll.css';

export default function ReceiptsPage() {
  const navigate = useNavigate();
  const [showLogoutModal, setShowLogoutModal] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [methodFilter, setMethodFilter] = useState('all');
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

  const receipts = [
    { id: 'REC-2026-001', expId: 'EXP-2026-001', employee: 'Sarah Johnson', merchant: 'Delta Airlines', date: 'Jan 28, 2026', amount: '$850.50', category: 'Travel', status: 'Verified' },
    { id: 'REC-2026-002', expId: 'EXP-2026-002', employee: 'Mike Chen', merchant: 'Delta Airlines', date: 'Jan 27, 2026', amount: '$299.00', category: 'Travel', status: 'Verified' },
    { id: 'REC-2026-003', expId: 'EXP-2026-003', employee: 'Emily Rodriguez', merchant: 'Delta Airlines', date: 'Jan 26, 2026', amount: '$1,250.00', category: 'Travel', status: 'Rejected' },
    { id: 'REC-2026-004', expId: 'EXP-2026-004', employee: 'John Davis', merchant: 'Delta Airlines', date: 'Jan 26, 2026', amount: '$1,250.00', category: 'Travel', status: 'Pending' },
  ];

  const filtered = receipts.filter(r => {
    const matchSearch = r.employee.toLowerCase().includes(searchQuery.toLowerCase()) || r.id.toLowerCase().includes(searchQuery.toLowerCase());
    const matchStatus = statusFilter === 'all' || r.status === statusFilter;
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
                <h1>Receipts</h1>
                <p>All uploaded expense receipts</p>
              </div>
              <button className="ep-add-btn"><FiPlus size={16} /> Add New</button>
            </div>

            <div className="ep-metrics-grid">
              <div className="ep-metric-card">
                <div className="ep-metric-header">
                  <span className="ep-metric-label">Total Receipts</span>
                  <span className="ep-metric-icon blue"><FiFileText size={18} /></span>
                </div>
                <div className="ep-metric-value">248</div>
                <p className="ep-metric-subtitle neutral">This year</p>
              </div>
              <div className="ep-metric-card">
                <div className="ep-metric-header">
                  <span className="ep-metric-label">Pending Verification</span>
                  <span className="ep-metric-icon orange"><FiClock size={18} /></span>
                </div>
                <div className="ep-metric-value">12</div>
                <p className="ep-metric-subtitle orange">Needs review</p>
              </div>
              <div className="ep-metric-card">
                <div className="ep-metric-header">
                  <span className="ep-metric-label">Verified</span>
                  <span className="ep-metric-icon green"><FiCheckCircle size={18} /></span>
                </div>
                <div className="ep-metric-value">234</div>
                <p className="ep-metric-subtitle green">94% verified</p>
              </div>
              <div className="ep-metric-card">
                <div className="ep-metric-header">
                  <span className="ep-metric-label">Rejected</span>
                  <span className="ep-metric-icon red"><FiXCircle size={18} /></span>
                </div>
                <div className="ep-metric-value">2</div>
                <p className="ep-metric-subtitle red">Invalid receipts</p>
              </div>
            </div>

            <div className="ep-table-card">
              <div className="ep-controls">
                <div className="ep-search-box">
                  <FiSearch size={18} />
                  <input type="text" placeholder="Search Vendors" value={searchQuery} onChange={e => setSearchQuery(e.target.value)} />
                </div>
                <div className="ep-filter-group">
                  <select className="ep-filter" value={statusFilter} onChange={e => setStatusFilter(e.target.value)}>
                    <option value="all">All Status</option>
                    <option value="Verified">Verified</option>
                    <option value="Pending">Pending</option>
                    <option value="Rejected">Rejected</option>
                  </select>
                  <select className="ep-filter" value={methodFilter} onChange={e => setMethodFilter(e.target.value)}>
                    <option value="all">All Methods</option>
                    <option value="Travel">Travel</option>
                    <option value="Software">Software</option>
                    <option value="Meals">Meals</option>
                  </select>
                </div>
              </div>

              <div className="ep-table-container">
                <table className="ep-table">
                  <thead>
                    <tr>
                      <th>RECEIPTS #</th>
                      <th>EMPLOYEE</th>
                      <th>MERCHANT</th>
                      <th>DATE</th>
                      <th>AMOUNT</th>
                      <th>CATEGORY</th>
                      <th>STATUS</th>
                      <th>ACTIONS</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filtered.map(r => (
                      <tr key={r.id}>
                        <td>
                          <div className="ep-name-cell">
                            <span className="ep-bold">{r.id}</span>
                            <span className="ep-muted">{r.expId}</span>
                          </div>
                        </td>
                        <td className="ep-bold">{r.employee}</td>
                        <td>{r.merchant}</td>
                        <td className="ep-date">{r.date}</td>
                        <td className="ep-amount">{r.amount}</td>
                        <td><span className={`ep-category ${r.category.toLowerCase()}`}>{r.category}</span></td>
                        <td><span className={`ep-status ${r.status.toLowerCase()}`}>{r.status}</span></td>
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
