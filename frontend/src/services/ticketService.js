// src/services/ticketService.js
import axios from 'axios';
import { jwtDecode } from 'jwt-decode';


const API_URL = '/api/tickets/';

const purchaseTicket = (ticketId, token) => {
  return axios.post(
    `${API_URL}purchase`,
    { ticketId, userId: getUserIdFromToken(token) },
    {
      headers: { Authorization: token },
    }
  );
};

const getTicketsByEvent = (eventId) => {
  return axios.get(`${API_URL}${eventId}`);
};

const getUserTickets = (token) => {
  return axios.get(`/api/users/profile`, {
    headers: { Authorization: token },
  });
};

// Helper function to extract user ID from JWT tokenc
const getUserIdFromToken = (token) => {
  try {
    const decoded = jwtDecode(token);
    return decoded.userId;
  } catch (error) {
    return null;
  }
};

export default {
  purchaseTicket,
  getTicketsByEvent,
  getUserTickets,
};
