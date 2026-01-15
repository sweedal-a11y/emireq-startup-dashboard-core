import React, { useState, useRef } from 'react';
import './GrowthOverviewChart.css';

export default function GrowthOverviewChart({ sidebarCollapsed = false }) {
  const [hoveredPoint, setHoveredPoint] = useState(null);
  const [selectedMonth, setSelectedMonth] = useState('Jul');
  const [isFullscreen, setIsFullscreen] = useState(false);
  const chartRef = useRef(null);

  // Data matching Figma design
  const revenueData = [35, 60, 140, 60, 105, 100, 150, 100, 100, 190];
  const usersData = [75, 115, 70, 20, 75, 75, 115, 155, 155, 120];
  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep'];

  const handlePointHover = (index, type) => {
    console.log('Data point hovered:', { month: months[index], type });
    setHoveredPoint({ index, type });
  };

  const handlePointLeave = () => {
    setHoveredPoint(null);
  };

  const handleMonthClick = (month) => {
    console.log('Month clicked:', month);
    setSelectedMonth(month === selectedMonth ? null : month);
  };

  const handleFullscreen = (e) => {
    e?.stopPropagation();
    console.log('🔲 Fullscreen toggled:', !isFullscreen);
    alert('🔲 Fullscreen button clicked!');
    setIsFullscreen(!isFullscreen);
  };

  const handleInfoClick = (e) => {
    e?.stopPropagation();
    console.log('ℹ️ Info button clicked, showing info:', !showInfo);
    setShowInfo(!showInfo);
    if (!showInfo) {
      console.log('💡 INFO TOOLTIP OPENED - Check the chart for the tooltip!');
    }
  };

  const handleEditClick = (e) => {
    e.stopPropagation();
    console.log('✏️ Edit chart clicked - Edit mode would open here');
    alert('🎉 Edit button is working! Edit mode would open here.');
  };

  const handleMoreClick = (e) => {
    e?.stopPropagation();
    console.log('⋮ More options menu toggled:', !showMoreMenu);
    setShowMoreMenu(!showMoreMenu);
    if (!showMoreMenu) {
      console.log('📋 MORE MENU OPENED - Check the chart for the dropdown!');
    }
  };

  // Calculate SVG dimensions
  const svgWidth = 1200;
  const svgHeight = 450;
  const padding = { top: 30, right: 60, bottom: 60, left: 60 };
  const chartWidth = svgWidth - padding.left - padding.right;
  const chartHeight = svgHeight - padding.top - padding.bottom;

  // Y-axis scale (0 to 250)
  const yMax = 250;
  const yScale = (value) => chartHeight - (value / yMax) * chartHeight;

  // X-axis scale
  const xMax = months.length - 1;
  const xScale = (index) => (index / xMax) * chartWidth;

  // Generate straight line path matching Figma design
  const generateStraightPath = (data) => {
    if (data.length < 2) return '';
    
    let path = '';
    for (let i = 0; i < data.length; i++) {
      const x = padding.left + xScale(i);
      const y = padding.top + yScale(data[i]);
      
      if (i === 0) {
        path += `M ${x} ${y}`;
      } else {
        path += ` L ${x} ${y}`;
      }
    }
    return path;
  };

  const revenuePath = generateStraightPath(revenueData);
  const usersPath = generateStraightPath(usersData);

  return (
    <div className={`em-growth-chart ${isFullscreen ? 'em-growth-chart--fullscreen' : ''} ${sidebarCollapsed ? 'em-growth-chart--sidebar-collapsed' : ''}`} ref={chartRef}>
      <div className="em-chart-header">
        <div className="em-chart-title-group">
          <div className="em-chart-title-row">
            <div className="em-chart-icon">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M7.11728 9.95101C7.7172 9.16557 8.43182 8.47988 9.28306 7.96082H14.5973C18.3917 10.2746 19.4715 15.899 19.7787 18.9127C19.8902 20.0062 19.0099 20.8971 17.9108 20.8971H13.9304" stroke="#5654D4" strokeWidth="1.9902" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M16.4761 3.28914L14.9265 3.48284L12.2684 3.03982C12.0517 3.00372 11.8306 3.00372 11.614 3.03982L8.95583 3.48284L7.40622 3.28914C6.51999 3.17836 5.94782 4.20077 6.50575 4.89819L8.95583 7.96079H14.9265L17.3765 4.89819C17.9345 4.20077 17.3623 3.17836 16.4761 3.28914Z" stroke="#5654D4" strokeWidth="1.9902" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M2.98529 18.9069C2.98529 18.0825 3.65357 17.4142 4.47794 17.4142H8.45834C9.2827 17.4142 9.95098 18.0825 9.95098 18.9069V19.4044C9.95098 20.2288 9.2827 20.8971 8.45834 20.8971H4.47794C3.65357 20.8971 2.98529 20.2288 2.98529 19.4044V18.9069Z" stroke="#5654D4" strokeWidth="1.9902" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M2.98529 15.424C2.98529 14.5997 3.65357 13.9314 4.47794 13.9314H8.45834C9.2827 13.9314 9.95098 14.5997 9.95098 15.424V15.9216C9.95098 16.746 9.2827 17.4142 8.45834 17.4142H4.47794C3.65357 17.4142 2.98529 16.746 2.98529 15.9216V15.424Z" stroke="#5654D4" strokeWidth="1.9902" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>
            <h3 className="em-chart-title">Growth Overview</h3>
            <button 
              className="em-info-icon-grow"
              aria-label="Information"
              type="button"
              title="View chart information"
            >
              <svg width="4" height="11" viewBox="0 0 4 11" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path fillRule="evenodd" clipRule="evenodd" d="M3.28849 2.2312C3.41288 2.01352 3.48285 1.76086 3.48285 1.49265C3.48285 0.668582 2.81426 0 1.9902 0C1.16613 0 0.49755 0.668582 0.49755 1.49265C0.49755 2.31672 1.16613 2.9853 1.9902 2.9853C2.54605 2.9853 3.03194 2.6821 3.28849 2.2312ZM0.995099 3.9804H1.49265H2.48775C3.03777 3.9804 3.48285 4.42547 3.48285 4.9755V5.97059V9.95099C3.48285 10.501 3.03777 10.9461 2.48775 10.9461C1.93772 10.9461 1.49265 10.501 1.49265 9.95099V6.71692C1.49265 6.30489 1.15836 5.97059 0.746324 5.97059C0.334291 5.97059 0 5.6363 0 5.22427V4.9755C0 4.62566 0.18075 4.31663 0.452848 4.13977C0.608332 4.0387 0.794913 3.9804 0.995099 3.9804Z" fill="white"/>
              </svg>
            </button>
          </div>
          <p className="em-chart-subtitle">User acquisition and revenue trends</p>
        </div>
        <div className="em-chart-actions">
          <button 
            className="em-action-button" 
            aria-label="Expand chart"
            type="button"
            title="Expand chart"
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M10 19H5V14M14 5H19V10" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </button>
          <button 
            className="em-action-button" 
            aria-label="Edit chart"
            type="button"
            title="Edit chart"
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M17 3a2.828 2.828 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5L17 3z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </button>
          <button 
            className="em-action-button"
            aria-label="More options"
            type="button"
            title="More options"
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <circle cx="12" cy="6" r="1.5" fill="currentColor"/>
              <circle cx="12" cy="12" r="1.5" fill="currentColor"/>
              <circle cx="12" cy="18" r="1.5" fill="currentColor"/>
            </svg>
          </button>
        </div>
      </div>

      <div className="em-chart-content">
        <div className="em-chart-container">
          <svg 
            viewBox={`0 0 ${svgWidth} ${svgHeight}`}
            preserveAspectRatio="xMidYMid meet"
            className="em-chart-svg"
          >
            {/* Horizontal Grid Lines */}
            {[0, 50, 100, 150, 200, 250].map((value) => (
              <line
                key={`grid-${value}`}
                x1={padding.left}
                y1={padding.top + yScale(value)}
                x2={padding.left + chartWidth}
                y2={padding.top + yScale(value)}
                stroke="var(--grid-line-color)"
                strokeWidth="1"
                opacity="0.15"
              />
            ))}

            {/* Y-Axis Labels */}
            {[0, 50, 100, 150, 200, 250].map((value) => (
              <text
                key={`y-label-${value}`}
                x={padding.left - 18}
                y={padding.top + yScale(value) + 5}
                textAnchor="end"
                className="em-axis-label"
                fill="var(--text-tertiary)"
              >
                {value}
              </text>
            ))}

            {/* Revenue Line (Purple) */}
            <path
              d={revenuePath}
              fill="none"
              stroke="#9B7EE5"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="em-line-path"
            />

            {/* Users Line (Blue) */}
            <path
              d={usersPath}
              fill="none"
              stroke="#5B9FED"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="em-line-path"
            />

            {/* Revenue Data Points */}
            {revenueData.map((value, index) => {
              const isHovered = hoveredPoint?.index === index && hoveredPoint?.type === 'revenue';
              return (
                <circle
                  key={`revenue-point-${index}`}
                  cx={padding.left + xScale(index)}
                  cy={padding.top + yScale(value)}
                  r={isHovered ? 7 : 6}
                  fill="#9B7EE5"
                  className="em-data-point"
                  onMouseEnter={() => handlePointHover(index, 'revenue')}
                  onMouseLeave={handlePointLeave}
                  style={{ cursor: 'pointer' }}
                />
              );
            })}

            {/* Users Data Points */}
            {usersData.map((value, index) => {
              const isHovered = hoveredPoint?.index === index && hoveredPoint?.type === 'users';
              return (
                <circle
                  key={`users-point-${index}`}
                  cx={padding.left + xScale(index)}
                  cy={padding.top + yScale(value)}
                  r={isHovered ? 7 : 6}
                  fill="#5B9FED"
                  className="em-data-point"
                  onMouseEnter={() => handlePointHover(index, 'users')}
                  onMouseLeave={handlePointLeave}
                  style={{ cursor: 'pointer' }}
                />
              );
            })}

            {/* X-Axis Month Labels with Selection */}
            {months.map((month, index) => {
              const isSelected = month === selectedMonth;
              return (
                <g key={`month-${index}`}>
                  {isSelected && (
                    <rect
                      x={padding.left + xScale(index) - 32}
                      y={svgHeight - 52}
                      width="64"
                      height="34"
                      rx="17"
                      fill="var(--month-pill-bg)"
                      className="em-month-pill-bg"
                    />
                  )}
                  <text
                    x={padding.left + xScale(index)}
                    y={svgHeight - 28}
                    textAnchor="middle"
                    className={`em-month-label ${isSelected ? 'em-month-label--selected' : ''}`}
                    fill={isSelected ? 'var(--text-primary)' : 'var(--text-tertiary)'}
                    style={{ cursor: 'pointer' }}
                    onClick={() => handleMonthClick(month)}
                  >
                    {month}
                  </text>
                </g>
              );
            })}
          </svg>
        </div>

        {/* Legend */}
        <div className="em-chart-legend">
          <div className="em-legend-item">
            <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
              <circle cx="9" cy="9" r="3.5" fill="#9B7EE5" stroke="#9B7EE5" strokeWidth="1"/>
              <line x1="1" y1="9" x2="5.5" y2="9" stroke="#9B7EE5" strokeWidth="2.5" strokeLinecap="round"/>
              <line x1="12.5" y1="9" x2="17" y2="9" stroke="#9B7EE5" strokeWidth="2.5" strokeLinecap="round"/>
            </svg>
            <span className="em-legend-text" style={{ color: '#9B7EE5' }}>Revenue ($)</span>
          </div>
          <div className="em-legend-item">
            <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
              <circle cx="9" cy="9" r="3.5" fill="#5B9FED" stroke="#5B9FED" strokeWidth="1"/>
              <line x1="1" y1="9" x2="5.5" y2="9" stroke="#5B9FED" strokeWidth="2.5" strokeLinecap="round"/>
              <line x1="12.5" y1="9" x2="17" y2="9" stroke="#5B9FED" strokeWidth="2.5" strokeLinecap="round"/>
            </svg>
            <span className="em-legend-text" style={{ color: '#5B9FED' }}>Users</span>
          </div>
        </div>
      </div>
    </div>
  );
}
