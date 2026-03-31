import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Upload, MapPin, FileText, DollarSign, Building, CheckCircle, Receipt } from 'lucide-react';

const API = 'http://localhost:5000';

const steps = ['মূল তথ্য', 'আইনি ও অবস্থান', 'আর্থিক তথ্য', 'ছবি ও জমা দিন'];

const ProjectOnboardingForm = () => {
  const navigate = useNavigate();
  const [step, setStep] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    projectType: 'Residential',
    area: '',
    address: '',
    rajukApprovalNo: '',
    landMutationStatus: 'Pending',
    goalAmount: '',
    minInvestment: '',
    completionPercentage: 0,
    currentPhase: '',
    plannedHandoverDate: '',
    transactionId: '',
    photos: null,
  });

  const set = (field, value) => setFormData(prev => ({ ...prev, [field]: value }));

  const inputClass = {
    width: '100%', border: '1px solid #e2e8f0', borderRadius: 10,
    padding: '10px 14px', fontSize: 14, outline: 'none',
    fontFamily: "'Hind Siliguri', 'Noto Sans Bengali', sans-serif",
    background: '#fff', boxSizing: 'border-box',
  };
  const labelStyle = { display: 'block', fontSize: 13, fontWeight: 700, color: '#475569', marginBottom: 6 };

  const handleSubmit = async () => {
    setIsSubmitting(true);
    const data = new FormData();
    Object.keys(formData).forEach(key => {
      if (key === 'photos' && formData[key]) {
        for (let i = 0; i < formData[key].length; i++) {
          data.append('photos', formData[key][i]);
        }
      } else {
        data.append(key, formData[key]);
      }
    });

    try {
      const token = localStorage.getItem('token');
      await axios.post(`${API}/api/projects/create`, data, {
        headers: {
          'Content-Type': 'multipart/form-data',
          Authorization: `Bearer ${token}`,
        }
      });
      alert('🚀 প্রজেক্ট সফলভাবে জমা দেওয়া হয়েছে! অ্যাডমিন যাচাই করার পর এটি লাইভ হবে।');
      navigate('/developer');
    } catch (err) {
      alert(err.response?.data?.message || 'জমা দিতে ব্যর্থ। আপনি কি ডেভেলপার হিসেবে লগইন করেছেন?');
    } finally {
      setIsSubmitting(false);
    }
  };

  const renderStep = () => {
    switch (step) {
      case 0:
        return (
          <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
            <div>
              <label style={labelStyle}>প্রজেক্টের নাম *</label>
              <input style={inputClass} placeholder="যেমন: বসুন্ধরা হাইটস ফেজ ২"
                value={formData.title} onChange={e => set('title', e.target.value)} />
            </div>
            <div>
              <label style={labelStyle}>বিবরণ</label>
              <textarea style={{ ...inputClass, resize: 'vertical' }} rows={4}
                placeholder="প্রজেক্টের হাইলাইট, টার্গেট ক্রেতা সম্পর্কে লিখুন..."
                value={formData.description} onChange={e => set('description', e.target.value)} />
            </div>
            <div>
              <label style={labelStyle}>প্রজেক্টের ধরন</label>
              <select style={inputClass} value={formData.projectType} onChange={e => set('projectType', e.target.value)}>
                <option value="Residential">আবাসিক (Residential)</option>
                <option value="Commercial">বাণিজ্যিক (Commercial)</option>
                <option value="Mixed">মিশ্র (Mixed Use)</option>
              </select>
            </div>
            <div>
              <label style={labelStyle}>বর্তমান পর্যায়</label>
              <input style={inputClass} placeholder="যেমন: ফাউন্ডেশন সম্পন্ন, ৩য় তলা নির্মাণাধীন"
                value={formData.currentPhase} onChange={e => set('currentPhase', e.target.value)} />
            </div>
            <div>
              <label style={labelStyle}>নির্মাণ সম্পন্নের হার % (০-১০০)</label>
              <input type="number" min={0} max={100} style={inputClass}
                value={formData.completionPercentage} onChange={e => set('completionPercentage', e.target.value)} />
            </div>
          </div>
        );
      case 1:
        return (
          <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
            <div>
              <label style={labelStyle}><MapPin size={13} style={{ display: 'inline', marginRight: 4 }} />ঢাকার এলাকা *</label>
              <input style={inputClass} placeholder="যেমন: বসুন্ধরা, উত্তরা, গুলশান"
                value={formData.area} onChange={e => set('area', e.target.value)} />
            </div>
            <div>
              <label style={labelStyle}>পূর্ণ ঠিকানা</label>
              <input style={inputClass} placeholder="প্লট ১২, রোড ৫, ব্লক বি, বসুন্ধরা আ/এ"
                value={formData.address} onChange={e => set('address', e.target.value)} />
            </div>
            <div>
              <label style={labelStyle}><FileText size={13} style={{ display: 'inline', marginRight: 4 }} />রাজউক অনুমোদন নম্বর</label>
              <input style={inputClass} placeholder="যেমন: RAJUK/DAP/2024/1234"
                value={formData.rajukApprovalNo} onChange={e => set('rajukApprovalNo', e.target.value)} />
              <p style={{ fontSize: 12, color: '#94a3b8', marginTop: 4 }}>অ্যাডমিন যাচাইয়ের জন্য এটি গুরুত্বপূর্ণ।</p>
            </div>
            <div>
              <label style={labelStyle}>ভূমি পরিবর্তনের অবস্থা</label>
              <select style={inputClass} value={formData.landMutationStatus} onChange={e => set('landMutationStatus', e.target.value)}>
                <option value="Pending">প্রক্রিয়াধীন (Pending)</option>
                <option value="Completed">সম্পন্ন (Completed)</option>
              </select>
            </div>
            <div>
              <label style={labelStyle}>পরিকল্পিত হস্তান্তর তারিখ</label>
              <input type="date" style={inputClass} value={formData.plannedHandoverDate}
                onChange={e => set('plannedHandoverDate', e.target.value)} />
            </div>
          </div>
        );
      case 2:
        return (
          <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
            <div>
              <label style={labelStyle}><DollarSign size={13} style={{ display: 'inline', marginRight: 4 }} />লক্ষ্যমাত্রা (৳)</label>
              <input type="number" style={inputClass} placeholder="যেমন: ৫,০০,০০,০০০"
                value={formData.goalAmount} onChange={e => set('goalAmount', e.target.value)} />
            </div>
            <div>
              <label style={labelStyle}>সর্বনিম্ন বিনিয়োগ (৳)</label>
              <input type="number" style={inputClass} placeholder="যেমন: ৫,০০,০০০"
                value={formData.minInvestment} onChange={e => set('minInvestment', e.target.value)} />
            </div>

            {/* TRANSACTION FIELD */}
            <div style={{
              background: '#fefce8', border: '1px solid #fde68a',
              borderRadius: 14, padding: 20, marginTop: 8
            }}>
              <label style={{ ...labelStyle, color: '#92400e', fontSize: 14, display: 'flex', alignItems: 'center', gap: 6 }}>
                <Receipt size={16} /> ট্রানজ্যাকশন আইডি
              </label>
              <input style={{ ...inputClass, border: '1px solid #fcd34d', background: '#fffbeb' }}
                placeholder="বিকাশ/রকেট ট্রানজ্যাকশন আইডি লিখুন"
                value={formData.transactionId} onChange={e => set('transactionId', e.target.value)} />
              <div style={{
                marginTop: 14, background: '#fff7ed', border: '1px solid #fed7aa',
                borderRadius: 10, padding: '12px 16px',
                fontSize: 13, color: '#9a3412', lineHeight: 1.8
              }}>
                আপনার প্রথম প্রজেক্টটি বিনামূল্যে পোস্ট করুন। এরপর থেকে আমরা <strong>৫০০ টাকা</strong> চার্জ করব।<br />
                বিকাশ/রোকেট — <strong>01515666186</strong> এ পাঠান এবং ট্রানজ্যাকশন আইডি শেয়ার করুন।
              </div>
            </div>
          </div>
        );
      case 3:
        return (
          <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
            <div>
              <label style={labelStyle}><Upload size={13} style={{ display: 'inline', marginRight: 4 }} />প্রজেক্টের ছবি (সর্বোচ্চ ১০টি)</label>
              <input type="file" multiple accept="image/*"
                style={{ width: '100%', border: '2px dashed #cbd5e1', borderRadius: 12, padding: 20, fontSize: 13, cursor: 'pointer', boxSizing: 'border-box' }}
                onChange={e => set('photos', e.target.files)} />
              <p style={{ fontSize: 12, color: '#94a3b8', marginTop: 6 }}>
                সাইটের ছবি, অগ্রগতির ছবি, ফ্লোর প্ল্যান আপলোড করুন।
              </p>
            </div>

            {/* Summary */}
            <div style={{ background: '#f8fafc', border: '1px solid #e2e8f0', borderRadius: 14, padding: 20 }}>
              <p style={{ fontWeight: 800, color: '#1e293b', marginBottom: 14, fontSize: 15 }}>জমার সারসংক্ষেপ</p>
              {[
                ['প্রজেক্ট', formData.title || '—'],
                ['অবস্থান', formData.area || '—'],
                ['রাজউক নং', formData.rajukApprovalNo || 'প্রদত্ত নয়'],
                ['সর্বনিম্ন বিনিয়োগ', formData.minInvestment ? `৳${Number(formData.minInvestment).toLocaleString()}` : '—'],
                ['ট্রানজ্যাকশন আইডি', formData.transactionId || 'প্রদত্ত নয়'],
                ['ছবি', `${formData.photos?.length || 0}টি নির্বাচিত`],
              ].map(([k, v]) => (
                <div key={k} style={{ display: 'flex', justifyContent: 'space-between', fontSize: 13, padding: '6px 0', borderBottom: '1px solid #f1f5f9' }}>
                  <span style={{ color: '#64748b' }}>{k}</span>
                  <span style={{ fontWeight: 600, color: '#0f172a' }}>{v}</span>
                </div>
              ))}
            </div>

            <div style={{ background: '#fffbeb', border: '1px solid #fde68a', borderRadius: 12, padding: 16, fontSize: 13, color: '#92400e', lineHeight: 1.8 }}>
              জমা দেওয়ার পর অ্যাডমিন ২৪-৪৮ ঘণ্টার মধ্যে আপনার প্রজেক্ট পর্যালোচনা করবেন।
            </div>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div style={{ maxWidth: 640, margin: '40px auto', padding: '0 16px', fontFamily: "'Hind Siliguri', 'Noto Sans Bengali', sans-serif" }}>

      {/* Header */}
      <div style={{ textAlign: 'center', marginBottom: 36 }}>
        <div style={{
          width: 56, height: 56, borderRadius: 16, margin: '0 auto 16px',
          background: 'linear-gradient(135deg, #3b82f6, #06b6d4)',
          display: 'flex', alignItems: 'center', justifyContent: 'center'
        }}>
          <Building size={28} color="#fff" />
        </div>
        <h1 style={{ fontSize: 28, fontWeight: 900, color: '#0f172a', marginBottom: 8 }}>প্রজেক্ট জমা দিন</h1>
        <p style={{ color: '#64748b', fontSize: 14 }}>প্রতিটি ধাপ পূরণ করুন — অ্যাডমিনের অনুমোদনের পর লাইভ হবে।</p>
      </div>

      {/* Step indicator */}
      <div style={{ display: 'flex', alignItems: 'center', marginBottom: 36 }}>
        {steps.map((label, i) => (
          <React.Fragment key={i}>
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
              <div style={{
                width: 34, height: 34, borderRadius: '50%',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontSize: 14, fontWeight: 700,
                background: i < step ? '#22c55e' : i === step ? 'linear-gradient(135deg,#3b82f6,#06b6d4)' : '#e2e8f0',
                color: i <= step ? '#fff' : '#94a3b8',
                boxShadow: i === step ? '0 4px 12px rgba(59,130,246,0.4)' : 'none',
                transition: 'all 0.3s'
              }}>
                {i < step ? <CheckCircle size={18} /> : i + 1}
              </div>
              <span style={{ fontSize: 11, marginTop: 4, color: i === step ? '#3b82f6' : '#94a3b8', fontWeight: i === step ? 700 : 400, whiteSpace: 'nowrap' }}>
                {label}
              </span>
            </div>
            {i < steps.length - 1 && (
              <div style={{ flex: 1, height: 2, margin: '0 6px 20px', background: i < step ? '#22c55e' : '#e2e8f0', transition: 'background 0.3s' }} />
            )}
          </React.Fragment>
        ))}
      </div>

      {/* Form card */}
      <div style={{ background: '#fff', borderRadius: 20, border: '1px solid #e2e8f0', boxShadow: '0 4px 24px rgba(0,0,0,0.06)', padding: 32, marginBottom: 24 }}>
        <h2 style={{ fontSize: 18, fontWeight: 800, color: '#0f172a', marginBottom: 24 }}>{steps[step]}</h2>
        {renderStep()}
      </div>

      {/* Navigation */}
      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
        <button onClick={() => setStep(s => s - 1)} disabled={step === 0}
          style={{
            padding: '10px 24px', borderRadius: 12, border: '1px solid #e2e8f0',
            background: '#fff', color: '#64748b', fontWeight: 600, fontSize: 14,
            cursor: step === 0 ? 'not-allowed' : 'pointer', opacity: step === 0 ? 0.4 : 1,
            fontFamily: "'Hind Siliguri', 'Noto Sans Bengali', sans-serif"
          }}>
          ← পিছে
        </button>

        {step < steps.length - 1 ? (
          <button onClick={() => setStep(s => s + 1)} disabled={step === 0 && !formData.title}
            style={{
              padding: '10px 28px', borderRadius: 12, border: 'none',
              background: 'linear-gradient(135deg, #3b82f6, #06b6d4)',
              color: '#fff', fontWeight: 700, fontSize: 14,
              cursor: !formData.title && step === 0 ? 'not-allowed' : 'pointer',
              opacity: !formData.title && step === 0 ? 0.5 : 1,
              boxShadow: '0 4px 12px rgba(59,130,246,0.3)',
              fontFamily: "'Hind Siliguri', 'Noto Sans Bengali', sans-serif"
            }}>
            পরবর্তী →
          </button>
        ) : (
          <button onClick={handleSubmit} disabled={isSubmitting || !formData.title || !formData.area}
            style={{
              padding: '10px 28px', borderRadius: 12, border: 'none',
              background: 'linear-gradient(135deg, #16a34a, #15803d)',
              color: '#fff', fontWeight: 700, fontSize: 14,
              cursor: 'pointer', opacity: isSubmitting ? 0.6 : 1,
              boxShadow: '0 4px 12px rgba(22,163,74,0.3)',
              fontFamily: "'Hind Siliguri', 'Noto Sans Bengali', sans-serif"
            }}>
            {isSubmitting ? 'জমা হচ্ছে...' : '🚀 যাচাইয়ের জন্য জমা দিন'}
          </button>
        )}
      </div>
    </div>
  );
};

export default ProjectOnboardingForm;
