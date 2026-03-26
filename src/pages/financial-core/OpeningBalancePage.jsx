import React, { useState } from "react";
import FinancialSidebar from "../../components/financial-sidebar/FinancialSidebar";
import Header from "./Header";
import LogoutConfirmModal from "../../components/logout-modal/LogoutConfirmModal";
import { useNavigate } from "react-router-dom";
import {
  FiPlus, FiSearch, FiCheckCircle,
  FiTrendingUp, FiDollarSign, FiAlertCircle, FiCalendar
} from "react-icons/fi";

const InfoIcon = ({ size = 16, className }) => (
  <svg width={size} height={size} viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
    <circle cx="7.91351" cy="7.91351" r="7.91351" fill="#AFAFAF" />
    <path fillRule="evenodd" clipRule="evenodd" d="M9.20402 5.18554C9.32767 4.96915 9.39722 4.71799 9.39722 4.45137C9.39722 3.6322 8.73261 2.96759 7.91344 2.96759C7.09426 2.96759 6.42965 3.6322 6.42965 4.45137C6.42965 5.27055 7.09426 5.93516 7.91344 5.93516C8.46599 5.93516 8.94899 5.63376 9.20402 5.18554ZM6.92425 6.92435H7.41884H8.40803C8.95479 6.92435 9.39722 7.36678 9.39722 7.91354V8.90273V12.8595C9.39722 13.4062 8.95479 13.8487 8.40803 13.8487C7.86127 13.8487 7.41884 13.4062 7.41884 12.8595V9.64462C7.41884 9.23503 7.08654 8.90273 6.67695 8.90273C6.26736 8.90273 5.93506 8.57042 5.93506 8.16083V7.91354C5.93506 7.56577 6.11474 7.25858 6.38522 7.08277C6.53978 6.98231 6.72525 6.92435 6.92425 6.92435Z" fill="white" />
  </svg>
);
import "./OpeningBalancePage.css";

const INITIAL_ACCOUNTS = [
  { id: 1, code: "1000", name: "Cash", type: "Asset", amount: 1200000, dc: "D", effectiveDate: "2026-01-01", status: "pending" },
  { id: 2, code: "1200", name: "Accounts Receivable", type: "Asset", amount: 450000, dc: "D", effectiveDate: "2026-01-01", status: "reviewed" },
  { id: 3, code: "1300", name: "Inventory", type: "Asset", amount: 300000, dc: "D", effectiveDate: "2026-01-01", status: "pending" },
  { id: 4, code: "2000", name: "Accounts Payable", type: "Liability", amount: 250000, dc: "C", effectiveDate: "2026-01-01", status: "pending" },
  { id: 5, code: "2500", name: "Long-term Debt", type: "Liability", amount: 600000, dc: "C", effectiveDate: "2026-01-01", status: "pending" },
  { id: 6, code: "3000", name: "Common Stock", type: "Equity", amount: 500000, dc: "C", effectiveDate: "2026-01-01", status: "pending" },
];

const fmt = (n) => "$" + n.toLocaleString("en-US");

export default function OpeningBalancePage() {
  const navigate = useNavigate();
  const [showLogoutModal, setShowLogoutModal] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [accounts, setAccounts] = useState(INITIAL_ACCOUNTS);
  const [searchTerm, setSearchTerm] = useState("");
  const [typeFilter, setTypeFilter] = useState("All Types");

  const handleLogoutClick = () => setShowLogoutModal(true);
  const handleCloseLogoutModal = () => setShowLogoutModal(false);
  const handleConfirmLogout = () => {
    localStorage.removeItem("authToken");
    sessionStorage.clear();
    setShowLogoutModal(false);
    navigate("/auth/login");
  };

  const toggleDC = (id) => {
    setAccounts((prev) => prev.map((a) => a.id === id ? { ...a, dc: a.dc === "D" ? "C" : "D" } : a));
  };

  const toggleStatus = (id) => {
    setAccounts((prev) => prev.map((a) => a.id === id ? { ...a, status: a.status === "reviewed" ? "pending" : "reviewed" } : a));
  };

  const filtered = accounts.filter((a) => {
    const s = searchTerm.toLowerCase();
    const matchSearch = a.name.toLowerCase().includes(s) || a.code.includes(s);
    const matchType = typeFilter === "All Types" || a.type === typeFilter;
    return matchSearch && matchType;
  });

  const totalDebits = accounts.filter((a) => a.dc === "D").reduce((s, a) => s + a.amount, 0);
  const totalCredits = accounts.filter((a) => a.dc === "C").reduce((s, a) => s + a.amount, 0);
  const difference = Math.abs(totalDebits - totalCredits);
  const isBalanced = totalDebits === totalCredits;
  const debitAccounts = accounts.filter((a) => a.dc === "D").length;
  const creditAccounts = accounts.filter((a) => a.dc === "C").length;

  return (
    <div className={`financial-core-page ${isDarkMode ? "dark-mode" : ""}`}>
      <FinancialSidebar onLogout={handleLogoutClick} isDarkMode={isDarkMode} activePage="setup" />
      <div className="financial-core-main">
        <Header isDarkMode={isDarkMode} toggleTheme={() => setIsDarkMode((p) => !p)} />
        <main className="financial-core-content">
          <div className="ob-container">
            {/* Page Header */}
            <div className="ob-page-header">
              <div className="ob-page-header-left">
                <h1>Opening Balance</h1>
                <p>Structure your financial ledger with codes and categories.</p>
              </div>
              <div className="ob-page-header-right">
                <button className="ob-btn-add"><FiPlus size={14} /> Add Tax Rate</button>
              </div>
            </div>

            {/* Summary Cards */}
            <div className="ob-summary-cards">
              <div className="ob-summary-card">
                <div className="ob-card-top">
                  <span className="ob-card-label">Total Debits</span>
                  <div className="ob-card-icon blue"><FiTrendingUp size={16} /></div>
                </div>
                <div className="ob-card-value">{fmt(totalDebits)}</div>
                <p className="ob-card-sub">{debitAccounts} accounts</p>
              </div>
              <div className="ob-summary-card">
                <div className="ob-card-top">
                  <span className="ob-card-label">Total Credits</span>
                  <div className="ob-card-icon yellow"><FiDollarSign size={16} /></div>
                </div>
                <div className="ob-card-value">{fmt(totalCredits)}</div>
                <p className="ob-card-sub">{creditAccounts} accounts</p>
              </div>
              <div className="ob-summary-card">
                <div className="ob-card-top">
                  <span className="ob-card-label">Balance Status</span>
                  <div className={`ob-card-icon ${isBalanced ? "green" : "red"}`}>{isBalanced ? <FiCheckCircle size={16} /> : <FiAlertCircle size={16} />}</div>
                </div>
                <div className={`ob-card-value ${isBalanced ? "green" : "red"}`}>{isBalanced ? "Balanced" : "Unbalanced"}</div>
                <p className="ob-card-sub">{isBalanced ? "All balanced" : `Difference: ${fmt(difference)}`}</p>
              </div>
              <div className="ob-summary-card">
                <div className="ob-card-top">
                  <span className="ob-card-label">Effective Date</span>
                  <div className="ob-card-icon green"><FiCalendar size={16} /></div>
                </div>
                <div className="ob-card-value">Jan 1</div>
                <p className="ob-card-sub">2026</p>
              </div>
            </div>

            {/* Balance Reconciliation */}
            <div className="ob-recon-wrapper">
              <div className="ob-recon-header">
                <div className="ob-recon-header-left">
                  <h2>Balance Reconciliation <InfoIcon size={16} className="ob-info-icon" /></h2>
                  <p>Ensure total debits equal total credits before locking.</p>
                </div>
                <div className="ob-recon-header-right">
                  <div className="ob-recon-total">
                    <span className="ob-recon-total-label">Total Debits</span>
                    <span className="ob-recon-total-value">{fmt(totalDebits)}</span>
                  </div>
                  <div className="ob-recon-total">
                    <span className="ob-recon-total-label">Total Credits</span>
                    <span className="ob-recon-total-value">{fmt(totalCredits)}</span>
                  </div>
                </div>
              </div>

              {/* Filters */}
              <div className="ob-filters">
                <div className="ob-search-box">
                  <FiSearch size={14} color="#9ca3af" />
                  <input type="text" placeholder="Search Transaction" value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} />
                </div>
                <select className="ob-filter-select" value={typeFilter} onChange={(e) => setTypeFilter(e.target.value)}>
                  <option>All Types</option>
                  <option>Asset</option>
                  <option>Liability</option>
                  <option>Equity</option>
                </select>
              </div>

              {/* Table */}
              <div className="ob-table-border">
                <table className="ob-table">
                  <thead>
                    <tr>
                      <th>Account Code</th>
                      <th>Account Name</th>
                      <th>Type</th>
                      <th>Opening Balance Configuration</th>
                      <th>Effective Date</th>
                      <th>Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filtered.map((a) => (
                      <tr key={a.id}>
                        <td className="ob-code">{a.code}</td>
                        <td>{a.name}</td>
                        <td><span className={`ob-type-badge ${a.type.toLowerCase()}`}>{a.type}</span></td>
                        <td>
                          <div className="ob-balance-config">
                            <span className="ob-amount">{fmt(a.amount)}</span>
                            <button className={`ob-dc-btn ${a.dc === "D" ? "active" : ""}`} onClick={() => { if (a.dc !== "D") toggleDC(a.id); }}>D</button>
                            <button className={`ob-dc-btn ${a.dc === "C" ? "active" : ""}`} onClick={() => { if (a.dc !== "C") toggleDC(a.id); }}>C</button>
                          </div>
                        </td>
                        <td>{a.effectiveDate}</td>
                        <td>
                          {a.status === "reviewed" ? (
                            <span className="ob-status-reviewed" onClick={() => toggleStatus(a.id)}><FiCheckCircle size={13} /> Reviewed</span>
                          ) : (
                            <span className="ob-status-pending" onClick={() => toggleStatus(a.id)}>Make Review</span>
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* Warning Banner */}
              {!isBalanced && (
                <div className="ob-warning-banner">
                  <div className="ob-warning-left"><FiAlertCircle size={15} /> <strong>UNBALANCED - NEEDS REVIEW</strong></div>
                  <div className="ob-warning-right">Difference: {fmt(difference)}</div>
                </div>
              )}

              <div className="ob-footer">
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
