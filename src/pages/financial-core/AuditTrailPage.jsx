import React, { useState } from "react";
import FinancialSidebar from "../../components/financial-sidebar/FinancialSidebar";
import Header from "./Header";
import LogoutConfirmModal from "../../components/logout-modal/LogoutConfirmModal";
import { useNavigate } from "react-router-dom";
import {
  FiTrendingUp,
  FiAlertCircle,
  FiSearch,
  FiChevronLeft,
  FiChevronRight,
  FiDownload,
  FiCalendar,
  FiEye,
  FiShield,
  FiUsers,
} from "react-icons/fi";
import "./AuditTrailPage.css";

const AUDIT_DATA = [
  {
    timestamp: "2026-02-27\n4:32:15",
    user: "Sarah Johnson",
    initials: "SJ",
    action: "Updated",
    entity: "Invoice",
    entityId: "INV-2026-0245",
    changes: "Amount: $12,500 → $13,200",
    ip: "192.168.1.45",
    status: "Success",
  },
  {
    timestamp: "2026-02-27\n14:28:03",
    user: "Sarah Johnson",
    initials: "SJ",
    action: "Created",
    entity: "Bill",
    entityId: "BILL-2026-0189",
    changes: "New bill from Acme Corp - $8,950",
    ip: "192.168.1.52",
    status: "Success",
  },
  {
    timestamp: "2026-02-27\n14:15:47",
    user: "Sarah Johnson",
    initials: "SJ",
    action: "Approved",
    entity: "Expense",
    entityId: "EXP-2026-1242",
    changes: "Expense approved for $2,340",
    ip: "192.168.1.38",
    status: "Success",
  },
  {
    timestamp: "2026-02-27\n13:05:22",
    user: "Sarah Johnson",
    initials: "SJ",
    action: "Deleted",
    entity: "Payment",
    entityId: "PAY-2026-0567",
    changes: "Payment record removed",
    ip: "192.168.1.67",
    status: "Warning",
  },
  {
    timestamp: "2026-02-27\n13:05:22",
    user: "Sarah Johnson",
    initials: "SJ",
    action: "Auto-sync",
    entity: "Bank Account",
    entityId: "BA-001",
    changes: "Synced 24 new transactions",
    ip: "192.168.1.67",
    status: "Success",
  },
  {
    timestamp: "2026-02-27\n13:05:22",
    user: "Sarah Johnson",
    initials: "SJ",
    action: "Failed Login",
    entity: "User Session",
    entityId: "SESSION-4521",
    changes: "Invalid credentials",
    ip: "192.168.1.67",
    status: "Failed",
  },
];

export default function AuditTrailPage() {
  const navigate = useNavigate();
  const [showLogoutModal, setShowLogoutModal] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [userFilter, setUserFilter] = useState("All Users");
  const [actionFilter, setActionFilter] = useState("All Actions");
  const [entityFilter, setEntityFilter] = useState("All Entities");
  const [rowsPerPage, setRowsPerPage] = useState(6);
  const [currentPage, setCurrentPage] = useState(1);

  const filteredData = AUDIT_DATA.filter((row) => {
    if (searchQuery) {
      const q = searchQuery.toLowerCase();
      const matchesSearch =
        row.user.toLowerCase().includes(q) ||
        row.entity.toLowerCase().includes(q) ||
        row.entityId.toLowerCase().includes(q) ||
        row.changes.toLowerCase().includes(q) ||
        row.action.toLowerCase().includes(q) ||
        row.ip.includes(q);
      if (!matchesSearch) return false;
    }
    if (userFilter !== "All Users" && row.user !== userFilter) return false;
    if (actionFilter !== "All Actions" && row.action !== actionFilter) return false;
    if (entityFilter !== "All Entities" && row.entity !== entityFilter) return false;
    return true;
  });

  const totalFilteredResults = filteredData.length;
  const totalPages = Math.max(1, Math.ceil(totalFilteredResults / rowsPerPage));
  const paginatedData = filteredData.slice((currentPage - 1) * rowsPerPage, currentPage * rowsPerPage);

  const handleLogoutClick = () => setShowLogoutModal(true);
  const handleCloseLogoutModal = () => setShowLogoutModal(false);
  const handleConfirmLogout = () => {
    localStorage.removeItem("authToken");
    sessionStorage.clear();
    setShowLogoutModal(false);
    navigate("/auth/login");
  };

  const getStatusClass = (status) => {
    switch (status) {
      case "Success": return "at-status-success";
      case "Warning": return "at-status-warning";
      case "Failed": return "at-status-failed";
      default: return "";
    }
  };

  return (
    <div className={`financial-core-page ${isDarkMode ? 'dark-mode' : ''}`}>
      <FinancialSidebar onLogout={handleLogoutClick} isDarkMode={isDarkMode} activePage="reports" />
      <div className="financial-core-main">
        <Header isDarkMode={isDarkMode} toggleTheme={() => setIsDarkMode((p) => !p)} />
        <main className="financial-core-content">
          <div className="at-container">
            {/* Page Header */}
            <div className="at-page-header">
              <div className="at-page-header-left">
                <h1>Audit Trail</h1>
                <p>Detailed log of all system activities and changes for compliance.</p>
              </div>
              <div className="at-page-header-right">
                <button className="at-btn-outline">
                  <FiCalendar size={14} />
                  Mar 2026
                </button>
                <button className="at-btn-primary">
                  <FiDownload size={14} />
                  Export All
                </button>
              </div>
            </div>

            {/* Summary Cards */}
            <div className="at-summary-cards">
              <div className="at-summary-card">
                <div className="at-summary-card-header">
                  <span className="at-summary-label">Total Events</span>
                  <span className="at-summary-icon at-icon-blue">
                    <FiTrendingUp size={16} />
                  </span>
                </div>
                <div className="at-summary-value">2,847</div>
                <div className="at-summary-sub">This month</div>
              </div>
              <div className="at-summary-card">
                <div className="at-summary-card-header">
                  <span className="at-summary-label">Compliance Score</span>
                  <span className="at-summary-icon at-icon-purple">
                    <FiShield size={16} />
                  </span>
                </div>
                <div className="at-summary-value">98.5%</div>
                <div className="at-summary-sub-green">Excellent</div>
              </div>
              <div className="at-summary-card">
                <div className="at-summary-card-header">
                  <span className="at-summary-label">Active Users</span>
                  <span className="at-summary-icon at-icon-green">
                    <FiUsers size={16} />
                  </span>
                </div>
                <div className="at-summary-value">12</div>
                <div className="at-summary-sub">Made changes today</div>
              </div>
              <div className="at-summary-card">
                <div className="at-summary-card-header">
                  <span className="at-summary-label">Failed Actions</span>
                  <span className="at-summary-icon at-icon-red">
                    <FiAlertCircle size={16} />
                  </span>
                </div>
                <div className="at-summary-value">3</div>
                <div className="at-summary-sub-red">Needs review</div>
              </div>
            </div>

            {/* Table Card */}
            <div className="at-table-wrapper">
              {/* Search and Filters */}
              <div className="at-filters-bar">
                <div className="at-search-box">
                  <FiSearch size={16} className="at-search-icon" />
                  <input
                    type="text"
                    placeholder="Search Transaction"
                    value={searchQuery}
                    onChange={(e) => { setSearchQuery(e.target.value); setCurrentPage(1); }}
                    className="at-search-input"
                  />
                </div>
                <div className="at-filter-group">
                  <div className="at-filter-dropdown">
                    <select value={userFilter} onChange={(e) => { setUserFilter(e.target.value); setCurrentPage(1); }}>
                      <option>All Users</option>
                      <option>Sarah Johnson</option>
                    </select>
                  </div>
                  <div className="at-filter-dropdown">
                    <select value={actionFilter} onChange={(e) => { setActionFilter(e.target.value); setCurrentPage(1); }}>
                      <option>All Actions</option>
                      <option>Created</option>
                      <option>Updated</option>
                      <option>Deleted</option>
                      <option>Approved</option>
                      <option>Auto-sync</option>
                      <option>Failed Login</option>
                    </select>
                  </div>
                  <div className="at-filter-dropdown">
                    <select value={entityFilter} onChange={(e) => { setEntityFilter(e.target.value); setCurrentPage(1); }}>
                      <option>All Entities</option>
                      <option>Invoice</option>
                      <option>Bill</option>
                      <option>Payment</option>
                      <option>Expense</option>
                      <option>Bank Account</option>
                      <option>User Session</option>
                    </select>
                  </div>
                </div>
              </div>

              <div className="at-table-container">
                <table className="at-table">
                  <thead>
                    <tr>
                      <th>TIMESTAMP</th>
                      <th>USER</th>
                      <th>ACTION</th>
                      <th>ENTITY</th>
                      <th>CHANGES</th>
                      <th>IP ADDRESS</th>
                      <th>STATUS</th>
                      <th>ACTION</th>
                    </tr>
                  </thead>
                  <tbody>
                    {paginatedData.map((row, idx) => (
                      <tr key={idx}>
                        <td className="at-timestamp">
                          {row.timestamp.split("\n").map((line, i) => (
                            <React.Fragment key={i}>
                              {i > 0 && <br />}
                              {line}
                            </React.Fragment>
                          ))}
                        </td>
                        <td>
                          <div className="at-user-cell">
                            <div className="at-user-avatar">{row.initials}</div>
                            <span>{row.user}</span>
                          </div>
                        </td>
                        <td className="at-action-cell">{row.action}</td>
                        <td>
                          <div className="at-entity-cell">
                            <span className="at-entity-name">{row.entity}</span>
                            <span className="at-entity-id">{row.entityId}</span>
                          </div>
                        </td>
                        <td className="at-changes-cell">{row.changes}</td>
                        <td className="at-ip-cell">{row.ip}</td>
                        <td>
                          <span className={`at-status-badge ${getStatusClass(row.status)}`}>
                            {row.status}
                          </span>
                        </td>
                        <td>
                          <button className="at-view-btn" title="View details">
                            <FiEye size={16} />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* Pagination */}
              <div className="at-pagination">
                <div className="at-pagination-info">
                  Showing
                  <select
                    className="at-rows-select"
                    value={rowsPerPage}
                    onChange={(e) => { setRowsPerPage(Number(e.target.value)); setCurrentPage(1); }}
                  >
                    <option value={6}>06</option>
                    <option value={10}>10</option>
                    <option value={20}>20</option>
                  </select>
                  / {totalFilteredResults} Results
                </div>
                <div className="at-pagination-controls">
                  <button
                    className="at-page-btn"
                    disabled={currentPage === 1}
                    onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                  >
                    <FiChevronLeft size={16} />
                  </button>
                  {[1, 2, 3].map((p) => (
                    <button
                      key={p}
                      className={`at-page-btn ${currentPage === p ? "active" : ""}`}
                      onClick={() => setCurrentPage(p)}
                    >
                      {p}
                    </button>
                  ))}
                  <span className="at-page-ellipsis">...</span>
                  <button
                    className={`at-page-btn ${currentPage === totalPages ? "active" : ""}`}
                    onClick={() => setCurrentPage(totalPages)}
                  >
                    {totalPages}
                  </button>
                  <button
                    className="at-page-btn"
                    disabled={currentPage === totalPages}
                    onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
                  >
                    <FiChevronRight size={16} />
                  </button>
                </div>
              </div>

              {/* Footer Disclaimer */}
              <div className="at-disclaimer">
                Market data is updated in real-time. Prices are for reference only and may vary across exchanges.
              </div>
            </div>
          </div>
        </main>
      </div>
      {showLogoutModal && (
        <LogoutConfirmModal onClose={handleCloseLogoutModal} onConfirm={handleConfirmLogout} />
      )}
    </div>
  );
}
