import React, { useState } from "react";
import FinancialSidebar from "../../components/financial-sidebar/FinancialSidebar";
import Header from "./Header";
import LogoutConfirmModal from "../../components/logout-modal/LogoutConfirmModal";
import { useNavigate } from "react-router-dom";
import {
  FiPlus, FiEdit2, FiTrash2, FiCopy,
  FiUsers, FiShield, FiCheckCircle, FiLock
} from "react-icons/fi";
import "./RolesPermissionsPage.css";

const INITIAL_ROLES = [
  { id: 1, name: "Administrator", code: "ROLE-01", users: 2, permission: "Full Access", permType: "full", status: "ACTIVE" },
  { id: 2, name: "Finance Manager", code: "ROLE-02", users: 3, permission: "Read/Write", permType: "readwrite", status: "ACTIVE" },
  { id: 3, name: "Accountant", code: "ROLE-03", users: 5, permission: "Limited Write", permType: "limited", status: "ACTIVE" },
  { id: 4, name: "Auditor", code: "ROLE-04", users: 1, permission: "Read Only", permType: "read", status: "ACTIVE" },
  { id: 5, name: "Expense Reviewer", code: "ROLE-05", users: 4, permission: "Custom", permType: "custom", status: "ACTIVE" },
  { id: 6, name: "External Consultant", code: "ROLE-06", users: 0, permission: "Read Only", permType: "read", status: "INACTIVE" },
];

export default function RolesPermissionsPage() {
  const navigate = useNavigate();
  const [showLogoutModal, setShowLogoutModal] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [roles, setRoles] = useState(INITIAL_ROLES);
  const [typeFilter, setTypeFilter] = useState("All Types");

  const handleLogoutClick = () => setShowLogoutModal(true);
  const handleCloseLogoutModal = () => setShowLogoutModal(false);
  const handleConfirmLogout = () => {
    localStorage.removeItem("authToken");
    sessionStorage.clear();
    setShowLogoutModal(false);
    navigate("/auth/login");
  };

  const handleDelete = (id) => {
    setRoles((prev) => prev.filter((r) => r.id !== id));
  };

  const filtered = roles.filter((r) => {
    if (typeFilter === "All Types") return true;
    return r.permType === typeFilter;
  });

  const totalUsers = roles.reduce((s, r) => s + r.users, 0);
  const activeRoles = roles.filter((r) => r.status === "ACTIVE").length;
  const fullAccessRoles = roles.filter((r) => r.permType === "full").length;

  return (
    <div className={`financial-core-page ${isDarkMode ? "dark-mode" : ""}`}>
      <FinancialSidebar onLogout={handleLogoutClick} isDarkMode={isDarkMode} activePage="setup" />
      <div className="financial-core-main">
        <Header isDarkMode={isDarkMode} toggleTheme={() => setIsDarkMode((p) => !p)} />
        <main className="financial-core-content">
          <div className="rp-container">
            {/* Page Header */}
            <div className="rp-page-header">
              <div className="rp-page-header-left">
                <h1>Roles & Permissions</h1>
                <p>Control access levels and security protocols for your team.</p>
              </div>
              <div className="rp-page-header-right">
                <button className="rp-btn-add"><FiPlus size={14} /> Add Tax Rate</button>
              </div>
            </div>

            {/* Summary Cards */}
            <div className="rp-summary-cards">
              <div className="rp-summary-card">
                <div className="rp-card-top">
                  <span className="rp-card-label">Total Roles</span>
                  <div className="rp-card-icon blue"><FiShield size={16} /></div>
                </div>
                <div className="rp-card-value">{roles.length}</div>
                <p className="rp-card-sub">Role definitions</p>
              </div>
              <div className="rp-summary-card">
                <div className="rp-card-top">
                  <span className="rp-card-label">Total Users</span>
                  <div className="rp-card-icon yellow"><FiUsers size={16} /></div>
                </div>
                <div className="rp-card-value">{totalUsers}</div>
                <p className="rp-card-sub orange">Across all roles</p>
              </div>
              <div className="rp-summary-card">
                <div className="rp-card-top">
                  <span className="rp-card-label">Active Roles</span>
                  <div className="rp-card-icon green"><FiCheckCircle size={16} /></div>
                </div>
                <div className="rp-card-value">{activeRoles}</div>
                <p className="rp-card-sub green">In use</p>
              </div>
              <div className="rp-summary-card">
                <div className="rp-card-top">
                  <span className="rp-card-label">Full Access</span>
                  <div className="rp-card-icon orange"><FiLock size={16} /></div>
                </div>
                <div className="rp-card-value">{fullAccessRoles}</div>
                <p className="rp-card-sub orange">Admin roles</p>
              </div>
            </div>

            {/* Table Section */}
            <div className="rp-table-wrapper">
              {/* Toolbar */}
              <div className="rp-toolbar">
                <div className="rp-toolbar-left">
                  <select className="rp-filter-select" value={typeFilter} onChange={(e) => setTypeFilter(e.target.value)}>
                    <option>All Types</option>
                    <option value="full">Full Access</option>
                    <option value="readwrite">Read/Write</option>
                    <option value="limited">Limited Write</option>
                    <option value="read">Read Only</option>
                    <option value="custom">Custom</option>
                  </select>
                </div>
                <div className="rp-toolbar-right">
                  <button className="rp-btn-outline"><FiUsers size={14} /> Manage Users</button>
                  <button className="rp-btn-create"><FiPlus size={14} /> Create Role</button>
                </div>
              </div>

              {/* Table */}
              <div className="rp-table-border">
                <table className="rp-table">
                  <thead>
                    <tr>
                      <th>Role Name</th>
                      <th>Users</th>
                      <th>Permissions</th>
                      <th>Status</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filtered.map((role) => (
                      <tr key={role.id}>
                        <td>
                          <span className="rp-role-name">{role.name}</span>
                          <span className="rp-role-code">{role.code}</span>
                        </td>
                        <td>
                          <div className="rp-users-cell">
                            <FiUsers size={14} className="rp-users-icon" />
                            <span>{role.users}</span>
                          </div>
                        </td>
                        <td><span className={`rp-perm-badge ${role.permType}`}>{role.permission}</span></td>
                        <td><span className={`rp-status ${role.status.toLowerCase()}`}>{role.status}</span></td>
                        <td>
                          <div className="rp-actions">
                            <button className="rp-action-btn" title="Edit"><FiEdit2 size={15} /></button>
                            <button className="rp-action-btn" title="Copy"><FiCopy size={15} /></button>
                            <button className="rp-action-btn delete" title="Delete" onClick={() => handleDelete(role.id)}><FiTrash2 size={15} /></button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* Footer */}
              <div className="rp-footer">
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
