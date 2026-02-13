import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation, useSearchParams } from 'react-router-dom';
import './SalesARSidebar.css';

export default function SalesARSidebar({ isDarkMode, onLogout }) {
  const navigate = useNavigate();
  const location = useLocation();
  const [searchParams] = useSearchParams();

  // Determine active menu item based on current path and query params
  const getActiveItem = () => {
    if (location.pathname.includes('/invoices')) return 'invoices';
    if (location.pathname.includes('/payments')) return 'payments';
    if (location.pathname.includes('/aging')) return 'aging';
    
    // Check query parameter for sales page
    const viewParam = searchParams.get('view');
    if (viewParam) return viewParam;
    
    if (location.pathname.includes('/customers')) return 'customers';
    return 'customers';
  };

  const [activeItem, setActiveItem] = useState(getActiveItem());

  // Update active item when location or search params change
  useEffect(() => {
    const newActiveItem = getActiveItem();
    if (newActiveItem !== activeItem) {
      setActiveItem(newActiveItem);
    }
  }, [location.pathname, searchParams]);

  const handleBackClick = () => {
    navigate('/financial-core');
  };

  const handleMenuItemClick = (itemId) => {
    setActiveItem(itemId);
    // Navigate based on item
    switch(itemId) {
      case 'customers':
        navigate('/financial-core/sales?view=customers');
        break;
      case 'invoices':
        navigate('/financial-core/sales?view=invoices');
        break;
      case 'payments':
        navigate('/financial-core/sales?view=payments');
        break;
      case 'aging':
        navigate('/financial-core/sales?view=aging');
        break;
      default:
        break;
    }
  };

  const handleLogoutClick = () => {
    if (onLogout) {
      onLogout();
    }
  };

  return (
    <div className={`sales-ar-sidebar ${isDarkMode ? 'dark-mode' : ''}`}>
      {/* Back Button */}
      <button className="sales-ar-back-btn" onClick={handleBackClick}>
        <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M12.5 15L7.5 10L12.5 5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
        <span>Back to Emireq Investor</span>
      </button>

      {/* Title Section */}
      <div className="sales-ar-title">
        <h2>Sales (AR)</h2>
        <p>Accounts Receivable Management</p>
      </div>

      {/* Menu Items */}
      <nav className="sales-ar-menu">
        <button 
          className={`sales-ar-menu-item ${activeItem === 'customers' ? 'active' : ''}`}
          onClick={() => handleMenuItemClick('customers')}
        >
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M16.6667 17.5V15.8333C16.6667 14.9493 16.3155 14.1014 15.6904 13.4763C15.0652 12.8512 14.2174 12.5 13.3334 12.5H6.66671C5.78265 12.5 4.93481 12.8512 4.30968 13.4763C3.68456 14.1014 3.33337 14.9493 3.33337 15.8333V17.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M9.99996 9.16667C11.8409 9.16667 13.3333 7.67428 13.3333 5.83333C13.3333 3.99238 11.8409 2.5 9.99996 2.5C8.15901 2.5 6.66663 3.99238 6.66663 5.83333C6.66663 7.67428 8.15901 9.16667 9.99996 9.16667Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
          <span>Customers</span>
        </button>

        <button 
          className={`sales-ar-menu-item ${activeItem === 'invoices' ? 'active' : ''}`}
          onClick={() => handleMenuItemClick('invoices')}
        >
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M11.6667 1.66667H5.00004C4.55801 1.66667 4.13409 1.84226 3.82153 2.15482C3.50897 2.46738 3.33337 2.89131 3.33337 3.33334V16.6667C3.33337 17.1087 3.50897 17.5326 3.82153 17.8452C4.13409 18.1577 4.55801 18.3333 5.00004 18.3333H15C15.4421 18.3333 15.866 18.1577 16.1786 17.8452C16.4911 17.5326 16.6667 17.1087 16.6667 16.6667V6.66667L11.6667 1.66667Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M11.6667 1.66667V6.66667H16.6667" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M13.3334 10.8333H6.66671" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M13.3334 14.1667H6.66671" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M8.33337 7.5H7.50004H6.66671" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
          <span>Invoices</span>
        </button>

        <button 
          className={`sales-ar-menu-item ${activeItem === 'payments' ? 'active' : ''}`}
          onClick={() => handleMenuItemClick('payments')}
        >
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M17.5 4.16667H2.5C1.57953 4.16667 0.833374 4.91286 0.833374 5.83334V14.1667C0.833374 15.0871 1.57953 15.8333 2.5 15.8333H17.5C18.4205 15.8333 19.1667 15.0871 19.1667 14.1667V5.83334C19.1667 4.91286 18.4205 4.16667 17.5 4.16667Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M0.833374 8.33333H19.1667" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
          <span>Payments</span>
        </button>

        <button 
          className={`sales-ar-menu-item ${activeItem === 'aging' ? 'active' : ''}`}
          onClick={() => handleMenuItemClick('aging')}
        >
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M2.5 15L7.5 10L10.8333 13.3333L17.5 6.66667" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M13.3333 6.66667H17.5V10.8333" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
          <span>Aging Analysis</span>
        </button>
      </nav>

      {/* Account Section */}
      <div className="sales-ar-account">
        <p className="sales-ar-account-label">ACCOUNT</p>
        <button className="sales-ar-logout-btn" onClick={handleLogoutClick}>
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M7.5 17.5H4.16667C3.72464 17.5 3.30072 17.3244 2.98816 17.0118C2.67559 16.6993 2.5 16.2754 2.5 15.8333V4.16667C2.5 3.72464 2.67559 3.30072 2.98816 2.98816C3.30072 2.67559 3.72464 2.5 4.16667 2.5H7.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M13.3333 14.1667L17.5 10L13.3333 5.83334" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M17.5 10H7.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
          <span>Log out</span>
        </button>
      </div>
    </div>
  );
}
