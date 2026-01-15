import React from "react";
import "./SmartInsights.css";

const insights = [
  {
    id: 1,
    type: "success",
    text: "Your outreach to Series A investors shows a 35% higher response rate",
  },
  {
    id: 2,
    type: "views",
    text: "3 investors viewed your updated pitch deck in the last 5 days",
  },
  {
    id: 3,
    type: "followup",
    text: "Follow-up with Crescent Capital — last response was 7 days ago",
  },
  {
    id: 4,
    type: "ai",
    text: "Monica Gonzalez has a 90% investment rate. Consider prioritizing this conversation",
  },
];

const Icon = ({ type }) => {
  switch (type) {
    case "success":
      return (
        <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
          <path
            d="M13.3333 5.83325H18.3333V10.8333"
            stroke="#008236"
            strokeWidth="1.66667"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M18.3333 5.83325L11.25 12.9166L7.08332 8.74992L1.66666 14.1666"
            stroke="#008236"
            strokeWidth="1.66667"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      );

    case "views":
      return (
        <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M1.71832 10.2901C1.64887 10.103 1.64887 9.89715 1.71832 9.71006C2.39473 8.06993 3.54291 6.66759 5.01729 5.6808C6.49167 4.69402 8.22585 4.16724 9.99998 4.16724C11.7741 4.16724 13.5083 4.69402 14.9827 5.6808C16.4571 6.66759 17.6052 8.06993 18.2816 9.71006C18.3511 9.89715 18.3511 10.103 18.2816 10.2901C17.6052 11.9302 16.4571 13.3325 14.9827 14.3193C13.5083 15.3061 11.7741 15.8329 9.99998 15.8329C8.22585 15.8329 6.49167 15.3061 5.01729 14.3193C3.54291 13.3325 2.39473 11.9302 1.71832 10.2901Z" stroke="#1447E6" stroke-width="1.66667" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M10 12.5C11.3807 12.5 12.5 11.3807 12.5 10C12.5 8.61929 11.3807 7.5 10 7.5C8.61929 7.5 7.5 8.61929 7.5 10C7.5 11.3807 8.61929 12.5 10 12.5Z" stroke="#1447E6" stroke-width="1.66667" stroke-linecap="round" stroke-linejoin="round"/>
</svg>

      );

    case "followup":
      return (
        <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
<g clip-path="url(#clip0_87_1180)">
<path d="M9.99999 18.3334C14.6024 18.3334 18.3333 14.6025 18.3333 10.0001C18.3333 5.39771 14.6024 1.66675 9.99999 1.66675C5.39762 1.66675 1.66666 5.39771 1.66666 10.0001C1.66666 14.6025 5.39762 18.3334 9.99999 18.3334Z" stroke="#BB4D00" stroke-width="1.66667" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M10 5V10L13.3333 11.6667" stroke="#BB4D00" stroke-width="1.66667" stroke-linecap="round" stroke-linejoin="round"/>
</g>
<defs>
<clipPath id="clip0_87_1180">
<rect width="20" height="20" fill="white"/>
</clipPath>
</defs>
</svg>

      );

    default:
      return (
        <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M8.28083 12.9167C8.20644 12.6283 8.05612 12.3651 7.84552 12.1545C7.63491 11.9439 7.37173 11.7936 7.08333 11.7192L1.97083 10.4009C1.88361 10.3761 1.80684 10.3236 1.75218 10.2512C1.69751 10.1789 1.66794 10.0907 1.66794 10C1.66794 9.90938 1.69751 9.82118 1.75218 9.74884C1.80684 9.6765 1.88361 9.62397 1.97083 9.59921L7.08333 8.28005C7.37162 8.20572 7.63474 8.05552 7.84534 7.84508C8.05593 7.63463 8.20631 7.37162 8.28083 7.08338L9.59917 1.97088C9.62367 1.88331 9.67615 1.80616 9.7486 1.75121C9.82105 1.69625 9.90948 1.6665 10.0004 1.6665C10.0913 1.6665 10.1798 1.69625 10.2522 1.75121C10.3247 1.80616 10.3772 1.88331 10.4017 1.97088L11.7192 7.08338C11.7936 7.37177 11.9439 7.63496 12.1545 7.84556C12.3651 8.05616 12.6283 8.20648 12.9167 8.28088L18.0292 9.59838C18.1171 9.62263 18.1946 9.67505 18.2499 9.74761C18.3051 9.82017 18.335 9.90885 18.335 10C18.335 10.0912 18.3051 10.1799 18.2499 10.2525C18.1946 10.325 18.1171 10.3775 18.0292 10.4017L12.9167 11.7192C12.6283 11.7936 12.3651 11.9439 12.1545 12.1545C11.9439 12.3651 11.7936 12.6283 11.7192 12.9167L10.4008 18.0292C10.3763 18.1168 10.3238 18.1939 10.2514 18.2489C10.179 18.3038 10.0905 18.3336 9.99958 18.3336C9.90865 18.3336 9.82022 18.3038 9.74777 18.2489C9.67532 18.1939 9.62284 18.1168 9.59833 18.0292L8.28083 12.9167Z" stroke="#8200DB" stroke-width="1.66667" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M16.6667 2.5V5.83333" stroke="#8200DB" stroke-width="1.66667" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M18.3333 4.16675H15" stroke="#8200DB" stroke-width="1.66667" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M3.33334 14.1667V15.8334" stroke="#8200DB" stroke-width="1.66667" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M4.16667 15H2.5" stroke="#8200DB" stroke-width="1.66667" stroke-linecap="round" stroke-linejoin="round"/>
</svg>

      );
  }
};

const SmartInsights = ({ isSidebarCollapsed }) => {
  return (
    <div
      className={`smart-insights-container ${
        isSidebarCollapsed ? "collapsed" : ""
      }`}
    >
      {/* HEADER */}
      <div className="smart-header">
        <div className="header-left">
          <div className="header-title-row">
           <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
<g clip-path="url(#clip0_87_1152)">
<path d="M8.28083 12.9167C8.20644 12.6283 8.05612 12.3651 7.84552 12.1545C7.63491 11.9439 7.37173 11.7936 7.08333 11.7192L1.97083 10.4009C1.88361 10.3761 1.80684 10.3236 1.75218 10.2512C1.69751 10.1789 1.66794 10.0907 1.66794 10C1.66794 9.90938 1.69751 9.82118 1.75218 9.74884C1.80684 9.6765 1.88361 9.62397 1.97083 9.59921L7.08333 8.28005C7.37162 8.20572 7.63474 8.05552 7.84534 7.84508C8.05593 7.63463 8.20631 7.37162 8.28083 7.08338L9.59917 1.97088C9.62367 1.88331 9.67615 1.80616 9.7486 1.75121C9.82105 1.69625 9.90948 1.6665 10.0004 1.6665C10.0913 1.6665 10.1798 1.69625 10.2522 1.75121C10.3247 1.80616 10.3772 1.88331 10.4017 1.97088L11.7192 7.08338C11.7936 7.37177 11.9439 7.63496 12.1545 7.84556C12.3651 8.05616 12.6283 8.20648 12.9167 8.28088L18.0292 9.59838C18.1171 9.62263 18.1946 9.67505 18.2499 9.74761C18.3051 9.82017 18.335 9.90885 18.335 10C18.335 10.0912 18.3051 10.1799 18.2499 10.2525C18.1946 10.325 18.1171 10.3775 18.0292 10.4017L12.9167 11.7192C12.6283 11.7936 12.3651 11.9439 12.1545 12.1545C11.9439 12.3651 11.7936 12.6283 11.7192 12.9167L10.4008 18.0292C10.3763 18.1168 10.3238 18.1939 10.2514 18.2489C10.179 18.3038 10.0905 18.3336 9.99958 18.3336C9.90865 18.3336 9.82022 18.3038 9.74777 18.2489C9.67532 18.1939 9.62284 18.1168 9.59833 18.0292L8.28083 12.9167Z" stroke="#9810FA" stroke-width="1.66667" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M16.6667 2.5V5.83333" stroke="#9810FA" stroke-width="1.66667" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M18.3333 4.16675H15" stroke="#9810FA" stroke-width="1.66667" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M3.33334 14.1667V15.8334" stroke="#9810FA" stroke-width="1.66667" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M4.16667 15H2.5" stroke="#9810FA" stroke-width="1.66667" stroke-linecap="round" stroke-linejoin="round"/>
</g>
<defs>
<clipPath id="clip0_87_1152">
<rect width="20" height="20" fill="white"/>
</clipPath>
</defs>
</svg>

            <h3>Smart Insights (AI-Powered)</h3>
          </div>
          <p className="header-subtitle">
            Actionable recommendations based on your investor engagement data
          </p>
        </div>

        <button className="ai-badge">
          <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
<g clip-path="url(#clip0_87_1162)">
<path d="M2 7.00008C1.90538 7.0004 1.81261 6.97387 1.73247 6.92357C1.65233 6.87327 1.58811 6.80126 1.54727 6.71591C1.50643 6.63056 1.49064 6.53537 1.50175 6.44141C1.51285 6.34745 1.55039 6.25856 1.61 6.18508L6.56 1.08508C6.59713 1.04222 6.64773 1.01326 6.70349 1.00295C6.75925 0.992636 6.81686 1.00159 6.86686 1.02833C6.91686 1.05508 6.95629 1.09803 6.97866 1.15014C7.00104 1.20224 7.00503 1.26041 6.99 1.31508L6.03 4.32508C6.00169 4.40084 5.99218 4.48234 6.00229 4.56258C6.0124 4.64283 6.04183 4.71942 6.08804 4.78579C6.13426 4.85217 6.19588 4.90634 6.26763 4.94366C6.33938 4.98098 6.41912 5.00034 6.5 5.00008H10C10.0946 4.99976 10.1874 5.02629 10.2675 5.07659C10.3477 5.12689 10.4119 5.1989 10.4527 5.28425C10.4936 5.3696 10.5093 5.46479 10.4982 5.55875C10.4871 5.65272 10.4496 5.7416 10.39 5.81508L5.44 10.9151C5.40287 10.9579 5.35227 10.9869 5.29651 10.9972C5.24074 11.0075 5.18313 10.9986 5.13313 10.9718C5.08313 10.9451 5.0437 10.9021 5.02133 10.85C4.99895 10.7979 4.99496 10.7398 5.01 10.6851L5.97 7.67508C5.9983 7.59932 6.00781 7.51782 5.9977 7.43758C5.98759 7.35733 5.95817 7.28074 5.91195 7.21437C5.86574 7.148 5.80411 7.09382 5.73236 7.0565C5.66061 7.01918 5.58087 6.99982 5.5 7.00008H2Z" stroke="white" stroke-linecap="round" stroke-linejoin="round"/>
</g>
<defs>
<clipPath id="clip0_87_1162">
<rect width="12" height="12" fill="white"/>
</clipPath>
</defs>
</svg>

          AI
        </button>
      </div>

      <div className="divider" />

      {/* INSIGHT LIST */}
      <div className="insights-list">
        {insights.map((item) => (
          <div key={item.id} className={`insight-card ${item.type}`}>
            <div className="icon-wrap">
              <Icon type={item.type} />
            </div>
            <p>{item.text}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SmartInsights;
