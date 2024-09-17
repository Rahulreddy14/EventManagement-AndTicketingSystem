// src/services/notificationService.js
import axios from 'axios';

const API_URL = '/api/notifications/';

const sendNotification = (userId, eventId, message) => {
  return axios.post(`${API_URL}send`, { userId, eventId, message });
};

const getNotificationsByUser = (userId, token) => {
  return axios.get(`${API_URL}${userId}`, {
    headers: { Authorization: token },
  });
};

export default {
  sendNotification,
  getNotificationsByUser,
};
