import React, { useState } from 'react';
import { ArrowLeft, User, Mail, Lock, Phone, Building, AlertCircle } from 'lucide-react';
import { api } from '../api/client';

export default function RegistrationPage({ event, onBack, onSuccessPass }) {
  const [formData, setFormData] = useState({
    stdName: '',
    department: 'Computer Science & Eng',
    email: '',
    password: '',
    phno: ''
  });
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  const departments = [
    'Computer Science & Eng',
    'Information Technology',
    'Electronics & Communication',
    'Electrical & Electronics',
    'Mechanical Engineering',
    'Civil Engineering',
    'Artificial Intelligence & DS'
  ];

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMsg('');
    setLoading(true);

    try {
      const payload = {
        eId: event.eId,
        stdName: formData.stdName,
        department: formData.department,
        email: formData.email,
        password: formData.password,
        phno: formData.phno
      };
      const pass = await api.registerStudent(payload);
      onSuccessPass(pass);
    } catch (err) {
      setErrorMsg(err.message || 'Failed to complete registration');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ maxWidth: '600px', margin: '0 auto' }}>
      <button onClick={onBack} className="btn btn-secondary" style={{ marginBottom: '18px' }}>
        <ArrowLeft size={16} /> Back to Event Details
      </button>

      <div className="card" style={{ padding: '32px' }}>
        <div style={{ marginBottom: '20px', borderBottom: '1px solid var(--surface-border)', paddingBottom: '14px' }}>
          <div style={{ fontSize: '11px', fontWeight: '700', color: 'var(--primary)', textTransform: 'uppercase' }}>
            Student Event Registration
          </div>
          <h2 style={{ fontSize: '20px', fontWeight: '800', color: '#0f172a', marginTop: '2px' }}>
            {event.eName}
          </h2>
          <div style={{ fontSize: '12px', color: '#64748b' }}>
            Date: {event.eDate} | Available Seats: <strong>{event.availableCapacity}</strong>
          </div>
        </div>

        {errorMsg && (
          <div style={{ padding: '12px', background: '#fef2f2', border: '1px solid #fecaca', borderRadius: '8px', color: '#b91c1c', fontSize: '13px', display: 'flex', gap: '8px', alignItems: 'center', marginBottom: '16px' }}>
            <AlertCircle size={18} />
            <span>{errorMsg}</span>
          </div>
        )}

        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label className="form-label">Student Name (std_name)</label>
            <div style={{ position: 'relative' }}>
              <User size={15} color="#94a3b8" style={{ position: 'absolute', left: '12px', top: '13px' }} />
              <input
                type="text"
                required
                className="form-input"
                style={{ paddingLeft: '36px' }}
                placeholder="Student Name"
                value={formData.stdName}
                onChange={e => setFormData({ ...formData, stdName: e.target.value })}
              />
            </div>
          </div>

          <div className="form-group">
            <label className="form-label">Department (Department)</label>
            <div style={{ position: 'relative' }}>
              <Building size={15} color="#94a3b8" style={{ position: 'absolute', left: '12px', top: '13px' }} />
              <select
                className="form-select"
                style={{ paddingLeft: '36px' }}
                value={formData.department}
                onChange={e => setFormData({ ...formData, department: e.target.value })}
              >
                {departments.map(d => <option key={d} value={d}>{d}</option>)}
              </select>
            </div>
          </div>

          <div className="form-group">
            <label className="form-label">Email Address (Email)</label>
            <div style={{ position: 'relative' }}>
              <Mail size={15} color="#94a3b8" style={{ position: 'absolute', left: '12px', top: '13px' }} />
              <input
                type="email"
                required
                className="form-input"
                style={{ paddingLeft: '36px' }}
                placeholder="student@college.edu"
                value={formData.email}
                onChange={e => setFormData({ ...formData, email: e.target.value })}
              />
            </div>
          </div>

          <div className="form-group">
            <label className="form-label">Password (Password)</label>
            <div style={{ position: 'relative' }}>
              <Lock size={15} color="#94a3b8" style={{ position: 'absolute', left: '12px', top: '13px' }} />
              <input
                type="password"
                required
                className="form-input"
                style={{ paddingLeft: '36px' }}
                placeholder="Password"
                value={formData.password}
                onChange={e => setFormData({ ...formData, password: e.target.value })}
              />
            </div>
          </div>

          <div className="form-group">
            <label className="form-label">Phone Number (Phno)</label>
            <div style={{ position: 'relative' }}>
              <Phone size={15} color="#94a3b8" style={{ position: 'absolute', left: '12px', top: '13px' }} />
              <input
                type="tel"
                required
                className="form-input"
                style={{ paddingLeft: '36px' }}
                placeholder="9876543210"
                value={formData.phno}
                onChange={e => setFormData({ ...formData, phno: e.target.value })}
              />
            </div>
          </div>

          <button type="submit" disabled={loading} className="btn btn-primary" style={{ width: '100%', padding: '12px', fontSize: '15px' }}>
            {loading ? 'Submitting & Generating Pass...' : 'Confirm Registration & Get Pass'}
          </button>
        </form>
      </div>
    </div>
  );
}