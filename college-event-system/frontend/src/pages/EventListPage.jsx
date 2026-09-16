import React, { useState } from 'react';
import EventCard from '../components/EventCard';
import { Search, Filter, Sparkles } from 'lucide-react';

export default function EventListPage({ events, loading, onSelectEvent, onRegister }) {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('ALL');

  const filteredEvents = events.filter(e => {
    const matchesSearch = e.eName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          e.organizerName.toLowerCase().includes(searchTerm.toLowerCase());
    if (statusFilter === 'OPEN') return matchesSearch && e.eStatus === 'OPEN' && e.availableCapacity > 0;
    if (statusFilter === 'CLOSED') return matchesSearch && (e.eStatus === 'CLOSED' || e.availableCapacity <= 0);
    return matchesSearch;
  });

  return (
    <div>
      <div style={{
        background: 'linear-gradient(135deg, #1e1b4b, #312e81)',
        color: 'white',
        borderRadius: '20px',
        padding: '36px',
        marginBottom: '28px',
        boxShadow: '0 10px 25px -5px rgba(30, 27, 75, 0.3)'
      }}>
        <div style={{
          display: 'inline-flex',
          alignItems: 'center',
          gap: '6px',
          background: 'rgba(255, 255, 255, 0.15)',
          padding: '4px 12px',
          borderRadius: '20px',
          fontSize: '12px',
          fontWeight: '600',
          marginBottom: '10px'
        }}>
          <Sparkles size={14} color="#fbbf24" /> College Technical Events 2026
        </div>
        <h1 style={{ fontSize: '28px', fontWeight: '800', letterSpacing: '-0.5px', marginBottom: '8px' }}>
          Discover Events, Register & Get Your Pass
        </h1>
        <p style={{ color: '#c7d2fe', fontSize: '14px', maxWidth: '650px' }}>
          Browse upcoming workshops, hackathons, and symposiums. Register once per event, get an instant event pass, and check in on event day.
        </p>
      </div>

      <div style={{ display: 'flex', gap: '14px', alignItems: 'center', justifyContent: 'space-between', marginBottom: '20px', flexWrap: 'wrap' }}>
        <div style={{ position: 'relative', minWidth: '260px', flex: 1 }}>
          <Search size={16} color="#94a3b8" style={{ position: 'absolute', left: '12px', top: '12px' }} />
          <input
            type="text"
            className="form-input"
            style={{ paddingLeft: '36px' }}
            placeholder="Search events by title or organizer..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        <div style={{ display: 'flex', gap: '8px' }}>
          {['ALL', 'OPEN', 'CLOSED'].map(status => (
            <button
              key={status}
              onClick={() => setStatusFilter(status)}
              className="btn btn-secondary"
              style={{
                padding: '7px 12px',
                fontSize: '12px',
                backgroundColor: statusFilter === status ? 'var(--primary-light)' : 'white',
                color: statusFilter === status ? 'var(--primary)' : 'var(--text-muted)',
                borderColor: statusFilter === status ? 'var(--primary)' : 'var(--surface-border)'
              }}
            >
              {status === 'ALL' ? 'All Events' : status === 'OPEN' ? 'Open' : 'Closed/Full'}
            </button>
          ))}
        </div>
      </div>

      {loading ? (
        <div style={{ textAlign: 'center', padding: '50px', color: '#64748b' }}>Loading events...</div>
      ) : filteredEvents.length === 0 ? (
        <div className="card" style={{ textAlign: 'center', padding: '40px', color: '#64748b' }}>
          <h3>No events found</h3>
        </div>
      ) : (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '20px' }}>
          {filteredEvents.map(event => (
            <EventCard key={event.eId} event={event} onSelectEvent={onSelectEvent} onRegister={onRegister} />
          ))}
        </div>
      )}
    </div>
  );
}