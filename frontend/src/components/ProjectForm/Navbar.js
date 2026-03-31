import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Navbar = () => {
  const navigate = useNavigate();
  
  // 1. Get user data from localStorage
  const userJson = localStorage.getItem('user');
  const user = userJson ? JSON.parse(userJson) : null;

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    alert("Logged out successfully");
    navigate('/login');
    window.location.reload(); // Refresh to clear the view
  };

  return (
    <nav style={styles.navBar}>
      <div style={styles.logo}>
        <Link to="/" style={styles.link}>Protiti Dhaka</Link>
      </div>

      <div style={styles.navLinks}>
        <Link to="/" style={styles.link}>Home</Link>
        
        {user ? (
          <>
            {/* 2. Role-based links */}
            {user.role === 'developer' && (
              <Link to="/add-project" style={styles.link}>Add Project</Link>
            )}
            {user.role === 'admin' && (
              <Link to="/admin" style={styles.link}>Admin Panel</Link>
            )}
            
            <span style={styles.welcome}>Hi, {user.username}</span>
            <button onClick={handleLogout} style={styles.logoutBtn}>Logout</button>
          </>
        ) : (
          <>
            {/* 3. Logged out links */}
            <Link to="/login" style={styles.link}>Login</Link>
            <Link to="/signup" style={styles.link}>Signup</Link>
          </>
        )}
      </div>
    </nav>
  );
};

const styles = {
  navBar: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '15px 50px',
    backgroundColor: '#2c3e50',
    color: 'white',
  },
  logo: {
    fontSize: '1.5rem',
    fontWeight: 'bold',
  },
  navLinks: {
    display: 'flex',
    alignItems: 'center',
    gap: '20px',
  },
  link: {
    color: 'white',
    textDecoration: 'none',
    fontSize: '1rem',
  },
  welcome: {
    fontSize: '0.9rem',
    color: '#bdc3c7',
    fontStyle: 'italic',
  },
  logoutBtn: {
    backgroundColor: '#e74c3c',
    color: 'white',
    border: 'none',
    padding: '8px 15px',
    borderRadius: '4px',
    cursor: 'pointer',
  }
};

export default Navbar;