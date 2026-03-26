import React, { useState } from "react";
import FinancialSidebar from "../../components/financial-sidebar/FinancialSidebar";
import Header from "./Header";
import LogoutConfirmModal from "../../components/logout-modal/LogoutConfirmModal";
import { useNavigate } from "react-router-dom";
import { FiArrowUpRight, FiArrowDownRight, FiAlertCircle, FiShare2, FiPrinter, FiDownload, FiCalendar, FiGrid } from "react-icons/fi";
import "./TrialBalancePage.css";

const TRIAL_BALANCE_DATA = [
  { code: "1000", name: "Cash", debit: "$1,248,750", credit: "-" },
  { code: "1200", name: "Accounts Receivable", debit: "$485,000", credit: "-" },
  { code: "1300", name: "Inventory", debit: "$325,000", credit: "-" },
  { code: "1500", name: "Equipment", debit: "$850,000", credit: "-" },
  { code: "1600", name: "Accumulated Depreciation", debit: "-", credit: "$125,000" },
  { code: "2000", name: "Accounts Payable", debit: "-", credit: "$285,000" },
  { code: "2100", name: "Accrued Expenses", debit: "-", credit: "$125,000" },
  { code: "2500", name: "Long-term Debt", debit: "-", credit: "$650,000" },
  { code: "3000", name: "Common Stock", debit: "-", credit: "$500,000" },
  { code: "3200", name: "Retained Earnings", debit: "-", credit: "$1,288,750" },
  { code: "4000", name: "Sales Revenue", debit: "-", credit: "$705,000" },
  { code: "5000", name: "Cost of Goods Sold", debit: "$1,200.00", credit: "-" },
  { code: "6000", name: "Operating Expenses", debit: "$1,200.00", credit: "-" },
];

export default function TrialBalancePage() {
  const navigate = useNavigate();
  const [showLogoutModal, setShowLogoutModal] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);

  const handleLogoutClick = () => setShowLogoutModal(true);
  const handleCloseLogoutModal = () => setShowLogoutModal(false);
  const handleConfirmLogout = () => {
    localStorage.removeItem("authToken");
    sessionStorage.clear();
    setShowLogoutModal(false);
    navigate("/auth/login");
  };

  const totalDebits = "$3,541,750";
  const totalCredits = "$3,678,750";
  const difference = "$137,000";

  return (
    <div className={`financial-core-page ${isDarkMode ? 'dark-mode' : ''}`}>
      <FinancialSidebar onLogout={handleLogoutClick} isDarkMode={isDarkMode} activePage="reports" />
      <div className="financial-core-main">
        <Header isDarkMode={isDarkMode} toggleTheme={() => setIsDarkMode((p) => !p)} />
        <main className="financial-core-content">
          <div className="tb-container">
            {/* Page Header */}
            <div className="tb-page-header">
              <div className="tb-page-header-left">
                <h1>Trial Balance</h1>
                <p>A list of all general ledger accounts and their balances to ensure debits equal credits.</p>
              </div>
              <div className="tb-page-header-right">
                <button className="tb-btn-outline">
                  <FiCalendar size={14} />
                  Mar 2026
                </button>
                <button className="tb-btn-primary">
                  <FiDownload size={14} />
                  Export All
                </button>
              </div>
            </div>

            {/* Summary Cards */}
            <div className="tb-summary-cards">
              <div className="tb-summary-card">
                <div className="tb-summary-card-header">
                  <span className="tb-summary-label">Total Debits</span>
                  <span className="tb-summary-icon tb-icon-blue">
                    <FiArrowUpRight size={16} />
                  </span>
                </div>
                <div className="tb-summary-value">{totalDebits}</div>
                <div className="tb-summary-sub">6 accounts</div>
              </div>
              <div className="tb-summary-card">
                <div className="tb-summary-card-header">
                  <span className="tb-summary-label">Total Credits</span>
                  <span className="tb-summary-icon tb-icon-yellow">
                    <FiArrowDownRight size={16} />
                  </span>
                </div>
                <div className="tb-summary-value">{totalCredits}</div>
                <div className="tb-summary-sub">7 accounts</div>
              </div>
              <div className="tb-summary-card">
                <div className="tb-summary-card-header">
                  <span className="tb-summary-label">Balance Status</span>
                  <span className="tb-summary-icon tb-icon-red">
                    <FiAlertCircle size={16} />
                  </span>
                </div>
                <div className="tb-summary-value tb-value-red">Unbalanced</div>
                <div className="tb-summary-sub">Difference: {difference}</div>
              </div>
              <div className="tb-summary-card">
                <div className="tb-summary-card-header">
                  <span className="tb-summary-label">Total Accounts</span>
                  <span className="tb-summary-icon tb-icon-purple">
                    <FiGrid size={16} />
                  </span>
                </div>
                <div className="tb-summary-value">13</div>
                <div className="tb-summary-sub">In chart of accounts</div>
              </div>
            </div>

            {/* Date & Actions Bar */}
            <div className="tb-actions-bar">
              <div className="tb-date-select">
                <button className="tb-date-btn">
                  <FiCalendar size={14} />
                  Mar 27, 2026
                </button>
              </div>
              <div className="tb-actions-right">
                <button className="tb-action-btn"><FiShare2 size={14} /> Share</button>
                <button className="tb-action-btn"><FiPrinter size={14} /> Print</button>
                <button className="tb-export-btn"><FiDownload size={14} /> Export</button>
              </div>
            </div>

            {/* Table */}
            <div className="tb-table-wrapper">
              <table className="tb-table">
                <thead>
                  <tr>
                    <th>ACCOUNT CODE</th>
                    <th>ACCOUNT NAME</th>
                    <th>DEBIT</th>
                    <th>CREDIT</th>
                  </tr>
                </thead>
                <tbody>
                  {TRIAL_BALANCE_DATA.map((row, idx) => (
                    <tr key={idx}>
                      <td className="tb-code">{row.code}</td>
                      <td className="tb-name">{row.name}</td>
                      <td className={`tb-debit ${row.debit !== "-" ? "tb-has-value" : "tb-dash"}`}>
                        {row.debit !== "-" ? <span className="tb-debit-value">{row.debit}</span> : "-"}
                      </td>
                      <td className={`tb-credit ${row.credit !== "-" ? "tb-has-value" : "tb-dash"}`}>
                        {row.credit !== "-" ? (
                          <span className="tb-credit-value">
                            {row.credit}
                          </span>
                        ) : "-"}
                      </td>
                    </tr>
                  ))}
                </tbody>
                <tfoot>
                  <tr className="tb-totals-row">
                    <td colSpan={2}><strong>TOTALS</strong></td>
                    <td className="tb-total-debit">{totalDebits}</td>
                    <td className="tb-total-credit">{totalCredits}</td>
                  </tr>
                </tfoot>
              </table>

              {/* Unbalanced Warning */}
              <div className="tb-warning-bar">
                <div className="tb-warning-left">
                  <FiAlertCircle size={16} />
                  <span>UNBALANCED – NEEDS REVIEW</span>
                </div>
                <div className="tb-warning-right">
                  Difference: {difference}
                </div>
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
