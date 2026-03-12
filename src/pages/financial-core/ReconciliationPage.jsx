import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  FiPlus, FiSearch, FiChevronDown, FiCheckCircle, FiXCircle,
  FiClock, FiFileText, FiMoreVertical,
} from 'react-icons/fi';
import { TbBuildingBank, TbWallet } from 'react-icons/tb';
import FinancialSidebar from '../../components/financial-sidebar/FinancialSidebar';
import Header from './Header';
import LogoutConfirmModal from '../../components/logout-modal/LogoutConfirmModal';
import './ReconciliationPage.css';

const ACCS = [
  { account: 'Business Checking – Primary', type: 'Bank' },
  { account: 'Stripe Business Account', type: 'Wallet' },
  { account: 'Business Savings', type: 'Bank' },
  { account: 'Payroll Account', type: 'Bank' },
  { account: 'Corporate Credit Card', type: 'Wallet' },
];
const STATUSES = ['Matched', 'Unmatched', 'Pending'];
const CATEGORIES = ['Banking', 'Payments', 'Operations', 'HR', 'Infrastructure'];
const AMOUNTS = [-450, 12000, -3500, 8500, -1200, 5000, -900, 15000, -2300, 7500, -4100, 3200, -800, 11000, -6000];

const ALL_RECONS = Array.from({ length: 15 }, (_, i) => ({
  id: 'RECON-2026-001',
  ref: `REC-00${i + 1}`,
  ...ACCS[i % 5],
  date: `Jan ${28 - (i % 27)}, 2026`,
  amount: AMOUNTS[i],
  status: STATUSES[i % 3],
  category: CATEGORIES[i % 5],
}));

const STATS = [
  { label: 'Matched', value: 3, sub: 'Perfect match', subColor: '#027A48', icon: <FiCheckCircle size={16} />, bg: '#D1FAE5', color: '#027A48' },
  { label: 'Unmatched', value: 1, sub: '$620 difference', subColor: '#B42318', icon: <FiXCircle size={16} />, bg: '#FEE4E2', color: '#B42318' },
  { label: 'Pending Review', value: 1, sub: 'Needs attention', subColor: '#C4541A', icon: <FiClock size={16} />, bg: '#FFEDD5', color: '#C4541A' },
  { label: 'This Month', value: 5, sub: 'Reconciliations', subColor: '#667085', icon: <FiFileText size={16} />, bg: '#DBEAFE', color: '#1447E6' },
];

const STATUS_CLS = { Matched: 'rs-matched', Unmatched: 'rs-unmatched', Pending: 'rs-pending' };

export default function ReconciliationPage() {
  const navigate = useNavigate();
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [showLogout, setShowLogout] = useState(false);
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('All Status');
  const [catFilter, setCatFilter] = useState('All Categories');
  const [showStatusDrop, setShowStatusDrop] = useState(false);
  const [showCatDrop, setShowCatDrop] = useState(false);
  const [page, setPage] = useState(1);
  const PER_PAGE = 4;

  React.useEffect(() => {
    const close = (e) => {
      if (!e.target.closest('.dropdown')) {
        setShowStatusDrop(false);
        setShowCatDrop(false);
      }
    };
    document.addEventListener('mousedown', close);
    return () => document.removeEventListener('mousedown', close);
  }, []);

  const filtered = ALL_RECONS.filter(r =>
    (r.account.toLowerCase().includes(search.toLowerCase()) || r.ref.toLowerCase().includes(search.toLowerCase())) &&
    (statusFilter === 'All Status' || r.status === statusFilter) &&
    (catFilter === 'All Categories' || r.category === catFilter)
  );

  const totalPages = Math.ceil(filtered.length / PER_PAGE);
  const displayed = filtered.slice((page - 1) * PER_PAGE, page * PER_PAGE);

  const logout = () => {
    localStorage.removeItem('authToken');
    sessionStorage.clear();
    setShowLogout(false);
    navigate('/auth/login');
  };

  return (
    <div className={`recon-page ${isDarkMode ? 'dark-mode' : ''}`}>
      <FinancialSidebar onLogout={() => setShowLogout(true)} isDarkMode={isDarkMode} activePage="reconciliation" />
      <div className="recon-main">
        <Header isDarkMode={isDarkMode} toggleTheme={() => setIsDarkMode(p => !p)} />
        <main className="recon-content">
          <div className="recon-container">

            {/* Page Header */}
            <div className="recon-page-header">
              <div>
                <h1>Reconciliation</h1>
                <p>Match bank transactions with your internal records.</p>
              </div>
              <button className="recon-add-btn">
                <FiPlus size={16} /> Add Account
              </button>
            </div>

            {/* Stats Cards */}
            <div className="recon-stats-grid">
              {STATS.map(s => (
                <div key={s.label} className="recon-stat-card">
                  <div className="recon-stat-top">
                    <span className="recon-stat-label">{s.label}</span>
                    <span className="recon-stat-icon" style={{ background: s.bg, color: s.color }}>{s.icon}</span>
                  </div>
                  <div className="recon-stat-value">{s.value}</div>
                  <div className="recon-stat-sub" style={{ color: s.subColor }}>{s.sub}</div>
                </div>
              ))}
            </div>

            {/* Table Section */}
            <div className="recon-section">
              {/* Filters */}
              <div className="transactions-filters" style={{ marginBottom: 24 }}>
                <div className="search-box">
                  <FiSearch size={16} color="#667085" />
                  <input
                    placeholder="Search Vendors"
                    value={search}
                    onChange={e => { setSearch(e.target.value); setPage(1); }}
                  />
                </div>
                <div className="filter-dropdowns">
                  <div className="dropdown">
                    <button className="dropdown-button" onClick={() => { setShowStatusDrop(p => !p); setShowCatDrop(false); }}>
                      <span>{statusFilter}</span><FiChevronDown size={16} />
                    </button>
                    {showStatusDrop && (
                      <div className="dropdown-menu">
                        {['All Status', 'Matched', 'Unmatched', 'Pending'].map(s => (
                          <button key={s} onClick={() => { setStatusFilter(s); setShowStatusDrop(false); setPage(1); }}>{s}</button>
                        ))}
                      </div>
                    )}
                  </div>
                  <div className="dropdown">
                    <button className="dropdown-button" onClick={() => { setShowCatDrop(p => !p); setShowStatusDrop(false); }}>
                      <span>{catFilter}</span><FiChevronDown size={16} />
                    </button>
                    {showCatDrop && (
                      <div className="dropdown-menu">
                        {['All Categories', ...CATEGORIES].map(c => (
                          <button key={c} onClick={() => { setCatFilter(c); setShowCatDrop(false); setPage(1); }}>{c}</button>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              </div>

              {/* Table */}
              <div className="transactions-table-wrapper">
                <table className="transactions-table">
                  <thead>
                    <tr>
                      <th>RECONCILIATION</th>
                      <th>ACCOUNT</th>
                      <th>DATE</th>
                      <th>AMOUNT</th>
                      <th>STATUS</th>
                      <th>ACTIONS</th>
                    </tr>
                  </thead>
                  <tbody>
                    {displayed.map((r, i) => (
                      <tr key={`${r.ref}-${i}`}>
                        <td>
                          <div className="recon-id-primary">{r.id}</div>
                          <div className="recon-id-ref">{r.ref}</div>
                        </td>
                        <td>
                          <div className="recon-acct-cell">
                            <span className={`recon-acct-icon ${r.type === 'Bank' ? 'bank' : 'wallet'}`}>
                              {r.type === 'Bank' ? <TbBuildingBank size={14} /> : <TbWallet size={14} />}
                            </span>
                            <div>
                              <div className="recon-acct-name">{r.account}</div>
                              <div className="recon-acct-type">{r.type}</div>
                            </div>
                          </div>
                        </td>
                        <td className="txn-date">{r.date}</td>
                        <td className={`recon-amount ${r.amount < 0 ? 'neg' : 'pos'}`}>
                          {r.amount < 0 ? `-$${Math.abs(r.amount).toLocaleString()}` : `+$${r.amount.toLocaleString()}`}
                        </td>
                        <td>
                          <span className={`recon-status-badge ${STATUS_CLS[r.status]}`}>{r.status}</span>
                        </td>
                        <td className="txn-actions">
                          <button className="action-button" title="More actions"><FiMoreVertical size={16} /></button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* Pagination */}
              <div className="transactions-pagination">
                <div className="pagination-info">
                  Showing <input type="text" className="pagination-count" value={String(displayed.length).padStart(2, '0')} readOnly /> / {filtered.length} Results
                </div>
                <div className="pagination-controls">
                  <button className="pagination-button" onClick={() => setPage(p => Math.max(1, p - 1))} disabled={page === 1}>
                    <svg width="16" height="16" viewBox="0 0 20 20" fill="none"><path d="M13 17L7 11L13 5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" /></svg>
                  </button>
                  {[1, 2, 3].map(n => (
                    <button key={n} className={`pagination-number ${page === n ? 'active' : ''}`} onClick={() => setPage(n)}>{n}</button>
                  ))}
                  <span className="pagination-ellipsis">...</span>
                  <button className={`pagination-number ${page === 10 ? 'active' : ''}`} onClick={() => setPage(Math.min(10, totalPages))}>10</button>
                  <button className="pagination-button" onClick={() => setPage(p => Math.min(totalPages, p + 1))} disabled={page === totalPages}>
                    <svg width="16" height="16" viewBox="0 0 20 20" fill="none"><path d="M7 5L13 11L7 17" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" /></svg>
                  </button>
                </div>
              </div>

              <div className="transactions-footer-note">
                Market data is updated in real-time. Prices are for reference only and may vary across exchanges.
              </div>
            </div>

          </div>
        </main>
      </div>
      {showLogout && <LogoutConfirmModal onClose={() => setShowLogout(false)} onConfirm={logout} />}
    </div>
  );
}
