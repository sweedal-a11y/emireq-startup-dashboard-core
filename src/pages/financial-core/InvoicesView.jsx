import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './InvoicesView.css';

export default function InvoicesView({ isDarkMode }) {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedStatus, setSelectedStatus] = useState('All');
  const [selectedCustomer, setSelectedCustomer] = useState('All');
  const [selectedDateRange, setSelectedDateRange] = useState('All Time');
  const [selectedCurrency, setSelectedCurrency] = useState('All');
  const [currentPage, setCurrentPage] = useState(1);

  // Reset to page 1 when filters change
  useEffect(() => {
    setCurrentPage(1);
  }, [searchQuery, selectedStatus, selectedCustomer, selectedDateRange, selectedCurrency]);

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

  // Filter invoices based on search and filters
  const filteredInvoices = invoices.filter(invoice => {
    // Search filter
    const matchesSearch = searchQuery === '' || 
      invoice.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      invoice.customer.toLowerCase().includes(searchQuery.toLowerCase());

    // Status filter
    const matchesStatus = selectedStatus === 'All' || invoice.status === selectedStatus;

    // Customer filter
    const matchesCustomer = selectedCustomer === 'All' || invoice.customer === selectedCustomer;

    // Currency filter (extract currency from amount string)
    const invoiceCurrency = invoice.amount.split(' ')[0];
    const matchesCurrency = selectedCurrency === 'All' || invoiceCurrency === selectedCurrency;

    return matchesSearch && matchesStatus && matchesCustomer && matchesCurrency;
  });

  const totalResults = filteredInvoices.length;
  const resultsPerPage = 5;
  const totalPages = Math.ceil(totalResults / resultsPerPage);

  // Paginate the filtered results
  const startIndex = (currentPage - 1) * resultsPerPage;
  const endIndex = startIndex + resultsPerPage;
  const paginatedInvoices = filteredInvoices.slice(startIndex, endIndex);

  const handleCreateInvoice = () => {
    // TODO: Implement create invoice functionality
    console.log('Create Invoice clicked');
  };

  const handleViewInvoice = (invoiceId) => {
    navigate(`/financial-core/invoices/${invoiceId}`);
  };

  const handleEditInvoice = (invoiceId, e) => {
    e.stopPropagation(); // Prevent row click
    // TODO: Implement edit invoice functionality
    console.log('Edit invoice:', invoiceId);
  };

  const handleSendInvoice = (invoiceId, e) => {
    e.stopPropagation(); // Prevent row click
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
        <div className="search-box-full">
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M9.16675 15.8333C12.8486 15.8333 15.8334 12.8486 15.8334 9.16667C15.8334 5.48477 12.8486 2.5 9.16675 2.5C5.48485 2.5 2.50008 5.48477 2.50008 9.16667C2.50008 12.8486 5.48485 15.8333 9.16675 15.8333Z" stroke="currentColor" strokeWidth="1.12943" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M17.5001 17.5L13.8751 13.875" stroke="currentColor" strokeWidth="1.12943" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
          <input 
            type="text" 
            placeholder="Search Invoices" 
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>

        <div className="filter-dropdowns">
          <select 
            className="filter-dropdown"
            value={selectedStatus}
            onChange={(e) => setSelectedStatus(e.target.value)}
          >
            <option value="All">Status</option>
            <option value="Paid">Paid</option>
            <option value="Overdue">Overdue</option>
            <option value="Partial">Partial</option>
            <option value="Active">Active</option>
            <option value="Draft">Draft</option>
          </select>

          <select 
            className="filter-dropdown"
            value={selectedCustomer}
            onChange={(e) => setSelectedCustomer(e.target.value)}
          >
            <option value="All">Customer</option>
            <option value="Acme Corporation">Acme Corporation</option>
            <option value="TechStart Inc">TechStart Inc</option>
            <option value="Global Solutions Ltd">Global Solutions Ltd</option>
            <option value="Retail Partners Co">Retail Partners Co</option>
          </select>

          <select 
            className="filter-dropdown"
            value={selectedDateRange}
            onChange={(e) => setSelectedDateRange(e.target.value)}
          >
            <option value="All Time">Date Range</option>
            <option value="Today">Today</option>
            <option value="Last 7 Days">Last 7 Days</option>
            <option value="Last 30 Days">Last 30 Days</option>
            <option value="This Month">This Month</option>
            <option value="Last Month">Last Month</option>
            <option value="This Quarter">This Quarter</option>
            <option value="This Year">This Year</option>
          </select>

          <select 
            className="filter-dropdown"
            value={selectedCurrency}
            onChange={(e) => setSelectedCurrency(e.target.value)}
          >
            <option value="All">Currency</option>
            <option value="USD">USD</option>
            <option value="EUR">EUR</option>
            <option value="GBP">GBP</option>
            <option value="INR">INR</option>
          </select>
        </div>
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
            {paginatedInvoices.length > 0 ? (
              paginatedInvoices.map((invoice) => (
                <tr key={invoice.id} onClick={() => handleViewInvoice(invoice.id)} style={{ cursor: 'pointer' }}>
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
                      onClick={(e) => {
                        e.stopPropagation();
                        handleViewInvoice(invoice.id);
                      }}
                      title="View Invoice"
                    >
                      <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M0.833374 9.99935C0.833374 9.99935 4.16671 3.33268 10 3.33268C15.8334 3.33268 19.1667 9.99935 19.1667 9.99935C19.1667 9.99935 15.8334 16.666 10 16.666C4.16671 16.666 0.833374 9.99935 0.833374 9.99935Z" stroke="#6B7280" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                        <path d="M10 12.5C11.3807 12.5 12.5 11.3807 12.5 10C12.5 8.61929 11.3807 7.5 10 7.5C8.61929 7.5 7.5 8.61929 7.5 10C7.5 11.3807 8.61929 12.5 10 12.5Z" stroke="#6B7280" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                    </button>
                    <button 
                      className="action-btn edit-btn" 
                      onClick={(e) => handleEditInvoice(invoice.id, e)}
                      title="Edit Invoice"
                    >
                      <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M8 2H3.33333C2.97971 2 2.64057 2.14048 2.39052 2.39052C2.14048 2.64057 2 2.97971 2 3.33333V12.6667C2 13.0203 2.14048 13.3594 2.39052 13.6095C2.64057 13.8595 2.97971 14 3.33333 14H12.6667C13.0203 14 13.3594 13.8595 13.6095 13.6095C13.8595 13.3594 14 13.0203 14 12.6667V8" stroke="#6A7282" stroke-width="1.33333" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M12.2504 1.75015C12.5156 1.48493 12.8753 1.33594 13.2504 1.33594C13.6255 1.33594 13.9852 1.48493 14.2504 1.75015C14.5156 2.01537 14.6646 2.37508 14.6646 2.75015C14.6646 3.12522 14.5156 3.48493 14.2504 3.75015L8.24172 9.75948C8.08342 9.91765 7.88786 10.0334 7.67305 10.0962L5.75772 10.6562C5.70036 10.6729 5.63955 10.6739 5.58166 10.6591C5.52377 10.6442 5.47094 10.6141 5.42869 10.5719C5.38643 10.5296 5.35631 10.4768 5.34148 10.4189C5.32665 10.361 5.32766 10.3002 5.34439 10.2428L5.90439 8.32748C5.96741 8.11285 6.08341 7.91752 6.24172 7.75948L12.2504 1.75015Z" stroke="#6A7282" stroke-width="1.33333" stroke-linecap="round" stroke-linejoin="round"/>
</svg>

                    </button>
                    <button 
                      className="action-btn send-btn" 
                      onClick={(e) => handleSendInvoice(invoice.id, e)}
                      title="Send Invoice"
                    >
                      <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M18.3334 1.66602L9.16671 10.8327" stroke="#6B7280" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                        <path d="M18.3334 1.66602L12.5 18.3327L9.16671 10.8327L1.66671 7.49935L18.3334 1.66602Z" stroke="#6B7280" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="8" style={{ textAlign: 'center', padding: '40px', color: '#6B7280' }}>
                  No invoices found matching your criteria
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="table-pagination">
        <div className="pagination-info">
          Showing <span className="pagination-number">{String(Math.min(paginatedInvoices.length, resultsPerPage)).padStart(2, '0')}</span> / {totalResults} Results
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
