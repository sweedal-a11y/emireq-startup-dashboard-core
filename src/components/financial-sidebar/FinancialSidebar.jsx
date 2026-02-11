import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./FinancialSidebar.css";

export default function FinancialSidebar({ onLogout, isDarkMode, activePage = "dashboard" }) {
  const navigate = useNavigate();
  const [activeItem, setActiveItem] = useState(activePage);

  // Update active item when activePage prop changes
  React.useEffect(() => {
    setActiveItem(activePage);
  }, [activePage]);

  const handleBackToMain = () => {
    navigate("/overview");
  };

  const handleItemClick = (itemId) => {
    setActiveItem(itemId);
    // Navigate to the appropriate route
    if (itemId === 'transactions') {
      navigate('/financial-core/transactions');
    } else if (itemId === 'dashboard') {
      navigate('/financial-core');
    } else if (itemId === 'sales') {
      navigate('/financial-core/sales');
    }
    // Add more navigation logic for other pages as needed
  };

  const menuItems = [
    { id: "dashboard", label: "Dashboard", icon: "dashboard" },
    { id: "transactions", label: "Transactions", icon: "transactions" },
    { id: "sales", label: "Sales", icon: "sales" },
    { id: "purchases", label: "Purchases", icon: "purchases" },
    { id: "banking", label: "Banking & Wallets", icon: "banking" },
    { id: "expenses", label: "Expenses & Payroll", icon: "expenses" },
    { id: "reports", label: "Reports & Insights", icon: "reports" },
    { id: "setup", label: "Setup & Control", icon: "setup" },
    { id: "ai", label: "AI & Automation", icon: "ai" },
    { id: "support", label: "Support", icon: "support" },
  ];

  const getIcon = (iconType) => {
    const icons = {
      dashboard: (
       <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M6.66667 2H2V6.66667H6.66667V2Z" stroke="#121212" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M13.9999 2H9.33325V6.66667H13.9999V2Z" stroke="#121212" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M13.9999 9.33334H9.33325V14H13.9999V9.33334Z" stroke="#121212" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M6.66667 9.33334H2V14H6.66667V9.33334Z" stroke="#121212" stroke-linecap="round" stroke-linejoin="round"/>
</svg>

      ),
      transactions: (
     <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M13.3333 3.33334H2.66659C1.93021 3.33334 1.33325 3.9303 1.33325 4.66668V11.3333C1.33325 12.0697 1.93021 12.6667 2.66659 12.6667H13.3333C14.0696 12.6667 14.6666 12.0697 14.6666 11.3333V4.66668C14.6666 3.9303 14.0696 3.33334 13.3333 3.33334Z" stroke="#4A5565" stroke-width="1.33333" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M1.33325 6.66669H14.6666" stroke="#4A5565" stroke-width="1.33333" stroke-linecap="round" stroke-linejoin="round"/>
</svg>

      ),
      sales: (
       <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M8 1.33331V14.6666" stroke="#4A5565" stroke-width="1.33333" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M11.3333 3.33331H6.33333C5.71449 3.33331 5.121 3.57915 4.68342 4.01673C4.24583 4.45432 4 5.04781 4 5.66665C4 6.28548 4.24583 6.87898 4.68342 7.31656C5.121 7.75415 5.71449 7.99998 6.33333 7.99998H9.66667C10.2855 7.99998 10.879 8.24581 11.3166 8.6834C11.7542 9.12098 12 9.71447 12 10.3333C12 10.9522 11.7542 11.5456 11.3166 11.9832C10.879 12.4208 10.2855 12.6666 9.66667 12.6666H4" stroke="#4A5565" stroke-width="1.33333" stroke-linecap="round" stroke-linejoin="round"/>
</svg>

      ),
      purchases: (
       <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M1.33325 8.00002C1.33325 5.48602 1.33325 4.22869 2.11459 3.44802C2.89592 2.66735 4.15259 2.66669 6.66658 2.66669H9.33325C11.8473 2.66669 13.1046 2.66669 13.8853 3.44802C14.6659 4.22935 14.6666 5.48602 14.6666 8.00002C14.6666 10.514 14.6666 11.7714 13.8853 12.552C13.1039 13.3327 11.8473 13.3334 9.33325 13.3334H6.66658C4.15259 13.3334 2.89525 13.3334 2.11459 12.552C1.33392 11.7707 1.33325 10.514 1.33325 8.00002Z" stroke="#4A5565" stroke-width="1.3"/>
<path d="M6.66658 10.6667H3.99992M9.33325 10.6667H8.33325M1.33325 6.66669H14.6666" stroke="#4A5565" stroke-width="1.3" stroke-linecap="round"/>
</svg>

      ),
      banking: (
       <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M2 14.6667H14" stroke="#4A5565" stroke-width="1.33333" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M4 12V7.33331" stroke="#4A5565" stroke-width="1.33333" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M6.66675 12V7.33331" stroke="#4A5565" stroke-width="1.33333" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M9.33325 12V7.33331" stroke="#4A5565" stroke-width="1.33333" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M12 12V7.33331" stroke="#4A5565" stroke-width="1.33333" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M8.00008 1.33331L13.3334 4.66665H2.66675L8.00008 1.33331Z" stroke="#4A5565" stroke-width="1.33333" stroke-linecap="round" stroke-linejoin="round"/>
</svg>

      ),
      expenses: (
       <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M10.6666 13.3333V2.66665C10.6666 2.31302 10.5261 1.97389 10.2761 1.72384C10.026 1.47379 9.68687 1.33331 9.33325 1.33331H6.66659C6.31296 1.33331 5.97383 1.47379 5.72378 1.72384C5.47373 1.97389 5.33325 2.31302 5.33325 2.66665V13.3333" stroke="#4A5565" stroke-width="1.33333" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M13.3333 4H2.66659C1.93021 4 1.33325 4.59695 1.33325 5.33333V12C1.33325 12.7364 1.93021 13.3333 2.66659 13.3333H13.3333C14.0696 13.3333 14.6666 12.7364 14.6666 12V5.33333C14.6666 4.59695 14.0696 4 13.3333 4Z" stroke="#4A5565" stroke-width="1.33333" stroke-linecap="round" stroke-linejoin="round"/>
</svg>

      ),
      reports: (
        <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M14.6666 4.66663L8.99992 10.3333L5.66659 6.99996L1.33325 11.3333" stroke="#4A5565" stroke-width="1.33333" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M10.6667 4.66663H14.6667V8.66663" stroke="#4A5565" stroke-width="1.33333" stroke-linecap="round" stroke-linejoin="round"/>
</svg>

      ),
      setup: (
      <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M8.14667 1.33331H7.85333C7.49971 1.33331 7.16057 1.47379 6.91053 1.72384C6.66048 1.97389 6.52 2.31302 6.52 2.66665V2.78665C6.51976 3.02046 6.45804 3.25011 6.34103 3.45254C6.22401 3.65497 6.05583 3.82307 5.85333 3.93998L5.56667 4.10665C5.36398 4.22367 5.13405 4.28528 4.9 4.28528C4.66595 4.28528 4.43603 4.22367 4.23333 4.10665L4.13333 4.05331C3.82738 3.87682 3.46389 3.82894 3.12267 3.92018C2.78145 4.01143 2.49037 4.23434 2.31333 4.53998L2.16667 4.79331C1.99018 5.09927 1.9423 5.46275 2.03354 5.80398C2.12478 6.1452 2.34769 6.43628 2.65333 6.61331L2.75333 6.67998C2.95485 6.79632 3.12241 6.96337 3.23937 7.16453C3.35632 7.36569 3.4186 7.59396 3.42 7.82665V8.16665C3.42093 8.40159 3.35977 8.63261 3.2427 8.83632C3.12563 9.04002 2.95681 9.20917 2.75333 9.32665L2.65333 9.38665C2.34769 9.56368 2.12478 9.85476 2.03354 10.196C1.9423 10.5372 1.99018 10.9007 2.16667 11.2066L2.31333 11.46C2.49037 11.7656 2.78145 11.9885 3.12267 12.0798C3.46389 12.171 3.82738 12.1231 4.13333 11.9466L4.23333 11.8933C4.43603 11.7763 4.66595 11.7147 4.9 11.7147C5.13405 11.7147 5.36398 11.7763 5.56667 11.8933L5.85333 12.06C6.05583 12.1769 6.22401 12.345 6.34103 12.5474C6.45804 12.7499 6.51976 12.9795 6.52 13.2133V13.3333C6.52 13.6869 6.66048 14.0261 6.91053 14.2761C7.16057 14.5262 7.49971 14.6666 7.85333 14.6666H8.14667C8.50029 14.6666 8.83943 14.5262 9.08948 14.2761C9.33953 14.0261 9.48 13.6869 9.48 13.3333V13.2133C9.48024 12.9795 9.54196 12.7499 9.65898 12.5474C9.77599 12.345 9.94418 12.1769 10.1467 12.06L10.4333 11.8933C10.636 11.7763 10.866 11.7147 11.1 11.7147C11.3341 11.7147 11.564 11.7763 11.7667 11.8933L11.8667 11.9466C12.1726 12.1231 12.5361 12.171 12.8773 12.0798C13.2186 11.9885 13.5096 11.7656 13.6867 11.46L13.8333 11.2C14.0098 10.894 14.0577 10.5305 13.9665 10.1893C13.8752 9.84809 13.6523 9.55701 13.3467 9.37998L13.2467 9.32665C13.0432 9.20917 12.8744 9.04002 12.7573 8.83632C12.6402 8.63261 12.5791 8.40159 12.58 8.16665V7.83331C12.5791 7.59837 12.6402 7.36734 12.7573 7.16364C12.8744 6.95994 13.0432 6.79079 13.2467 6.67331L13.3467 6.61331C13.6523 6.43628 13.8752 6.1452 13.9665 5.80398C14.0577 5.46275 14.0098 5.09927 13.8333 4.79331L13.6867 4.53998C13.5096 4.23434 13.2186 4.01143 12.8773 3.92018C12.5361 3.82894 12.1726 3.87682 11.8667 4.05331L11.7667 4.10665C11.564 4.22367 11.3341 4.28528 11.1 4.28528C10.866 4.28528 10.636 4.22367 10.4333 4.10665L10.1467 3.93998C9.94418 3.82307 9.77599 3.65497 9.65898 3.45254C9.54196 3.25011 9.48024 3.02046 9.48 2.78665V2.66665C9.48 2.31302 9.33953 1.97389 9.08948 1.72384C8.83943 1.47379 8.50029 1.33331 8.14667 1.33331Z" stroke="#4A5565" stroke-width="1.33333" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M8 10C9.10457 10 10 9.10457 10 8C10 6.89543 9.10457 6 8 6C6.89543 6 6 6.89543 6 8C6 9.10457 6.89543 10 8 10Z" stroke="#4A5565" stroke-width="1.33333" stroke-linecap="round" stroke-linejoin="round"/>
</svg>

      ),
      ai: (
       <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
<g clip-path="url(#clip0_227_8694)">
<path d="M9.52287 10.1374L8.86136 12.4512C8.61348 13.3173 7.38603 13.3173 7.13815 12.4512L6.47738 10.1374C6.43555 9.99104 6.35711 9.85775 6.24947 9.75011C6.14182 9.64246 6.00853 9.56402 5.86216 9.52219L3.54837 8.86142C2.68228 8.61354 2.68228 7.38609 3.54837 7.13821L5.86216 6.47744C6.00853 6.43561 6.14182 6.35717 6.24947 6.24953C6.35711 6.14188 6.43555 6.00859 6.47738 5.86222L7.13815 3.54843C7.38603 2.68234 8.61348 2.68234 8.86136 3.54843L9.52213 5.86222C9.56396 6.00859 9.6424 6.14188 9.75005 6.24953C9.85769 6.35717 9.99098 6.43561 10.1373 6.47744L12.4511 7.13821C13.3172 7.38609 13.3172 8.61354 12.4511 8.86142L10.1373 9.52219C9.99098 9.56402 9.85769 9.64246 9.75005 9.75011C9.6424 9.85775 9.56396 9.99104 9.52213 10.1374M13.6517 13.7608L13.371 14.8867C13.3337 15.0375 13.1194 15.0375 13.0813 14.8867L12.7998 13.7608C12.7932 13.7347 12.7797 13.7108 12.7606 13.6917C12.7416 13.6727 12.7177 13.6591 12.6916 13.6525L11.5656 13.371C11.4148 13.3337 11.4148 13.1194 11.5656 13.0814L12.6916 12.7999C12.7177 12.7933 12.7416 12.7797 12.7606 12.7607C12.7797 12.7416 12.7932 12.7178 12.7998 12.6916L13.0813 11.5657C13.1186 11.4149 13.3329 11.4149 13.371 11.5657L13.6525 12.6916C13.6591 12.7178 13.6726 12.7416 13.6917 12.7607C13.7107 12.7797 13.7346 12.7933 13.7607 12.7999L14.8866 13.0814C15.0375 13.1187 15.0375 13.333 14.8866 13.371L13.7607 13.6525C13.7346 13.6591 13.7107 13.6727 13.6917 13.6917C13.6726 13.7108 13.6583 13.7347 13.6517 13.7608ZM3.19895 3.30801L2.91821 4.43393C2.88088 4.58475 2.66585 4.58475 2.62852 4.43393L2.34704 3.30801C2.34045 3.28188 2.3269 3.25801 2.30784 3.23895C2.28878 3.21989 2.26492 3.20635 2.23878 3.19975L1.11287 2.91827C0.962051 2.88094 0.962051 2.66591 1.11287 2.62858L2.23878 2.3471C2.26492 2.34051 2.28878 2.32697 2.30784 2.30791C2.3269 2.28884 2.34045 2.26498 2.34704 2.23884L2.62852 1.11293C2.66585 0.962112 2.88088 0.962112 2.91821 1.11293L3.19969 2.23884C3.20629 2.26498 3.21983 2.28884 3.23889 2.30791C3.25795 2.32697 3.28182 2.34051 3.30795 2.3471L4.43387 2.62858C4.58468 2.66591 4.58468 2.88094 4.43387 2.91827L3.30795 3.19975C3.28182 3.20635 3.25795 3.21989 3.23889 3.23895C3.21983 3.25801 3.20554 3.28188 3.19895 3.30801Z" stroke="#4A5565" stroke-width="1.3" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"/>
</g>
<defs>
<clipPath id="clip0_227_8694">
<rect width="16" height="16" fill="white"/>
</clipPath>
</defs>
</svg>

      ),
      support: (
       <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M7.99992 14.6666C11.6818 14.6666 14.6666 11.6819 14.6666 7.99998C14.6666 4.31808 11.6818 1.33331 7.99992 1.33331C4.31802 1.33331 1.33325 4.31808 1.33325 7.99998C1.33325 11.6819 4.31802 14.6666 7.99992 14.6666Z" stroke="#4A5565" stroke-width="1.33333" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M6.06006 6.00001C6.21679 5.55446 6.52616 5.17875 6.93336 4.93944C7.34056 4.70012 7.81932 4.61264 8.28484 4.69249C8.75036 4.77234 9.1726 5.01436 9.47678 5.3757C9.78095 5.73703 9.94743 6.19436 9.94673 6.66668C9.94673 8.00001 7.94673 8.66668 7.94673 8.66668" stroke="#4A5565" stroke-width="1.33333" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M8 11.3333H8.00667" stroke="#4A5565" stroke-width="1.33333" stroke-linecap="round" stroke-linejoin="round"/>
</svg>

      ),
    };
    return icons[iconType] || null;
  };

  return (
    <aside className={`financial-sidebar ${isDarkMode ? 'dark-mode' : ''}`}>
      {/* Header with Back Button */}
      <div className="financial-sidebar-header">
        <button className="back-button" onClick={handleBackToMain}>
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M7.99992 12.6667L3.33325 8.00001L7.99992 3.33334" stroke="#4A5565" stroke-width="1.33333" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M12.6666 8H3.33325" stroke="#4A5565" stroke-width="1.33333" stroke-linecap="round" stroke-linejoin="round"/>
</svg>

          <span>Back to Emireq Investor</span>
        </button>
      </div>

      {/* Title Section */}
      <div className="financial-sidebar-title">
        <h2>Financial Core</h2>
        <p>Financial intelligence & compliance</p>
      </div>

      {/* Menu Items */}
      <nav className="financial-sidebar-nav">
        {menuItems.map((item) => (
          <button
            key={item.id}
            className={`financial-nav-item ${activeItem === item.id ? "active" : ""}`}
            onClick={() => handleItemClick(item.id)}
          >
            <span className="nav-item-icon">{getIcon(item.icon)}</span>
            <span className="nav-item-label">{item.label}</span>
          </button>
        ))}
      </nav>

      {/* Account Section */}
      <div className="financial-sidebar-account">
        <p className="account-title">ACCOUNT</p>
        <button className="logout-button" onClick={onLogout}>
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M6 14H3.33333C2.97971 14 2.64057 13.8595 2.39052 13.6095C2.14048 13.3594 2 13.0203 2 12.6667V3.33333C2 2.97971 2.14048 2.64057 2.39052 2.39052C2.64057 2.14048 2.97971 2 3.33333 2H6" stroke="#121212" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M10.666 11.3327L13.9993 7.99935L10.666 4.66602" stroke="#121212" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M14 8H6" stroke="#121212" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
          <span>Log out</span>
        </button>
      </div>
    </aside>
  );
}
