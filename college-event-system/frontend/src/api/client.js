const BASE_URL = 'http://localhost:8080/api';

async function handleResponse(response) {
  const data = await response.json().catch(() => ({}));
  if (!response.ok) {
    const errorMessage = data.message || data.error || `HTTP error ${response.status}`;
    throw new Error(errorMessage);
  }
  return data;
}

export const api = {
  // Events
  async getEvents() {
    const res = await fetch(`${BASE_URL}/events`);
    return handleResponse(res);
  },

  async getEventById(id) {
    const res = await fetch(`${BASE_URL}/events/${id}`);
    return handleResponse(res);
  },

  async getEventSummary(id) {
    const res = await fetch(`${BASE_URL}/events/${id}/summary`);
    return handleResponse(res);
  },

  async createEvent(eventData) {
    const res = await fetch(`${BASE_URL}/events`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(eventData),
    });
    return handleResponse(res);
  },

  async updateEventStatus(id, status) {
    const res = await fetch(`${BASE_URL}/events/${id}/status`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ status }),
    });
    return handleResponse(res);
  },

  // Registration & Passes
  async registerStudent(registrationData) {
    const res = await fetch(`${BASE_URL}/registrations`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(registrationData),
    });
    return handleResponse(res);
  },

  async getPassById(id) {
    const res = await fetch(`${BASE_URL}/registrations/${id}`);
    return handleResponse(res);
  },

  async getPassByCode(code) {
    const res = await fetch(`${BASE_URL}/registrations/code/${code}`);
    return handleResponse(res);
  },

  async getPassesByEmail(email) {
    const res = await fetch(`${BASE_URL}/registrations/student?email=${encodeURIComponent(email)}`);
    return handleResponse(res);
  },

  async cancelRegistration(id) {
    const res = await fetch(`${BASE_URL}/registrations/${id}`, {
      method: 'DELETE',
    });
    return handleResponse(res);
  },

  // Attendance Check-in
  async checkIn(checkInData) {
    const res = await fetch(`${BASE_URL}/attendance/check-in`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(checkInData),
    });
    return handleResponse(res);
  }
};