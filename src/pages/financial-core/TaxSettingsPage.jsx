import React, { useState } from "react";
import FinancialSidebar from "../../components/financial-sidebar/FinancialSidebar";
import Header from "./Header";
import LogoutConfirmModal from "../../components/logout-modal/LogoutConfirmModal";
import { useNavigate } from "react-router-dom";
import {
  FiPlus, FiEdit2, FiTrash2, FiCheckCircle,
  FiPercent, FiGlobe, FiFileText
} from "react-icons/fi";
import "./TaxSettingsPage.css";

const INITIAL_TAXES = [
  { id: 1, name: "Sales Tax - CA", subtitle: "California state sales tax", type: "Sales Tax", jurisdiction: "California", rate: "8.5%", isDefault: true, status: "Active" },
  { id: 2, name: "Sales Tax - NY", subtitle: "New York state sales tax", type: "Sales Tax", jurisdiction: "New York", rate: "7%", isDefault: false, status: "Active" },
  { id: 3, name: "VAT Standard", subtitle: "Standard VAT rate", type: "VAT", jurisdiction: "Federal", rate: "20%", isDefault: false, status: "Active" },
  { id: 4, name: "Service Tax", subtitle: "Professional services tax", type: "Service Tax", jurisdiction: "Federal", rate: "5%", isDefault: false, status: "Active" },
];

export default function TaxSettingsPage() {
  const navigate = useNavigate();
  const [showLogoutModal, setShowLogoutModal] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [taxes, setTaxes] = useState(INITIAL_TAXES);

  const handleLogoutClick = () => setShowLogoutModal(true);
  const handleCloseLogoutModal = () => setShowLogoutModal(false);
  const handleConfirmLogout = () => {
    localStorage.removeItem("authToken");
    sessionStorage.clear();
    setShowLogoutModal(false);
    navigate("/auth/login");
  };

  const handleDelete = (id) => {
    setTaxes((prev) => prev.filter((t) => t.id !== id));
  };

  const defaultTax = taxes.find((t) => t.isDefault);
  const jurisdictions = [...new Set(taxes.map((t) => t.jurisdiction))];
  const types = [...new Set(taxes.map((t) => t.type))];

  return (
    <div className={`financial-core-page ${isDarkMode ? "dark-mode" : ""}`}>
      <FinancialSidebar onLogout={handleLogoutClick} isDarkMode={isDarkMode} activePage="setup" />
      <div className="financial-core-main">
        <Header isDarkMode={isDarkMode} toggleTheme={() => setIsDarkMode((p) => !p)} />
        <main className="financial-core-content">
          <div className="ts-container">
            {/* Page Header */}
            <div className="ts-page-header">
              <div className="ts-page-header-left">
                <h1>Tax Settings</h1>
                <p>Configure tax rates and jurisdictional authorities.</p>
              </div>
              <div className="ts-page-header-right">
                <button className="ts-btn-add">
                  <FiPlus size={14} />
                  Add Tax Rate
                </button>
              </div>
            </div>

            {/* Summary Cards */}
            <div className="ts-summary-cards">
              <div className="ts-summary-card">
                <div className="ts-summary-card-top">
                  <span className="ts-summary-card-title">Total Tax Rates</span>
                  <div className="ts-summary-card-icon yellow"><FiPercent size={16} /></div>
                </div>
                <div className="ts-summary-card-number">{taxes.length}</div>
                <p className="ts-summary-card-sub">Active rates</p>
              </div>
              <div className="ts-summary-card">
                <div className="ts-summary-card-top">
                  <span className="ts-summary-card-title">Default Tax Rate</span>
                  <div className="ts-summary-card-icon green"><FiCheckCircle size={16} /></div>
                </div>
                <div className="ts-summary-card-number">{defaultTax ? defaultTax.rate : "N/A"}</div>
                <p className="ts-summary-card-sub green">{defaultTax ? `${defaultTax.name}` : "None set"}</p>
              </div>
              <div className="ts-summary-card">
                <div className="ts-summary-card-top">
                  <span className="ts-summary-card-title">Jurisdictions</span>
                  <div className="ts-summary-card-icon purple"><FiGlobe size={16} /></div>
                </div>
                <div className="ts-summary-card-number">{jurisdictions.length}</div>
                <p className="ts-summary-card-sub">Active jurisdictions</p>
              </div>
              <div className="ts-summary-card">
                <div className="ts-summary-card-top">
                  <span className="ts-summary-card-title">Tax Types</span>
                  <div className="ts-summary-card-icon orange"><FiFileText size={16} /></div>
                </div>
                <div className="ts-summary-card-number">{types.length}</div>
                <p className="ts-summary-card-sub">{types.join(", ")}</p>
              </div>
            </div>

            {/* Table */}
            <div className="ts-table-wrapper">
              <div className="ts-table-border">
                <table className="ts-table">
                  <thead>
                    <tr>
                      <th>Tax Name</th>
                      <th>Type</th>
                      <th>Jurisdiction</th>
                      <th>Rate</th>
                      <th>Default</th>
                      <th>Status</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {taxes.map((tax) => (
                      <tr key={tax.id}>
                        <td>
                          <span className="ts-tax-name">{tax.name}</span>
                          <span className="ts-tax-subtitle">{tax.subtitle}</span>
                        </td>
                        <td><span className={`ts-type-badge ${tax.type.toLowerCase().replace(/\s/g, "-")}`}>{tax.type}</span></td>
                        <td>{tax.jurisdiction}</td>
                        <td><span className="ts-rate">{tax.rate}</span></td>
                        <td>
                          {tax.isDefault ? (
                            <span className="ts-default-badge"><FiCheckCircle size={13} /> Default</span>
                          ) : null}
                        </td>
                        <td><span className="ts-status">{tax.status}</span></td>
                        <td>
                          <div className="ts-actions">
                            <button className="ts-action-btn" title="Edit"><FiEdit2 size={16} /></button>
                            <button className="ts-action-btn delete" title="Delete" onClick={() => handleDelete(tax.id)}><FiTrash2 size={16} /></button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              <div className="ts-footer">
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
