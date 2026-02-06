import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import emireqLogo from '../../assets/emireq-logo.png';
import './OnboardingStep3.css';

const OnboardingStep3 = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    primaryFounder: {
      fullName: '',
      role: '',
      email: '',
      linkedinProfile: ''
    },
    coFounders: []
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Load saved data from localStorage on mount
  useEffect(() => {
    const savedData = JSON.parse(localStorage.getItem('onboardingData') || '{}');
    if (savedData.step3) {
      setFormData(savedData.step3);
    }
  }, []);

  // Add cursor activity on mount
  useEffect(() => {
    document.body.style.cursor = 'default';
    
    // Add hover effect to interactive elements
    const handleMouseOver = (e) => {
      const target = e.target;
      if (target.tagName === 'BUTTON' || target.tagName === 'INPUT' || target.tagName === 'LABEL' || target.classList.contains('clickable')) {
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

  const handlePrimaryFounderChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      primaryFounder: {
        ...prev.primaryFounder,
        [field]: value
      }
    }));
  };

  const handleCoFounderChange = (index, field, value) => {
    const updatedCoFounders = [...formData.coFounders];
    updatedCoFounders[index] = {
      ...updatedCoFounders[index],
      [field]: value
    };
    setFormData(prev => ({
      ...prev,
      coFounders: updatedCoFounders
    }));
  };

  const addCoFounder = () => {
    setFormData(prev => ({
      ...prev,
      coFounders: [
        ...prev.coFounders,
        {
          fullName: '',
          role: '',
          email: '',
          linkedinProfile: ''
        }
      ]
    }));
  };

  const removeCoFounder = (index) => {
    setFormData(prev => ({
      ...prev,
      coFounders: prev.coFounders.filter((_, i) => i !== index)
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const { primaryFounder } = formData;
    
    // Validate primary founder fields
    if (!primaryFounder.fullName || !primaryFounder.role || !primaryFounder.email || !primaryFounder.linkedinProfile) {
      return;
    }
    
    setIsSubmitting(true);
    
    // Save data to localStorage
    const existingData = JSON.parse(localStorage.getItem('onboardingData') || '{}');
    localStorage.setItem('onboardingData', JSON.stringify({
      ...existingData,
      step3: formData
    }));
    
    // Simulate form submission
    setTimeout(() => {
      setIsSubmitting(false);
      // Navigate to step 4
      navigate('/onboarding/step4');
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

  const isFormValid = () => {
    const { primaryFounder } = formData;
    return primaryFounder.fullName && primaryFounder.role && primaryFounder.email && primaryFounder.linkedinProfile;
  };

  return (
    <div className="onboarding-container-step3">
      {/* Left Side - Branding */}
      <div className="onboarding-left-step3">
        <div className="onboarding-left-header-step3">
          <div className="trust-badge-onboarding-step3">
            <TrustBadgeIcon />
            <span>Trusted by 50,000+ users worldwide</span>
          </div>

          <div className="language-selector-onboarding-step3">
            <span>English(UK)</span>
            <svg width="12" height="8" viewBox="0 0 12 8" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M1 1L6 6L11 1" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </div>
        </div>

        <div className="onboarding-content-step3">
          <div className="step-badge-step3">
            Step 3 of 9
          </div>

          <h1 className="onboarding-title-step3">The Team Behind the Vision</h1>

          <div className="quote-icon-onboarding-step3">
            <svg width="25" height="20" viewBox="0 0 25 20" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M21 0C22.0938 0 22.6406 0.21875 22.6406 0.65625C22.6406 0.84375 22.4688 1 22.125 1.125C19.25 2.28125 17.8125 4.53125 17.8125 7.875C18.25 7.8125 18.5625 7.78125 18.75 7.78125C22.5 7.78125 24.375 9.65625 24.375 13.4062C24.375 17.125 22.5 18.9844 18.75 18.9844C14.4062 18.9844 12.2344 16.5938 12.2344 11.8125C12.2344 6.65625 14.3125 2.95312 18.4688 0.703125C19.3438 0.234375 20.1875 0 21 0ZM8.76562 0.140625C9.85938 0.140625 10.4062 0.359375 10.4062 0.796875C10.4062 0.984375 10.2344 1.14062 9.89062 1.26562C7.01562 2.42188 5.57812 4.67188 5.57812 8.01562C6.01562 7.95312 6.32812 7.92188 6.51562 7.92188C10.2656 7.92188 12.1406 9.79688 12.1406 13.5469C12.1406 17.2656 10.2656 19.125 6.51562 19.125C2.17188 19.125 0 16.7344 0 11.9531C0 6.79688 2.07812 3.09375 6.23438 0.84375C7.10938 0.375 7.95312 0.140625 8.76562 0.140625Z" fill="#CBDBFC"/>
            </svg>
          </div>

          <p className="onboarding-description-step3">
            Investors invest in people as much as ideas. Showcase your founding team's expertise and credibility.
          </p>

          <div className="onboarding-features-step3">
            <div className="onboarding-feature-item-step3">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M0 12C0 5.37258 5.37258 0 12 0C18.6274 0 24 5.37258 24 12C24 18.6274 18.6274 24 12 24C5.37258 24 0 18.6274 0 12Z" fill="#FFC300" fillOpacity="0.2"/>
                <path d="M8 12C8 9.79086 9.79086 8 12 8C14.2091 8 16 9.79086 16 12C16 14.2091 14.2091 16 12 16C9.79086 16 8 14.2091 8 12Z" fill="#FFC300"/>
              </svg>
              <span>Strong founder profiles</span>
            </div>
            <div className="onboarding-feature-item-step3">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M0 12C0 5.37258 5.37258 0 12 0C18.6274 0 24 5.37258 24 12C24 18.6274 18.6274 24 12 24C5.37258 24 0 18.6274 0 12Z" fill="#FFC300" fillOpacity="0.2"/>
                <path d="M8 12C8 9.79086 9.79086 8 12 8C14.2091 8 16 9.79086 16 12C16 14.2091 14.2091 16 12 16C9.79086 16 8 14.2091 8 12Z" fill="#FFC300"/>
              </svg>
              <span>Team credibility</span>
            </div>
            <div className="onboarding-feature-item-step3">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M0 12C0 5.37258 5.37258 0 12 0C18.6274 0 24 5.37258 24 12C24 18.6274 18.6274 24 12 24C5.37258 24 0 18.6274 0 12Z" fill="#FFC300" fillOpacity="0.2"/>
                <path d="M8 12C8 9.79086 9.79086 8 12 8C14.2091 8 16 9.79086 16 12C16 14.2091 14.2091 16 12 16C9.79086 16 8 14.2091 8 12Z" fill="#FFC300"/>
              </svg>
              <span>Investor confidence</span>
            </div>
            <div className="onboarding-feature-item-step3">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M0 12C0 5.37258 5.37258 0 12 0C18.6274 0 24 5.37258 24 12C24 18.6274 18.6274 24 12 24C5.37258 24 0 18.6274 0 12Z" fill="#FFC300" fillOpacity="0.2"/>
                <path d="M8 12C8 9.79086 9.79086 8 12 8C14.2091 8 16 9.79086 16 12C16 14.2091 14.2091 16 12 16C9.79086 16 8 14.2091 8 12Z" fill="#FFC300"/>
              </svg>
              <span>Network opportunities</span>
            </div>
          </div>
        </div>
      </div>

      {/* Right Side - Form */}
      <div className="onboarding-right-step3">
        <div className="onboarding-right-header-step3">
          <img src={emireqLogo} alt="Emireq Logo" className="onboarding-logo-step3" />
          
          <div className="language-selector-right-step3">
            <span>English(UK)</span>
            <svg width="12" height="8" viewBox="0 0 12 8" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M1 1L6 6L11 1" stroke="#6B7280" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </div>
        </div>

        <div className="progress-stepper-step3">
          {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((step) => (
            <React.Fragment key={step}>
              <div className={`progress-step-step3 ${step === 3 ? 'active' : ''} ${step < 3 ? 'completed' : ''}`}>
                {step < 3 ? (
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M13.3334 4L6.00008 11.3333L2.66675 8" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                ) : (
                  step
                )}
              </div>
              {step < 9 && <div className="progress-line-step3"></div>}
            </React.Fragment>
          ))}
        </div>

        <div className="onboarding-form-section-step3">
          <div className="form-header-step3">
            <div className="form-icon-step3">
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M3.00008 10.9996C2.00008 11.8396 1.66675 14.3329 1.66675 14.3329C1.66675 14.3329 4.16008 13.9996 5.00008 12.9996C5.47341 12.4396 5.46675 11.5796 4.94008 11.0596C4.68095 10.8122 4.33961 10.6693 3.98157 10.6583C3.62352 10.6472 3.274 10.7687 3.00008 10.9996Z" stroke="white" strokeWidth="1.33333" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M8 10.0002L6 8.00018C6.35476 7.0798 6.80147 6.19755 7.33333 5.36684C8.11012 4.12483 9.19175 3.10221 10.4753 2.39624C11.7589 1.69026 13.2018 1.32442 14.6667 1.33351C14.6667 3.14684 14.1467 6.33351 10.6667 8.66684C9.82459 9.19932 8.93123 9.646 8 10.0002Z" stroke="white" strokeWidth="1.33333" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M6.00008 7.9997H2.66675C2.66675 7.9997 3.03341 5.9797 4.00008 5.33303C5.08008 4.61303 7.33341 5.33303 7.33341 5.33303" stroke="white" strokeWidth="1.33333" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M8 9.99999V13.3333C8 13.3333 10.02 12.9667 10.6667 12C11.3867 10.92 10.6667 8.66666 10.6667 8.66666" stroke="white" strokeWidth="1.33333" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>
            <h2 className="form-title-step3">Company Stage & Type</h2>
          </div>

          <p className="form-subtitle-step3">
            Help us understand where you are in your journey
          </p>

          <form onSubmit={handleSubmit} className="onboarding-form-step3">
            {/* Primary Founder Section */}
            <div className="founder-section-step3">
              <h3 className="section-title-step3">Primary Founder</h3>
              
              <div className="form-group-step3">
                <label htmlFor="fullName" className="form-label-step3">Full Name</label>
                <input
                  type="text"
                  id="fullName"
                  className="form-input-step3"
                  placeholder="John Doe"
                  value={formData.primaryFounder.fullName}
                  onChange={(e) => handlePrimaryFounderChange('fullName', e.target.value)}
                  required
                />
              </div>

              <div className="form-group-step3">
                <label htmlFor="role" className="form-label-step3">Role</label>
                <input
                  type="text"
                  id="role"
                  className="form-input-step3"
                  placeholder="CEO & Co-Founder"
                  value={formData.primaryFounder.role}
                  onChange={(e) => handlePrimaryFounderChange('role', e.target.value)}
                  required
                />
              </div>

              <div className="form-group-step3">
                <label htmlFor="email" className="form-label-step3">Email</label>
                <input
                  type="email"
                  id="email"
                  className="form-input-step3"
                  placeholder="john@company.com"
                  value={formData.primaryFounder.email}
                  onChange={(e) => handlePrimaryFounderChange('email', e.target.value)}
                  required
                />
              </div>

              <div className="form-group-step3">
                <label htmlFor="linkedinProfile" className="form-label-step3">Linkedin Profile</label>
                <input
                  type="text"
                  id="linkedinProfile"
                  className="form-input-step3"
                  placeholder="linkedin.com/in/johndoe"
                  value={formData.primaryFounder.linkedinProfile}
                  onChange={(e) => handlePrimaryFounderChange('linkedinProfile', e.target.value)}
                  required
                />
              </div>
            </div>

            {/* Co-Founders Section */}
            <div className="cofounder-section-step3">
              <h3 className="section-title-step3">Co-Founders (Optional)</h3>
              
              {formData.coFounders.map((coFounder, index) => (
                <div key={index} className="cofounder-item-step3">
                  <div className="cofounder-header-step3">
                    <h4 className="cofounder-title-step3">Co-Founder {index + 1}</h4>
                    <button
                      type="button"
                      className="remove-cofounder-btn-step3"
                      onClick={() => removeCoFounder(index)}
                    >
                      <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M12 4L4 12M4 4L12 12" stroke="#6B7280" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                    </button>
                  </div>

                  <div className="form-group-step3">
                    <label className="form-label-step3">Full Name</label>
                    <input
                      type="text"
                      className="form-input-step3"
                      placeholder="Jane Smith"
                      value={coFounder.fullName}
                      onChange={(e) => handleCoFounderChange(index, 'fullName', e.target.value)}
                    />
                  </div>

                  <div className="form-group-step3">
                    <label className="form-label-step3">Role</label>
                    <input
                      type="text"
                      className="form-input-step3"
                      placeholder="CTO & Co-Founder"
                      value={coFounder.role}
                      onChange={(e) => handleCoFounderChange(index, 'role', e.target.value)}
                    />
                  </div>

                  <div className="form-group-step3">
                    <label className="form-label-step3">Email</label>
                    <input
                      type="email"
                      className="form-input-step3"
                      placeholder="jane@company.com"
                      value={coFounder.email}
                      onChange={(e) => handleCoFounderChange(index, 'email', e.target.value)}
                    />
                  </div>

                  <div className="form-group-step3">
                    <label className="form-label-step3">Linkedin Profile</label>
                    <input
                      type="text"
                      className="form-input-step3"
                      placeholder="linkedin.com/in/janesmith"
                      value={coFounder.linkedinProfile}
                      onChange={(e) => handleCoFounderChange(index, 'linkedinProfile', e.target.value)}
                    />
                  </div>
                </div>
              ))}

              <button
                type="button"
                className="add-cofounder-btn-step3"
                onClick={addCoFounder}
              >
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M8 3.33334V12.6667M3.33334 8H12.6667" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
                Add Co-Founder
              </button>
            </div>

            <button 
              type="submit" 
              className="btn-continue-step3" 
              disabled={isSubmitting || !isFormValid()}
            >
              {isSubmitting ? 'Processing...' : 'Continue'}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default OnboardingStep3;
