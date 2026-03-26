import React, { useState } from "react";
import FinancialSidebar from "../../components/financial-sidebar/FinancialSidebar";
import Header from "./Header";
import LogoutConfirmModal from "../../components/logout-modal/LogoutConfirmModal";
import { useNavigate } from "react-router-dom";
import { FiTrendingUp, FiAlertCircle, FiDownload, FiCalendar, FiBarChart2, FiDollarSign } from "react-icons/fi";
import "./BalanceSheetPage.css";

export default function BalanceSheetPage() {
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

  return (
    <div className={`financial-core-page ${isDarkMode ? 'dark-mode' : ''}`}>
      <FinancialSidebar onLogout={handleLogoutClick} isDarkMode={isDarkMode} activePage="reports" />
      <div className="financial-core-main">
        <Header isDarkMode={isDarkMode} toggleTheme={() => setIsDarkMode((p) => !p)} />
        <main className="financial-core-content">
          <div className="bs-container">
            {/* Page Header */}
            <div className="bs-page-header">
              <div className="bs-page-header-left">
                <h1>Balance Sheet</h1>
                <p>A snapshot of your company's financial position at a specific point in time.</p>
              </div>
              <div className="bs-page-header-right">
                <button className="bs-btn-outline">
                  <FiCalendar size={14} />
                  Mar 2026
                </button>
                <button className="bs-btn-primary">
                  <FiDownload size={14} />
                  Export All
                </button>
              </div>
            </div>

            {/* Summary Cards */}
            <div className="bs-summary-cards">
              <div className="bs-summary-card">
                <div className="bs-summary-card-header">
                  <span className="bs-summary-label">Total Assets</span>
                  <span className="bs-summary-icon bs-icon-blue">
                    <FiTrendingUp size={16} />
                  </span>
                </div>
                <div className="bs-summary-value">$3,043,750</div>
                <div className="bs-summary-sub">100% of total</div>
              </div>
              <div className="bs-summary-card">
                <div className="bs-summary-card-header">
                  <span className="bs-summary-label">Total Liabilities</span>
                  <span className="bs-summary-icon bs-icon-red">
                    <FiAlertCircle size={16} />
                  </span>
                </div>
                <div className="bs-summary-value">$1,155,000</div>
                <div className="bs-summary-sub">37.9% of assets</div>
              </div>
              <div className="bs-summary-card">
                <div className="bs-summary-card-header">
                  <span className="bs-summary-label">Debt-to-Equity</span>
                  <span className="bs-summary-icon bs-icon-purple">
                    <FiBarChart2 size={16} />
                  </span>
                </div>
                <div className="bs-summary-value">0.61</div>
                <div className="bs-summary-sub-green">Healthy ratio</div>
              </div>
              <div className="bs-summary-card">
                <div className="bs-summary-card-header">
                  <span className="bs-summary-label">Total Equity</span>
                  <span className="bs-summary-icon bs-icon-green">
                    <FiDollarSign size={16} />
                  </span>
                </div>
                <div className="bs-summary-value">$1,888,750</div>
                <div className="bs-summary-sub">62.1% of assets</div>
              </div>
            </div>

            {/* Balance Sheet Body */}
            <div className="bs-body-grid">
              {/* Assets Section */}
              <div className="bs-section-card">
                <h2 className="bs-section-title">Assets</h2>

                <div className="bs-subsection">
                  <h3 className="bs-subsection-title">CURRENT ASSETS</h3>
                  <div className="bs-line-item">
                    <span>Cash & Cash Equivalents <span className="bs-pct">(35.2%)</span></span>
                    <span className="bs-amount">$1,248,750</span>
                  </div>
                  <div className="bs-line-item">
                    <span>Accounts Receivable <span className="bs-pct">(13.7%)</span></span>
                    <span className="bs-amount">$485,000</span>
                  </div>
                  <div className="bs-line-item">
                    <span>Inventory <span className="bs-pct">(9.2%)</span></span>
                    <span className="bs-amount">$325,000</span>
                  </div>
                  <div className="bs-line-item">
                    <span>Prepaid Expenses <span className="bs-pct">(1.3%)</span></span>
                    <span className="bs-amount">$45,000</span>
                  </div>
                </div>

                <div className="bs-subsection">
                  <h3 className="bs-subsection-title">FIXED ASSETS</h3>
                  <div className="bs-line-item">
                    <span>Property & Equipment <span className="bs-pct">(24%)</span></span>
                    <span className="bs-amount">$850,000</span>
                  </div>
                  <div className="bs-line-item">
                    <span>Accumulated Depreciation <span className="bs-pct">(-3.5%)</span></span>
                    <span className="bs-amount bs-amount-red">$125,000</span>
                  </div>
                  <div className="bs-line-item">
                    <span>Intangible Assets <span className="bs-pct">(6.1%)</span></span>
                    <span className="bs-amount">$215,000</span>
                  </div>
                </div>

                <div className="bs-total-line">
                  <span>TOTAL ASSETS</span>
                  <span className="bs-total-value">$3,043,750</span>
                </div>
              </div>

              {/* Liabilities Section */}
              <div className="bs-section-card">
                <h2 className="bs-section-title">Liabilities</h2>

                <div className="bs-subsection">
                  <h3 className="bs-subsection-title">CURRENT LIABILITIES</h3>
                  <div className="bs-line-item">
                    <span>Accounts Payable <span className="bs-pct">(5.8%)</span></span>
                    <span className="bs-amount">$285,000</span>
                  </div>
                  <div className="bs-line-item">
                    <span>Accrued Expenses <span className="bs-pct">(6.9%)</span></span>
                    <span className="bs-amount">$125,000</span>
                  </div>
                  <div className="bs-line-item">
                    <span>Short-term Debt <span className="bs-pct">(8.3%)</span></span>
                    <span className="bs-amount">$150,000</span>
                  </div>
                </div>

                <div className="bs-subsection">
                  <h3 className="bs-subsection-title">LONG-TERM LIABILITIES</h3>
                  <div className="bs-line-item">
                    <span>Long-term Debt <span className="bs-pct">(27.7%)</span></span>
                    <span className="bs-amount">$500,000</span>
                  </div>
                  <div className="bs-line-item">
                    <span>Deferred Revenue <span className="bs-pct">(5.3%)</span></span>
                    <span className="bs-amount">$95,000</span>
                  </div>
                </div>

                <div className="bs-total-line">
                  <span>TOTAL LIABILITIES</span>
                  <span className="bs-total-value">$1,155,000</span>
                </div>
              </div>
            </div>

            {/* Equity Section */}
            <div className="bs-equity-card">
              <h2 className="bs-section-title">Equity</h2>
              <div className="bs-line-item">
                <span>Common Stock <span className="bs-pct">(26.5%)</span></span>
                <span className="bs-amount">$500,000</span>
              </div>
              <div className="bs-line-item">
                <span>Retained Earnings <span className="bs-pct">(68.2%)</span></span>
                <span className="bs-amount">$1,288,750</span>
              </div>
              <div className="bs-line-item">
                <span>Current Year Earnings <span className="bs-pct">(5.3%)</span></span>
                <span className="bs-amount">$100,000</span>
              </div>
              <div className="bs-total-line">
                <span>TOTAL EQUITY</span>
                <span className="bs-total-value bs-total-green">$1,888,750</span>
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
