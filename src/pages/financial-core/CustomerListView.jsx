import React, { useState } from 'react';
import './CustomerListView.css';

export default function CustomerListView({ onSelectCustomer, isDarkMode, tabs, activeTab, onTabChange }) {
  const [searchQuery, setSearchQuery] = useState('');
  const [typeFilter, setTypeFilter] = useState('all');
  const [currencyFilter, setCurrencyFilter] = useState('all');
  const [balanceFilter, setBalanceFilter] = useState('all');
  const [currentPage, setCurrentPage] = useState(1);
  const [showAddCustomer, setShowAddCustomer] = useState(false);

  const customers = [
    {
      id: 'CUST-001',
      company: 'Acme Corporation',
      email: 'billing@acme.com',
      type: 'Enterprise',
      currency: 'USD',
      totalOutstanding: '$250',
      overdueBalance: '$250',
      creditLimit: '$500,000',
      paymentTerms: 'Net 30',
      status: 'Active',
      billingAddress: '123 Business St, Suite 100, New York, NY',
      taxId: 'XX-XXXXXXX',
      salesOwner: 'John Smith'
    },
    {
      id: 'CUST-002',
      company: 'TechStart Inc',
      email: 'accounts@techstart.com',
      type: 'SMB',
      currency: 'USD',
      totalOutstanding: '$250',
      overdueBalance: '$0',
      creditLimit: '$150,000',
      paymentTerms: 'Net 15',
      status: 'Active',
      billingAddress: '456 Tech Ave, San Francisco, CA',
      taxId: 'YY-YYYYYYY',
      salesOwner: 'Sarah Johnson'
    },
    {
      id: 'CUST-003',
      company: 'Global Solutions Ltd',
      email: 'finance@globalsolutions.com',
      type: 'Enterprise',
      currency: 'EUR',
      totalOutstanding: '$250',
      overdueBalance: '$250',
      creditLimit: '$750,000',
      paymentTerms: 'Net 45',
      status: 'Active',
      billingAddress: '789 Global Plaza, London, UK',
      taxId: 'ZZ-ZZZZZZZ',
      salesOwner: 'Michael Brown'
    },
    {
      id: 'CUST-004',
      company: 'Retail Partners Co',
      email: 'ap@retailpartners.com',
      type: 'Mid-Market',
      currency: 'USD',
      totalOutstanding: '$250',
      overdueBalance: '$250',
      creditLimit: '$300,000',
      paymentTerms: 'Net 30',
      status: 'Active',
      billingAddress: '321 Retail Blvd, Chicago, IL',
      taxId: 'AA-AAAAAAA',
      salesOwner: 'Emily Davis'
    },
    {
      id: 'CUST-005',
      company: 'Innovation Labs',
      email: 'billing@innovationlabs.com',
      type: 'SMB',
      currency: 'USD',
      totalOutstanding: '$250',
      overdueBalance: '$0',
      creditLimit: '$200,000',
      paymentTerms: 'Net 30',
      status: 'Active',
      billingAddress: '555 Innovation Dr, Austin, TX',
      taxId: 'BB-BBBBBBB',
      salesOwner: 'David Wilson'
    }
  ];

  // Filter customers based on search and filters
  const filteredCustomers = customers.filter(customer => {
    const matchesSearch = customer.company.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         customer.id.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesType = typeFilter === 'all' || customer.type === typeFilter;
    const matchesCurrency = currencyFilter === 'all' || customer.currency === currencyFilter;
    const matchesBalance = balanceFilter === 'all' || 
                          (balanceFilter === 'Outstanding' && customer.totalOutstanding !== '$0') ||
                          (balanceFilter === 'Overdue' && customer.overdueBalance !== '$0');
    
    return matchesSearch && matchesType && matchesCurrency && matchesBalance;
  });

  return (
    <div className={`customer-list-view ${isDarkMode ? 'dark-mode' : ''}`}>
      {showAddCustomer && (
        <div className="modal-overlay" onClick={() => setShowAddCustomer(false)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h3>Add New Customer</h3>
              <button className="modal-close" onClick={() => setShowAddCustomer(false)}>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M18 6L6 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M6 6L18 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </button>
            </div>
            <div className="modal-body">
              <form className="customer-form">
                <div className="form-group">
                  <label>Company Name</label>
                  <input type="text" placeholder="Enter company name" />
                </div>
                <div className="form-group">
                  <label>Customer Type</label>
                  <select>
                    <option value="">Select type</option>
                    <option value="Enterprise">Enterprise</option>
                    <option value="SMB">SMB</option>
                    <option value="Mid-Market">Mid-Market</option>
                  </select>
                </div>
                <div className="form-group">
                  <label>Currency</label>
                  <select>
                    <option value="">Select currency</option>
                    <option value="USD">USD</option>
                    <option value="EUR">EUR</option>
                    <option value="GBP">GBP</option>
                  </select>
                </div>
                <div className="form-group">
                  <label>Payment Terms</label>
                  <select>
                    <option value="">Select payment terms</option>
                    <option value="Net 15">Net 15</option>
                    <option value="Net 30">Net 30</option>
                    <option value="Net 45">Net 45</option>
                    <option value="Net 60">Net 60</option>
                  </select>
                </div>
                <div className="form-actions">
                  <button type="button" className="btn-cancel" onClick={() => setShowAddCustomer(false)}>
                    Cancel
                  </button>
                  <button type="submit" className="btn-submit">
                    Add Customer
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
      <div className="customer-list-header">
        <div className="customer-list-title">
          <h2>Sales ( Accounts Receivable)</h2>
          <p>Real-time accounts receivable monitoring and management</p>
        </div>
        <button className="btn-add-customer" onClick={() => setShowAddCustomer(true)}>
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M3 8H13" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M8 3V13" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
          Add Customer
        </button>
      </div>

      {/* Tabs below header */}
      {tabs && (
        <div className="customer-tabs">
          {tabs.map(tab => (
            <button
              key={tab.id}
              className={`customer-tab ${activeTab === tab.id ? 'active' : ''}`}
              onClick={() => onTabChange(tab.id)}
            >
              {tab.label}
            </button>
          ))}
        </div>
      )}

      

      <div className="customer-table-container">
        <div className="customer-table-header">
          <div className="header-title-section">
            <h3>Customers</h3>
            <svg className="info-icon" width="24" height="24" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
              <circle cx="7.91351" cy="7.91351" r="7.91351" fill="#AFAFAF"/>
              <path fill-rule="evenodd" clip-rule="evenodd" d="M9.20408 5.18474C9.32773 4.96836 9.39728 4.7172 9.39728 4.45058C9.39728 3.63141 8.73267 2.9668 7.9135 2.9668C7.09433 2.9668 6.42971 3.63141 6.42971 4.45058C6.42971 5.26975 7.09433 5.93436 7.9135 5.93436C8.46605 5.93436 8.94906 5.63297 9.20408 5.18474ZM6.92431 6.92355H7.4189H8.40809C8.95485 6.92355 9.39728 7.36598 9.39728 7.91274V8.90193V12.8587C9.39728 13.4054 8.95485 13.8479 8.40809 13.8479C7.86133 13.8479 7.4189 13.4054 7.4189 12.8587V9.64382C7.4189 9.23424 7.0866 8.90193 6.67701 8.90193C6.26743 8.90193 5.93512 8.56963 5.93512 8.16004V7.91274C5.93512 7.56498 6.1148 7.25779 6.38528 7.08198C6.53984 6.98151 6.72531 6.92355 6.92431 6.92355Z" fill="white"/>
            </svg>
          </div>
          <p className="header-subtitle">Manage customer accounts and credit terms</p>
        </div>

        <div className="table-controls">
          <div className="search-box-full">
            <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M8.25 14.25C11.5637 14.25 14.25 11.5637 14.25 8.25C14.25 4.93629 11.5637 2.25 8.25 2.25C4.93629 2.25 2.25 4.93629 2.25 8.25C2.25 11.5637 4.93629 14.25 8.25 14.25Z" stroke="#667085" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M15.75 15.75L12.4875 12.4875" stroke="#667085" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            <input 
              type="text" 
              placeholder="Search by customer name" 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <div className="filter-dropdowns">
            <select 
              className="filter-dropdown"
              value={typeFilter}
              onChange={(e) => setTypeFilter(e.target.value)}
            >
              <option value="all">Customer Type</option>
              <option value="Enterprise">Enterprise</option>
              <option value="SMB">SMB</option>
              <option value="Mid-Market">Mid-Market</option>
            </select>
            <select 
              className="filter-dropdown"
              value={currencyFilter}
              onChange={(e) => setCurrencyFilter(e.target.value)}
            >
              <option value="all">Currency</option>
              <option value="USD">USD</option>
              <option value="EUR">EUR</option>
              <option value="GBP">GBP</option>
            </select>
            <select 
              className="filter-dropdown"
              value={balanceFilter}
              onChange={(e) => setBalanceFilter(e.target.value)}
            >
              <option value="all">Balance Status</option>
              <option value="All">All</option>
              <option value="Outstanding">Outstanding</option>
              <option value="Overdue">Overdue</option>
            </select>
          </div>
        </div>

        <div className="customer-table-wrapper">
          <table className="customer-table">
            <thead>
              <tr>
                <th>CUSTOMER NAME</th>
                <th>TYPE</th>
                <th>CURRENCY</th>
                <th>OUTSTANDING</th>
                <th>OVERDUE</th>
                <th>PAYMENT TERMS</th>
                <th>STATUS</th>
                <th>ACTIONS</th>
              </tr>
            </thead>
            <tbody>
            {filteredCustomers.length === 0 ? (
              <tr>
                <td colSpan="8" style={{ textAlign: 'center', padding: '40px', color: '#667085' }}>
                  No customers found matching your filters
                </td>
              </tr>
            ) : (
              filteredCustomers.map((customer) => (
              <tr 
                key={customer.id} 
                className="customer-row"
                onClick={() => onSelectCustomer(customer)}
              >
                <td>
                  <div className="customer-info">
                    <div className="customer-name">{customer.company}</div>
                    <div className="customer-id">{customer.id}</div>
                  </div>
                </td>
                <td>
                  <span className={`type-badge ${customer.type.toLowerCase().replace('-', '')}`}>
                    {customer.type}
                  </span>
                </td>
                <td>
                  <div className="currency-cell">{customer.currency}</div>
                </td>
                <td>
                  <div className="amount-cell">{customer.totalOutstanding}</div>
                </td>
                <td>
                  <div className={`amount-cell ${customer.overdueBalance !== '$0' ? 'overdue' : ''}`}>
                    {customer.overdueBalance}
                  </div>
                </td>
                <td>
                  <div className="terms-cell">{customer.paymentTerms}</div>
                </td>
                <td>
                  <span className="status-badge active">
                    {customer.status}
                  </span>
                </td>
                <td>
                  <div className="action-buttons">
                    <button className="action-btn" title="View Details">
                      <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M1.5 9C1.5 9 3.75 4.5 9 4.5C14.25 4.5 16.5 9 16.5 9C16.5 9 14.25 13.5 9 13.5C3.75 13.5 1.5 9 1.5 9Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                        <path d="M9 11.25C10.2426 11.25 11.25 10.2426 11.25 9C11.25 7.75736 10.2426 6.75 9 6.75C7.75736 6.75 6.75 7.75736 6.75 9C6.75 10.2426 7.75736 11.25 9 11.25Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                    </button>
                    <button className="action-btn" title="Edit Customer">
                      <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M8.25 3H3C2.60218 3 2.22064 3.15804 1.93934 3.43934C1.65804 3.72064 1.5 4.10218 1.5 4.5V15C1.5 15.3978 1.65804 15.7794 1.93934 16.0607C2.22064 16.342 2.60218 16.5 3 16.5H13.5C13.8978 16.5 14.2794 16.342 14.5607 16.0607C14.842 15.7794 15 15.3978 15 15V9.75" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                        <path d="M13.875 1.87498C14.1734 1.57661 14.5776 1.40918 15 1.40918C15.4224 1.40918 15.8266 1.57661 16.125 1.87498C16.4234 2.17336 16.5908 2.57755 16.5908 2.99998C16.5908 3.42241 16.4234 3.8266 16.125 4.12498L9 11.25L6 12L6.75 9L13.875 1.87498Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                    </button>
                  </div>
                </td>
              </tr>
            )))}
          </tbody>
          </table>
        </div>
        <div className="table-pagination">
          <div className="pagination-info">
            Showing <span className="pagination-number">{String(filteredCustomers.length).padStart(2, '0')}</span> / {customers.length} Results
          </div>
          <div className="pagination-controls">
            <button 
              className="pagination-btn" 
              disabled={currentPage === 1}
              onClick={() => setCurrentPage(currentPage - 1)}
            >
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M10 12L6 8L10 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </button>
            <button 
              className={`pagination-number-btn ${currentPage === 1 ? 'active' : ''}`}
              onClick={() => setCurrentPage(1)}
            >
              1
            </button>
            <button 
              className={`pagination-number-btn ${currentPage === 2 ? 'active' : ''}`}
              onClick={() => setCurrentPage(2)}
            >
              2
            </button>
            <button 
              className={`pagination-number-btn ${currentPage === 3 ? 'active' : ''}`}
              onClick={() => setCurrentPage(3)}
            >
              3
            </button>
            <span className="pagination-dots">...</span>
            <button 
              className={`pagination-number-btn ${currentPage === 10 ? 'active' : ''}`}
              onClick={() => setCurrentPage(10)}
            >
              10
            </button>
            <button 
              className="pagination-btn"
              disabled={currentPage === 10}
              onClick={() => setCurrentPage(currentPage + 1)}
            >
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M6 4L10 8L6 12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </button>
          </div>
        </div>

        <div className="table-disclaimer">
          Market data is updated in real-time. Prices are for reference only and may vary across exchanges.
        </div>
      </div>
    </div>
  );
}
