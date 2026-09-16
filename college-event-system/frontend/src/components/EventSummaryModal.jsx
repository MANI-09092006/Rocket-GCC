import React from 'react';
import { X, Users, UserCheck, CheckCircle2, Clock } from 'lucide-react';

export default function EventSummaryModal({ summary, onClose }) {
  if (!summary) return null;

  return (
    <div style={{
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      backgroundColor: 'rgba(15, 23, 42, 0.65)',
      backdropFilter: 'blur(4px)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      zIndex: 50,
      padding: '20px'
    }}>
      <div style={{
        background: 'white',
        borderRadius: '16px',
        width: '100%',
        maxWidth: '850px',
        maxHeight: '90vh',
        display: 'flex',
        flexDirection: 'column',
        boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
        overflow: 'hidden'
      }}>
        {/* Header */}
        <div style={{
          padding: '20px 24px',
          borderBottom: '1px solid var(--surface-border)',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center'
        }}>
          <div>
            <div style={{ fontSize: '12px', fontWeight: '700', color: 'var(--primary)', textTransform: 'uppercase' }}>
              Live Event Summary & Statistics
            </div>
            <h2 style={{ fontSize: '20px', fontWeight: '800', color: '#0f172a', marginTop: '2px' }}>
              {summary.eName}
            </h2>
            <div style={{ fontSize: '13px', color: '#64748b', marginTop: '2px' }}>
              Date: {summary.eDate} | Organizer: {summary.organizerName} | Status: <strong>{summary.eStatus}</strong>
            </div>
          </div>
          <button 
            onClick={onClose}
            style={{ background: 'none', border: 'none', cursor: 'pointer', padding: '6px', borderRadius: '8px', color: '#64748b' }}
          >
            <X size={22} />
          </button>
        </div>

        {/* 4 Stat Cards */}
        <div style={{ padding: '24px', overflowY: 'auto' }}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '16px', marginBottom: '24px' }}>
            <div style={{ background: '#f8fafc', border: '1px solid #e2e8f0', borderRadius: '12px', padding: '16px' }}>
              <div style={{ fontSize: '12px', fontWeight: '600', color: '#64748b' }}>Maximum Capacity</div>
              <div style={{ fontSize: '24px', fontWeight: '800', color: '#0f172a', marginTop: '4px' }}>{summary.maxCapacity}</div>
            </div>

            <div style={{ background: '#eef2ff', border: '1px solid #c7d2fe', borderRadius: '12px', padding: '16px' }}>
              <div style={{ fontSize: '12px', fontWeight: '600', color: '#4f46e5' }}>Registered Count</div>
              <div style={{ fontSize: '24px', fontWeight: '800', color: '#4338ca', marginTop: '4px' }}>{summary.registeredCount}</div>
            </div>

            <div style={{ background: '#ecfdf5', border: '1px solid #a7f3d0', borderRadius: '12px', padding: '16px' }}>
              <div style={{ fontSize: '12px', fontWeight: '600', color: '#059669' }}>Available Capacity</div>
              <div style={{ fontSize: '24px', fontWeight: '800', color: '#047857', marginTop: '4px' }}>{summary.availableCapacity}</div>
            </div>

            <div style={{ background: '#fef3c7', border: '1px solid #fde68a', borderRadius: '12px', padding: '16px' }}>
              <div style={{ fontSize: '12px', fontWeight: '600', color: '#b45309' }}>Check-in Count</div>
              <div style={{ fontSize: '24px', fontWeight: '800', color: '#92400e', marginTop: '4px' }}>{summary.checkInCount}</div>
              <div style={{ fontSize: '11px', color: '#b45309', marginTop: '2px' }}>({summary.attendancePercentage}% turn-out)</div>
            </div>
          </div>

          {/* Attendee List Table */}
          <div>
            <h3 style={{ fontSize: '15px', fontWeight: '700', color: '#1e293b', marginBottom: '12px' }}>
              Registered Students Roster ({summary.attendees?.length || 0})
            </h3>
            {(!summary.attendees || summary.attendees.length === 0) ? (
              <div style={{ padding: '30px', textAlign: 'center', color: '#94a3b8', background: '#f8fafc', borderRadius: '10px' }}>
                No students have registered for this event yet.
              </div>
            ) : (
              <div style={{ border: '1px solid #e2e8f0', borderRadius: '10px', overflow: 'hidden' }}>
                <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '13px', textAlign: 'left' }}>
                  <thead style={{ background: '#f8fafc', borderBottom: '1px solid #e2e8f0', color: '#475569' }}>
                    <tr>
                      <th style={{ padding: '10px 14px' }}>Pass ID</th>
                      <th style={{ padding: '10px 14px' }}>Student Name</th>
                      <th style={{ padding: '10px 14px' }}>Department</th>
                      <th style={{ padding: '10px 14px' }}>Email</th>
                      <th style={{ padding: '10px 14px' }}>Check-in Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {summary.attendees.map(att => (
                      <tr key={att.pId} style={{ borderBottom: '1px solid #f1f5f9' }}>
                        <td style={{ padding: '10px 14px', fontFamily: 'monospace', fontWeight: '600' }}>
                          #{att.pId}
                        </td>
                        <td style={{ padding: '10px 14px', fontWeight: '600', color: '#0f172a' }}>{att.stdName}</td>
                        <td style={{ padding: '10px 14px', color: '#64748b' }}>{att.department}</td>
                        <td style={{ padding: '10px 14px', color: '#64748b' }}>{att.email}</td>
                        <td style={{ padding: '10px 14px' }}>
                          {att.checkedIn ? (
                            <span style={{
                              display: 'inline-flex',
                              alignItems: 'center',
                              gap: '4px',
                              padding: '2px 8px',
                              borderRadius: '4px',
                              backgroundColor: '#ecfdf5',
                              color: '#059669',
                              fontWeight: '700',
                              fontSize: '11px'
                            }}>
                              <CheckCircle2 size={12} /> Present
                            </span>
                          ) : (
                            <span style={{
                              display: 'inline-flex',
                              alignItems: 'center',
                              gap: '4px',
                              padding: '2px 8px',
                              borderRadius: '4px',
                              backgroundColor: '#f1f5f9',
                              color: '#64748b',
                              fontWeight: '600',
                              fontSize: '11px'
                            }}>
                              <Clock size={12} /> Pending
                            </span>
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </div>

        {/* Footer */}
        <div style={{ padding: '14px 24px', background: '#f8fafc', borderTop: '1px solid #e2e8f0', textAlign: 'right' }}>
          <button onClick={onClose} className="btn btn-secondary">
            Close Summary
          </button>
        </div>
      </div>
    </div>
  );
}