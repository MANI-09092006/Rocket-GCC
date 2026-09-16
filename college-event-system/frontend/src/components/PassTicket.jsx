import React from 'react';
import { Printer, XCircle, CheckCircle, Calendar, User, Mail, Phone, Building, AlertTriangle } from 'lucide-react';

export default function PassTicket({ pass, onCancel, isCancelling }) {
  if (!pass) return null;

  const isCancelled = pass.status === 'CANCELLED';
  const isCheckedIn = pass.checkedIn;

  const handlePrint = () => {
    window.print();
  };

  return (
    <div style={{ maxWidth: '750px', margin: '0 auto' }}>
      {/* Visual Boarding Pass Style Card */}
      <div 
        className="printable-ticket"
        style={{
          background: 'white',
          borderRadius: '16px',
          border: '1px solid #e2e8f0',
          boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1)',
          overflow: 'hidden',
          position: 'relative'
        }}
      >
        {/* Pass Top Banner */}
        <div style={{
          background: isCancelled 
            ? 'linear-gradient(135deg, #ef4444, #b91c1c)' 
            : isCheckedIn 
              ? 'linear-gradient(135deg, #059669, #047857)' 
              : 'linear-gradient(135deg, #4f46e5, #7c3aed)',
          color: 'white',
          padding: '20px 28px',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center'
        }}>
          <div>
            <div style={{ fontSize: '11px', textTransform: 'uppercase', letterSpacing: '1px', opacity: 0.9 }}>
              Official College Event Pass
            </div>
            <h2 style={{ fontSize: '22px', fontWeight: '800', marginTop: '2px' }}>
              {pass.eName || 'College Event'}
            </h2>
          </div>
          <div style={{ textAlign: 'right' }}>
            <span style={{
              display: 'inline-block',
              padding: '6px 14px',
              borderRadius: '20px',
              fontSize: '12px',
              fontWeight: '800',
              backgroundColor: 'rgba(255, 255, 255, 0.25)',
              border: '1px solid rgba(255, 255, 255, 0.4)'
            }}>
              {isCancelled ? 'CANCELLED' : isCheckedIn ? 'CHECKED IN' : 'CONFIRMED PASS'}
            </span>
            <div style={{ fontSize: '12px', marginTop: '4px', opacity: 0.85, fontFamily: 'monospace' }}>
              #{pass.passCode || `PASS-${pass.pId}`}
            </div>
          </div>
        </div>

        {/* Pass Content Grid */}
        <div style={{ padding: '28px', display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '24px' }}>
          {/* Left Column: Event & Student Details */}
          <div>
            <div style={{ marginBottom: '20px' }}>
              <div style={{ fontSize: '11px', fontWeight: '700', textTransform: 'uppercase', color: '#64748b', marginBottom: '8px' }}>
                Student Details
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px', background: '#f8fafc', padding: '16px', borderRadius: '10px' }}>
                <div>
                  <div style={{ fontSize: '11px', color: '#94a3b8' }}>Student Name</div>
                  <div style={{ fontWeight: '700', fontSize: '15px', color: '#0f172a' }}>{pass.stdName}</div>
                </div>
                <div>
                  <div style={{ fontSize: '11px', color: '#94a3b8' }}>Department</div>
                  <div style={{ fontWeight: '600', fontSize: '14px', color: '#334155' }}>{pass.department}</div>
                </div>
                <div>
                  <div style={{ fontSize: '11px', color: '#94a3b8' }}>Email Address</div>
                  <div style={{ fontSize: '13px', color: '#334155' }}>{pass.email}</div>
                </div>
                <div>
                  <div style={{ fontSize: '11px', color: '#94a3b8' }}>Phone Number</div>
                  <div style={{ fontSize: '13px', color: '#334155' }}>{pass.phno}</div>
                </div>
              </div>
            </div>

            <div>
              <div style={{ fontSize: '11px', fontWeight: '700', textTransform: 'uppercase', color: '#64748b', marginBottom: '8px' }}>
                Event Details
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px', background: '#f8fafc', padding: '16px', borderRadius: '10px' }}>
                <div>
                  <div style={{ fontSize: '11px', color: '#94a3b8' }}>Event Date</div>
                  <div style={{ fontWeight: '700', fontSize: '15px', color: '#4f46e5' }}>{pass.eDate}</div>
                </div>
                <div>
                  <div style={{ fontSize: '11px', color: '#94a3b8' }}>Organizer</div>
                  <div style={{ fontWeight: '600', fontSize: '14px', color: '#334155' }}>{pass.organizerName}</div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Pass QR Simulation & Check-in Verification */}
          <div style={{
            borderLeft: '2px dashed #e2e8f0',
            paddingLeft: '24px',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            textAlign: 'center'
          }}>
            {/* SVG QR Code Simulation */}
            <div style={{
              background: '#f8fafc',
              padding: '12px',
              borderRadius: '12px',
              border: '1px solid #cbd5e1',
              marginBottom: '12px'
            }}>
              <svg width="120" height="120" viewBox="0 0 100 100" fill="currentColor">
                {/* Simulated QR blocks */}
                <rect x="10" y="10" width="25" height="25" rx="3" fill="#1e1b4b" />
                <rect x="15" y="15" width="15" height="15" fill="white" />
                <rect x="18" y="18" width="9" height="9" fill="#1e1b4b" />

                <rect x="65" y="10" width="25" height="25" rx="3" fill="#1e1b4b" />
                <rect x="70" y="15" width="15" height="15" fill="white" />
                <rect x="73" y="18" width="9" height="9" fill="#1e1b4b" />

                <rect x="10" y="65" width="25" height="25" rx="3" fill="#1e1b4b" />
                <rect x="15" y="70" width="15" height="15" fill="white" />
                <rect x="18" y="73" width="9" height="9" fill="#1e1b4b" />

                <rect x="42" y="15" width="10" height="6" fill="#4f46e5" />
                <rect x="42" y="28" width="8" height="12" fill="#1e1b4b" />
                <rect x="45" y="45" width="15" height="15" fill="#4f46e5" />
                <rect x="65" y="45" width="12" height="6" fill="#1e1b4b" />
                <rect x="70" y="65" width="18" height="18" fill="#1e1b4b" />
                <rect x="42" y="70" width="14" height="14" fill="#4f46e5" />
              </svg>
            </div>

            <div style={{ fontSize: '11px', color: '#64748b', fontWeight: '600' }}>
              Pass ID: #{pass.pId}
            </div>

            <div style={{ marginTop: '12px', width: '100%' }}>
              {isCheckedIn ? (
                <div style={{
                  padding: '8px',
                  borderRadius: '6px',
                  backgroundColor: '#ecfdf5',
                  color: '#059669',
                  fontSize: '12px',
                  fontWeight: '700',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '6px'
                }}>
                  <CheckCircle size={14} /> Checked In
                </div>
              ) : isCancelled ? (
                <div style={{
                  padding: '8px',
                  borderRadius: '6px',
                  backgroundColor: '#fef2f2',
                  color: '#ef4444',
                  fontSize: '12px',
                  fontWeight: '700',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '6px'
                }}>
                  <XCircle size={14} /> Cancelled
                </div>
              ) : (
                <div style={{
                  padding: '8px',
                  borderRadius: '6px',
                  backgroundColor: '#eef2ff',
                  color: '#4f46e5',
                  fontSize: '12px',
                  fontWeight: '700'
                }}>
                  Ready for Check-In
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Footer with Action Buttons */}
        <div className="no-print" style={{
          padding: '16px 28px',
          background: '#f8fafc',
          borderTop: '1px solid #e2e8f0',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center'
        }}>
          <button onClick={handlePrint} className="btn btn-secondary">
            <Printer size={16} /> Print / Save Ticket
          </button>

          {!isCancelled && !isCheckedIn && onCancel && (
            <button
              onClick={() => onCancel(pass.pId)}
              disabled={isCancelling}
              className="btn btn-danger"
            >
              <XCircle size={16} /> {isCancelling ? 'Cancelling...' : 'Cancel Registration'}
            </button>
          )}
        </div>
      </div>
    </div>
  );
}