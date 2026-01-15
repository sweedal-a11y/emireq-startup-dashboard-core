import React, { useState } from "react";
import "./Upcoming.css";

/* DATA */
const followUps = {
  thisWeek: [
    { id: 1, name: "Monica Gonzalez", company: "Novocure Ventures", date: "Nov 4 2025" },
    { id: 2, name: "John Miler", company: "FutureTech Angels", date: "Nov 5 2025" },
  ],
  nextWeek: [
    { id: 3, name: "Monica Gonzalez", company: "Novocure Ventures", date: "Nov 14 2025" },
    { id: 4, name: "John Miler", company: "FutureTech Angels", date: "Nov 14 2025" },
  ],
};

/* INLINE SVG DOT */
const StatusDot = () => (
  <svg
    width="10"
    height="10"
    viewBox="0 0 10 10"
    xmlns="http://www.w3.org/2000/svg"
    className="status-dot"
  >
    <circle cx="5" cy="5" r="5" fill="#2563EB" />
  </svg>
);

const Upcoming = ({ isSidebarCollapsed }) => {
  const [hoveredItem, setHoveredItem] = useState(null);

  const handleItemClick = (item) => {
    console.log("Follow-up clicked:", item);
  };

  return (
    <div className={`upcoming-container ${isSidebarCollapsed ? "collapsed" : ""}`}>
      
      {/* HEADER */}
      <div className="upcoming-header">
        <div className="header-left">
          <div className="title-row">
            <h2 className="header-title">Upcoming Follow-up Calendar</h2>

            <button 
              className="up-info-icon"
              aria-label="Information"
              type="button"
              title="View chart information"
            >
              <svg width="4" height="11" viewBox="0 0 4 11" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path fillRule="evenodd" clipRule="evenodd" d="M3.28849 2.2312C3.41288 2.01352 3.48285 1.76086 3.48285 1.49265C3.48285 0.668582 2.81426 0 1.9902 0C1.16613 0 0.49755 0.668582 0.49755 1.49265C0.49755 2.31672 1.16613 2.9853 1.9902 2.9853C2.54605 2.9853 3.03194 2.6821 3.28849 2.2312ZM0.995099 3.9804H1.49265H2.48775C3.03777 3.9804 3.48285 4.42547 3.48285 4.9755V5.97059V9.95099C3.48285 10.501 3.03777 10.9461 2.48775 10.9461C1.93772 10.9461 1.49265 10.501 1.49265 9.95099V6.71692C1.49265 6.30489 1.15836 5.97059 0.746324 5.97059C0.334291 5.97059 0 5.6363 0 5.22427V4.9755C0 4.62566 0.18075 4.31663 0.452848 4.13977C0.608332 4.0387 0.794913 3.9804 0.995099 3.9804Z" fill="white"/>
              </svg>
            </button>
          </div>

          <span className="header-subtitle">
            Visualize scheduled meetings and reminders.
          </span>
        </div>
      </div>

      {/* FOLLOW-UPS */}
      <div className="upcoming-wrapper">

        <h4 className="upcoming-title">Scheduled Follow-ups for this week</h4>

        {followUps.thisWeek.map((item) => (
          <div
            key={item.id}
            className="upcoming-card"
            onMouseEnter={() => setHoveredItem(item.id)}
            onMouseLeave={() => setHoveredItem(null)}
            onClick={() => handleItemClick(item)}
          >
            <div className="card-left">
              <StatusDot />
              <div className="text-group">
                <div className="name">{item.name}</div>
                <div className="company">{item.company}</div>
              </div>
            </div>
            <div className="card-date">{item.date}</div>
          </div>
        ))}

        <h4 className="upcoming-subtitle">Next week</h4>

        {followUps.nextWeek.map((item) => (
          <div
            key={item.id}
            className="upcoming-card"
            onClick={() => handleItemClick(item)}
          >
            <div className="card-left">
              <StatusDot />
              <div className="text-group">
                <div className="name">{item.name}</div>
                <div className="company">{item.company}</div>
              </div>
            </div>
            <div className="card-date">{item.date}</div>
          </div>
        ))}

      </div>
    </div>
  );
};

export default Upcoming;
