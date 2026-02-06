import React, { useState, useEffect } from "react";
import "./sidebar.css";
import logo from "../../assets/emireq-logo.png";
import { NavLink, useLocation } from "react-router-dom";

export default function Sidebar({ collapsed, onToggle, onLogoutClick }) {
  const location = useLocation();
  const [selected, setSelected] = useState("overview");

  useEffect(() => {
    const path = location.pathname || "/";
    if (path === "/" || path.startsWith("/overview")) setSelected("overview");
    else if (path.startsWith("/profile")) setSelected("profile");
    else if (path.startsWith("/outreach")) setSelected("outreach");
    else if (path.startsWith("/investor-inquiries")) setSelected("investor-inquiries");
    else if (path.startsWith("/funding")) setSelected("funding");
    else if (path.startsWith("/financial-core")) setSelected("financial-core");
    else if (path.startsWith("/documents")) setSelected("documents");
    else if (path.startsWith("/messages")) setSelected("messages");
    else setSelected("");
  }, [location.pathname]);

  return (
    <aside className={`em-sidebar ${collapsed ? "em-sidebar--collapsed" : ""}`}>
      <div className="em-sidebar-header">
        <div className="em-sidebar-logo">
          <img src={logo} alt="Emireq" className="em-sidebar-logo-img" />
        </div>

        <button
          className="em-sidebar-toggle"
          onClick={onToggle}
          aria-label="Toggle sidebar"
        >
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M6 16L1 11L6 6"
              stroke="#121212"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M13 16L8 11L13 6"
              stroke="#121212"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </button>
      </div>

      <div className="em-sidebar-section">
        <p className="em-sidebar-title">MAIN</p>

        <NavLink
          to="/overview"
          end
          onClick={() => setSelected("overview")}
          className={({ isActive }) =>
            `em-sidebar-item ${(isActive || selected === "overview") ? "active" : ""}`
          }
        >
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M2.33333 2.66667V11.6667C2.33333 12.1971 2.54405 12.7058 2.91912 13.0809C3.29419 13.456 3.8029 13.6667 4.33333 13.6667H13.3333" stroke="#121212" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M4.33329 10.0001L7.33329 7.00005L9.66662 9.33338L13.3333 5.66672" stroke="#121212" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
          <span>Overview</span>
        </NavLink>

        <NavLink
          to="/profile"
          end
          onClick={() => setSelected("profile")}
          className={({ isActive }) =>
            `em-sidebar-item ${(isActive || selected === "profile") ? "active" : ""}`
          }
        >
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
            <g clipPath="url(#clip0_365_492)">
              <path d="M8 14.6667C11.6819 14.6667 14.6667 11.6819 14.6667 7.99999C14.6667 4.3181 11.6819 1.33333 8 1.33333C4.3181 1.33333 1.33333 4.3181 1.33333 7.99999C1.33333 11.6819 4.3181 14.6667 8 14.6667Z" stroke="#121212" strokeWidth="1.33333" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M8 8.66667C9.10457 8.66667 10 7.77124 10 6.66667C10 5.5621 9.10457 4.66667 8 4.66667C6.89543 4.66667 6 5.5621 6 6.66667C6 7.77124 6.89543 8.66667 8 8.66667Z" stroke="#121212" strokeWidth="1.33333" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M4.66667 13.7747V12.6667C4.66667 12.313 4.80714 11.9739 5.05719 11.7239C5.30724 11.4738 5.64638 11.3333 6 11.3333H10C10.3536 11.3333 10.6928 11.4738 10.9428 11.7239C11.1929 11.9739 11.3333 12.313 11.3333 12.6667V13.7747" stroke="#121212" strokeWidth="1.33333" strokeLinecap="round" strokeLinejoin="round"/>
            </g>
            <defs>
              <clipPath id="clip0_365_492">
                <rect width="16" height="16" fill="white"/>
              </clipPath>
            </defs>
          </svg>
          <span>My Profile</span>
        </NavLink>
      </div>

      <div className="em-sidebar-section">
        <p className="em-sidebar-title">INVESTORS</p>
        <NavLink
          to="/outreach"
          end
          onClick={() => setSelected("outreach")}
          className={({ isActive }) =>
            `em-sidebar-item ${(isActive || selected === "outreach") ? "active" : ""}`
          }
        >
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
            <g clipPath="url(#clip0_365_510)">
              <path d="M9.69067 14.4573C9.71599 14.5205 9.76002 14.5743 9.81685 14.6117C9.87367 14.6491 9.94057 14.6682 10.0086 14.6664C10.0766 14.6647 10.1424 14.6422 10.1972 14.6019C10.2521 14.5617 10.2933 14.5057 10.3153 14.4413L14.6487 1.77466C14.67 1.71559 14.6741 1.65167 14.6604 1.59037C14.6467 1.52907 14.6159 1.47293 14.5715 1.42852C14.5271 1.3841 14.4709 1.35326 14.4096 1.33959C14.3483 1.32592 14.2844 1.32999 14.2253 1.35133L1.55867 5.68466C1.49433 5.70673 1.43828 5.74794 1.39805 5.80278C1.35781 5.85761 1.33531 5.92344 1.33357 5.99144C1.33183 6.05943 1.35093 6.12632 1.3883 6.18315C1.42568 6.23997 1.47954 6.284 1.54267 6.30933L6.82933 8.42933C6.99646 8.49624 7.1483 8.5963 7.27571 8.72348C7.40312 8.85066 7.50345 9.00233 7.57067 9.16933L9.69067 14.4573Z" stroke="#121212" strokeWidth="1.33333" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M14.5693 1.43134L7.276 8.724" stroke="#121212" strokeWidth="1.33333" strokeLinecap="round" strokeLinejoin="round"/>
            </g>
            <defs>
              <clipPath id="clip0_365_510">
                <rect width="16" height="16" fill="white"/>
              </clipPath>
            </defs>
          </svg>
          <span>Outreach Sent</span>
        </NavLink>
        <NavLink
          to="/investor-inquiries"
          end
          onClick={() => setSelected("investor-inquiries")}
          className={({ isActive }) =>
            `em-sidebar-item ${(isActive || selected === "investor-inquiries") ? "active" : ""}`
          }
        >
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M14.6667 8H10.6667L9.33333 10H6.66667L5.33333 8H1.33333" stroke="#121212" strokeWidth="1.33333" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M3.63333 3.40666L1.33333 7.99999V12C1.33333 12.3536 1.47381 12.6928 1.72386 12.9428C1.9739 13.1928 2.31304 13.3333 2.66667 13.3333H13.3333C13.687 13.3333 14.0261 13.1928 14.2761 12.9428C14.5262 12.6928 14.6667 12.3536 14.6667 12V7.99999L12.3667 3.40666C12.2563 3.18451 12.0861 2.99757 11.8753 2.86684C11.6645 2.73612 11.4214 2.66679 11.1733 2.66666H4.82667C4.57861 2.66679 4.33551 2.73612 4.12469 2.86684C3.91388 2.99757 3.74372 3.18451 3.63333 3.40666Z" stroke="#121212" strokeWidth="1.33333" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
          <span>Investor Inquiries</span>
        </NavLink>
        <NavLink
          to="/funding"
          end
          onClick={() => setSelected("funding")}
          className={({ isActive }) =>
            `em-sidebar-item ${(isActive || selected === "funding") ? "active" : ""}`
          }
        >
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
            <g clipPath="url(#clip0_365_522)">
              <path d="M11.5556 9.4C11.3495 9.0338 11.0704 8.71386 10.7355 8.46003C10.4006 8.2062 10.0172 8.0239 9.60893 7.92444C9.22596 7.80955 8.83729 7.7146 8.44448 7.64V3.60889C9.22542 3.69265 9.97047 3.98086 10.6045 4.44444C10.6483 4.48325 10.6992 4.51307 10.7545 4.53217C10.8098 4.55128 10.8684 4.55931 10.9267 4.5558C10.9851 4.55229 11.0423 4.53732 11.0949 4.51173C11.1475 4.48614 11.1946 4.45044 11.2334 4.40666C11.2722 4.36289 11.302 4.3119 11.3211 4.2566C11.3402 4.20131 11.3482 4.14279 11.3447 4.08439C11.3412 4.026 11.3262 3.96886 11.3007 3.91625C11.2751 3.86364 11.2394 3.81659 11.1956 3.77777C10.4002 3.16515 9.44499 2.79481 8.44448 2.71111V1.33333C8.44448 1.21546 8.39766 1.10241 8.31431 1.01906C8.23096 0.935711 8.11791 0.888885 8.00004 0.888885C7.88216 0.888885 7.76912 0.935711 7.68577 1.01906C7.60242 1.10241 7.55559 1.21546 7.55559 1.33333V2.66666C5.60004 2.71111 4.52004 3.68444 4.19115 4.52444C3.97174 5.06535 3.9509 5.66647 4.13231 6.22127C4.31372 6.77608 4.68567 7.24876 5.18226 7.55555C5.9051 7.99619 6.71474 8.27517 7.55559 8.37333V12.4444C6.39529 12.386 5.28376 11.9595 4.38226 11.2267C4.34203 11.1788 4.29214 11.1399 4.23587 11.1127C4.1796 11.0854 4.1182 11.0703 4.05569 11.0684C3.99319 11.0664 3.93098 11.0777 3.87313 11.1015C3.81528 11.1252 3.7631 11.1609 3.72 11.2062C3.67689 11.2515 3.64383 11.3054 3.62298 11.3644C3.60213 11.4234 3.59396 11.4861 3.59899 11.5484C3.60403 11.6107 3.62217 11.6713 3.65222 11.7261C3.68226 11.781 3.72355 11.8289 3.77337 11.8667C4.83663 12.7614 6.16711 13.2773 7.55559 13.3333V14.6667C7.55559 14.7845 7.60242 14.8976 7.68577 14.9809C7.76912 15.0643 7.88216 15.1111 8.00004 15.1111C8.11791 15.1111 8.23096 15.0643 8.31431 14.9809C8.39766 14.8976 8.44448 14.7845 8.44448 14.6667V13.3333C9.69781 13.2489 11.1423 12.8489 11.6889 11.2178C11.7878 10.921 11.827 10.6075 11.8041 10.2955C11.7812 9.98355 11.6967 9.67918 11.5556 9.4ZM5.68448 6.80889C5.35995 6.6157 5.11497 6.31309 4.99358 5.95545C4.87219 5.5978 4.88236 5.20859 5.02226 4.85777C5.07115 4.72444 5.56893 3.60889 7.55559 3.55555V7.46666C6.89259 7.38135 6.25502 7.15722 5.68448 6.80889ZM10.8445 10.9156C10.5245 11.8667 9.81337 12.3244 8.44448 12.4267V8.54666C8.72893 8.60889 9.02226 8.68 9.33337 8.77333C9.62726 8.84008 9.9045 8.96591 10.1482 9.14317C10.392 9.32043 10.5971 9.54541 10.7511 9.80444C10.9255 10.1486 10.9589 10.5471 10.8445 10.9156Z" fill="#121212"/>
            </g>
            <defs>
              <clipPath id="clip0_365_522">
                <rect width="16" height="16" fill="white"/>
              </clipPath>
            </defs>
          </svg>
          <span>Funding Progress</span>
        </NavLink>
        <NavLink
          to="/financial-core"
          end
          onClick={() => setSelected("financial-core")}
          className={({ isActive }) =>
            `em-sidebar-item ${(isActive || selected === "financial-core") ? "active" : ""}`
          }
        >
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M2 10.6667L5.33333 7.33333L8 10L14 4" stroke="#121212" strokeWidth="1.33333" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M10.6667 4H14V7.33333" stroke="#121212" strokeWidth="1.33333" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
          <span>Financial Core</span>
        </NavLink>
      </div>

      <div className="em-sidebar-section">
        <p className="em-sidebar-title">COMPLIANCE</p>
        <NavLink
          to="/documents"
          end
          onClick={() => setSelected("documents")}
          className={({ isActive }) =>
            `em-sidebar-item ${(isActive || selected === "documents") ? "active" : ""}`
          }
        >
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
            <g clipPath="url(#clip0_365_528)">
              <path d="M10 1.33334H4C3.64638 1.33334 3.30724 1.47382 3.05719 1.72387C2.80714 1.97392 2.66667 2.31305 2.66667 2.66668V13.3333C2.66667 13.687 2.80714 14.0261 3.05719 14.2762C3.30724 14.5262 3.64638 14.6667 4 14.6667H12C12.3536 14.6667 12.6928 14.5262 12.9428 14.2762C13.1929 14.0261 13.3333 13.687 13.3333 13.3333V4.66668L10 1.33334Z" stroke="#121212" strokeWidth="1.33333" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M9.33333 1.33334V4.00001C9.33333 4.35363 9.47381 4.69277 9.72386 4.94282C9.97391 5.19287 10.313 5.33334 10.6667 5.33334H13.3333" stroke="#121212" strokeWidth="1.33333" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M6.66667 6H5.33333" stroke="#121212" strokeWidth="1.33333" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M10.6667 8.66666H5.33333" stroke="#121212" strokeWidth="1.33333" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M10.6667 11.3333H5.33333" stroke="#121212" strokeWidth="1.33333" strokeLinecap="round" strokeLinejoin="round"/>
            </g>
            <defs>
              <clipPath id="clip0_365_528">
                <rect width="16" height="16" fill="white"/>
              </clipPath>
            </defs>
          </svg>
          <span>Documents & Compliance</span>
        </NavLink>
      </div>

      <div className="em-sidebar-section">
        <p className="em-sidebar-title">COMMUNICATION</p>
        <NavLink
          to="/messages"
          end
          onClick={() => setSelected("messages")}
          className={({ isActive }) =>
            `em-sidebar-item ${(isActive || selected === "messages") ? "active" : ""}`
          }
        >
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M2.30933 11.2187C1.33333 10.438 1.33333 9.84733 1.33333 7.33333C1.33333 4.81933 1.33333 3.562 2.30933 2.78133C3.28667 2 4.85733 2 8 2C11.1427 2 12.714 2 13.69 2.78133C14.666 3.56267 14.6667 4.81933 14.6667 7.33333C14.6667 9.84733 14.6667 10.438 13.69 11.2187C12.7147 12 11.1427 12 8 12C6.32667 12 5.46667 13.1587 4 14V11.8587C3.27067 11.75 2.734 11.5587 2.30933 11.2187Z" stroke="#121212" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
          <span>Messages</span>
        </NavLink>
      </div>

      <div className="em-sidebar-section em-sidebar-section--account">
        <p className="em-sidebar-title">ACCOUNT</p>
        <button
  className="em-sidebar-item em-sidebar-item--logout"
  onClick={() => {
    setSelected("");
    if (onLogoutClick) onLogoutClick();
  }}
  aria-label="Log out"
>
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M6 14H3.33333C2.97971 14 2.64057 13.8595 2.39052 13.6095C2.14048 13.3594 2 13.0203 2 12.6667V3.33333C2 2.97971 2.14048 2.64057 2.39052 2.39052C2.64057 2.14048 2.97971 2 3.33333 2H6" stroke="#121212" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M10.666 11.3327L13.9993 7.99935L10.666 4.66602" stroke="#121212" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M14 8H6" stroke="#121212" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
  <span>Logout</span>
</button>
      </div>
    </aside>
  );
}