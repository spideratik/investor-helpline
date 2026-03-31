import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Signup = () => {
  // 1. Updated 'name' to 'username' to match your Mongoose User Model
  const [formData, setFormData] = useState({ username: '', email: '', password: '', role: 'investor' });
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      // 2. Ensure your backend route is actually /signup (your authRoutes.js has this)
      await axios.post('http://localhost:5000/api/auth/signup', formData);
      alert("Account created! Please login.");
      navigate('/login');
    } catch (err) {
      alert(err.response?.data?.message || "Signup failed. Try a different email.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={styles.authContainer}>
      <form onSubmit={handleSubmit} style={styles.authForm}>
        <h2 style={{ color: '#2c3e50', marginBottom: '20px' }}>Join Protiti</h2>
        
        <input 
          type="text" 
          placeholder="Full Name" 
          onChange={(e) => setFormData({...formData, username: e.target.value})} 
          style={styles.inputStyle} 
          required 
        />
        
        <input 
          type="email" 
          placeholder="Email" 
          onChange={(e) => setFormData({...formData, email: e.target.value})} 
          style={styles.inputStyle} 
          required 
        />
        
        <input 
          type="password" 
          placeholder="Password" 
          onChange={(e) => setFormData({...formData, password: e.target.value})} 
          style={styles.inputStyle} 
          required 
        />
        
        <label style={{ display: 'block', marginTop: '10px', fontWeight: 'bold' }}>I am a:</label>
        <select 
          value={formData.role} 
          onChange={(e) => setFormData({...formData, role: e.target.value})} 
          style={styles.inputStyle}
        >
          <option value="investor">Investor (Browsing Projects)</option>
          <option value="developer">Developer (Posting Projects)</option>
        </select>

        <button type="submit" style={styles.btnStyle} disabled={loading}>
          {loading ? "Creating Account..." : "Create Account"}
        </button>

        <p style={{ fontSize: '0.8rem', marginTop: '15px', textAlign: 'center' }}>
          Already have an account? <span onClick={() => navigate('/login')} style={{ color: '#3498db', cursor: 'pointer' }}>Login</span>
        </p>
      </form>
    </div>
  );
};

// 3. Styles object to keep the component clean
const styles = {
  authContainer: { 
    display: 'flex', 
    justifyContent: 'center', 
    alignItems: 'center', 
    height: '90vh', 
    backgroundColor: '#f4f7f6' 
  },
  authForm: { 
    background: '#fff', 
    padding: '40px', 
    borderRadius: '8px', 
    boxShadow: '0 4px 15px rgba(0,0,0,0.1)', 
    width: '350px' 
  },
  inputStyle: { 
    width: '100%', 
    padding: '12px', 
    margin: '10px 0', 
    borderRadius: '4px', 
    border: '1px solid #ccc',
    boxSizing: 'border-box' 
  },
  btnStyle: { 
    width: '100%', 
    padding: '12px', 
    background: '#2c3e50', 
    color: '#fff', 
    border: 'none', 
    borderRadius: '4px', 
    cursor: 'pointer', 
    marginTop: '10px',
    fontSize: '1rem'
  }
};

export default Signup;