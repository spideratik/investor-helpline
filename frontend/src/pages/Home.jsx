import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Search, ShieldCheck, BarChart3, MapPin, Calendar, TrendingUp, MessageCircle, Phone, Mail, CreditCard } from 'lucide-react';

const API = 'http://localhost:5000';

const Home = () => {
  const [projects, setProjects] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [search, setSearch] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get(`${API}/api/projects`);
        if (res.data && res.data.length > 0) {
          setProjects(res.data);
          setFiltered(res.data);
        } else {
          setDemoData();
        }
      } catch (err) {
        console.warn('Backend not reachable, using demo data');
        setDemoData();
      } finally {
        setLoading(false);
      }
    };

    const setDemoData = () => {
      const demo = [
        { _id: 'd1', title: 'বসুন্ধরা হাইটস ফেজ ২', location: { area: 'বসুন্ধরা' }, currentStatus: { completionPercentage: 82 }, legalStatus: { rajukApprovalNo: 'RAJUK/2024/001' }, funding: { minInvestment: 500000 }, projectType: 'Residential', isVerified: true, developer: { username: 'Asset Developments' } },
        { _id: 'd2', title: 'শান্তা টাওয়ার গুলশান', location: { area: 'গুলশান' }, currentStatus: { completionPercentage: 45 }, legalStatus: { rajukApprovalNo: 'RAJUK/2024/002' }, funding: { minInvestment: 1000000 }, projectType: 'Commercial', isVerified: true, developer: { username: 'Shanta Holdings' } },
        { _id: 'd3', title: 'নাভানা রেসিডেন্সিয়া', location: { area: 'উত্তরা' }, currentStatus: { completionPercentage: 15 }, legalStatus: { rajukApprovalNo: 'RAJUK/2024/003' }, funding: { minInvestment: 750000 }, projectType: 'Residential', isVerified: true, developer: { username: 'Navana Real Estate' } },
      ];
      setProjects(demo);
      setFiltered(demo);
    };

    fetchData();
  }, []);

  const handleSearch = (val) => {
    setSearch(val);
    const q = val.toLowerCase();
    setFiltered(projects.filter(p =>
      p.title?.toLowerCase().includes(q) ||
      p.location?.area?.toLowerCase().includes(q) ||
      p.projectType?.toLowerCase().includes(q)
    ));
  };

  if (loading) return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-700"></div>
    </div>
  );

  return (
    <div style={{ fontFamily: "'Hind Siliguri', 'Noto Sans Bengali', sans-serif" }}>

      {/* ===== HERO ===== */}
      <section style={{
        background: 'linear-gradient(135deg, #0f172a 0%, #1e3a5f 60%, #0f172a 100%)',
        padding: '80px 24px 90px',
        textAlign: 'center',
        position: 'relative',
        overflow: 'hidden',
        borderRadius: '0 0 40px 40px',
        marginBottom: 48,
      }}>
        {/* Decorative glow blobs */}
        <div style={{
          position: 'absolute', top: -60, left: '10%', width: 300, height: 300,
          background: 'radial-gradient(circle, rgba(59,130,246,0.15) 0%, transparent 70%)',
          borderRadius: '50%', pointerEvents: 'none'
        }} />
        <div style={{
          position: 'absolute', bottom: -60, right: '10%', width: 280, height: 280,
          background: 'radial-gradient(circle, rgba(6,182,212,0.12) 0%, transparent 70%)',
          borderRadius: '50%', pointerEvents: 'none'
        }} />

        <div style={{
          display: 'inline-flex', alignItems: 'center', gap: 8,
          background: 'rgba(59,130,246,0.15)', border: '1px solid rgba(59,130,246,0.3)',
          color: '#60a5fa', padding: '6px 18px', borderRadius: 99,
          fontSize: 13, fontWeight: 600, marginBottom: 28
        }}>
          <ShieldCheck size={15} /> রিয়েল-টাইম যাচাইকরণ সক্রিয়
        </div>

        <h1 style={{
          fontSize: 'clamp(26px, 5vw, 48px)', fontWeight: 900, lineHeight: 1.3,
          color: '#f8fafc', marginBottom: 20, letterSpacing: '-0.5px'
        }}>
          আত্মবিশ্বাসের সাথে বিনিয়োগ করুন:<br />
          <span style={{
            background: 'linear-gradient(90deg, #60a5fa, #22d3ee)',
            WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent'
          }}>
            যাচাইকৃত ডেভেলপার ও স্বচ্ছ সময়সীমায়
          </span>
        </h1>

        <p style={{ fontSize: 16, color: '#94a3b8', maxWidth: 620, margin: '0 auto 36px', lineHeight: 1.8 }}>
          ঢাকায় এবং বাজারজুড়ে প্রকৃত পারফরম্যান্স ডেটা, হস্তান্তরের ইতিহাস এবং কমিউনিটি-চালিত সততার স্কোর অ্যাক্সেস করুন।
        </p>

        {/* Stats row */}
        <div style={{ display: 'flex', justifyContent: 'center', gap: 40, flexWrap: 'wrap' }}>
          {[
            { label: 'যাচাইকৃত প্রজেক্ট', value: projects.length || '০' },
            { label: 'নিবন্ধিত ডেভেলপার', value: '১০+' },
            { label: 'বিনিয়োগকারী', value: '৫০+' },
          ].map((s, i) => (
            <div key={i} style={{ textAlign: 'center' }}>
              <div style={{ fontSize: 32, fontWeight: 900, color: '#60a5fa' }}>{s.value}</div>
              <div style={{ fontSize: 12, color: '#64748b', marginTop: 2 }}>{s.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* ===== SEARCH ===== */}
      <section style={{ maxWidth: 900, margin: '0 auto 48px', padding: '0 16px' }}>
        <div style={{
          background: '#fff', borderRadius: 16, boxShadow: '0 4px 24px rgba(0,0,0,0.08)',
          border: '1px solid #e2e8f0', padding: '16px 20px',
          display: 'flex', gap: 12, alignItems: 'center', flexWrap: 'wrap'
        }}>
          <Search size={18} color="#94a3b8" />
          <input
            type="text"
            value={search}
            onChange={e => handleSearch(e.target.value)}
            placeholder="প্রজেক্টের নাম, এলাকা বা ধরন দিয়ে খুঁজুন..."
            style={{
              flex: 1, border: 'none', outline: 'none', fontSize: 15,
              background: 'transparent', minWidth: 180,
              fontFamily: "'Hind Siliguri', 'Noto Sans Bengali', sans-serif"
            }}
          />
          {search && (
            <button onClick={() => handleSearch('')} style={{ color: '#94a3b8', fontSize: 12, cursor: 'pointer', background: 'none', border: 'none' }}>
              ✕ মুছুন
            </button>
          )}
          <span style={{ fontSize: 12, color: '#94a3b8', whiteSpace: 'nowrap' }}>
            {filtered.length}টি যাচাইকৃত প্রজেক্ট
          </span>
        </div>
      </section>

      {/* ===== PROJECT LIST ===== */}
      <section style={{ maxWidth: 900, margin: '0 auto 64px', padding: '0 16px' }}>
        <h2 style={{ fontSize: 22, fontWeight: 800, color: '#0f172a', marginBottom: 24, display: 'flex', alignItems: 'center', gap: 10 }}>
          <BarChart3 size={22} color="#3b82f6" /> যাচাইকৃত প্রজেক্টসমূহ
        </h2>

        {filtered.length === 0 ? (
          <div style={{ background: '#fff', borderRadius: 20, border: '1px solid #e2e8f0', padding: 64, textAlign: 'center', color: '#94a3b8' }}>
            <ShieldCheck size={48} style={{ margin: '0 auto 16px', color: '#e2e8f0' }} />
            <p style={{ fontWeight: 600, fontSize: 18, color: '#64748b' }}>কোনো প্রজেক্ট পাওয়া যায়নি</p>
            <p style={{ fontSize: 14 }}>{search ? 'অন্য কিছু দিয়ে খুঁজুন।' : 'এখনো কোনো যাচাইকৃত প্রজেক্ট নেই।'}</p>
          </div>
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
            {filtered.map((project) => (
              <div key={project._id} style={{
                background: '#fff', border: '1px solid #e2e8f0', borderRadius: 20,
                boxShadow: '0 2px 12px rgba(0,0,0,0.05)',
                padding: 24, display: 'flex', gap: 24, alignItems: 'center',
                flexWrap: 'wrap', transition: 'box-shadow 0.2s',
              }}
                onMouseEnter={e => e.currentTarget.style.boxShadow = '0 8px 30px rgba(59,130,246,0.12)'}
                onMouseLeave={e => e.currentTarget.style.boxShadow = '0 2px 12px rgba(0,0,0,0.05)'}
              >
                {/* Left */}
                <div style={{ flex: 1, minWidth: 200 }}>
                  <div style={{ display: 'flex', gap: 8, marginBottom: 8, flexWrap: 'wrap' }}>
                    <span style={{ background: '#dcfce7', color: '#15803d', fontSize: 10, fontWeight: 700, padding: '3px 10px', borderRadius: 99, display: 'flex', alignItems: 'center', gap: 4 }}>
                      <ShieldCheck size={10} /> যাচাইকৃত
                    </span>
                    <span style={{ background: '#eff6ff', color: '#1d4ed8', fontSize: 10, fontWeight: 700, padding: '3px 10px', borderRadius: 99 }}>
                      {project.projectType}
                    </span>
                  </div>
                  <h3 style={{ fontSize: 18, fontWeight: 800, color: '#0f172a', marginBottom: 6 }}>{project.title}</h3>
                  <div style={{ display: 'flex', gap: 16, flexWrap: 'wrap', fontSize: 13, color: '#64748b' }}>
                    <span style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
                      <MapPin size={13} /> {project.location?.area}, ঢাকা
                    </span>
                    {project.developer?.username && (
                      <span>{project.developer.username}</span>
                    )}
                    {project.timeline?.expectedHandoverDate && (
                      <span style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
                        <Calendar size={13} /> {new Date(project.timeline.expectedHandoverDate).toLocaleDateString('bn-BD')}
                      </span>
                    )}
                  </div>
                </div>

                {/* Center: completion */}
                <div style={{ textAlign: 'center', padding: '0 24px', borderLeft: '1px solid #f1f5f9', borderRight: '1px solid #f1f5f9', minWidth: 120 }}>
                  <div style={{ fontSize: 32, fontWeight: 900, color: '#0f172a' }}>{project.currentStatus?.completionPercentage ?? 0}%</div>
                  <div style={{ fontSize: 10, color: '#94a3b8', textTransform: 'uppercase', fontWeight: 700, letterSpacing: 1 }}>সম্পন্ন</div>
                </div>

                {/* Right: progress + investment */}
                <div style={{ minWidth: 200, flex: 1 }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 12, fontWeight: 700, marginBottom: 6 }}>
                    <span style={{ color: '#64748b' }}>অগ্রগতি</span>
                    <span style={{ color: '#3b82f6' }}>{project.currentStatus?.completionPercentage ?? 0}%</span>
                  </div>
                  <div style={{ background: '#f1f5f9', borderRadius: 99, height: 10, overflow: 'hidden' }}>
                    <div style={{
                      width: `${project.currentStatus?.completionPercentage || 0}%`,
                      height: '100%',
                      background: 'linear-gradient(90deg, #3b82f6, #06b6d4)',
                      borderRadius: 99, transition: 'width 0.7s ease'
                    }} />
                  </div>
                  {project.funding?.minInvestment && (
                    <div style={{ fontSize: 12, color: '#64748b', marginTop: 8, display: 'flex', alignItems: 'center', gap: 4 }}>
                      <TrendingUp size={12} /> সর্বনিম্ন বিনিয়োগ: <strong style={{ color: '#0f172a' }}>৳{Number(project.funding.minInvestment).toLocaleString('bn-BD')}</strong>
                    </div>
                  )}
                </div>

                <button style={{
                  background: 'linear-gradient(135deg, #3b82f6, #06b6d4)',
                  color: '#fff', border: 'none', borderRadius: 12,
                  padding: '10px 20px', fontWeight: 700, fontSize: 13,
                  cursor: 'pointer', whiteSpace: 'nowrap',
                  fontFamily: "'Hind Siliguri', 'Noto Sans Bengali', sans-serif",
                  boxShadow: '0 4px 12px rgba(59,130,246,0.3)'
                }}>
                  বিস্তারিত দেখুন →
                </button>
              </div>
            ))}
          </div>
        )}
      </section>

      {/* ===== CONTACT SECTION ===== */}
      <section style={{
        background: 'linear-gradient(135deg, #0f172a, #1e3a5f)',
        borderRadius: 24, padding: '48px 32px',
        maxWidth: 900, margin: '0 auto 48px',
      }}>
        <h2 style={{ fontSize: 24, fontWeight: 800, color: '#f8fafc', textAlign: 'center', marginBottom: 8 }}>
          যোগাযোগ করুন
        </h2>
        <p style={{ textAlign: 'center', color: '#94a3b8', fontSize: 14, marginBottom: 36 }}>
          যেকোনো প্রশ্ন বা সহায়তার জন্য আমাদের সাথে যোগাযোগ করুন
        </p>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: 16 }}>
          {[
            { icon: <MessageCircle size={22} color="#22d3ee" />, label: 'WhatsApp', value: '01515666186', href: 'https://wa.me/8801515666186', color: '#22d3ee' },
            { icon: <Phone size={22} color="#60a5fa" />, label: 'মোবাইল', value: '01515666186', href: 'tel:+8801515666186', color: '#60a5fa' },
            { icon: <CreditCard size={22} color="#a78bfa" />, label: 'bKash / Rocket', value: '01515666186', href: '#', color: '#a78bfa' },
            { icon: <Mail size={22} color="#34d399" />, label: 'ইমেইল', value: 'test@test.com', href: 'mailto:test@test.com', color: '#34d399' },
          ].map((c, i) => (
            <a key={i} href={c.href} target={c.href.startsWith('http') ? '_blank' : undefined} rel="noreferrer"
              style={{
                background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)',
                borderRadius: 16, padding: '20px 16px', textAlign: 'center',
                textDecoration: 'none', transition: 'background 0.2s',
                display: 'block',
              }}
              onMouseEnter={e => e.currentTarget.style.background = 'rgba(255,255,255,0.1)'}
              onMouseLeave={e => e.currentTarget.style.background = 'rgba(255,255,255,0.05)'}
            >
              <div style={{ marginBottom: 10 }}>{c.icon}</div>
              <div style={{ fontSize: 12, color: '#64748b', marginBottom: 4, fontWeight: 600 }}>{c.label}</div>
              <div style={{ fontSize: 15, color: c.color, fontWeight: 700 }}>{c.value}</div>
            </a>
          ))}
        </div>
      </section>

    </div>
  );
};

export default Home;
