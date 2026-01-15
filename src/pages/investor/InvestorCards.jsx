import React from 'react';
import './InvestorCards.css';

export default function InvestorCards() {
  const cardsData = [
    {
      id: 1,
      title: "Active Discussions",
      count: "6",
      subtitle: "2 new this week",
      iconColor: "#3B82F6",
      iconPath: "M22 7L13.009 12.727C12.7039 12.9042 12.3573 12.9976 12.0045 12.9976C11.6517 12.9976 11.3052 12.9042 11.0001 12.727L2 7M20 4H4C2.89543 4 2 4.89543 2 6V18C2 19.1046 2.89543 20 4 20H20C21.1046 20 22 19.1046 22 18V6C22 4.89543 21.1046 4 20 4Z"
    },
    {
      id: 2,
      title: "Pending Responses",
      count: "12",
      subtitle: "4 awaiting reply",
      iconColor: "#8B5CF6",
      iconPath: "M16 7H22V13M22 7L13.5 15.5L8.5 10.5L2 17"
    },
    {
      id: 3,
      title: "Scheduled Meetings",
      count: "8",
      subtitle: "3 this week",
      iconColor: "#10B981",
      iconPath: "M3.464 16.828C2 15.657 2 14.771 2 11C2 7.229 2 5.343 3.464 4.172C4.93 3 7.286 3 12 3C16.714 3 19.071 3 20.535 4.172C21.999 5.344 22 7.229 22 11C22 14.771 22 15.657 20.535 16.828C19.072 18 16.714 18 12 18C9.49 18 8.2 19.738 6 21V17.788C4.906 17.625 4.101 17.338 3.464 16.828Z"
    },
    {
      id: 4,
      title: "Investor Interests",
      count: "24",
      subtitle: "5 new leads",
      iconColor: "#6e6e6fff",
      iconPath: "M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22ZM9 12L11 14L15 10"
    }
  ];

  return (
    <div className="investor-cards-container">
      {cardsData.map((card) => (
        <div key={card.id} className="investor-card">
          <div className="investor-card-icon" style={{ backgroundColor: card.iconColor }}>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="investor-card-icon-svg">
              <path d={card.iconPath} stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </div>
          <div className="investor-card-title">{card.title}</div>
          <div className="investor-card-count">{card.count}</div>
          <div className="investor-card-subtitle">{card.subtitle}</div>
        </div>
      ))}
    </div>
  );
}