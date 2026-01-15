import React, { useState, useRef } from 'react';
import './InvestorMixChart.css';

export default function InvestorMixChart({ sidebarCollapsed = false }) {
  const [hoveredSegment, setHoveredSegment] = useState(null);
  const [selectedSegment, setSelectedSegment] = useState(null);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const chartRef = useRef(null);

  const investorData = [
    { label: 'VC Firms', value: 30, color: '#8B5CF6' },
    { label: 'Angel Investors', value: 35, color: '#3B82F6' },
    { label: 'Strategic Partners', value: 20, color: '#10B981' },
    { label: 'Others', value: 15, color: '#F59E0B' }
  ];

  const handleSegmentHover = (index) => {
    setHoveredSegment(index);
  };

  const handleSegmentLeave = () => {
    setHoveredSegment(null);
  };

  const handleSegmentClick = (index) => {
    console.log('Segment clicked:', investorData[index].label);
    setSelectedSegment(selectedSegment === index ? null : index);
  };

  const renderTooltip = (index) => {
    if (hoveredSegment !== index) return null;
    
    const segment = investorData[index];
    return (
      <div 
        className="em-investor-tooltip" 
        style={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          background: 'rgba(0, 0, 0, 0.8)',
          color: 'white',
          padding: '8px 12px',
          borderRadius: '6px',
          fontSize: '12px',
          fontWeight: '500',
          pointerEvents: 'none',
          zIndex: 1000,
          whiteSpace: 'nowrap'
        }}
      >
        <div style={{ fontWeight: '600', marginBottom: '2px' }}>{segment.label}</div>
        <div>{segment.value}%</div>
      </div>
    );
  };

  // Calculate pie segments (no donut hole)
  const centerX = 150;
  const centerY = 120;
  const radius = 95; // Further increased size
  
  let currentAngle = -90; // Start from top
  
  const segments = investorData.map((item, index) => {
    const angle = (item.value / 100) * 360;
    const startAngle = currentAngle;
    const endAngle = currentAngle + angle;
    
    // Calculate path for pie segment (no inner hole)
    const startAngleRad = (startAngle * Math.PI) / 180;
    const endAngleRad = (endAngle * Math.PI) / 180;
    
    const x1 = centerX + radius * Math.cos(startAngleRad);
    const y1 = centerY + radius * Math.sin(startAngleRad);
    const x2 = centerX + radius * Math.cos(endAngleRad);
    const y2 = centerY + radius * Math.sin(endAngleRad);
    
    const largeArcFlag = angle > 180 ? 1 : 0;
    
    const path = [
      `M ${centerX} ${centerY}`, // Start from center
      `L ${x1} ${y1}`, // Line to outer edge start
      `A ${radius} ${radius} 0 ${largeArcFlag} 1 ${x2} ${y2}`, // Arc to outer edge end
      'Z' // Close path back to center
    ].join(' ');
    
    currentAngle += angle;
    
    return {
      ...item,
      path,
      index
    };
  });

  return (
    <div className={`em-investor-chart ${isFullscreen ? 'em-investor-chart--fullscreen' : ''} ${sidebarCollapsed ? 'em-investor-chart--sidebar-collapsed' : ''}`} ref={chartRef}>
      <div className="em-chart-header">
        <div className="em-chart-title-group">
          <div className="em-chart-title-row">
            <h3 className="em-chart-title">Investor Mix</h3>
             <button 
              className="em-info-icon-investor"
              aria-label="Information"
              type="button"
              title="View chart information"
            >
              <svg width="4" height="11" viewBox="0 0 4 11" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path fillRule="evenodd" clipRule="evenodd" d="M3.28849 2.2312C3.41288 2.01352 3.48285 1.76086 3.48285 1.49265C3.48285 0.668582 2.81426 0 1.9902 0C1.16613 0 0.49755 0.668582 0.49755 1.49265C0.49755 2.31672 1.16613 2.9853 1.9902 2.9853C2.54605 2.9853 3.03194 2.6821 3.28849 2.2312ZM0.995099 3.9804H1.49265H2.48775C3.03777 3.9804 3.48285 4.42547 3.48285 4.9755V5.97059V9.95099C3.48285 10.501 3.03777 10.9461 2.48775 10.9461C1.93772 10.9461 1.49265 10.501 1.49265 9.95099V6.71692C1.49265 6.30489 1.15836 5.97059 0.746324 5.97059C0.334291 5.97059 0 5.6363 0 5.22427V4.9755C0 4.62566 0.18075 4.31663 0.452848 4.13977C0.608332 4.0387 0.794913 3.9804 0.995099 3.9804Z" fill="white"/>
              </svg>
            </button> 
          </div>
          <p className="em-chart-subtitle">Distribution by investor type</p>
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
        <div className="em-donut-container">
          <svg 
            viewBox="0 0 300 240" 
            preserveAspectRatio="xMidYMid meet"
            className="em-donut-svg"
          >
            {/* Background circle for visual depth */}
            <circle
              cx={centerX}
              cy={centerY}
              r={radius + 2}
              fill="none"
              stroke="rgba(0, 0, 0, 0.05)"
              strokeWidth="1"
            />
            
            {segments.map((segment) => (
              <g key={segment.index}>
                <path
                  d={segment.path}
                  fill={segment.color}
                  className="em-donut-segment"
                  onMouseEnter={() => handleSegmentHover(segment.index)}
                  onMouseLeave={handleSegmentLeave}
                  onClick={() => handleSegmentClick(segment.index)}
                  style={{ 
                    cursor: 'pointer',
                    opacity: hoveredSegment === null || hoveredSegment === segment.index ? 1 : 0.4,
                    transform: hoveredSegment === segment.index ? 'scale(1.05)' : 
                              selectedSegment === segment.index ? 'scale(1.03)' : 'scale(1)',
                    transformOrigin: `${centerX}px ${centerY}px`,
                    transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                    filter: hoveredSegment === segment.index ? 'drop-shadow(0 4px 8px rgba(0, 0, 0, 0.15))' : 'none'
                  }}
                />
                
                {/* Selection indicator */}
                {selectedSegment === segment.index && (
                  <circle
                    cx={centerX}
                    cy={centerY}
                    r={radius + 8}
                    fill="none"
                    stroke={segment.color}
                    strokeWidth="2"
                    strokeDasharray="4 2"
                    opacity="0.6"
                    style={{
                      transformOrigin: `${centerX}px ${centerY}px`,
                      animation: 'rotate 20s linear infinite'
                    }}
                  />
                )}
                
                {/* Center text when hovered */}
                {hoveredSegment === segment.index && (
                  <g>
                    <text
                      x={centerX}
                      y={centerY}
                      textAnchor="middle"
                      fontSize="18"
                      fill="white"
                      fontWeight="700"
                      style={{ pointerEvents: 'none', textShadow: '0 1px 2px rgba(0,0,0,0.3)' }}
                    >
                      {segment.label}
                    </text>
                  </g>
                )}
              </g>
            ))}
          </svg>
          
          {/* Tooltips */}
          {segments.map((segment) => renderTooltip(segment.index))}
        </div>

        {/* Legend */}
        <div className="em-investor-legend">
          <div className="em-investor-legend-column">
            {investorData.slice(0, 2).map((item, index) => (
              <div 
                key={index} 
                className={`em-investor-legend-item ${selectedSegment === index ? 'selected' : ''}`}
                onMouseEnter={() => handleSegmentHover(index)}
                onMouseLeave={handleSegmentLeave}
                onClick={() => handleSegmentClick(index)}
                style={{ cursor: 'pointer' }}
              >
                <div 
                  className="em-investor-legend-dot" 
                  style={{ 
                    backgroundColor: item.color,
                    transform: hoveredSegment === index ? 'scale(1.2)' : 'scale(1)',
                    transition: 'transform 0.2s ease'
                  }}
                ></div>
                <div className="em-investor-legend-text">
                  <span 
                    className="em-investor-legend-label"
                    style={{ 
                      fontWeight: hoveredSegment === index ? '600' : '400',
                      color: hoveredSegment === index ? 'var(--text-primary)' : 'var(--text-secondary)'
                    }}
                  >
                    {item.label}
                  </span>
                  <span 
                    className="em-investor-legend-value"
                    style={{ 
                      fontWeight: hoveredSegment === index ? '700' : '600',
                      color: hoveredSegment === index ? item.color : 'var(--text-primary)'
                    }}
                  >
                    {item.value}%
                  </span>
                </div>
              </div>
            ))}
          </div>
          <div className="em-investor-legend-column" style={{ marginTop: '-11px' }}>
            {investorData.slice(2).map((item, index) => (
              <div 
                key={index + 2} 
                className={`em-investor-legend-item ${selectedSegment === index + 2 ? 'selected' : ''}`}
                onMouseEnter={() => handleSegmentHover(index + 2)}
                onMouseLeave={handleSegmentLeave}
                onClick={() => handleSegmentClick(index + 2)}
                style={{ cursor: 'pointer' }}
              >
                <div 
                  className="em-investor-legend-dot" 
                  style={{ 
                    backgroundColor: item.color,
                    transform: hoveredSegment === index + 2 ? 'scale(1.2)' : 'scale(1)',
                    transition: 'transform 0.2s ease'
                  }}
                ></div>
                <div className="em-investor-legend-text">
                  <span 
                    className="em-investor-legend-label"
                    style={{ 
                      fontWeight: hoveredSegment === index + 2 ? '600' : '400',
                      color: hoveredSegment === index + 2 ? 'var(--text-primary)' : 'var(--text-secondary)'
                    }}
                  >
                    {item.label}
                  </span>
                  <span 
                    className="em-investor-legend-value"
                    style={{ 
                      fontWeight: hoveredSegment === index + 2 ? '700' : '600',
                      color: hoveredSegment === index + 2 ? item.color : 'var(--text-primary)'
                    }}
                  >
                    {item.value}%
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
