import React from 'react';
import './OutreachCards.css';

export default function OutreachCards() {
  const cardsData = [
    {
      id: 1,
      title: "Active Discussions",
      count: "6",
      subtitle: "2 new this week",
      iconColor: "#FF6B35",
      iconPath: "M3.464 16.828C2 15.657 2 14.771 2 11C2 7.229 2 5.343 3.464 4.172C4.93 3 7.286 3 12 3C16.714 3 19.071 3 20.535 4.172C21.999 5.344 22 7.229 22 11C22 14.771 22 15.657 20.535 16.828C19.072 18 16.714 18 12 18C9.49 18 8.2 19.738 6 21V17.788C4.906 17.625 4.101 17.338 3.464 16.828Z"
    },
    {
      id: 2,
      title: "Pending Responses",
      count: "12",
      subtitle: "4 awaiting reply",
      iconColor: "#3B82F6",
      iconPath: "M22.0001 6.99991L13.0091 12.7269C12.704 12.9041 12.3574 12.9975 12.0046 12.9975C11.6518 12.9975 11.3052 12.9041 11.0001 12.7269L2.00009 6.99991M20.0001 3.99991H4.00009C2.89552 3.99991 2.00009 4.89534 2.00009 5.99991V17.9999C2.00009 19.1045 2.89552 19.9999 4.00009 19.9999H20.0001C21.1047 19.9999 22.0001 19.1045 22.0001 17.9999V5.99991C22.0001 4.89534 21.1047 3.99991 20.0001 3.99991Z"
    },
    {
      id: 3,
      title: "Scheduled Meetings",
      count: "8",
      subtitle: "3 this week",
      iconColor: "#10B981",
      iconPath: "M8.00012 2.00009V6.00009M15.9999 2.00009V6.00009M19 3.99991H5C3.89543 3.99991 3 4.89534 3 5.99991V19.9999C3 21.1045 3.89543 21.9999 5 21.9999H19C20.1046 21.9999 21 21.1045 21 19.9999V5.99991C21 4.89534 20.1046 3.99991 19 3.99991ZM3 9.99991H21"
    },
    {
      id: 4,
      title: "Investor Interests",
      count: "24",
      subtitle: "5 new leads",
      iconColor: "#8B5CF6",
      iconPath: "M16 7H22V13M22 7L13.5 15.5L8.5 10.5L2 17"
    }
  ];

  return (
    <div className="outreach-cards-container">
      {cardsData.map((card) => (
        <div key={card.id} className="outreach-card">
          <div className="outreach-card-icon" style={{ backgroundColor: card.iconColor }}>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="outreach-card-icon-svg">
              <path d={card.iconPath} stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </div>
          <div className="outreach-card-title">{card.title}</div>
          <div className="outreach-card-count">{card.count}</div>
          <div className="outreach-card-subtitle">{card.subtitle}</div>
        </div>
      ))}
    </div>
  );
}
