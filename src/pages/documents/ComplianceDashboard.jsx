import React, { useState, useEffect, useRef } from 'react';
import './ComplianceDashboard.css';

export default function ComplianceDashboard() {
  const [statusFilter, setStatusFilter] = useState('All');
  const [searchTerm, setSearchTerm] = useState('');
  const [hoveredSegment, setHoveredSegment] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [statusDropdownOpen, setStatusDropdownOpen] = useState(false);
  const recordsPerPage = 4;
  const totalRecords = 15;
  const dropdownRef = useRef(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setStatusDropdownOpen(false);
      }
    };

    if (statusDropdownOpen) {
      document.addEventListener('mousedown', handleClickOutside);
      return () => document.removeEventListener('mousedown', handleClickOutside);
    }
  }, [statusDropdownOpen]);

  // Handle metric card clicks
  const handleMetricClick = (metricTitle) => {
    // Filter documents based on the metric clicked
    switch (metricTitle) {
      case 'Total Documents':
        setStatusFilter('All');
        break;
      case 'Compliances Up To Date':
        setStatusFilter('Approved');
        break;
      case 'Pending Reviews':
        setStatusFilter('In Review');
        break;
      case 'Expiring Soon':
        setStatusFilter('Pending');
        break;
      default:
        setStatusFilter('All');
    }
  };

  // Handle keyboard navigation for metric cards
  const handleMetricKeyPress = (event, metricTitle) => {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      handleMetricClick(metricTitle);
    }
  };

  // Handle legend item click
  const handleLegendClick = (label) => {
    const statusMap = {
      'Approved': 'Approved',
      'In Review': 'In Review',
      'Pending': 'Pending',
      'Non-Compliant': 'Pending'
    };
    setStatusFilter(statusMap[label] || 'All');
  };

  // Handle legend item hover
  const handleLegendHover = (label) => {
    setHoveredSegment(label);
  };

  // Handle legend item leave
  const handleLegendLeave = () => {
    setHoveredSegment(null);
  };

  // Handle donut segment hover
  const handleSegmentHover = (label) => {
    setHoveredSegment(label);
  };

  // Handle donut segment leave
  const handleSegmentLeave = () => {
    setHoveredSegment(null);
  };

  // Mock data
  const metrics = [
    {
      title: 'Total Documents',
      value: '7',
      subtext: '+4 this week',
      icon: 'document',
      bgColor: '#3B82F6'
    },
    {
      title: 'Compliances Up To Date',
      value: '4',
      subtext: '3 upcoming this week',
      icon: 'check',
      bgColor: '#10B981'
    },
    {
      title: 'Pending Reviews',
      value: '2',
      subtext: 'Needs attention',
      icon: 'clock',
      bgColor: '#F59E0B'
    },
    {
      title: 'Expiring Soon',
      value: '1',
      subtext: 'Requires action',
      icon: 'alert',
      bgColor: '#EF4444'
    }
  ];

  const complianceData = [
    { label: 'Approved', value: 31, percentage: 78, color: '#10B981' },
    { label: 'In Review', value: 6, percentage: 15, color: '#3B82F6' },
    { label: 'Pending', value: 2, percentage: 5, color: '#F59E0B' },
    { label: 'Non-Compliant', value: 1, percentage: 2, color: '#EF4444' }
  ];

  const deadlines = [
    {
      title: 'Tax Compliance Review',
      date: 'Jan 15, 2026',
      category: 'Financial',
      status: 'Pending'
    },
    {
      title: 'GDPR Audit',
      date: 'Jan 20, 2026',
      category: 'Data Privacy',
      status: 'In Review'
    },
    {
      title: 'Insurance Renewal',
      date: 'Jan 25, 2026',
      category: 'Legal',
      status: 'Non-Compliant'
    }
  ];

  const allRecords = [
    {
      id: 1,
      startup: 'Certificate of Incorporation',
      type: 'Legal',
      reviewDate: '2025-09-15',
      reviewer: 'Legal Team',
      status: 'Approved'
    },
    {
      id: 2,
      startup: 'Trade License',
      type: 'Legal',
      reviewDate: '2025-09-30',
      reviewer: 'Compliance Officer',
      status: 'In Review'
    },
    {
      id: 3,
      startup: 'GST Registration',
      type: 'Financial',
      reviewDate: '2025-10-15',
      reviewer: 'Finance Director',
      status: 'Pending'
    },
    {
      id: 4,
      startup: 'Shareholder Agreement',
      type: 'Legal',
      reviewDate: '2025-10-15',
      reviewer: 'Legal Dept.',
      status: 'Non-Compliant'
    },
    {
      id: 5,
      startup: 'Tax Registration',
      type: 'Financial',
      reviewDate: '2025-11-01',
      reviewer: 'Tax Advisor',
      status: 'Approved'
    },
    {
      id: 6,
      startup: 'Privacy Policy',
      type: 'Legal',
      reviewDate: '2025-11-10',
      reviewer: 'Legal Team',
      status: 'In Review'
    },
    {
      id: 7,
      startup: 'Employee Contracts',
      type: 'HR',
      reviewDate: '2025-11-15',
      reviewer: 'HR Director',
      status: 'Approved'
    },
    {
      id: 8,
      startup: 'Insurance Policy',
      type: 'Financial',
      reviewDate: '2025-11-20',
      reviewer: 'Insurance Broker',
      status: 'Pending'
    },
    {
      id: 9,
      startup: 'Lease Agreement',
      type: 'Legal',
      reviewDate: '2025-11-25',
      reviewer: 'Legal Dept.',
      status: 'Approved'
    },
    {
      id: 10,
      startup: 'Bank Statements',
      type: 'Financial',
      reviewDate: '2025-12-01',
      reviewer: 'Finance Director',
      status: 'In Review'
    },
    {
      id: 11,
      startup: 'Trademark Registration',
      type: 'Legal',
      reviewDate: '2025-12-05',
      reviewer: 'IP Lawyer',
      status: 'Pending'
    },
    {
      id: 12,
      startup: 'Annual Report',
      type: 'Financial',
      reviewDate: '2025-12-10',
      reviewer: 'CFO',
      status: 'Approved'
    },
    {
      id: 13,
      startup: 'Data Protection Agreement',
      type: 'Legal',
      reviewDate: '2025-12-15',
      reviewer: 'Compliance Officer',
      status: 'Non-Compliant'
    },
    {
      id: 14,
      startup: 'Vendor Contracts',
      type: 'Legal',
      reviewDate: '2025-12-20',
      reviewer: 'Procurement Team',
      status: 'In Review'
    },
    {
      id: 15,
      startup: 'Audit Report',
      type: 'Financial',
      reviewDate: '2025-12-25',
      reviewer: 'External Auditor',
      status: 'Approved'
    }
  ];

  // Filter records based on search and status
  const filteredRecords = allRecords.filter(record => {
    const matchesSearch = record.startup.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         record.type.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         record.reviewer.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'All' || record.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  // Paginate records
  const indexOfLastRecord = currentPage * recordsPerPage;
  const indexOfFirstRecord = indexOfLastRecord - recordsPerPage;
  const currentRecords = filteredRecords.slice(indexOfFirstRecord, indexOfLastRecord);
  const totalPages = Math.ceil(filteredRecords.length / recordsPerPage);

  const insights = [
    {
      type: 'warning',
      message: 'Your Trade License expires on 12-Dec-2025 — renewal recommended',
      cta: 'Start Renewal'
    },
    {
      type: 'info',
      message: 'Missing Board Meeting Minutes for Q4 2025 — upload before audit',
      cta: 'Upload Now'
    },
    {
      type: 'success',
      message: 'Investor Agreement pending one digital signature — initiate via Emireq Sign',
      cta: 'Sign Now'
    },
    {
      type: 'reminder',
      message: 'Tax Filing Window opens on Nov 17th 2025 — Learn auto-reminders',
      cta: 'Set Reminder'
    }
  ];

  const getStatusColor = (status) => {
    switch (status) {
      case 'Approved': return '#10B981';
      case 'In Review': return '#3B82F6';
      case 'Pending': return '#F59E0B';
      case 'Non-Compliant': return '#EF4444';
      default: return '#6B7280';
    }
  };

  const getInsightColor = (type) => {
    switch (type) {
      case 'warning': return '#F59E0B';
      case 'info': return '#3B82F6';
      case 'success': return '#10B981';
      case 'reminder': return '#8B5CF6';
      default: return '#6B7280';
    }
  };

  return (
    <div className="compliance-dashboard">
      {/* Top Metric Cards */}
      <div className="metric-cards-row">
        {metrics.map((metric, index) => (
          <div 
            key={index} 
            className="metric-card"
            role="button"
            tabIndex={0}
            aria-label={`${metric.title}: ${metric.value}, ${metric.subtext}`}
            onClick={() => handleMetricClick(metric.title)}
            onKeyPress={(e) => handleMetricKeyPress(e, metric.title)}
          >
            <div className="metric-card-icon-wrapper" style={{ backgroundColor: metric.bgColor }}>
              {metric.icon === 'document' && (
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M14 2H6C4.89543 2 4 2.89543 4 4V20C4 21.1046 4.89543 22 6 22H18C19.1046 22 20 21.1046 20 20V8L14 2Z" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M14 2V8H20" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M16 13H8" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M16 17H8" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M10 9H8" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              )}
              {metric.icon === 'check' && (
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M9 12L11 14L15 10M21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12Z" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              )}
              {metric.icon === 'clock' && (
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <circle cx="12" cy="12" r="10" stroke="white" strokeWidth="2"/>
                  <path d="M12 6V12L16 14" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              )}
              {metric.icon === 'alert' && (
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M12 9V11M12 15H12.01M10.29 3.86L1.82 18C1.64537 18.3024 1.55296 18.6453 1.55199 18.9945C1.55101 19.3437 1.64151 19.6871 1.81445 19.9905C1.98738 20.2939 2.23675 20.5467 2.53773 20.7239C2.83872 20.901 3.18082 20.9962 3.53 21H20.47C20.8192 20.9962 21.1613 20.901 21.4623 20.7239C21.7633 20.5467 22.0126 20.2939 22.1856 19.9905C22.3585 19.6871 22.449 19.3437 22.448 18.9945C22.447 18.6453 22.3546 18.3024 22.18 18L13.71 3.86C13.5317 3.56611 13.2807 3.32312 12.9812 3.15448C12.6817 2.98585 12.3437 2.89725 12 2.89725C11.6563 2.89725 11.3183 2.98585 11.0188 3.15448C10.7193 3.32312 10.4683 3.56611 10.29 3.86Z" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              )}
            </div>
            <div className="metric-card-title">{metric.title}</div>
            <div className="metric-card-value">{metric.value}</div>
            <div className="metric-card-subtext">{metric.subtext}</div>
          </div>
        ))}
      </div>

      {/* Compliance Status and Upcoming Deadlines */}
      <div className="status-deadlines-row">
        <div className="compliance-status-card">
          <div className="compliance-card-header">
            <div className="compliance-header-left">
              <div className="compliance-title-wrapper">
                <h3 className="compliance-card-title">Compliance Status</h3>
                <button 
              className="em-info-icon-comp-status"
              aria-label="Information"
              type="button"
              title="View chart information"
            >
              <svg width="4" height="11" viewBox="0 0 4 11" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path fillRule="evenodd" clipRule="evenodd" d="M3.28849 2.2312C3.41288 2.01352 3.48285 1.76086 3.48285 1.49265C3.48285 0.668582 2.81426 0 1.9902 0C1.16613 0 0.49755 0.668582 0.49755 1.49265C0.49755 2.31672 1.16613 2.9853 1.9902 2.9853C2.54605 2.9853 3.03194 2.6821 3.28849 2.2312ZM0.995099 3.9804H1.49265H2.48775C3.03777 3.9804 3.48285 4.42547 3.48285 4.9755V5.97059V9.95099C3.48285 10.501 3.03777 10.9461 2.48775 10.9461C1.93772 10.9461 1.49265 10.501 1.49265 9.95099V6.71692C1.49265 6.30489 1.15836 5.97059 0.746324 5.97059C0.334291 5.97059 0 5.6363 0 5.22427V4.9755C0 4.62566 0.18075 4.31663 0.452848 4.13977C0.608332 4.0387 0.794913 3.9804 0.995099 3.9804Z" fill="white"/>
              </svg>
            </button>
              </div>
              <p className="compliance-card-subtitle">Current status breakdown</p>
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
          <div className="compliance-chart-content">
            <div className="compliance-donut-chart">
              <svg width="233" height="233" viewBox="0 0 233 233" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path 
                  className={`donut-segment ${hoveredSegment === 'Approved' ? 'hovered' : ''}`}
                  d="M212.96 116.16C212.96 96.8137 207.163 77.9108 196.316 61.8905C185.47 45.8703 170.071 33.4677 152.108 26.283C134.145 19.0982 114.441 17.4609 95.5386 21.5824C76.636 25.7038 59.402 35.3949 46.0601 49.4052C32.7182 63.4156 23.8806 81.1024 20.6875 100.184C17.4944 119.265 20.0922 138.866 28.1459 156.456C36.1995 174.047 49.3395 188.821 65.8705 198.872C82.4015 208.923 101.565 213.79 120.889 212.845L119.706 188.674C105.214 189.383 90.8411 185.732 78.4428 178.194C66.0446 170.656 56.1896 159.575 50.1494 146.382C44.1091 133.189 42.1607 118.489 44.5556 104.178C46.9504 89.8669 53.5786 76.6018 63.585 66.094C73.5915 55.5862 86.5169 48.318 100.694 45.2269C114.871 42.1358 129.649 43.3638 143.121 48.7523C156.594 54.1409 168.142 63.4428 176.277 75.458C184.412 87.4732 188.76 101.65 188.76 116.16H212.96Z" 
                  fill="#10B981" 
                  stroke="white" 
                  strokeWidth="1.21"
                  onMouseEnter={() => handleSegmentHover('Approved')}
                  onMouseLeave={handleSegmentLeave}
                  onClick={() => handleLegendClick('Approved')}
                  style={{ cursor: 'pointer' }}
                />
                <path 
                  className={`donut-segment ${hoveredSegment === 'In Review' ? 'hovered' : ''}`}
                  d="M124.26 212.62C139.141 211.371 153.531 206.695 166.305 198.959C179.078 191.223 189.889 180.637 197.891 168.028L177.458 155.061C171.457 164.518 163.349 172.457 153.769 178.259C144.188 184.061 133.396 187.568 122.235 188.505L124.26 212.62Z" 
                  fill="#3B82F6" 
                  stroke="white" 
                  strokeWidth="1.21"
                  onMouseEnter={() => handleSegmentHover('In Review')}
                  onMouseLeave={handleSegmentLeave}
                  onClick={() => handleLegendClick('In Review')}
                  style={{ cursor: 'pointer' }}
                />
                <path 
                  className={`donut-segment ${hoveredSegment === 'Pending' ? 'hovered' : ''}`}
                  d="M199.651 165.144C204.677 156.579 208.354 147.29 210.554 137.606L186.956 132.245C185.306 139.508 182.548 146.474 178.778 152.898L199.651 165.144Z" 
                  fill="#F59E0B" 
                  stroke="white" 
                  strokeWidth="1.21"
                  onMouseEnter={() => handleSegmentHover('Pending')}
                  onMouseLeave={handleSegmentLeave}
                  onClick={() => handleLegendClick('Pending')}
                  style={{ cursor: 'pointer' }}
                />
                <path 
                  className={`donut-segment ${hoveredSegment === 'Non-Compliant' ? 'hovered' : ''}`}
                  d="M211.245 134.299C212.174 129.429 212.728 124.494 212.901 119.539L188.716 118.694C188.586 122.411 188.171 126.112 187.474 129.765L211.245 134.299Z" 
                  fill="#E7000B" 
                  stroke="white" 
                  strokeWidth="1.21"
                  onMouseEnter={() => handleSegmentHover('Non-Compliant')}
                  onMouseLeave={handleSegmentLeave}
                  onClick={() => handleLegendClick('Non-Compliant')}
                  style={{ cursor: 'pointer' }}
                />
              </svg>
              <div className="compliance-chart-center">
                <div className="compliance-chart-total">40</div>
                <div className="compliance-chart-label">Total</div>
              </div>
            </div>
            <div className="compliance-chart-legend">
              {complianceData.map((item, index) => (
                <div 
                  key={index} 
                  className={`compliance-legend-item ${hoveredSegment === item.label ? 'hovered' : ''}`}
                  onMouseEnter={() => handleLegendHover(item.label)}
                  onMouseLeave={handleLegendLeave}
                  onClick={() => handleLegendClick(item.label)}
                  style={{ cursor: 'pointer' }}
                  role="button"
                  tabIndex={0}
                  aria-label={`${item.label}: ${item.value} items, ${item.percentage}%`}
                >
                  <div className="compliance-legend-color" style={{ backgroundColor: item.color }}></div>
                  <span className="compliance-legend-label">{item.label}</span>
                  <span className="compliance-legend-value">{item.value} <span className="compliance-legend-percentage">({item.percentage}%)</span></span>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="upcoming-deadlines-card">
          <div className="deadlines-header">
            <div className="deadlines-title-wrapper">
              <h3 className="deadlines-card-title">Upcoming Compliance Deadlines</h3>
             <button 
              className="em-info-icon-deadlines"
              aria-label="Information"
              type="button"
              title="View chart information"
            >
              <svg width="4" height="11" viewBox="0 0 4 11" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path fillRule="evenodd" clipRule="evenodd" d="M3.28849 2.2312C3.41288 2.01352 3.48285 1.76086 3.48285 1.49265C3.48285 0.668582 2.81426 0 1.9902 0C1.16613 0 0.49755 0.668582 0.49755 1.49265C0.49755 2.31672 1.16613 2.9853 1.9902 2.9853C2.54605 2.9853 3.03194 2.6821 3.28849 2.2312ZM0.995099 3.9804H1.49265H2.48775C3.03777 3.9804 3.48285 4.42547 3.48285 4.9755V5.97059V9.95099C3.48285 10.501 3.03777 10.9461 2.48775 10.9461C1.93772 10.9461 1.49265 10.501 1.49265 9.95099V6.71692C1.49265 6.30489 1.15836 5.97059 0.746324 5.97059C0.334291 5.97059 0 5.6363 0 5.22427V4.9755C0 4.62566 0.18075 4.31663 0.452848 4.13977C0.608332 4.0387 0.794913 3.9804 0.995099 3.9804Z" fill="white"/>
              </svg>
            </button>
            </div>
            <div className="deadlines-notification-badge">3</div>
          </div>
          <div className="deadlines-list">
            {deadlines.map((deadline, index) => (
              <div key={index} className="deadline-item" role="button" tabIndex={0}>
                <div className="deadline-content">
                  <h4 className="deadline-title">{deadline.title}</h4>
                  <div className="deadline-date-wrapper">
                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M5 1.33334V3.33334M11 1.33334V3.33334M2.33333 5.66667H13.6667M3 2.66667H13C13.3682 2.66667 13.6667 2.96514 13.6667 3.33334V13.3333C13.6667 13.7015 13.3682 14 13 14H3C2.63181 14 2.33333 13.7015 2.33333 13.3333V3.33334C2.33333 2.96514 2.63181 2.66667 3 2.66667Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                    <span className="deadline-date">{deadline.date}</span>
                  </div>
                  <span className="deadline-category-pill">{deadline.category}</span>
                </div>
                <div className="deadline-status-wrapper">
                  <span className={`deadline-status-badge status-${deadline.status.toLowerCase().replace(/\s/g, '-')}`}>{deadline.status}</span>
                </div>
              </div>
            ))}
          </div>
          <button className="view-all-deadlines-btn">
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M6.25 2.5V5M13.75 2.5V5M2.5 7.5H17.5M3.75 3.75H16.25C16.9404 3.75 17.5 4.30964 17.5 5V16.25C17.5 16.9404 16.9404 17.5 16.25 17.5H3.75C3.05964 17.5 2.5 16.9404 2.5 16.25V5C2.5 4.30964 3.05964 3.75 3.75 3.75Z" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            View All Deadlines
          </button>
        </div>
      </div>












      {/* Compliance Records Table */}
      <div className="compliance-records-section">
        <div className="records-header">
          <div className="records-header-content">
            <h3 className="records-title">Compliance Records</h3>
             <button 
              className="em-info-icon-deadlines"
              aria-label="Information"
              type="button"
              title="View chart information"
            >
              <svg width="4" height="11" viewBox="0 0 4 11" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path fillRule="evenodd" clipRule="evenodd" d="M3.28849 2.2312C3.41288 2.01352 3.48285 1.76086 3.48285 1.49265C3.48285 0.668582 2.81426 0 1.9902 0C1.16613 0 0.49755 0.668582 0.49755 1.49265C0.49755 2.31672 1.16613 2.9853 1.9902 2.9853C2.54605 2.9853 3.03194 2.6821 3.28849 2.2312ZM0.995099 3.9804H1.49265H2.48775C3.03777 3.9804 3.48285 4.42547 3.48285 4.9755V5.97059V9.95099C3.48285 10.501 3.03777 10.9461 2.48775 10.9461C1.93772 10.9461 1.49265 10.501 1.49265 9.95099V6.71692C1.49265 6.30489 1.15836 5.97059 0.746324 5.97059C0.334291 5.97059 0 5.6363 0 5.22427V4.9755C0 4.62566 0.18075 4.31663 0.452848 4.13977C0.608332 4.0387 0.794913 3.9804 0.995099 3.9804Z" fill="white"/>
              </svg>
            </button>
          </div>
          <p className="records-subtitle">Detailed history of compliance document reviews</p>
        </div>

        <div className="records-filters">
          <div className="status-filter-wrapper" ref={dropdownRef}>
            <button 
              className="status-filter-button"
              onClick={() => setStatusDropdownOpen(!statusDropdownOpen)}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault();
                  setStatusDropdownOpen(!statusDropdownOpen);
                } else if (e.key === 'Escape') {
                  setStatusDropdownOpen(false);
                }
              }}
              aria-label="Filter by status"
              aria-expanded={statusDropdownOpen}
              aria-haspopup="true"
            >
              <span className="filter-label">Status</span>
              <svg width="12" height="8" viewBox="0 0 12 8" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M1 1.5L6 6.5L11 1.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </button>
            {statusDropdownOpen && (
              <div className="status-dropdown" role="menu">
                <button 
                  onClick={() => { setStatusFilter('All'); setStatusDropdownOpen(false); setCurrentPage(1); }} 
                  className={statusFilter === 'All' ? 'active' : ''}
                  role="menuitem"
                  onKeyDown={(e) => e.key === 'Escape' && setStatusDropdownOpen(false)}
                >
                  All Status
                </button>
                <button 
                  onClick={() => { setStatusFilter('Approved'); setStatusDropdownOpen(false); setCurrentPage(1); }} 
                  className={statusFilter === 'Approved' ? 'active' : ''}
                  role="menuitem"
                  onKeyDown={(e) => e.key === 'Escape' && setStatusDropdownOpen(false)}
                >
                  Approved
                </button>
                <button 
                  onClick={() => { setStatusFilter('In Review'); setStatusDropdownOpen(false); setCurrentPage(1); }} 
                  className={statusFilter === 'In Review' ? 'active' : ''}
                  role="menuitem"
                  onKeyDown={(e) => e.key === 'Escape' && setStatusDropdownOpen(false)}
                >
                  In Review
                </button>
                <button 
                  onClick={() => { setStatusFilter('Pending'); setStatusDropdownOpen(false); setCurrentPage(1); }} 
                  className={statusFilter === 'Pending' ? 'active' : ''}
                  role="menuitem"
                  onKeyDown={(e) => e.key === 'Escape' && setStatusDropdownOpen(false)}
                >
                  Pending
                </button>
                <button 
                  onClick={() => { setStatusFilter('Non-Compliant'); setStatusDropdownOpen(false); setCurrentPage(1); }} 
                  className={statusFilter === 'Non-Compliant' ? 'active' : ''}
                  role="menuitem"
                  onKeyDown={(e) => e.key === 'Escape' && setStatusDropdownOpen(false)}
                >
                  Non-Compliant
                </button>
              </div>
            )}
          </div>
          
          <div className="search-wrapper">
            
            <input
              type="text"
              className="search-input"
              placeholder="Search"
              value={searchTerm}
              onChange={(e) => { setSearchTerm(e.target.value); setCurrentPage(1); }}
              aria-label="Search records"
            />
          </div>
        </div>

        <div className="records-table-container">
          <table className="records-table">
            <thead>
              <tr>
                <th className="col-startup">STARTUP</th>
                <th className="col-type">TYPE</th>
                <th className="col-review-date">REVIEW DATE</th>
                <th className="col-reviewer">REVIEWER</th>
                <th className="col-status">STATUS</th>
                <th className="col-actions">ACTIONS</th>
              </tr>
            </thead>
            <tbody>
              {currentRecords.map((record) => (
                <tr key={record.id}>
                  <td className="col-startup">
                    <div className="startup-cell">
                      <div className="document-icon">
                        <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path d="M11.6667 1.66667H5.00001C4.55798 1.66667 4.13406 1.84226 3.8215 2.15482C3.50894 2.46738 3.33334 2.89131 3.33334 3.33334V16.6667C3.33334 17.1087 3.50894 17.5326 3.8215 17.8452C4.13406 18.1577 4.55798 18.3333 5.00001 18.3333H15C15.442 18.3333 15.866 18.1577 16.1785 17.8452C16.4911 17.5326 16.6667 17.1087 16.6667 16.6667V6.66667L11.6667 1.66667Z" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                          <path d="M11.6667 1.66667V6.66667H16.6667" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                          <path d="M13.3333 10.8333H6.66666" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                          <path d="M13.3333 14.1667H6.66666" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                          <path d="M8.33334 7.5H7.50001H6.66668" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                      </div>
                      <span className="startup-name">{record.startup}</span>
                    </div>
                  </td>
                  <td className="col-type">{record.type}</td>
                  <td className="col-review-date">{record.reviewDate}</td>
                  <td className="col-reviewer">{record.reviewer}</td>
                  <td className="col-status">
                    <span className={`status-badge status-${record.status.toLowerCase().replace(/\s/g, '-')}`}>
                      {record.status}
                    </span>
                  </td>
                  <td className="col-actions">
                    <button className="actions-button" aria-label="More actions">
                      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M6 10.1504C6.50986 10.1504 6.94252 10.3302 7.30664 10.6943C7.67076 11.0585 7.85023 11.4909 7.84961 12L7.8418 12.1875C7.8024 12.617 7.6243 12.988 7.30566 13.3066C6.94155 13.6708 6.50908 13.8502 6 13.8496C5.49014 13.8496 5.05748 13.6698 4.69336 13.3057C4.32924 12.9415 4.14977 12.5091 4.15039 12C4.15039 11.4901 4.33022 11.0575 4.69434 10.6934C5.01294 10.3748 5.38368 10.1971 5.8125 10.1582L6 10.1504ZM12 10.1504C12.5099 10.1504 12.9425 10.3302 13.3066 10.6943C13.6708 11.0585 13.8502 11.4909 13.8496 12L13.8418 12.1875C13.8024 12.617 13.6243 12.988 13.3057 13.3066C12.9415 13.6708 12.5091 13.8502 12 13.8496C11.4901 13.8496 11.0575 13.6698 10.6934 13.3057C10.3292 12.9415 10.1498 12.5091 10.1504 12C10.1504 11.4901 10.3302 11.0575 10.6943 10.6934C11.0129 10.3748 11.3837 10.1971 11.8125 10.1582L12 10.1504ZM18 10.1504C18.5099 10.1504 18.9425 10.3302 19.3066 10.6943C19.6708 11.0585 19.8502 11.4909 19.8496 12L19.8418 12.1875C19.8024 12.617 19.6243 12.988 19.3057 13.3066C18.9415 13.6708 18.5091 13.8502 18 13.8496C17.4901 13.8496 17.0575 13.6698 16.6934 13.3057C16.3292 12.9415 16.1498 12.5091 16.1504 12C16.1504 11.4901 16.3302 11.0575 16.6943 10.6934C17.0129 10.3748 17.3837 10.1971 17.8125 10.1582L18 10.1504Z" fill="currentColor" stroke="white" strokeWidth="0.3"/>
                      </svg>
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="records-footer">
          <div className="records-count">
            Showing <span className="count-highlight">{String(recordsPerPage).padStart(2, '0')}</span> / {totalRecords} Results
          </div>
          
          <div className="pagination">
            <button 
              className="pagination-arrow"
              onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
              disabled={currentPage === 1}
              aria-label="Previous page"
            >
              <svg width="8" height="12" viewBox="0 0 8 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M6.5 1L1.5 6L6.5 11" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </button>
            
            {[...Array(Math.min(3, totalPages))].map((_, i) => {
              let pageNum;
              if (totalPages <= 3) {
                pageNum = i + 1;
              } else if (currentPage === 1) {
                pageNum = i + 1;
              } else if (currentPage === totalPages) {
                pageNum = totalPages - 2 + i;
              } else {
                pageNum = currentPage - 1 + i;
              }
              
              return (
                <button
                  key={pageNum}
                  className={`pagination-number ${currentPage === pageNum ? 'active' : ''}`}
                  onClick={() => setCurrentPage(pageNum)}
                  aria-label={`Page ${pageNum}`}
                  aria-current={currentPage === pageNum ? 'page' : undefined}
                >
                  {pageNum}
                </button>
              );
            })}
            
            {totalPages > 4 && currentPage < totalPages - 1 && (
              <span className="pagination-ellipsis">...</span>
            )}
            
            {totalPages > 3 && currentPage < totalPages - 1 && (
              <button
                className="pagination-number"
                onClick={() => setCurrentPage(totalPages)}
                aria-label={`Page ${totalPages}`}
              >
                {totalPages}
              </button>
            )}
            
            <button 
              className="pagination-arrow"
              onClick={() => setCurrentPage(prev => Math.min(totalPages, prev + 1))}
              disabled={currentPage === totalPages}
              aria-label="Next page"
            >
              <svg width="8" height="12" viewBox="0 0 8 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M1.5 11L6.5 6L1.5 1" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </button>
          </div>
        </div>

        <div className="records-disclaimer">
          Market data is updated in real-time. Prices are for reference only and may vary across exchanges.
        </div>
      </div>

      {/* Smart Insights */}
      <div className="smart-insights-section">
        <div className="insights-header">
          <div className="insights-header-content">
            <svg className="insights-sparkle-icon" width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M8.28086 12.9167C8.20647 12.6283 8.05615 12.3651 7.84555 12.1545C7.63494 11.9439 7.37176 11.7936 7.08336 11.7192L1.97086 10.4009C1.88364 10.3761 1.80687 10.3236 1.75221 10.2512C1.69754 10.1789 1.66797 10.0907 1.66797 10C1.66797 9.90938 1.69754 9.82118 1.75221 9.74884C1.80687 9.6765 1.88364 9.62397 1.97086 9.59921L7.08336 8.28005C7.37166 8.20572 7.63477 8.05552 7.84537 7.84508C8.05596 7.63463 8.20634 7.37162 8.28086 7.08338L9.5992 1.97088C9.6237 1.88331 9.67618 1.80616 9.74863 1.75121C9.82108 1.69625 9.90951 1.6665 10.0004 1.6665C10.0914 1.6665 10.1798 1.69625 10.2523 1.75121C10.3247 1.80616 10.3772 1.88331 10.4017 1.97088L11.7192 7.08338C11.7936 7.37177 11.9439 7.63496 12.1545 7.84556C12.3651 8.05616 12.6283 8.20648 12.9167 8.28088L18.0292 9.59838C18.1171 9.62263 18.1946 9.67505 18.2499 9.74761C18.3052 9.82017 18.3351 9.90885 18.3351 10C18.3351 10.0912 18.3052 10.1799 18.2499 10.2525C18.1946 10.325 18.1171 10.3775 18.0292 10.4017L12.9167 11.7192C12.6283 11.7936 12.3651 11.9439 12.1545 12.1545C11.9439 12.3651 11.7936 12.6283 11.7192 12.9167L10.4009 18.0292C10.3764 18.1168 10.3239 18.1939 10.2514 18.2489C10.179 18.3038 10.0905 18.3336 9.99961 18.3336C9.90868 18.3336 9.82025 18.3038 9.7478 18.2489C9.67535 18.1939 9.62287 18.1168 9.59836 18.0292L8.28086 12.9167Z" stroke="#155DFC" strokeWidth="1.66667" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M16.6666 2.5V5.83333" stroke="#155DFC" strokeWidth="1.66667" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M18.3333 4.16675H15" stroke="#155DFC" strokeWidth="1.66667" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M3.33337 14.1667V15.8334" stroke="#155DFC" strokeWidth="1.66667" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M4.16667 15H2.5" stroke="#155DFC" strokeWidth="1.66667" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            <h3 className="insights-title">Smart Insights (AI-Powered)</h3>
          </div>
          <p className="insights-subtitle">Actionable recommendations based on your investor engagement data</p>
        </div>

        <div className="insights-cards-container">
          {insights.map((insight, index) => {
            const getInsightIconAndBg = (type) => {
              switch (type) {
                case 'warning':
                  return {
                    bgColor: '#FEF3C7',
                    iconBg: '#FEF3C7',
                    icon: (
                      <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
<rect width="40" height="40" rx="13.3333" fill="#E17100" fill-opacity="0.12"/>
<path d="M29.7301 26L21.7301 12C21.5556 11.6922 21.3027 11.4362 20.997 11.258C20.6913 11.0799 20.3438 10.9861 19.9901 10.9861C19.6363 10.9861 19.2888 11.0799 18.9831 11.258C18.6774 11.4362 18.4245 11.6922 18.2501 12L10.2501 26C10.0737 26.3053 9.98128 26.6519 9.98206 27.0045C9.98284 27.3571 10.0768 27.7032 10.2545 28.0078C10.4322 28.3124 10.6872 28.5646 10.9937 28.7388C11.3003 28.9131 11.6475 29.0032 12.0001 29H28.0001C28.351 28.9996 28.6956 28.9069 28.9993 28.7313C29.3031 28.5556 29.5553 28.3031 29.7306 27.9991C29.9059 27.6951 29.9981 27.3504 29.998 26.9995C29.9979 26.6486 29.9055 26.3039 29.7301 26Z" stroke="#E17100" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M20 17V21" stroke="#E17100" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M20 25H20.01" stroke="#E17100" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
</svg>

                    )
                  };
                case 'info':
                  return {
                    bgColor: '#DBEAFE',
                    iconBg: '#DBEAFE',
                    icon: (
                      <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
<rect width="40" height="40" rx="13.3333" fill="#155DFC" fill-opacity="0.12"/>
<path d="M19.9999 31.1109C26.1364 31.1109 31.111 26.1363 31.111 19.9998C31.111 13.8633 26.1364 8.88867 19.9999 8.88867C13.8634 8.88867 8.88879 13.8633 8.88879 19.9998C8.88879 26.1363 13.8634 31.1109 19.9999 31.1109Z" stroke="#155DFC" stroke-width="2.22222" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M20 24.4444V20" stroke="#155DFC" stroke-width="2.22222" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M20 15.5554H20.0111" stroke="#155DFC" stroke-width="2.22222" stroke-linecap="round" stroke-linejoin="round"/>
</svg>

                    )
                  };
                case 'success':
                  return {
                    bgColor: '#D1FAE5',
                    iconBg: '#D1FAE5',
                    icon: (
                     <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
<rect width="40" height="40" rx="13.3333" fill="#00B031" fill-opacity="0.12"/>
<path d="M19.9999 31.1109C26.1364 31.1109 31.111 26.1363 31.111 19.9998C31.111 13.8633 26.1364 8.88867 19.9999 8.88867C13.8634 8.88867 8.88879 13.8633 8.88879 19.9998C8.88879 26.1363 13.8634 31.1109 19.9999 31.1109Z" stroke="#00B031" stroke-width="2.22222" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M16.6666 20.0001L18.8888 22.2223L23.3333 17.7778" stroke="#00B031" stroke-width="2.22222" stroke-linecap="round" stroke-linejoin="round"/>
</svg>

                    )
                  };
                case 'reminder':
                  return {
                    bgColor: '#EDE9FE',
                    iconBg: '#EDE9FE',
                    icon: (
                      <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
<rect width="40" height="40" rx="8" fill="#9810FA" fill-opacity="0.12"/>
<path d="M19.9999 31.1109C26.1364 31.1109 31.111 26.1363 31.111 19.9998C31.111 13.8633 26.1364 8.88867 19.9999 8.88867C13.8634 8.88867 8.88879 13.8633 8.88879 19.9998C8.88879 26.1363 13.8634 31.1109 19.9999 31.1109Z" stroke="#9810FA" stroke-width="2.22222" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M20 24.4444V20" stroke="#9810FA" stroke-width="2.22222" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M20 15.5554H20.0111" stroke="#9810FA" stroke-width="2.22222" stroke-linecap="round" stroke-linejoin="round"/>
</svg>

                    )
                  };
                default:
                  return { bgColor: '#F3F4F6', iconBg: '#F3F4F6', icon: null };
              }
            };

            const { bgColor, iconBg, icon } = getInsightIconAndBg(insight.type);

            return (
              <div 
                key={index} 
                className="insight-card-new"
                style={{ backgroundColor: bgColor }}
                role="article"
                tabIndex={0}
              >
                <div className="insight-icon-wrapper" style={{ backgroundColor: iconBg }}>
                  {icon}
                </div>
                <div className="insight-text-content">
                  <p className="insight-message-new">{insight.message}</p>
                  <button className="insight-cta-new">
                    {insight.cta}
                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M6 12L10 8L6 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}