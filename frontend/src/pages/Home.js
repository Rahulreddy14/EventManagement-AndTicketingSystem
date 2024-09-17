// src/pages/Home.js
import React, { useEffect, useState } from 'react';
import eventService from '../services/eventService';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';

const Home = () => {
  const [events, setEvents] = useState([]);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const res = await eventService.getEvents();
        setEvents(res.data);
      } catch (error) {
        toast.error('Failed to fetch events');
      }
    };
    fetchEvents();
  }, []);

  return (
    <div>
      <h1 className="text-3xl font-bold mb-6 text-center">Upcoming Events</h1>
      {events.length === 0 ? (
        <p className="text-center">No events available.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {events.map((event) => (
            <div key={event._id} className="bg-white p-4 rounded shadow">
              <h2 className="text-xl font-semibold mb-2">{event.name}</h2>
              <p className="text-gray-600 mb-2">{event.description.substring(0, 100)}...</p>
              <p className="text-gray-700 mb-2"><strong>Date:</strong> {new Date(event.date).toLocaleDateString()}</p>
              <p className="text-gray-700 mb-4"><strong>Location:</strong> {event.location}</p>
              <Link to={`/events/${event._id}`} className="text-blue-500 hover:underline">
                View Details
              </Link>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Home;
