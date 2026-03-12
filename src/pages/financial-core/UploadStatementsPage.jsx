import React, { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { FiUploadCloud, FiFileText, FiUpload } from 'react-icons/fi';
import FinancialSidebar from '../../components/financial-sidebar/FinancialSidebar';
import Header from './Header';
import LogoutConfirmModal from '../../components/logout-modal/LogoutConfirmModal';
import './UploadStatementsPage.css';

const UPLOADS = Array.from({ length: 15 }, (_, i) => ({
  id: i + 1,
  fileName: i % 2 === 0 ? 'Chase_Statement_Feb2024.csv' : 'Amex_Export_Q1.ofx',
  date: i % 2 === 0 ? '2025-09-15' : '2025-09-30',
  uploadedBy: 'David Smith',
  format: i % 2 === 0 ? 'PDF' : 'Excel',
  status: 'Processed',
}));

export default function UploadStatementsPage() {
  const navigate = useNavigate();
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [showLogout, setShowLogout] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const [uploadedFile, setUploadedFile] = useState(null);
  const [page, setPage] = useState(1);
  const PER_PAGE = 2;
  const fileInputRef = useRef(null);

  const totalPages = Math.ceil(UPLOADS.length / PER_PAGE);
  const displayed = UPLOADS.slice((page - 1) * PER_PAGE, page * PER_PAGE);

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragging(false);
    const file = e.dataTransfer.files[0];
    if (file) setUploadedFile(file);
  };

  const handleFileSelect = (e) => {
    const file = e.target.files[0];
    if (file) setUploadedFile(file);
  };

  const logout = () => {
    localStorage.removeItem('authToken');
    sessionStorage.clear();
    setShowLogout(false);
    navigate('/auth/login');
  };

  return (
    <div className={`upload-page ${isDarkMode ? 'dark-mode' : ''}`}>
      <FinancialSidebar onLogout={() => setShowLogout(true)} isDarkMode={isDarkMode} activePage="upload-statements" />
      <div className="upload-main">
        <Header isDarkMode={isDarkMode} toggleTheme={() => setIsDarkMode(p => !p)} />
        <main className="upload-content">
          <div className="upload-container">

            {/* Page Header */}
            <div className="upload-page-header">
              <div>
                <h1>Upload Statements</h1>
                <p>bank statements in CSV, OFX, or QIF formats.</p>
              </div>
            </div>

            {/* Drop Zone */}
            <div
              className={`upload-dropzone ${isDragging ? 'dragging' : ''}`}
              onDragEnter={e => { e.preventDefault(); setIsDragging(true); }}
              onDragLeave={e => { e.preventDefault(); setIsDragging(false); }}
              onDragOver={e => e.preventDefault()}
              onDrop={handleDrop}
              onClick={() => fileInputRef.current?.click()}
            >
              <div className="upload-icon-circle">
                <FiUploadCloud size={28} />
              </div>
              <h3 className="upload-drop-title">Upload Bank Statements</h3>
              <p className="upload-drop-sub">
                {uploadedFile ? `Selected: ${uploadedFile.name}` : 'Drag and drop your files here, or click to browse'}
              </p>
              <p className="upload-drop-formats">Supported formats: PDF, CSV, Excel, OFX&nbsp;&nbsp;•&nbsp;&nbsp;Max file size: 10MB</p>
              <button
                className="upload-choose-btn"
                onClick={e => { e.stopPropagation(); fileInputRef.current?.click(); }}
              >
                <FiUpload size={16} /> Choose Files
              </button>
              <input
                ref={fileInputRef}
                type="file"
                accept=".csv,.ofx,.qif,.xlsx,.pdf"
                style={{ display: 'none' }}
                onChange={handleFileSelect}
              />
            </div>

            {/* Recent Uploads */}
            <div className="upload-section">
              <div className="upload-section-title">
                <h2>Recent Uploads</h2>
                <button className="upload-info-btn" title="Recent file uploads">
                  <svg width="18" height="18" viewBox="0 0 20 20" fill="none">
                    <circle cx="10" cy="10" r="8" fill="#AFAFAF" />
                    <path fillRule="evenodd" clipRule="evenodd" d="M11.18 7.16C11.3 6.95 11.38 6.7 11.38 6.43C11.38 5.61 10.71 4.95 9.89 4.95C9.07 4.95 8.41 5.61 8.41 6.43C8.41 7.25 9.07 7.91 9.89 7.91C10.44 7.91 10.93 7.61 11.18 7.16ZM8.9 8.9H9.4H10.39C10.93 8.9 11.38 9.35 11.38 9.89V10.88V14.84C11.38 15.38 10.93 15.83 10.39 15.83C9.84 15.83 9.4 15.38 9.4 14.84V11.62C9.4 11.21 9.07 10.88 8.66 10.88C8.25 10.88 7.91 10.55 7.91 10.14V9.89C7.91 9.54 8.09 9.24 8.36 9.06C8.52 8.96 8.7 8.9 8.9 8.9Z" fill="white" />
                  </svg>
                </button>
              </div>

              <div className="transactions-table-wrapper">
                <table className="transactions-table">
                  <thead>
                    <tr>
                      <th>FILE NAME</th>
                      <th>DATE</th>
                      <th>UPLOADED BY</th>
                      <th>FORMAT</th>
                      <th>STATUS</th>
                      <th>ACTIONS</th>
                    </tr>
                  </thead>
                  <tbody>
                    {displayed.map(u => (
                      <tr key={u.id}>
                        <td>
                          <div className="upload-file-cell">
                            <span className="upload-file-icon"><FiFileText size={16} /></span>
                            <span className="upload-file-name">{u.fileName}</span>
                          </div>
                        </td>
                        <td className="txn-date">{u.date}</td>
                        <td className="upload-uploader">{u.uploadedBy}</td>
                        <td>
                          <span className={`upload-format-badge ${u.format === 'PDF' ? 'pdf' : 'excel'}`}>
                            {u.format}
                          </span>
                        </td>
                        <td>
                          <span className="upload-status-badge processed">{u.status}</span>
                        </td>
                        <td className="txn-actions">
                          <button className="upload-review-btn">REVIEW</button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* Pagination */}
              <div className="transactions-pagination">
                <div className="pagination-info">
                  Showing <input type="text" className="pagination-count" value={String(displayed.length).padStart(2, '0')} readOnly /> / {UPLOADS.length} Results
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
