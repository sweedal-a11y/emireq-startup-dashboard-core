import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import SalesARSidebar from './SalesARSidebar';
import Header from './Header';
import LogoutConfirmModal from '../../components/logout-modal/LogoutConfirmModal';
import './InvoiceDetailView.css';

export default function InvoiceDetailView() {
  const { invoiceId } = useParams();
  const navigate = useNavigate();
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [showLogoutModal, setShowLogoutModal] = useState(false);

  const toggleTheme = () => {
    setIsDarkMode(prev => !prev);
  };

  const handleLogoutClick = () => {
    setShowLogoutModal(true);
  };

  const handleCloseLogoutModal = () => {
    setShowLogoutModal(false);
  };

  const handleConfirmLogout = () => {
    localStorage.removeItem("authToken");
    sessionStorage.clear();
    setShowLogoutModal(false);
    navigate("/auth/login");
  };

  const handleBack = () => {
    navigate('/financial-core/sales?view=invoices');
  };

  return (
    <div className={`invoice-detail-page ${isDarkMode ? 'dark-mode' : ''}`}>
      <SalesARSidebar isDarkMode={isDarkMode} onLogout={handleLogoutClick} />
      
      <div className="invoice-detail-main">
        <Header isDarkMode={isDarkMode} toggleTheme={toggleTheme} invoiceId={invoiceId} />
        
        <div className={`invoice-detail-view ${isDarkMode ? 'dark-mode' : ''}`}>
          <button className="back-button" onClick={handleBack}>
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M12.5 15L7.5 10L12.5 5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            Back to Invoices
          </button>

          <div className="invoice-header-container">
          <div className="invoice-header-section">
            <div className="invoice-title-group">
              <div className="invoice-title-row">
                <h1 className="invoice-id">{invoiceId}</h1>
                <span className="invoice-status-badge overdue">Overdue</span>
              </div>
              <p className="invoice-customer">Acme Corporation</p>
            </div>
            
            <div className="invoice-actions">
              <button className="action-btn secondary">
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
<g clip-path="url(#clip0_269_1439)">
<path d="M13.333 2.66602H2.66634C1.92996 2.66602 1.33301 3.26297 1.33301 3.99935V11.9993C1.33301 12.7357 1.92996 13.3327 2.66634 13.3327H13.333C14.0694 13.3327 14.6663 12.7357 14.6663 11.9993V3.99935C14.6663 3.26297 14.0694 2.66602 13.333 2.66602Z" stroke="currentColor" stroke-width="1.33333" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M14.6663 4.66602L8.68634 8.46602C8.48052 8.59497 8.24255 8.66336 7.99967 8.66336C7.7568 8.66336 7.51883 8.59497 7.31301 8.46602L1.33301 4.66602" stroke="currentColor" stroke-width="1.33333" stroke-linecap="round" stroke-linejoin="round"/>
</g>
<defs>
<clipPath id="clip0_269_1439">
<rect width="16" height="16" fill="white"/>
</clipPath>
</defs>
</svg>

                Send Reminder
              </button>
              <button className="action-btn secondary">
                <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M17.5 12.5V13.8333C17.5 14.2754 17.3244 14.6993 17.0118 15.0118C16.6993 15.3244 16.2754 15.5 15.8333 15.5H4.16667C3.72464 15.5 3.30072 15.3244 2.98816 15.0118C2.67559 14.6993 2.5 14.2754 2.5 13.8333V12.5" stroke="currentColor" strokeWidth="1.33333" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M5.83331 8.3335L9.99998 12.5002L14.1666 8.3335" stroke="currentColor" strokeWidth="1.33333" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M10 12.5V2.5" stroke="currentColor" strokeWidth="1.33333" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
                Download PDF
              </button>
              <button className="action-btn primary">
                <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M10 2.5V17.5" stroke="currentColor" strokeWidth="1.33333" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M13.3333 4.16667H8.33333C7.67029 4.16667 7.03441 4.42991 6.56557 4.89876C6.09672 5.3676 5.83333 6.00348 5.83333 6.66667C5.83333 7.32971 6.09672 7.96559 6.56557 8.43443C7.03441 8.90328 7.67029 9.16667 8.33333 9.16667H11.6667C12.3297 9.16667 12.9656 9.43006 13.4344 9.89891C13.9033 10.3678 14.1667 11.0036 14.1667 11.6667C14.1667 12.3297 13.9033 12.9656 13.4344 13.4344C12.9656 13.9033 12.3297 14.1667 11.6667 14.1667H5.83333" stroke="currentColor" strokeWidth="1.33333" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
                Record Payment
              </button>
            </div>
          </div>

          <div className="invoice-summary-cards">
            <div className="summary-card">
              <p className="summary-label">Invoice Date</p>
              <p className="summary-value">2026-01-15</p>
            </div>
            <div className="summary-card">
              <p className="summary-label">Due Date</p>
              <p className="summary-value">2026-02-14</p>
            </div>
            <div className="summary-card">
              <p className="summary-label">Total Amount</p>
              <p className="summary-value">USD<br/>50,000</p>
            </div>
            <div className="summary-card">
              <p className="summary-label">Balance Due</p>
              <p className="summary-value balance-due">USD<br/>50,000</p>
            </div>
          </div>
          </div>

          <div className="line-items-section">
            <h2 className="section-title">Line Items</h2>
            
            <div className="line-items-table">
              <div className="table-header">
                <div className="table-cell description-col">DESCRIPTION</div>
                <div className="table-cell qty-col">QTY</div>
                <div className="table-cell price-col">UNIT PRICE</div>
                <div className="table-cell tax-col">TAX</div>
                <div className="table-cell total-col">TOTAL</div>
              </div>
              
              <div className="table-body">
                <div className="table-row">
                  <div className="table-cell description-col">Professional Services – Q1 2026</div>
                  <div className="table-cell qty-col">1</div>
                  <div className="table-cell price-col">$50,000</div>
                  <div className="table-cell tax-col">0%</div>
                  <div className="table-cell total-col">$50,000</div>
                </div>
              </div>
            </div>

            <div className="invoice-totals">
              <div className="totals-row">
                <span className="totals-label">Subtotal</span>
                <span className="totals-value">$50,000</span>
              </div>
              <div className="totals-row">
                <span className="totals-label">Tax</span>
                <span className="totals-value">$0</span>
              </div>
              <div className="totals-row total">
                <span className="totals-label">Total</span>
                <span className="totals-value">$50,000</span>
              </div>
              <div className="totals-row">
                <span className="totals-label">Paid</span>
                <span className="totals-value paid">$0</span>
              </div>
              <div className="totals-row balance">
                <span className="totals-label">Balance Due</span>
                <span className="totals-value balance-due">$50,000</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {showLogoutModal && (
        <LogoutConfirmModal
          onClose={handleCloseLogoutModal}
          onConfirm={handleConfirmLogout}
        />
      )}
    </div>
  );
}
