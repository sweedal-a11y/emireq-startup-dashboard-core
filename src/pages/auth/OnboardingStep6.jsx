import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import emireqLogo from '../../assets/emireq-logo.png';
import './OnboardingStep6.css';

const OnboardingStep6 = () => {
  const navigate = useNavigate();
  const [currentView, setCurrentView] = useState('compliance'); // 'compliance' or 'areas'
  const [formData, setFormData] = useState({
    shariahCompliance: '',
    complianceAreas: {
      interestFree: false,
      halalProducts: false,
      ethicalPractices: false
    }
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Add cursor activity on mount
  useEffect(() => {
    document.body.style.cursor = 'default';
    
    // Add hover effect to interactive elements
    const handleMouseOver = (e) => {
      const target = e.target;
      if (target.tagName === 'BUTTON' || target.tagName === 'INPUT' || target.tagName === 'TEXTAREA' || target.tagName === 'SELECT' || target.tagName === 'LABEL' || target.classList.contains('clickable')) {
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

  const handleComplianceChange = (value) => {
    setFormData(prev => ({
      ...prev,
      shariahCompliance: value
    }));
  };

  const handleAreaChange = (area) => {
    setFormData(prev => ({
      ...prev,
      complianceAreas: {
        ...prev.complianceAreas,
        [area]: !prev.complianceAreas[area]
      }
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (currentView === 'compliance') {
      // Validate first view field is filled
      if (!formData.shariahCompliance) {
        return;
      }
      // Move to compliance areas view
      setCurrentView('areas');
      return;
    }
    
    // Final submission from compliance areas view
    setIsSubmitting(true);
    
    // Simulate form submission
    setTimeout(() => {
      setIsSubmitting(false);
      // Navigate to step 7
      navigate('/onboarding/step7');
    }, 1500);
  };

  const handleBack = () => {
    if (currentView === 'areas') {
      // Go back to first view
      setCurrentView('compliance');
    } else {
      // Go back to step 5
      navigate('/onboarding/step5');
    }
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
    return formData.shariahCompliance !== '';
  };

  return (
    <div className="onboarding-container-step6">
      {/* Left Side - Branding */}
      <div className="onboarding-left-step6">
        <div className="onboarding-left-header-step6">
          <div className="trust-badge-onboarding-step6">
            <TrustBadgeIcon />
            <span>Trusted by 50,000+ users worldwide</span>
          </div>

          <div className="language-selector-onboarding-step6">
            <span>English(UK)</span>
            <svg width="12" height="8" viewBox="0 0 12 8" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M1 1L6 6L11 1" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </div>
        </div>

        <div className="onboarding-content-step6">
          <div className="step-badge-step6">
            Step 6 of 9
          </div>

          <h1 className="onboarding-title-step6">Build Trust Through Compliance</h1>

          <div className="quote-icon-onboarding-step6">
            <svg width="25" height="20" viewBox="0 0 25 20" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M21 0C22.0938 0 22.6406 0.21875 22.6406 0.65625C22.6406 0.84375 22.4688 1 22.125 1.125C19.25 2.28125 17.8125 4.53125 17.8125 7.875C18.25 7.8125 18.5625 7.78125 18.75 7.78125C22.5 7.78125 24.375 9.65625 24.375 13.4062C24.375 17.125 22.5 18.9844 18.75 18.9844C14.4062 18.9844 12.2344 16.5938 12.2344 11.8125C12.2344 6.65625 14.3125 2.95312 18.4688 0.703125C19.3438 0.234375 20.1875 0 21 0ZM8.76562 0.140625C9.85938 0.140625 10.4062 0.359375 10.4062 0.796875C10.4062 0.984375 10.2344 1.14062 9.89062 1.26562C7.01562 2.42188 5.57812 4.67188 5.57812 8.01562C6.01562 7.95312 6.32812 7.92188 6.51562 7.92188C10.2656 7.92188 12.1406 9.79688 12.1406 13.5469C12.1406 17.2656 10.2656 19.125 6.51562 19.125C2.17188 19.125 0 16.7344 0 11.9531C0 6.79688 2.07812 3.09375 6.23438 0.84375C7.10938 0.375 7.95312 0.140625 8.76562 0.140625Z" fill="#CBDBFC"/>
            </svg>
          </div>

          <p className="onboarding-description-step6">
            Shariah compliance opens doors to ethical investors and islamic finance markets worldwide
          </p>

          <div className="onboarding-features-step6">
            <div className="onboarding-feature-item-step6">
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M16.6667 5L7.50004 14.1667L3.33337 10" stroke="#FFC300" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
              <span>Access to ethical capital</span>
            </div>
            <div className="onboarding-feature-item-step6">
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M16.6667 5L7.50004 14.1667L3.33337 10" stroke="#FFC300" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
              <span>Global Islamic Market</span>
            </div>
            <div className="onboarding-feature-item-step6">
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M16.6667 5L7.50004 14.1667L3.33337 10" stroke="#FFC300" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
              <span>Trusted by investors</span>
            </div>
            <div className="onboarding-feature-item-step6">
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M16.6667 5L7.50004 14.1667L3.33337 10" stroke="#FFC300" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
              <span>Transparent operations</span>
            </div>
          </div>
        </div>
      </div>

      {/* Right Side - Form */}
      <div className="onboarding-right-step6">
        <div className="onboarding-right-header-step6">
          <img src={emireqLogo} alt="Emireq Logo" className="onboarding-logo-step6" />
          
          <div className="language-selector-right-step6">
            <span>English(UK)</span>
            <svg width="12" height="8" viewBox="0 0 12 8" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M1 1L6 6L11 1" stroke="#6B7280" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </div>
        </div>

        <div className="progress-stepper-step6">
          {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((step) => (
            <React.Fragment key={step}>
              <div className={`progress-step-step6 ${step === 6 ? 'active' : ''} ${step < 6 ? 'completed' : ''}`}>
                {step < 6 ? (
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M13.3334 4L6.00008 11.3333L2.66675 8" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                ) : (
                  step
                )}
              </div>
              {step < 9 && <div className="progress-line-step6"></div>}
            </React.Fragment>
          ))}
        </div>

        <div className="onboarding-form-section-step6">
          <div className="form-header-step6">
            <div className="form-icon-step6">
             <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M20 13C20 18 16.5 20.5 12.34 21.95C12.1222 22.0238 11.8855 22.0203 11.67 21.94C7.5 20.5 4 18 4 13V5.99999C4 5.73478 4.10536 5.48042 4.29289 5.29289C4.48043 5.10535 4.73478 4.99999 5 4.99999C7 4.99999 9.5 3.79999 11.24 2.27999C11.4519 2.09899 11.7214 1.99954 12 1.99954C12.2786 1.99954 12.5481 2.09899 12.76 2.27999C14.51 3.80999 17 4.99999 19 4.99999C19.2652 4.99999 19.5196 5.10535 19.7071 5.29289C19.8946 5.48042 20 5.73478 20 5.99999V13Z" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
</svg>

            </div>
            <h2 className="form-title-step6">Shariah Compliance</h2>
          </div>

          <p className="form-subtitle-step6">
            Verify yor business adheres to islamic finance principles
          </p>

          {currentView === 'compliance' ? (
            <form onSubmit={handleSubmit} className="onboarding-form-step6">
              <div className="form-group-step6">
                <label className="form-label-step6">Is your business Shariah compliant?</label>
                <div className="radio-group-step6">
                  <div 
                    className={`radio-option-step6 ${formData.shariahCompliance === 'yes' ? 'selected' : ''}`}
                    onClick={() => handleComplianceChange('yes')}
                  >
                    <div className="radio-button-step6">
                      {formData.shariahCompliance === 'yes' && (
                        <svg width="12" height="10" viewBox="0 0 12 10" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path d="M10.6667 1.5L4 8.16667L1.33334 5.5" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                      )}
                    </div>
                    <div className="radio-label-step6">
                      <span className="option-title-step6">Yes, we are Shariah compliant</span>
                      <span className="option-description-step6">Our business follows islamic finance principles</span>
                    </div>
                  </div>

                  <div 
                    className={`radio-option-step6 ${formData.shariahCompliance === 'working' ? 'selected' : ''}`}
                    onClick={() => handleComplianceChange('working')}
                  >
                    <div className="radio-button-step6">
                      {formData.shariahCompliance === 'working' && (
                        <svg width="12" height="10" viewBox="0 0 12 10" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path d="M10.6667 1.5L4 8.16667L1.33334 5.5" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                      )}
                    </div>
                    <div className="radio-label-step6">
                      <span className="option-title-step6">Working towards compliance</span>
                      <span className="option-description-step6">We're in the process of becoming compliant</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="info-box-step6">
                <div className="info-icon-step6">
                  <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M10 17.5C14.1421 17.5 17.5 14.1421 17.5 10C17.5 5.85786 14.1421 2.5 10 2.5C5.85786 2.5 2.5 5.85786 2.5 10C2.5 14.1421 5.85786 17.5 10 17.5Z" stroke="#10B981" strokeWidth="1.66667" strokeLinecap="round" strokeLinejoin="round"/>
                    <path d="M10 13.3333V10" stroke="#10B981" strokeWidth="1.66667" strokeLinecap="round" strokeLinejoin="round"/>
                    <path d="M10 6.66666H10.0083" stroke="#10B981" strokeWidth="1.66667" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </div>
                <div className="info-content-step6">
                  <h3 className="info-title-step6">Why Shariah Compliance Matters</h3>
                  <p className="info-text-step6">
                    Shariah-compliant businesses attract ethical investors and access Islamic finance markets worth trillions of dollars globally.
                  </p>
                </div>
              </div>

              <div className="form-actions-step6">
                <button 
                  type="button" 
                  className="btn-back-step6"
                  onClick={handleBack}
                >
                  <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M12.5 15L7.5 10L12.5 5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                  Back
                </button>
                <button 
                  type="submit" 
                  className="btn-continue-step6" 
                  disabled={isSubmitting || !isFormValid()}
                >
                  {isSubmitting ? 'Processing...' : 'Continue'}
                  <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M7.5 15L12.5 10L7.5 5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </button>
              </div>
            </form>
          ) : (
            <form onSubmit={handleSubmit} className="onboarding-form-step6">
              <div className="form-group-step6">
                <label className="form-label-step6">Compliance Areas</label>
                <div className="checkbox-group-step6">
                  <div 
                    className={`checkbox-option-step6 ${formData.complianceAreas.interestFree ? 'selected' : ''}`}
                    onClick={() => handleAreaChange('interestFree')}
                  >
                    <div className="checkbox-box-step6">
                      {formData.complianceAreas.interestFree && (
                        <svg width="12" height="10" viewBox="0 0 12 10" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path d="M10.6667 1.5L4 8.16667L1.33334 5.5" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                      )}
                    </div>
                    <span className="checkbox-label-step6">Interest-free operations</span>
                  </div>

                  <div 
                    className={`checkbox-option-step6 ${formData.complianceAreas.halalProducts ? 'selected' : ''}`}
                    onClick={() => handleAreaChange('halalProducts')}
                  >
                    <div className="checkbox-box-step6">
                      {formData.complianceAreas.halalProducts && (
                        <svg width="12" height="10" viewBox="0 0 12 10" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path d="M10.6667 1.5L4 8.16667L1.33334 5.5" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                      )}
                    </div>
                    <span className="checkbox-label-step6">Halal products services</span>
                  </div>

                  <div 
                    className={`checkbox-option-step6 ${formData.complianceAreas.ethicalPractices ? 'selected' : ''}`}
                    onClick={() => handleAreaChange('ethicalPractices')}
                  >
                    <div className="checkbox-box-step6">
                      {formData.complianceAreas.ethicalPractices && (
                        <svg width="12" height="10" viewBox="0 0 12 10" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path d="M10.6667 1.5L4 8.16667L1.33334 5.5" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                      )}
                    </div>
                    <span className="checkbox-label-step6">Ethical business practices</span>
                  </div>
                </div>
              </div>

              <div className="form-actions-step6">
                <button 
                  type="button" 
                  className="btn-back-step6"
                  onClick={handleBack}
                >
                  <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M12.5 15L7.5 10L12.5 5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                  Back
                </button>
                <button 
                  type="submit" 
                  className="btn-continue-step6"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? 'Processing...' : 'Continue'}
                  <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M7.5 15L12.5 10L7.5 5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};

export default OnboardingStep6;
