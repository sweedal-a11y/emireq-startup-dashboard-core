import StartupOverview from '../components/startup-overview/StartupOverview';

export default function Dashboard({ isDarkMode, toggleTheme, sidebarCollapsed }) {
  return (
    <StartupOverview 
      isDarkMode={isDarkMode} 
      toggleTheme={toggleTheme} 
      sidebarCollapsed={sidebarCollapsed} 
    />
  );
}

