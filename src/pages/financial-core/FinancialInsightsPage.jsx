import React, { useState } from "react";
import FinancialSidebar from "../../components/financial-sidebar/FinancialSidebar";
import Header from "./Header";
import LogoutConfirmModal from "../../components/logout-modal/LogoutConfirmModal";
import { useNavigate } from "react-router-dom";
import {
  FiInfo,
  FiAlertCircle,
  FiArrowRight,
  FiRefreshCw,
  FiTrendingUp,
  FiNavigation,
} from "react-icons/fi";
import { HiOutlineSparkles } from "react-icons/hi";
import "./FinancialInsightsPage.css";

const INSIGHTS_DATA = [
  {
    id: 1,
    icon: "sparkle",
    iconColor: "green",
    type: "Revenue",
    title: "Revenue Growth Opportunity Detected",
    priority: "high",
    description:
      "Product Sales revenue increased 11.8% month-over-month, outpacing industry average of 7.2%.",
    metrics: [
      { icon: "$", label: "$45,000 additional revenue potential" },
      { icon: "◎", label: "94% confidence" },
    ],
    recommendation:
      "Consider increasing inventory levels for top-performing products to capitalize on demand.",
    date: "Feb 27",
  },
  {
    id: 2,
    icon: "alert",
    iconColor: "red",
    type: "Cash Flow",
    title: "Cash Flow Pressure Alert",
    priority: "high",
    description:
      "Accounts Receivable increased by $35,000 while cash decreased. Days Sales Outstanding is 42 days, above target of 30.",
    metrics: [
      { icon: "$", label: "Potential liquidity constraint" },
      { icon: "◎", label: "89% confidence" },
    ],
    recommendation:
      "Implement stricter payment terms and follow up on overdue invoices over 30 days.",
    date: "Feb 27",
  },
  {
    id: 3,
    icon: "trending",
    iconColor: "blue",
    type: "Cost",
    title: "Marketing Efficiency Improving",
    priority: "medium",
    description:
      "Marketing spend decreased 13.5% while revenue increased 11.4%, indicating improved CAC efficiency.",
    metrics: [
      { icon: "$", label: "Cost savings of $7,000/month" },
      { icon: "◎", label: "91% confidence" },
    ],
    recommendation:
      "Document successful channels and reallocate budget to highest-performing campaigns.",
    date: "Feb 26",
  },
];

export default function FinancialInsightsPage() {
  const navigate = useNavigate();
  const [showLogoutModal, setShowLogoutModal] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [typeFilter, setTypeFilter] = useState("All Types");
  const [priorityFilter, setPriorityFilter] = useState("All Priority");

  const handleLogoutClick = () => setShowLogoutModal(true);
  const handleCloseLogoutModal = () => setShowLogoutModal(false);
  const handleConfirmLogout = () => {
    localStorage.removeItem("authToken");
    sessionStorage.clear();
    setShowLogoutModal(false);
    navigate("/auth/login");
  };

  const filteredInsights = INSIGHTS_DATA.filter((insight) => {
    if (typeFilter !== "All Types" && insight.type !== typeFilter) return false;
    if (priorityFilter !== "All Priority" && insight.priority.toLowerCase() !== priorityFilter.toLowerCase()) return false;
    return true;
  });

  const getInsightIcon = (icon, color) => {
    const iconMap = {
      sparkle: <HiOutlineSparkles size={20} />,
      alert: <FiAlertCircle size={20} />,
      trending: <FiTrendingUp size={20} />,
    };
    return (
      <div className={`fi-insight-icon fi-icon-${color}`}>
        {iconMap[icon]}
      </div>
    );
  };

  return (
    <div className={`financial-core-page ${isDarkMode ? 'dark-mode' : ''}`}>
      <FinancialSidebar onLogout={handleLogoutClick} isDarkMode={isDarkMode} activePage="reports" />
      <div className="financial-core-main">
        <Header isDarkMode={isDarkMode} toggleTheme={() => setIsDarkMode((p) => !p)} />
        <main className="financial-core-content">
          <div className="fi-container">
            {/* Page Header */}
            <div className="fi-page-header">
              <div className="fi-page-header-left">
                <div className="fi-title-row">
                  <h1>Financial Insights (AI)</h1>
                  <span className="fi-ai-badge">
                    <HiOutlineSparkles size={14} />
                    AI Powered
                  </span>
                </div>
                <p>AI-driven analysis of your financial data to identify trends and opportunities.</p>
              </div>
              <div className="fi-page-header-right">
                <button className="fi-refresh-btn">
                  <FiRefreshCw size={14} />
                  Refresh Insights
                </button>
              </div>
            </div>

            {/* Summary Cards */}
            <div className="fi-summary-cards">
              <div className="fi-summary-card">
                <div className="fi-summary-card-header">
                  <span className="fi-summary-label">AI Insights Generated</span>
                  <span className="fi-summary-icon fi-icon-bg-blue">
                    <FiInfo size={16} />
                  </span>
                </div>
                <div className="fi-summary-value">3</div>
                <div className="fi-summary-sub">Last updated today</div>
              </div>
              <div className="fi-summary-card">
                <div className="fi-summary-card-header">
                  <span className="fi-summary-label">High Priority</span>
                  <span className="fi-summary-icon fi-icon-bg-red">
                    <FiAlertCircle size={16} />
                  </span>
                </div>
                <div className="fi-summary-value">2</div>
                <div className="fi-summary-sub-red">Require attention</div>
              </div>
              <div className="fi-summary-card">
                <div className="fi-summary-card-header">
                  <span className="fi-summary-label">Opportunities</span>
                  <span className="fi-summary-icon fi-icon-bg-blue">
                    <HiOutlineSparkles size={16} />
                  </span>
                </div>
                <div className="fi-summary-value">1</div>
                <div className="fi-summary-sub-green">Growth potential</div>
              </div>
              <div className="fi-summary-card">
                <div className="fi-summary-card-header">
                  <span className="fi-summary-label">Avg. Confidence</span>
                  <span className="fi-summary-icon fi-icon-bg-purple">
                    <FiNavigation size={16} />
                  </span>
                </div>
                <div className="fi-summary-value">86.4%</div>
                <div className="fi-summary-sub">High accuracy</div>
              </div>
            </div>

            {/* Filters */}
            <div className="fi-filters">
              <div className="fi-filter-dropdown">
                <select value={typeFilter} onChange={(e) => setTypeFilter(e.target.value)}>
                  <option>All Types</option>
                  <option>Revenue</option>
                  <option>Cost</option>
                  <option>Cash Flow</option>
                </select>
              </div>
              <div className="fi-filter-dropdown">
                <select value={priorityFilter} onChange={(e) => setPriorityFilter(e.target.value)}>
                  <option>All Priority</option>
                  <option>High</option>
                  <option>Medium</option>
                  <option>Low</option>
                </select>
              </div>
            </div>

            {/* Insight Cards */}
            <div className="fi-insights-list">
              {filteredInsights.length === 0 && (
                <div className="fi-no-results">No insights match the selected filters.</div>
              )}
              {filteredInsights.map((insight) => (
                <div key={insight.id} className="fi-insight-card">
                  <div className="fi-insight-header">
                    {getInsightIcon(insight.icon, insight.iconColor)}
                    <div className="fi-insight-title-group">
                      <div className="fi-insight-title-row">
                        <h3 className="fi-insight-title">{insight.title}</h3>
                        <span className={`fi-priority-badge fi-priority-${insight.priority}`}>
                          {insight.priority}
                        </span>
                      </div>
                      <p className="fi-insight-desc">{insight.description}</p>
                    </div>
                  </div>

                  <div className="fi-insight-metrics">
                    {insight.metrics.map((metric, idx) => (
                      <span key={idx} className="fi-metric">
                        <span className="fi-metric-icon">{metric.icon}</span>
                        {metric.label}
                      </span>
                    ))}
                  </div>

                  <div className="fi-recommendation">
                    <div className="fi-recommendation-label">
                      <FiInfo size={14} />
                      AI RECOMMENDATION
                    </div>
                    <p className="fi-recommendation-text">{insight.recommendation}</p>
                  </div>

                  <div className="fi-insight-footer">
                    <span className="fi-insight-date">{insight.date}</span>
                    <button className="fi-action-btn">
                      Take Action <FiArrowRight size={14} />
                    </button>
                  </div>
                </div>
              ))}
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
