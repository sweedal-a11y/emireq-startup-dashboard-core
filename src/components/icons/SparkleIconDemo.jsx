import React from 'react';
import SparkleIcon from './SparkleIcon';
import './SparkleIcon.css';

/**
 * SparkleIcon Usage Examples
 * 
 * This component demonstrates various ways to use the SparkleIcon
 */

const SparkleIconDemo = () => {
  return (
    <div style={{ padding: '40px', background: '#f5f5f5' }}>
      <h1>Sparkle Icon Examples</h1>
      
      {/* Basic Usage */}
      <section style={{ marginBottom: '40px' }}>
        <h2>Basic Usage</h2>
        <SparkleIcon />
      </section>

      {/* Different Sizes */}
      <section style={{ marginBottom: '40px' }}>
        <h2>Sizes</h2>
        <div style={{ display: 'flex', gap: '20px', alignItems: 'center' }}>
          <div>
            <p>Small (16px)</p>
            <SparkleIcon size={16} className="sparkle-icon-sm" />
          </div>
          <div>
            <p>Medium (24px)</p>
            <SparkleIcon size={24} className="sparkle-icon-md" />
          </div>
          <div>
            <p>Large (32px)</p>
            <SparkleIcon size={32} className="sparkle-icon-lg" />
          </div>
          <div>
            <p>Extra Large (48px)</p>
            <SparkleIcon size={48} className="sparkle-icon-xl" />
          </div>
        </div>
      </section>

      {/* Different Colors */}
      <section style={{ marginBottom: '40px' }}>
        <h2>Colors</h2>
        <div style={{ display: 'flex', gap: '20px', alignItems: 'center' }}>
          <SparkleIcon color="#FDB022" />
          <SparkleIcon color="#FFD700" />
          <SparkleIcon color="#FF6B6B" />
          <SparkleIcon color="#4ECDC4" />
          <SparkleIcon color="#95E1D3" />
          <SparkleIcon color="#9B59B6" />
        </div>
      </section>

      {/* Animated */}
      <section style={{ marginBottom: '40px' }}>
        <h2>Animated</h2>
        <SparkleIcon 
          size={48} 
          className="sparkle-icon-animated" 
        />
      </section>

      {/* With Custom Styles */}
      <section style={{ marginBottom: '40px' }}>
        <h2>Custom Styles</h2>
        <SparkleIcon 
          size={32}
          style={{
            filter: 'drop-shadow(0 4px 8px rgba(253, 176, 34, 0.5))',
            cursor: 'pointer'
          }}
        />
      </section>

      {/* In Text */}
      <section style={{ marginBottom: '40px' }}>
        <h2>Inline with Text</h2>
        <p style={{ fontSize: '18px', display: 'flex', alignItems: 'center', gap: '8px' }}>
          New features <SparkleIcon size={20} /> available now!
        </p>
      </section>

      {/* Dark Background */}
      <section style={{ marginBottom: '40px' }}>
        <h2>On Dark Background</h2>
        <div style={{ background: '#1a2940', padding: '20px', borderRadius: '8px' }}>
          <SparkleIcon size={48} color="#FFD700" />
        </div>
      </section>
    </div>
  );
};

export default SparkleIconDemo;
