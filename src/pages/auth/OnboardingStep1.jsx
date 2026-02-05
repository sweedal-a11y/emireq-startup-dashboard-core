import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import emireqLogo from '../../assets/emireq-logo.png';
import registerBg from '../../assets/register-bg.png';
import './OnboardingStep1.css';

const OnboardingStep1 = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    companyName: '',
    industry: '',
    foundedDate: '',
    website: '',
    registrationNumber: ''
  });
  const [focusedField, setFocusedField] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Add cursor activity on mount
  useEffect(() => {
    document.body.style.cursor = 'default';
    
    // Add hover effect to interactive elements
    const handleMouseOver = (e) => {
      const target = e.target;
      if (target.tagName === 'BUTTON' || target.tagName === 'INPUT' || target.tagName === 'SELECT' || target.classList.contains('clickable')) {
        document.body.style.cursor = 'pointer';
      }
    };

    const handleMouseOut = () => {
      document.body.style.cursor = 'default';
    };

    document.addEventListener('mouseover', handleMouseOver);
    document.addEventListener('mouseout', handleMouseOut);

    return () => {
      document.removeEventListener('mouseover', handleMouseOver);
      document.removeEventListener('mouseout', handleMouseOut);
    };
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleFocus = (fieldName) => {
    setFocusedField(fieldName);
  };

  const handleBlur = () => {
    setFocusedField(null);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate form submission
    setTimeout(() => {
      setIsSubmitting(false);
      // Navigate to step 2
      navigate('/onboarding/step2');
    }, 1500);
  };

  const TrustBadgeIcon = () => (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M8.28086 12.9167C8.20647 12.6283 8.05615 12.3651 7.84555 12.1545C7.63494 11.9439 7.37176 11.7936 7.08336 11.7192L1.97086 10.4009C1.88364 10.3761 1.80687 10.3236 1.75221 10.2512C1.69754 10.1789 1.66797 10.0907 1.66797 10C1.66797 9.90938 1.69754 9.82118 1.75221 9.74884C1.80687 9.6765 1.88364 9.62397 1.97086 9.59921L7.08336 8.28005C7.37166 8.20572 7.63477 8.05552 7.84537 7.84508C8.05596 7.63463 8.20634 7.37162 8.28086 7.08338L9.5992 1.97088C9.6237 1.88331 9.67618 1.80616 9.74863 1.75121C9.82108 1.69625 9.90951 1.6665 10.0004 1.6665C10.0914 1.6665 10.1798 1.69625 10.2523 1.75121C10.3247 1.80616 10.3772 1.88331 10.4017 1.97088L11.7192 7.08338C11.7936 7.37177 11.9439 7.63496 12.1545 7.84556C12.3651 8.05616 12.6283 8.20648 12.9167 8.28088L18.0292 9.59838C18.1171 9.62263 18.1946 9.67505 18.2499 9.74761C18.3052 9.82017 18.3351 9.90885 18.3351 10C18.3351 10.0912 18.3052 10.1799 18.2499 10.2525C18.1946 10.325 18.1171 10.3775 18.0292 10.4017L12.9167 11.7192C12.6283 11.7936 12.3651 11.9439 12.1545 12.1545C11.9439 12.3651 11.7936 12.6283 11.7192 12.9167L10.4009 18.0292C10.3764 18.1168 10.3239 18.1939 10.2514 18.2489C10.179 18.3038 10.0905 18.3336 9.99961 18.3336C9.90868 18.3336 9.82025 18.3038 9.7478 18.2489C9.67535 18.1939 9.62287 18.1168 9.59836 18.0292L8.28086 12.9167Z" stroke="#FFC300" strokeWidth="1.66667" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M16.667 2.5V5.83333" stroke="#FFC300" strokeWidth="1.66667" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M18.3333 4.1665H15" stroke="#FFC300" strokeWidth="1.66667" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M3.33301 14.1665V15.8332" stroke="#FFC300" strokeWidth="1.66667" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M4.16667 15H2.5" stroke="#FFC300" strokeWidth="1.66667" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  );

  return (
    <div className="onboarding-container">
      {/* Left Side - Branding */}
      <div className="onboarding-left">
        <div className="onboarding-left-header">
          <div className="trust-badge-onboarding">
            <TrustBadgeIcon />
            <span>Trusted by 50,000+ users worldwide</span>
          </div>

          <div className="language-selector-onboarding">
            <span>English(UK)</span>
            <svg width="12" height="8" viewBox="0 0 12 8" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M1 1L6 6L11 1" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </div>
        </div>

        <div className="onboarding-content">
          <div className="step-badge">
            Step 1 of 9
          </div>

          <h1 className="onboarding-title">Your Company Identity</h1>

          <div className="quote-icon-onboarding">
            <svg width="25" height="20" viewBox="0 0 25 20" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M21 0C22.0938 0 22.6406 0.21875 22.6406 0.65625C22.6406 0.84375 22.4688 1 22.125 1.125C19.25 2.28125 17.8125 4.53125 17.8125 7.875C18.25 7.8125 18.5625 7.78125 18.75 7.78125C22.5 7.78125 24.375 9.65625 24.375 13.4062C24.375 17.125 22.5 18.9844 18.75 18.9844C14.4062 18.9844 12.2344 16.5938 12.2344 11.8125C12.2344 6.65625 14.3125 2.95312 18.4688 0.703125C19.3438 0.234375 20.1875 0 21 0ZM8.76562 0.140625C9.85938 0.140625 10.4062 0.359375 10.4062 0.796875C10.4062 0.984375 10.2344 1.14062 9.89062 1.26562C7.01562 2.42188 5.57812 4.67188 5.57812 8.01562C6.01562 7.95312 6.32812 7.92188 6.51562 7.92188C10.2656 7.92188 12.1406 9.79688 12.1406 13.5469C12.1406 17.2656 10.2656 19.125 6.51562 19.125C2.17188 19.125 0 16.7344 0 11.9531C0 6.79688 2.07812 3.09375 6.23438 0.84375C7.10938 0.375 7.95312 0.140625 8.76562 0.140625Z" fill="#CBDBFC"/>
            </svg>
          </div>

          <p className="onboarding-description">
            Help investors understand your business by providing accurate company information. This builds trust and credibility.
          </p>

          <div className="onboarding-features">
            <div className="onboarding-feature-item">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M0 12C0 5.37258 5.37258 0 12 0C18.6274 0 24 5.37258 24 12C24 18.6274 18.6274 24 12 24C5.37258 24 0 18.6274 0 12Z" fill="#FFC300" fillOpacity="0.2"/>
                <path d="M8 12C8 9.79086 9.79086 8 12 8C14.2091 8 16 9.79086 16 12C16 14.2091 14.2091 16 12 16C9.79086 16 8 14.2091 8 12Z" fill="#FFC300"/>
              </svg>
              <span>Verified company information</span>
            </div>
            <div className="onboarding-feature-item">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M0 12C0 5.37258 5.37258 0 12 0C18.6274 0 24 5.37258 24 12C24 18.6274 18.6274 24 12 24C5.37258 24 0 18.6274 0 12Z" fill="#FFC300" fillOpacity="0.2"/>
                <path d="M8 12C8 9.79086 9.79086 8 12 8C14.2091 8 16 9.79086 16 12C16 14.2091 14.2091 16 12 16C9.79086 16 8 14.2091 8 12Z" fill="#FFC300"/>
              </svg>
              <span>Build investor confidence</span>
            </div>
            <div className="onboarding-feature-item">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M0 12C0 5.37258 5.37258 0 12 0C18.6274 0 24 5.37258 24 12C24 18.6274 18.6274 24 12 24C5.37258 24 0 18.6274 0 12Z" fill="#FFC300" fillOpacity="0.2"/>
                <path d="M8 12C8 9.79086 9.79086 8 12 8C14.2091 8 16 9.79086 16 12C16 14.2091 14.2091 16 12 16C9.79086 16 8 14.2091 8 12Z" fill="#FFC300"/>
              </svg>
              <span>Faster due diligence process</span>
            </div>
            <div className="onboarding-feature-item">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M0 12C0 5.37258 5.37258 0 12 0C18.6274 0 24 5.37258 24 12C24 18.6274 18.6274 24 12 24C5.37258 24 0 18.6274 0 12Z" fill="#FFC300" fillOpacity="0.2"/>
                <path d="M8 12C8 9.79086 9.79086 8 12 8C14.2091 8 16 9.79086 16 12C16 14.2091 14.2091 16 12 16C9.79086 16 8 14.2091 8 12Z" fill="#FFC300"/>
              </svg>
              <span>Better deal matching</span>
            </div>
          </div>

          <div className="decorative-shape"></div>
        </div>
      </div>

      {/* Right Side - Form */}
      <div className="onboarding-right">
        <div className="onboarding-right-header">
          <img src={emireqLogo} alt="Emireq Logo" className="onboarding-logo" />
          
          <div className="language-selector-right">
            <span>English(UK)</span>
            <svg width="12" height="8" viewBox="0 0 12 8" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M1 1L6 6L11 1" stroke="#6B7280" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </div>
        </div>

        <div className="progress-stepper">
          {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((step) => (
            <React.Fragment key={step}>
              <div className={`progress-step ${step === 1 ? 'active' : ''}`}>
                {step}
              </div>
              {step < 9 && <div className="progress-line"></div>}
            </React.Fragment>
          ))}
        </div>

        <div className="onboarding-form-section">
          <div className="form-header">
            <div className="form-icon">
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
<g clip-path="url(#clip0_115_13377)">
<path d="M4 14.6667V2.66668C4 2.31305 4.14048 1.97392 4.39052 1.72387C4.64057 1.47382 4.97971 1.33334 5.33333 1.33334H10.6667C11.0203 1.33334 11.3594 1.47382 11.6095 1.72387C11.8595 1.97392 12 2.31305 12 2.66668V14.6667H4Z" stroke="white" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M3.99992 8H2.66659C2.31296 8 1.97382 8.14048 1.72378 8.39052C1.47373 8.64057 1.33325 8.97971 1.33325 9.33333V13.3333C1.33325 13.687 1.47373 14.0261 1.72378 14.2761C1.97382 14.5262 2.31296 14.6667 2.66659 14.6667H3.99992" stroke="white" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M12 6H13.3333C13.687 6 14.0261 6.14048 14.2761 6.39052C14.5262 6.64057 14.6667 6.97971 14.6667 7.33333V13.3333C14.6667 13.687 14.5262 14.0261 14.2761 14.2761C14.0261 14.5262 13.687 14.6667 13.3333 14.6667H12" stroke="white" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M6.66675 4H9.33341" stroke="white" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M6.66675 6.66669H9.33341" stroke="white" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M6.66675 9.33334H9.33341" stroke="white" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M6.66675 12H9.33341" stroke="white" stroke-linecap="round" stroke-linejoin="round"/>
</g>
<defs>
<clipPath id="clip0_115_13377">
<rect width="16" height="16" fill="white"/>
</clipPath>
</defs>
</svg>

            </div>
            <h2 className="form-title">Tell us about your startup</h2>
          </div>

          <p className="form-subtitle">
            Tell us a little about your startup - we'll personalize your experience.
          </p>

          <form onSubmit={handleSubmit} className="onboarding-form">
            <div className="onboarding-form-group">
              <label htmlFor="companyName">Company Name<span className="required">*</span></label>
              <input
                type="text"
                id="companyName"
                name="companyName"
                placeholder="Acme Technologies inc."
                value={formData.companyName}
                onChange={handleInputChange}
                onFocus={() => handleFocus('companyName')}
                onBlur={handleBlur}
                className={focusedField === 'companyName' ? 'focused' : ''}
                required
              />
            </div>

            <div className="onboarding-form-group">
              <label htmlFor="industry">Industry<span className="required">*</span></label>
              <div className="select-wrapper">
                <select
                  id="industry"
                  name="industry"
                  value={formData.industry}
                  onChange={handleInputChange}
                  onFocus={() => handleFocus('industry')}
                  onBlur={handleBlur}
                  className={focusedField === 'industry' ? 'focused' : ''}
                  required
                >
                  <option value="">Select your industry</option>
                  <option value="technology">Technology</option>
                  <option value="healthcare">Healthcare</option>
                  <option value="finance">Finance</option>
                  <option value="education">Education</option>
                  <option value="retail">Retail</option>
                  <option value="other">Other</option>
                </select>
                <svg className="select-arrow" width="12" height="8" viewBox="0 0 12 8" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M1 1L6 6L11 1" stroke="#6B7280" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
            </div>

            <div className="onboarding-form-group">
              <label htmlFor="foundedDate">Founded Date<span className="required">*</span></label>
              <div className="input-with-icon">
                <svg className="input-icon" width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <rect x="3" y="4" width="14" height="14" rx="2" stroke="#9CA3AF" strokeWidth="1.5"/>
                  <path d="M3 8H17" stroke="#9CA3AF" strokeWidth="1.5"/>
                  <path d="M7 2V6" stroke="#9CA3AF" strokeWidth="1.5" strokeLinecap="round"/>
                  <path d="M13 2V6" stroke="#9CA3AF" strokeWidth="1.5" strokeLinecap="round"/>
                </svg>
                <input
                  type="text"
                  id="foundedDate"
                  name="foundedDate"
                  placeholder="Current Stage"
                  value={formData.foundedDate}
                  onChange={handleInputChange}
                  onFocus={() => handleFocus('foundedDate')}
                  onBlur={handleBlur}
                  className={focusedField === 'foundedDate' ? 'focused' : ''}
                  required
                />
              </div>
            </div>

            <div className="onboarding-form-group">
              <label htmlFor="website">Website</label>
              <div className="input-with-icon">
                <svg className="input-icon" width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <circle cx="10" cy="10" r="8" stroke="#9CA3AF" strokeWidth="1.5"/>
                  <path d="M2 10H18" stroke="#9CA3AF" strokeWidth="1.5"/>
                  <path d="M10 2C12 4.5 13 7.5 13 10C13 12.5 12 15.5 10 18C8 15.5 7 12.5 7 10C7 7.5 8 4.5 10 2Z" stroke="#9CA3AF" strokeWidth="1.5"/>
                </svg>
                <input
                  type="url"
                  id="website"
                  name="website"
                  placeholder="https://example.com"
                  value={formData.website}
                  onChange={handleInputChange}
                  onFocus={() => handleFocus('website')}
                  onBlur={handleBlur}
                  className={focusedField === 'website' ? 'focused' : ''}
                />
              </div>
            </div>

            <div className="onboarding-form-group">
              <label htmlFor="registrationNumber">Company Registration Number</label>
              <div className="input-with-icon">
                <svg className="input-icon" width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M11 2H5C4.46957 2 3.96086 2.21071 3.58579 2.58579C3.21071 2.96086 3 3.46957 3 4V16C3 16.5304 3.21071 17.0391 3.58579 17.4142C3.96086 17.7893 4.46957 18 5 18H15C15.5304 18 16.0391 17.7893 16.4142 17.4142C16.7893 17.0391 17 16.5304 17 16V8L11 2Z" stroke="#9CA3AF" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M11 2V8H17" stroke="#9CA3AF" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
                <input
                  type="text"
                  id="registrationNumber"
                  name="registrationNumber"
                  placeholder="REG123456"
                  value={formData.registrationNumber}
                  onChange={handleInputChange}
                  onFocus={() => handleFocus('registrationNumber')}
                  onBlur={handleBlur}
                  className={focusedField === 'registrationNumber' ? 'focused' : ''}
                />
              </div>
            </div>

            <button type="submit" className="btn-continue" disabled={isSubmitting}>
              {isSubmitting ? 'Processing...' : 'Continue'}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default OnboardingStep1;
