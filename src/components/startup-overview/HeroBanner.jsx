import React, { useState } from 'react';
import './HeroBanner.css';
import bitcoinImage from '../../assets/bitcoin.png';

export default function HeroBanner() {
  const [isPressed, setIsPressed] = useState(false);

  const handleButtonClick = () => {
    setIsPressed(true);
    setTimeout(() => setIsPressed(false), 150);
    console.log('Create your fund button clicked');
    // Add navigation or modal functionality here
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      handleButtonClick();
    }
  };

  return (
    <div className="em-hero-banner" style={{ backgroundImage: `url(${bitcoinImage})` }}>
      <div className="em-hero-banner-overlay"></div>
      <div className="em-hero-banner-content">
        <div className="em-hero-banner-text">
          <h2 className="em-hero-banner-title">Securely Invest your money</h2>
          <p className="em-hero-banner-subtitle">You can start your journey here</p>
          <p className="em-hero-banner-date">20th October, 2025</p>
          <button 
            className={`em-hero-banner-cta ${isPressed ? 'em-hero-banner-cta--pressed' : ''}`}
            onClick={handleButtonClick}
            onKeyDown={handleKeyDown}
            type="button"
            aria-label="Create your fund"
          >
            <svg 
              className="em-hero-banner-cta-icon" 
              width="16" 
              height="16" 
              viewBox="0 0 16 16" 
              fill="none" 
              xmlns="http://www.w3.org/2000/svg"
            >
              <path 
                d="M8 1v14M1 8h14" 
                stroke="currentColor" 
                strokeWidth="2" 
                strokeLinecap="round" 
                strokeLinejoin="round"
              />
            </svg>
            <span className="em-hero-banner-cta-text">Create your fund</span>
          </button>
        </div>
      </div>
    </div>
  );
}
