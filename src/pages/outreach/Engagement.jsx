import React, { useState, useRef, useEffect } from 'react';
import './Engagement.css';

const Engagement = () => {
  const [hoveredPoint, setHoveredPoint] = useState(null);
  const [selectedMonth, setSelectedMonth] = useState(null);
  const [tooltipPosition, setTooltipPosition] = useState({ x: 0, y: 0 });
  const chartRef = useRef(null);

  useEffect(() => {
    setSelectedMonth(null);
  }, []);

  const data = [
    { month: 'Jan', value: 25 },
    { month: 'Feb', value: 32 },
    { month: 'Mar', value: 28 },
    { month: 'Apr', value: 35 },
    { month: 'May', value: 42 },
    { month: 'Jun', value: 38 },
    { month: 'Jul', value: 45 },
    { month: 'Aug', value: 40 },
    { month: 'Sep', value: 48 }
  ];

  const handlePointHover = (index, event) => {
    event.preventDefault();
    event.stopPropagation();
    setHoveredPoint(index);
    if (chartRef.current) {
      const rect = chartRef.current.getBoundingClientRect();
      const point = event.target;
      const pointRect = point.getBoundingClientRect();
      setTooltipPosition({
        x: pointRect.left - rect.left + pointRect.width / 2,
        y: pointRect.top - rect.top - 15
      });
    }
  };

  const handlePointLeave = () => {
    setHoveredPoint(null);
  };

  const handlePointClick = (index, event) => {
    event.preventDefault();
    event.stopPropagation();
    setSelectedMonth(index);
    setHoveredPoint(index);
    if (chartRef.current) {
      const rect = chartRef.current.getBoundingClientRect();
      const point = event.target;
      const pointRect = point.getBoundingClientRect();
      setTooltipPosition({
        x: pointRect.left - rect.left + pointRect.width / 2,
        y: pointRect.top - rect.top - 15
      });
    }
  };

  const handleMonthClick = (index, event) => {
    event.preventDefault();
    event.stopPropagation();
    setSelectedMonth(index);
    setHoveredPoint(index);
    if (chartRef.current) {
      const rect = chartRef.current.getBoundingClientRect();
      const pointX = xScale(index);
      const pointY = yScale(data[index].value);
      setTooltipPosition({
        x: pointX,
        y: pointY - 15
      });
    }
  };

  const width = 850;
  const height = 450;
  const padding = { top: 90, right: 120, bottom: 60, left: 100 };
  const chartWidth = width - padding.left - padding.right;
  const chartHeight = height - padding.top - padding.bottom;

  const xScale = (index) => (index / (data.length - 1)) * chartWidth + padding.left;
  const yScale = (value) => padding.top + chartHeight - (value / 50) * chartHeight;

  return (
    <div className="engagement-wrapper">
      {/* Header Section from Figma PNG */}
      <div className="engagement-header">
        <div className="header-left">
          <div className="title-row">
            <h2 className="header-title">Engagement Analytics</h2>
            <button 
              className="em-info-icon-eng"
              aria-label="Information"
              type="button"
              title="View engagement information"
            >
              <svg width="4" height="11" viewBox="0 0 4 11" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path fillRule="evenodd" clipRule="evenodd" d="M3.28849 2.2312C3.41288 2.01352 3.48285 1.76086 3.48285 1.49265C3.48285 0.668582 2.81426 0 1.9902 0C1.16613 0 0.49755 0.668582 0.49755 1.49265C0.49755 2.31672 1.16613 2.9853 1.9902 2.9853C2.54605 2.9853 3.03194 2.6821 3.28849 2.2312ZM0.995099 3.9804H1.49265H2.48775C3.03777 3.9804 3.48285 4.42547 3.48285 4.9755V5.97059V9.95099C3.48285 10.501 3.03777 10.9461 2.48775 10.9461C1.93772 10.9461 1.49265 10.501 1.49265 9.95099V6.71692C1.49265 6.30489 1.15836 5.97059 0.746324 5.97059C0.334291 5.97059 0 5.6363 0 5.22427V4.9755C0 4.62566 0.18075 4.31663 0.452848 4.13977C0.608332 4.0387 0.794913 3.9804 0.995099 3.9804Z" fill="white"/>
              </svg>
            </button>
          </div>
          <span className="header-subtitle">Track your outreach performance and response rates</span>
        </div>
      </div>

      {/* Engagement Card */}
      <div className="engagement-card">
        <div className="card-header">
          <div className="header-left">
            <h3 className="card-title">Monthly Response Rate</h3>
            <button 
              className="em-info-icon-eng"
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
<path d="M10 19H5V14M14 5H19V10" stroke="#888888" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
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
        <div className="card-content" ref={chartRef}>
          <svg width="100%" height={height} viewBox={`0 0 ${width} ${height}`} className="chart-svg">
          {/* Grid Lines */}
          {[0, 10, 20, 30, 40, 50].map((value, index) => (
            <g key={`grid-${index}`}>
              <line
                x1={padding.left}
                y1={yScale(value)}
                x2={width - padding.right}
                y2={yScale(value)}
                stroke="#E5E7EB"
                strokeWidth="1"
                strokeDasharray="5 5"
                opacity="0.5"
                className="grid-line"
              />
              <text
                x={padding.left - 15}
                y={yScale(value) + 4}
                textAnchor="end"
                className="axis-label y-label"
                fill="#9CA3AF"
                fontSize="13"
                fontWeight="400"
              >
                {value}
              </text>
            </g>
          ))}
          
          {/* X-Axis Labels */}
          {data.map((point, index) => (
            <g key={`x-label-group-${index}`}>
              {/* Purple pill background for selected/hovered month */}
              {selectedMonth === index && (
                <rect
                  x={xScale(index) + 15 - 26}
                  y={height - padding.bottom + 14}
                  width="52"
                  height="34"
                  rx="17"
                  fill="#E0E7FF"
                  className="active-month-pill"
                />
              )}
              <text
                x={xScale(index) + 15}
                y={height - padding.bottom + 30}
                textAnchor="middle"
                className="axis-label x-label"
                fill={selectedMonth === index ? '#6366F1' : '#9CA3AF'}
                fontSize="15"
                fontWeight={selectedMonth === index ? '600' : '400'}
                style={{ cursor: 'pointer' }}
                onClick={(e) => handleMonthClick(index, e)}
                onMouseEnter={(e) => handleMonthClick(index, e)}
              >
                {point.month}
              </text>
            </g>
          ))}
          
          {/* Line */}
          <polyline
            points={data.map((point, index) => `${xScale(index)},${yScale(point.value)}`).join(' ')}
            fill="none"
            stroke="#6366F1"
            strokeWidth="3"
            strokeLinejoin="round"
            strokeLinecap="round"
            className="chart-line"
          />
          
          {/* Data Points */}
          {data.map((point, index) => (
            <g key={`point-${index}`}>
              <circle
                cx={xScale(index)}
                cy={yScale(point.value)}
                r="7"
                fill="white"
                stroke="#6366F1"
                strokeWidth="3.5"
                className="data-point"
                onMouseEnter={(e) => handlePointHover(index, e)}
                onMouseLeave={handlePointLeave}
                onClick={(e) => handlePointClick(index, e)}
                style={{ cursor: 'pointer' }}
              />
              {hoveredPoint === index && (
                <>
                  <circle
                    cx={xScale(index)}
                    cy={yScale(point.value)}
                    r="12"
                    fill="#6366F1"
                    opacity="0.15"
                    className="hover-ring"
                  />
                  <circle
                    cx={xScale(index)}
                    cy={yScale(point.value)}
                    r="16"
                    fill="none"
                    stroke="#6366F1"
                    strokeWidth="2"
                    opacity="0.25"
                    className="hover-outer-ring"
                  />
                </>
              )}
            </g>
          ))}
          
          {/* Tooltip */}
          {(hoveredPoint !== null || selectedMonth !== null) && (
            <g className="tooltip-group">
              <rect
                x={tooltipPosition.x - 60}
                y={tooltipPosition.y - 55}
                width="120"
                height="40"
                rx="20"
                fill="white"
                stroke="#E5E7EB"
                strokeWidth="1"
                filter="drop-shadow(0 4px 12px rgba(0, 0, 0, 0.1))"
                className="tooltip-bg"
              />
              <text
                x={tooltipPosition.x - 28}
                y={tooltipPosition.y - 30}
                textAnchor="middle"
                className="tooltip-value"
                fill="#1F2937"
                fontSize="16"
                fontWeight="700"
              >
                ${(data[hoveredPoint !== null ? hoveredPoint : selectedMonth].value * 10)}K
              </text>
              <text
                x={tooltipPosition.x + 17}
                y={tooltipPosition.y - 30}
                textAnchor="start"
                className="tooltip-change"
                fill="#6366F1"
                fontSize="14"
                fontWeight="600"
              >
                + 12%
              </text>
            </g>
          )}
        </svg>
      </div>
      </div>
    </div>
  );
};

export default Engagement;
