import { useState, useEffect, useRef } from "react";
import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
  useNavigate,
  useSearchParams,
  useLocation,
} from "react-router-dom";
import Sidebar from "./components/sidebar/Sidebar";
import LogoutConfirmModal from "./components/logout-modal/LogoutConfirmModal";
import Dashboard from "./pages/Dashboard";
import MyProfile from "./pages/MyProfile";
import OutreachPage from "./pages/outreach/OutreachPage";
import InvestorInquiriesPage from "./pages/investor/InvestorInquiriesPage";
import FundingProgressPage from "./pages/funding/FundingProgressPage";
import FinancialCorePage from "./pages/financial-core/FinancialCorePage";
import CoreFinancialOverview from "./pages/financial-core/CoreFinancialOverview";
import TreasuryLiquidityManagement from "./pages/financial-core/TreasuryLiquidityManagement";
import TransactionsPage from "./pages/financial-core/TransactionsPage";
import SalesPage from "./pages/financial-core/SalesPage";
import PurchasesPage from "./pages/financial-core/PurchasesPage";
import InvoiceDetailView from "./pages/financial-core/InvoiceDetailView";
import BankAccountsPage from "./pages/financial-core/BankAccountsPage";
import WalletsPage from "./pages/financial-core/WalletsPage";
import ReconciliationPage from "./pages/financial-core/ReconciliationPage";
import BankRulesPage from "./pages/financial-core/BankRulesPage";
import UploadStatementsPage from "./pages/financial-core/UploadStatementsPage";
import EmployeeExpensesPage from "./pages/financial-core/EmployeeExpensesPage";
import ReimbursementsPage from "./pages/financial-core/ReimbursementsPage";
import ReceiptsPage from "./pages/financial-core/ReceiptsPage";
import ApprovalsPage from "./pages/financial-core/ApprovalsPage";
import EmployeesPage from "./pages/financial-core/EmployeesPage";
import SalaryStructurePage from "./pages/financial-core/SalaryStructurePage";
import PayrollRunsPage from "./pages/financial-core/PayrollRunsPage";
import PayrollReportsPage from "./pages/financial-core/PayrollReportsPage";
import ProfitLossPage from "./pages/financial-core/ProfitLossPage";
import BalanceSheetPage from "./pages/financial-core/BalanceSheetPage";
import CashFlowPage from "./pages/financial-core/CashFlowPage";
import TrialBalancePage from "./pages/financial-core/TrialBalancePage";
import AuditTrailPage from "./pages/financial-core/AuditTrailPage";
import FinancialInsightsPage from "./pages/financial-core/FinancialInsightsPage";
import CompanyProfilePage from "./pages/financial-core/CompanyProfilePage";
import ChartOfAccountsPage from "./pages/financial-core/ChartOfAccountsPage";
import TaxSettingsPage from "./pages/financial-core/TaxSettingsPage";
import OpeningBalancePage from "./pages/financial-core/OpeningBalancePage";
import RolesPermissionsPage from "./pages/financial-core/RolesPermissionsPage";
import IntegrationPage from "./pages/financial-core/IntegrationPage";
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
import Onboarding from "./pages/auth/Onboarding";
import GlobalLoader from "./components/loader/GlobalLoader";

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
      document.body.setAttribute("data-theme", "dark");
    } else {
      document.body.removeAttribute("data-theme");
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
  const isAuthPage =
    location.pathname.startsWith("/auth") ||
    location.pathname.startsWith("/onboarding") ||
    location.pathname.startsWith("/financial-core");

  return (
    <div className={`em-app ${isDarkMode ? "em-app--dark" : ""}`}>
      {!isAuthPage && (
        <Sidebar
          collapsed={sidebarCollapsed}
          onToggle={() => setSidebarCollapsed(!sidebarCollapsed)}
          onLogoutClick={handleLogoutClick}
        />
      )}

      <main
        className={`em-main ${sidebarCollapsed ? "em-main--expanded" : ""} ${isAuthPage ? "em-main--auth" : ""}`}
      >
        <Routes>
          <Route path="/" element={<Navigate to="/auth/login" replace />} />
          <Route
            path="/overview"
            element={
              <Dashboard
                isDarkMode={isDarkMode}
                toggleTheme={toggleTheme}
                sidebarCollapsed={sidebarCollapsed}
              />
            }
          />
          <Route
            path="/profile"
            element={<MyProfile toggleTheme={toggleTheme} />}
          />
          <Route
            path="/outreach"
            element={
              <OutreachPage isDarkMode={isDarkMode} toggleTheme={toggleTheme} />
            }
          />
          <Route
            path="/investor-inquiries"
            element={
              <InvestorInquiriesPage
                isDarkMode={isDarkMode}
                toggleTheme={toggleTheme}
                sidebarCollapsed={sidebarCollapsed}
              />
            }
          />
          <Route
            path="/funding"
            element={
              <FundingProgressPage
                toggleTheme={toggleTheme}
                sidebarCollapsed={sidebarCollapsed}
              />
            }
          />
          <Route path="/financial-core" element={<FinancialCorePage />} />
          <Route
            path="/financial-core/overview"
            element={<CoreFinancialOverview />}
          />
          <Route
            path="/financial-core/treasury-liquidity"
            element={<TreasuryLiquidityManagement />}
          />
          <Route
            path="/financial-core/transactions"
            element={<TransactionsPage />}
          />
          <Route path="/financial-core/sales" element={<SalesPage />} />
          <Route path="/financial-core/purchases" element={<PurchasesPage />} />
          <Route path="/financial-core/bank-accounts" element={<BankAccountsPage />} />
          <Route path="/financial-core/wallets" element={<WalletsPage />} />
          <Route path="/financial-core/reconciliation" element={<ReconciliationPage />} />
          <Route path="/financial-core/bank-rules" element={<BankRulesPage />} />
          <Route path="/financial-core/upload-statements" element={<UploadStatementsPage />} />
          <Route path="/financial-core/employee-expenses" element={<EmployeeExpensesPage />} />
          <Route path="/financial-core/reimbursements" element={<ReimbursementsPage />} />
          <Route path="/financial-core/receipts" element={<ReceiptsPage />} />
          <Route path="/financial-core/approvals" element={<ApprovalsPage />} />
          <Route path="/financial-core/employees" element={<EmployeesPage />} />
          <Route path="/financial-core/salary-structure" element={<SalaryStructurePage />} />
          <Route path="/financial-core/payroll-runs" element={<PayrollRunsPage />} />
          <Route path="/financial-core/payroll-reports" element={<PayrollReportsPage />} />
          <Route path="/financial-core/profit-loss" element={<ProfitLossPage />} />
          <Route path="/financial-core/balance-sheet" element={<BalanceSheetPage />} />
          <Route path="/financial-core/cash-flow" element={<CashFlowPage />} />
          <Route path="/financial-core/trial-balance" element={<TrialBalancePage />} />
          <Route path="/financial-core/audit-trail" element={<AuditTrailPage />} />
          <Route path="/financial-core/financial-insights" element={<FinancialInsightsPage />} />
          <Route path="/financial-core/company-profile" element={<CompanyProfilePage />} />
          <Route path="/financial-core/chart-of-accounts" element={<ChartOfAccountsPage />} />
          <Route path="/financial-core/tax-settings" element={<TaxSettingsPage />} />
          <Route path="/financial-core/opening-balance" element={<OpeningBalancePage />} />
          <Route path="/financial-core/roles-permissions" element={<RolesPermissionsPage />} />
          <Route path="/financial-core/integration" element={<IntegrationPage />} />
          <Route
            path="/financial-core/invoices/:invoiceId"
            element={<InvoiceDetailView />}
          />
          <Route
            path="/messages"
            element={
              <MessagesPage
                toggleTheme={toggleTheme}
                sidebarCollapsed={sidebarCollapsed}
              />
            }
          />
          <Route
            path="/documents"
            element={
              <DocumentsPage
                toggleTheme={toggleTheme}
                sidebarCollapsed={sidebarCollapsed}
              />
            }
          />
          <Route path="/auth/login" element={<Login />} />
          <Route path="/auth/register" element={<Register />} />
          <Route path="/onboarding" element={<Onboarding />} />
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
      <GlobalLoader />
      <AppContent />
    </BrowserRouter>
  );
}

export default App;
