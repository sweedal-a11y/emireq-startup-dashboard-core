import React, { useState } from 'react';
import FinancialSidebar from '../../components/financial-sidebar/FinancialSidebar';
import Header from './Header';
import LogoutConfirmModal from '../../components/logout-modal/LogoutConfirmModal';
import { useNavigate } from 'react-router-dom';
import './TransactionsPage.css';

export default function TransactionsPage() {
  const navigate = useNavigate();
  const [showLogoutModal, setShowLogoutModal] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [activeTab, setActiveTab] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [typeFilter, setTypeFilter] = useState('all');
  const [statusFilter, setStatusFilter] = useState('all');
  const [currentPage, setCurrentPage] = useState(1);
  const [showTypeDropdown, setShowTypeDropdown] = useState(false);
  const [showStatusDropdown, setShowStatusDropdown] = useState(false);
  
  // Add Transaction Form State
  const [formData, setFormData] = useState({
    transactionType: 'Income',
    transactionDate: '',
    description: '',
    category: '',
    amount: '',
    referenceNumber: '',
    account: '',
    notes: ''
  });

  // Upload Transactions State
  const [uploadedFile, setUploadedFile] = useState(null);
  const [isDragging, setIsDragging] = useState(false);

  // Journals State
  const [journalSearchQuery, setJournalSearchQuery] = useState('');
  const [journalCurrentPage, setJournalCurrentPage] = useState(1);
  const [journalTypeFilter, setJournalTypeFilter] = useState('all');
  const [journalStatusFilter, setJournalStatusFilter] = useState('all');
  const [showJournalTypeDropdown, setShowJournalTypeDropdown] = useState(false);
  const [showJournalStatusDropdown, setShowJournalStatusDropdown] = useState(false);

  // Close dropdowns when clicking outside
  React.useEffect(() => {
    const handleClickOutside = (event) => {
      if (!event.target.closest('.dropdown')) {
        setShowTypeDropdown(false);
        setShowStatusDropdown(false);
        setShowJournalTypeDropdown(false);
        setShowJournalStatusDropdown(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

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

  // Mock transaction data - Generate 60 transactions for pagination
  const generateTransactions = () => {
    const transactions = [];
    const types = ['Income', 'Expense'];
    const categories = ['Sales', 'Rent', 'Professional Services', 'Technology', 'Product Revenue', 'Marketing', 'Consulting', 'Office Supplies', 'Utilities', 'Payroll'];
    const statuses = ['Completed', 'Processing', 'Pending'];
    
    for (let i = 1; i <= 100; i++) {
      transactions.push({
        id: `TXN-${String(i).padStart(3, '0')}`,
        date: `2026-01-${String(i % 30 + 1).padStart(2, '0')}`,
        type: types[i % 2],
        category: categories[i % categories.length],
        account: `2025-${String((i % 12) + 1).padStart(2, '0')}-15`,
        amount: 250,
        status: statuses[i % statuses.length]
      });
    }
    return transactions;
  };

  const allTransactions = generateTransactions();

  // Generate mock journal entries
  const generateJournals = () => {
    const journals = [];
    const types = ['Income', 'Expense'];
    const statuses = ['Completed', 'Processing', 'Pending'];
    for (let i = 1; i <= 80; i++) {
      journals.push({
        id: `JRN-${String(9000 + i).padStart(4, '0')}`,
        date: `2026-01-${String((i % 28) + 1).padStart(2, '0')}`,
        sourceTxn: `TXN-${String(i).padStart(3, '0')}`,
        debit: i % 2 === 0 ? null : (25000 + i * 5000).toFixed(2),
        credit: i % 2 === 0 ? (10000 + i * 2000).toFixed(2) : null,
        amount: (i * 1000).toFixed(2),
        runningBal: 'Running Bal',
        type: types[i % types.length],
        status: statuses[i % statuses.length]
      });
    }
    return journals;
  };

  const allJournals = generateJournals();

  // Filter transactions
  const filteredTransactions = allTransactions.filter(txn => {
    const matchesSearch = txn.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         txn.category.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesType = typeFilter === 'all' || txn.type.toLowerCase() === typeFilter.toLowerCase();
    const matchesStatus = statusFilter === 'all' || txn.status.toLowerCase() === statusFilter.toLowerCase();
    return matchesSearch && matchesType && matchesStatus;
  });

  const totalResults = filteredTransactions.length;
  const itemsPerPage = 6;
  const totalPages = Math.ceil(totalResults / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const displayedTransactions = filteredTransactions.slice(startIndex, startIndex + itemsPerPage);

  // Filter and paginate journals
  const filteredJournals = allJournals.filter(journal => {
    const matchesSearch = journal.id.toLowerCase().includes(journalSearchQuery.toLowerCase()) ||
                         journal.sourceTxn.toLowerCase().includes(journalSearchQuery.toLowerCase());
    const matchesType = journalTypeFilter === 'all' || journal.type.toLowerCase() === journalTypeFilter.toLowerCase();
    const matchesStatus = journalStatusFilter === 'all' || journal.status.toLowerCase() === journalStatusFilter.toLowerCase();
    return matchesSearch && matchesType && matchesStatus;
  });

  const totalJournalResults = filteredJournals.length;
  const journalItemsPerPage = 6;
  const totalJournalPages = Math.ceil(totalJournalResults / journalItemsPerPage);
  const journalStartIndex = (journalCurrentPage - 1) * journalItemsPerPage;
  const displayedJournals = filteredJournals.slice(journalStartIndex, journalStartIndex + journalItemsPerPage);

  const getStatusClass = (status) => {
    return `status-badge status-${status.toLowerCase()}`;
  };

  const getTypeClass = (type) => {
    return `type-badge type-${type.toLowerCase()}`;
  };

  const handleExport = () => {
    // Create CSV content
    const headers = ['ID', 'Date', 'Type', 'Category', 'Account', 'Amount', 'Status'];
    const csvContent = [
      headers.join(','),
      ...filteredTransactions.map(txn => 
        [txn.id, txn.date, txn.type, txn.category, txn.account, txn.amount, txn.status].join(',')
      )
    ].join('\n');

    // Create and download file
    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `transactions_${new Date().toISOString().split('T')[0]}.csv`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    window.URL.revokeObjectURL(url);
  };

  const handleExportJournals = () => {
    // Create CSV content for journals
    const headers = ['Date', 'Journal ID', 'Source TXN', 'Debit', 'Credit', 'Amount'];
    const csvContent = [
      headers.join(','),
      ...filteredJournals.map(journal => 
        [journal.date, journal.id, journal.sourceTxn, journal.debit || '', journal.credit || '', journal.amount].join(',')
      )
    ].join('\n');

    // Create and download file
    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `journals_${new Date().toISOString().split('T')[0]}.csv`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    window.URL.revokeObjectURL(url);
  };

  const handleNewTransaction = () => {
    setActiveTab('add');
  };

  const handleFormChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleCancelTransaction = () => {
    setFormData({
      transactionType: 'Income',
      transactionDate: '',
      description: '',
      category: '',
      amount: '',
      referenceNumber: '',
      account: '',
      notes: ''
    });
    setActiveTab('all');
  };

  const handleSaveTransaction = () => {
    // Button is non-functional
    return;
  };

  // Upload Transactions Handlers
  const handleDragEnter = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(true);
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    e.stopPropagation();
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
    
    const files = e.dataTransfer.files;
    if (files && files.length > 0) {
      const file = files[0];
      if (file.type === 'text/csv' || file.name.endsWith('.csv')) {
        if (file.size <= 10 * 1024 * 1024) { // 10MB limit
          setUploadedFile(file);
          console.log('File uploaded:', file.name);
        } else {
          alert('File size exceeds 10MB limit');
        }
      } else {
        alert('Please upload a CSV file');
      }
    }
  };

  const handleFileSelect = (e) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      const file = files[0];
      if (file.type === 'text/csv' || file.name.endsWith('.csv')) {
        if (file.size <= 10 * 1024 * 1024) { // 10MB limit
          setUploadedFile(file);
          console.log('File selected:', file.name);
        } else {
          alert('File size exceeds 10MB limit');
        }
      } else {
        alert('Please upload a CSV file');
      }
    }
  };

  const handleBrowseClick = () => {
    document.getElementById('csv-file-input').click();
  };

  const handleDownloadTemplate = () => {
    // Create CSV template
    const headers = ['Date', 'Type', 'Description', 'Category', 'Amount', 'Account'];
    const sampleData = [
      '2026-01-30,Income,Client payment for services,Sales,5000.00,Business Checking',
      '2026-01-29,Expense,Office rent payment,Rent,-2500.00,Business Checking',
      '2026-01-28,Income,Product sale revenue,Product Revenue,1200.00,Business Checking'
    ];
    const csvContent = [headers.join(','), ...sampleData].join('\n');

    // Create and download file
    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'transaction_template.csv';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    window.URL.revokeObjectURL(url);
  };

  return (
    <div className={`transactions-page ${isDarkMode ? 'dark-mode' : ''}`}>
      <FinancialSidebar onLogout={handleLogoutClick} isDarkMode={isDarkMode} activePage="transactions" />
      <div className="transactions-main">
        <Header isDarkMode={isDarkMode} toggleTheme={toggleTheme} />
        <main className="transactions-content">
          <div className="transactions-container">
            {/* Page Header */}
            <div className="transactions-page-header">
              <div className="page-header-left">
                <h1>Financial Core</h1>
                <p>Manage and track all your financial transactions and journal entries</p>
              </div>
              <div className="page-header-actions">
                <button className="btn-secondary" onClick={handleExport}>
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M14 10.6667V13.3334C14 13.5102 13.9298 13.6798 13.8047 13.8048C13.6797 13.9299 13.5101 14.0001 13.3333 14.0001H2.66667C2.48986 14.0001 2.32029 13.9299 2.19526 13.8048C2.07024 13.6798 2 13.5102 2 13.3334V10.6667" stroke="currentColor" strokeWidth="1.33333" strokeLinecap="round" strokeLinejoin="round"/>
                    <path d="M4.66675 6.66669L8.00008 10L11.3334 6.66669" stroke="currentColor" strokeWidth="1.33333" strokeLinecap="round" strokeLinejoin="round"/>
                    <path d="M8 10V2" stroke="currentColor" strokeWidth="1.33333" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                  Export
                </button>
                <button className="btn-primary" onClick={handleNewTransaction}>
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M8 3.33331V12.6666" stroke="currentColor" strokeWidth="1.33333" strokeLinecap="round" strokeLinejoin="round"/>
                    <path d="M3.33325 8H12.6666" stroke="currentColor" strokeWidth="1.33333" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                  New Transaction
                </button>
              </div>
            </div>

            {/* Tabs */}
            <div className="transactions-tabs">
              <button 
                className={`tab-button ${activeTab === 'all' ? 'active' : ''}`}
                onClick={() => setActiveTab('all')}
              >
                All Transactions
              </button>
              <button 
                className={`tab-button ${activeTab === 'add' ? 'active' : ''}`}
                onClick={() => setActiveTab('add')}
              >
                Add Transaction
              </button>
              <button 
                className={`tab-button ${activeTab === 'upload' ? 'active' : ''}`}
                onClick={() => setActiveTab('upload')}
              >
                Upload Transactions
              </button>
              <button 
                className={`tab-button ${activeTab === 'journals' ? 'active' : ''}`}
                onClick={() => setActiveTab('journals')}
              >
                Journals
              </button>
            </div>

            {/* Transactions Section */}
            {activeTab === 'all' && (
            <div className="transactions-section">
              <div className="section-header">
                <div className="section-header-left">
                  <div className="section-title">
                    <h2>Transactions</h2>
                    <button className="info-icon" title="Manage and track all your financial transactions and journal entries">
                      <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <circle cx="9.89191" cy="9.89203" r="7.91351" fill="#AFAFAF"/>
                        <path fillRule="evenodd" clipRule="evenodd" d="M11.1825 7.16424C11.3062 6.94785 11.3757 6.69669 11.3757 6.43007C11.3757 5.6109 10.7111 4.94629 9.89195 4.94629C9.07278 4.94629 8.40817 5.6109 8.40817 6.43007C8.40817 7.24925 9.07278 7.91386 9.89195 7.91386C10.4445 7.91386 10.9275 7.61246 11.1825 7.16424ZM8.90276 8.90305H9.39736H10.3865C10.9333 8.90305 11.3757 9.34548 11.3757 9.89223V10.8814V14.8382C11.3757 15.3849 10.9333 15.8274 10.3865 15.8274C9.83979 15.8274 9.39736 15.3849 9.39736 14.8382V11.6233C9.39736 11.2137 9.06505 10.8814 8.65547 10.8814C8.24588 10.8814 7.91357 10.5491 7.91357 10.1395V9.89223C7.91357 9.54447 8.09325 9.23728 8.36373 9.06147C8.51829 8.96101 8.70377 8.90305 8.90276 8.90305Z" fill="white"/>
                      </svg>
                    </button>
                  </div>
                  <p className="section-description">Manage and track all your financial transactions and journal entries</p>
                </div>
              </div>

              {/* Filters */}
              <div className="transactions-filters">
                <div className="search-box">
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M7.33333 12.6667C10.2789 12.6667 12.6667 10.2789 12.6667 7.33333C12.6667 4.38781 10.2789 2 7.33333 2C4.38781 2 2 4.38781 2 7.33333C2 10.2789 4.38781 12.6667 7.33333 12.6667Z" stroke="#667085" strokeWidth="1.33333" strokeLinecap="round" strokeLinejoin="round"/>
                    <path d="M14 14L11.1 11.1" stroke="#667085" strokeWidth="1.33333" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                  <input
                    type="text"
                    placeholder="Search Transaction"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                </div>

                <div className="filter-dropdowns">
                  <div className="dropdown">
                    <button 
                      className="dropdown-button"
                      onClick={() => {
                        setShowTypeDropdown(!showTypeDropdown);
                        setShowStatusDropdown(false);
                      }}
                    >
                      <span>{typeFilter === 'all' ? 'All Types' : typeFilter}</span>
                      <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M4 6L8 10L12 6" stroke="currentColor" strokeWidth="1.33333" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                    </button>
                    {showTypeDropdown && (
                      <div className="dropdown-menu">
                        <button onClick={() => { setTypeFilter('all'); setShowTypeDropdown(false); }}>All Types</button>
                        <button onClick={() => { setTypeFilter('Income'); setShowTypeDropdown(false); }}>Income</button>
                        <button onClick={() => { setTypeFilter('Expense'); setShowTypeDropdown(false); }}>Expense</button>
                      </div>
                    )}
                  </div>

                  <div className="dropdown">
                    <button 
                      className="dropdown-button"
                      onClick={() => {
                        setShowStatusDropdown(!showStatusDropdown);
                        setShowTypeDropdown(false);
                      }}
                    >
                      <span>{statusFilter === 'all' ? 'All Status' : statusFilter}</span>
                      <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M4 6L8 10L12 6" stroke="currentColor" strokeWidth="1.33333" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                    </button>
                    {showStatusDropdown && (
                      <div className="dropdown-menu">
                        <button onClick={() => { setStatusFilter('all'); setShowStatusDropdown(false); }}>All Status</button>
                        <button onClick={() => { setStatusFilter('Completed'); setShowStatusDropdown(false); }}>Completed</button>
                        <button onClick={() => { setStatusFilter('Processing'); setShowStatusDropdown(false); }}>Processing</button>
                        <button onClick={() => { setStatusFilter('Pending'); setShowStatusDropdown(false); }}>Pending</button>
                      </div>
                    )}
                  </div>
                </div>
              </div>

              {/* Transactions Table */}
              <div className="transactions-table-wrapper">
                <table className="transactions-table">
                  <thead>
                    <tr>
                      <th>ID</th>
                      <th>DATE</th>
                      <th>TYPE</th>
                      <th>CATEGORY</th>
                      <th>ACCOUNT</th>
                      <th>AMOUNT</th>
                      <th>STATUS</th>
                      <th>ACTIONS</th>
                    </tr>
                  </thead>
                  <tbody>
                    {displayedTransactions.map((txn) => (
                      <tr key={txn.id}>
                        <td className="txn-id">{txn.id}</td>
                        <td className="txn-date">{txn.date}</td>
                        <td>
                          <span className={getTypeClass(txn.type)}>{txn.type}</span>
                        </td>
                        <td className="txn-category">{txn.category}</td>
                        <td className="txn-account">{txn.account}</td>
                        <td className="txn-amount">${txn.amount}</td>
                        <td>
                          <span className={getStatusClass(txn.status)}>{txn.status}</span>
                        </td>
                        <td className="txn-actions">
                          <button className="action-button" title="More actions">
                            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                              <path d="M8 8.66667C8.36819 8.66667 8.66667 8.36819 8.66667 8C8.66667 7.63181 8.36819 7.33333 8 7.33333C7.63181 7.33333 7.33333 7.63181 7.33333 8C7.33333 8.36819 7.63181 8.66667 8 8.66667Z" stroke="currentColor" strokeWidth="1.33333" strokeLinecap="round" strokeLinejoin="round"/>
                              <path d="M8 4C8.36819 4 8.66667 3.70152 8.66667 3.33333C8.66667 2.96514 8.36819 2.66667 8 2.66667C7.63181 2.66667 7.33333 2.96514 7.33333 3.33333C7.33333 3.70152 7.63181 4 8 4Z" stroke="currentColor" strokeWidth="1.33333" strokeLinecap="round" strokeLinejoin="round"/>
                              <path d="M8 13.3333C8.36819 13.3333 8.66667 13.0349 8.66667 12.6667C8.66667 12.2985 8.36819 12 8 12C7.63181 12 7.33333 12.2985 7.33333 12.6667C7.33333 13.0349 7.63181 13.3333 8 13.3333Z" stroke="currentColor" strokeWidth="1.33333" strokeLinecap="round" strokeLinejoin="round"/>
                            </svg>
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* Pagination */}
              <div className="transactions-pagination">
                <div className="pagination-info">
                  Showing <input type="text" className="pagination-count" value={String(displayedTransactions.length).padStart(2, '0')} readOnly /> / {totalResults} Results
                </div>
                <div className="pagination-controls">
                  <button 
                    className="pagination-button"
                    onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
                    disabled={currentPage === 1}
                  >
                    <svg width="16" height="16" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M13 17L7 11L13 5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </button>
                  
                  <button
                    className={`pagination-number ${currentPage === 1 ? 'active' : ''}`}
                    onClick={() => setCurrentPage(1)}
                  >
                    1
                  </button>
                  
                  <button
                    className={`pagination-number ${currentPage === 2 ? 'active' : ''}`}
                    onClick={() => setCurrentPage(2)}
                  >
                    2
                  </button>
                  
                  <button
                    className={`pagination-number ${currentPage === 3 ? 'active' : ''}`}
                    onClick={() => setCurrentPage(3)}
                  >
                    3
                  </button>
                  
                  {currentPage > 3 && currentPage < 10 && (
                    <>
                      <span className="pagination-ellipsis">...</span>
                      <button
                        className="pagination-number active"
                        onClick={() => setCurrentPage(currentPage)}
                      >
                        {currentPage}
                      </button>
                    </>
                  )}
                  
                  <span className="pagination-ellipsis">...</span>
                  
                  <button
                    className={`pagination-number ${currentPage === 10 ? 'active' : ''}`}
                    onClick={() => setCurrentPage(10)}
                  >
                    10
                  </button>

                  <button 
                    className="pagination-button"
                    onClick={() => setCurrentPage(prev => Math.min(totalPages, prev + 1))}
                    disabled={currentPage === totalPages}
                  >
                    <svg width="16" height="16" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M7 5L13 11L7 17" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </button>
                </div>
              </div>

              {/* Footer Note */}
              <div className="transactions-footer-note">
                Market data is updated in real-time. Prices are for reference only and may vary across exchanges.
              </div>
            </div>
            )}

            {/* Add Transaction Form */}
            {activeTab === 'add' && (
            <div className="add-transaction-section">
              <div className="add-transaction-form">
                <h3 className="form-title">Add Transaction (Manual Entry)</h3>
                
                <div className="form-row">
                  <div className="form-group">
                    <label>TRANSACTION TYPE<span className="required">*</span></label>
                    <select 
                      value={formData.transactionType}
                      onChange={(e) => handleFormChange('transactionType', e.target.value)}
                      className="form-select"
                    >
                      <option value="Income">Income</option>
                      <option value="Expense">Expense</option>
                    </select>
                  </div>
                  
                  <div className="form-group">
                    <label>TRANSACTION DATE<span className="required">*</span></label>
                    <input 
                      type="date"
                      value={formData.transactionDate}
                      onChange={(e) => handleFormChange('transactionDate', e.target.value)}
                      className="form-input"
                    />
                  </div>
                </div>

                <div className="form-group full-width">
                  <label>DESCRIPTION<span className="required">*</span></label>
                  <input 
                    type="text"
                    placeholder="Enter transaction description"
                    value={formData.description}
                    onChange={(e) => handleFormChange('description', e.target.value)}
                    className="form-input"
                  />
                </div>

                <div className="form-row">
                  <div className="form-group">
                    <label>CATEGORY<span className="required">*</span></label>
                    <select 
                      value={formData.category}
                      onChange={(e) => handleFormChange('category', e.target.value)}
                      className="form-select"
                    >
                      <option value="">Select category</option>
                      <option value="Sales">Sales</option>
                      <option value="Rent">Rent</option>
                      <option value="Professional Services">Professional Services</option>
                      <option value="Technology">Technology</option>
                      <option value="Product Revenue">Product Revenue</option>
                      <option value="Marketing">Marketing</option>
                      <option value="Consulting">Consulting</option>
                      <option value="Office Supplies">Office Supplies</option>
                      <option value="Utilities">Utilities</option>
                      <option value="Payroll">Payroll</option>
                    </select>
                  </div>
                  
                  <div className="form-group">
                    <label>AMOUNT<span className="required">*</span></label>
                    <input 
                      type="number"
                      step="0.01"
                      placeholder="0.00"
                      value={formData.amount}
                      onChange={(e) => handleFormChange('amount', e.target.value)}
                      className="form-input"
                    />
                  </div>
                </div>

                <div className="form-row">
                  <div className="form-group">
                    <label>REFERENCE NUMBER</label>
                    <input 
                      type="text"
                      placeholder="e.g., INV-2026-001"
                      value={formData.referenceNumber}
                      onChange={(e) => handleFormChange('referenceNumber', e.target.value)}
                      className="form-input"
                    />
                  </div>
                  
                  <div className="form-group">
                    <label>ACCOUNT<span className="required">*</span></label>
                    <select 
                      value={formData.account}
                      onChange={(e) => handleFormChange('account', e.target.value)}
                      className="form-select"
                    >
                      <option value="">Select account</option>
                      <option value="2025-01-15">2025-01-15</option>
                      <option value="2025-02-15">2025-02-15</option>
                      <option value="2025-03-15">2025-03-15</option>
                      <option value="2025-04-15">2025-04-15</option>
                      <option value="2025-05-15">2025-05-15</option>
                      <option value="2025-06-15">2025-06-15</option>
                    </select>
                  </div>
                </div>

                <div className="form-group full-width">
                  <label>NOTES</label>
                  <textarea 
                    placeholder="Add any additional notes or comments..."
                    value={formData.notes}
                    onChange={(e) => handleFormChange('notes', e.target.value)}
                    className="form-textarea"
                    rows="4"
                  />
                </div>

                <div className="form-actions">
                  <button className="btn-cancel" onClick={handleCancelTransaction}>Cancel</button>
                  <button className="btn-save" onClick={handleSaveTransaction}>Save Transaction</button>
                </div>
              </div>
            </div>
            )}

            {/* Upload Transactions Section */}
            {activeTab === 'upload' && (
            <div className="upload-transactions-section">
              <div className="upload-header">
                <h2>Upload Transactions (Bulk)</h2>
                <p>Import multiple transactions at once using a CSV file. Download our template to get started.</p>
              </div>

              {/* File Upload Area */}
              <div 
                className={`file-upload-area ${isDragging ? 'dragging' : ''}`}
                onDragEnter={handleDragEnter}
                onDragOver={handleDragOver}
                onDragLeave={handleDragLeave}
                onDrop={handleDrop}
              >
                <input
                  type="file"
                  id="csv-file-input"
                  accept=".csv"
                  onChange={handleFileSelect}
                  style={{ display: 'none' }}
                />
                <div className="upload-icon">
                 <svg width="48" height="48" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M0 24C0 10.7452 10.7452 0 24 0C37.2548 0 48 10.7452 48 24C48 37.2548 37.2548 48 24 48C10.7452 48 0 37.2548 0 24Z" fill="#F3F4F6"/>
<path d="M33 27V31C33 31.5304 32.7893 32.0391 32.4142 32.4142C32.0391 32.7893 31.5304 33 31 33H17C16.4696 33 15.9609 32.7893 15.5858 32.4142C15.2107 32.0391 15 31.5304 15 31V27" stroke="#6A7282" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M29 20L24 15L19 20" stroke="#6A7282" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M24 15V27" stroke="#6A7282" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
</svg>

                </div>
                <div className="upload-text">
                  <span className="upload-main-text">
                    Drop your CSV file here, or <button className="browse-link" onClick={handleBrowseClick}>browse</button>
                  </span>
                  <span className="upload-sub-text">Supports CSV files up to 10MB</span>
                </div>
                {uploadedFile && (
                  <div className="uploaded-file-info">
                    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M10 0C15.523 0 20 4.477 20 10C20 15.523 15.523 20 10 20C4.477 20 0 15.523 0 10C0 4.477 4.477 0 10 0ZM13.707 7.293C13.3165 6.9025 12.6835 6.9025 12.293 7.293L9 10.586L7.707 9.293C7.3165 8.9025 6.6835 8.9025 6.293 9.293C5.9025 9.6835 5.9025 10.3165 6.293 10.707L8.293 12.707C8.6835 13.0975 9.3165 13.0975 9.707 12.707L13.707 8.707C14.0975 8.3165 14.0975 7.6835 13.707 7.293Z" fill="#12B76A"/>
                    </svg>
                    <span>{uploadedFile.name}</span>
                  </div>
                )}
              </div>

              {/* CSV Template Info */}
              <div className="csv-template-box">
                <div className="template-icon">
                 <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
<g clip-path="url(#clip0_236_3467)">
<path d="M12.5 1.66699H5.00004C4.55801 1.66699 4.13409 1.84259 3.82153 2.15515C3.50897 2.46771 3.33337 2.89163 3.33337 3.33366V16.667C3.33337 17.109 3.50897 17.5329 3.82153 17.8455C4.13409 18.1581 4.55801 18.3337 5.00004 18.3337H15C15.4421 18.3337 15.866 18.1581 16.1786 17.8455C16.4911 17.5329 16.6667 17.109 16.6667 16.667V5.83366L12.5 1.66699Z" stroke="#155DFC" stroke-width="1.66667" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M11.6666 1.66699V5.00033C11.6666 5.44235 11.8422 5.86628 12.1548 6.17884C12.4673 6.4914 12.8913 6.66699 13.3333 6.66699H16.6666" stroke="#155DFC" stroke-width="1.66667" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M8.33329 7.5H6.66663" stroke="#155DFC" stroke-width="1.66667" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M13.3333 10.833H6.66663" stroke="#155DFC" stroke-width="1.66667" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M13.3333 14.167H6.66663" stroke="#155DFC" stroke-width="1.66667" stroke-linecap="round" stroke-linejoin="round"/>
</g>
<defs>
<clipPath id="clip0_236_3467">
<rect width="20" height="20" fill="white"/>
</clipPath>
</defs>
</svg>

                </div>
                <div className="template-content">
                  <h3>CSV Template</h3>
                  <p>Download our CSV template to ensure your file is formatted correctly for bulk import.</p>
                  <button className="btn-download-template" onClick={handleDownloadTemplate}>
                    <svg width="16" height="16" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M17.5 13.3334V16.6667C17.5 17.1087 17.3244 17.5326 17.0118 17.8452C16.6993 18.1577 16.2754 18.3334 15.8333 18.3334H4.16667C3.72464 18.3334 3.30072 18.1577 2.98816 17.8452C2.67559 17.5326 2.5 17.1087 2.5 16.6667V13.3334" stroke="currentColor" strokeWidth="1.66667" strokeLinecap="round" strokeLinejoin="round"/>
                      <path d="M5.83325 8.3335L9.99992 12.5002L14.1666 8.3335" stroke="currentColor" strokeWidth="1.66667" strokeLinecap="round" strokeLinejoin="round"/>
                      <path d="M10 12.5V2.5" stroke="currentColor" strokeWidth="1.66667" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                    Download Template
                  </button>
                </div>
              </div>

              {/* File Requirements */}
              <div className="file-requirements">
                <h3>File Requirements:</h3>
                <ul>
                  <li>
                    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M16.6663 5L7.49967 14.1667L3.33301 10" stroke="#12B76A" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                    <span>CSV file format with comma-separated values</span>
                  </li>
                  <li>
                    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M16.6663 5L7.49967 14.1667L3.33301 10" stroke="#12B76A" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                    <span>Required columns: Date, Type, Description, Category, Amount, Account</span>
                  </li>
                  <li>
                    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M16.6663 5L7.49967 14.1667L3.33301 10" stroke="#12B76A" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                    <span>Date format: YYYY-MM-DD (e.g., 2026-01-30)</span>
                  </li>
                  <li>
                    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M16.6663 5L7.49967 14.1667L3.33301 10" stroke="#12B76A" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                    <span>Amount format: Positive for income, negative for expenses</span>
                  </li>
                </ul>
              </div>
            </div>
            )}

            {/* Journals Section */}
            {activeTab === 'journals' && (
            <div className="transactions-section journals-section">
              <div className="section-header">
                <div className="section-header-left">
                  <div className="section-title">
                    <h2>Transactions</h2>
                    <button className="info-icon" title="Manage and track all your financial transactions and journal entries">
                      <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <circle cx="9.89191" cy="9.89203" r="7.91351" fill="#AFAFAF"/>
                        <path fillRule="evenodd" clipRule="evenodd" d="M11.1825 7.16424C11.3062 6.94785 11.3757 6.69669 11.3757 6.43007C11.3757 5.6109 10.7111 4.94629 9.89195 4.94629C9.07278 4.94629 8.40817 5.6109 8.40817 6.43007C8.40817 7.24925 9.07278 7.91386 9.89195 7.91386C10.4445 7.91386 10.9275 7.61246 11.1825 7.16424ZM8.90276 8.90305H9.39736H10.3865C10.9333 8.90305 11.3757 9.34548 11.3757 9.89223V10.8814V14.8382C11.3757 15.3849 10.9333 15.8274 10.3865 15.8274C9.83979 15.8274 9.39736 15.3849 9.39736 14.8382V11.6233C9.39736 11.2137 9.06505 10.8814 8.65547 10.8814C8.24588 10.8814 7.91357 10.5491 7.91357 10.1395V9.89223C7.91357 9.54447 8.09325 9.23728 8.36373 9.06147C8.51829 8.96101 8.70377 8.90305 8.90276 8.90305Z" fill="white"/>
                      </svg>
                    </button>
                  </div>
                  <p className="section-description">Manage and track all your financial transactions and journal entries</p>
                </div>
                <button className="btn-export-journals" onClick={handleExportJournals}>
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M14 10.6667V13.3334C14 13.5102 13.9298 13.6798 13.8047 13.8048C13.6797 13.9299 13.5101 14.0001 13.3333 14.0001H2.66667C2.48986 14.0001 2.32029 13.9299 2.19526 13.8048C2.07024 13.6798 2 13.5102 2 13.3334V10.6667" stroke="currentColor" strokeWidth="1.33333" strokeLinecap="round" strokeLinejoin="round"/>
                    <path d="M4.66675 6.66669L8.00008 10L11.3334 6.66669" stroke="currentColor" strokeWidth="1.33333" strokeLinecap="round" strokeLinejoin="round"/>
                    <path d="M8 10V2" stroke="currentColor" strokeWidth="1.33333" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                  Export Journals
                </button>
              </div>

              {/* Journals Filters */}
              <div className="transactions-filters journals-filters">
                <div className="search-box">
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M7.33333 12.6667C10.2789 12.6667 12.6667 10.2789 12.6667 7.33333C12.6667 4.38781 10.2789 2 7.33333 2C4.38781 2 2 4.38781 2 7.33333C2 10.2789 4.38781 12.6667 7.33333 12.6667Z" stroke="#667085" strokeWidth="1.33333" strokeLinecap="round" strokeLinejoin="round"/>
                    <path d="M14 14L11.1 11.1" stroke="#667085" strokeWidth="1.33333" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                  <input
                    type="text"
                    placeholder="Search Transaction"
                    value={journalSearchQuery}
                    onChange={(e) => setJournalSearchQuery(e.target.value)}
                  />
                </div>

                <div className="filter-dropdowns">
                  <div className="dropdown">
                    <button 
                      className="dropdown-button"
                      onClick={() => {
                        setShowJournalTypeDropdown(!showJournalTypeDropdown);
                        setShowJournalStatusDropdown(false);
                      }}
                    >
                      <span>{journalTypeFilter === 'all' ? 'All Types' : journalTypeFilter}</span>
                      <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M4 6L8 10L12 6" stroke="currentColor" strokeWidth="1.33333" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                    </button>
                    {showJournalTypeDropdown && (
                      <div className="dropdown-menu">
                        <button onClick={() => { setJournalTypeFilter('all'); setShowJournalTypeDropdown(false); }}>All Types</button>
                        <button onClick={() => { setJournalTypeFilter('Income'); setShowJournalTypeDropdown(false); }}>Income</button>
                        <button onClick={() => { setJournalTypeFilter('Expense'); setShowJournalTypeDropdown(false); }}>Expense</button>
                      </div>
                    )}
                  </div>

                  <div className="dropdown">
                    <button 
                      className="dropdown-button"
                      onClick={() => {
                        setShowJournalStatusDropdown(!showJournalStatusDropdown);
                        setShowJournalTypeDropdown(false);
                      }}
                    >
                      <span>{journalStatusFilter === 'all' ? 'All Status' : journalStatusFilter}</span>
                      <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M4 6L8 10L12 6" stroke="currentColor" strokeWidth="1.33333" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                    </button>
                    {showJournalStatusDropdown && (
                      <div className="dropdown-menu">
                        <button onClick={() => { setJournalStatusFilter('all'); setShowJournalStatusDropdown(false); }}>All Status</button>
                        <button onClick={() => { setJournalStatusFilter('Completed'); setShowJournalStatusDropdown(false); }}>Completed</button>
                        <button onClick={() => { setJournalStatusFilter('Processing'); setShowJournalStatusDropdown(false); }}>Processing</button>
                        <button onClick={() => { setJournalStatusFilter('Pending'); setShowJournalStatusDropdown(false); }}>Pending</button>
                      </div>
                    )}
                  </div>
                </div>
              </div>

              {/* Journals Table */}
              <div className="transactions-table-wrapper journals-table-wrapper">
                <table className="transactions-table journals-table">
                  <thead>
                    <tr>
                      <th>DATE</th>
                      <th>JOURNAL ID</th>
                      <th>SOURCE TXN</th>
                      <th>DEBIT</th>
                      <th>CREDIT</th>
                      <th>AMOUNT</th>
                    </tr>
                  </thead>
                  <tbody>
                    {displayedJournals.map((journal) => (
                      <tr key={journal.id}>
                        <td className="journal-date">{journal.date}</td>
                        <td className="journal-id">{journal.id}</td>
                        <td className="journal-source">
                          <span className="source-txn-badge">{journal.sourceTxn}</span>
                        </td>
                        <td className="journal-debit">
                          {journal.debit ? <span className="debit-badge">₹{journal.debit}</span> : <span style={{color: '#D1D5DB'}}>—</span>}
                        </td>
                        <td className="journal-credit">
                          {journal.credit ? <span className="credit-badge">₹{journal.credit}</span> : <span style={{color: '#D1D5DB'}}>—</span>}
                        </td>
                        <td className="journal-amount">
                          <div className="amount-cell">
                            <span className="amount-value">₹{journal.amount}</span>
                            <span className="running-bal">{journal.runningBal}</span>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* Pagination */}
              <div className="transactions-pagination journals-pagination">
                <div className="pagination-info">
                  Showing <input type="text" className="pagination-count" value={String(displayedJournals.length).padStart(2, '0')} readOnly /> / {totalJournalResults} Results
                </div>
                <div className="pagination-controls">
                  <button 
                    className="pagination-button"
                    onClick={() => setJournalCurrentPage(prev => Math.max(1, prev - 1))}
                    disabled={journalCurrentPage === 1}
                  >
                    <svg width="16" height="16" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M13 17L7 11L13 5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </button>
                  
                  <button
                    className={`pagination-number ${journalCurrentPage === 1 ? 'active' : ''}`}
                    onClick={() => setJournalCurrentPage(1)}
                  >
                    1
                  </button>
                  
                  <button
                    className={`pagination-number ${journalCurrentPage === 2 ? 'active' : ''}`}
                    onClick={() => setJournalCurrentPage(2)}
                  >
                    2
                  </button>
                  
                  <button
                    className={`pagination-number ${journalCurrentPage === 3 ? 'active' : ''}`}
                    onClick={() => setJournalCurrentPage(3)}
                  >
                    3
                  </button>
                  
                  {journalCurrentPage > 3 && journalCurrentPage < 10 && (
                    <>
                      <span className="pagination-ellipsis">...</span>
                      <button
                        className="pagination-number active"
                        onClick={() => setJournalCurrentPage(journalCurrentPage)}
                      >
                        {journalCurrentPage}
                      </button>
                    </>
                  )}
                  
                  <span className="pagination-ellipsis">...</span>
                  
                  <button
                    className={`pagination-number ${journalCurrentPage === 10 ? 'active' : ''}`}
                    onClick={() => setJournalCurrentPage(10)}
                  >
                    10
                  </button>

                  <button 
                    className="pagination-button"
                    onClick={() => setJournalCurrentPage(prev => Math.min(totalJournalPages, prev + 1))}
                    disabled={journalCurrentPage === totalJournalPages}
                  >
                    <svg width="16" height="16" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M7 5L13 11L7 17" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </button>
                </div>
              </div>

              {/* Footer Note */}
              <div className="transactions-footer-note">
                Market data is updated in real-time. Prices are for reference only and may vary across exchanges.
              </div>
            </div>
            )}
          </div>
        </main>
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
