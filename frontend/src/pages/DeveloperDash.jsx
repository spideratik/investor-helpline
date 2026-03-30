import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { ShieldCheck, Clock, PlusCircle, AlertCircle } from 'lucide-react';

const API = 'http://localhost:5000';

const statusStyles = {
  pending:   { bg: 'bg-amber-100',  text: 'text-amber-700',  label: 'Pending Review' },
  active:    { bg: 'bg-green-100',  text: 'text-green-700',  label: 'Live ✓'          },
  completed: { bg: 'bg-blue-100',   text: 'text-blue-700',   label: 'Completed'       },
};

const DeveloperDash = () => {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const user = JSON.parse(localStorage.getItem('user') || '{}');

  useEffect(() => {
    const fetchMyProjects = async () => {
      try {
        const token = localStorage.getItem('token');
        const res = await axios.get(`${API}/api/projects/mine`, {
          headers: { Authorization: `Bearer ${token}` }
        });
        setProjects(res.data);
      } catch (err) {
        console.error('Failed to load your projects', err);
      } finally {
        setLoading(false);
      }
    };
    fetchMyProjects();
  }, []);

  if (loading) return (
    <div className="flex items-center justify-center min-h-[60vh]">
      <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-700"></div>
    </div>
  );

  return (
    <div className="max-w-4xl mx-auto py-8 px-4">

      {/* Header */}
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-extrabold text-slate-900">Developer Dashboard</h1>
          <p className="text-slate-500 mt-1">Welcome back, {user.username}. Manage your project submissions.</p>
        </div>
        <Link
          to="/onboard"
          className="bg-blue-700 text-white px-5 py-2.5 rounded-xl font-semibold hover:bg-blue-800 transition flex items-center gap-2 shadow-md"
        >
          <PlusCircle size={18} />
          Submit New Project
        </Link>
      </div>

      {/* Status guide */}
      <div className="bg-blue-50 border border-blue-100 rounded-xl p-4 mb-8 flex gap-6 text-sm flex-wrap">
        <span className="flex items-center gap-2 text-amber-700 font-medium">
          <Clock size={14} /> Pending = waiting for admin review
        </span>
        <span className="flex items-center gap-2 text-green-700 font-medium">
          <ShieldCheck size={14} /> Live = approved and visible to investors
        </span>
        <span className="flex items-center gap-2 text-red-600 font-medium">
          <AlertCircle size={14} /> Rejected = needs changes and resubmission
        </span>
      </div>

      {/* Projects */}
      {projects.length === 0 ? (
        <div className="bg-white rounded-2xl border border-slate-200 p-16 text-center text-slate-400">
          <PlusCircle size={48} className="mx-auto mb-4 text-slate-200" />
          <p className="font-semibold text-lg text-slate-600">No projects yet</p>
          <p className="text-sm mb-6">Submit your first project to get started.</p>
          <Link to="/onboard" className="bg-blue-700 text-white px-6 py-2.5 rounded-xl font-semibold hover:bg-blue-800 transition">
            Submit a Project
          </Link>
        </div>
      ) : (
        <div className="space-y-4">
          {projects.map(project => {
            const s = statusStyles[project.status] || statusStyles.pending;
            return (
              <div key={project._id} className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <span className={`${s.bg} ${s.text} text-xs font-bold px-2 py-0.5 rounded-full uppercase`}>
                      {s.label}
                    </span>
                    <span className="text-xs text-slate-400">{new Date(project.createdAt).toLocaleDateString()}</span>
                  </div>
                  <h3 className="text-lg font-bold text-slate-900">{project.title}</h3>
                  <p className="text-sm text-slate-500">{project.location?.area}, Dhaka · {project.projectType}</p>
                </div>

                <div className="flex gap-6 text-center">
                  <div>
                    <div className="text-xl font-black text-slate-900">
                      {project.currentStatus?.completionPercentage ?? 0}%
                    </div>
                    <div className="text-[10px] uppercase text-slate-400 font-bold">Complete</div>
                  </div>
                  <div>
                    <div className="text-xl font-black text-slate-900">
                      {project.images?.length ?? 0}
                    </div>
                    <div className="text-[10px] uppercase text-slate-400 font-bold">Photos</div>
                  </div>
                </div>

                {project.status === 'active' && (
                  <span className="flex items-center gap-1 text-green-600 text-sm font-semibold">
                    <ShieldCheck size={16} /> Verified by Admin
                  </span>
                )}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default DeveloperDash;
