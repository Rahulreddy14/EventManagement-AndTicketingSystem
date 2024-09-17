// src/pages/EventDetails.js
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import eventService from '../services/eventService';
import ticketService from '../services/ticketService';
import { toast } from 'react-toastify';

const EventDetails = () => {
  const { id } = useParams();
  const [event, setEvent] = useState(null);
  const [tickets, setTickets] = useState([]);
  const token = localStorage.getItem('token');

  useEffect(() => {
    const fetchEvent = async () => {
      try {
        const res = await eventService.getEventById(id);
        setEvent(res.data);
      } catch (error) {
        toast.error('Failed to fetch event details');
      }
    };

    const fetchTickets = async () => {
      try {
        const res = await ticketService.getTicketsByEvent(id);
        setTickets(res.data);
      } catch (error) {
        toast.error('Failed to fetch tickets');
      }
    };

    fetchEvent();
    fetchTickets();
  }, [id]);

  const handlePurchase = async (ticketId) => {
    try {
      await ticketService.purchaseTicket(ticketId, token);
      toast.success('Ticket purchased successfully!');
      // Update tickets
      setTickets(tickets.map(ticket => ticket._id === ticketId ? { ...ticket, available: false } : ticket));
    } catch (error) {
      toast.error(error.response?.data?.msg || 'Failed to purchase ticket');
    }
  };

  if (!event) {
    return <p>Loading event details...</p>;
  }

  return (
    <div>
      <h1 className="text-3xl font-bold mb-4">{event.name}</h1>
      <p className="text-gray-700 mb-2"><strong>Description:</strong> {event.description}</p>
      <p className="text-gray-700 mb-2"><strong>Date:</strong> {new Date(event.date).toLocaleDateString()}</p>
      <p className="text-gray-700 mb-4"><strong>Location:</strong> {event.location}</p>

      <h2 className="text-2xl font-semibold mb-4">Tickets</h2>
      {tickets.length === 0 ? (
        <p>No tickets available for this event.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {tickets.map((ticket) => (
            <div key={ticket._id} className="bg-white p-4 rounded shadow">
              <p className="mb-2"><strong>Price:</strong> ${ticket.price}</p>
              <p className="mb-2"><strong>Status:</strong> {ticket.available ? 'Available' : 'Sold'}</p>
              {ticket.available && (
                <button
                  onClick={() => handlePurchase(ticket._id)}
                  className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
                >
                  Purchase
                </button>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default EventDetails;
