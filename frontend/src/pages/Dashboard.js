// src/pages/Dashboard.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import ticketService from '../services/ticketService';

const Dashboard = () => {
  const [user, setUser] = useState(null);
  const [tickets, setTickets] = useState([]);
  const token = localStorage.getItem('token');

  useEffect(() => {
    const fetchProfileAndTickets = async () => {
      try {
        const res = await axios.get('/api/users/profile', {
          headers: { Authorization: token },
        });
        setUser(res.data);

        // Fetch tickets for the user
        const eventIds = res.data.events; // Assuming user has an 'events' array
        const allTickets = await Promise.all(
          eventIds.map((eventId) => ticketService.getTicketsByEvent(eventId))
        );
        setTickets(allTickets.flat());
      } catch (error) {
        toast.error('Failed to fetch profile or tickets');
      }
    };
    fetchProfileAndTickets();
  }, [token]);

  return (
    <div>
      <h2 className="text-2xl font-semibold mb-4">Dashboard</h2>
      {user ? (
        <div className="bg-white p-4 rounded shadow mb-6">
          <p><strong>Name:</strong> {user.name}</p>
          <p><strong>Email:</strong> {user.email}</p>
          <p><strong>Joined:</strong> {new Date(user.createdAt).toLocaleDateString()}</p>
        </div>
      ) : (
        <p>Loading profile...</p>
      )}

      <h3 className="text-xl font-semibold mb-2">Your Tickets</h3>
      {tickets.length === 0 ? (
        <p>You haven't purchased any tickets yet.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {tickets.map((ticket) => (
            <div key={ticket._id} className="bg-white p-4 rounded shadow">
              <p><strong>Event ID:</strong> {ticket.eventId}</p>
              <p><strong>Price:</strong> ${ticket.price}</p>
              <p><strong>Status:</strong> {ticket.available ? 'Available' : 'Sold'}</p>
              <p><strong>Purchased At:</strong> {ticket.purchasedAt ? new Date(ticket.purchasedAt).toLocaleDateString() : 'N/A'}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Dashboard;
