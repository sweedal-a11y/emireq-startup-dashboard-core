import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import emireqLogo from '../../assets/emireq-logo.png';
import './OnboardingStep2.css';

const OnboardingStep2 = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    companyStage: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

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

  const handleStageSelect = (stage) => {
    setFormData(prev => ({
      ...prev,
      companyStage: stage
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.companyStage) {
      return;
    }
    
    setIsSubmitting(true);
    
    // Simulate form submission
    setTimeout(() => {
      setIsSubmitting(false);
      // Navigate to step 3
      navigate('/onboarding/step3');
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

  const stages = [
    {
      id: 'ideal',
      title: 'Ideal Stage',
      description: 'Concept development phase'
    },
    {
      id: 'mvp',
      title: 'MVP/Prototype',
      description: 'Building minimum viable product'
    },
    {
      id: 'early',
      title: 'Early Revenue',
      description: 'Initial sales and traction'
    },
    {
      id: 'growth',
      title: 'Growth Stage',
      description: 'Scaling the business'
    },
    {
      id: 'expansion',
      title: 'Expansion',
      description: 'Market expansion and maturity'
    }
  ];

  return (
    <div className="onboarding-container-step2">
      {/* Left Side - Branding */}
      <div className="onboarding-left-step2">
        <div className="onboarding-left-header-step2">
          <div className="trust-badge-onboarding-step2">
            <TrustBadgeIcon />
            <span>Trusted by 50,000+ users worldwide</span>
          </div>

          <div className="language-selector-onboarding-step2">
            <span>English(UK)</span>
            <svg width="12" height="8" viewBox="0 0 12 8" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M1 1L6 6L11 1" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </div>
        </div>

        <div className="onboarding-content-step2">
          <div className="step-badge-step2">
            Step 2 of 9
          </div>

          <h1 className="onboarding-title-step2">Your Journey Matters</h1>

          <div className="quote-icon-onboarding-step2">
            <svg width="25" height="20" viewBox="0 0 25 20" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M21 0C22.0938 0 22.6406 0.21875 22.6406 0.65625C22.6406 0.84375 22.4688 1 22.125 1.125C19.25 2.28125 17.8125 4.53125 17.8125 7.875C18.25 7.8125 18.5625 7.78125 18.75 7.78125C22.5 7.78125 24.375 9.65625 24.375 13.4062C24.375 17.125 22.5 18.9844 18.75 18.9844C14.4062 18.9844 12.2344 16.5938 12.2344 11.8125C12.2344 6.65625 14.3125 2.95312 18.4688 0.703125C19.3438 0.234375 20.1875 0 21 0ZM8.76562 0.140625C9.85938 0.140625 10.4062 0.359375 10.4062 0.796875C10.4062 0.984375 10.2344 1.14062 9.89062 1.26562C7.01562 2.42188 5.57812 4.67188 5.57812 8.01562C6.01562 7.95312 6.32812 7.92188 6.51562 7.92188C10.2656 7.92188 12.1406 9.79688 12.1406 13.5469C12.1406 17.2656 10.2656 19.125 6.51562 19.125C2.17188 19.125 0 16.7344 0 11.9531C0 6.79688 2.07812 3.09375 6.23438 0.84375C7.10938 0.375 7.95312 0.140625 8.76562 0.140625Z" fill="#CBDBFC"/>
</svg>

          </div>

          <p className="onboarding-description-step2">
            Understanding your current stage helps us match you with the right investors and resources tailored to your needs.
          </p>

          <div className="onboarding-features-step2">
            <div className="onboarding-feature-item-step2">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M0 12C0 5.37258 5.37258 0 12 0C18.6274 0 24 5.37258 24 12C24 18.6274 18.6274 24 12 24C5.37258 24 0 18.6274 0 12Z" fill="#FFC300" fillOpacity="0.2"/>
                <path d="M8 12C8 9.79086 9.79086 8 12 8C14.2091 8 16 9.79086 16 12C16 14.2091 14.2091 16 12 16C9.79086 16 8 14.2091 8 12Z" fill="#FFC300"/>
              </svg>
              <span>Stage-appropriate funding</span>
            </div>
            <div className="onboarding-feature-item-step2">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M0 12C0 5.37258 5.37258 0 12 0C18.6274 0 24 5.37258 24 12C24 18.6274 18.6274 24 12 24C5.37258 24 0 18.6274 0 12Z" fill="#FFC300" fillOpacity="0.2"/>
                <path d="M8 12C8 9.79086 9.79086 8 12 8C14.2091 8 16 9.79086 16 12C16 14.2091 14.2091 16 12 16C9.79086 16 8 14.2091 8 12Z" fill="#FFC300"/>
              </svg>
              <span>Relevant investor matching</span>
            </div>
            <div className="onboarding-feature-item-step2">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M0 12C0 5.37258 5.37258 0 12 0C18.6274 0 24 5.37258 24 12C24 18.6274 18.6274 24 12 24C5.37258 24 0 18.6274 0 12Z" fill="#FFC300" fillOpacity="0.2"/>
                <path d="M8 12C8 9.79086 9.79086 8 12 8C14.2091 8 16 9.79086 16 12C16 14.2091 14.2091 16 12 16C9.79086 16 8 14.2091 8 12Z" fill="#FFC300"/>
              </svg>
              <span>Customized support</span>
            </div>
            <div className="onboarding-feature-item-step2">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M0 12C0 5.37258 5.37258 0 12 0C18.6274 0 24 5.37258 24 12C24 18.6274 18.6274 24 12 24C5.37258 24 0 18.6274 0 12Z" fill="#FFC300" fillOpacity="0.2"/>
                <path d="M8 12C8 9.79086 9.79086 8 12 8C14.2091 8 16 9.79086 16 12C16 14.2091 14.2091 16 12 16C9.79086 16 8 14.2091 8 12Z" fill="#FFC300"/>
              </svg>
              <span>Better valuations</span>
            </div>
          </div>
        </div>
      </div>

      {/* Right Side - Form */}
      <div className="onboarding-right-step2">
        <div className="onboarding-right-header-step2">
          <img src={emireqLogo} alt="Emireq Logo" className="onboarding-logo-step2" />
          
          <div className="language-selector-right-step2">
            <span>English(UK)</span>
            <svg width="12" height="8" viewBox="0 0 12 8" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M1 1L6 6L11 1" stroke="#6B7280" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </div>
        </div>

        <div className="progress-stepper-step2">
          {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((step) => (
            <React.Fragment key={step}>
              <div className={`progress-step-step2 ${step === 2 ? 'active' : ''} ${step < 2 ? 'completed' : ''}`}>
                {step < 2 ? (
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M13.3334 4L6.00008 11.3333L2.66675 8" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                ) : (
                  step
                )}
              </div>
              {step < 9 && <div className="progress-line-step2"></div>}
            </React.Fragment>
          ))}
        </div>

        <div className="onboarding-form-section-step2">
          <div className="form-header-step2">
            <div className="form-icon-step2">
             <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M3.00008 10.9996C2.00008 11.8396 1.66675 14.3329 1.66675 14.3329C1.66675 14.3329 4.16008 13.9996 5.00008 12.9996C5.47341 12.4396 5.46675 11.5796 4.94008 11.0596C4.68095 10.8122 4.33961 10.6693 3.98157 10.6583C3.62352 10.6472 3.274 10.7687 3.00008 10.9996Z" stroke="white" stroke-width="1.33333" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M8 10.0002L6 8.00018C6.35476 7.0798 6.80147 6.19755 7.33333 5.36684C8.11012 4.12483 9.19175 3.10221 10.4753 2.39624C11.7589 1.69026 13.2018 1.32442 14.6667 1.33351C14.6667 3.14684 14.1467 6.33351 10.6667 8.66684C9.82459 9.19932 8.93123 9.646 8 10.0002Z" stroke="white" stroke-width="1.33333" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M6.00008 7.9997H2.66675C2.66675 7.9997 3.03341 5.9797 4.00008 5.33303C5.08008 4.61303 7.33341 5.33303 7.33341 5.33303" stroke="white" stroke-width="1.33333" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M8 9.99999V13.3333C8 13.3333 10.02 12.9667 10.6667 12C11.3867 10.92 10.6667 8.66666 10.6667 8.66666" stroke="white" stroke-width="1.33333" stroke-linecap="round" stroke-linejoin="round"/>
</svg>

            </div>
            <h2 className="form-title-step2">Company Stage & Type</h2>
          </div>

          <p className="form-subtitle-step2">
            Help us understand where you are in your journey
          </p>

          <form onSubmit={handleSubmit} className="onboarding-form-step2">
            <div className="stage-question-step2">
              <label className="stage-label-step2">What stage is your company at?</label>
              
              <div className="stage-options-step2">
                {stages.map((stage) => (
                  <label 
                    key={stage.id}
                    className={`stage-option-step2 ${formData.companyStage === stage.id ? 'selected' : ''}`}
                  >
                    <input
                      type="radio"
                      name="companyStage"
                      value={stage.id}
                      checked={formData.companyStage === stage.id}
                      onChange={() => handleStageSelect(stage.id)}
                    />
                    <div className="stage-option-content-step2">
                      <div className="stage-option-header-step2">
                        <div className="stage-radio-step2">
                          {formData.companyStage === stage.id && (
                            <div className="stage-radio-inner-step2"></div>
                          )}
                        </div>
                        <div className="stage-option-text-step2">
                          <h3 className="stage-title-step2">{stage.title}</h3>
                          <p className="stage-description-step2">{stage.description}</p>
                        </div>
                      </div>
                    </div>
                  </label>
                ))}
              </div>
            </div>

            <button 
              type="submit" 
              className="btn-continue-step2" 
              disabled={isSubmitting || !formData.companyStage}
            >
              {isSubmitting ? 'Processing...' : 'Continue'}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default OnboardingStep2;
