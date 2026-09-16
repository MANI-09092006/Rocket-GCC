import React from 'react';
import { Calendar, Ticket, UserCheck, Shield, Sparkles } from 'lucide-react';

export default function Navbar({ activeTab, setActiveTab }) {
  const navItems = [
    { id: 'events', label: 'Events Catalog', icon: Calendar },
    { id: 'my-passes', label: 'My Passes & Cancel', icon: Ticket },
    { id: 'check-in', label: 'Event Check-In', icon: UserCheck },
    { id: 'organizer', label: 'Organizer Portal', icon: Shield },
  ];

  return (
    <header style={{
      background: 'white',
      borderBottom: '1px solid var(--surface-border)',
      position: 'sticky',
      top: 0,
      zIndex: 40,
      boxShadow: '0 1px 3px rgba(0,0,0,0.05)'
    }}>
      <div className="container" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', height: '70px' }}>
        <div 
          style={{ display: 'flex', alignItems: 'center', gap: '10px', cursor: 'pointer' }}
          onClick={() => setActiveTab('events')}
        >
          <div style={{
            background: 'linear-gradient(135deg, #4f46e5, #7c3aed)',
            color: 'white',
            width: '40px',
            height: '40px',
            borderRadius: '10px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            boxShadow: '0 4px 10px rgba(79, 70, 229, 0.3)'
          }}>
            <Ticket size={22} />
          </div>
          <div>
            <span style={{ fontSize: '18px', fontWeight: '800', letterSpacing: '-0.5px', color: '#1e1b4b' }}>
              Campus<span style={{ color: '#4f46e5' }}>Pass</span>
            </span>
            <div style={{ fontSize: '11px', color: '#64748b', fontWeight: '500' }}>Event & Attendance System</div>
          </div>
        </div>

        <nav style={{ display: 'flex', gap: '6px' }}>
          {navItems.map(item => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                  padding: '8px 16px',
                  borderRadius: '8px',
                  border: 'none',
                  fontSize: '14px',
                  fontWeight: '600',
                  cursor: 'pointer',
                  transition: 'all 0.2s ease',
                  backgroundColor: isActive ? 'var(--primary-light)' : 'transparent',
                  color: isActive ? 'var(--primary)' : 'var(--text-muted)'
                }}
              >
                <Icon size={16} />
                <span>{item.label}</span>
              </button>
            );
          })}
        </nav>
      </div>
    </header>
  );
}