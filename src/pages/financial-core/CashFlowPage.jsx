import React, { useState } from "react";
import FinancialSidebar from "../../components/financial-sidebar/FinancialSidebar";
import Header from "./Header";
import LogoutConfirmModal from "../../components/logout-modal/LogoutConfirmModal";
import { useNavigate } from "react-router-dom";
import { FiTrendingUp, FiDownload, FiCalendar, FiBarChart2, FiDollarSign } from "react-icons/fi";
import "./CashFlowPage.css";

export default function CashFlowPage() {
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
          <div className="cf-container">
            {/* Page Header */}
            <div className="cf-page-header">
              <div className="cf-page-header-left">
                <h1>Cash Flows</h1>
                <p>Summary of cash inflows and outflows across operating, investing, and financing activities.</p>
              </div>
              <div className="cf-page-header-right">
                <button className="cf-btn-outline">
                  <FiCalendar size={14} />
                  Mar 2026
                </button>
                <button className="cf-btn-primary">
                  <FiDownload size={14} />
                  Export All
                </button>
              </div>
            </div>

            {/* Summary Cards */}
            <div className="cf-summary-cards">
              <div className="cf-summary-card">
                <div className="cf-summary-card-header">
                  <span className="cf-summary-label">Operating Cash Flow</span>
                  <span className="cf-summary-icon cf-icon-green">
                    <FiTrendingUp size={16} />
                  </span>
                </div>
                <div className="cf-summary-value">$56,000</div>
                <div className="cf-summary-tag cf-tag-green">Strong operations</div>
              </div>
              <div className="cf-summary-card">
                <div className="cf-summary-card-header">
                  <span className="cf-summary-label">Investing Cash Flow</span>
                  <span className="cf-summary-icon cf-icon-blue">
                    <FiBarChart2 size={16} />
                  </span>
                </div>
                <div className="cf-summary-value cf-value-red">$75,000</div>
                <div className="cf-summary-sub">Capital investments</div>
              </div>
              <div className="cf-summary-card">
                <div className="cf-summary-card-header">
                  <span className="cf-summary-label">Financing Cash Flow</span>
                  <span className="cf-summary-icon cf-icon-purple">
                    <FiDollarSign size={16} />
                  </span>
                </div>
                <div className="cf-summary-value">$60,000</div>
                <div className="cf-summary-sub">Net financing</div>
              </div>
              <div className="cf-summary-card">
                <div className="cf-summary-card-header">
                  <span className="cf-summary-label">Net Cash Flow</span>
                  <span className="cf-summary-icon cf-icon-yellow">
                    <FiTrendingUp size={16} />
                  </span>
                </div>
                <div className="cf-summary-value cf-value-green">+$41,000</div>
                <div className="cf-summary-sub">This period</div>
              </div>
            </div>

            {/* Cash Flow Statement */}
            <div className="cf-statement-card">
              <div className="cf-statement-header">
                <h2>Cash Flow Statement</h2>
                <p>For the period ending February 2026</p>
              </div>

              {/* Operating Activities */}
              <div className="cf-section">
                <h3 className="cf-section-title">OPERATING ACTIVITIES</h3>
                <div className="cf-line-item">
                  <span>Net Income</span>
                  <span className="cf-amount">$72,000</span>
                </div>
                <div className="cf-line-item">
                  <span>Depreciation & Amortization</span>
                  <span className="cf-amount">$15,000</span>
                </div>
                <div className="cf-line-item">
                  <span>Changes in Accounts Receivable</span>
                  <span className="cf-amount cf-amount-red">($35,000)</span>
                </div>
                <div className="cf-line-item">
                  <span>Changes in Inventory</span>
                  <span className="cf-amount cf-amount-red">($18,000)</span>
                </div>
                <div className="cf-line-item">
                  <span>Changes in Accounts Payable</span>
                  <span className="cf-amount">$22,000</span>
                </div>
                <div className="cf-subtotal-line cf-subtotal-green">
                  <span>Net Cash from Operating Activities</span>
                  <span className="cf-subtotal-value cf-green">$56,000</span>
                </div>
              </div>

              {/* Investing Activities */}
              <div className="cf-section">
                <h3 className="cf-section-title">INVESTING ACTIVITIES</h3>
                <div className="cf-line-item">
                  <span>Purchase of Equipment</span>
                  <span className="cf-amount cf-amount-red">($85,000)</span>
                </div>
                <div className="cf-line-item">
                  <span>Sale of Investments</span>
                  <span className="cf-amount">$25,000</span>
                </div>
                <div className="cf-line-item">
                  <span>Acquisition of Software</span>
                  <span className="cf-amount cf-amount-red">($15,000)</span>
                </div>
                <div className="cf-subtotal-line">
                  <span>Net Cash from Investing Activities</span>
                  <span className="cf-subtotal-value cf-red">($75,000)</span>
                </div>
              </div>

              {/* Financing Activities */}
              <div className="cf-section">
                <h3 className="cf-section-title">FINANCING ACTIVITIES</h3>
                <div className="cf-line-item">
                  <span>Proceeds from Loans</span>
                  <span className="cf-amount">$100,000</span>
                </div>
                <div className="cf-line-item">
                  <span>Debt Repayment</span>
                  <span className="cf-amount cf-amount-red">($25,000)</span>
                </div>
                <div className="cf-line-item">
                  <span>Dividends Paid</span>
                  <span className="cf-amount cf-amount-red">($15,000)</span>
                </div>
                <div className="cf-subtotal-line cf-subtotal-green">
                  <span>Net Cash from Financing Activities</span>
                  <span className="cf-subtotal-value cf-green">$60,000</span>
                </div>
              </div>

              {/* Summary */}
              <div className="cf-final-section">
                <div className="cf-final-line">
                  <span className="cf-final-label">Beginning Cash Balance</span>
                  <span className="cf-final-value">$1,207,750</span>
                </div>
                <div className="cf-final-line">
                  <span className="cf-final-label">Net Change in Cash</span>
                  <span className="cf-final-value cf-green">+$41,000</span>
                </div>
                <div className="cf-ending-line">
                  <span className="cf-ending-label">Ending Cash Balance</span>
                  <span className="cf-ending-value">$1,248,750</span>
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
