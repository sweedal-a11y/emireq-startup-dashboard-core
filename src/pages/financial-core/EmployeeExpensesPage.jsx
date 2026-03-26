import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FiSearch, FiMoreVertical, FiChevronLeft, FiChevronRight, FiPlus, FiDollarSign, FiClock, FiCheckCircle, FiGrid } from 'react-icons/fi';
import FinancialSidebar from '../../components/financial-sidebar/FinancialSidebar';
import Header from './Header';
import LogoutConfirmModal from '../../components/logout-modal/LogoutConfirmModal';
import './ExpensesPayroll.css';

export default function EmployeeExpensesPage() {
  const navigate = useNavigate();
  const [showLogoutModal, setShowLogoutModal] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [categoryFilter, setCategoryFilter] = useState('all');
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

  const expenses = [
    { id: 'EXP-001', employee: 'Sarah Johnson', category: 'Travel', date: 'Jan 28, 2026', amount: '$45,000', status: 'Pending' },
    { id: 'EXP-002', employee: 'Mike Chen', category: 'Software', date: 'Jan 27, 2026', amount: '$12,000', status: 'Approved' },
    { id: 'EXP-003', employee: 'Emily Rodriguez', category: 'Meals', date: 'Jan 26, 2026', amount: '$3,200', status: 'Reimbursed' },
    { id: 'EXP-004', employee: 'John Davis', category: 'Office Supplies', date: 'Jan 25, 2026', amount: '$28,000', status: 'Rejected' },
  ];

  const filtered = expenses.filter(e => {
    const matchSearch = e.employee.toLowerCase().includes(searchQuery.toLowerCase()) || e.id.toLowerCase().includes(searchQuery.toLowerCase());
    const matchStatus = statusFilter === 'all' || e.status === statusFilter;
    const matchCategory = categoryFilter === 'all' || e.category === categoryFilter;
    return matchSearch && matchStatus && matchCategory;
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
                <h1>Employee Expenses</h1>
                <p>Manage employee expenses, reimbursements, and payroll operations</p>
              </div>
              <button className="ep-add-btn"><FiPlus size={16} /> New Expenses</button>
            </div>

            <div className="ep-metrics-grid">
              <div className="ep-metric-card">
                <div className="ep-metric-header">
                  <span className="ep-metric-label">Total Expenses</span>
                  <span className="ep-metric-icon blue"><FiDollarSign size={18} /></span>
                </div>
                <div className="ep-metric-value">$42,180</div>
                <p className="ep-metric-subtitle neutral">This month</p>
              </div>
              <div className="ep-metric-card">
                <div className="ep-metric-header">
                  <span className="ep-metric-label">Pending Approval</span>
                  <span className="ep-metric-icon orange"><FiClock size={18} /></span>
                </div>
                <div className="ep-metric-value">$1,395</div>
                <p className="ep-metric-subtitle orange">2 expenses</p>
              </div>
              <div className="ep-metric-card">
                <div className="ep-metric-header">
                  <span className="ep-metric-label">Reimbursed</span>
                  <span className="ep-metric-icon green"><FiCheckCircle size={18} /></span>
                </div>
                <div className="ep-metric-value">$38,450</div>
                <p className="ep-metric-subtitle green">124 expenses</p>
              </div>
              <div className="ep-metric-card">
                <div className="ep-metric-header">
                  <span className="ep-metric-label">Avg Expense</span>
                  <span className="ep-metric-icon red"><FiGrid size={18} /></span>
                </div>
                <div className="ep-metric-value">$335</div>
                <p className="ep-metric-subtitle neutral">Per employee</p>
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
                    <option value="Pending">Pending</option>
                    <option value="Approved">Approved</option>
                    <option value="Reimbursed">Reimbursed</option>
                    <option value="Rejected">Rejected</option>
                  </select>
                  <select className="ep-filter" value={categoryFilter} onChange={e => setCategoryFilter(e.target.value)}>
                    <option value="all">All Categories</option>
                    <option value="Travel">Travel</option>
                    <option value="Software">Software</option>
                    <option value="Meals">Meals</option>
                    <option value="Office Supplies">Office Supplies</option>
                  </select>
                </div>
              </div>

              <div className="ep-table-container">
                <table className="ep-table">
                  <thead>
                    <tr>
                      <th>EXPENSES ID</th>
                      <th>EMPLOYEE</th>
                      <th>CATEGORY</th>
                      <th>DATE</th>
                      <th>TOTAL BILLED</th>
                      <th>STATUS</th>
                      <th>ACTIONS</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filtered.map(exp => (
                      <tr key={exp.id}>
                        <td className="ep-muted">{exp.id}</td>
                        <td className="ep-bold">{exp.employee}</td>
                        <td><span className={`ep-category ${exp.category.toLowerCase().replace(' ', '-')}`}>{exp.category}</span></td>
                        <td className="ep-date">{exp.date}</td>
                        <td className="ep-amount">{exp.amount}</td>
                        <td><span className={`ep-status ${exp.status.toLowerCase()}`}>{exp.status}</span></td>
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
