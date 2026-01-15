import React, { useState } from 'react';
import './Status.css';

const Status = () => {
  const [hovered, setHovered] = useState(null);
  
  const data = [
    { label: 'In Discussion', value: 2, color: '#10b981' },
    { label: 'Interested', value: 2, color: '#3b82f6' },
    { label: 'No Response', value: 1, color: '#8b5cf6' },
    { label: 'Follow up needed', value: 1, color: '#f59e0b' }
  ];

  return (
    <div className="status-card">
      <div className="card-header">
        <div className="header-left">
          <h3 className="card-title">Status Distribution</h3>
           <button 
              className="em-info-icon-dis"
              aria-label="Information"
              type="button"
              title="View engagement information"
            >
              <svg width="4" height="11" viewBox="0 0 4 11" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path fillRule="evenodd" clipRule="evenodd" d="M3.28849 2.2312C3.41288 2.01352 3.48285 1.76086 3.48285 1.49265C3.48285 0.668582 2.81426 0 1.9902 0C1.16613 0 0.49755 0.668582 0.49755 1.49265C0.49755 2.31672 1.16613 2.9853 1.9902 2.9853C2.54605 2.9853 3.03194 2.6821 3.28849 2.2312ZM0.995099 3.9804H1.49265H2.48775C3.03777 3.9804 3.48285 4.42547 3.48285 4.9755V5.97059V9.95099C3.48285 10.501 3.03777 10.9461 2.48775 10.9461C1.93772 10.9461 1.49265 10.501 1.49265 9.95099V6.71692C1.49265 6.30489 1.15836 5.97059 0.746324 5.97059C0.334291 5.97059 0 5.6363 0 5.22427V4.9755C0 4.62566 0.18075 4.31663 0.452848 4.13977C0.608332 4.0387 0.794913 3.9804 0.995099 3.9804Z" fill="white"/>
              </svg>
            </button>
        </div>
        <div className="card-actions">
            <div className="em-portfolio-chart-actions">
              <button 
                className="em-icon-button" 
                aria-label="Expand" 
                type="button"
                tabIndex={0}
              >
               <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M10 19H5V14M14 5H19V10" stroke="#888888" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
</svg>
              </button>
              <button 
                className="em-icon-button" 
                aria-label="Edit" 
                type="button"
                tabIndex={0}
              >
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M11.333 2a2.121 2.121 0 0 1 3 3L5.333 14l-4 1.333L2.667 11l8-8Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </button>
              <button 
                className="em-icon-button" 
                aria-label="More options" 
                type="button"
                tabIndex={0}
              >
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <circle cx="8" cy="4" r="1" fill="currentColor"/>
                  <circle cx="8" cy="8" r="1" fill="currentColor"/>
                  <circle cx="8" cy="12" r="1" fill="currentColor"/>
                </svg>
              </button>
            </div>
          </div>
      </div>
      
      <div className="card-content">
        {/* Donut */}
        <div className="sa-chart-wrap">
          <svg
            viewBox="0 0 160 160"
            className="sa-donut"
            role="img"
            aria-label="Status distribution donut chart"
          >
            {/* Outer thin ring */}
            <circle cx="80" cy="80" r="70" className="sa-donut-border" />
            
            {/* Inner thin ring */}
            <circle cx="80" cy="80" r="45" className="sa-donut-border" />

            {/* Segments */}
            <g transform="rotate(-90 80 80)">
              {data.reduce(
                (acc, item, i) => {
                  // Radius is halfway between inner (45) and outer (70) borders
                  const radius = 57.5; 
                  const circumference = 2 * Math.PI * radius;
                  const gap = 4; // Adjusted for visual balance
                  const valueLength = (item.value / 6) * circumference - gap;

                  acc.elements.push(
                    <circle
                      key={item.label}
                      cx="80"
                      cy="80"
                      r={radius}
                      className={`sa-donut-segment ${hovered === i ? "is-hovered" : ""}`}
                      stroke={item.color}
                      strokeDasharray={`${valueLength} ${circumference}`}
                      strokeDashoffset={-acc.offset}
                      onMouseEnter={() => setHovered(i)}
                      onMouseLeave={() => setHovered(null)}
                    />
                  );

                  acc.offset += valueLength + gap;
                  return acc;
                },
                { offset: 0, elements: [] }
              ).elements}
            </g>
          </svg>
        </div>
        
        <div className="legend">
          {data.map((item, i) => (
            <div 
              key={item.label} 
              className={`legend-item ${hovered === i ? "is-hovered" : ""}`}
              onMouseEnter={() => setHovered(i)}
              onMouseLeave={() => setHovered(null)}
            >
              <div className="legend-item-content">
                <div className="legend-color" style={{ backgroundColor: item.color }}></div>
                <span className="legend-label">{item.label}</span>
              </div>
              <span className="legend-count">{item.value}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Status;
