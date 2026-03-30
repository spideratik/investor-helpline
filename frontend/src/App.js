import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Link, Navigate } from 'react-router-dom';

import Home from './pages/Home';
import Login from './pages/Login';
import Signup from './pages/Signup';
import AdminDashboard from './pages/AdminDashboard';
import DeveloperDash from './pages/DeveloperDash';
import ProjectOnboardingForm from './ProjectOnboardingForm';
import ProtectedRoute from './components/ProtectedRoute';

function App() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const loggedInUser = localStorage.getItem('user');
    if (loggedInUser) {
      try { setUser(JSON.parse(loggedInUser)); }
      catch (e) { localStorage.removeItem('user'); }
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
      <div className="min-h-screen bg-slate-50" style={{ fontFamily: "'Hind Siliguri', 'Noto Sans Bengali', sans-serif" }}>

        {/* NAVIGATION */}
        <nav style={{ background: 'linear-gradient(135deg, #0f172a 0%, #1e3a5f 100%)' }} className="px-6 py-0 sticky top-0 z-50 shadow-xl">
          <div className="max-w-6xl mx-auto flex justify-between items-center h-16">

            {/* Brand */}
            <Link to="/" className="flex items-center gap-2 group">
              <div style={{
                background: 'linear-gradient(135deg, #3b82f6, #06b6d4)',
                borderRadius: '10px',
                width: 38, height: 38,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontSize: 20, fontWeight: 900, color: '#fff',
                boxShadow: '0 0 16px rgba(59,130,246,0.5)'
              }}>স</div>
              <div>
                <div style={{
                  fontSize: 20, fontWeight: 800, letterSpacing: '-0.3px',
                  background: 'linear-gradient(90deg, #60a5fa, #22d3ee)',
                  WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent'
                }}>স্বচ্ছ বিনিয়োগ</div>
                <div style={{ fontSize: 9, color: '#94a3b8', letterSpacing: '1.5px', textTransform: 'uppercase', marginTop: -2 }}>
                  Transparent Investment
                </div>
              </div>
            </Link>

            {/* Nav links */}
            <div className="flex items-center gap-5 text-sm font-semibold">
              <Link to="/" style={{ color: '#cbd5e1' }} className="hover:text-white transition">বিনিয়োগ ফিড</Link>

              {user ? (
                <>
                  {user.role === 'admin' && (
                    <Link to="/admin" style={{ color: '#cbd5e1' }} className="hover:text-white transition">অ্যাডমিন</Link>
                  )}
                  {user.role === 'developer' && (
                    <Link to="/developer" style={{ color: '#cbd5e1' }} className="hover:text-white transition">আমার প্রজেক্ট</Link>
                  )}
                  <span style={{ color: '#475569' }}>|</span>
                  <span style={{ color: '#93c5fd' }}>হ্যালো, {user.username}</span>
                  <button onClick={handleLogout} style={{ color: '#f87171' }} className="hover:text-red-300 transition">
                    লগআউট
                  </button>
                </>
              ) : (
                <>
                  <Link to="/login" style={{ color: '#cbd5e1' }} className="hover:text-white transition">লগইন</Link>
                  <Link to="/signup" style={{ color: '#cbd5e1' }} className="hover:text-white transition">সাইনআপ</Link>
                </>
              )}

              <Link to="/onboard" style={{
                background: 'linear-gradient(135deg, #3b82f6, #06b6d4)',
                color: '#fff', padding: '8px 18px', borderRadius: 10,
                fontWeight: 700, fontSize: 13, boxShadow: '0 4px 12px rgba(59,130,246,0.4)'
              }} className="hover:opacity-90 transition">
                ডেভেলপার পোর্টাল
              </Link>
            </div>
          </div>
        </nav>

        {/* PAGES */}
        <main className="max-w-7xl mx-auto p-6">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/onboard" element={
              <ProtectedRoute allowedRoles={['developer']}>
                <ProjectOnboardingForm />
              </ProtectedRoute>
            } />
            <Route path="/developer" element={
              <ProtectedRoute allowedRoles={['developer']}>
                <DeveloperDash />
              </ProtectedRoute>
            } />
            <Route path="/admin" element={
              <ProtectedRoute allowedRoles={['admin']}>
                <AdminDashboard />
              </ProtectedRoute>
            } />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </main>

        {/* FOOTER */}
        <footer style={{ background: '#0f172a', color: '#94a3b8' }} className="mt-16 py-10 px-6">
          <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <div style={{
                fontSize: 22, fontWeight: 800,
                background: 'linear-gradient(90deg, #60a5fa, #22d3ee)',
                WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent'
              }} className="mb-2">স্বচ্ছ বিনিয়োগ</div>
              <p style={{ fontSize: 13, lineHeight: 1.7 }}>
                ঢাকার রিয়েল এস্টেট বাজারে স্বচ্ছতা আনতে আমরা প্রতিশ্রুতিবদ্ধ।
              </p>
            </div>
            <div>
              <div style={{ color: '#e2e8f0', fontWeight: 700, marginBottom: 12 }}>যোগাযোগ করুন</div>
              <div className="space-y-2 text-sm">
                <div>📱 WhatsApp: <span style={{ color: '#60a5fa' }}>01515666186</span></div>
                <div>📞 মোবাইল: <span style={{ color: '#60a5fa' }}>01515666186</span></div>
                <div>💳 bKash/Rocket: <span style={{ color: '#60a5fa' }}>01515666186</span></div>
                <div>✉️ Email: <span style={{ color: '#60a5fa' }}>test@test.com</span></div>
              </div>
            </div>
            <div>
              <div style={{ color: '#e2e8f0', fontWeight: 700, marginBottom: 12 }}>দ্রুত লিংক</div>
              <div className="space-y-2 text-sm">
                <div><Link to="/" style={{ color: '#94a3b8' }} className="hover:text-white transition">বিনিয়োগ ফিড</Link></div>
                <div><Link to="/login" style={{ color: '#94a3b8' }} className="hover:text-white transition">লগইন</Link></div>
                <div><Link to="/signup" style={{ color: '#94a3b8' }} className="hover:text-white transition">সাইনআপ</Link></div>
                <div><Link to="/onboard" style={{ color: '#94a3b8' }} className="hover:text-white transition">ডেভেলপার পোর্টাল</Link></div>
              </div>
            </div>
          </div>
          <div style={{ borderTop: '1px solid #1e293b', marginTop: 32, paddingTop: 20, textAlign: 'center', fontSize: 12 }}>
            © ২০২৫ স্বচ্ছ বিনিয়োগ। সর্বস্বত্ব সংরক্ষিত।
          </div>
        </footer>

      </div>
    </Router>
  );
}

export default App;
