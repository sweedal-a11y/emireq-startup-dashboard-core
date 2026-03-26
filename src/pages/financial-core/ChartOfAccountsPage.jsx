import React, { useState } from "react";
import FinancialSidebar from "../../components/financial-sidebar/FinancialSidebar";
import Header from "./Header";
import LogoutConfirmModal from "../../components/logout-modal/LogoutConfirmModal";
import { useNavigate } from "react-router-dom";
import {
  FiSearch, FiPlus, FiDownload, FiEdit2, FiTrash2,
  FiX, FiLayers, FiTrendingUp, FiAlertCircle, FiDollarSign, FiSave
} from "react-icons/fi";
import "./ChartOfAccountsPage.css";

const INITIAL_ACCOUNTS = [
  { code: "1000", name: "Cash", type: "Asset", category: "Current Assets", balance: 1248750, status: "Active", parent: null, transactions: 124, lastActivity: "2026-03-01", description: "" },
  { code: "1100", name: "Petty Cash", type: "Asset", category: "Current Assets", balance: 5000, status: "Active", parent: "1000", transactions: 18, lastActivity: "2026-02-28", description: "" },
  { code: "1200", name: "Accounts Receivable", type: "Asset", category: "Current Assets", balance: 485000, status: "Active", parent: null, transactions: 87, lastActivity: "2026-03-01", description: "" },
  { code: "1300", name: "Inventory", type: "Asset", category: "Current Assets", balance: 325000, status: "Active", parent: null, transactions: 45, lastActivity: "2026-02-15", description: "" },
  { code: "1500", name: "Equipment", type: "Asset", category: "Fixed Assets", balance: 850000, status: "Active", parent: null, transactions: 12, lastActivity: "2026-01-20", description: "" },
  { code: "2000", name: "Accounts Payable", type: "Liability", category: "Current Liabilities", balance: 285000, status: "Active", parent: null, transactions: 65, lastActivity: "2026-03-01", description: "" },
  { code: "2500", name: "Long-term Debt", type: "Liability", category: "Long-term Liabilities", balance: 650000, status: "Active", parent: null, transactions: 8, lastActivity: "2026-02-01", description: "" },
  { code: "3000", name: "Common Stock", type: "Equity", category: "Equity", balance: 500000, status: "Active", parent: null, transactions: 3, lastActivity: "2025-12-31", description: "" },
  { code: "4000", name: "Sales Revenue", type: "Revenue", category: "Operating Revenue", balance: 705000, status: "Active", parent: null, transactions: 156, lastActivity: "2026-03-01", description: "" },
  { code: "5000", name: "Cost of Goods Sold", type: "Expense", category: "Direct Costs", balance: 331500, status: "Active", parent: null, transactions: 92, lastActivity: "2026-03-01", description: "" },
  { code: "6000", name: "Salaries & Wages", type: "Expense", category: "Operating Expenses", balance: 185000, status: "Active", parent: null, transactions: 36, lastActivity: "2026-02-28", description: "" },
  { code: "6100", name: "Marketing Expenses", type: "Expense", category: "Operating Expenses", balance: 45000, status: "Active", parent: null, transactions: 22, lastActivity: "2026-02-20", description: "" },
];

const formatCurrency = (val) => "$" + val.toLocaleString("en-US");

export default function ChartOfAccountsPage() {
  const navigate = useNavigate();
  const [showLogoutModal, setShowLogoutModal] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [accounts, setAccounts] = useState(INITIAL_ACCOUNTS);
  const [searchTerm, setSearchTerm] = useState("");
  const [typeFilter, setTypeFilter] = useState("All Types");
  const [statusFilter, setStatusFilter] = useState("All Status");
  const [panelMode, setPanelMode] = useState(null);
  const [selectedAccount, setSelectedAccount] = useState(null);
  const [editForm, setEditForm] = useState({});

  const handleLogoutClick = () => setShowLogoutModal(true);
  const handleCloseLogoutModal = () => setShowLogoutModal(false);
  const handleConfirmLogout = () => {
    localStorage.removeItem("authToken");
    sessionStorage.clear();
    setShowLogoutModal(false);
    navigate("/auth/login");
  };

  const filteredData = accounts.filter((acc) => {
    const matchSearch = acc.name.toLowerCase().includes(searchTerm.toLowerCase()) || acc.code.includes(searchTerm);
    const matchType = typeFilter === "All Types" || acc.type === typeFilter;
    const matchStatus = statusFilter === "All Status" || acc.status === statusFilter;
    return matchSearch && matchType && matchStatus;
  });

  const openViewPanel = (account) => {
    setSelectedAccount(account);
    setPanelMode("view");
  };

  const openEditPanel = (account) => {
    setSelectedAccount(account);
    setEditForm({
      code: account.code,
      name: account.name,
      type: account.type,
      category: account.category,
      balance: account.balance,
      parent: account.parent || "None",
      description: account.description || "",
    });
    setPanelMode("edit");
  };

  const handleSave = () => {
    setAccounts((prev) =>
      prev.map((acc) =>
        acc.code === selectedAccount.code
          ? {
              ...acc,
              code: editForm.code,
              name: editForm.name,
              type: editForm.type,
              category: editForm.category,
              balance: Number(editForm.balance) || acc.balance,
              parent: editForm.parent === "None" ? null : editForm.parent,
              description: editForm.description,
            }
          : acc
      )
    );
    closePanel();
  };

  const handleDelete = (code) => {
    setAccounts((prev) => prev.filter((acc) => acc.code !== code));
  };

  const closePanel = () => {
    setPanelMode(null);
    setSelectedAccount(null);
    setEditForm({});
  };

  const handleEditChange = (field, value) => {
    setEditForm((prev) => ({ ...prev, [field]: value }));
  };

  const typeClass = (type) => type.toLowerCase();

  // Summary stats
  const totalAccounts = accounts.length;
  const assetAccounts = accounts.filter((a) => a.type === "Asset");
  const liabilityAccounts = accounts.filter((a) => a.type === "Liability");
  const revenueAccounts = accounts.filter((a) => a.type === "Revenue");
  const assetTotal = assetAccounts.reduce((s, a) => s + a.balance, 0);
  const liabilityTotal = liabilityAccounts.reduce((s, a) => s + a.balance, 0);
  const revenueTotal = revenueAccounts.reduce((s, a) => s + a.balance, 0);

  const formatShort = (val) => {
    if (val >= 1000000) return "$" + (val / 1000000).toFixed(2) + "M";
    if (val >= 1000) return "$" + Math.round(val / 1000) + "K";
    return "$" + val;
  };

  return (
    <div className={`financial-core-page ${isDarkMode ? "dark-mode" : ""}`}>
      <FinancialSidebar onLogout={handleLogoutClick} isDarkMode={isDarkMode} activePage="setup" />
      <div className="financial-core-main">
        <Header isDarkMode={isDarkMode} toggleTheme={() => setIsDarkMode((p) => !p)} />
        <main className="financial-core-content">
          <div className="coa-container">
            {/* Page Header */}
            <div className="coa-page-header">
              <div className="coa-page-header-left">
                <h1>Chart of Accounts</h1>
                <p>Structure your financial ledger with codes and categories.</p>
              </div>
              <div className="coa-page-header-right">
                <button className="coa-btn-import">
                  <FiDownload size={14} />
                  Import
                </button>
                <button className="coa-btn-add">
                  <FiPlus size={14} />
                  Add Accounts
                </button>
              </div>
            </div>

            {/* Summary Cards */}
            <div className="coa-summary-cards">
              <div className="coa-summary-card">
                <div className="coa-summary-card-top">
                  <span className="coa-summary-card-title">Total Accounts</span>
                  <div className="coa-summary-card-icon blue"><FiLayers size={16} /></div>
                </div>
                <div className="coa-summary-card-number">{totalAccounts}</div>
                <p className="coa-summary-card-sub">All accounts</p>
              </div>
              <div className="coa-summary-card">
                <div className="coa-summary-card-top">
                  <span className="coa-summary-card-title">Asset Accounts</span>
                  <div className="coa-summary-card-icon green"><FiTrendingUp size={16} /></div>
                </div>
                <div className="coa-summary-card-number">{assetAccounts.length}</div>
                <p className="coa-summary-card-sub green">{formatShort(assetTotal)} total</p>
              </div>
              <div className="coa-summary-card">
                <div className="coa-summary-card-top">
                  <span className="coa-summary-card-title">Liability Accounts</span>
                  <div className="coa-summary-card-icon red"><FiAlertCircle size={16} /></div>
                </div>
                <div className="coa-summary-card-number">{liabilityAccounts.length}</div>
                <p className="coa-summary-card-sub red">{formatShort(liabilityTotal)} total</p>
              </div>
              <div className="coa-summary-card">
                <div className="coa-summary-card-top">
                  <span className="coa-summary-card-title">Revenue Accounts</span>
                  <div className="coa-summary-card-icon emerald"><FiDollarSign size={16} /></div>
                </div>
                <div className="coa-summary-card-number">{revenueAccounts.length}</div>
                <p className="coa-summary-card-sub">{formatShort(revenueTotal)} this month</p>
              </div>
            </div>

            {/* Table */}
            <div className="coa-table-wrapper">
              <div className="coa-table-filters">
                <div className="coa-search-box">
                  <FiSearch size={15} color="#9ca3af" />
                  <input
                    type="text"
                    placeholder="Search accounts by name or code..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>
                <div className="coa-filter-group">
                  <select className="coa-filter-select" value={typeFilter} onChange={(e) => setTypeFilter(e.target.value)}>
                    <option>All Types</option>
                    <option>Asset</option>
                    <option>Liability</option>
                    <option>Equity</option>
                    <option>Revenue</option>
                    <option>Expense</option>
                  </select>
                  <select className="coa-filter-select" value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)}>
                    <option>All Status</option>
                    <option>Active</option>
                    <option>Inactive</option>
                  </select>
                </div>
              </div>

              <div className="coa-table-border">
              <table className="coa-table">
                <thead>
                  <tr>
                    <th>Code</th>
                    <th>Account Name</th>
                    <th>Type</th>
                    <th>Category</th>
                    <th>Balance</th>
                    <th>Status</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredData.map((acc) => (
                    <tr key={acc.code}>
                      <td><span className="coa-code">{acc.code}</span></td>
                      <td>
                        <span className="coa-account-name">{acc.name}</span>
                        {acc.parent && <span className="coa-parent-ref">&gt; Parent: {acc.parent}</span>}
                      </td>
                      <td><span className={`coa-type-badge ${typeClass(acc.type)}`}>{acc.type}</span></td>
                      <td>{acc.category}</td>
                      <td><span className="coa-balance">{formatCurrency(acc.balance)}</span></td>
                      <td><span className={`coa-status ${acc.status.toLowerCase()}`}>{acc.status}</span></td>
                      <td>
                        <div className="coa-actions">
                          <button className="coa-action-btn" title="View" onClick={() => openViewPanel(acc)}><FiEdit2 size={14} /></button>
                          <button className="coa-action-btn delete" title="Delete" onClick={() => handleDelete(acc.code)}><FiTrash2 size={14} /></button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
              </div>

              <div className="coa-footer">
                Market data is updated in real-time. Prices are for reference only and may vary across exchanges.
              </div>
            </div>
          </div>
        </main>
      </div>

      {/* View Panel */}
      {panelMode === "view" && selectedAccount && (
        <div className="coa-panel-overlay" onClick={closePanel}>
          <div className="coa-side-panel" onClick={(e) => e.stopPropagation()}>
            <div className="coa-panel-header">
              <div className="coa-panel-header-left">
                <h2>Account Details</h2>
                <p>Update account information</p>
              </div>
              <button className="coa-panel-close" onClick={closePanel}><FiX size={18} /></button>
            </div>
            <div className="coa-panel-body">
              {/* Core Information */}
              <div className="coa-panel-section-header">
                <span className="coa-panel-section-label teal">Core Information</span>
                <button className="coa-panel-edit-btn" onClick={() => openEditPanel(selectedAccount)} title="Edit">
                  <FiEdit2 size={13} />
                </button>
              </div>
              <div className="coa-view-grid">
                <div className="coa-view-cell">
                  <div className="coa-view-cell-label">Name</div>
                  <div className="coa-view-cell-value">{selectedAccount.name.toUpperCase()}</div>
                </div>
                <div className="coa-view-cell">
                  <div className="coa-view-cell-label">Type</div>
                  <div className="coa-view-cell-value">{selectedAccount.type.toUpperCase()}</div>
                </div>
                <div className="coa-view-cell">
                  <div className="coa-view-cell-label">Account Code</div>
                  <div className="coa-view-cell-value">{selectedAccount.code}</div>
                </div>
                <div className="coa-view-cell">
                  <div className="coa-view-cell-label">Status</div>
                  <div className="coa-view-cell-value active-status">{selectedAccount.status}</div>
                </div>
                <div className="coa-view-cell">
                  <div className="coa-view-cell-label">Account Code</div>
                  <div className="coa-view-cell-value">{selectedAccount.code}</div>
                </div>
                <div className="coa-view-cell">
                  <div className="coa-view-cell-label">Category</div>
                  <div className="coa-view-cell-value">{selectedAccount.category.toUpperCase()}</div>
                </div>
              </div>

              {/* Financial Overview */}
              <div className="coa-panel-section-header">
                <span className="coa-panel-section-label teal">Financial Overview</span>
              </div>
              <div className="coa-finance-card">
                <div className="coa-finance-balance-label">Current Balance</div>
                <div className="coa-finance-balance-value">{formatCurrency(selectedAccount.balance)}.00</div>
                <div className="coa-finance-row">
                  <div>
                    <div className="coa-finance-item-label">Transactions</div>
                    <div className="coa-finance-item-value">{selectedAccount.transactions}</div>
                  </div>
                  <div>
                    <div className="coa-finance-item-label">Last Activity</div>
                    <div className="coa-finance-item-value">{selectedAccount.lastActivity}</div>
                  </div>
                </div>
              </div>

              {/* Parent Account */}
              <div className="coa-panel-field">
                <div className="coa-panel-field-label">Parent Account</div>
                <input className="coa-panel-field-input" type="text" value={selectedAccount.parent || "None"} readOnly />
              </div>

              {/* Description */}
              <div className="coa-panel-field">
                <div className="coa-panel-field-label">Description</div>
                <textarea className="coa-panel-field-textarea" placeholder="Account description..." readOnly />
              </div>

              <div className="coa-info-bar">
                Account is active and available for transactions
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Edit Panel */}
      {panelMode === "edit" && selectedAccount && (
        <div className="coa-panel-overlay" onClick={closePanel}>
          <div className="coa-side-panel" onClick={(e) => e.stopPropagation()}>
            <div className="coa-panel-header">
              <div className="coa-panel-header-left">
                <h2>Edit Account Details</h2>
                <p>Update account information</p>
              </div>
              <button className="coa-panel-close" onClick={closePanel}><FiX size={18} /></button>
            </div>
            <div className="coa-panel-body">
              {/* Core Information */}
              <div className="coa-panel-section-header">
                <span className="coa-panel-section-label blue">Core Information</span>
              </div>
              <div className="coa-edit-row">
                <div className="coa-edit-group">
                  <label>Account Code</label>
                  <input type="text" value={editForm.code || ""} onChange={(e) => handleEditChange("code", e.target.value)} />
                </div>
                <div className="coa-edit-group">
                  <label>Account Name</label>
                  <input type="text" value={editForm.name || ""} onChange={(e) => handleEditChange("name", e.target.value)} />
                </div>
              </div>
              <div className="coa-edit-row">
                <div className="coa-edit-group">
                  <label>Account Type</label>
                  <select value={editForm.type || ""} onChange={(e) => handleEditChange("type", e.target.value)}>
                    <option>Asset</option>
                    <option>Liability</option>
                    <option>Equity</option>
                    <option>Revenue</option>
                    <option>Expense</option>
                  </select>
                </div>
                <div className="coa-edit-group">
                  <label>Category</label>
                  <input type="text" value={editForm.category || ""} onChange={(e) => handleEditChange("category", e.target.value)} />
                </div>
              </div>
              <div className="coa-edit-row">
                <div className="coa-edit-group">
                  <label>Current Balance</label>
                  <div className="coa-dollar-input">
                    <span className="coa-dollar-prefix">$</span>
                    <input type="text" value={editForm.balance || ""} onChange={(e) => handleEditChange("balance", e.target.value)} />
                  </div>
                </div>
                <div className="coa-edit-group">
                  <label>Parent Account</label>
                  <input type="text" value={editForm.parent || ""} onChange={(e) => handleEditChange("parent", e.target.value)} />
                </div>
              </div>

              {/* Description */}
              <div className="coa-panel-field">
                <div className="coa-panel-field-label">Description</div>
                <textarea
                  className="coa-panel-field-textarea"
                  placeholder="Account description..."
                  value={editForm.description || ""}
                  onChange={(e) => handleEditChange("description", e.target.value)}
                />
              </div>

              <div className="coa-info-bar">
                Account is active and available for transactions
              </div>
            </div>
            <div className="coa-panel-actions">
              <button className="coa-panel-btn-cancel" onClick={closePanel}>Cancel</button>
              <button className="coa-panel-btn-save" onClick={handleSave}>
                <FiSave size={14} />
                Save Changes
              </button>
            </div>
          </div>
        </div>
      )}

      {showLogoutModal && (
        <LogoutConfirmModal onClose={handleCloseLogoutModal} onConfirm={handleConfirmLogout} />
      )}
    </div>
  );
}
