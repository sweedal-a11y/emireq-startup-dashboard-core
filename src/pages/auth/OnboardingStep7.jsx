import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import emireqLogo from '../../assets/emireq-logo.png';
import './OnboardingStep7.css';

const OnboardingStep7 = () => {
  const navigate = useNavigate();
  const [uploadedFiles, setUploadedFiles] = useState([]);
  const [isDragging, setIsDragging] = useState(false);
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

  const handleDragEnter = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(true);
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    e.stopPropagation();
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
    
    const files = Array.from(e.dataTransfer.files);
    handleFiles(files);
  };

  const handleFileInput = (e) => {
    const files = Array.from(e.target.files);
    handleFiles(files);
  };

  const handleFiles = (files) => {
    const validFiles = files.filter(file => {
      const validTypes = ['application/pdf', 'application/vnd.ms-powerpoint', 'application/vnd.openxmlformats-officedocument.presentationml.presentation', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'];
      const maxSize = 10 * 1024 * 1024; // 10MB
      return validTypes.includes(file.type) && file.size <= maxSize;
    });
    
    setUploadedFiles(prev => [...prev, ...validFiles]);
  };

  const handleBrowseClick = () => {
    document.getElementById('file-input-step7').click();
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    setIsSubmitting(true);
    
    // Simulate form submission
    setTimeout(() => {
      setIsSubmitting(false);
      // Navigate to overview
      navigate('/overview');
    }, 1500);
  };

  const handleBack = () => {
    navigate('/onboarding/step6');
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
    <div className="onboarding-container-step7">
      {/* Left Side - Branding */}
      <div className="onboarding-left-step7">
        <div className="onboarding-left-header-step7">
          <div className="trust-badge-onboarding-step7">
            <TrustBadgeIcon />
            <span>Trusted by 50,000+ users worldwide</span>
          </div>

          <div className="language-selector-onboarding-step7">
            <span>English(UK)</span>
            <svg width="12" height="8" viewBox="0 0 12 8" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M1 1L6 6L11 1" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </div>
        </div>

        <div className="onboarding-content-step7">
          <div className="step-badge-step7">
            Step 7 of 9
          </div>

          <h1 className="onboarding-title-step7">Professional Documentation</h1>

          <div className="quote-icon-onboarding-step7">
            <svg width="25" height="20" viewBox="0 0 25 20" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M21 0C22.0938 0 22.6406 0.21875 22.6406 0.65625C22.6406 0.84375 22.4688 1 22.125 1.125C19.25 2.28125 17.8125 4.53125 17.8125 7.875C18.25 7.8125 18.5625 7.78125 18.75 7.78125C22.5 7.78125 24.375 9.65625 24.375 13.4062C24.375 17.125 22.5 18.9844 18.75 18.9844C14.4062 18.9844 12.2344 16.5938 12.2344 11.8125C12.2344 6.65625 14.3125 2.95312 18.4688 0.703125C19.3438 0.234375 20.1875 0 21 0ZM8.76562 0.140625C9.85938 0.140625 10.4062 0.359375 10.4062 0.796875C10.4062 0.984375 10.2344 1.14062 9.89062 1.26562C7.01562 2.42188 5.57812 4.67188 5.57812 8.01562C6.01562 7.95312 6.32812 7.92188 6.51562 7.92188C10.2656 7.92188 12.1406 9.79688 12.1406 13.5469C12.1406 17.2656 10.2656 19.125 6.51562 19.125C2.17188 19.125 0 16.7344 0 11.9531C0 6.79688 2.07812 3.09375 6.23438 0.84375C7.10938 0.375 7.95312 0.140625 8.76562 0.140625Z" fill="#CBDBFC"/>
            </svg>
          </div>

          <p className="onboarding-description-step7">
            Quality documents demonstrate professionalism and help investors make informed decisions.
          </p>

          <div className="onboarding-features-step7">
            <div className="onboarding-feature-item-step7">
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M16.6667 5L7.50004 14.1667L3.33337 10" stroke="#FFC300" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
              <span>Stand out to investors</span>
            </div>
            <div className="onboarding-feature-item-step7">
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M16.6667 5L7.50004 14.1667L3.33337 10" stroke="#FFC300" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
              <span>Faster due diligence</span>
            </div>
            <div className="onboarding-feature-item-step7">
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M16.6667 5L7.50004 14.1667L3.33337 10" stroke="#FFC300" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
              <span>higher conversion rates</span>
            </div>
            <div className="onboarding-feature-item-step7">
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M16.6667 5L7.50004 14.1667L3.33337 10" stroke="#FFC300" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
              <span>Professional image</span>
            </div>
          </div>
        </div>
      </div>

      {/* Right Side - Form */}
      <div className="onboarding-right-step7">
        <div className="onboarding-right-header-step7">
          <img src={emireqLogo} alt="Emireq Logo" className="onboarding-logo-step7" />
          
          <div className="language-selector-right-step7">
            <span>English(UK)</span>
            <svg width="12" height="8" viewBox="0 0 12 8" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M1 1L6 6L11 1" stroke="#6B7280" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </div>
        </div>

        <div className="progress-stepper-step7">
          {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((step) => (
            <React.Fragment key={step}>
              <div className={`progress-step-step7 ${step === 7 ? 'active' : ''} ${step <= 6 ? 'completed' : ''}`}>
                {step <= 6 ? (
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M13.3334 4L6.00008 11.3333L2.66675 8" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                ) : (
                  step
                )}
              </div>
              {step < 9 && <div className="progress-line-step7"></div>}
            </React.Fragment>
          ))}
        </div>

        <div className="onboarding-form-section-step7">
          <div className="form-header-step7">
            <div className="form-icon-step7">
              <svg width="44" height="44" viewBox="0 0 44 44" fill="none" xmlns="http://www.w3.org/2000/svg">
                <rect width="44" height="44" rx="22" fill="#121212"/>
                <path d="M22 13V25" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M27 18L22 13L17 18" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M31 25V29C31 29.5304 30.7893 30.0391 30.4142 30.4142C30.0391 30.7893 29.5304 31 29 31H15C14.4696 31 13.9609 30.7893 13.5858 30.4142C13.2107 30.0391 13 29.5304 13 29V25" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>
            <h2 className="form-title-step7">Upload Documents</h2>
          </div>

          <p className="form-subtitle-step7">
            Add your pitch deck and supporting documents
          </p>

          <form onSubmit={handleSubmit} className="onboarding-form-step7">
            <div className="form-group-step7">
              <label className="form-label-step7">Documents (Optional)</label>
              
              <div 
                className={`upload-area-step7 ${isDragging ? 'dragging' : ''}`}
                onDragEnter={handleDragEnter}
                onDragOver={handleDragOver}
                onDragLeave={handleDragLeave}
                onDrop={handleDrop}
              >
                <div className="upload-icon-step7">
                  <svg width="80" height="80" viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <circle cx="40" cy="40" r="40" fill="#F3E8FF"/>
                    <path d="M45 28H32C30.8954 28 30 28.8954 30 30V50C30 51.1046 30.8954 52 32 52H48C49.1046 52 50 51.1046 50 50V35L45 28Z" stroke="#9333EA" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    <path d="M45 28V35H50" stroke="#9333EA" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    <path d="M42 38H36" stroke="#9333EA" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    <path d="M44 44H36" stroke="#9333EA" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    <path d="M38 32H36" stroke="#9333EA" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </div>
                <div className="upload-text-step7">
                  <span className="upload-main-text-step7">
                    Drag and drop files here, or <button type="button" className="browse-button-step7" onClick={handleBrowseClick}>browse</button>
                  </span>
                  <span className="upload-sub-text-step7">PDF,PPT,DOC(max 10MB per file)</span>
                </div>
                <input 
                  type="file" 
                  id="file-input-step7" 
                  multiple 
                  accept=".pdf,.ppt,.pptx,.doc,.docx"
                  onChange={handleFileInput}
                  style={{ display: 'none' }}
                />
              </div>

              <div className="recommended-docs-step7">
                <p className="recommended-title-step7">Recommended documents:</p>
                <ul className="recommended-list-step7">
                  <li>Pitch Deck</li>
                  <li>Business Plan</li>
                  <li>Financial Projections</li>
                  <li>Company Registration</li>
                </ul>
              </div>
            </div>

            <div className="info-box-step7">
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M10 18C14.4183 18 18 14.4183 18 10C18 5.58172 14.4183 2 10 2C5.58172 2 2 5.58172 2 10C2 14.4183 5.58172 18 10 18Z" stroke="#3B82F6" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M10 14V10" stroke="#3B82F6" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M10 6H10.01" stroke="#3B82F6" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
              <p className="info-text-step7">
                A well-prepared pitch deck significantly increases your chances of securing funding.
              </p>
            </div>

            <div className="form-actions-step7">
              <button 
                type="button" 
                className="btn-back-step7"
                onClick={handleBack}
              >
                <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M12.5 15L7.5 10L12.5 5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
                Back
              </button>
              <button 
                type="submit" 
                className="btn-continue-step7"
                disabled={isSubmitting}
              >
                {isSubmitting ? 'Processing...' : 'Continue'}
                <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M7.5 15L12.5 10L7.5 5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default OnboardingStep7;
