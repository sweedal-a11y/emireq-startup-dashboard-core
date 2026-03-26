import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FiSearch, FiMoreVertical, FiChevronLeft, FiChevronRight, FiPlus, FiDollarSign, FiTrendingUp } from 'react-icons/fi';
import { MdAttachMoney } from 'react-icons/md';
import FinancialSidebar from '../../components/financial-sidebar/FinancialSidebar';
import Header from './Header';
import LogoutConfirmModal from '../../components/logout-modal/LogoutConfirmModal';
import './ExpensesPayroll.css';

export default function SalaryStructurePage() {
  const navigate = useNavigate();
  const [showLogoutModal, setShowLogoutModal] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [deptFilter, setDeptFilter] = useState('all');
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

  const salaryData = [
    { id: 'EMP-2024-001', name: 'Sarah Johnson', initials: 'SJ', color: 'blue', baseSalary: '$95,000', allowances: '+$8,500', deductions: '-$12,450', netSalary: '$91,050', status: 'Active' },
    { id: 'EMP-2024-002', name: 'Mike Chen', initials: 'MC', color: 'green', baseSalary: '$125,000', allowances: '+$10,000', deductions: '-$16,750', netSalary: '$118,250', status: 'Active' },
    { id: 'EMP-2024-003', name: 'Emily Rodriguez', initials: 'ER', color: 'orange', baseSalary: '$110,000', allowances: '+$9,000', deductions: '-$14,850', netSalary: '$104,150', status: 'Active' },
    { id: 'EMP-2024-004', name: 'John Davis', initials: 'JD', color: 'purple', baseSalary: '$85,000', allowances: '+$6,500', deductions: '-$11,050', netSalary: '$80,450', status: 'Active' },
  ];

  const filtered = salaryData.filter(s => {
    const matchSearch = s.name.toLowerCase().includes(searchQuery.toLowerCase()) || s.id.toLowerCase().includes(searchQuery.toLowerCase());
    const matchStatus = statusFilter === 'all' || s.status === statusFilter;
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
                <h1>Salary Structure</h1>
                <p>Define and manage compensation packages for employees.</p>
              </div>
              <button className="ep-add-btn"><FiPlus size={16} /> Add New</button>
            </div>

            <div className="ep-metrics-grid">
              <div className="ep-metric-card">
                <div className="ep-metric-header">
                  <span className="ep-metric-label">Total Payroll</span>
                  <span className="ep-metric-icon blue"><FiDollarSign size={18} /></span>
                </div>
                <div className="ep-metric-value">$4.6M</div>
                <p className="ep-metric-subtitle neutral">Annual total</p>
              </div>
              <div className="ep-metric-card">
                <div className="ep-metric-header">
                  <span className="ep-metric-label">Avg Base Salary</span>
                  <span className="ep-metric-icon green"><MdAttachMoney size={18} /></span>
                </div>
                <div className="ep-metric-value">$103,750</div>
                <p className="ep-metric-subtitle neutral">Per employee</p>
              </div>
              <div className="ep-metric-card">
                <div className="ep-metric-header">
                  <span className="ep-metric-label">Total Allowances</span>
                  <span className="ep-metric-icon teal"><FiTrendingUp size={18} /></span>
                </div>
                <div className="ep-metric-value">$34,000</div>
                <p className="ep-metric-subtitle neutral">Monthly total</p>
              </div>
              <div className="ep-metric-card">
                <div className="ep-metric-header">
                  <span className="ep-metric-label">Total Deductions</span>
                  <span className="ep-metric-icon red"><FiDollarSign size={18} /></span>
                </div>
                <div className="ep-metric-value">$55,100</div>
                <p className="ep-metric-subtitle red">Monthly total</p>
              </div>
            </div>

            <div className="ep-table-card">
              <div className="ep-controls">
                <div className="ep-search-box">
                  <FiSearch size={18} />
                  <input type="text" placeholder="Search salary structure..." value={searchQuery} onChange={e => setSearchQuery(e.target.value)} />
                </div>
                <div className="ep-filter-group">
                  <select className="ep-filter" value={statusFilter} onChange={e => setStatusFilter(e.target.value)}>
                    <option value="all">All Status</option>
                    <option value="Active">Active</option>
                    <option value="Inactive">Inactive</option>
                  </select>
                  <select className="ep-filter" value={deptFilter} onChange={e => setDeptFilter(e.target.value)}>
                    <option value="all">All Departments</option>
                    <option value="Sales">Sales</option>
                    <option value="Operations">Operations</option>
                    <option value="Engineering">Engineering</option>
                  </select>
                </div>
              </div>

              <div className="ep-table-container">
                <table className="ep-table">
                  <thead>
                    <tr>
                      <th>EMPLOYEE</th>
                      <th>BASE SALARY</th>
                      <th>ALLOWANCES</th>
                      <th>DEDUCTIONS</th>
                      <th>NET SALARY</th>
                      <th>STATUS</th>
                      <th>ACTIONS</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filtered.map(s => (
                      <tr key={s.id}>
                        <td>
                          <div className="ep-employee-row">
                            <div className={`ep-avatar ${s.color}`}>{s.initials}</div>
                            <div className="ep-name-cell">
                              <span className="ep-bold">{s.name}</span>
                              <span className="ep-muted">{s.id}</span>
                            </div>
                          </div>
                        </td>
                        <td className="ep-amount">{s.baseSalary}</td>
                        <td className="ep-green">{s.allowances}</td>
                        <td className="ep-red">{s.deductions}</td>
                        <td className="ep-amount">{s.netSalary}</td>
                        <td><span className={`ep-status ${s.status.toLowerCase()}`}>{s.status}</span></td>
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
