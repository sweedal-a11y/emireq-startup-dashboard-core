import React, { useState } from 'react';
import './InvoicesView.css';

export default function InvoicesView({ isDarkMode }) {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedStatus, setSelectedStatus] = useState('All');
  const [selectedCustomer, setSelectedCustomer] = useState('All');
  const [selectedDateRange, setSelectedDateRange] = useState('All Time');
  const [selectedCurrency, setSelectedCurrency] = useState('All');
  const [currentPage, setCurrentPage] = useState(1);
  const [isStatusOpen, setIsStatusOpen] = useState(false);
  const [isCustomerOpen, setIsCustomerOpen] = useState(false);
  const [isDateRangeOpen, setIsDateRangeOpen] = useState(false);
  const [isCurrencyOpen, setIsCurrencyOpen] = useState(false);

  const statusOptions = ['All', 'Paid', 'Overdue', 'Partial', 'Active', 'Draft'];
  const customerOptions = ['All', 'Acme Corporation', 'TechStart Inc', 'Global Solutions Ltd', 'Retail Partners Co'];
  const dateRangeOptions = ['All Time', 'Today', 'Last 7 Days', 'Last 30 Days', 'This Month', 'Last Month', 'This Quarter', 'This Year'];
  const currencyOptions = ['All', 'USD', 'EUR', 'GBP', 'INR'];

  const invoices = [
    {
      id: 'INV-2026-001',
      customer: 'Acme Corporation',
      invoiceDate: '2026-01-15',
      dueDate: '2026-01-15',
      amount: 'USD 50,000',
      balanceDue: 'USD 50,000',
      status: 'Overdue',
      statusColor: 'overdue'
    },
    {
      id: 'INV-2026-002',
      customer: 'TechStart Inc',
      invoiceDate: '2026-01-15',
      dueDate: '2026-01-15',
      amount: 'USD 25,000',
      balanceDue: 'USD 0',
      status: 'Paid',
      statusColor: 'paid'
    },
    {
      id: 'INV-2026-003',
      customer: 'Acme Corporation',
      invoiceDate: '2026-01-15',
      dueDate: '2026-01-15',
      amount: 'USD 75,000',
      balanceDue: 'USD 50,000',
      status: 'Partial',
      statusColor: 'partial'
    },
    {
      id: 'INV-2026-004',
      customer: 'Global Solutions Ltd',
      invoiceDate: '2026-01-15',
      dueDate: '2026-01-15',
      amount: 'EUR 45,000',
      balanceDue: 'EUR 0',
      status: 'Active',
      statusColor: 'active'
    },
    {
      id: 'INV-2026-005',
      customer: 'Retail Partners Co',
      invoiceDate: '2026-01-15',
      dueDate: '2026-01-15',
      amount: 'USD 32,000',
      balanceDue: 'USD 50,000',
      status: 'Draft',
      statusColor: 'draft'
    }
  ];

  const totalResults = 50;
  const resultsPerPage = 5;
  const totalPages = Math.ceil(totalResults / resultsPerPage);

  const handleCreateInvoice = () => {
    // TODO: Implement create invoice functionality
    console.log('Create Invoice clicked');
  };

  const handleViewInvoice = (invoiceId) => {
    // TODO: Implement view invoice functionality
    console.log('View invoice:', invoiceId);
  };

  const handleEditInvoice = (invoiceId) => {
    // TODO: Implement edit invoice functionality
    console.log('Edit invoice:', invoiceId);
  };

  const handleSendInvoice = (invoiceId) => {
    // TODO: Implement send invoice functionality
    console.log('Send invoice:', invoiceId);
  };

  const handlePageChange = (page) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  const renderPageNumbers = () => {
    const pages = [];
    
    // Always show first page
    pages.push(
      <button
        key={1}
        className={`pagination-number-btn ${currentPage === 1 ? 'active' : ''}`}
        onClick={() => handlePageChange(1)}
      >
        1
      </button>
    );

    if (totalPages > 1) {
      // Show second page
      pages.push(
        <button
          key={2}
          className={`pagination-number-btn ${currentPage === 2 ? 'active' : ''}`}
          onClick={() => handlePageChange(2)}
        >
          2
        </button>
      );
    }

    if (totalPages > 2) {
      // Show third page
      pages.push(
        <button
          key={3}
          className={`pagination-number-btn ${currentPage === 3 ? 'active' : ''}`}
          onClick={() => handlePageChange(3)}
        >
          3
        </button>
      );
    }

    if (totalPages > 4) {
      // Show ellipsis
      pages.push(<span key="ellipsis" className="pagination-dots">...</span>);
    }

    if (totalPages > 3) {
      // Show last page
      pages.push(
        <button
          key={totalPages}
          className={`pagination-number-btn ${currentPage === totalPages ? 'active' : ''}`}
          onClick={() => handlePageChange(totalPages)}
        >
          {totalPages}
        </button>
      );
    }

    return pages;
  };

  return (
    <div className={`invoices-view ${isDarkMode ? 'dark-mode' : ''}`}>
      {/* Header */}
      <div className="invoices-header">
        <div className="invoices-header-left">
          <div className="invoices-title-row">
            <h1>Invoices</h1>
            <button className="info-icon-btn" title="Information about invoices">
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                <circle cx="7.91351" cy="7.91351" r="7.91351" fill="#AFAFAF"/>
                <path fillRule="evenodd" clipRule="evenodd" d="M9.20451 5.18474C9.32816 4.96836 9.39771 4.7172 9.39771 4.45058C9.39771 3.63141 8.7331 2.9668 7.91393 2.9668C7.09475 2.9668 6.43014 3.63141 6.43014 4.45058C6.43014 5.26975 7.09475 5.93436 7.91393 5.93436C8.46648 5.93436 8.94948 5.63297 9.20451 5.18474ZM6.92474 6.92355H7.41933H8.40852C8.95528 6.92355 9.39771 7.36598 9.39771 7.91274V8.90193V12.8587C9.39771 13.4054 8.95528 13.8479 8.40852 13.8479C7.86176 13.8479 7.41933 13.4054 7.41933 12.8587V9.64382C7.41933 9.23424 7.08702 8.90193 6.67744 8.90193C6.26785 8.90193 5.93555 8.56963 5.93555 8.16004V7.91274C5.93555 7.56498 6.11522 7.25779 6.38571 7.08198C6.54027 6.98151 6.72574 6.92355 6.92474 6.92355Z" fill="white"/>
              </svg>
            </button>
          </div>
          <p className="invoices-subtitle">Create and manage customer invoices</p>
        </div>
        <button className="create-invoice-btn" onClick={handleCreateInvoice}>
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M10 4.16602V15.8327" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M4.16669 10H15.8334" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
          Create Invoice
        </button>
      </div>

      {/* Search and Filters */}
      <div className="invoices-filters">
        
      </div>

      {/* Invoices Table */}
      <div className="invoices-table-container">
        <table className="invoices-table">
          <thead>
            <tr>
              <th>INVOICE NO</th>
              <th>CUSTOMER</th>
              <th>INVOICE DATE</th>
              <th>DUE DATE</th>
              <th>AMOUNT</th>
              <th>BALANCE DUE</th>
              <th>STATUS</th>
              <th>ACTIONS</th>
            </tr>
          </thead>
          <tbody>
            {invoices.map((invoice) => (
              <tr key={invoice.id}>
                <td className="invoice-no">{invoice.id}</td>
                <td className="customer-name">{invoice.customer}</td>
                <td className="invoice-date">{invoice.invoiceDate}</td>
                <td className="due-date">{invoice.dueDate}</td>
                <td className="amount">{invoice.amount}</td>
                <td className={`balance-due ${invoice.statusColor === 'paid' || invoice.statusColor === 'active' ? 'paid' : 'unpaid'}`}>
                  {invoice.balanceDue}
                </td>
                <td>
                  <span className={`status-badge ${invoice.statusColor}`}>
                    {invoice.status}
                  </span>
                </td>
                <td className="actions">
                  <button 
                    className="action-btn view-btn" 
                    onClick={() => handleViewInvoice(invoice.id)}
                    title="View Invoice"
                  >
                    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M0.833374 9.99935C0.833374 9.99935 4.16671 3.33268 10 3.33268C15.8334 3.33268 19.1667 9.99935 19.1667 9.99935C19.1667 9.99935 15.8334 16.666 10 16.666C4.16671 16.666 0.833374 9.99935 0.833374 9.99935Z" stroke="#6B7280" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                      <path d="M10 12.5C11.3807 12.5 12.5 11.3807 12.5 10C12.5 8.61929 11.3807 7.5 10 7.5C8.61929 7.5 7.5 8.61929 7.5 10C7.5 11.3807 8.61929 12.5 10 12.5Z" stroke="#6B7280" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </button>
                  <button 
                    className="action-btn edit-btn" 
                    onClick={() => handleEditInvoice(invoice.id)}
                    title="Edit Invoice"
                  >
                    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M14.1667 2.49993C14.3855 2.28106 14.6454 2.10744 14.9314 1.98899C15.2173 1.87054 15.5238 1.80957 15.8334 1.80957C16.1429 1.80957 16.4494 1.87054 16.7353 1.98899C17.0213 2.10744 17.2812 2.28106 17.5 2.49993C17.7189 2.7188 17.8925 2.97863 18.011 3.2646C18.1294 3.55057 18.1904 3.85706 18.1904 4.16659C18.1904 4.47612 18.1294 4.78262 18.011 5.06859C17.8925 5.35455 17.7189 5.61439 17.5 5.83326L6.25004 17.0833L1.66671 18.3333L2.91671 13.7499L14.1667 2.49993Z" stroke="#6B7280" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </button>
                  <button 
                    className="action-btn send-btn" 
                    onClick={() => handleSendInvoice(invoice.id)}
                    title="Send Invoice"
                  >
                    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M18.3334 1.66602L9.16671 10.8327" stroke="#6B7280" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                      <path d="M18.3334 1.66602L12.5 18.3327L9.16671 10.8327L1.66671 7.49935L18.3334 1.66602Z" stroke="#6B7280" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="table-pagination">
        <div className="pagination-info">
          Showing <span className="pagination-number">{String(resultsPerPage).padStart(2, '0')}</span> / {totalResults} Results
        </div>
        <div className="pagination-controls">
          <button
            className="pagination-btn"
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
          >
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M12.5 15L7.5 10L12.5 5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </button>
          
          {renderPageNumbers()}
          
          <button
            className="pagination-btn"
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
          >
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M7.5 15L12.5 10L7.5 5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </button>
        </div>
      </div>

      {/* Footer Note */}
      <div className="invoices-footer-note">
        Market data is updated in real-time. Prices are for reference only and may vary across exchanges.
      </div>
    </div>
  );
}
