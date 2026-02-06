import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import emireqLogo from '../../assets/emireq-logo.png';
import './OnboardingStep8.css';

const OnboardingStep8 = () => {
  const navigate = useNavigate();
  const [expandedSections, setExpandedSections] = useState({
    step1: true,
    step2: false,
    step3: false,
    step4: false,
    step5: false,
    step6: false,
    step7: false
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Add cursor activity on mount
  useEffect(() => {
    document.body.style.cursor = 'default';
    
    // Add hover effect to interactive elements
    const handleMouseOver = (e) => {
      const target = e.target;
      if (target.tagName === 'BUTTON' || target.classList.contains('clickable') || target.closest('.step-review-header')) {
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

  const toggleSection = (section) => {
    setExpandedSections(prev => ({
      ...prev,
      [section]: !prev[section]
    }));
  };

  const handleEdit = (step) => {
    navigate(`/onboarding/step${step}`);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    setIsSubmitting(true);
    
    // Simulate final submission
    setTimeout(() => {
      setIsSubmitting(false);
      // Navigate to step 9
      navigate('/onboarding/step9');
    }, 2000);
  };

  const handleBack = () => {
    navigate('/onboarding/step7');
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

  const LanguageDropdownIcon = () => (
    <svg width="12" height="8" viewBox="0 0 12 8" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M1 1.5L6 6.5L11 1.5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  );

  const EditIcon = () => (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M11.3333 2.00004C11.5084 1.82494 11.7163 1.68605 11.9451 1.59129C12.1739 1.49653 12.4191 1.44775 12.6667 1.44775C12.9142 1.44775 13.1594 1.49653 13.3882 1.59129C13.617 1.68605 13.8249 1.82494 14 2.00004C14.1751 2.17513 14.314 2.383 14.4088 2.61178C14.5035 2.84055 14.5523 3.08575 14.5523 3.33337C14.5523 3.58099 14.5035 3.82619 14.4088 4.05497C14.314 4.28374 14.1751 4.49161 14 4.66671L5 13.6667L1.33333 14.6667L2.33333 11L11.3333 2.00004Z" 
        stroke="currentColor" 
        strokeWidth="1.5" 
        strokeLinecap="round" 
        strokeLinejoin="round"
      />
    </svg>
  );

  const ChevronIcon = ({ isExpanded }) => (
    <svg 
      width="20" 
      height="20" 
      viewBox="0 0 20 20" 
      fill="none" 
      xmlns="http://www.w3.org/2000/svg"
      style={{ 
        transform: isExpanded ? 'rotate(180deg)' : 'rotate(0deg)',
        transition: 'transform 0.3s ease'
      }}
    >
      <path d="M5 7.5L10 12.5L15 7.5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  );

  const StepIcon = ({ stepKey }) => {
    // Company/Building Icon for Step 1
    if (stepKey === 'step1') {
      return (
        <svg width="48" height="48" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
          <rect width="48" height="48" rx="14" fill="white" fillOpacity="0.9"/>
          <path d="M18 34V16C18 15.4696 18.2107 14.9609 18.5858 14.5858C18.9609 14.2107 19.4696 14 20 14H28C28.5304 14 29.0391 14.2107 29.4142 14.5858C29.7893 14.9609 30 15.4696 30 16V34H18Z" stroke="#364153" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          <path d="M18 24H16C15.4696 24 14.9609 24.2107 14.5858 24.5858C14.2107 24.9609 14 25.4696 14 26V32C14 32.5304 14.2107 33.0391 14.5858 33.4142C14.9609 33.7893 15.4696 34 16 34H18" stroke="#364153" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          <path d="M30 21H32C32.5304 21 33.0391 21.2107 33.4142 21.5858C33.7893 21.9609 34 22.4696 34 23V32C34 32.5304 33.7893 33.0391 33.4142 33.4142C33.0391 33.7893 32.5304 34 32 34H30" stroke="#364153" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          <path d="M22 18H26" stroke="#364153" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          <path d="M22 22H26" stroke="#364153" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          <path d="M22 26H26" stroke="#364153" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          <path d="M22 30H26" stroke="#364153" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      );
    }
    
    // Default Document Icon for other steps
    return (
      <svg width="48" height="48" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect width="48" height="48" rx="14" fill="white" fillOpacity="0.9"/>
        <path d="M26 14H16C15.4477 14 15 14.4477 15 15V33C15 33.5523 15.4477 34 16 34H32C32.5523 34 33 33.5523 33 33V21L26 14Z" 
          stroke="#364153" 
          strokeWidth="2" 
          strokeLinecap="round" 
          strokeLinejoin="round"
        />
        <path d="M26 14V21H33" stroke="#364153" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M20 24H28" stroke="#364153" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M20 28H28" stroke="#364153" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M20 20H24" stroke="#364153" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    );
  };

  const SparkleIcon = () => (
    <svg width="44" height="44" viewBox="0 0 44 44" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect width="44" height="44" rx="22" fill="#121212"/>
      <path d="M19.9365 25.4998C19.8472 25.1537 19.6668 24.8379 19.4141 24.5851C19.1613 24.3324 18.8455 24.152 18.4995 24.0628L12.3645 22.4808C12.2598 22.4511 12.1677 22.388 12.1021 22.3012C12.0365 22.2144 12.001 22.1086 12.001 21.9998C12.001 21.891 12.0365 21.7851 12.1021 21.6983C12.1677 21.6115 12.2598 21.5485 12.3645 21.5188L18.4995 19.9358C18.8454 19.8466 19.1611 19.6663 19.4139 19.4138C19.6666 19.1613 19.847 18.8456 19.9365 18.4998L21.5185 12.3648C21.5479 12.2597 21.6108 12.1671 21.6978 12.1012C21.7847 12.0352 21.8908 11.9995 22 11.9995C22.1091 11.9995 22.2152 12.0352 22.3021 12.1012C22.3891 12.1671 22.452 12.2597 22.4815 12.3648L24.0625 18.4998C24.1517 18.8458 24.3321 19.1617 24.5848 19.4144C24.8376 19.6671 25.1534 19.8475 25.4995 19.9368L31.6345 21.5178C31.74 21.5469 31.833 21.6098 31.8993 21.6968C31.9656 21.7839 32.0015 21.8903 32.0015 21.9998C32.0015 22.1092 31.9656 22.2156 31.8993 22.3027C31.833 22.3898 31.74 22.4527 31.6345 22.4818L25.4995 24.0628C25.1534 24.152 24.8376 24.3324 24.5848 24.5851C24.3321 24.8379 24.1517 25.1537 24.0625 25.4998L22.4805 31.6348C22.451 31.7398 22.3881 31.8324 22.3011 31.8984C22.2142 31.9643 22.1081 32 21.999 32C21.8898 32 21.7837 31.9643 21.6968 31.8984C21.6098 31.8324 21.5469 31.7398 21.5175 31.6348L19.9365 25.4998Z" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
      <path d="M30 13V17" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
      <path d="M32 14.9995H28" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
      <path d="M14 26.9995V28.9995" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
      <path d="M15 28H13" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
    </svg>
  );

  // Get data from localStorage
  const savedData = JSON.parse(localStorage.getItem('onboardingData') || '{}');
  
  const formData = {
    step1: {
      title: "Company Information",
      stepLabel: "Step 1",
      data: [
        { label: "Company Name", value: savedData.step1?.companyName || "Not Provided" },
        { label: "Industry", value: savedData.step1?.industry || "Not Provided" },
        { label: "Founded Date", value: savedData.step1?.foundedDate || "Not Provided" },
        { label: "Website", value: savedData.step1?.website || "Not Provided" },
        { label: "Registration Number", value: savedData.step1?.registrationNumber || "Not Provided" }
      ]
    },
    step2: {
      title: "Team Information",
      stepLabel: "Step 2",
      data: [
        { label: "Team Size", value: "Not Provided" },
        { label: "Founders", value: "Not Provided" },
        { label: "Key Team Members", value: "Not Provided" }
      ]
    },
    step3: {
      title: "Product & Market",
      stepLabel: "Step 3",
      data: [
        { label: "Product Description", value: "Not Provided" },
        { label: "Target Market", value: "Not Provided" },
        { label: "Market Size", value: "Not Provided" },
        { label: "Competitive Advantage", value: "Not Provided" }
      ]
    },
    step4: {
      title: "Financial Information",
      stepLabel: "Step 4",
      data: [
        { label: "Revenue Model", value: "Not Provided" },
        { label: "Current Revenue", value: "Not Provided" },
        { label: "Burn Rate", value: "Not Provided" },
        { label: "Runway", value: "Not Provided" }
      ]
    },
    step5: {
      title: "Funding Details",
      stepLabel: "Step 5",
      data: [
        { label: "Funding Stage", value: "Not Provided" },
        { label: "Amount Seeking", value: "Not Provided" },
        { label: "Previous Funding", value: "Not Provided" },
        { label: "Use of Funds", value: "Not Provided" }
      ]
    },
    step6: {
      title: "Social Impact",
      stepLabel: "Step 6",
      data: [
        { label: "Impact Areas", value: "Not Provided" },
        { label: "SDG Alignment", value: "Not Provided" },
        { label: "Impact Metrics", value: "Not Provided" }
      ]
    },
    step7: {
      title: "Documents",
      stepLabel: "Step 7",
      data: [
        { label: "Pitch Deck", value: "Not Provided" },
        { label: "Business Plan", value: "Not Provided" },
        { label: "Financial Statements", value: "Not Provided" }
      ]
    }
  };

  return (
    <div className="onboarding-container-step8">
      {/* Left Side */}
      <div className="onboarding-left-step8">
        <div className="onboarding-left-header-step8">
          <img src={emireqLogo} alt="Emireq Logo" className="logo-step8" />
          <div className="language-selector-onboarding-step8">
            <span>English(UK)</span>
            <LanguageDropdownIcon />
          </div>
        </div>

        <div className="onboarding-content-step8">
          <div className="trust-badge-onboarding-step8">
            <TrustBadgeIcon />
            <span>Trusted by 50,000+ users worldwide</span>
          </div>

          <h1 className="onboarding-title-step8">
            Get Access to Your Startup Profile and Unlock Exclusive Deals.
          </h1>

          <div className="onboarding-quote-step8">
            <div className="quote-icon-step8">
              <svg width="25" height="20" viewBox="0 0 25 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M21 0C22.0938 0 22.6406 0.21875 22.6406 0.65625C22.6406 0.84375 22.4688 1 22.125 1.125C19.25 2.28125 17.8125 4.53125 17.8125 7.875C18.25 7.8125 18.5625 7.78125 18.75 7.78125C22.5 7.78125 24.375 9.65625 24.375 13.4062C24.375 17.125 22.5 18.9844 18.75 18.9844C14.4062 18.9844 12.2344 16.5938 12.2344 11.8125C12.2344 6.65625 14.3125 2.95312 18.4688 0.703125C19.3438 0.234375 20.1875 0 21 0ZM8.76562 0.140625C9.85938 0.140625 10.4062 0.359375 10.4062 0.796875C10.4062 0.984375 10.2344 1.14062 9.89062 1.26562C7.01562 2.42188 5.57812 4.67188 5.57812 8.01562C6.01562 7.95312 6.32812 7.92188 6.51562 7.92188C10.2656 7.92188 12.1406 9.79688 12.1406 13.5469C12.1406 17.2656 10.2656 19.125 6.51562 19.125C2.17188 19.125 0 16.7344 0 11.9531C0 6.79688 2.07812 3.09375 6.23438 0.84375C7.10938 0.375 7.95312 0.140625 8.76562 0.140625Z" fill="white"/>
              </svg>
            </div>
            <p className="quote-text-step8">
              Your startup profile is complete. Submit now to connect with ethical investors and start your funding journey.
            </p>
          </div>
        </div>
      </div>

      {/* Right Side */}
      <div className="onboarding-right-step8">
        <div className="onboarding-right-header-step8">
          <img src={emireqLogo} alt="Emireq Logo" className="logo-right-step8" />
          <div className="language-selector-onboarding-step8">
            <span>English(UK)</span>
            <LanguageDropdownIcon />
          </div>
        </div>

        <div className="progress-stepper-step8">
          {[1, 2, 3, 4, 5, 6, 7].map((step) => (
            <React.Fragment key={step}>
              <div className="step-circle completed">
                <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                  <path d="M4 10L8 14L16 6" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
              {step < 7 && <div className="step-line completed" />}
            </React.Fragment>
          ))}
          <div className="step-line active" />
          <div className="step-circle active">
            <span>8</span>
          </div>
          <div className="step-line inactive" />
          <div className="step-circle inactive">
            <span>9</span>
          </div>
        </div>

        <form className="onboarding-form-step8" onSubmit={handleSubmit}>
          <div className="form-header-step8">
            <div className="header-icon-step8">
              <SparkleIcon />
            </div>
            <div className="header-text-step8">
              <h2>Review & Submit</h2>
              <p>Almost there review your startup profile before submitting</p>
            </div>
          </div>

          <div className="review-sections-step8">
            {Object.entries(formData).map(([key, section]) => (
              <div key={key} className="step-review-section">
                <div 
                  className="step-review-header"
                  onClick={() => toggleSection(key)}
                >
                  <div className="step-review-header-left">
                    <StepIcon stepKey={key} />
                    <div className="step-review-title">
                      <h3>{section.title}</h3>
                      <span className="step-label">{section.stepLabel}</span>
                    </div>
                  </div>
                  <div className="step-review-header-right">
                    <button
                      type="button"
                      className="edit-button"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleEdit(key.replace('step', ''));
                      }}
                    >
                      <EditIcon />
                      <span>Edit</span>
                    </button>
                    <div className="chevron-wrapper">
                      <ChevronIcon isExpanded={expandedSections[key]} />
                    </div>
                  </div>
                </div>

                {expandedSections[key] && (
                  <div className="step-review-content">
                    {section.data.map((item, index) => (
                      <div key={index} className="review-field">
                        <span className="field-label">{item.label}</span>
                        <span className="field-value">{item.value}</span>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>

          <div className="form-buttons-step8">
            <button
              type="button"
              className="btn-back-step8"
              onClick={handleBack}
              disabled={isSubmitting}
            >
              Back
            </button>
            <button
              type="submit"
              className="btn-submit-step8"
              disabled={isSubmitting}
            >
              {isSubmitting ? 'Submitting...' : 'Submit Profile'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default OnboardingStep8;
