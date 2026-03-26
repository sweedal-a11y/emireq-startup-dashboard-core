import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FiSearch, FiChevronLeft, FiChevronRight, FiPlus, FiClock, FiCheckCircle, FiDollarSign, FiX, FiCheck } from 'react-icons/fi';
import FinancialSidebar from '../../components/financial-sidebar/FinancialSidebar';
import Header from './Header';
import LogoutConfirmModal from '../../components/logout-modal/LogoutConfirmModal';
import './ExpensesPayroll.css';

export default function ApprovalsPage() {
  const navigate = useNavigate();
  const [showLogoutModal, setShowLogoutModal] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [deptFilter, setDeptFilter] = useState('all');
  const [currentPage, setCurrentPage] = useState(1);
  const [approvalStatuses, setApprovalStatuses] = useState({});
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

  const handleApprove = (id) => setApprovalStatuses(prev => ({ ...prev, [id]: 'Approved' }));
  const handleReject = (id) => setApprovalStatuses(prev => ({ ...prev, [id]: 'Rejected' }));

  const approvals = [
    { id: 'EXP-2026-001', employee: 'Sarah Johnson', department: 'Sales', category: 'Travel', amount: '$1,250.00', date: 'Jan 28, 2026', status: 'Pending' },
    { id: 'EXP-2026-002', employee: 'Mike Chen', department: 'Operations', category: 'Travel', amount: '$145.00', date: 'Jan 27, 2026', status: 'Pending' },
    { id: 'EXP-2026-003', employee: 'Emily Rodriguez', department: 'Engineering', category: 'Travel', amount: '$299.00', date: 'Jan 26, 2026', status: 'Approved' },
  ];

  const filtered = approvals.filter(a => {
    const effectiveStatus = approvalStatuses[a.id] || a.status;
    const matchSearch = a.employee.toLowerCase().includes(searchQuery.toLowerCase()) || a.id.toLowerCase().includes(searchQuery.toLowerCase());
    const matchStatus = statusFilter === 'all' || effectiveStatus === statusFilter;
    const matchDept = deptFilter === 'all' || a.department === deptFilter;
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
                <h1>Expense Approvals</h1>
                <p>Review and authorize employee expense claims.</p>
              </div>
              <button className="ep-add-btn"><FiPlus size={16} /> Add New</button>
            </div>

            <div className="ep-metrics-grid">
              <div className="ep-metric-card">
                <div className="ep-metric-header">
                  <span className="ep-metric-label">Pending Approvals</span>
                  <span className="ep-metric-icon orange"><FiClock size={18} /></span>
                </div>
                <div className="ep-metric-value">2</div>
                <p className="ep-metric-subtitle red">Requires action</p>
              </div>
              <div className="ep-metric-card">
                <div className="ep-metric-header">
                  <span className="ep-metric-label">Pending Value</span>
                  <span className="ep-metric-icon orange"><FiDollarSign size={18} /></span>
                </div>
                <div className="ep-metric-value">$1,395</div>
                <p className="ep-metric-subtitle orange">Awaiting approval</p>
              </div>
              <div className="ep-metric-card">
                <div className="ep-metric-header">
                  <span className="ep-metric-label">Approved Today</span>
                  <span className="ep-metric-icon green"><FiCheckCircle size={18} /></span>
                </div>
                <div className="ep-metric-value">8</div>
                <p className="ep-metric-subtitle green">$2,840 approved</p>
              </div>
              <div className="ep-metric-card">
                <div className="ep-metric-header">
                  <span className="ep-metric-label">Avg Approval Time</span>
                  <span className="ep-metric-icon teal"><FiClock size={18} /></span>
                </div>
                <div className="ep-metric-value">1.5 hrs</div>
                <p className="ep-metric-subtitle neutral">Average turnaround</p>
              </div>
            </div>

            <div className="ep-table-card">
              <div className="ep-controls">
                <div className="ep-search-box">
                  <FiSearch size={18} />
                  <input type="text" placeholder="Search" value={searchQuery} onChange={e => setSearchQuery(e.target.value)} />
                </div>
                <div className="ep-filter-group">
                  <select className="ep-filter" value={statusFilter} onChange={e => setStatusFilter(e.target.value)}>
                    <option value="all">All Status</option>
                    <option value="Pending">Pending</option>
                    <option value="Approved">Approved</option>
                    <option value="Rejected">Rejected</option>
                  </select>
                  <select className="ep-filter" value={deptFilter} onChange={e => setDeptFilter(e.target.value)}>
                    <option value="all">Departments</option>
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
                      <th>EXPENSE</th>
                      <th>EMPLOYEE</th>
                      <th>DEPARTMENT</th>
                      <th>CATEGORY</th>
                      <th>AMOUNT</th>
                      <th>DATE</th>
                      <th>STATUS</th>
                      <th>ACTIONS</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filtered.map(a => {
                      const effectiveStatus = approvalStatuses[a.id] || a.status;
                      return (
                        <tr key={a.id}>
                          <td className="ep-muted">{a.id}</td>
                          <td className="ep-bold">{a.employee}</td>
                          <td>{a.department}</td>
                          <td><span className={`ep-category ${a.category.toLowerCase()}`}>{a.category}</span></td>
                          <td className="ep-amount">{a.amount}</td>
                          <td className="ep-date">{a.date}</td>
                          <td><span className={`ep-status ${effectiveStatus.toLowerCase()}`}>{effectiveStatus}</span></td>
                          <td>
                            {effectiveStatus === 'Pending' ? (
                              <div className="ep-action-group">
                                <button className="ep-reject-btn" onClick={() => handleReject(a.id)}><FiX size={14} /> Reject</button>
                                <button className="ep-approve-btn" onClick={() => handleApprove(a.id)}><FiCheck size={14} /> Approve</button>
                              </div>
                            ) : null}
                          </td>
                        </tr>
                      );
                    })}
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
