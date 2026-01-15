import React, { useState } from 'react';
import './CompanySummaryCard.css';

export default function CompanySummaryCard() {
  const [isPressed, setIsPressed] = useState(false);

  const handleCompleteProfileClick = () => {
    setIsPressed(true);
    setTimeout(() => setIsPressed(false), 150);
    console.log('Complete Profile button clicked');
    // Add navigation or modal functionality here
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      handleCompleteProfileClick();
    }
  };

  const infoCards = [
    {
      id: 'problem',
      label: 'Problem Statement',
      value: 'Solving ABC Problems',
      icon: (
        <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M9.99999 18.3334C14.6024 18.3334 18.3333 14.6024 18.3333 10C18.3333 5.39765 14.6024 1.66669 9.99999 1.66669C5.39762 1.66669 1.66666 5.39765 1.66666 10C1.66666 14.6024 5.39762 18.3334 9.99999 18.3334Z" stroke="#9810FA" stroke-width="1.66667" stroke-linecap="round" stroke-linejoin="round"/>
          <path d="M10 15C12.7614 15 15 12.7614 15 10C15 7.23858 12.7614 5 10 5C7.23858 5 5 7.23858 5 10C5 12.7614 7.23858 15 10 15Z" stroke="#9810FA" stroke-width="1.66667" stroke-linecap="round" stroke-linejoin="round"/>
          <path d="M10 11.6666C10.9205 11.6666 11.6667 10.9205 11.6667 9.99998C11.6667 9.07951 10.9205 8.33331 10 8.33331C9.07954 8.33331 8.33334 9.07951 8.33334 9.99998C8.33334 10.9205 9.07954 11.6666 10 11.6666Z" stroke="#9810FA" stroke-width="1.66667" stroke-linecap="round" stroke-linejoin="round"/>
        </svg>
      ),
      bgColor: 'rgba(152, 16, 250, 0.1)'
    },
    {
      id: 'customers',
      label: 'Target Customers',
      value: 'ABC Customers',
      icon: (
        <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M13.3334 17.5V15.8333C13.3334 14.9493 12.9822 14.1014 12.357 13.4763C11.7319 12.8512 10.8841 12.5 10 12.5H5.00002C4.11597 12.5 3.26812 12.8512 2.643 13.4763C2.01788 14.1014 1.66669 14.9493 1.66669 15.8333V17.5" stroke="#155DFC" stroke-width="1.66667" stroke-linecap="round" stroke-linejoin="round"/>
          <path d="M13.3333 2.60663C14.0481 2.79194 14.6811 3.20935 15.133 3.79335C15.585 4.37735 15.8301 5.09487 15.8301 5.83329C15.8301 6.57172 15.585 7.28924 15.133 7.87324C14.6811 8.45724 14.0481 8.87465 13.3333 9.05996" stroke="#155DFC" stroke-width="1.66667" stroke-linecap="round" stroke-linejoin="round"/>
          <path d="M18.3333 17.5V15.8333C18.3328 15.0948 18.0869 14.3773 17.6345 13.7936C17.182 13.2099 16.5484 12.793 15.8333 12.6083" stroke="#155DFC" stroke-width="1.66667" stroke-linecap="round" stroke-linejoin="round"/>
          <path d="M7.50002 9.16667C9.34097 9.16667 10.8334 7.67428 10.8334 5.83333C10.8334 3.99238 9.34097 2.5 7.50002 2.5C5.65907 2.5 4.16669 3.99238 4.16669 5.83333C4.16669 7.67428 5.65907 9.16667 7.50002 9.16667Z" stroke="#155DFC" stroke-width="1.66667" stroke-linecap="round" stroke-linejoin="round"/>
        </svg>
      ),
      bgColor: 'rgba(21, 93, 252, 0.1)'
    },
    {
      id: 'product',
      label: 'Product Description',
      value: 'ABC Products',
      icon: (
        <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M9.16667 18.1084C9.42003 18.2546 9.70744 18.3316 10 18.3316C10.2926 18.3316 10.58 18.2546 10.8333 18.1084L16.6667 14.775C16.9198 14.6289 17.13 14.4188 17.2763 14.1657C17.4225 13.9127 17.4997 13.6256 17.5 13.3334V6.66669C17.4997 6.37442 17.4225 6.08736 17.2763 5.83432C17.13 5.58128 16.9198 5.37116 16.6667 5.22502L10.8333 1.89169C10.58 1.74541 10.2926 1.6684 10 1.6684C9.70744 1.6684 9.42003 1.74541 9.16667 1.89169L3.33333 5.22502C3.08022 5.37116 2.86998 5.58128 2.72372 5.83432C2.57745 6.08736 2.5003 6.37442 2.5 6.66669V13.3334C2.5003 13.6256 2.57745 13.9127 2.72372 14.1657C2.86998 14.4188 3.08022 14.6289 3.33333 14.775L9.16667 18.1084Z" stroke="#00B031" stroke-width="1.66667" stroke-linecap="round" stroke-linejoin="round"/>
          <path d="M10 18.3333V10" stroke="#00B031" stroke-width="1.66667" stroke-linecap="round" stroke-linejoin="round"/>
          <path d="M2.74167 5.83331L10 9.99998L17.2583 5.83331" stroke="#00B031" stroke-width="1.66667" stroke-linecap="round" stroke-linejoin="round"/>
          <path d="M6.25 3.55835L13.75 7.85002" stroke="#00B031" stroke-width="1.66667" stroke-linecap="round" stroke-linejoin="round"/>
        </svg>
      ),
      bgColor: 'rgba(0, 176, 49, 0.1)'
    },
    {
      id: 'differentiator',
      label: 'Key Differentiator',
      value: 'Unique Advantages',
      icon: (
        <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M3.33331 11.6667C3.17561 11.6672 3.021 11.623 2.88743 11.5391C2.75387 11.4553 2.64683 11.3353 2.57876 11.193C2.51069 11.0508 2.48438 10.8921 2.50289 10.7355C2.52139 10.5789 2.58396 10.4308 2.68331 10.3083L10.9333 1.80833C10.9952 1.73689 11.0795 1.68862 11.1725 1.67144C11.2654 1.65425 11.3614 1.66917 11.4447 1.71375C11.5281 1.75832 11.5938 1.82991 11.6311 1.91675C11.6684 2.00359 11.675 2.10053 11.65 2.19166L10.05 7.20833C10.0028 7.3346 9.98695 7.47043 10.0038 7.60417C10.0206 7.7379 10.0697 7.86556 10.1467 7.97618C10.2237 8.0868 10.3265 8.17709 10.446 8.23929C10.5656 8.3015 10.6985 8.33377 10.8333 8.33333H16.6666C16.8243 8.33279 16.9789 8.37701 17.1125 8.46084C17.2461 8.54468 17.3531 8.6647 17.4212 8.80695C17.4893 8.94919 17.5156 9.10784 17.4971 9.26444C17.4786 9.42105 17.416 9.56919 17.3166 9.69166L9.06664 18.1917C9.00475 18.2631 8.92042 18.3114 8.82749 18.3285C8.73455 18.3457 8.63854 18.3308 8.5552 18.2862C8.47186 18.2417 8.40615 18.1701 8.36886 18.0832C8.33157 17.9964 8.32491 17.8995 8.34997 17.8083L9.94997 12.7917C9.99715 12.6654 10.013 12.5296 9.99615 12.3958C9.9793 12.2621 9.93026 12.1344 9.85323 12.0238C9.77621 11.9132 9.6735 11.8229 9.55391 11.7607C9.43433 11.6985 9.30144 11.6662 9.16664 11.6667H3.33331Z" stroke="#F54900" stroke-width="1.66667" stroke-linecap="round" stroke-linejoin="round"/>
        </svg>
      ),
      bgColor: 'rgba(245, 73, 0, 0.1)'
    }
  ];

  return (
    <div className="em-company-summary">
      <div className="em-company-summary-header">
        <h2 className="em-company-summary-title">Company Summary</h2>
        <button 
          className={`em-company-summary-complete-btn ${isPressed ? 'em-company-summary-complete-btn--pressed' : ''}`}
          onClick={handleCompleteProfileClick}
          onKeyDown={handleKeyDown}
          type="button"
        >
          Complete Profile
        </button>
      </div>
      
      <div className="em-company-summary-grid">
        {infoCards.map((card) => (
          <div key={card.id} className="em-company-summary-card">
            <div className="em-company-summary-card-icon" style={{ backgroundColor: card.bgColor }}>
              {card.icon}
            </div>
            <div className="em-company-summary-card-content">
              <div className="em-company-summary-card-label">{card.label}</div>
              <div className="em-company-summary-card-value">{card.value}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
