// src/services/eventService.js
import axios from 'axios';

const API_URL = '/api/events/';

const createEvent = (eventData, token) => {
  return axios.post(`${API_URL}`, eventData, {
    headers: { Authorization: token },
  });
};

const getEvents = () => {
  return axios.get(`${API_URL}`);
};

const getEventById = (id) => {
  return axios.get(`${API_URL}${id}`);
};

export default {
  createEvent,
  getEvents,
  getEventById,
};
