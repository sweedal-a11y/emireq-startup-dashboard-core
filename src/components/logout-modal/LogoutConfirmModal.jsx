import { useEffect, useRef } from "react";
import { createPortal } from "react-dom";
import "./LogoutConfirmModal.css";

export default function LogoutConfirmModal({ onClose, onConfirm }) {
  const modalRef = useRef(null);
  const cancelButtonRef = useRef(null);
  const logoutButtonRef = useRef(null);
  const previousFocusRef = useRef(null);

  // Focus trap and ESC key handler
  useEffect(() => {
    // Save previous focus
    previousFocusRef.current = document.activeElement;

    // Focus cancel button on open
    if (cancelButtonRef.current) {
      cancelButtonRef.current.focus();
    }

    // Lock body scroll
    document.body.style.overflow = "hidden";

    const handleEscape = (e) => {
      if (e.key === "Escape") {
        onClose();
      }
    };

    // Focus trap
    const handleTab = (e) => {
      if (!modalRef.current) return;

      const focusableElements = [cancelButtonRef.current, logoutButtonRef.current].filter(Boolean);
      const firstElement = focusableElements[0];
      const lastElement = focusableElements[focusableElements.length - 1];

      if (e.shiftKey) {
        if (document.activeElement === firstElement) {
          e.preventDefault();
          lastElement.focus();
        }
      } else {
        if (document.activeElement === lastElement) {
          e.preventDefault();
          firstElement.focus();
        }
      }
    };

    document.addEventListener("keydown", handleEscape);
    document.addEventListener("keydown", handleTab);

    return () => {
      document.removeEventListener("keydown", handleEscape);
      document.removeEventListener("keydown", handleTab);
      document.body.style.overflow = "";
      // Restore previous focus
      if (previousFocusRef.current) {
        setTimeout(() => {
          previousFocusRef.current?.focus();
        }, 100);
      }
    };
  }, [onClose]);

  const handleBackdropClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  const handleCancel = () => {
    onClose();
  };

  const handleConfirm = () => {
    onConfirm();
  };

  const modalContent = (
    <div
      className="em-logout-modal-backdrop"
      onClick={handleBackdropClick}
      role="dialog"
      aria-modal="true"
      aria-labelledby="logout-modal-title"
    >
      <div className="em-logout-modal-container" ref={modalRef}>
        <div className="em-logout-modal-content">
          <h2 id="logout-modal-title" className="em-logout-modal-title">
            Are you sure you want to logout?
          </h2>
          
          <p className="em-logout-modal-subtitle">
            You will be safely logged out of your account and redirected to the login page.
          </p>

          <div className="em-logout-modal-actions">
            <button
              ref={cancelButtonRef}
              className="em-logout-btn em-logout-btn--cancel"
              onClick={handleCancel}
              aria-label="Cancel logout"
            >
              Cancel
            </button>
            
            <button
              ref={logoutButtonRef}
              className="em-logout-btn em-logout-btn--confirm"
              onClick={handleConfirm}
              aria-label="Confirm logout"
            >
              Logout
            </button>
          </div>
        </div>
      </div>
    </div>
  );

  return createPortal(modalContent, document.body);
}

