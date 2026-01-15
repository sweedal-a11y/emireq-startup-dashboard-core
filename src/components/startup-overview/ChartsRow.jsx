import React from 'react';
import GrowthOverviewChart from './GrowthOverviewChart';
import InvestorMixChart from './InvestorMixChart';
import './ChartsRow.css';

export default function ChartsRow({ sidebarCollapsed }) {
  return (
    <div className="em-charts-row">
      <GrowthOverviewChart sidebarCollapsed={sidebarCollapsed} />
      <InvestorMixChart sidebarCollapsed={sidebarCollapsed} />
    </div>
  );
}
