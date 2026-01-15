import React from 'react';
import Header from './Header';
import MessagesHeader from './MessagesHeader';
import MessagesChat from './MessagesChat';

export default function MessagesPage({ toggleTheme, sidebarCollapsed }) {
  return (
    <>
      <Header toggleTheme={toggleTheme} />
      <MessagesHeader sidebarCollapsed={sidebarCollapsed} />
      <MessagesChat sidebarCollapsed={sidebarCollapsed} />
    </>
  );
}
