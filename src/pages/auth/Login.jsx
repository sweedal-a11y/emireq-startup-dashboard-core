import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import emireqLogo from '../../assets/emireq-logo.png';
import './Login.css';

const Login = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    username: '',
    password: ''
  });
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
      navigate('/dashboard');
    }, 1000);
  };

  const handleSocialLogin = (provider) => {
    console.log(`Logging in with ${provider}`);
    // Implement social login logic here
  };

  const GoogleIcon = () => (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M19.9895 10.1871C19.9895 9.36767 19.9214 8.76973 19.7742 8.14966H10.1992V11.848H15.8195C15.7062 12.7671 15.0943 14.1512 13.7346 15.0813L13.7155 15.2051L16.7429 17.4969L16.9527 17.5174C18.8789 15.7789 19.9895 13.221 19.9895 10.1871Z" fill="#4285F4"/>
      <path d="M10.1993 19.9313C12.9527 19.9313 15.2643 19.0454 16.9527 17.5174L13.7346 15.0813C12.8734 15.6682 11.7176 16.0779 10.1993 16.0779C7.50243 16.0779 5.21352 14.3395 4.39759 11.9366L4.27799 11.9465L1.13003 14.3273L1.08887 14.4391C2.76588 17.6945 6.21061 19.9313 10.1993 19.9313Z" fill="#34A853"/>
      <path d="M4.39748 11.9366C4.18219 11.3166 4.05759 10.6521 4.05759 9.96565C4.05759 9.27909 4.18219 8.61473 4.38615 7.99466L4.38045 7.8626L1.19304 5.44366L1.08875 5.49214C0.397576 6.84305 0.000976562 8.36008 0.000976562 9.96565C0.000976562 11.5712 0.397576 13.0882 1.08875 14.4391L4.39748 11.9366Z" fill="#FBBC05"/>
      <path d="M10.1993 3.85336C12.1142 3.85336 13.406 4.66168 14.1425 5.33718L17.0207 2.59107C15.253 0.985496 12.9527 0 10.1993 0C6.2106 0 2.76588 2.23672 1.08887 5.49214L4.38626 7.99466C5.21352 5.59183 7.50242 3.85336 10.1993 3.85336Z" fill="#EB4335"/>
    </svg>
  );

  const LinkedInIcon = () => (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M18.5195 0H1.47656C0.660156 0 0 0.644531 0 1.44141V18.5547C0 19.3516 0.660156 20 1.47656 20H18.5195C19.3359 20 20 19.3516 20 18.5586V1.44141C20 0.644531 19.3359 0 18.5195 0ZM5.93359 17.043H2.96484V7.49609H5.93359V17.043ZM4.44922 6.19531C3.49609 6.19531 2.72656 5.42578 2.72656 4.47656C2.72656 3.52734 3.49609 2.75781 4.44922 2.75781C5.39844 2.75781 6.16797 3.52734 6.16797 4.47656C6.16797 5.42578 5.40234 6.19531 4.44922 6.19531ZM17.043 17.043H14.0781V12.4023C14.0781 11.2969 14.0586 9.87109 12.5352 9.87109C10.9922 9.87109 10.7578 11.0781 10.7578 12.3242V17.043H7.79297V7.49609H10.6406V8.80078H10.6797C11.0742 8.05078 12.043 7.25781 13.4844 7.25781C16.4883 7.25781 17.043 9.23438 17.043 11.8047V17.043Z" fill="#0077B5"/>
    </svg>
  );

  const CheckCircleIcon = () => (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="12" cy="12" r="10" stroke="#FFC727" strokeWidth="2" fill="none"/>
      <path d="M8 12L11 15L16 9" stroke="#FFC727" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  );

  const TrustBadgeIcon = () => (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M10 0L12.2451 6.90983L19.5106 6.90983L13.6327 11.1803L15.8779 18.0902L10 13.8197L4.12215 18.0902L6.36729 11.1803L0.489435 6.90983L7.75486 6.90983L10 0Z" fill="#FFC727"/>
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
            <p className="login-subtitle">Log in to continue your funding journey.</p>

            <form onSubmit={handleSubmit} className="login-form">
              <div className="form-group">
                <label htmlFor="username">Username</label>
                <input
                  type="text"
                  id="username"
                  name="username"
                  placeholder="username"
                  value={formData.username}
                  onChange={handleInputChange}
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="password">Password</label>
                <div className="password-input-wrapper">
                  <input
                    type={showPassword ? "text" : "password"}
                    id="password"
                    name="password"
                    placeholder="••••••••••••"
                    value={formData.password}
                    onChange={handleInputChange}
                    required
                  />
                </div>
              </div>

              <button type="submit" className="btn-login" disabled={isLoading}>
                {isLoading ? 'Logging in...' : 'Log In'}
              </button>

              <a href="#" className="forgot-password">Forget Password</a>

              <p className="register-prompt">
                Don't have an account? <a href="#" className="register-link">Register</a>
              </p>

              <div className="divider">
                <span>Or</span>
              </div>

              <button
                type="button"
                className="btn-social btn-google"
                onClick={() => handleSocialLogin('google')}
              >
                <GoogleIcon />
                <span>Register with Google</span>
              </button>

              <button
                type="button"
                className="btn-social btn-linkedin"
                onClick={() => handleSocialLogin('linkedin')}
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
            <svg width="12" height="8" viewBox="0 0 12 8" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M1 1L6 6L11 1" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </div>
        </div>

        <div className="branding-content">
          <h2 className="branding-title">
            Empowering Ethical<br />
            Startups Worldwide
          </h2>
          
          <div className="quote-icon">
            <svg width="40" height="32" viewBox="0 0 40 32" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M0 32V12.8Q0 5.6 3.6 1.6Q7.2-2.4 14.4-2.4V4Q10.4 4.8 8 7.6Q5.6 10.4 5.6 15.2H16V32H0ZM24 32V12.8Q24 5.6 27.6 1.6Q31.2-2.4 38.4-2.4V4Q34.4 4.8 32 7.6Q29.6 10.4 29.6 15.2H40V32H24Z" fill="rgba(255, 255, 255, 0.2)"/>
            </svg>
          </div>

          <p className="branding-description">
            Join a growing network of founders and investors driving transparent, Shariah-compliant innovation.<br />
            Connect, raise funds, and grow your business in a platform built for integrity and impact.
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
    </div>
  );
};

export default Login;