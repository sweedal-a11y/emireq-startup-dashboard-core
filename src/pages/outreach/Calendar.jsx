import React, { useState } from "react";
import "./Calendar.css";

const events = {
  "2025-09-08": true,
  "2025-09-14": true,
};

const Calendar = ({ isSidebarCollapsed }) => {
  const [currentDate, setCurrentDate] = useState(new Date(2025, 8)); // Sept 2025

  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();

  const firstDay = new Date(year, month, 1).getDay();
  const daysInMonth = new Date(year, month + 1, 0).getDate();

  const prevMonth = () =>
    setCurrentDate(new Date(year, month - 1));
  const nextMonth = () =>
    setCurrentDate(new Date(year, month + 1));

  const days = [];
  for (let i = 0; i < firstDay; i++) days.push(null);
  for (let d = 1; d <= daysInMonth; d++) days.push(d);

  return (
    <div
      className={`calendar-container ${
        isSidebarCollapsed ? "collapsed" : ""
      }`}
    >
      <div className="calendar-card">
        {/* HEADER */}
        <div className="calendar-header">
          <h3>Calendar</h3>
          <svg width="16" height="10" viewBox="0 0 16 10">
            <path d="M2 2L8 8L14 2" stroke="currentColor" strokeWidth="2" />
          </svg>
        </div>

        {/* MONTH NAV */}
        <div className="calendar-month">
          <span>
            {currentDate.toLocaleString("default", {
              month: "long",
            })}{" "}
            {year}
          </span>

          <div className="month-actions">
            <button onClick={prevMonth} aria-label="Previous month">
              <svg width="14" height="14" viewBox="0 0 24 24">
                <path
                  d="M15 18l-6-6 6-6"
                  stroke="currentColor"
                  strokeWidth="2"
                  fill="none"
                />
              </svg>
            </button>
            <button onClick={nextMonth} aria-label="Next month">
              <svg width="14" height="14" viewBox="0 0 24 24">
                <path
                  d="M9 6l6 6-6 6"
                  stroke="currentColor"
                  strokeWidth="2"
                  fill="none"
                />
              </svg>
            </button>
          </div>
        </div>

        <div className="calendar-divider" />

        {/* DAYS */}
        <div className="calendar-grid">
          {["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"].map((d) => (
            <div key={d} className="day-label">
              {d}
            </div>
          ))}

          {days.map((day, idx) => {
            const key =
              day &&
              `${year}-${String(month + 1).padStart(2, "0")}-${String(
                day
              ).padStart(2, "0")}`;

            return (
              <div key={idx} className="calendar-cell">
                {day && <span>{day}</span>}
                {events[key] && <span className="event-dot" />}
              </div>
            );
          })}
        </div>

        {/* TODAY */}
        <div className="today-section">
          <h4>Today</h4>

          <div className="today-card">
            <div className="avatar">M</div>
            <div className="today-info">
              <div className="today-name">Monica</div>
              <div className="today-company">
                Novocure Ventures
              </div>
            </div>
            <div className="today-date">Nov 4 2025</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Calendar;
