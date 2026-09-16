import React from 'react';
import { ArrowLeft, Calendar, User, ArrowRight, AlertCircle } from 'lucide-react';

export default function EventDetailsPage({ event, onBack, onRegister }) {
  if (!event) return null;

  const isClosed = event.eStatus === 'CLOSED';
  const isFull = event.availableCapacity <= 0;
  const fillPercentage = Math.min(100, Math.round(((event.maxCapacity - event.availableCapacity) / event.maxCapacity) * 100));

  return (
    <div style={{ maxWidth: '750px', margin: '0 auto' }}>
      <button onClick={onBack} className="btn btn-secondary" style={{ marginBottom: '18px' }}>
        <ArrowLeft size={16} /> Back to Events Catalog
      </button>

      <div className="card" style={{ padding: '32px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
          <span className={`badge ${isClosed ? 'badge-closed' : isFull ? 'badge-warning' : 'badge-open'}`} style={{ padding: '6px 14px', fontSize: '13px' }}>
            {isClosed ? 'Registration Closed' : isFull ? 'Capacity Full' : 'Registration Open'}
          </span>
          <span style={{ fontSize: '13px', fontWeight: '700', color: '#64748b' }}>
            Event ID: #{event.eId}
          </span>
        </div>

        <h1 style={{ fontSize: '26px', fontWeight: '800', color: '#0f172a', marginBottom: '16px' }}>
          {event.eName}
        </h1>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', background: '#f8fafc', padding: '18px', borderRadius: '10px', marginBottom: '24px' }}>
          <div>
            <div style={{ fontSize: '11px', color: '#64748b' }}>Event Date (E_date)</div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontWeight: '700', fontSize: '15px', color: '#1e293b' }}>
              <Calendar size={16} color="#4f46e5" />
              <span>{event.eDate}</span>
            </div>
          </div>
          <div>
            <div style={{ fontSize: '11px', color: '#64748b' }}>Organizer (organizer_name)</div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontWeight: '700', fontSize: '15px', color: '#1e293b' }}>
              <User size={16} color="#4f46e5" />
              <span>{event.organizerName}</span>
            </div>
          </div>
        </div>

        <div style={{ marginBottom: '28px' }}>
          <h3 style={{ fontSize: '15px', fontWeight: '700', marginBottom: '12px', color: '#0f172a' }}>
            Live Seat Capacity Breakdown
          </h3>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '12px', marginBottom: '12px' }}>
            <div style={{ background: '#f1f5f9', padding: '12px', borderRadius: '8px', textAlign: 'center' }}>
              <div style={{ fontSize: '11px', color: '#64748b' }}>Maximum Capacity</div>
              <div style={{ fontSize: '20px', fontWeight: '800' }}>{event.maxCapacity}</div>
            </div>
            <div style={{ background: '#eef2ff', padding: '12px', borderRadius: '8px', textAlign: 'center' }}>
              <div style={{ fontSize: '11px', color: '#4f46e5' }}>Active Registered</div>
              <div style={{ fontSize: '20px', fontWeight: '800', color: '#4338ca' }}>{event.registeredCount || (event.maxCapacity - event.availableCapacity)}</div>
            </div>
            <div style={{ background: isFull ? '#fef2f2' : '#ecfdf5', padding: '12px', borderRadius: '8px', textAlign: 'center' }}>
              <div style={{ fontSize: '11px', color: isFull ? '#ef4444' : '#059669' }}>Available Capacity</div>
              <div style={{ fontSize: '20px', fontWeight: '800', color: isFull ? '#dc2626' : '#047857' }}>{event.availableCapacity}</div>
            </div>
          </div>

          <div style={{ width: '100%', height: '8px', backgroundColor: '#e2e8f0', borderRadius: '4px', overflow: 'hidden' }}>
            <div style={{ width: `${fillPercentage}%`, height: '100%', backgroundColor: isFull ? '#ef4444' : '#4f46e5' }} />
          </div>
        </div>

        {isClosed ? (
          <div style={{ padding: '14px', background: '#fef2f2', border: '1px solid #fecaca', borderRadius: '8px', color: '#b91c1c', display: 'flex', gap: '8px', alignItems: 'center' }}>
            <AlertCircle size={18} />
            <span>Registration is currently closed for this event.</span>
          </div>
        ) : isFull ? (
          <div style={{ padding: '14px', background: '#fffbeb', border: '1px solid #fde68a', borderRadius: '8px', color: '#b45309', display: 'flex', gap: '8px', alignItems: 'center' }}>
            <AlertCircle size={18} />
            <span>Event capacity is full. Check back later if seats open up due to cancellation.</span>
          </div>
        ) : (
          <button onClick={() => onRegister(event)} className="btn btn-primary" style={{ width: '100%', padding: '12px', fontSize: '15px' }}>
            Register for this Event <ArrowRight size={16} />
          </button>
        )}
      </div>
    </div>
  );
}