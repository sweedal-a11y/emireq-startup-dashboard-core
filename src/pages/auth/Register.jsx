import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import emireqLogo from '../../assets/emireq-logo.png';
import './Register.css';

const Register = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: ''
  });
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState({
    username: '',
    email: '',
    password: ''
  });
  const [generalError, setGeneralError] = useState('');

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    // Clear field-specific error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
    
    // Clear general error when user starts typing
    if (generalError) {
      setGeneralError('');
    }
  };

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const validateForm = () => {
    const newErrors = {
      username: '',
      email: '',
      password: ''
    };
    let isValid = true;

    // Username validation
    if (!formData.username.trim()) {
      newErrors.username = 'Username is required';
      isValid = false;
    } else if (formData.username.length < 3) {
      newErrors.username = 'Username must be at least 3 characters';
      isValid = false;
    }

    // Email validation
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
      isValid = false;
    } else if (!validateEmail(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
      isValid = false;
    }

    // Password validation
    if (!formData.password) {
      newErrors.password = 'Password is required';
      isValid = false;
    } else if (formData.password.length < 8) {
      newErrors.password = 'Password must be at least 8 characters';
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Clear previous general error
    setGeneralError('');
    
    // Validate form
    if (!validateForm()) {
      return;
    }
    
    setIsLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
      // Navigate to dashboard after successful registration
      navigate('/dashboard');
    }, 1500);
  };

  const handleSocialRegister = (provider) => {
    console.log(`Registering with ${provider}`);
    // Implement social registration logic here
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

  const TrustBadgeIcon = () => (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M8.28086 12.9167C8.20647 12.6283 8.05615 12.3651 7.84555 12.1545C7.63494 11.9439 7.37176 11.7936 7.08336 11.7192L1.97086 10.4009C1.88364 10.3761 1.80687 10.3236 1.75221 10.2512C1.69754 10.1789 1.66797 10.0907 1.66797 10C1.66797 9.90938 1.69754 9.82118 1.75221 9.74884C1.80687 9.6765 1.88364 9.62397 1.97086 9.59921L7.08336 8.28005C7.37166 8.20572 7.63477 8.05552 7.84537 7.84508C8.05596 7.63463 8.20634 7.37162 8.28086 7.08338L9.5992 1.97088C9.6237 1.88331 9.67618 1.80616 9.74863 1.75121C9.82108 1.69625 9.90951 1.6665 10.0004 1.6665C10.0914 1.6665 10.1798 1.69625 10.2523 1.75121C10.3247 1.80616 10.3772 1.88331 10.4017 1.97088L11.7192 7.08338C11.7936 7.37177 11.9439 7.63496 12.1545 7.84556C12.3651 8.05616 12.6283 8.20648 12.9167 8.28088L18.0292 9.59838C18.1171 9.62263 18.1946 9.67505 18.2499 9.74761C18.3052 9.82017 18.3351 9.90885 18.3351 10C18.3351 10.0912 18.3052 10.1799 18.2499 10.2525C18.1946 10.325 18.1171 10.3775 18.0292 10.4017L12.9167 11.7192C12.6283 11.7936 12.3651 11.9439 12.1545 12.1545C11.9439 12.3651 11.7936 12.6283 11.7192 12.9167L10.4009 18.0292C10.3764 18.1168 10.3239 18.1939 10.2514 18.2489C10.179 18.3038 10.0905 18.3336 9.99961 18.3336C9.90868 18.3336 9.82025 18.3038 9.7478 18.2489C9.67535 18.1939 9.62287 18.1168 9.59836 18.0292L8.28086 12.9167Z" stroke="#FFC300" strokeWidth="1.66667" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M16.667 2.5V5.83333" stroke="#FFC300" strokeWidth="1.66667" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M18.3333 4.1665H15" stroke="#FFC300" strokeWidth="1.66667" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M3.33301 14.1665V15.8332" stroke="#FFC300" strokeWidth="1.66667" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M4.16667 15H2.5" stroke="#FFC300" strokeWidth="1.66667" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  );

  const FundingIcon = () => (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z" stroke="#FFC727" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" fill="none"/>
    </svg>
  );

  const ProgressIcon = () => (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M22 12C22 17.5228 17.5228 22 12 22M22 12C22 6.47715 17.5228 2 12 2M22 12H2M12 22C6.47715 22 2 17.5228 2 12M12 22C13.6569 22 15 17.5228 15 12C15 6.47715 13.6569 2 12 2M12 22C10.3431 22 9 17.5228 9 12C9 6.47715 10.3431 2 12 2M2 12C2 6.47715 6.47715 2 12 2" stroke="#FFC727" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  );

  const CertifiedIcon = () => (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M9 12L11 14L15 10M21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12Z" stroke="#FFC727" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  );

  return (
    <div className="register-container">
      {/* Left Side - Register Form */}
      <div className="register-left">
        <div className="register-form-wrapper">
          <div className="register-logo">
            <img src={emireqLogo} alt="Emireq Logo" className="logo-image" onClick={() => navigate('/')} />
          </div>

          <div className="register-content">
            <h1 className="register-title">Welcome back</h1>
            <p className="register-subtitle">Access your startup dashboard and funding journey</p>

            {generalError && (
              <div className="error-banner">
                <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <circle cx="10" cy="10" r="9" stroke="#DC2626" strokeWidth="2" fill="none"/>
                  <path d="M10 6V10M10 14H10.01" stroke="#DC2626" strokeWidth="2" strokeLinecap="round"/>
                </svg>
                <span>{generalError}</span>
              </div>
            )}

            <form onSubmit={handleSubmit} className="register-form">
              <div className="form-group">
                <label htmlFor="username">Username</label>
                <input
                  type="text"
                  id="username"
                  name="username"
                  placeholder="username"
                  value={formData.username}
                  onChange={handleInputChange}
                  className={errors.username ? 'error' : ''}
                />
                {errors.username && (
                  <div className="error-message">
                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <circle cx="8" cy="8" r="7" stroke="#DC2626" strokeWidth="1.5" fill="none"/>
                      <path d="M8 4V8M8 11H8.01" stroke="#DC2626" strokeWidth="1.5" strokeLinecap="round"/>
                    </svg>
                    <span>{errors.username}</span>
                  </div>
                )}
              </div>

              <div className="form-group">
                <label htmlFor="email">Email</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  placeholder="example@gmail.com"
                  value={formData.email}
                  onChange={handleInputChange}
                  className={errors.email ? 'error' : ''}
                />
                {errors.email && (
                  <div className="error-message">
                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <circle cx="8" cy="8" r="7" stroke="#DC2626" strokeWidth="1.5" fill="none"/>
                      <path d="M8 4V8M8 11H8.01" stroke="#DC2626" strokeWidth="1.5" strokeLinecap="round"/>
                    </svg>
                    <span>{errors.email}</span>
                  </div>
                )}
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
                    className={errors.password ? 'error' : ''}
                  />
                </div>
                {errors.password && (
                  <div className="error-message">
                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <circle cx="8" cy="8" r="7" stroke="#DC2626" strokeWidth="1.5" fill="none"/>
                      <path d="M8 4V8M8 11H8.01" stroke="#DC2626" strokeWidth="1.5" strokeLinecap="round"/>
                    </svg>
                    <span>{errors.password}</span>
                  </div>
                )}
              </div>

              <button type="submit" className="btn-register" disabled={isLoading}>
                {isLoading ? 'Registering...' : 'Register'}
              </button>

              <p className="login-prompt">
                Already have an account? <a href="/auth/login" className="login-link" onClick={(e) => { e.preventDefault(); navigate('/auth/login'); }}>Log in</a>
              </p>

              <div className="divider">
                <span>Or</span>
              </div>

              <button
                type="button"
                className="btn-social btn-google"
                onClick={() => handleSocialRegister('google')}
              >
                <GoogleIcon />
                <span>Register with Google</span>
              </button>

              <button
                type="button"
                className="btn-social btn-linkedin"
                onClick={() => handleSocialRegister('linkedin')}
              >
                <LinkedInIcon />
                <span>Register with Linkedin</span>
              </button>
            </form>
          </div>
        </div>
      </div>

      {/* Right Side - Branding */}
      <div className="register-right">
        <div className="register-right-header">
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
            Build Your Startup the<br />
            Shariah Way
          </h2>
          
          <div className="quote-icon">
            <svg width="40" height="32" viewBox="0 0 40 32" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M0 32V12.8Q0 5.6 3.6 1.6Q7.2-2.4 14.4-2.4V4Q10.4 4.8 8 7.6Q5.6 10.4 5.6 15.2H16V32H0ZM24 32V12.8Q24 5.6 27.6 1.6Q31.2-2.4 38.4-2.4V4Q34.4 4.8 32 7.6Q29.6 10.4 29.6 15.2H40V32H24Z" fill="rgba(255, 255, 255, 0.2)"/>
            </svg>
          </div>

          <p className="branding-description">
            Connect with ethical investors, secure funding, and scale your business on a platform built for Shariah compliance and transparency.
          </p>

          <div className="branding-features">
            <div className="feature-item">
              <div className="feature-icon">
                <FundingIcon />
              </div>
              <div className="feature-text">
                <h3>Access to Funding</h3>
                <p>Connect with 10,000+ verified investors</p>
              </div>
            </div>
            <div className="feature-item">
              <div className="feature-icon">
                <ProgressIcon />
              </div>
              <div className="feature-text">
                <h3>Track Your Progress</h3>
                <p>Real-time analytics and engagement insights</p>
              </div>
            </div>
            <div className="feature-item">
              <div className="feature-icon">
                <CertifiedIcon />
              </div>
              <div className="feature-text">
                <h3>Shariah Certified</h3>
                <p>All deals verified by Islamic finance experts</p>
              </div>
            </div>
          </div>

          <div className="decorative-element"></div>
        </div>
      </div>
    </div>
  );
};

export default Register;
