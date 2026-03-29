import React, { useEffect, useState } from 'react';
import axios from 'axios';

const AdminDashboard = () => {
  const [pendingProjects, setPendingProjects] = useState([]);

  // Fetch only unverified projects
  useEffect(() => {
    fetchPending();
  }, []);

  const fetchPending = async () => {
    const res = await axios.get('http://localhost:5000/api/projects/all');
    // Filter locally or create a specific backend route for pending projects
    setPendingProjects(res.data.filter(p => !p.isVerified));
  };

  const handleVerify = async (id) => {
    try {
      await axios.put(`http://localhost:5000/api/projects/verify/${id}`);
      alert("Project Verified! It is now live for investors.");
      fetchPending(); // Refresh list
    } catch (err) {
      console.error("Verification failed", err);
    }
  };

  return (
    <div style={{ padding: '30px' }}>
      <h1>Admin Verification Portal</h1>
      <p>Review developer documents and RAJUK permits below.</p>

      <table style={tableStyle}>
        <thead>
          <tr style={{ background: '#2c3e50', color: 'white' }}>
            <th>Project Name</th>
            <th>Developer</th>
            <th>RAJUK No.</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {pendingProjects.map(project => (
            <tr key={project._id} style={{ borderBottom: '1px solid #ddd' }}>
              <td>{project.title}</td>
              <td>{project.developerId?.companyName || 'Unknown'}</td>
              <td><code>{project.legalStatus?.rajukApprovalNo}</code></td>
              <td>
                <button onClick={() => handleVerify(project._id)} style={verifyBtn}>
                  Approve & Verify
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

const tableStyle = { width: '100%', borderCollapse: 'collapse', marginTop: '20px' };
const verifyBtn = { background: '#27ae60', color: 'white', border: 'none', padding: '8px 15px', borderRadius: '4px', cursor: 'pointer' };

export default AdminDashboard;