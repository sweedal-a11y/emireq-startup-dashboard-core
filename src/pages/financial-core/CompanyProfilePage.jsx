import React, { useState } from "react";
import FinancialSidebar from "../../components/financial-sidebar/FinancialSidebar";
import Header from "./Header";
import LogoutConfirmModal from "../../components/logout-modal/LogoutConfirmModal";
import { useNavigate } from "react-router-dom";
import { FiGlobe, FiMail, FiPhone, FiCalendar, FiDownload } from "react-icons/fi";
import "./CompanyProfilePage.css";

export default function CompanyProfilePage() {
  const navigate = useNavigate();
  const [showLogoutModal, setShowLogoutModal] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);

  const [formData, setFormData] = useState({
    entityName: "Antigravity Tech Solutions Pri",
    taxId: "TAX-992837465",
    registeredAddress: "123 Innovation Drive, Silicon Valley, CA 94025",
    baseCurrency: "USD - US Dollar",
    fiscalYearEnd: "December",
    website: "https://antigravity.tech",
    email: "finance@antigravity.tech",
    phone: "+1 (555) 123-4567",
  });

  const handleChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleLogoutClick = () => setShowLogoutModal(true);
  const handleCloseLogoutModal = () => setShowLogoutModal(false);
  const handleConfirmLogout = () => {
    localStorage.removeItem("authToken");
    sessionStorage.clear();
    setShowLogoutModal(false);
    navigate("/auth/login");
  };

  return (
    <div className={`financial-core-page ${isDarkMode ? "dark-mode" : ""}`}>
      <FinancialSidebar onLogout={handleLogoutClick} isDarkMode={isDarkMode} activePage="setup" />
      <div className="financial-core-main">
        <Header isDarkMode={isDarkMode} toggleTheme={() => setIsDarkMode((p) => !p)} />
        <main className="financial-core-content">
          <div className="cp-container">
            {/* Page Header */}
            <div className="cp-page-header">
              <div className="cp-page-header-left">
                <h1>Company Profile</h1>
                <p>Manage your organization's core identity and regional settings.</p>
              </div>
              <div className="cp-page-header-right">
                <button className="cp-btn-date">
                  <FiCalendar size={14} />
                  Mar 2026
                </button>
                <button className="cp-btn-export">
                  <FiDownload size={14} />
                  Export All
                </button>
              </div>
            </div>

            {/* Main Layout */}
            <div className="cp-main-layout">
              {/* Left: Company Card */}
              <div className="cp-company-card">
                <div className="cp-company-image">
                  <span className="cp-company-image-placeholder">AT</span>
                </div>
                <h2>Antigravity Tech Solutions Inc.</h2>
                <p className="cp-subtitle">Software &amp; Technology</p>
                <div className="cp-company-divider" />
                <div className="cp-contact-list">
                  <div className="cp-contact-item">
                    <span className="cp-contact-icon"><FiGlobe size={16} /></span>
                    {formData.website}
                  </div>
                  <div className="cp-contact-item">
                    <span className="cp-contact-icon"><FiMail size={16} /></span>
                    {formData.email}
                  </div>
                  <div className="cp-contact-item">
                    <span className="cp-contact-icon"><FiPhone size={16} /></span>
                    {formData.phone}
                  </div>
                </div>
              </div>

              {/* Right: Legal Info + Regional Settings */}
              <div className="cp-right-content">
                {/* Legal Information */}
                <div className="cp-section-card">
                  <h3 className="cp-section-label">Legal Information</h3>
                  <div className="cp-form-row">
                    <div className="cp-form-group">
                      <label>Legal Entity Name</label>
                      <input
                        type="text"
                        value={formData.entityName}
                        onChange={(e) => handleChange("entityName", e.target.value)}
                      />
                    </div>
                    <div className="cp-form-group">
                      <label>Tax Identification Number</label>
                      <input
                        type="text"
                        value={formData.taxId}
                        onChange={(e) => handleChange("taxId", e.target.value)}
                      />
                    </div>
                  </div>
                  <div className="cp-form-row full">
                    <div className="cp-form-group">
                      <label>Registered Address</label>
                      <textarea
                        value={formData.registeredAddress}
                        onChange={(e) => handleChange("registeredAddress", e.target.value)}
                      />
                    </div>
                  </div>
                </div>

                {/* Regional Settings */}
                <div className="cp-section-card">
                  <h3 className="cp-section-label">Regional Settings</h3>
                  <div className="cp-form-row">
                    <div className="cp-form-group">
                      <label>Base Currency</label>
                      <select
                        value={formData.baseCurrency}
                        onChange={(e) => handleChange("baseCurrency", e.target.value)}
                      >
                        <option>USD - US Dollar</option>
                        <option>EUR - Euro</option>
                        <option>GBP - British Pound</option>
                        <option>AED - UAE Dirham</option>
                        <option>SAR - Saudi Riyal</option>
                      </select>
                    </div>
                    <div className="cp-form-group">
                      <label>Fiscal Year End</label>
                      <select
                        value={formData.fiscalYearEnd}
                        onChange={(e) => handleChange("fiscalYearEnd", e.target.value)}
                      >
                        <option>January</option>
                        <option>February</option>
                        <option>March</option>
                        <option>April</option>
                        <option>May</option>
                        <option>June</option>
                        <option>July</option>
                        <option>August</option>
                        <option>September</option>
                        <option>October</option>
                        <option>November</option>
                        <option>December</option>
                      </select>
                    </div>
                  </div>
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
