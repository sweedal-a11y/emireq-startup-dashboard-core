import React, { useState } from "react";
import FinancialSidebar from "../../components/financial-sidebar/FinancialSidebar";
import Header from "./Header";
import LogoutConfirmModal from "../../components/logout-modal/LogoutConfirmModal";
import { useNavigate } from "react-router-dom";
import { FiSearch, FiDownload } from "react-icons/fi";
import "./IntegrationPage.css";

const INIT_INTEGRATIONS = [
  {
    id: "slack",
    name: "Slack",
    category: "Communication",
    description: "Post notifications to Slack channels when bills are paid or approved.",
    logo: "slack",
    connected: true,
    lastSync: "05:12:00",
    syncStatus: "LIVE",
    assignedUser: "John Doe",
    action: "Sync",
    entity: "Notifications",
  },
  {
    id: "stripe",
    name: "Stripe",
    category: "Payments",
    description: "Automatically sync Stripe payouts and fees with your ledger.",
    logo: "stripe",
    connected: true,
    lastSync: "05:12:00",
    syncStatus: "LIVE",
    assignedUser: "Jane Smith",
    action: "Sync",
    entity: "Transactions",
  },
  {
    id: "salesforce",
    name: "Salesforce",
    category: "CRM",
    description: "Sync customer data and invoices directly from Salesforce opportunities.",
    logo: "salesforce",
    connected: false,
    installStyle: "yellow",
    assignedUser: "Mike Ross",
    action: "Import",
    entity: "Invoices",
  },
  {
    id: "aws",
    name: "AWS",
    category: "Infrastructure",
    description: "Automate infrastructure expense reporting and cloud cost allocation.",
    logo: "aws",
    connected: true,
    lastSync: "05:12:00",
    syncStatus: "LIVE",
    assignedUser: "John Doe",
    action: "Export",
    entity: "Expenses",
  },
  {
    id: "quickbooks",
    name: "QuickBooks",
    category: "Other",
    description: "Bi-directional sync for accounts, vendors, and journal entries.",
    logo: "quickbooks",
    connected: false,
    installStyle: "dark",
    assignedUser: "Jane Smith",
    action: "Sync",
    entity: "Journals",
  },
  {
    id: "hubspot",
    name: "HubSpot",
    category: "CRM",
    description: "Track marketing spend and customer acquisition costs in real-time.",
    logo: "hubspot",
    connected: true,
    lastSync: "05:12:00",
    syncStatus: "LIVE",
    assignedUser: "Mike Ross",
    action: "Import",
    entity: "Expenses",
  },
];

export default function IntegrationPage() {
  const navigate = useNavigate();
  const [showLogoutModal, setShowLogoutModal] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [searchApps, setSearchApps] = useState("");
  const [searchTransaction, setSearchTransaction] = useState("");
  const [filterUsers, setFilterUsers] = useState("All Users");
  const [filterActions, setFilterActions] = useState("All Actions");
  const [filterEntities, setFilterEntities] = useState("All Entities");
  const [integrations, setIntegrations] = useState(INIT_INTEGRATIONS);

  const handleLogoutClick = () => setShowLogoutModal(true);
  const handleCloseLogoutModal = () => setShowLogoutModal(false);
  const handleConfirmLogout = () => {
    localStorage.removeItem("authToken");
    sessionStorage.clear();
    setShowLogoutModal(false);
    navigate("/auth/login");
  };

  const toggleConnection = (id) => {
    setIntegrations((prev) =>
      prev.map((item) =>
        item.id === id
          ? {
              ...item,
              connected: !item.connected,
              ...(item.connected
                ? { lastSync: undefined, syncStatus: undefined, installStyle: "dark" }
                : { lastSync: "05:12:00", syncStatus: "LIVE", installStyle: undefined }),
            }
          : item
      )
    );
  };

  const userOptions = [...new Set(integrations.map((i) => i.assignedUser))];
  const actionOptions = [...new Set(integrations.map((i) => i.action))];
  const entityOptions = [...new Set(integrations.map((i) => i.entity))];

  const filtered = integrations.filter((item) => {
    const term = (searchApps || searchTransaction).toLowerCase();
    const matchSearch = !term || item.name.toLowerCase().includes(term) || item.category.toLowerCase().includes(term);
    const matchUser = filterUsers === "All Users" || item.assignedUser === filterUsers;
    const matchAction = filterActions === "All Actions" || item.action === filterActions;
    const matchEntity = filterEntities === "All Entities" || item.entity === filterEntities;
    return matchSearch && matchUser && matchAction && matchEntity;
  });

  return (
    <div className={`financial-core-page ${isDarkMode ? "dark-mode" : ""}`}>
      <FinancialSidebar onLogout={handleLogoutClick} isDarkMode={isDarkMode} activePage="setup" />
      <div className="financial-core-main">
        <Header isDarkMode={isDarkMode} toggleTheme={() => setIsDarkMode((p) => !p)} />
        <main className="financial-core-content">
          <div className="ig-container">
            {/* Page Header */}
            <div className="ig-page-header">
              <div className="ig-page-header-left">
                <h1>Integrations Marketplace</h1>
                <p>Connect and orchestrate your entire financial stack from one place.</p>
              </div>
              <div className="ig-page-header-right">
                <div className="ig-search-apps">
                  <FiSearch size={14} color="#9ca3af" />
                  <input
                    type="text"
                    placeholder="Search Apps"
                    value={searchApps}
                    onChange={(e) => setSearchApps(e.target.value)}
                  />
                </div>
                <button className="ig-btn-export">
                  <FiDownload size={14} />
                  Export All
                </button>
              </div>
            </div>

            {/* Toolbar */}
            <div className="ig-toolbar">
              <div className="ig-search-box">
                <FiSearch size={14} color="#9ca3af" />
                <input
                  type="text"
                  placeholder="Search Transaction"
                  value={searchTransaction}
                  onChange={(e) => setSearchTransaction(e.target.value)}
                />
              </div>
              <div className="ig-filter-group">
                <select className="ig-filter-select" value={filterUsers} onChange={(e) => setFilterUsers(e.target.value)}>
                  <option>All Users</option>
                  {userOptions.map((u) => <option key={u} value={u}>{u}</option>)}
                </select>
                <select className="ig-filter-select" value={filterActions} onChange={(e) => setFilterActions(e.target.value)}>
                  <option>All Actions</option>
                  {actionOptions.map((a) => <option key={a} value={a}>{a}</option>)}
                </select>
                <select className="ig-filter-select" value={filterEntities} onChange={(e) => setFilterEntities(e.target.value)}>
                  <option>All Entities</option>
                  {entityOptions.map((e) => <option key={e} value={e}>{e}</option>)}
                </select>
              </div>
            </div>

            {/* Cards Grid */}
            <div className="ig-cards-grid">
              {filtered.map((item) => (
                <div className="ig-card" key={item.id}>
                  <div className="ig-card-top">
                    <div className={`ig-card-logo ${item.logo}`}></div>
                    <span className={`ig-card-status ${item.connected ? "connected" : "disconnected"}`}>
                      {item.connected ? "CONNECTED" : "DISCONNECTED"}
                    </span>
                  </div>
                  <h3 className="ig-card-name">{item.name}</h3>
                  <p className="ig-card-category">{item.category}</p>
                  <p className="ig-card-desc">{item.description}</p>

                  {item.connected ? (
                    <div className="ig-card-footer connected">
                      <div className="ig-sync-info">
                        <div className="ig-sync-col">
                          <span className="ig-sync-label">LAST SYNC</span>
                          <span className="ig-sync-value">{item.lastSync}</span>
                        </div>
                        <div className="ig-sync-col right">
                          <span className="ig-sync-label">SYNC STATUS</span>
                          <span className="ig-sync-value live">{item.syncStatus}</span>
                        </div>
                      </div>
                      <div className="ig-card-actions">
                        <button className="ig-btn-disconnect" onClick={() => toggleConnection(item.id)}>DISCONNECT</button>
                        <button className="ig-btn-configure">CONFIGURE</button>
                      </div>
                    </div>
                  ) : (
                    <div className="ig-card-footer disconnected">
                      <button
                        className={`ig-btn-install ${item.installStyle || "dark"}`}
                        onClick={() => toggleConnection(item.id)}
                      >
                        INSTALL INTEGRATION
                      </button>
                    </div>
                  )}
                </div>
              ))}
            </div>

            {/* Request Integration */}
            <div className="ig-request-section">
              <div className="ig-request-icon">
                <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#6b7280" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71" />
                  <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71" />
                </svg>
              </div>
              <h3>Request Integration</h3>
              <p>Can't find what you're looking for? Let us know.</p>
              <button className="ig-btn-submit">SUBMIT REQUEST</button>
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
