import React, { useState } from 'react';
import { Plus, BarChart3, Users, Calendar } from 'lucide-react';
import { api } from '../api/client';
import EventSummaryModal from '../components/EventSummaryModal';

export default function OrganizerDashboardPage({ events, onRefreshEvents }) {
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [selectedSummary, setSelectedSummary] = useState(null);
  const [loadingSummary, setLoadingSummary] = useState(false);
  const [createLoading, setCreateLoading] = useState(false);
  const [createError, setCreateError] = useState('');

  const [newEvent, setNewEvent] = useState({
    eName: '',
    eDate: '',
    organizerName: '',
    maxCapacity: 50,
    eStatus: 'OPEN'
  });

  const handleCreateSubmit = async (e) => {
    e.preventDefault();
    setCreateError('');
    setCreateLoading(true);

    try {
      await api.createEvent({
        ...newEvent,
        maxCapacity: Number(newEvent.maxCapacity)
      });
      setShowCreateModal(false);
      setNewEvent({ eName: '', eDate: '', organizerName: '', maxCapacity: 50, eStatus: 'OPEN' });
      if (onRefreshEvents) onRefreshEvents();
    } catch (err) {
      setCreateError(err.message || 'Failed to create event');
    } finally {
      setCreateLoading(false);
    }
  };

  const handleViewSummary = async (eventId) => {
    setLoadingSummary(true);
    try {
      const summary = await api.getEventSummary(eventId);
      setSelectedSummary(summary);
    } catch (err) {
      alert('Could not fetch event summary: ' + err.message);
    } finally {
      setLoadingSummary(false);
    }
  };

  const handleToggleStatus = async (eventId, currentStatus) => {
    const nextStatus = currentStatus === 'OPEN' ? 'CLOSED' : 'OPEN';
    try {
      await api.updateEventStatus(eventId, nextStatus);
      if (onRefreshEvents) onRefreshEvents();
    } catch (err) {
      alert('Failed to update event status: ' + err.message);
    }
  };

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
        <div>
          <h1 style={{ fontSize: '24px', fontWeight: '800', color: '#0f172a' }}>
            Event Organizer Management Portal
          </h1>
          <p style={{ color: '#64748b', fontSize: '13px', marginTop: '2px' }}>
            Create events, view real-time capacities, registrations, check-ins, and inspect student rosters.
          </p>
        </div>

        <button onClick={() => setShowCreateModal(true)} className="btn btn-primary">
          <Plus size={16} /> Create New Event
        </button>
      </div>

      <div className="card" style={{ padding: 0, overflow: 'hidden' }}>
        <div style={{ padding: '16px 20px', borderBottom: '1px solid var(--surface-border)', background: '#f8fafc' }}>
          <h3 style={{ fontSize: '15px', fontWeight: '700', color: '#0f172a' }}>
            All Technical Events & Live Summaries
          </h3>
        </div>

        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '13px', textAlign: 'left' }}>
            <thead style={{ background: '#f8fafc', borderBottom: '1px solid #e2e8f0', color: '#475569' }}>
              <tr>
                <th style={{ padding: '10px 16px' }}>ID</th>
                <th style={{ padding: '10px 16px' }}>Event Name (E_name)</th>
                <th style={{ padding: '10px 16px' }}>Date (E_date)</th>
                <th style={{ padding: '10px 16px' }}>Organizer</th>
                <th style={{ padding: '10px 16px' }}>Max Capacity</th>
                <th style={{ padding: '10px 16px' }}>Registered</th>
                <th style={{ padding: '10px 16px' }}>Available</th>
                <th style={{ padding: '10px 16px' }}>Check-in</th>
                <th style={{ padding: '10px 16px' }}>Status (E_status)</th>
                <th style={{ padding: '10px 16px', textAlign: 'right' }}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {events.map(ev => {
                const isClosed = ev.eStatus === 'CLOSED';
                const isFull = ev.availableCapacity <= 0;
                return (
                  <tr key={ev.eId} style={{ borderBottom: '1px solid #f1f5f9' }}>
                    <td style={{ padding: '12px 16px', fontWeight: '700', color: '#64748b' }}>#{ev.eId}</td>
                    <td style={{ padding: '12px 16px', fontWeight: '700', color: '#0f172a' }}>{ev.eName}</td>
                    <td style={{ padding: '12px 16px', color: '#475569' }}>{ev.eDate}</td>
                    <td style={{ padding: '12px 16px', color: '#475569' }}>{ev.organizerName}</td>
                    <td style={{ padding: '12px 16px', fontWeight: '700' }}>{ev.maxCapacity}</td>
                    <td style={{ padding: '12px 16px', fontWeight: '700', color: '#4f46e5' }}>{ev.registeredCount}</td>
                    <td style={{ padding: '12px 16px', fontWeight: '700', color: isFull ? '#ef4444' : '#059669' }}>{ev.availableCapacity}</td>
                    <td style={{ padding: '12px 16px', fontWeight: '700', color: '#b45309' }}>{ev.checkInCount || 0}</td>
                    <td style={{ padding: '12px 16px' }}>
                      <button
                        onClick={() => handleToggleStatus(ev.eId, ev.eStatus)}
                        style={{ border: 'none', background: 'none', cursor: 'pointer', padding: 0 }}
                        title="Click to toggle status"
                      >
                        <span className={`badge ${isClosed ? 'badge-closed' : 'badge-open'}`}>
                          {ev.eStatus}
                        </span>
                      </button>
                    </td>
                    <td style={{ padding: '12px 16px', textAlign: 'right' }}>
                      <button
                        onClick={() => handleViewSummary(ev.eId)}
                        disabled={loadingSummary}
                        className="btn btn-secondary"
                        style={{ padding: '5px 10px', fontSize: '12px' }}
                      >
                        <BarChart3 size={14} /> View Summary
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* Modal: Create Event */}
      {showCreateModal && (
        <div style={{
          position: 'fixed',
          top: 0, left: 0, right: 0, bottom: 0,
          backgroundColor: 'rgba(15, 23, 42, 0.6)',
          backdropFilter: 'blur(3px)',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          zIndex: 50, padding: '20px'
        }}>
          <div style={{
            background: 'white',
            borderRadius: '14px',
            width: '100%',
            maxWidth: '500px',
            padding: '28px',
            boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.2)'
          }}>
            <h2 style={{ fontSize: '18px', fontWeight: '800', marginBottom: '16px' }}>Create Technical Event</h2>
            {createError && (
              <div style={{ padding: '8px 12px', background: '#fef2f2', color: '#b91c1c', borderRadius: '6px', fontSize: '12px', marginBottom: '14px' }}>
                {createError}
              </div>
            )}
            <form onSubmit={handleCreateSubmit}>
              <div className="form-group">
                <label className="form-label">Event Name (E_name)</label>
                <input
                  type="text"
                  required
                  className="form-input"
                  placeholder="e.g. AI & ML Symposium"
                  value={newEvent.eName}
                  onChange={e => setNewEvent({ ...newEvent, eName: e.target.value })}
                />
              </div>
              <div className="form-group">
                <label className="form-label">Event Date (E_date)</label>
                <input
                  type="date"
                  required
                  className="form-input"
                  value={newEvent.eDate}
                  onChange={e => setNewEvent({ ...newEvent, eDate: e.target.value })}
                />
              </div>
              <div className="form-group">
                <label className="form-label">Organizer Name (organizer_name)</label>
                <input
                  type="text"
                  required
                  className="form-input"
                  placeholder="e.g. Dr. Ramesh Kumar (CSE)"
                  value={newEvent.organizerName}
                  onChange={e => setNewEvent({ ...newEvent, organizerName: e.target.value })}
                />
              </div>
              <div className="form-group">
                <label className="form-label">Maximum Capacity (max_capacity)</label>
                <input
                  type="number"
                  min="1"
                  required
                  className="form-input"
                  value={newEvent.maxCapacity}
                  onChange={e => setNewEvent({ ...newEvent, maxCapacity: e.target.value })}
                />
              </div>
              <div className="form-group">
                <label className="form-label">Status (E_status)</label>
                <select
                  className="form-select"
                  value={newEvent.eStatus}
                  onChange={e => setNewEvent({ ...newEvent, eStatus: e.target.value })}
                >
                  <option value="OPEN">OPEN</option>
                  <option value="CLOSED">CLOSED</option>
                </select>
              </div>
              <div style={{ display: 'flex', gap: '10px', justifyContent: 'flex-end', marginTop: '20px' }}>
                <button type="button" onClick={() => setShowCreateModal(false)} className="btn btn-secondary">
                  Cancel
                </button>
                <button type="submit" disabled={createLoading} className="btn btn-primary">
                  {createLoading ? 'Creating...' : 'Create Event'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {selectedSummary && (
        <EventSummaryModal summary={selectedSummary} onClose={() => setSelectedSummary(null)} />
      )}
    </div>
  );
}