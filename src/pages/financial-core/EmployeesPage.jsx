import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FiSearch, FiMoreVertical, FiChevronLeft, FiChevronRight, FiPlus, FiUsers, FiCalendar, FiDollarSign, FiMail, FiPhone } from 'react-icons/fi';
import FinancialSidebar from '../../components/financial-sidebar/FinancialSidebar';
import Header from './Header';
import LogoutConfirmModal from '../../components/logout-modal/LogoutConfirmModal';
import './ExpensesPayroll.css';

export default function EmployeesPage() {
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

  const employees = [
    { id: 1, name: 'Sarah Johnson', email: 'sarah.johnson@emireq.com', phone: '+1 (555) 123-4568', department: 'Sales', position: 'Senior Sales Manager', amount: '$95,000', amountType: 'Annual', date: 'Jan 28, 2026', status: 'Active' },
    { id: 2, name: 'Mike Chen', email: 'mike.chen@emireq.com', phone: '+1 (555) 123-4568', department: 'Operations', position: 'Marketing Director', amount: '$125,000', amountType: 'Annual', date: 'Jan 27, 2026', status: 'Active' },
    { id: 3, name: 'Emily Rodriguez', email: 'emily.rodriguez@emireq.com', phone: '+1 (555) 123-4568', department: 'Engineering', position: 'Operations Manager', amount: '$110,000', amountType: 'Annual', date: 'Jan 26, 2026', status: 'On Leave' },
  ];

  const filtered = employees.filter(e => {
    const matchSearch = e.name.toLowerCase().includes(searchQuery.toLowerCase()) || e.email.toLowerCase().includes(searchQuery.toLowerCase());
    const matchStatus = statusFilter === 'all' || e.status === statusFilter;
    const matchDept = deptFilter === 'all' || e.department === deptFilter;
    return matchSearch && matchStatus && matchDept;
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
                <h1>Employees</h1>
                <p>Directory of all staff members and their roles.</p>
              </div>
              <button className="ep-add-btn"><FiPlus size={16} /> Add New</button>
            </div>

            <div className="ep-metrics-grid">
              <div className="ep-metric-card">
                <div className="ep-metric-header">
                  <span className="ep-metric-label">Total Employees</span>
                  <span className="ep-metric-icon blue"><FiUsers size={18} /></span>
                </div>
                <div className="ep-metric-value">47</div>
                <p className="ep-metric-subtitle neutral">Full-time employees</p>
              </div>
              <div className="ep-metric-card">
                <div className="ep-metric-header">
                  <span className="ep-metric-label">Active</span>
                  <span className="ep-metric-icon green"><FiUsers size={18} /></span>
                </div>
                <div className="ep-metric-value">45</div>
                <p className="ep-metric-subtitle green">96% active</p>
              </div>
              <div className="ep-metric-card">
                <div className="ep-metric-header">
                  <span className="ep-metric-label">On Leave</span>
                  <span className="ep-metric-icon orange"><FiCalendar size={18} /></span>
                </div>
                <div className="ep-metric-value">2</div>
                <p className="ep-metric-subtitle orange">Currently unavailable</p>
              </div>
              <div className="ep-metric-card">
                <div className="ep-metric-header">
                  <span className="ep-metric-label">Avg Salary</span>
                  <span className="ep-metric-icon red"><FiDollarSign size={18} /></span>
                </div>
                <div className="ep-metric-value">$98,000</div>
                <p className="ep-metric-subtitle neutral">Annual average</p>
              </div>
            </div>

            <div className="ep-table-card">
              <div className="ep-controls">
                <div className="ep-search-box">
                  <FiSearch size={18} />
                  <input type="text" placeholder="Search employees..." value={searchQuery} onChange={e => setSearchQuery(e.target.value)} />
                </div>
                <div className="ep-filter-group">
                  <select className="ep-filter" value={statusFilter} onChange={e => setStatusFilter(e.target.value)}>
                    <option value="all">All Status</option>
                    <option value="Active">Active</option>
                    <option value="On Leave">On Leave</option>
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
                      <th>EMPLOYEE</th>
                      <th>DEPARTMENT</th>
                      <th>POSITION</th>
                      <th>AMOUNT</th>
                      <th>DATE</th>
                      <th>STATUS</th>
                      <th>ACTIONS</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filtered.map(emp => (
                      <tr key={emp.id}>
                        <td className="ep-bold">{emp.name}</td>
                        <td>
                          <div className="ep-contact-cell">
                            <span className="ep-contact-item"><FiMail size={12} /> {emp.email}</span>
                            <span className="ep-contact-item"><FiPhone size={12} /> {emp.phone}</span>
                          </div>
                        </td>
                        <td><span className={`ep-department ${emp.department.toLowerCase()}`}>{emp.department}</span></td>
                        <td>{emp.position}</td>
                        <td>
                          <div className="ep-name-cell">
                            <span className="ep-amount">{emp.amount}</span>
                            <span className="ep-muted">{emp.amountType}</span>
                          </div>
                        </td>
                        <td className="ep-date">{emp.date}</td>
                        <td><span className={`ep-status ${emp.status.toLowerCase().replace(' ', '-')}`}>{emp.status}</span></td>
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
