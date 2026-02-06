import { useState, useEffect, useRef } from "react";
import { BrowserRouter, Routes, Route, Navigate, useNavigate, useSearchParams, useLocation } from "react-router-dom";
import Sidebar from "./components/sidebar/Sidebar";
import LogoutConfirmModal from "./components/logout-modal/LogoutConfirmModal";
import Dashboard from "./pages/Dashboard";
import MyProfile from "./pages/MyProfile";
import OutreachPage from "./pages/outreach/OutreachPage";
import InvestorInquiriesPage from "./pages/investor/InvestorInquiriesPage";
import FundingProgressPage from "./pages/funding/FundingProgressPage";
import FinancialCorePage from "./pages/financial-core/FinancialCorePage";
import MessagesPage from "./pages/messages/MessagesPage";
import Login from "./pages/auth/Login";
import Register from "./pages/auth/Register";
import OnboardingStep1 from "./pages/auth/OnboardingStep1";
import OnboardingStep2 from "./pages/auth/OnboardingStep2";
import OnboardingStep3 from "./pages/auth/OnboardingStep3";
import OnboardingStep4 from "./pages/auth/OnboardingStep4";
import OnboardingStep5 from "./pages/auth/OnboardingStep5";
import OnboardingStep6 from "./pages/auth/OnboardingStep6";
import OnboardingStep7 from "./pages/auth/OnboardingStep7";
import OnboardingStep8 from "./pages/auth/OnboardingStep8";
import OnboardingStep9 from "./pages/auth/OnboardingStep9";
import DocumentsPage from "./pages/documents/DocumentsPage";
import "./App.css";

function AppContent() {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [showLogoutModal, setShowLogoutModal] = useState(false);
  const [searchParams, setSearchParams] = useSearchParams();
  const location = useLocation();
  const navigate = useNavigate();
  const logoutButtonRef = useRef(null);
  const isInitialMount = useRef(true);

  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode);
  };

  // Apply theme to body element
  useEffect(() => {
    if (isDarkMode) {
      document.body.setAttribute('data-theme', 'dark');
    } else {
      document.body.removeAttribute('data-theme');
    }
  }, [isDarkMode]);

  // Sync logout modal with URL query param
  useEffect(() => {
    if (isInitialMount.current) {
      isInitialMount.current = false;
      // Check if URL has confirmLogout param on mount
      const hasConfirmLogout = searchParams.get("confirmLogout") === "true";
      if (hasConfirmLogout) {
        setShowLogoutModal(true);
      }
      return;
    }

    const hasConfirmLogout = searchParams.get("confirmLogout") === "true";
    if (hasConfirmLogout && !showLogoutModal) {
      setShowLogoutModal(true);
    } else if (!hasConfirmLogout && showLogoutModal) {
      setShowLogoutModal(false);
    }
  }, [searchParams]);

  // Scroll to top on route change
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);

  const handleLogoutClick = (e) => {
    // Store ref to logout button for focus return
    if (e && e.currentTarget) {
      logoutButtonRef.current = e.currentTarget;
    } else {
      logoutButtonRef.current = document.activeElement;
    }
    
    setShowLogoutModal(true);
    // Update URL with query param
    const params = new URLSearchParams(searchParams);
    params.set("confirmLogout", "true");
    setSearchParams(params, { replace: false });
  };

  const handleCloseLogoutModal = () => {
    setShowLogoutModal(false);
    // Remove query param from URL
    const params = new URLSearchParams(searchParams);
    params.delete("confirmLogout");
    setSearchParams(params, { replace: false });
    
    // Return focus to logout button
    if (logoutButtonRef.current) {
      setTimeout(() => {
        logoutButtonRef.current?.focus();
        logoutButtonRef.current = null;
      }, 100);
    }
  };

  const handleConfirmLogout = () => {
    // Clear auth state (mock logout)
    localStorage.removeItem("authToken");
    sessionStorage.clear();
    
    // Close modal
    setShowLogoutModal(false);
    
    // Remove query param
    const params = new URLSearchParams(searchParams);
    params.delete("confirmLogout");
    setSearchParams(params, { replace: true });
    
    // Navigate to login page
    navigate("/auth/login");
  };

  // Don't show sidebar on auth pages and financial-core
  const isAuthPage = location.pathname.startsWith("/auth") || location.pathname.startsWith("/onboarding") || location.pathname.startsWith("/financial-core");

  return (
    <div className={`em-app ${isDarkMode ? 'em-app--dark' : ''}`}>
      {!isAuthPage && (
        <Sidebar 
          collapsed={sidebarCollapsed} 
          onToggle={() => setSidebarCollapsed(!sidebarCollapsed)}
          onLogoutClick={handleLogoutClick}
        />
      )}

      <main className={`em-main ${sidebarCollapsed ? 'em-main--expanded' : ''} ${isAuthPage ? 'em-main--auth' : ''}`}>
        <Routes>
          <Route path="/" element={<Navigate to="/auth/login" replace />} />
          <Route path="/overview" element={<Dashboard isDarkMode={isDarkMode} toggleTheme={toggleTheme} sidebarCollapsed={sidebarCollapsed} />} />
          <Route path="/profile" element={<MyProfile toggleTheme={toggleTheme} />} />
          <Route path="/outreach" element={<OutreachPage isDarkMode={isDarkMode} toggleTheme={toggleTheme} />} />
          <Route path="/investor-inquiries" element={<InvestorInquiriesPage isDarkMode={isDarkMode} toggleTheme={toggleTheme} sidebarCollapsed={sidebarCollapsed} />} />
          <Route path="/funding" element={<FundingProgressPage toggleTheme={toggleTheme} sidebarCollapsed={sidebarCollapsed} />} />
          <Route path="/financial-core" element={<FinancialCorePage />} />
          <Route path="/messages" element={<MessagesPage toggleTheme={toggleTheme} sidebarCollapsed={sidebarCollapsed} />} />
          <Route path="/documents" element={<DocumentsPage toggleTheme={toggleTheme} sidebarCollapsed={sidebarCollapsed} />} />
          <Route path="/auth/login" element={<Login />} />
          <Route path="/auth/register" element={<Register />} />
          <Route path="/onboarding/step1" element={<OnboardingStep1 />} />
          <Route path="/onboarding/step2" element={<OnboardingStep2 />} />
          <Route path="/onboarding/step3" element={<OnboardingStep3 />} />
          <Route path="/onboarding/step4" element={<OnboardingStep4 />} />
          <Route path="/onboarding/step5" element={<OnboardingStep5 />} />
          <Route path="/onboarding/step6" element={<OnboardingStep6 />} />
          <Route path="/onboarding/step7" element={<OnboardingStep7 />} />
          <Route path="/onboarding/step8" element={<OnboardingStep8 />} />
          <Route path="/onboarding/step9" element={<OnboardingStep9 />} />
        </Routes>
      </main>

      {showLogoutModal && (
        <LogoutConfirmModal
          onClose={handleCloseLogoutModal}
          onConfirm={handleConfirmLogout}
        />
      )}
    </div>
  );
}

function App() {
  return (
    <BrowserRouter>
      <AppContent />
    </BrowserRouter>
  );
}

export default App;
