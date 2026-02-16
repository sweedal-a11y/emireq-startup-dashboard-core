import React, { useState, useMemo } from 'react';
import './AgingAnalysisView.css';

export default function AgingAnalysisView({ isDarkMode }) {
  const [selectedCustomer, setSelectedCustomer] = useState('All');
  const [selectedCurrency, setSelectedCurrency] = useState('All');
  const [selectedLegalEntity, setSelectedLegalEntity] = useState('All');
  const [selectedSalesOwner, setSelectedSalesOwner] = useState('All');
  const [selectedDate, setSelectedDate] = useState('2026-02-02');

  const customerOptions = ['All', 'Acme Corporation', 'Global Solutions Ltd', 'Retail Partners Co', 'TechStart Inc', 'Innovation Labs'];
  const currencyOptions = ['All', 'USD', 'EUR', 'GBP', 'INR'];
  const legalEntityOptions = ['All', 'Entity 1', 'Entity 2', 'Entity 3'];
  const salesOwnerOptions = ['All', 'John Doe', 'Jane Smith', 'Mike Johnson'];

  // Customer aging data
  const customers = [
    {
      id: 1,
      name: 'Acme Corporation',
      currency: 'USD',
      legalEntity: 'Entity 1',
      salesOwner: 'John Doe',
      current: '$40,000',
      days1_30: '$35,000',
      days31_60: '$25,000',
      days61_90: '$15,000',
      days90plus: '$10,000',
      total: '$125,000',
      currentValue: 40000,
      days1_30Value: 35000,
      days31_60Value: 25000,
      days61_90Value: 15000,
      days90plusValue: 10000,
      totalValue: 125000,
      currentColor: '#00A63E',
      days1_30Color: '#F59E0B',
      days31_60Color: '#FB923C',
      days61_90Color: '#DC2626',
      days90plusColor: '#991B1B'
    },
    {
      id: 2,
      name: 'Global Solutions Ltd',
      currency: 'EUR',
      legalEntity: 'Entity 2',
      salesOwner: 'Jane Smith',
      current: '$45,000',
      days1_30: '$22,000',
      days31_60: '$12,000',
      days61_90: '$10,000',
      days90plus: '$0',
      total: '$89,000',
      currentValue: 45000,
      days1_30Value: 22000,
      days31_60Value: 12000,
      days61_90Value: 10000,
      days90plusValue: 0,
      totalValue: 89000,
      currentColor: '#00A63E',
      days1_30Color: '#F59E0B',
      days31_60Color: '#FB923C',
      days61_90Color: '#DC2626',
      days90plusColor: '#DC2626'
    },
    {
      id: 3,
      name: 'Retail Partners Co',
      currency: 'USD',
      legalEntity: 'Entity 1',
      salesOwner: 'Mike Johnson',
      current: '$35,000',
      days1_30: '$24,000',
      days31_60: '$8,000',
      days61_90: '$0',
      days90plus: '$0',
      total: '$67,000',
      currentValue: 35000,
      days1_30Value: 24000,
      days31_60Value: 8000,
      days61_90Value: 0,
      days90plusValue: 0,
      totalValue: 67000,
      currentColor: '#00A63E',
      days1_30Color: '#F59E0B',
      days31_60Color: '#FB923C',
      days61_90Color: '#DC2626',
      days90plusColor: '#DC2626'
    },
    {
      id: 4,
      name: 'TechStart Inc',
      currency: 'GBP',
      legalEntity: 'Entity 3',
      salesOwner: 'John Doe',
      current: '$28,000',
      days1_30: '$17,000',
      days31_60: '$0',
      days61_90: '$0',
      days90plus: '$0',
      total: '$45,000',
      currentValue: 28000,
      days1_30Value: 17000,
      days31_60Value: 0,
      days61_90Value: 0,
      days90plusValue: 0,
      totalValue: 45000,
      currentColor: '#00A63E',
      days1_30Color: '#F59E0B',
      days31_60Color: '#DC2626',
      days61_90Color: '#DC2626',
      days90plusColor: '#DC2626'
    },
    {
      id: 5,
      name: 'Innovation Labs',
      currency: 'USD',
      legalEntity: 'Entity 2',
      salesOwner: 'Jane Smith',
      current: '$23,000',
      days1_30: '$0',
      days31_60: '$0',
      days61_90: '$0',
      days90plus: '$0',
      total: '$23,000',
      currentValue: 23000,
      days1_30Value: 0,
      days31_60Value: 0,
      days61_90Value: 0,
      days90plusValue: 0,
      totalValue: 23000,
      currentColor: '#00A63E',
      days1_30Color: '#DC2626',
      days31_60Color: '#DC2626',
      days61_90Color: '#DC2626',
      days90plusColor: '#DC2626'
    }
  ];

  // Filter customers based on selected filters
  const filteredCustomers = useMemo(() => {
    return customers.filter(customer => {
      if (selectedCustomer !== 'All' && customer.name !== selectedCustomer) return false;
      if (selectedCurrency !== 'All' && customer.currency !== selectedCurrency) return false;
      if (selectedLegalEntity !== 'All' && customer.legalEntity !== selectedLegalEntity) return false;
      if (selectedSalesOwner !== 'All' && customer.salesOwner !== selectedSalesOwner) return false;
      return true;
    });
  }, [selectedCustomer, selectedCurrency, selectedLegalEntity, selectedSalesOwner]);

  // Calculate totals from filtered customers
  const totals = useMemo(() => {
    const calculateTotal = filteredCustomers.reduce((acc, customer) => {
      return {
        currentValue: acc.currentValue + customer.currentValue,
        days1_30Value: acc.days1_30Value + customer.days1_30Value,
        days31_60Value: acc.days31_60Value + customer.days31_60Value,
        days61_90Value: acc.days61_90Value + customer.days61_90Value,
        days90plusValue: acc.days90plusValue + customer.days90plusValue,
        totalValue: acc.totalValue + customer.totalValue
      };
    }, {
      currentValue: 0,
      days1_30Value: 0,
      days31_60Value: 0,
      days61_90Value: 0,
      days90plusValue: 0,
      totalValue: 0
    });

    return {
      current: `$${calculateTotal.currentValue.toLocaleString()}`,
      days1_30: `$${calculateTotal.days1_30Value.toLocaleString()}`,
      days31_60: `$${calculateTotal.days31_60Value.toLocaleString()}`,
      days61_90: `$${calculateTotal.days61_90Value.toLocaleString()}`,
      days90plus: `$${calculateTotal.days90plusValue.toLocaleString()}`,
      total: `$${calculateTotal.totalValue.toLocaleString()}`
    };
  }, [filteredCustomers]);

  // Aging bucket data - dynamically calculated from totals
  const agingCards = useMemo(() => [
    {
      id: 1,
      label: 'Total Receivables',
      amount: totals.total,
      color: '#121212'
    },
    {
      id: 2,
      label: 'Current',
      amount: totals.current,
      color: '#00A63E'
    },
    {
      id: 3,
      label: '1-30 Days',
      amount: totals.days1_30,
      color: '#F59E0B'
    },
    {
      id: 4,
      label: '31-60 Days',
      amount: totals.days31_60,
      color: '#FB923C'
    },
    {
      id: 5,
      label: '61-90 Days',
      amount: totals.days61_90,
      color: '#DC2626'
    },
    {
      id: 6,
      label: '90+ Days',
      amount: totals.days90plus,
      color: '#991B1B'
    }
  ], [totals]);

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      month: 'short', 
      day: 'numeric', 
      year: 'numeric' 
    });
  };

  return (
    <div className={`aging-analysis-view ${isDarkMode ? 'dark-mode' : ''}`}>
      {/* Aging Bucket Cards */}
      <div className="aging-cards-grid">
        {agingCards.map((card) => (
          <div key={card.id} className="aging-card">
            <div className="aging-card-label">{card.label}</div>
            <div className="aging-card-amount" style={{ color: card.color }}>
              {card.amount}
            </div>
          </div>
        ))}
      </div>

      {/* Aging Analysis Section */}
      <div className="aging-analysis-section">
        <div className="aging-section-header">
          <div className="aging-title-row">
            <h2>Aging Analysis</h2>
            <button className="info-icon-btn" title="Information about aging analysis">
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                <circle cx="7.91351" cy="7.91351" r="7.91351" fill="#AFAFAF"/>
                <path fillRule="evenodd" clipRule="evenodd" d="M9.20451 5.18474C9.32816 4.96836 9.39771 4.7172 9.39771 4.45058C9.39771 3.63141 8.7331 2.9668 7.91393 2.9668C7.09475 2.9668 6.43014 3.63141 6.43014 4.45058C6.43014 5.26975 7.09475 5.93436 7.91393 5.93436C8.46648 5.93436 8.94948 5.63297 9.20451 5.18474ZM6.92474 6.92355H7.41933H8.40852C8.95528 6.92355 9.39771 7.36598 9.39771 7.91274V8.90193V12.8587C9.39771 13.4054 8.95528 13.8479 8.40852 13.8479C7.86176 13.8479 7.41933 13.4054 7.41933 12.8587V9.64382C7.41933 9.23424 7.08702 8.90193 6.67744 8.90193C6.26785 8.90193 5.93555 8.56963 5.93555 8.16004V7.91274C5.93555 7.56498 6.11522 7.25779 6.38571 7.08198C6.54027 6.98151 6.72574 6.92355 6.92474 6.92355Z" fill="white"/>
              </svg>
            </button>
          </div>
          <p className="aging-subtitle">Track overdue receivables by aging bucket</p>
        </div>

        {/* Filters */}
        <div className="aging-filters">
          <select 
            className="filter-dropdown"
            value={selectedCustomer}
            onChange={(e) => setSelectedCustomer(e.target.value)}
          >
            <option value="All">Customer</option>
            {customerOptions.filter(c => c !== 'All').map(customer => (
              <option key={customer} value={customer}>{customer}</option>
            ))}
          </select>

          <select 
            className="filter-dropdown"
            value={selectedCurrency}
            onChange={(e) => setSelectedCurrency(e.target.value)}
          >
            <option value="All">Currency</option>
            {currencyOptions.filter(c => c !== 'All').map(currency => (
              <option key={currency} value={currency}>{currency}</option>
            ))}
          </select>

          <select 
            className="filter-dropdown"
            value={selectedLegalEntity}
            onChange={(e) => setSelectedLegalEntity(e.target.value)}
          >
            <option value="All">Legal Entity</option>
            {legalEntityOptions.filter(e => e !== 'All').map(entity => (
              <option key={entity} value={entity}>{entity}</option>
            ))}
          </select>

          <select 
            className="filter-dropdown"
            value={selectedSalesOwner}
            onChange={(e) => setSelectedSalesOwner(e.target.value)}
          >
            <option value="All">Sales Owner</option>
            {salesOwnerOptions.filter(s => s !== 'All').map(owner => (
              <option key={owner} value={owner}>{owner}</option>
            ))}
          </select>

          <div className="date-picker-wrapper">
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M15.8333 3.33398H4.16667C3.24619 3.33398 2.5 4.08018 2.5 5.00065V16.6673C2.5 17.5878 3.24619 18.334 4.16667 18.334H15.8333C16.7538 18.334 17.5 17.5878 17.5 16.6673V5.00065C17.5 4.08018 16.7538 3.33398 15.8333 3.33398Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M13.3333 1.66602V4.99935" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M6.66667 1.66602V4.99935" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M2.5 8.33398H17.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            <input 
              type="date" 
              className="date-picker"
              value={selectedDate}
              onChange={(e) => setSelectedDate(e.target.value)}
            />
            <span className="date-display">As of {formatDate(selectedDate)}</span>
          </div>
        </div>

        {/* Aging Table */}
        <div className="aging-table-container">
          <table className="aging-table">
            <thead>
              <tr>
                <th>CUSTOMER</th>
                <th>CURRENT</th>
                <th>1-30</th>
                <th>31-60</th>
                <th>61-90</th>
                <th>90+</th>
                <th>TOTAL OUTSTANDING</th>
              </tr>
            </thead>
            <tbody>
              {filteredCustomers.map((customer) => (
                <tr key={customer.id}>
                  <td>{customer.name}</td>
                  <td style={{ color: '#00A63E' }}>{customer.current}</td>
                  <td style={{ color: '#F59E0B' }}>{customer.days1_30}</td>
                  <td style={{ color: '#FB923C' }}>{customer.days31_60}</td>
                  <td style={{ color: '#DC2626' }}>{customer.days61_90}</td>
                  <td style={{ color: '#DC2626' }}>{customer.days90plus}</td>
                  <td className="total-outstanding-cell">{customer.total}</td>
                </tr>
              ))}
              <tr>
                <td style={{ fontWeight: 'bold' }}>Total</td>
                <td style={{ color: '#00A63E', fontWeight: 'bold' }}>{totals.current}</td>
                <td style={{ color: '#F59E0B', fontWeight: 'bold' }}>{totals.days1_30}</td>
                <td style={{ color: '#FB923C', fontWeight: 'bold' }}>{totals.days31_60}</td>
                <td style={{ color: '#DC2626', fontWeight: 'bold' }}>{totals.days61_90}</td>
                <td style={{ color: '#DC2626', fontWeight: 'bold' }}>{totals.days90plus}</td>
                <td className="total-outstanding-cell">{totals.total}</td>
              </tr>
            </tbody>
          </table>
        </div>
        
        {/* Footer Note */}
        <div className="aging-footer-note">
          Market data is updated in real-time. Prices are for reference only and may vary across exchanges.
        </div>
      </div>
    </div>
  );
}
