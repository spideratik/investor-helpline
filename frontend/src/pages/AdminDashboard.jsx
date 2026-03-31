import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { ShieldCheck, XCircle, FileText, Clock, User } from 'lucide-react';

const API = 'http://localhost:5000';

const AdminDashboard = () => {
  const [pendingProjects, setPendingProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [actionLoading, setActionLoading] = useState(null);
  const [rejectReason, setRejectReason] = useState('');
  const [rejectingId, setRejectingId] = useState(null);

  const getToken = () => localStorage.getItem('token');

  const authHeader = () => ({
    headers: { Authorization: `Bearer ${getToken()}` }
  });

  useEffect(() => { fetchPending(); }, []);

  const fetchPending = async () => {
    setLoading(true);
    try {
      const res = await axios.get(`${API}/api/projects/pending`, authHeader());
      setPendingProjects(res.data);
    } catch (err) {
      alert('Failed to load projects. Are you logged in as admin?');
    } finally {
      setLoading(false);
    }
  };

  const handleVerify = async (id) => {
    setActionLoading(id);
    try {
      await axios.put(`${API}/api/projects/verify/${id}`, {}, authHeader());
      alert('✅ Project verified and now live for investors!');
      fetchPending();
    } catch (err) {
      alert('Verification failed: ' + (err.response?.data?.message || err.message));
    } finally {
      setActionLoading(null);
    }
  };

  const handleReject = async (id) => {
    if (!rejectReason.trim()) return alert('Please enter a rejection reason.');
    setActionLoading(id);
    try {
      await axios.put(`${API}/api/projects/reject/${id}`, { reason: rejectReason }, authHeader());
      alert('Project rejected and developer notified.');
      setRejectingId(null);
      setRejectReason('');
      fetchPending();
    } catch (err) {
      alert('Rejection failed: ' + (err.response?.data?.message || err.message));
    } finally {
      setActionLoading(null);
    }
  };

  if (loading) return (
    <div className="flex items-center justify-center min-h-[60vh]">
      <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-700"></div>
    </div>
  );

  return (
    <div className="max-w-5xl mx-auto py-8 px-4">

      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-extrabold text-slate-900 flex items-center gap-2">
          <ShieldCheck className="text-blue-600" size={32} />
          Admin Verification Portal
        </h1>
        <p className="text-slate-500 mt-1">
          Review developer submissions before they go live to investors.
        </p>
      </div>

      {/* Stats bar */}
      <div className="grid grid-cols-3 gap-4 mb-8">
        <div className="bg-white rounded-xl p-4 border border-slate-200 shadow-sm text-center">
          <div className="text-3xl font-black text-amber-500">{pendingProjects.length}</div>
          <div className="text-xs text-slate-500 uppercase font-bold tracking-wider mt-1">Awaiting Review</div>
        </div>
        <div className="bg-white rounded-xl p-4 border border-slate-200 shadow-sm text-center">
          <div className="text-3xl font-black text-green-600">—</div>
          <div className="text-xs text-slate-500 uppercase font-bold tracking-wider mt-1">Approved Today</div>
        </div>
        <div className="bg-white rounded-xl p-4 border border-slate-200 shadow-sm text-center">
          <div className="text-3xl font-black text-blue-700">—</div>
          <div className="text-xs text-slate-500 uppercase font-bold tracking-wider mt-1">Total Live Projects</div>
        </div>
      </div>

      {/* Project list */}
      {pendingProjects.length === 0 ? (
        <div className="bg-white rounded-2xl border border-slate-200 p-16 text-center text-slate-400">
          <ShieldCheck size={48} className="mx-auto mb-4 text-slate-200" />
          <p className="font-semibold text-lg">No pending projects</p>
          <p className="text-sm">All submissions have been reviewed.</p>
        </div>
      ) : (
        <div className="space-y-6">
          {pendingProjects.map(project => (
            <div key={project._id} className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">

              {/* Project header */}
              <div className="p-6 border-b border-slate-100">
                <div className="flex justify-between items-start">
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <span className="bg-amber-100 text-amber-700 text-xs font-bold px-2 py-0.5 rounded-full uppercase">
                        Pending Review
                      </span>
                      <span className="text-xs text-slate-400">
                        <Clock size={12} className="inline mr-1" />
                        {new Date(project.createdAt).toLocaleDateString()}
                      </span>
                    </div>
                    <h2 className="text-xl font-bold text-slate-900">{project.title}</h2>
                    <p className="text-slate-500 text-sm flex items-center gap-1 mt-0.5">
                      <User size={13} />
                      {project.developer?.username || 'Unknown Developer'} · {project.developer?.email}
                    </p>
                  </div>
                  <span className="text-sm font-semibold text-blue-700 bg-blue-50 px-3 py-1 rounded-lg">
                    {project.projectType || 'Residential'}
                  </span>
                </div>
              </div>

              {/* Project details grid */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-0 divide-x divide-slate-100 border-b border-slate-100">
                <div className="p-4">
                  <div className="text-xs text-slate-400 uppercase font-bold mb-1">Location</div>
                  <div className="font-semibold text-slate-700">{project.location?.area || '—'}</div>
                </div>
                <div className="p-4">
                  <div className="text-xs text-slate-400 uppercase font-bold mb-1">RAJUK No.</div>
                  <div className="font-mono font-semibold text-slate-700">
                    {project.legalStatus?.rajukApprovalNo || <span className="text-red-400">Not provided</span>}
                  </div>
                </div>
                <div className="p-4">
                  <div className="text-xs text-slate-400 uppercase font-bold mb-1">Land Status</div>
                  <div className="font-semibold text-slate-700">{project.legalStatus?.landMutationStatus || '—'}</div>
                </div>
                <div className="p-4">
                  <div className="text-xs text-slate-400 uppercase font-bold mb-1">Min Investment</div>
                  <div className="font-semibold text-slate-700">
                    {project.funding?.minInvestment ? `৳${Number(project.funding.minInvestment).toLocaleString()}` : '—'}
                  </div>
                </div>
              </div>
              {/* Transaction ID */}
              {project.transactionId && (
                <div className="px-6 py-3 bg-yellow-50 border-b border-yellow-100 flex items-center gap-3">
                  <span className="text-xs font-bold text-yellow-700 uppercase">ট্রানজ্যাকশন আইডি:</span>
                  <span className="font-mono font-bold text-yellow-900">{project.transactionId}</span>
                  <span className="text-xs text-yellow-600">(পেমেন্ট যাচাই করুন)</span>
                </div>
              )}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-0 divide-x divide-slate-100 border-b border-slate-100 hidden">
                <div className="p-4 hidden">placeholder</div>
              </div>

              {/* Description */}
              {project.description && (
                <div className="px-6 py-4 border-b border-slate-100">
                  <div className="text-xs text-slate-400 uppercase font-bold mb-1">Description</div>
                  <p className="text-slate-600 text-sm leading-relaxed">{project.description}</p>
                </div>
              )}

              {/* Uploaded photos */}
              {project.images && project.images.length > 0 && (
                <div className="px-6 py-4 border-b border-slate-100">
                  <div className="text-xs text-slate-400 uppercase font-bold mb-2 flex items-center gap-1">
                    <FileText size={12} /> Uploaded Photos ({project.images.length})
                  </div>
                  <div className="flex gap-3 flex-wrap">
                    {project.images.map((img, i) => (
                      <a key={i} href={`${API}/${img}`} target="_blank" rel="noreferrer"
                        className="text-blue-600 text-sm underline hover:text-blue-800">
                        Photo {i + 1}
                      </a>
                    ))}
                  </div>
                </div>
              )}

              {/* Action buttons */}
              <div className="px-6 py-4">
                {rejectingId === project._id ? (
                  <div className="flex flex-col gap-3">
                    <textarea
                      placeholder="Reason for rejection (developer will see this)..."
                      value={rejectReason}
                      onChange={e => setRejectReason(e.target.value)}
                      className="w-full border border-red-200 rounded-lg p-3 text-sm focus:outline-none focus:ring-2 focus:ring-red-300 resize-none"
                      rows={3}
                    />
                    <div className="flex gap-3">
                      <button
                        onClick={() => handleReject(project._id)}
                        disabled={actionLoading === project._id}
                        className="bg-red-600 text-white px-6 py-2 rounded-lg font-semibold text-sm hover:bg-red-700 transition disabled:opacity-60"
                      >
                        {actionLoading === project._id ? 'Rejecting...' : 'Confirm Rejection'}
                      </button>
                      <button
                        onClick={() => { setRejectingId(null); setRejectReason(''); }}
                        className="text-slate-500 px-4 py-2 rounded-lg text-sm hover:bg-slate-100 transition"
                      >
                        Cancel
                      </button>
                    </div>
                  </div>
                ) : (
                  <div className="flex gap-3">
                    <button
                      onClick={() => handleVerify(project._id)}
                      disabled={actionLoading === project._id}
                      className="bg-green-600 text-white px-6 py-2.5 rounded-lg font-semibold text-sm hover:bg-green-700 transition flex items-center gap-2 disabled:opacity-60"
                    >
                      <ShieldCheck size={16} />
                      {actionLoading === project._id ? 'Verifying...' : 'Approve & Make Live'}
                    </button>
                    <button
                      onClick={() => setRejectingId(project._id)}
                      className="border border-red-200 text-red-600 px-6 py-2.5 rounded-lg font-semibold text-sm hover:bg-red-50 transition flex items-center gap-2"
                    >
                      <XCircle size={16} />
                      Reject
                    </button>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default AdminDashboard;
