import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FiPlus, FiClock, FiMoreVertical } from 'react-icons/fi';
import FinancialSidebar from '../../components/financial-sidebar/FinancialSidebar';
import Header from './Header';
import LogoutConfirmModal from '../../components/logout-modal/LogoutConfirmModal';
import './BankRulesPage.css';

const RULES = [
  {
    id: 1,
    name: 'AWS Auto-Categorize',
    status: 'Active',
    description: 'If: Description contains "AWS" • Then: Assign to Infrastructure',
  },
  {
    id: 2,
    name: 'Rent Auto-Match',
    status: 'Active',
    description: 'If: Amount is 3500 AND Description contains "Rent" • Then: Match to Rent Expense',
  },
];

export default function BankRulesPage() {
  const navigate = useNavigate();
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [showLogout, setShowLogout] = useState(false);

  const logout = () => {
    localStorage.removeItem('authToken');
    sessionStorage.clear();
    setShowLogout(false);
    navigate('/auth/login');
  };

  return (
    <div className={`br-page ${isDarkMode ? 'dark-mode' : ''}`}>
      <FinancialSidebar onLogout={() => setShowLogout(true)} isDarkMode={isDarkMode} activePage="bank-rules" />
      <div className="br-main">
        <Header isDarkMode={isDarkMode} toggleTheme={() => setIsDarkMode(p => !p)} />
        <main className="br-content">
          <div className="br-container">

            {/* Page Header */}
            <div className="br-page-header">
              <div>
                <h1>Bank Rules</h1>
                <p>Automate transaction categorization and matching.</p>
              </div>
              <button className="br-add-btn">
                <FiPlus size={16} /> New Rule
              </button>
            </div>

            {/* Rules List */}
            <div className="br-rules-list">
              {RULES.map(rule => (
                <div key={rule.id} className="br-rule-card">
                  <div className="br-rule-icon-box">
                    <FiClock size={20} />
                  </div>
                  <div className="br-rule-info">
                    <div className="br-rule-name-row">
                      <span className="br-rule-name">{rule.name}</span>
                      <span className="br-rule-badge">{rule.status}</span>
                    </div>
                    <p className="br-rule-desc">{rule.description}</p>
                  </div>
                  <button className="br-rule-menu" title="More options">
                    <FiMoreVertical size={18} />
                  </button>
                </div>
              ))}
            </div>

          </div>
        </main>
      </div>
      {showLogout && <LogoutConfirmModal onClose={() => setShowLogout(false)} onConfirm={logout} />}
    </div>
  );
}
