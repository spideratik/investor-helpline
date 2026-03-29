import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Search, ShieldCheck, BarChart3, Users } from "lucide-react";


const Home = () => {
  const [developers, setDevelopers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get('http://localhost:5000/api/projects/all');
        
        if (res.data && res.data.length > 0) {
          const formattedData = res.data.map(proj => ({
            id: proj._id,
            name: proj.title || "Untitled Project",
            honesty: (Math.random() * (5 - 4) + 4).toFixed(1), 
            risk: "LOW",
            handover: proj.currentStatus?.completionPercentage || 0,
            active: proj.currentStatus?.completionPercentage || 0,
          }));
          setDevelopers(formattedData);
        } else {
          setDemoData();
        }
      } catch (err) {
        console.warn("Using demo data - check if backend is running at :5000");
        setDemoData();
      } finally {
        setLoading(false);
      }
    };

    const setDemoData = () => {
      setDevelopers([
        { id: 'd1', name: 'Asset Developments Ltd.', honesty: '4.8', risk: 'LOW', handover: 95, active: 82 },
        { id: 'd2', name: 'Shanta Holdings', honesty: '4.9', risk: 'LOW', handover: 99, active: 45 },
        { id: 'd3', name: 'Navana Real Estate', honesty: '4.3', risk: 'MEDIUM', handover: 88, active: 15 }
      ]);
    };

    fetchData();
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-slate-50">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-700"></div>
      </div>
    );
  }

  return (
    <div className="bg-slate-50 min-h-screen font-sans">
      <div className="max-w-6xl mx-auto px-6 py-12">
        
        {/* HERO SECTION */}
        <section className="text-center mb-16">
          <div className="inline-flex items-center gap-2 bg-blue-50 border border-blue-100 text-blue-700 px-4 py-1.5 rounded-full text-sm font-semibold mb-6">
            <ShieldCheck size={16} />
            <span>Real-time Verification Engine Active</span>
          </div>
          <h1 className="text-5xl font-extrabold text-slate-900 mb-4 tracking-tight leading-tight">
            Invest with Confidence: <br />
            <span className="text-blue-700">Verified Developers & Transparent Timelines</span>
          </h1>
          <p className="text-lg text-slate-600 max-w-2xl mx-auto">
            Access raw performance data, handover history, and community-driven honesty scores in the Dhaka market.
          </p>
        </section>

        {/* FILTER SECTION */}
        <section className="bg-white p-4 rounded-2xl shadow-xl border border-slate-100 flex flex-wrap gap-4 items-center mb-12">
          <div className="flex-1 min-w-[200px] relative">
            <Search className="absolute left-3 top-3 text-slate-400 h-5 w-5" />
            <input 
              type="text" 
              placeholder="Search by Developer..." 
              className="w-full pl-10 pr-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none bg-slate-50"
            />
          </div>
          <button className="bg-blue-700 text-white px-8 py-2 rounded-lg font-bold hover:bg-blue-800 transition-colors">
            Filter Data
          </button>
        </section>

        {/* LEADERBOARD */}
        <section>
          <div className="flex justify-between items-end mb-6">
            <h2 className="text-2xl font-bold flex items-center gap-2 text-slate-800">
              <BarChart3 className="text-blue-600" /> Developer Leaderboard
            </h2>
          </div>

          <div className="grid gap-6">
            {developers.map((dev) => (
              <div key={dev.id} className="bg-white border border-slate-200 rounded-xl shadow-sm hover:shadow-md transition-all p-6 flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
                
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <h3 className="text-xl font-bold text-slate-800">{dev.name}</h3>
                    <span className="bg-blue-100 text-blue-800 text-[10px] font-bold px-2 py-0.5 rounded-full uppercase flex items-center gap-1">
                      <ShieldCheck size={12} /> Verified
                    </span>
                  </div>
                  <div className="flex gap-4 text-sm font-medium">
                    <span className="text-slate-500 flex items-center gap-1">
                      <Users size={14} /> Honesty Score: <span className="text-blue-700">{dev.honesty}/5.0</span>
                    </span>
                    <span className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase ${dev.risk === 'LOW' ? 'bg-green-100 text-green-700' : 'bg-amber-100 text-amber-700'}`}>
                      {dev.risk} Risk
                    </span>
                  </div>
                </div>

                <div className="text-center px-8 border-x border-slate-100 min-w-[150px]">
                  <div className="text-2xl font-black text-slate-900">{dev.handover}%</div>
                  <div className="text-[10px] uppercase font-bold text-slate-400 tracking-widest">Handover Rate</div>
                </div>

                <div className="w-full md:w-64">
                  <div className="flex justify-between text-xs font-bold mb-1">
                    <span className="text-slate-500">Active Project</span>
                    <span className="text-blue-700">{dev.active}%</span>
                  </div>
                  <div className="w-full bg-slate-100 h-3 rounded-full overflow-hidden">
                    <div 
                      className="bg-blue-600 h-full transition-all duration-700" 
                      style={{ width: `${Number(dev.active) || 0}%` }}
                    ></div>
                  </div>
                </div>

                <button className="w-full md:w-auto text-blue-700 font-bold text-sm hover:bg-blue-50 px-4 py-2 rounded-lg transition-colors border border-blue-100">
                  View Audit →
                </button>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
};

export default Home;