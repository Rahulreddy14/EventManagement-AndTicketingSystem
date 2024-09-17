// src/context/AuthContext.js
import React, { createContext, useState, useEffect } from 'react';
import axios from 'axios';
import { jwtDecode } from 'jwt-decode';
import { toast } from 'react-toastify';

export const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [auth, setAuth] = useState({
    token: localStorage.getItem('token'),
    user: null,
  });

  useEffect(() => {
    const fetchUser = async () => {
      if (auth.token) {
        try {
          const decoded = jwtDecode(auth.token);
          const res = await axios.get('/api/users/profile', {
            headers: { Authorization: auth.token },
          });
          setAuth((prev) => ({ ...prev, user: res.data }));
        } catch (error) {
          toast.error('Failed to fetch user');
          setAuth({ token: null, user: null });
          localStorage.removeItem('token');
        }
      }
    };
    fetchUser();
  }, [auth.token]);

  const login = (token) => {
    localStorage.setItem('token', token);
    setAuth({ token, user: null });
  };

  const logout = () => {
    localStorage.removeItem('token');
    setAuth({ token: null, user: null });
    toast.success('Logged out successfully!');
  };

  return (
    <AuthContext.Provider value={{ auth, setAuth, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
