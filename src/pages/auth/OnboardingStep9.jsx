import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import emireqLogo from '../../assets/emireq-logo.png';
import dashboardPreview from '../../assets/step9.png';
import './OnboardingStep9.css';

const OnboardingStep9 = () => {
  const navigate = useNavigate();

  // Add cursor activity on mount
  useEffect(() => {
    document.body.style.cursor = 'default';
    
    // Add hover effect to interactive elements
    const handleMouseOver = (e) => {
      const target = e.target;
      if (target.tagName === 'BUTTON' || target.classList.contains('clickable') || 
          target.closest('button') || target.closest('.clickable')) {
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

  const CheckmarkIcon = () => (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M20 6L9 17L4 12" stroke="white" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  );

  const RocketIcon = () => (
 <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M4.5 16.5C3 17.76 2.5 21.5 2.5 21.5C2.5 21.5 6.24 21 7.5 19.5C8.21 18.66 8.2 17.37 7.41 16.59C7.02131 16.219 6.50929 16.0047 5.97223 15.988C5.43516 15.9714 4.91088 16.1538 4.5 16.5Z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M12 15L9 12C9.53214 10.6194 10.2022 9.29607 11 8.05C12.1652 6.18699 13.7876 4.65305 15.713 3.5941C17.6384 2.53514 19.8027 1.98637 22 2C22 4.72 21.22 9.5 16 13C14.7369 13.7987 13.3968 14.4687 12 15Z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M9 12H4C4 12 4.55 8.97002 6 8.00002C7.62 6.92002 11 8.00002 11 8.00002" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M12 15V20C12 20 15.03 19.45 16 18C17.08 16.38 16 13 16 13" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
</svg>


  );

  const BuildingIcon = () => (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M3.33333 16.6667H16.6667M5 16.6667V5.83333C5 5.61232 5.0878 5.40036 5.24408 5.24408C5.40036 5.0878 5.61232 5 5.83333 5H10.8333C11.0543 5 11.2663 5.0878 11.4226 5.24408C11.5789 5.40036 11.6667 5.61232 11.6667 5.83333V16.6667M15 16.6667V10.8333C15 10.6123 14.9122 10.4004 14.7559 10.2441C14.5996 10.0878 14.3877 10 14.1667 10H11.6667M7.5 8.33333H8.33333M7.5 11.6667H8.33333M7.5 15H8.33333" stroke="#1F2937" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  );

  const EmailIcon = () => (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M3.33333 5.83333H16.6667C17.5833 5.83333 18.3333 6.58333 18.3333 7.5V15.8333C18.3333 16.75 17.5833 17.5 16.6667 17.5H3.33333C2.41667 17.5 1.66667 16.75 1.66667 15.8333V7.5C1.66667 6.58333 2.41667 5.83333 3.33333 5.83333Z" stroke="#1F2937" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M18.3333 7.5L10 12.5L1.66667 7.5" stroke="#1F2937" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  );

  const TrendingUpIcon = () => (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M15.8333 5.83333L10.4167 11.25L7.08333 7.91667L1.66667 13.3333" stroke="#1F2937" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M11.6667 5.83333H15.8333V10" stroke="#1F2937" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  );

  const DollarIcon = () => (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M10 1.66667V18.3333" stroke="#1F2937" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M14.1667 4.16667H7.91667C7.14312 4.16667 6.40125 4.47396 5.85427 5.02094C5.30729 5.56792 5 6.30978 5 7.08333C5 7.85688 5.30729 8.59875 5.85427 9.14573C6.40125 9.69271 7.14312 10 7.91667 10H12.0833C12.8569 10 13.5987 10.3073 14.1457 10.8543C14.6927 11.4013 15 12.1431 15 12.9167C15 13.6902 14.6927 14.4321 14.1457 14.9791C13.5987 15.526 12.8569 15.8333 12.0833 15.8333H5" stroke="#1F2937" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  );

  const LocationIcon = () => (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M17.5 8.33333C17.5 14.1667 10 19.1667 10 19.1667C10 19.1667 2.5 14.1667 2.5 8.33333C2.5 6.34421 3.29018 4.4366 4.6967 3.03007C6.10322 1.62355 8.01088 0.833336 10 0.833336C11.9891 0.833336 13.8968 1.62355 15.3033 3.03007C16.7098 4.4366 17.5 6.34421 17.5 8.33333Z" stroke="#1F2937" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M10 10.8333C11.3807 10.8333 12.5 9.71405 12.5 8.33333C12.5 6.95262 11.3807 5.83333 10 5.83333C8.61929 5.83333 7.5 6.95262 7.5 8.33333C7.5 9.71405 8.61929 10.8333 10 10.8333Z" stroke="#1F2937" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  );

  const StarIcon = () => (
    <svg width="17" height="17" viewBox="0 0 17 17" fill="none" xmlns="http://www.w3.org/2000/svg">
<g clip-path="url(#clip0_115_15034)">
<path d="M8.05827 1.6048C8.08891 1.54289 8.13625 1.49077 8.19494 1.45433C8.25363 1.4179 8.32134 1.39859 8.39042 1.39859C8.4595 1.39859 8.52721 1.4179 8.5859 1.45433C8.64459 1.49077 8.69193 1.54289 8.72257 1.6048L10.3379 4.87667C10.4443 5.09202 10.6014 5.27834 10.7956 5.41962C10.9899 5.56091 11.2155 5.65294 11.4532 5.68782L15.0656 6.21647C15.1341 6.22639 15.1984 6.25526 15.2513 6.29982C15.3042 6.34438 15.3435 6.40286 15.3649 6.46863C15.3863 6.5344 15.3889 6.60485 15.3723 6.672C15.3558 6.73915 15.3207 6.80032 15.2712 6.84861L12.6587 9.39254C12.4865 9.56044 12.3576 9.76769 12.2831 9.99645C12.2087 10.2252 12.191 10.4686 12.2315 10.7058L12.8483 14.3C12.8603 14.3684 12.8529 14.4389 12.8269 14.5033C12.8009 14.5677 12.7573 14.6235 12.7011 14.6643C12.6449 14.7051 12.5783 14.7294 12.509 14.7342C12.4397 14.739 12.3704 14.7242 12.3091 14.6916L9.0799 12.9938C8.86712 12.882 8.63039 12.8237 8.39007 12.8237C8.14975 12.8237 7.91302 12.882 7.70024 12.9938L4.47172 14.6916C4.41042 14.724 4.34124 14.7386 4.27205 14.7337C4.20286 14.7288 4.13644 14.7046 4.08034 14.6638C4.02424 14.623 3.98072 14.5673 3.95472 14.5029C3.92873 14.4386 3.9213 14.3683 3.93329 14.3L4.54934 10.7065C4.59004 10.4692 4.57241 10.2256 4.49797 9.99674C4.42354 9.76784 4.29453 9.56048 4.12209 9.39254L1.50963 6.84931C1.45969 6.80108 1.42431 6.7398 1.40751 6.67244C1.3907 6.60509 1.39315 6.53437 1.41458 6.46834C1.43601 6.40231 1.47555 6.34363 1.5287 6.29897C1.58185 6.25432 1.64647 6.22549 1.71521 6.21577L5.32693 5.68782C5.56486 5.65321 5.79081 5.5613 5.98535 5.41999C6.17988 5.27869 6.33716 5.09224 6.44366 4.87667L8.05827 1.6048Z" fill="white" stroke="white" stroke-width="1.39854" stroke-linecap="round" stroke-linejoin="round"/>
</g>
<defs>
<clipPath id="clip0_115_15034">
<rect width="16.7824" height="16.7824" fill="white"/>
</clipPath>
</defs>
</svg>

  );

  const SparkleIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M9.93743 15.5C9.84815 15.1539 9.66777 14.8381 9.41505 14.5854C9.16232 14.3327 8.8465 14.1523 8.50043 14.063L2.36543 12.481C2.26076 12.4513 2.16864 12.3883 2.10304 12.3014C2.03744 12.2146 2.00195 12.1088 2.00195 12C2.00195 11.8912 2.03744 11.7854 2.10304 11.6986C2.16864 11.6118 2.26076 11.5487 2.36543 11.519L8.50043 9.93601C8.84638 9.84681 9.16212 9.66658 9.41483 9.41404C9.66754 9.16151 9.84799 8.84589 9.93743 8.50001L11.5194 2.36501C11.5488 2.25992 11.6118 2.16735 11.6987 2.1014C11.7857 2.03545 11.8918 1.99976 12.0009 1.99976C12.11 1.99976 12.2162 2.03545 12.3031 2.1014C12.39 2.16735 12.453 2.25992 12.4824 2.36501L14.0634 8.50001C14.1527 8.84608 14.3331 9.1619 14.5858 9.41462C14.8385 9.66734 15.1544 9.84773 15.5004 9.93701L21.6354 11.518C21.7409 11.5471 21.834 11.61 21.9003 11.6971C21.9666 11.7841 22.0025 11.8906 22.0025 12C22.0025 12.1094 21.9666 12.2159 21.9003 12.3029C21.834 12.39 21.7409 12.4529 21.6354 12.482L15.5004 14.063C15.1544 14.1523 14.8385 14.3327 14.5858 14.5854C14.3331 14.8381 14.1527 15.1539 14.0634 15.5L12.4814 21.635C12.452 21.7401 12.389 21.8327 12.3021 21.8986C12.2152 21.9646 12.109 22.0003 11.9999 22.0003C11.8908 22.0003 11.7847 21.9646 11.6977 21.8986C11.6108 21.8327 11.5478 21.7401 11.5184 21.635L9.93743 15.5Z" stroke="#9810FA" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M20 3V7" stroke="#9810FA" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M22 5H18" stroke="#9810FA" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M4 17V19" stroke="#9810FA" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M5 18H3" stroke="#9810FA" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
</svg>

  );

  const LanguageDropdownIcon = () => (
    <svg width="12" height="8" viewBox="0 0 12 8" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M1 1.5L6 6.5L11 1.5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  );

  const CheckCircleIcon = () => (
    <svg width="157" height="157" viewBox="0 0 157 157" fill="none" xmlns="http://www.w3.org/2000/svg">
      <g filter="url(#filter0_d_115_14941)">
        <path d="M38.2168 60.3599C38.2168 38.2685 56.1254 20.3599 78.2168 20.3599C100.308 20.3599 118.217 38.2685 118.217 60.3599C118.217 82.4513 100.308 100.36 78.2168 100.36C56.1254 100.36 38.2168 82.4513 38.2168 60.3599Z" fill="url(#paint0_linear_115_14941)" shapeRendering="crispEdges"/>
        <path d="M96.8856 56.5507C97.7555 60.8198 97.1355 65.2581 95.1291 69.1255C93.1227 72.9929 89.8511 76.0555 85.8599 77.8027C81.8687 79.5499 77.3991 79.876 73.1966 78.7266C68.9941 77.5773 65.3126 75.0219 62.7661 71.4867C60.2196 67.9515 58.962 63.6502 59.203 59.3C59.444 54.9498 61.1691 50.8137 64.0906 47.5815C67.0121 44.3493 70.9533 42.2163 75.2571 41.5382C79.5609 40.8602 83.967 41.678 87.7408 43.8554" stroke="white" strokeWidth="4.76191" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M72.502 58.455L78.2162 64.1693L97.2639 45.1216" stroke="white" strokeWidth="4.76191" strokeLinecap="round" strokeLinejoin="round"/>
        <g opacity="0.210291">
          <mask id="path-4-inside-1_115_14941" fill="white">
            <path d="M27.1426 60.3605C27.1426 32.1527 50.0095 9.28571 78.2174 9.28571C106.425 9.28571 129.292 32.1527 129.292 60.3605C129.292 88.5684 106.425 111.435 78.2174 111.435C50.0095 111.435 27.1426 88.5684 27.1426 60.3605Z"/>
          </mask>
          <path d="M78.2174 111.435V108.578C51.5875 108.578 29.9997 86.9904 29.9997 60.3605H27.1426H24.2854C24.2854 90.1463 48.4316 114.292 78.2174 114.292V111.435ZM129.292 60.3605H126.435C126.435 86.9904 104.847 108.578 78.2174 108.578V111.435V114.292C108.003 114.292 132.149 90.1463 132.149 60.3605H129.292ZM78.2174 9.28571V12.1428C104.847 12.1428 126.435 33.7306 126.435 60.3605H129.292H132.149C132.149 30.5747 108.003 6.42856 78.2174 6.42856V9.28571ZM78.2174 9.28571V6.42856C48.4316 6.42856 24.2854 30.5747 24.2854 60.3605H27.1426H29.9997C29.9997 33.7306 51.5875 12.1428 78.2174 12.1428V9.28571Z" fill="#05DF72" mask="url(#path-4-inside-1_115_14941)"/>
        </g>
      </g>
      <defs>
        <filter id="filter0_d_115_14941" x="-0.00028038" y="-9.53674e-06" width="156.436" height="156.435" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
          <feFlood floodOpacity="0" result="BackgroundImageFix"/>
          <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"/>
          <feMorphology radius="8.57143" operator="erode" in="SourceAlpha" result="effect1_dropShadow_115_14941"/>
          <feOffset dy="17.8571"/>
          <feGaussianBlur stdDeviation="17.8571"/>
          <feComposite in2="hardAlpha" operator="out"/>
          <feColorMatrix type="matrix" values="0 0 0 0 0.0198614 0 0 0 0 0.875312 0 0 0 0 0.44851 0 0 0 0.5 0"/>
          <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_115_14941"/>
          <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_115_14941" result="shape"/>
        </filter>
        <linearGradient id="paint0_linear_115_14941" x1="38.2168" y1="20.3599" x2="118.217" y2="100.36" gradientUnits="userSpaceOnUse">
          <stop stopColor="#05DF72"/>
          <stop offset="1" stopColor="#009966"/>
        </linearGradient>
      </defs>
    </svg>
  );

  const DocumentCheckIcon = () => (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M21.8006 9.99999C22.2573 12.2413 21.9318 14.5714 20.8785 16.6018C19.8251 18.6322 18.1075 20.24 16.0121 21.1573C13.9167 22.0746 11.5702 22.2458 9.36391 21.6424C7.15758 21.0389 5.2248 19.6974 3.88789 17.8414C2.55097 15.9854 1.89073 13.7272 2.01728 11.4434C2.14382 9.15952 3.04949 6.98808 4.58326 5.29116C6.11703 3.59424 8.18619 2.47442 10.4457 2.11844C12.7052 1.76247 15.0184 2.19185 16.9996 3.33499" stroke="#00A63E" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M9 11L12 14L22 4" stroke="#00A63E" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
</svg>

  );

  return (
    <div className="onboarding-container-step9">
      {/* Left Side */}
      <div className="onboarding-left-step9">
        <div className="onboarding-left-header-step9">
          <img src={emireqLogo} alt="Emireq Logo" className="logo-step9" />
          <div className="language-dropdown-left-step9 clickable">
            <span>English(UK)</span>
            <LanguageDropdownIcon />
          </div>
        </div>
        
        <div className="dashboard-preview-wrapper-step9">
          <img src={dashboardPreview} alt="Dashboard Preview" className="dashboard-preview-step9" />
        </div>
        
        <div className="onboarding-content-step9">
          <div className="success-icon-wrapper-step9">
            <CheckCircleIcon />
          </div>
          
          <h1 className="onboarding-title-step9">Application Submitted!</h1>
          
          <div className="onboarding-quote-step9">
            <div className="quote-icon-step9">
              <svg width="25" height="20" viewBox="0 0 25 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M21 0C22.0938 0 22.6406 0.21875 22.6406 0.65625C22.6406 0.84375 22.4688 1 22.125 1.125C19.25 2.28125 17.8125 4.53125 17.8125 7.875C18.25 7.8125 18.5625 7.78125 18.75 7.78125C22.5 7.78125 24.375 9.65625 24.375 13.4062C24.375 17.125 22.5 18.9844 18.75 18.9844C14.4062 18.9844 12.2344 16.5938 12.2344 11.8125C12.2344 6.65625 14.3125 2.95312 18.4688 0.703125C19.3438 0.234375 20.1875 0 21 0ZM8.76562 0.140625C9.85938 0.140625 10.4062 0.359375 10.4062 0.796875C10.4062 0.984375 10.2344 1.14062 9.89062 1.26562C7.01562 2.42188 5.57812 4.67188 5.57812 8.01562C6.01562 7.95312 6.32812 7.92188 6.51562 7.92188C10.2656 7.92188 12.1406 9.79688 12.1406 13.5469C12.1406 17.2656 10.2656 19.125 6.51562 19.125C2.17188 19.125 0 16.7344 0 11.9531C0 6.79688 2.07812 3.09375 6.23438 0.84375C7.10938 0.375 7.95312 0.140625 8.76562 0.140625Z" fill="#CBDBFC"/>
              </svg>
            </div>
            <p className="quote-text-step9">
              Congratulations! Your startup is now live on our platform. Connect with ethical investors and accelerate your growth journey.
            </p>
          </div>
        </div>
        
        <div className="corner-decoration-step9"></div>
      </div>

      {/* Right Side */}
      <div className="onboarding-right-step9">
        <div className="onboarding-right-header-step9">
          <img src={emireqLogo} alt="Emireq Logo" className="logo-step9" />
          <div className="language-dropdown-step9 clickable">
            <span>English(UK)</span>
            <LanguageDropdownIcon />
          </div>
        </div>

        <div className="onboarding-form-container-step9">
          {/* Progress Stepper */}
          <div className="progress-stepper-step9">
            {[1, 2, 3, 4, 5, 6, 7, 8].map((step) => (
              <React.Fragment key={step}>
                <div className="step-circle completed">
                  <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                    <path d="M4 10L8 14L16 6" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </div>
                {step < 8 && <div className="step-line completed" />}
              </React.Fragment>
            ))}
            <div className="step-line active" />
            <div className="step-circle active">
              <span>9</span>
            </div>
          </div>

          {/* Startup Profile Card */}
          <div className="startup-profile-card-step9">
            <div className="profile-card-header">
              <div className="profile-header-left">
                <div className="rocket-icon-wrapper">
                  <RocketIcon />
                </div>
                <div className="profile-header-text">
                  <h3>Startup Profile</h3>
                  <p>Active & Under Review</p>
                </div>
              </div>
              <div className="pending-badge">
                <StarIcon />
                <span>Pending Review</span>
              </div>
            </div>
          </div>

          {/* Company Details */}
          <div className="company-details-step9">
            <div className="detail-row">
              <div className="detail-label">
                <BuildingIcon />
                <span>Company Name</span>
              </div>
              <div className="detail-value">N/A</div>
            </div>

            <div className="detail-row">
              <div className="detail-label">
                <EmailIcon />
                <span>Contact Email</span>
              </div>
              <div className="detail-value">j@gmail.com</div>
            </div>

            <div className="detail-row">
              <div className="detail-label">
                <TrendingUpIcon />
                <span>Industry</span>
              </div>
              <div className="detail-value">N/A</div>
            </div>

            <div className="detail-row">
              <div className="detail-label">
                <DollarIcon />
                <span>Funding Stage</span>
              </div>
              <div className="detail-value">N/A</div>
            </div>

            <div className="detail-row">
              <div className="detail-label">
                <LocationIcon />
                <span>Location</span>
              </div>
              <div className="detail-value">N/A</div>
            </div>
          </div>

          {/* Bottom Status Cards */}
          <div className="status-cards-step9">
            <div className="status-card stage">
              <div className="status-card-icon rocket-bg">
                <RocketIcon />
              </div>
              <div className="status-card-label">Stage</div>
              <div className="status-card-value stage-value">N/A</div>
            </div>

            <div className="status-card raising">
              <div className="status-card-icon star-bg">
                <SparkleIcon />
              </div>
              <div className="status-card-label">Raising</div>
              <div className="status-card-value raising-value">N/A</div>
            </div>

            <div className="status-card documents">
              <div className="status-card-icon document-bg">
                <DocumentCheckIcon />
              </div>
              <div className="status-card-label">Documents</div>
              <div className="status-card-value documents-value">0</div>
            </div>
          </div>

          {/* Go to Dashboard Button */}
          <button 
            className="go-to-dashboard-btn-step9 clickable" 
            onClick={() => navigate('/overview')}
          >
            <span>Go to Dashboard</span>
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M4.16667 10H15.8333" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M10 4.16666L15.8333 9.99999L10 15.8333" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
};

export default OnboardingStep9;
