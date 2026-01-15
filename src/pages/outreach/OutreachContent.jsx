import React from 'react';
import './OutreachContent.css';
import OutreachCards from './OutreachCards';
import OutreachContactList from './OutreachContactList';
import Engagement from './Engagement';
import Status from './Status';
import Upcoming from './Upcoming';
import Calendar from './Calendar';

export default function OutreachContent() {
  return (
    <div className="outreach-content">
      <div className="outreach-header">
        <h1 className="outreach-title">Investor Inquires</h1>
        <p className="outreach-description">Track outreach, manage relationships, and monitor engagement</p>
      </div>
      <OutreachCards />
      <OutreachContactList />
      
    
      
      {/* Upcoming and Calendar Section */}
      <div className="upcoming-calendar-section">
        <Upcoming />
        <Calendar />
      </div>
    </div>
  );
}
