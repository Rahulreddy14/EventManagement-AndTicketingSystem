// src/services/authService.js
import axios from 'axios';

const API_URL = '/api/users/';

const register = (name, email, password) => {
  return axios.post(`${API_URL}register`, { name, email, password });
};

const login = (email, password) => {
  return axios.post(`${API_URL}login`, { email, password });
};

const getProfile = (token) => {
  return axios.get(`${API_URL}profile`, {
    headers: { Authorization: token },
  });
};

export default {
  register,
  login,
  getProfile,
};
