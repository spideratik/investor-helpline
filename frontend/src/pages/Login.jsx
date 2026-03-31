import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false); // Added loading state
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await axios.post('http://localhost:5000/api/auth/login', { email, password });
      
      // 1. IMPORTANT: Store the token specifically so your authMiddleware can find it
      localStorage.setItem('token', res.data.token);
      localStorage.setItem('user', JSON.stringify(res.data.user)); // Store user details separately
      
      alert("Login Successful!");
      
      // 2. Redirect based on role (ensuring res.data.user exists)
      const userRole = res.data.user.role;
      if (userRole === 'admin') navigate('/admin');
      else if (userRole === 'developer') navigate('/add-project');
      else navigate('/');
      
      // Force refresh only if you aren't using a State Manager like Redux/Context
      window.location.reload(); 
    } catch (err) {
      alert(err.response?.data?.message || "Invalid credentials");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={styles.authContainer}>
      <form onSubmit={handleLogin} style={styles.authForm}>
        <h2 style={{ marginBottom: '20px', color: '#2c3e50' }}>Login to Protiti</h2>
        <input 
          type="email" 
          placeholder="Email" 
          onChange={(e) => setEmail(e.target.value)} 
          style={styles.inputStyle} 
          required 
        />
        <input 
          type="password" 
          placeholder="Password" 
          onChange={(e) => setPassword(e.target.value)} 
          style={styles.inputStyle} 
          required 
        />
        <button type="submit" style={styles.btnStyle} disabled={loading}>
          {loading ? "Logging in..." : "Login"}
        </button>
        <p style={{ fontSize: '0.8rem', marginTop: '15px' }}>
          Don't have an account? <span onClick={() => navigate('/signup')} style={{ color: '#3498db', cursor: 'pointer' }}>Sign up</span>
        </p>
      </form>
    </div>
  );
};

// 3. Adding the missing Styles object
const styles = {
  authContainer: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '80vh',
    backgroundColor: '#f4f7f6'
  },
  authForm: {
    backgroundColor: '#fff',
    padding: '40px',
    borderRadius: '8px',
    boxShadow: '0 4px 15px rgba(0,0,0,0.1)',
    textAlign: 'center',
    width: '350px'
  },
  inputStyle: {
    width: '100%',
    padding: '12px',
    margin: '10px 0',
    borderRadius: '4px',
    border: '1px solid #ddd',
    boxSizing: 'border-box'
  },
  btnStyle: {
    width: '100%',
    padding: '12px',
    backgroundColor: '#27ae60',
    color: 'white',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
    fontSize: '1rem',
    marginTop: '10px'
  }
};

export default Login;