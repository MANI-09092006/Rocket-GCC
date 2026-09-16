import React, { useState } from 'react';
import { UserCheck, CheckCircle2, AlertCircle, QrCode } from 'lucide-react';
import { api } from '../api/client';
import PassTicket from '../components/PassTicket';

export default function CheckInPage({ events, onRefreshEvents }) {
  const [selectedEventId, setSelectedEventId] = useState('');
  const [passIdentifier, setPassIdentifier] = useState('');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [errorMsg, setErrorMsg] = useState('');

  const handleCheckIn = async (e) => {
    e.preventDefault();
    if (!passIdentifier.trim()) return;

    setLoading(true);
    setErrorMsg('');
    setResult(null);

    try {
      const payload = {
        passIdentifier: passIdentifier.trim(),
        eId: selectedEventId ? Number(selectedEventId) : null
      };

      const response = await api.checkIn(payload);
      setResult(response);
      setPassIdentifier('');
      if (onRefreshEvents) onRefreshEvents();
    } catch (err) {
      setErrorMsg(err.message || 'Check-in failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ maxWidth: '750px', margin: '0 auto' }}>
      <div style={{ textAlign: 'center', marginBottom: '24px' }}>
        <div style={{
          display: 'inline-flex',
          alignItems: 'center',
          gap: '6px',
          background: 'var(--success-light)',
          color: 'var(--success)',
          padding: '4px 12px',
          borderRadius: '20px',
          fontSize: '12px',
          fontWeight: '700',
          marginBottom: '8px'
        }}>
          <UserCheck size={14} /> Event Day Attendance Portal
        </div>
        <h1 style={{ fontSize: '24px', fontWeight: '800', color: '#0f172a' }}>
          Student Event Check-In
        </h1>
        <p style={{ color: '#64748b', fontSize: '13px' }}>
          Verify registered passes and mark official attendance on the event day. Check-in is allowed only once per pass.
        </p>
      </div>

      <div className="card" style={{ padding: '28px', marginBottom: '24px' }}>
        <form onSubmit={handleCheckIn}>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 2fr', gap: '14px', marginBottom: '14px' }}>
            <div className="form-group" style={{ marginBottom: 0 }}>
              <label className="form-label">Select Event (Optional)</label>
              <select
                className="form-select"
                value={selectedEventId}
                onChange={e => setSelectedEventId(e.target.value)}
              >
                <option value="">Any Active Event</option>
                {events.map(ev => (
                  <option key={ev.eId} value={ev.eId}>{ev.eName} ({ev.eDate})</option>
                ))}
              </select>
            </div>

            <div className="form-group" style={{ marginBottom: 0 }}>
              <label className="form-label">Pass ID (P_id) or Pass Code</label>
              <div style={{ position: 'relative' }}>
                <QrCode size={16} color="#94a3b8" style={{ position: 'absolute', left: '12px', top: '12px' }} />
                <input
                  type="text"
                  required
                  className="form-input"
                  style={{ paddingLeft: '36px' }}
                  placeholder="e.g. 1 or PASS-E1-P0001-..."
                  value={passIdentifier}
                  onChange={e => setPassIdentifier(e.target.value)}
                />
              </div>
            </div>
          </div>

          <button type="submit" disabled={loading} className="btn btn-success" style={{ width: '100%', padding: '12px' }}>
            <UserCheck size={16} /> {loading ? 'Verifying...' : 'Verify Pass & Mark Attendance'}
          </button>
        </form>
      </div>

      {result && (
        <div style={{ marginBottom: '24px' }}>
          <div style={{
            padding: '14px 18px',
            backgroundColor: '#ecfdf5',
            border: '1px solid #a7f3d0',
            borderRadius: '10px',
            display: 'flex',
            gap: '10px',
            alignItems: 'center',
            marginBottom: '18px'
          }}>
            <CheckCircle2 size={20} color="#059669" />
            <div>
              <div style={{ fontWeight: '700', color: '#065f46' }}>{result.message}</div>
              <div style={{ fontSize: '11px', color: '#047857' }}>Record ID #{result.aId}</div>
            </div>
          </div>
          {result.passDetails && <PassTicket pass={result.passDetails} />}
        </div>
      )}

      {errorMsg && (
        <div style={{
          padding: '14px 18px',
          backgroundColor: '#fef2f2',
          border: '1px solid #fecaca',
          borderRadius: '10px',
          display: 'flex',
          gap: '10px',
          alignItems: 'center'
        }}>
          <AlertCircle size={20} color="#dc2626" />
          <div>
            <div style={{ fontWeight: '700', color: '#991b1b' }}>Check-In Rejected</div>
            <div style={{ fontSize: '12px', color: '#b91c1c' }}>{errorMsg}</div>
          </div>
        </div>
      )}
    </div>
  );
}