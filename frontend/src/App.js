import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';

// Import your page components
import Home from './pages/Home';
import Login from './pages/Login';
import Signup from './pages/Signup';
import ProjectOnboardingForm from './ProjectOnboardingForm';

// 1. Import the security guard component you just created
import ProtectedRoute from './components/ProtectedRoute';

function App() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const loggedInUser = localStorage.getItem('user');
    if (loggedInUser) {
      try {
        setUser(JSON.parse(loggedInUser));
      } catch (e) {
        console.error("Error parsing user from storage", e);
      }
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    setUser(null);
    window.location.href = '/login'; 
  };

  return (
    <Router>
      <div className="min-h-screen bg-slate-50 font-sans">
        
        {/* --- DYNAMIC NAVIGATION BAR --- */}
        <nav className="bg-white border-b border-slate-200 px-6 py-4 shadow-sm sticky top-0 z-50">
          <div className="max-w-6xl mx-auto flex justify-between items-center">
            
            <Link to="/" className="text-2xl font-black text-blue-800 tracking-tighter hover:opacity-80 transition">
              PROTITI<span className="text-blue-700">.</span>
            </Link>
            
            <div className="flex items-center space-x-6 font-semibold text-slate-600 text-sm md:text-base">
              <Link to="/" className="hover:text-blue-700 transition">Investor Feed</Link>
              
              {user ? (
                <>
                  <span className="text-slate-400 font-normal">|</span>
                  <span className="text-blue-900">Hi, {user.username}</span>
                  <button 
                    onClick={handleLogout}
                    className="text-red-600 hover:text-red-800 transition"
                  >
                    Logout
                  </button>
                </>
              ) : (
                <>
                  <Link to="/login" className="hover:text-blue-700 transition">Login</Link>
                  <Link to="/signup" className="hover:text-blue-700 transition">Signup</Link>
                </>
              )}

              <Link 
                to="/onboard" 
                className="bg-blue-700 text-white px-5 py-2.5 rounded-xl hover:bg-blue-800 transition shadow-lg shadow-blue-100"
              >
                Developer Portal
              </Link>
            </div>
          </div>
        </nav>

        {/* --- PAGE CONTENT AREA --- */}
        <main className="max-w-7xl mx-auto p-6">
          <Routes>
            {/* Public Routes */}
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />

            {/* 2. PROTECTED ROUTE: Only developers can see the onboarding form */}
            <Route 
              path="/onboard" 
              element={
                <ProtectedRoute allowedRoles={['developer']}>
                  <ProjectOnboardingForm />
                </ProtectedRoute>
              } 
            />
          </Routes>
        </main>

      </div>
    </Router>
  );
}

export default App;