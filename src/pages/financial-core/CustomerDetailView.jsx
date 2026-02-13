import React, { useState } from 'react';
import './CustomerDetailView.css';

const getInitials = (name = '') => {
  const parts = name.trim().split(/\s+/);
  if (!parts.length) return '';
  return parts.map((part) => part[0]).join('').slice(0, 2).toUpperCase();
};

export default function CustomerDetailView({ customer, onBack, isDarkMode }) {
  const [activeTab, setActiveTab] = useState('overview');

  const tabs = [
    { id: 'overview', label: 'Overview' },
    { id: 'invoices', label: 'Invoices' },
    { id: 'payments', label: 'Payments' },
    { id: 'activity', label: 'Activity Log' }
  ];

  const invoices = [
    {
      id: 'INV-2026-001',
      invoiceDate: '2026-01-15',
      dueDate: '2026-02-14',
      amount: 'USD 50,000',
      balanceDue: 'USD 50,000',
      status: 'overdue'
    },
    {
      id: 'INV-2026-002',
      invoiceDate: '2026-01-25',
      dueDate: '2026-02-24',
      amount: 'USD 75,000',
      balanceDue: 'USD 35,000',
      status: 'pending'
    }
  ];

  const payments = [
    {
      id: 'PAY-002',
      paymentDate: '2026-02-02',
      amount: '$40,000',
      method: 'ACH',
      status: 'allocated'
    }
  ];

  const activityLog = [
    {
      id: 1,
      type: 'payment',
      icon: 'dollar',
      title: 'Payment Received',
      description: 'Payment of $40,000 recorded for Acme Corporation',
      user: 'System',
      timestamp: '2026-02-02',
      time: '10:30 AM'
    },
    {
      id: 2,
      type: 'invoice',
      icon: 'file',
      title: 'Invoice Sent',
      description: 'Invoice sent to billing@acme.com',
      user: 'John Smith',
      timestamp: '2026-02-01',
      time: '02:15 PM'
    },
    {
      id: 3,
      type: 'update',
      icon: 'edit',
      title: 'Customer Updated',
      description: 'Credit limit increased to $500,000',
      user: 'Sarah Johnson',
      timestamp: '2026-01-30',
      time: '11:45 AM'
    },
    {
      id: 4,
      type: 'reminder',
      icon: 'bell',
      title: 'Payment Reminder Sent',
      description: 'Automated reminder sent for overdue invoice',
      user: 'System',
      timestamp: '2026-01-28',
      time: '09:20 AM'
    },
    {
      id: 5,
      type: 'invoice',
      icon: 'file',
      title: 'Invoice Created',
      description: 'New invoice created for $75,000',
      user: 'John Smith',
      timestamp: '2026-01-25',
      time: '03:30 PM'
    },
    {
      id: 6,
      type: 'note',
      icon: 'note',
      title: 'Customer Note Added',
      description: 'Preferred payment method: Wire Transfer',
      user: 'John Smith',
      timestamp: '2026-01-20',
      time: '01:00 PM'
    }
  ];

  return (
    <div className="customer-detail-view">
      {/* Back button */}
      <button className="back-button" onClick={onBack}>
        <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M12.5 15L7.5 10L12.5 5" stroke="currentColor" strokeWidth="1.67" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
        Back to Customers
      </button>

      {/* Customer header and stats container */}
      <div className="customer-info-container">
        {/* Customer header */}
        <div className="customer-header">
          <div className="customer-title-section">
            <h1>{customer.company}</h1>
            <p className="customer-subtitle">{customer.id} • {customer.email}</p>
          </div>
          <div className="customer-actions">
            <button className="btn-secondary">
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M7.33334 2.66667H2.66667C2.31305 2.66667 1.97391 2.80714 1.72386 3.05719C1.47381 3.30724 1.33334 3.64638 1.33334 4V13.3333C1.33334 13.687 1.47381 14.0261 1.72386 14.2761C1.97391 14.5262 2.31305 14.6667 2.66667 14.6667H12C12.3536 14.6667 12.6928 14.5262 12.9428 14.2761C13.1929 14.0261 13.3333 13.687 13.3333 13.3333V8.66667" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M12.3333 1.66665C12.5986 1.40144 12.9582 1.25244 13.3333 1.25244C13.7085 1.25244 14.0681 1.40144 14.3333 1.66665C14.5985 1.93187 14.7475 2.29158 14.7475 2.66665C14.7475 3.04173 14.5985 3.40144 14.3333 3.66665L8.00001 9.99999L5.33334 10.6667L6.00001 7.99999L12.3333 1.66665Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
              Edit
            </button>
            <button className="btn-primary">
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M8 3.33398V12.6673" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M3.33334 8H12.6667" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
              Create Invoice
            </button>
          </div>
        </div>

        {/* Customer stats */}
        <div className="customer-stats">
          <div className="stat-box">
            <div className="stat-label">Total Outstanding</div>
            <div className="stat-value-large">{customer.totalOutstanding}</div>
          </div>
          <div className="stat-box">
            <div className="stat-label">Overdue Balance</div>
            <div className="stat-value-large overdue">{customer.overdueBalance}</div>
          </div>
          <div className="stat-box">
            <div className="stat-label">Credit Limit</div>
            <div className="stat-value-large">{customer.creditLimit}</div>
          </div>
          <div className="stat-box">
            <div className="stat-label">Payment Terms</div>
            <div className="stat-value-large">{customer.paymentTerms}</div>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="customer-tabs">
        {tabs.map(tab => (
          <button
            key={tab.id}
            className={`customer-tab ${activeTab === tab.id ? 'active' : ''}`}
            onClick={() => setActiveTab(tab.id)}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Tab content */}
      <div className="customer-tab-content">
        {activeTab === 'overview' && (
          <div className="overview-content">
            <div className="overview-grid">
              <div className="info-card">
                <h3 className="info-card-title">Customer Information</h3>
                <div className="info-rows">
                  <div className="info-row">
                    <span className="info-label">Customer Type</span>
                    <span className="info-value">{customer.type || 'Enterprise'}</span>
                  </div>
                  <div className="info-row">
                    <span className="info-label">Default Currency</span>
                    <span className="info-value">{customer.currency || 'USD'}</span>
                  </div>
                  <div className="info-row">
                    <span className="info-label">Payment Terms</span>
                    <span className="info-value">{customer.paymentTerms || 'Net 30'}</span>
                  </div>
                  <div className="info-row">
                    <span className="info-label">Credit Limit</span>
                    <span className="info-value">{customer.creditLimit || '$500,000'}</span>
                  </div>
                  <div className="info-row">
                    <span className="info-label">Status</span>
                    <span className="info-value">
                      <span className="status-badge-inline active">{customer.status || 'Active'}</span>
                    </span>
                  </div>
                </div>
              </div>
              
              <div className="info-card">
                <h3 className="info-card-title">Contact Information</h3>
                <div className="info-rows">
                  <div className="info-row">
                    <span className="info-label">Email</span>
                    <span className="info-value">{customer.email || 'billing@acme.com'}</span>
                  </div>
                  <div className="info-row">
                    <span className="info-label">Billing Address</span>
                    <span className="info-value">{customer.billingAddress || '123 Business St, Suite 100'}</span>
                  </div>
                  <div className="info-row">
                    <span className="info-label">Tax ID</span>
                    <span className="info-value">{customer.taxId || 'XX-XXXXXXX'}</span>
                  </div>
                  <div className="info-row">
                    <span className="info-label">Sales Owner</span>
                    <span className="info-value">{customer.salesOwner || 'John Smith'}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'invoices' && (
          <div className="invoices-content">
            <div className="invoices-section">
              <div className="section-header-row">
                <div className="section-title-block">
                  <h3>Customer Invoices</h3>
                  <p className="section-subtitle">2 invoices • Total: $125,000</p>
                </div>
                <button className="btn-primary">
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M8 3.33398V12.6673" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                    <path d="M3.33334 8H12.6667" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                  New Invoice
                </button>
              </div>

              <div className="invoice-table-wrapper">
                <table className="detail-table">
                  <thead>
                    <tr>
                      <th>INVOICE NO</th>
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
                        <td>
                          <div className="invoice-number">{invoice.id}</div>
                        </td>
                        <td>{invoice.invoiceDate}</td>
                        <td>{invoice.dueDate}</td>
                        <td>
                          <div className="amount-value">{invoice.amount}</div>
                        </td>
                        <td>
                          <div className={`amount-value ${invoice.status === 'overdue' ? 'overdue' : ''}`}>
                            {invoice.balanceDue}
                          </div>
                        </td>
                        <td>
                          <span className={`status-badge-detail ${invoice.status}`}>
                            {invoice.status === 'overdue' ? 'Overdue' : 'Pending'}
                          </span>
                        </td>
                        <td>
                          <div className="action-icons">
                            <button className="icon-btn" title="View">
                              <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M1.33334 8C1.33334 8 3.33334 3.33333 8.00001 3.33333C12.6667 3.33333 14.6667 8 14.6667 8C14.6667 8 12.6667 12.6667 8.00001 12.6667C3.33334 12.6667 1.33334 8 1.33334 8Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                                <path d="M8 10C9.10457 10 10 9.10457 10 8C10 6.89543 9.10457 6 8 6C6.89543 6 6 6.89543 6 8C6 9.10457 6.89543 10 8 10Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                              </svg>
                            </button>
                            <button className="icon-btn" title="Edit">
                              <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M7.33334 2.66667H2.66667C2.31305 2.66667 1.97391 2.80714 1.72386 3.05719C1.47381 3.30724 1.33334 3.64638 1.33334 4V13.3333C1.33334 13.687 1.47381 14.0261 1.72386 14.2761C1.97391 14.5262 2.31305 14.6667 2.66667 14.6667H12C12.3536 14.6667 12.6928 14.5262 12.9428 14.2761C13.1929 14.0261 13.3333 13.687 13.3333 13.3333V8.66667" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                                <path d="M12.3333 1.66665C12.5986 1.40144 12.9582 1.25244 13.3333 1.25244C13.7085 1.25244 14.0681 1.40144 14.3333 1.66665C14.5985 1.93187 14.7475 2.29158 14.7475 2.66665C14.7475 3.04173 14.5985 3.40144 14.3333 3.66665L8.00001 9.99999L5.33334 10.6667L6.00001 7.99999L12.3333 1.66665Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                              </svg>
                            </button>
                            <button className="icon-btn" title="Send">
                              <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M14.6667 2L7.33334 9.33333" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                                <path d="M14.6667 2L10 14L7.33333 9.33333L2.66666 6.66667L14.6667 2Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                              </svg>
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'payments' && (
          <div className="payments-content">
            <div className="payments-section">
              <div className="section-header-row">
                <div className="section-title-block">
                  <h3>Payment History</h3>
                  <p className="section-subtitle">1 payment • Total: $40,000</p>
                </div>
                <button className="btn-primary">
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M8 3.33398V12.6673" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                    <path d="M3.33334 8H12.6667" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                  Record Payment
                </button>
              </div>

              <div className="payment-table-wrapper">
                <table className="detail-table">
                  <thead>
                    <tr>
                      <th>PAYMENT ID</th>
                      <th>PAYMENT DATE</th>
                      <th>AMOUNT</th>
                      <th>METHOD</th>
                      <th>STATUS</th>
                      <th>ACTIONS</th>
                    </tr>
                  </thead>
                  <tbody>
                    {payments.map((payment) => (
                      <tr key={payment.id}>
                        <td>
                          <div className="payment-id">{payment.id}</div>
                        </td>
                        <td>{payment.paymentDate}</td>
                        <td>
                          <div className="amount-value">{payment.amount}</div>
                        </td>
                        <td>{payment.method}</td>
                        <td>
                          <span className="status-badge-detail allocated">
                            {payment.status.charAt(0).toUpperCase() + payment.status.slice(1)}
                          </span>
                        </td>
                        <td>
                          <div className="action-icons">
                            <button className="icon-btn" title="View">
                              <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M1.33334 8C1.33334 8 3.33334 3.33333 8.00001 3.33333C12.6667 3.33333 14.6667 8 14.6667 8C14.6667 8 12.6667 12.6667 8.00001 12.6667C3.33334 12.6667 1.33334 8 1.33334 8Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                                <path d="M8 10C9.10457 10 10 9.10457 10 8C10 6.89543 9.10457 6 8 6C6.89543 6 6 6.89543 6 8C6 9.10457 6.89543 10 8 10Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                              </svg>
                            </button>
                            <button className="icon-btn" title="Download">
                              <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M14 10V12.6667C14 13.0203 13.8595 13.3594 13.6095 13.6095C13.3594 13.8595 13.0203 14 12.6667 14H3.33333C2.97971 14 2.64057 13.8595 2.39052 13.6095C2.14048 13.3594 2 13.0203 2 12.6667V10" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                                <path d="M4.66666 6.66667L8 10L11.3333 6.66667" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                                <path d="M8 10V2" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                              </svg>
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'activity' && (
          <div className="activity-content">
            <div className="activity-section">
              <div className="section-header-row">
                <div className="section-title-block">
                  <h3>Activity Log</h3>
                  <p className="section-subtitle">Recent activities and changes for this customer</p>
                </div>
                <button className="btn-secondary">
                 <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
<g clip-path="url(#clip0_272_1925)">
<path d="M6.66708 13.3333C6.66702 13.4572 6.70148 13.5787 6.7666 13.6841C6.83172 13.7895 6.92492 13.8746 7.03574 13.93L8.36908 14.5967C8.47074 14.6475 8.58371 14.6714 8.69724 14.6663C8.81077 14.6612 8.92111 14.6271 9.01776 14.5673C9.11442 14.5075 9.19419 14.424 9.24949 14.3247C9.30479 14.2254 9.3338 14.1137 9.33374 14V9.33333C9.33389 9.00292 9.45672 8.68433 9.67841 8.43933L14.4937 3.11333C14.5801 3.01771 14.6368 2.89912 14.6571 2.77192C14.6775 2.64472 14.6605 2.51435 14.6083 2.39658C14.5562 2.27881 14.471 2.17868 14.3631 2.1083C14.2552 2.03792 14.1292 2.0003 14.0004 2H2.00041C1.87148 2.00005 1.74533 2.03748 1.63724 2.10776C1.52915 2.17804 1.44376 2.27815 1.39141 2.39598C1.33906 2.5138 1.322 2.64427 1.34229 2.77159C1.36259 2.89892 1.41936 3.01762 1.50574 3.11333L6.32241 8.43933C6.5441 8.68433 6.66693 9.00292 6.66708 9.33333V13.3333Z" stroke="#0A0A0A" stroke-width="1.33333" stroke-linecap="round" stroke-linejoin="round"/>
</g>
<defs>
<clipPath id="clip0_272_1925">
<rect width="16" height="16" fill="white"/>
</clipPath>
</defs>
</svg>

                  Filter
                </button>
              </div>

              <div className="activity-timeline">
                {activityLog.map((activity) => (
                  <div key={activity.id} className={`activity-entry ${activity.type}`}>
                    <div className={`activity-icon-wrapper ${activity.type}`}>
                      {activity.icon === 'dollar' && (
                        <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path d="M10 1.66602V18.3327" stroke="currentColor" strokeWidth="1.67" strokeLinecap="round" strokeLinejoin="round"/>
                          <path d="M14.1667 4.16602H7.91667C7.14312 4.16602 6.40125 4.47331 5.85427 5.02029C5.30729 5.56727 5 6.30913 5 7.08268C5 7.85623 5.30729 8.5981 5.85427 9.14508C6.40125 9.69206 7.14312 9.99935 7.91667 9.99935H12.0833C12.8569 9.99935 13.5987 10.3066 14.1457 10.8536C14.6927 11.4006 15 12.1425 15 12.916C15 13.6896 14.6927 14.4314 14.1457 14.9784C13.5987 15.5254 12.8569 15.8327 12.0833 15.8327H5" stroke="currentColor" strokeWidth="1.67" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                      )}
                      {activity.icon === 'file' && (
                        <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path d="M11.6667 1.66602H5.00004C4.55801 1.66602 4.13409 1.84161 3.82153 2.15417C3.50897 2.46673 3.33337 2.89065 3.33337 3.33268V16.666C3.33337 17.108 3.50897 17.532 3.82153 17.8445C4.13409 18.1571 4.55801 18.3327 5.00004 18.3327H15C15.4421 18.3327 15.866 18.1571 16.1786 17.8445C16.4911 17.532 16.6667 17.108 16.6667 16.666V6.66602L11.6667 1.66602Z" stroke="currentColor" strokeWidth="1.67" strokeLinecap="round" strokeLinejoin="round"/>
                          <path d="M11.6666 1.66602V6.66602H16.6666" stroke="currentColor" strokeWidth="1.67" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                      )}
                      {activity.icon === 'edit' && (
                        <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path d="M9.16666 3.33398H3.33332C2.89129 3.33398 2.46737 3.50958 2.15481 3.82214C1.84225 4.1347 1.66666 4.55862 1.66666 5.00065V16.6673C1.66666 17.1094 1.84225 17.5333 2.15481 17.8458C2.46737 18.1584 2.89129 18.334 3.33332 18.334H15C15.442 18.334 15.866 18.1584 16.1785 17.8458C16.4911 17.5333 16.6667 17.1094 16.6667 16.6673V10.834" stroke="currentColor" strokeWidth="1.67" strokeLinecap="round" strokeLinejoin="round"/>
                          <path d="M15.4167 2.08398C15.7482 1.75251 16.1978 1.56641 16.6667 1.56641C17.1355 1.56641 17.5852 1.75251 17.9167 2.08398C18.2481 2.41546 18.4342 2.86514 18.4342 3.33398C18.4342 3.80283 18.2481 4.25251 17.9167 4.58398L10 12.5007L6.66666 13.334L7.49999 10.0007L15.4167 2.08398Z" stroke="currentColor" strokeWidth="1.67" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                      )}
                      {activity.icon === 'bell' && (
                        <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path d="M15 6.66602C15 5.34058 14.4732 4.06877 13.5355 3.13109C12.5979 2.19341 11.3261 1.66602 10 1.66602C8.67392 1.66602 7.40215 2.19341 6.46447 3.13109C5.52678 4.06877 5 5.34058 5 6.66602C5 12.4993 2.5 14.166 2.5 14.166H17.5C17.5 14.166 15 12.4993 15 6.66602Z" stroke="currentColor" strokeWidth="1.67" strokeLinecap="round" strokeLinejoin="round"/>
                          <path d="M11.4417 17.5C11.2952 17.7526 11.0849 17.9622 10.8319 18.1079C10.5789 18.2537 10.292 18.3304 10 18.3304C9.70802 18.3304 9.42109 18.2537 9.16808 18.1079C8.91508 17.9622 8.70484 17.7526 8.55833 17.5" stroke="currentColor" strokeWidth="1.67" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                      )}
                      {activity.icon === 'note' && (
                        <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path d="M11.6667 1.66602H5.00004C4.55801 1.66602 4.13409 1.84161 3.82153 2.15417C3.50897 2.46673 3.33337 2.89065 3.33337 3.33268V16.666C3.33337 17.108 3.50897 17.532 3.82153 17.8445C4.13409 18.1571 4.55801 18.3327 5.00004 18.3327H15C15.4421 18.3327 15.866 18.1571 16.1786 17.8445C16.4911 17.532 16.6667 17.108 16.6667 16.666V6.66602L11.6667 1.66602Z" stroke="currentColor" strokeWidth="1.67" strokeLinecap="round" strokeLinejoin="round"/>
                          <path d="M11.6666 1.66602V6.66602H16.6666" stroke="currentColor" strokeWidth="1.67" strokeLinecap="round" strokeLinejoin="round"/>
                          <path d="M13.3333 10.834H6.66663" stroke="currentColor" strokeWidth="1.67" strokeLinecap="round" strokeLinejoin="round"/>
                          <path d="M13.3333 14.166H6.66663" stroke="currentColor" strokeWidth="1.67" strokeLinecap="round" strokeLinejoin="round"/>
                          <path d="M8.33329 7.5H7.49996H6.66663" stroke="currentColor" strokeWidth="1.67" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                      )}
                    </div>
                    <div className="activity-details-wrapper">
                      <div className="activity-header-row">
                        <div className="activity-title">{activity.title}</div>
                        <div className="activity-timestamp">
                          {activity.timestamp}
                          <br />
                          {activity.time}
                        </div>
                      </div>
                      <div className="activity-description">{activity.description}</div>
                      <div className="activity-user">
                        <span className="user-pill">{getInitials(activity.user)}</span>
                        {activity.user}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
