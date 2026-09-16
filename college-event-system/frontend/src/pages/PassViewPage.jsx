import React, { useState } from 'react';
import PassTicket from '../components/PassTicket';
import { Search, Mail, Ticket, CheckCircle, AlertCircle } from 'lucide-react';
import { api } from '../api/client';

export default function PassViewPage({ initialPass, onRefreshEvents }) {
  const [searchType, setSearchType] = useState('email');
  const [searchQuery, setSearchQuery] = useState('');
  const [passes, setPasses] = useState(initialPass ? [initialPass] : []);
  const [loading, setLoading] = useState(false);
  const [feedback, setFeedback] = useState(null);
  const [cancellingId, setCancellingId] = useState(null);

  const handleSearch = async (e) => {
    e.preventDefault();
    if (!searchQuery.trim()) return;
    setLoading(true);
    setFeedback(null);

    try {
      if (searchType === 'email') {
        const results = await api.getPassesByEmail(searchQuery.trim());
        setPasses(results);
        if (results.length === 0) {
          setFeedback({ type: 'warning', message: 'No active event passes found for this student email.' });
        }
      } else {
        let result;
        if (/^\d+$/.test(searchQuery.trim())) {
          result = await api.getPassById(searchQuery.trim());
        } else {
          result = await api.getPassByCode(searchQuery.trim());
        }
        setPasses([result]);
      }
    } catch (err) {
      setPasses([]);
      setFeedback({ type: 'danger', message: err.message });
    } finally {
      setLoading(false);
    }
  };

  const handleCancelPass = async (passId) => {
    const confirmCancel = window.confirm('Are you sure you want to cancel this registration? Your pass will be invalidated and the event capacity will become available again.');
    if (!confirmCancel) return;

    setCancellingId(passId);
    setFeedback(null);

    try {
      const res = await api.cancelRegistration(passId);
      setFeedback({ type: 'success', message: res.message });
      setPasses(prev => prev.map(p => p.pId === passId ? { ...p, status: 'CANCELLED' } : p));
      if (onRefreshEvents) onRefreshEvents();
    } catch (err) {
      setFeedback({ type: 'danger', message: err.message });
    } finally {
      setCancellingId(null);
    }
  };

  return (
    <div style={{ maxWidth: '750px', margin: '0 auto' }}>
      <div style={{ textAlign: 'center', marginBottom: '24px' }}>
        <h1 style={{ fontSize: '24px', fontWeight: '800', color: '#0f172a' }}>
          My Event Passes & Cancellation
        </h1>
        <p style={{ color: '#64748b', fontSize: '13px', marginTop: '4px' }}>
          Look up your registered passes, print your digital ticket, or cancel an upcoming registration.
        </p>
      </div>

      <div className="card" style={{ marginBottom: '24px', padding: '20px' }}>
        <form onSubmit={handleSearch}>
          <div style={{ display: 'flex', gap: '10px', alignItems: 'center', marginBottom: '12px' }}>
            <span style={{ fontSize: '12px', fontWeight: '600', color: '#475569' }}>Search by:</span>
            <button
              type="button"
              onClick={() => setSearchType('email')}
              className="btn btn-secondary"
              style={{
                padding: '5px 10px',
                fontSize: '12px',
                backgroundColor: searchType === 'email' ? 'var(--primary-light)' : 'white',
                color: searchType === 'email' ? 'var(--primary)' : 'var(--text-muted)'
              }}
            >
              Email
            </button>
            <button
              type="button"
              onClick={() => setSearchType('id')}
              className="btn btn-secondary"
              style={{
                padding: '5px 10px',
                fontSize: '12px',
                backgroundColor: searchType === 'id' ? 'var(--primary-light)' : 'white',
                color: searchType === 'id' ? 'var(--primary)' : 'var(--text-muted)'
              }}
            >
              Pass ID / Code
            </button>
          </div>

          <div style={{ display: 'flex', gap: '8px' }}>
            <input
              type="text"
              required
              className="form-input"
              placeholder={searchType === 'email' ? 'Enter student email (e.g. alice@college.edu)' : 'Enter Pass ID or Code (e.g. 1 or PASS-...)'}
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
            />
            <button type="submit" disabled={loading} className="btn btn-primary">
              <Search size={16} /> {loading ? 'Finding...' : 'Search'}
            </button>
          </div>
        </form>
      </div>

      {feedback && (
        <div style={{
          padding: '12px 16px',
          borderRadius: '8px',
          fontSize: '13px',
          marginBottom: '20px',
          display: 'flex',
          gap: '8px',
          alignItems: 'center',
          backgroundColor: feedback.type === 'success' ? '#ecfdf5' : feedback.type === 'warning' ? '#fffbeb' : '#fef2f2',
          color: feedback.type === 'success' ? '#047857' : feedback.type === 'warning' ? '#b45309' : '#b91c1c'
        }}>
          {feedback.type === 'success' ? <CheckCircle size={16} /> : <AlertCircle size={16} />}
          <span>{feedback.message}</span>
        </div>
      )}

      {passes.length > 0 && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          {passes.map(pass => (
            <PassTicket
              key={pass.pId}
              pass={pass}
              onCancel={handleCancelPass}
              isCancelling={cancellingId === pass.pId}
            />
          ))}
        </div>
      )}
    </div>
  );
}