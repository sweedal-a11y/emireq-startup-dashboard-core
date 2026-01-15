import React, { useState, useEffect } from 'react';
import './StartupStatsCards.css';

export default function StartupStatsCards() {
  const [stats, setStats] = useState({
    contactedInvestors: 0,
    interestedInvestors: 0,
    fundingProgress: 0
  });

  const [isLoading, setIsLoading] = useState(false);
  const [hoveredCard, setHoveredCard] = useState(null);

  const handleCardClick = (cardType) => {
    console.log(`Clicked on ${cardType} card`);
    // Add navigation or modal functionality here
  };

  const cards = [
    {
      id: 'contacted',
      title: 'Contacted Investors',
      value: stats.contactedInvestors,
      description: 'Total outreach sent',
      icon: (
        <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
          <g clip-path="url(#clip0_12_1537)">
            <path d="M12.1133 18.0717C12.145 18.1506 12.2 18.2179 12.271 18.2646C12.3421 18.3113 12.4257 18.3352 12.5107 18.333C12.5957 18.3309 12.678 18.3027 12.7465 18.2524C12.815 18.2021 12.8666 18.1321 12.8941 18.0517L18.3108 2.21833C18.3375 2.14449 18.3426 2.06458 18.3255 1.98796C18.3084 1.91133 18.2698 1.84116 18.2143 1.78564C18.1588 1.73013 18.0886 1.69158 18.012 1.67449C17.9354 1.6574 17.8555 1.66249 17.7816 1.68916L1.94831 7.10583C1.86789 7.13341 1.79783 7.18493 1.74754 7.25347C1.69725 7.32202 1.66912 7.40431 1.66695 7.48929C1.66477 7.57428 1.68864 7.65791 1.73536 7.72893C1.78208 7.79996 1.84941 7.855 1.92831 7.88666L8.53665 10.5367C8.74555 10.6203 8.93536 10.7454 9.09462 10.9044C9.25388 11.0633 9.3793 11.2529 9.46331 11.4617L12.1133 18.0717Z" stroke="#155DFC" stroke-width="1.66667" stroke-linecap="round" stroke-linejoin="round"/>
            <path d="M18.2117 1.78917L9.095 10.905" stroke="#155DFC" stroke-width="1.66667" stroke-linecap="round" stroke-linejoin="round"/>
          </g>
          <defs>
            <clipPath id="clip0_12_1537">
              <rect width="20" height="20" fill="white"/>
            </clipPath>
          </defs>
        </svg>
      ),
      color: 'blue'
    },
    {
      id: 'interested',
      title: 'Interested Investors',
      value: stats.interestedInvestors,
      description: 'Reached out to you',
      icon: (
        <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M18.3334 10H13.3334L11.6667 12.5H8.33335L6.66669 10H1.66669" stroke="#00A63E" stroke-width="1.66667" stroke-linecap="round" stroke-linejoin="round"/>
          <path d="M4.54169 4.25833L1.66669 9.99999V15C1.66669 15.442 1.84228 15.8659 2.15484 16.1785C2.4674 16.4911 2.89133 16.6667 3.33335 16.6667H16.6667C17.1087 16.6667 17.5326 16.4911 17.8452 16.1785C18.1578 15.8659 18.3334 15.442 18.3334 15V9.99999L15.4584 4.25833C15.3204 3.98065 15.1077 3.74697 14.8441 3.58356C14.5806 3.42015 14.2768 3.33349 13.9667 3.33333H6.03335C5.72328 3.33349 5.41941 3.42015 5.15589 3.58356C4.89237 3.74697 4.67967 3.98065 4.54169 4.25833Z" stroke="#00A63E" stroke-width="1.66667" stroke-linecap="round" stroke-linejoin="round"/>
        </svg>
      ),
      color: 'green'
    },
    {
      id: 'funding',
      title: 'Funding Progress',
      value: `${stats.fundingProgress}%`,
      description: 'Of target goal',
      icon: (
        <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M13.3334 5.83333H18.3334V10.8333" stroke="#9810FA" stroke-width="1.66667" stroke-linecap="round" stroke-linejoin="round"/>
          <path d="M18.3333 5.83333L11.25 12.9167L7.08329 8.74999L1.66663 14.1667" stroke="#9810FA" stroke-width="1.66667" stroke-linecap="round" stroke-linejoin="round"/>
        </svg>
      ),
      color: 'purple'
    }
  ];

  return (
    <div className="em-stats-cards-row">
      {cards.map((card) => (
        <div
          key={card.id}
          className={`em-stat-card em-stat-card--${card.color} ${hoveredCard === card.id ? 'em-stat-card--hovered' : ''} ${isLoading ? 'em-stat-card--loading' : ''}`}
          onMouseEnter={() => setHoveredCard(card.id)}
          onMouseLeave={() => setHoveredCard(null)}
          onClick={() => handleCardClick(card.id)}
          role="button"
          tabIndex={0}
          onKeyDown={(e) => {
            if (e.key === 'Enter' || e.key === ' ') {
              e.preventDefault();
              handleCardClick(card.id);
            }
          }}
        >
          <div className="em-stat-card-icon">
            {card.icon}
          </div>
          <div className="em-stat-card-content">
            <h3 className="em-stat-card-title">{card.title}</h3>
            <p className="em-stat-card-value">
              {isLoading ? (
                <span className="em-stat-card-skeleton"></span>
              ) : (
                card.value
              )}
            </p>
            <p className="em-stat-card-description">{card.description}</p>
          </div>
          <div className="em-stat-card-arrow">
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M6 12L10 8L6 4" stroke="#6b7280" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
          </div>
        </div>
      ))}
    </div>
  );
}
