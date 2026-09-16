import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import EventListPage from './pages/EventListPage';
import EventDetailsPage from './pages/EventDetailsPage';
import RegistrationPage from './pages/RegistrationPage';
import PassViewPage from './pages/PassViewPage';
import CheckInPage from './pages/CheckInPage';
import OrganizerDashboardPage from './pages/OrganizerDashboardPage';
import { api } from './api/client';

export default function App() {
  const [activeTab, setActiveTab] = useState('events');
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [newlyGeneratedPass, setNewlyGeneratedPass] = useState(null);

  const fetchEvents = async () => {
    try {
      const data = await api.getEvents();
      setEvents(data);
    } catch (err) {
      console.error('Failed to load events:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchEvents();
  }, []);

  const handleSelectEvent = (event) => {
    setSelectedEvent(event);
    setActiveTab('details');
  };

  const handleStartRegister = (event) => {
    setSelectedEvent(event);
    setActiveTab('register');
  };

  const handleRegistrationSuccess = (pass) => {
    setNewlyGeneratedPass(pass);
    fetchEvents(); // update capacity
    setActiveTab('my-passes');
  };

  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      <Navbar
        activeTab={activeTab}
        setActiveTab={(tab) => {
          setActiveTab(tab);
          if (tab !== 'my-passes') {
            setNewlyGeneratedPass(null);
          }
        }}
      />

      <main style={{ flex: 1, padding: '32px 0' }}>
        <div className="container">
          {activeTab === 'events' && (
            <EventListPage
              events={events}
              loading={loading}
              onSelectEvent={handleSelectEvent}
              onRegister={handleStartRegister}
            />
          )}

          {activeTab === 'details' && selectedEvent && (
            <EventDetailsPage
              event={selectedEvent}
              onBack={() => setActiveTab('events')}
              onRegister={handleStartRegister}
            />
          )}

          {activeTab === 'register' && selectedEvent && (
            <RegistrationPage
              event={selectedEvent}
              onBack={() => setActiveTab('details')}
              onSuccessPass={handleRegistrationSuccess}
            />
          )}

          {activeTab === 'my-passes' && (
            <PassViewPage
              initialPass={newlyGeneratedPass}
              onRefreshEvents={fetchEvents}
            />
          )}

          {activeTab === 'check-in' && (
            <CheckInPage
              events={events}
              onRefreshEvents={fetchEvents}
            />
          )}

          {activeTab === 'organizer' && (
            <OrganizerDashboardPage
              events={events}
              onRefreshEvents={fetchEvents}
            />
          )}
        </div>
      </main>

      <footer style={{
        background: 'white',
        borderTop: '1px solid var(--surface-border)',
        padding: '24px 0',
        marginTop: 'auto',
        fontSize: '13px',
        color: '#64748b',
        textAlign: 'center'
      }}>
        <div className="container">
          College Technical Event & Pass Management Portal &bull; Full Stack React + Spring Boot + MySQL System
        </div>
      </footer>
    </div>
  );
}