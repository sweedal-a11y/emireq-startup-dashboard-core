import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import emireqLogo from "../../assets/emireq-logo.png";
import "./Login.css";
import { loginStartup } from "../../apiCalls/startupAPI/startupAPICall";
import { STARTUP_LOGIN } from "../../services/endPoints";

const Login = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [usernameError, setUsernameError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [isLoginError, setIsloginError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    let isValid = true;

    // Username validation
    if (!username.trim()) {
      setUsernameError("Username is required");
      isValid = false;
    } else {
      setUsernameError("");
    }

    // Password validation
    if (!password) {
      setPasswordError("Password is required");
      isValid = false;
    } else if (password.length < 6) {
      setPasswordError("Password must be at least 6 characters");
      isValid = false;
    } else {
      setPasswordError("");
    }

    if (!isValid) return;

    const payload = {
      username: username,
      password: password,
    };
    const response = await loginStartup(STARTUP_LOGIN, payload);
    if (!response.ok) {
      setIsloginError(true);
      setIsLoading(false);
    } else {
      sessionStorage.setItem("startup_token", response.token);
      setShowSuccessModal(true);
    }
  };

  const handleContinueToDashboard = () => {
    setShowSuccessModal(false);
    navigate("/overview");
  };

  const handleSocialLogin = (provider) => {
    console.log(`Logging in with ${provider}`);
    // Implement social login logic here
  };

  const GoogleIcon = () => (
    <svg
      width="20"
      height="20"
      viewBox="0 0 20 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M19.9895 10.1871C19.9895 9.36767 19.9214 8.76973 19.7742 8.14966H10.1992V11.848H15.8195C15.7062 12.7671 15.0943 14.1512 13.7346 15.0813L13.7155 15.2051L16.7429 17.4969L16.9527 17.5174C18.8789 15.7789 19.9895 13.221 19.9895 10.1871Z"
        fill="#4285F4"
      />
      <path
        d="M10.1993 19.9313C12.9527 19.9313 15.2643 19.0454 16.9527 17.5174L13.7346 15.0813C12.8734 15.6682 11.7176 16.0779 10.1993 16.0779C7.50243 16.0779 5.21352 14.3395 4.39759 11.9366L4.27799 11.9465L1.13003 14.3273L1.08887 14.4391C2.76588 17.6945 6.21061 19.9313 10.1993 19.9313Z"
        fill="#34A853"
      />
      <path
        d="M4.39748 11.9366C4.18219 11.3166 4.05759 10.6521 4.05759 9.96565C4.05759 9.27909 4.18219 8.61473 4.38615 7.99466L4.38045 7.8626L1.19304 5.44366L1.08875 5.49214C0.397576 6.84305 0.000976562 8.36008 0.000976562 9.96565C0.000976562 11.5712 0.397576 13.0882 1.08875 14.4391L4.39748 11.9366Z"
        fill="#FBBC05"
      />
      <path
        d="M10.1993 3.85336C12.1142 3.85336 13.406 4.66168 14.1425 5.33718L17.0207 2.59107C15.253 0.985496 12.9527 0 10.1993 0C6.2106 0 2.76588 2.23672 1.08887 5.49214L4.38626 7.99466C5.21352 5.59183 7.50242 3.85336 10.1993 3.85336Z"
        fill="#EB4335"
      />
    </svg>
  );

  const LinkedInIcon = () => (
    <svg
      width="20"
      height="20"
      viewBox="0 0 20 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M18.5195 0H1.47656C0.660156 0 0 0.644531 0 1.44141V18.5547C0 19.3516 0.660156 20 1.47656 20H18.5195C19.3359 20 20 19.3516 20 18.5586V1.44141C20 0.644531 19.3359 0 18.5195 0ZM5.93359 17.043H2.96484V7.49609H5.93359V17.043ZM4.44922 6.19531C3.49609 6.19531 2.72656 5.42578 2.72656 4.47656C2.72656 3.52734 3.49609 2.75781 4.44922 2.75781C5.39844 2.75781 6.16797 3.52734 6.16797 4.47656C6.16797 5.42578 5.40234 6.19531 4.44922 6.19531ZM17.043 17.043H14.0781V12.4023C14.0781 11.2969 14.0586 9.87109 12.5352 9.87109C10.9922 9.87109 10.7578 11.0781 10.7578 12.3242V17.043H7.79297V7.49609H10.6406V8.80078H10.6797C11.0742 8.05078 12.043 7.25781 13.4844 7.25781C16.4883 7.25781 17.043 9.23438 17.043 11.8047V17.043Z"
        fill="#0077B5"
      />
    </svg>
  );

  const CheckCircleIcon = () => (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <circle
        cx="12"
        cy="12"
        r="10"
        stroke="#FFC727"
        strokeWidth="2"
        fill="none"
      />
      <path
        d="M8 12L11 15L16 9"
        stroke="#FFC727"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );

  const TrustBadgeIcon = () => (
    <svg
      width="20"
      height="20"
      viewBox="0 0 20 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M8.28086 12.9167C8.20647 12.6283 8.05615 12.3651 7.84555 12.1545C7.63494 11.9439 7.37176 11.7936 7.08336 11.7192L1.97086 10.4009C1.88364 10.3761 1.80687 10.3236 1.75221 10.2512C1.69754 10.1789 1.66797 10.0907 1.66797 10C1.66797 9.90938 1.69754 9.82118 1.75221 9.74884C1.80687 9.6765 1.88364 9.62397 1.97086 9.59921L7.08336 8.28005C7.37166 8.20572 7.63477 8.05552 7.84537 7.84508C8.05596 7.63463 8.20634 7.37162 8.28086 7.08338L9.5992 1.97088C9.6237 1.88331 9.67618 1.80616 9.74863 1.75121C9.82108 1.69625 9.90951 1.6665 10.0004 1.6665C10.0914 1.6665 10.1798 1.69625 10.2523 1.75121C10.3247 1.80616 10.3772 1.88331 10.4017 1.97088L11.7192 7.08338C11.7936 7.37177 11.9439 7.63496 12.1545 7.84556C12.3651 8.05616 12.6283 8.20648 12.9167 8.28088L18.0292 9.59838C18.1171 9.62263 18.1946 9.67505 18.2499 9.74761C18.3052 9.82017 18.3351 9.90885 18.3351 10C18.3351 10.0912 18.3052 10.1799 18.2499 10.2525C18.1946 10.325 18.1171 10.3775 18.0292 10.4017L12.9167 11.7192C12.6283 11.7936 12.3651 11.9439 12.1545 12.1545C11.9439 12.3651 11.7936 12.6283 11.7192 12.9167L10.4009 18.0292C10.3764 18.1168 10.3239 18.1939 10.2514 18.2489C10.179 18.3038 10.0905 18.3336 9.99961 18.3336C9.90868 18.3336 9.82025 18.3038 9.7478 18.2489C9.67535 18.1939 9.62287 18.1168 9.59836 18.0292L8.28086 12.9167Z"
        stroke="#FFC300"
        strokeWidth="1.66667"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M16.667 2.5V5.83333"
        stroke="#FFC300"
        strokeWidth="1.66667"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M18.3333 4.1665H15"
        stroke="#FFC300"
        strokeWidth="1.66667"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M3.33301 14.1665V15.8332"
        stroke="#FFC300"
        strokeWidth="1.66667"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M4.16667 15H2.5"
        stroke="#FFC300"
        strokeWidth="1.66667"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );

  return (
    <div className="login-container">
      {/* Left Side - Login Form */}
      <div className="login-left">
        <div className="login-form-wrapper">
          <div className="login-logo">
            <img src={emireqLogo} alt="Emireq Logo" className="logo-image" />
          </div>

          <div className="login-content">
            <h1 className="login-title">Welcome back</h1>
            <p className="login-subtitle">
              Log in to continue your funding journey.
            </p>

            {isLoginError && (
              <div className="error-banner">
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 20 20"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <circle
                    cx="10"
                    cy="10"
                    r="9"
                    stroke="#DC2626"
                    strokeWidth="2"
                    fill="none"
                  />
                  <path
                    d="M10 6V10M10 14H10.01"
                    stroke="#DC2626"
                    strokeWidth="2"
                    strokeLinecap="round"
                  />
                </svg>
                <span>Invalid username or password. Please try again.</span>
              </div>
            )}

            <form onSubmit={(e) => handleLogin(e)} className="login-form">
              <div className="form-group">
                <label htmlFor="username">Username</label>
                <input
                  type="text"
                  id="username"
                  name="username"
                  placeholder="username"
                  value={username}
                  onChange={(e) => {
                    setUsername(e.target.value);
                    if (e.target.value.trim()) {
                      setUsernameError("");
                    }
                  }}
                  className={usernameError ? "error" : ""}
                />
                {usernameError && (
                  <div className="error-message">
                    <svg
                      width="16"
                      height="16"
                      viewBox="0 0 16 16"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <circle
                        cx="8"
                        cy="8"
                        r="7"
                        stroke="#DC2626"
                        strokeWidth="1.5"
                        fill="none"
                      />
                      <path
                        d="M8 4V8M8 11H8.01"
                        stroke="#DC2626"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                      />
                    </svg>
                    <span>{usernameError}</span>
                  </div>
                )}
              </div>

              <div className="form-group">
                <label htmlFor="password">Password</label>
                <div className="password-input-wrapper">
                  <input
                    type={"password"}
                    id="password"
                    name="password"
                    placeholder="••••••••••••"
                    value={password}
                    onChange={(e) => {
                      const val = e.target.value;
                      setPassword(val);

                      if (val.length > 0 && val.length < 6) {
                        setPasswordError(
                          "Password must be at least 6 characters",
                        );
                      } else {
                        setPasswordError("");
                      }
                    }}
                    className={passwordError ? "error" : ""}
                  />
                </div>
                {passwordError && (
                  <div className="error-message">
                    <svg
                      width="16"
                      height="16"
                      viewBox="0 0 16 16"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <circle
                        cx="8"
                        cy="8"
                        r="7"
                        stroke="#DC2626"
                        strokeWidth="1.5"
                        fill="none"
                      />
                      <path
                        d="M8 4V8M8 11H8.01"
                        stroke="#DC2626"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                      />
                    </svg>
                    <span>{passwordError}</span>
                  </div>
                )}
              </div>

              <button type="submit" className="btn-login" disabled={isLoading}>
                {isLoading ? "Logging in..." : "Log In"}
              </button>

              <a href="#" className="forgot-password">
                Forget Password
              </a>

              <p className="register-prompt">
                Don't have an account?{" "}
                <a
                  href="/auth/register"
                  className="register-link"
                  onClick={(e) => {
                    e.preventDefault();
                    navigate("/auth/register");
                  }}
                >
                  Register
                </a>
              </p>

              <div className="divider">
                <span>Or</span>
              </div>

              <button
                type="button"
                className="btn-social btn-google"
                onClick={() => handleSocialLogin("google")}
              >
                <GoogleIcon />
                <span>Register with Google</span>
              </button>

              <button
                type="button"
                className="btn-social btn-linkedin"
                onClick={() => handleSocialLogin("linkedin")}
              >
                <LinkedInIcon />
                <span>Register with Linkedin</span>
              </button>
            </form>
          </div>
        </div>
      </div>

      {/* Right Side - Branding */}
      <div className="login-right">
        <div className="login-right-header">
          <div className="trust-badge">
            <TrustBadgeIcon />
            <span>Trusted by 50,000+ users worldwide</span>
          </div>
          <div className="language-selector">
            <span>English(UK)</span>
            <svg
              width="12"
              height="8"
              viewBox="0 0 12 8"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M1 1L6 6L11 1"
                stroke="white"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>
        </div>

        <div className="branding-content">
          <h2 className="branding-title">
            Empowering Ethical
            <br />
            Startups Worldwide
          </h2>

          <div className="quote-icon">
            <svg
              width="25"
              height="20"
              viewBox="0 0 25 20"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M21 0C22.0938 0 22.6406 0.21875 22.6406 0.65625C22.6406 0.84375 22.4688 1 22.125 1.125C19.25 2.28125 17.8125 4.53125 17.8125 7.875C18.25 7.8125 18.5625 7.78125 18.75 7.78125C22.5 7.78125 24.375 9.65625 24.375 13.4062C24.375 17.125 22.5 18.9844 18.75 18.9844C14.4062 18.9844 12.2344 16.5938 12.2344 11.8125C12.2344 6.65625 14.3125 2.95312 18.4688 0.703125C19.3438 0.234375 20.1875 0 21 0ZM8.76562 0.140625C9.85938 0.140625 10.4062 0.359375 10.4062 0.796875C10.4062 0.984375 10.2344 1.14062 9.89062 1.26562C7.01562 2.42188 5.57812 4.67188 5.57812 8.01562C6.01562 7.95312 6.32812 7.92188 6.51562 7.92188C10.2656 7.92188 12.1406 9.79688 12.1406 13.5469C12.1406 17.2656 10.2656 19.125 6.51562 19.125C2.17188 19.125 0 16.7344 0 11.9531C0 6.79688 2.07812 3.09375 6.23438 0.84375C7.10938 0.375 7.95312 0.140625 8.76562 0.140625Z"
                fill="#CBDBFC"
              />
            </svg>
          </div>

          <p className="branding-description">
            Join a growing network of founders and investors driving
            transparent, Shariah-compliant innovation.
            <br />
            Connect, raise funds, and grow your business in a platform built for
            integrity and impact.
          </p>

          <div className="branding-features">
            <div className="feature-item">
              <CheckCircleIcon />
              <span>Secure Login</span>
            </div>
            <div className="feature-item">
              <CheckCircleIcon />
              <span>Verified Global Investors</span>
            </div>
            <div className="feature-item">
              <CheckCircleIcon />
              <span>Shariah-Compliant Investment Network</span>
            </div>
            <div className="feature-item">
              <CheckCircleIcon />
              <span>Trusted by 50,000+ entrepreneurs</span>
            </div>
          </div>

          <div className="decorative-element"></div>
        </div>
      </div>

      {/* Success Modal */}
      {showSuccessModal && (
        <div className="success-modal-overlay">
          <div className="success-modal">
            <button
              className="close-modal-btn"
              onClick={() => setShowSuccessModal(false)}
            >
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M18 6L6 18M6 6L18 18"
                  stroke="#9CA3AF"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </button>

            <div className="success-icon">
              <svg
                width="80"
                height="80"
                viewBox="0 0 80 80"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <circle cx="40" cy="40" r="40" fill="#D1FAE5" />
                <circle cx="40" cy="40" r="28" fill="#10B981" />
                <path
                  d="M28 40L36 48L52 32"
                  stroke="white"
                  strokeWidth="4"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </div>

            <h2 className="success-title">Login Successful!</h2>

            <p className="success-message">
              Welcome back! You're being redirected to your startup dashboard.
            </p>

            <button
              className="btn-continue-dashboard"
              onClick={handleContinueToDashboard}
            >
              Continue to Dashboard
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Login;
