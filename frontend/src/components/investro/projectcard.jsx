import React from 'react';

const ProjectCard = ({ project }) => {
  // Logic to determine if project is "On Time" based on our schema
  const isDelay = new Date(project.handoverData?.actualDate) > new Date(project.handoverData?.plannedDate);

  return (
    <div style={cardStyle}>
      {/* Verification Badge */}
      <div style={badgeContainer}>
        {project.legalStatus?.rajukApprovalNo ? (
          <span style={verifiedBadge}>✓ RAJUK APPROVED</span>
        ) : (
          <span style={pendingBadge}>PENDING VERIFICATION</span>
        )}
      </div>

      <h3 style={{ margin: '10px 0' }}>{project.title}</h3>
      <p style={{ color: '#666', fontSize: '0.9rem' }}>📍 {project.location?.area}, Dhaka</p>

      {/* Progress Section */}
      <div style={{ marginTop: '15px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.85rem' }}>
          <span>Construction Progress</span>
          <span>{project.currentStatus?.completionPercentage}%</span>
        </div>
        <div style={progressBarContainer}>
          <div style={{ 
            width: `${project.currentStatus?.completionPercentage}%`, 
            ...progressFill 
          }}></div>
        </div>
      </div>

      {/* Trust Metrics */}
      <div style={metricsGrid}>
        <div>
          <small>Planned Handover</small>
          <p style={{ fontWeight: 'bold' }}>
            {new Date(project.handoverData?.plannedDate).toLocaleDateString()}
          </p>
        </div>
        <div>
          <small>Status</small>
          <p style={{ color: isDelay ? '#e74c3c' : '#27ae60', fontWeight: 'bold' }}>
            {isDelay ? 'Delayed' : 'On Track'}
          </p>
        </div>
      </div>

      <button style={viewBtn}>View Full Portfolio & Evidence</button>
    </div>
  );
};

// Styles
const cardStyle = {
  background: '#fff',
  borderRadius: '12px',
  padding: '20px',
  boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
  width: '300px',
  border: '1px solid #eee'
};

const badgeContainer = { display: 'flex', gap: '5px', marginBottom: '10px' };
const verifiedBadge = { background: '#d4edda', color: '#155724', padding: '4px 8px', borderRadius: '4px', fontSize: '0.7rem', fontWeight: 'bold' };
const pendingBadge = { background: '#fff3cd', color: '#856404', padding: '4px 8px', borderRadius: '4px', fontSize: '0.7rem', fontWeight: 'bold' };
const progressBarContainer = { width: '100%', height: '8px', background: '#e0e0e0', borderRadius: '10px', marginTop: '5px' };
const progressFill = { height: '100%', background: '#3498db', borderRadius: '10px', transition: 'width 0.5s ease-in-out' };
const metricsGrid = { display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px', marginTop: '20px', borderTop: '1px solid #eee', paddingTop: '10px' };
const viewBtn = { width: '100%', marginTop: '20px', padding: '10px', background: '#2c3e50', color: '#fff', border: 'none', borderRadius: '6px', cursor: 'pointer' };

export default ProjectCard;