import React, { useState } from "react";
import FinancialSidebar from "../../components/financial-sidebar/FinancialSidebar";
import Header from "./Header";
import LogoutConfirmModal from "../../components/logout-modal/LogoutConfirmModal";
import { useNavigate } from "react-router-dom";
import { FiArrowUpRight, FiArrowDownRight, FiShare2, FiPrinter, FiChevronLeft, FiChevronRight, FiDownload, FiCalendar, FiTrendingUp, FiDollarSign, FiBarChart2, FiPercent } from "react-icons/fi";
import "./ProfitLossPage.css";

const PROFIT_LOSS_DATA = [
  { category: "REVENUE", isHeader: true, group: "Revenue" },
  { account: "Product Sales", amount: "$425,000", previousMonth: "$380,000", change: "+11.8%", changeType: "positive", ytd: "$4,250,000", group: "Revenue" },
  { account: "Service Revenue", amount: "$185,000", previousMonth: "$165,000", change: "+12.1%", changeType: "positive", ytd: "$1,750,000", group: "Revenue" },
  { account: "Subscription Revenue", amount: "$95,000", previousMonth: "$88,000", change: "+8.0%", changeType: "positive", ytd: "$920,000", group: "Revenue" },
  { account: "TOTAL REVENUE", amount: "$705,000", previousMonth: "$633,000", change: "11.4%", changeType: "positive", ytd: "$6,920,000", isTotal: true, group: "Revenue" },
  { category: "COST OF GOODS SOLD", isHeader: true, group: "COGS" },
  { account: "Product Costs", amount: "$212,500", previousMonth: "$190,000", change: "+11.8%", changeType: "positive", ytd: "$2,125,000", group: "COGS" },
  { account: "Service Costs", amount: "$74,000", previousMonth: "$66,000", change: "+12.1%", changeType: "positive", ytd: "$700,000", group: "COGS" },
  { account: "Labor Costs", amount: "$45,000", previousMonth: "$42,000", change: "+7.1%", changeType: "positive", ytd: "$460,000", group: "COGS" },
  { account: "TOTAL COST OF GOODS SOLD", amount: "$331,500", previousMonth: "$298,000", change: "11.2%", changeType: "positive", ytd: "$3,285,000", isTotal: true, group: "COGS" },
  { category: "OPERATING EXPENSES", isHeader: true, group: "Expenses" },
  { account: "Salaries & Wages", amount: "$185,000", previousMonth: "$185,000", change: "0.0%", changeType: "neutral", ytd: "$460,000", group: "Expenses" },
  { account: "Marketing", amount: "$45,000", previousMonth: "$52,000", change: "-13.5%", changeType: "negative", ytd: "$460,000", group: "Expenses" },
  { account: "Software & Tools", amount: "$28,000", previousMonth: "$26,000", change: "+7.7%", changeType: "positive", ytd: "$460,000", group: "Expenses" },
  { account: "Office & Rent", amount: "$35,000", previousMonth: "$35,000", change: "0.0%", changeType: "neutral", ytd: "$460,000", group: "Expenses" },
  { account: "Utilities", amount: "$8,500", previousMonth: "$9,200", change: "-7.6%", changeType: "negative", ytd: "$92,000", group: "Expenses" },
  { account: "TOTAL OPERATING EXPENSES", amount: "$301,500", previousMonth: "$307,200", change: "-1.9%", changeType: "neutral", ytd: "$3,097,000", isTotal: true, group: "Expenses" },
  { account: "GROSS PROFIT", amount: "$373,500", previousMonth: "$335,000", change: "+11.5%", changeType: "positive", ytd: "$3,635,000", isGross: true, group: "Summary" },
  { account: "NET INCOME", amount: "$72,000", previousMonth: "$27,800", change: "+159.0%", changeType: "positive", ytd: "$538,000", isNet: true, group: "Summary" },
];

export default function ProfitLossPage() {
  const navigate = useNavigate();
  const [showLogoutModal, setShowLogoutModal] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [statusFilter, setStatusFilter] = useState("All Status");
  const [categoryFilter, setCategoryFilter] = useState("All Categories");
  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(4);
  const totalResults = 15;

  const handleLogoutClick = () => setShowLogoutModal(true);
  const handleCloseLogoutModal = () => setShowLogoutModal(false);
  const handleConfirmLogout = () => {
    localStorage.removeItem("authToken");
    sessionStorage.clear();
    setShowLogoutModal(false);
    navigate("/auth/login");
  };

  const filteredData = PROFIT_LOSS_DATA.filter((row) => {
    if (categoryFilter !== "All Categories" && row.group !== categoryFilter && row.group !== "Summary") {
      return false;
    }
    if (statusFilter === "Active" && row.changeType === "negative") return false;
    if (statusFilter === "Inactive" && row.changeType !== "negative") return false;
    return true;
  });

  const totalPages = Math.max(1, Math.ceil(filteredData.filter((r) => !r.isHeader).length / rowsPerPage)) || 10;

  return (
    <div className={`financial-core-page ${isDarkMode ? 'dark-mode' : ''}`}>
      <FinancialSidebar onLogout={handleLogoutClick} isDarkMode={isDarkMode} activePage="reports" />
      <div className="financial-core-main">
        <Header isDarkMode={isDarkMode} toggleTheme={() => setIsDarkMode((p) => !p)} />
        <main className="financial-core-content">
          <div className="pl-container">
            {/* Page Header */}
            <div className="pl-page-header">
              <div className="pl-page-header-left">
                <h1>Profit &amp; Loss</h1>
                <p>Summarizes the revenues, costs, and expenses incurred during a specific period.</p>
              </div>
              <div className="pl-page-header-right">
                <button className="pl-btn-outline">
                  <FiCalendar size={14} />
                  Date Range
                </button>
                <button className="pl-btn-primary">
                  <FiDownload size={14} />
                  Export All
                </button>
              </div>
            </div>

            {/* Summary Cards */}
            <div className="pl-summary-cards">
              <div className="pl-summary-card">
                <div className="pl-summary-card-header">
                  <span className="pl-summary-label">Total Revenue</span>
                  <span className="pl-summary-icon pl-icon-green">
                    <FiTrendingUp size={16} />
                  </span>
                </div>
                <div className="pl-summary-value">$705,000</div>
                <div className="pl-summary-change positive">
                  <FiArrowUpRight size={12} />
                  <span>+11.4% from last month</span>
                </div>
              </div>
              <div className="pl-summary-card">
                <div className="pl-summary-card-header">
                  <span className="pl-summary-label">Gross Profit</span>
                  <span className="pl-summary-icon pl-icon-purple">
                    <FiDollarSign size={16} />
                  </span>
                </div>
                <div className="pl-summary-value">$373,500</div>
                <div className="pl-summary-change positive">
                  <FiArrowUpRight size={12} />
                  <span>+11.5% from last month</span>
                </div>
              </div>
              <div className="pl-summary-card">
                <div className="pl-summary-card-header">
                  <span className="pl-summary-label">Net Income</span>
                  <span className="pl-summary-icon pl-icon-blue">
                    <FiBarChart2 size={16} />
                  </span>
                </div>
                <div className="pl-summary-value">$72,000</div>
                <div className="pl-summary-change positive">
                  <FiArrowUpRight size={12} />
                  <span>+21.6% from last month</span>
                </div>
              </div>
              <div className="pl-summary-card">
                <div className="pl-summary-card-header">
                  <span className="pl-summary-label">Net Margin</span>
                  <span className="pl-summary-icon pl-icon-orange">
                    <FiPercent size={16} />
                  </span>
                </div>
                <div className="pl-summary-value">10.2%</div>
                <div className="pl-summary-sub">Industry avg: 8.2%</div>
              </div>
            </div>

            {/* Table Card */}
            <div className="pl-table-wrapper">
              {/* Filters and Actions */}
              <div className="pl-filters-bar">
                <div className="pl-filters-left">
                  <div className="pl-filter-dropdown">
                    <select value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)}>
                      <option>All Status</option>
                      <option>Active</option>
                      <option>Inactive</option>
                    </select>
                  </div>
                  <div className="pl-filter-dropdown">
                    <select value={categoryFilter} onChange={(e) => setCategoryFilter(e.target.value)}>
                      <option>All Categories</option>
                      <option>Revenue</option>
                      <option>Expenses</option>
                      <option>COGS</option>
                    </select>
                  </div>
                </div>
                <div className="pl-filters-right">
                  <button className="pl-action-btn"><FiShare2 size={14} /> Share</button>
                  <button className="pl-action-btn"><FiPrinter size={14} /> Print</button>
                  <button className="pl-export-btn"><FiDownload size={14} /> Export</button>
                </div>
              </div>

              {/* Table */}
              <div className="pl-table-container">
                <table className="pl-table">
                  <thead>
                    <tr>
                      <th>ACCOUNT</th>
                      <th>AMOUNT</th>
                      <th>PREVIOUS MONTH</th>
                      <th>CHANGE</th>
                      <th>YTD</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredData.map((row, idx) => {
                      if (row.isHeader) {
                        return (
                          <tr key={idx} className="pl-category-row">
                            <td colSpan={5}>{row.category}</td>
                          </tr>
                        );
                      }
                      return (
                        <tr
                          key={idx}
                          className={`${row.isTotal ? "pl-total-row" : ""} ${row.isGross ? "pl-gross-row" : ""} ${row.isNet ? "pl-net-row" : ""}`}
                        >
                          <td className={`pl-account-name ${row.isTotal || row.isGross || row.isNet ? "pl-bold" : ""}`}>
                            {row.account}
                          </td>
                          <td className={row.isGross || row.isNet ? "pl-highlight-green" : ""}>{row.amount}</td>
                          <td>{row.previousMonth}</td>
                          <td>
                            <span className={`pl-change-badge ${row.changeType}`}>
                              {row.changeType === "positive" && !row.isTotal && <FiArrowUpRight size={12} />}
                              {row.changeType === "negative" && !row.isTotal && <FiArrowDownRight size={12} />}
                              {row.change}
                            </span>
                          </td>
                          <td>{row.ytd}</td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>

              {/* Pagination */}
              <div className="pl-pagination">
              <div className="pl-pagination-info">
                Showing
                <select
                  className="pl-rows-select"
                  value={rowsPerPage}
                  onChange={(e) => { setRowsPerPage(Number(e.target.value)); setCurrentPage(1); }}
                >
                  <option value={4}>04</option>
                  <option value={10}>10</option>
                  <option value={20}>20</option>
                </select>
                / {filteredData.filter((r) => !r.isHeader).length} Results
              </div>
              <div className="pl-pagination-controls">
                <button
                  className="pl-page-btn"
                  disabled={currentPage === 1}
                  onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                >
                  <FiChevronLeft size={16} />
                </button>
                {[1, 2, 3].map((p) => (
                  <button
                    key={p}
                    className={`pl-page-btn ${currentPage === p ? "active" : ""}`}
                    onClick={() => setCurrentPage(p)}
                  >
                    {p}
                  </button>
                ))}
                <span className="pl-page-ellipsis">...</span>
                <button
                  className={`pl-page-btn ${currentPage === totalPages ? "active" : ""}`}
                  onClick={() => setCurrentPage(totalPages)}
                >
                  {totalPages}
                </button>
                <button
                  className="pl-page-btn"
                  disabled={currentPage === totalPages}
                  onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
                >
                  <FiChevronRight size={16} />
                </button>
              </div>
              </div>

              {/* Disclaimer */}
              <div className="pl-disclaimer">
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
