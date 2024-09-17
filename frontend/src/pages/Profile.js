// src/pages/Profile.js
import React, { useEffect, useState } from 'react';
import notificationService from '../services/notificationService';
import { toast } from 'react-toastify';
import axios from 'axios';

const Profile = () => {
  const [notifications, setNotifications] = useState([]);
  const token = localStorage.getItem('token');
  const [user, setUser] = useState(null);

  useEffect(() => {
    const fetchProfileAndNotifications = async () => {
      try {
        // Fetch user profile to get user ID
        const res = await axios.get('/api/users/profile', {
          headers: { Authorization: token },
        });
        setUser(res.data);

        // Fetch notifications
        const notifRes = await notificationService.getNotificationsByUser(res.data._id, token);
        setNotifications(notifRes.data);
      } catch (error) {
        toast.error('Failed to fetch profile or notifications');
      }
    };
    fetchProfileAndNotifications();

    // Polling every 30 seconds
    const interval = setInterval(() => {
      fetchProfileAndNotifications();
    }, 30000);

    return () => clearInterval(interval);
  }, [token]);

  return (
    <div>
      <h2 className="text-2xl font-semibold mb-4">Profile</h2>
      {user ? (
        <div className="bg-white p-4 rounded shadow mb-6">
          <p><strong>Name:</strong> {user.name}</p>
          <p><strong>Email:</strong> {user.email}</p>
          <p><strong>Joined:</strong> {new Date(user.createdAt).toLocaleDateString()}</p>
        </div>
      ) : (
        <p>Loading profile...</p>
      )}

      <h3 className="text-xl font-semibold mb-2">Notifications</h3>
      {notifications.length === 0 ? (
        <p>No notifications.</p>
      ) : (
        <ul className="space-y-2">
          {notifications.map((notif) => (
            <li key={notif._id} className="bg-white p-3 rounded shadow">
              <p>{notif.message}</p>
              <p className="text-sm text-gray-500">{new Date(notif.createdAt).toLocaleString()}</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Profile;
