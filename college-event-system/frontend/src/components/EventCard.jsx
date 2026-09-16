import React from 'react';
import { Calendar, User, Users, CheckCircle, ArrowRight } from 'lucide-react';

export default function EventCard({ event, onSelectEvent, onRegister }) {
  const isClosed = event.eStatus === 'CLOSED';
  const isFull = event.availableCapacity <= 0;
  const fillPercentage = Math.min(100, Math.round(((event.maxCapacity - event.availableCapacity) / event.maxCapacity) * 100));

  return (
    <div className="card" style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between', height: '100%' }}>
      <div>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '14px' }}>
          <span className={`badge ${isClosed ? 'badge-closed' : isFull ? 'badge-warning' : 'badge-open'}`}>
            {isClosed ? 'Registration Closed' : isFull ? 'Capacity Full' : 'Registration Open'}
          </span>
          <span style={{ fontSize: '12px', fontWeight: '700', color: '#64748b' }}>
            ID: #{event.eId}
          </span>
        </div>

        <h3 style={{ fontSize: '18px', fontWeight: '700', marginBottom: '10px', color: '#0f172a', lineHeight: '1.3' }}>
          {event.eName}
        </h3>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', marginBottom: '18px', color: '#475569', fontSize: '13px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <Calendar size={15} color="#6366f1" />
            <span>Date: <strong>{event.eDate}</strong></span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <User size={15} color="#6366f1" />
            <span>Organizer: <strong>{event.organizerName}</strong></span>
          </div>
        </div>

        {/* Capacity Bar */}
        <div style={{ marginBottom: '20px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '12px', marginBottom: '6px', fontWeight: '600' }}>
            <span style={{ color: '#64748b' }}>Capacity Status</span>
            <span style={{ color: isFull ? '#ef4444' : '#10b981' }}>
              {event.availableCapacity} / {event.maxCapacity} Seats Available
            </span>
          </div>
          <div style={{ width: '100%', height: '8px', backgroundColor: '#e2e8f0', borderRadius: '4px', overflow: 'hidden' }}>
            <div 
              style={{ 
                width: `${fillPercentage}%`, 
                height: '100%', 
                backgroundColor: isFull ? '#ef4444' : fillPercentage > 75 ? '#f59e0b' : '#4f46e5',
                transition: 'width 0.4s ease'
              }} 
            />
          </div>
        </div>
      </div>

      <div style={{ display: 'flex', gap: '10px', marginTop: 'auto' }}>
        <button
          onClick={() => onSelectEvent(event)}
          className="btn btn-secondary"
          style={{ flex: 1 }}
        >
          Details
        </button>
        <button
          onClick={() => onRegister(event)}
          disabled={isClosed || isFull}
          className="btn btn-primary"
          style={{ flex: 1 }}
        >
          Register <ArrowRight size={15} />
        </button>
      </div>
    </div>
  );
}