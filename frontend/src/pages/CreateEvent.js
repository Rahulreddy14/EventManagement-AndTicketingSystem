// src/pages/CreateEvent.js
import React, { useState } from 'react';
import eventService from '../services/eventService';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

const CreateEvent = () => {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [date, setDate] = useState('');
  const [location, setLocation] = useState('');
  const navigate = useNavigate();
  const token = localStorage.getItem('token');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const eventData = { name, description, date, location };
      await eventService.createEvent(eventData, token);
      toast.success('Event created successfully!');
      navigate('/dashboard');
    } catch (error) {
      toast.error(error.response?.data?.msg || 'Failed to create event');
    }
  };

  return (
    <div className="max-w-lg mx-auto bg-white p-6 rounded shadow">
      <h2 className="text-2xl font-semibold mb-4">Create New Event</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block text-gray-700">Event Name:</label>
          <input
            type="text"
            className="w-full mt-1 p-2 border rounded"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            placeholder="Music Festival"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Description:</label>
          <textarea
            className="w-full mt-1 p-2 border rounded"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
            placeholder="A grand music event..."
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Date:</label>
          <input
            type="date"
            className="w-full mt-1 p-2 border rounded"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Location:</label>
          <input
            type="text"
            className="w-full mt-1 p-2 border rounded"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            required
            placeholder="New York"
          />
        </div>
        <button
          type="submit"
          className="w-full bg-purple-500 text-white p-2 rounded hover:bg-purple-600"
        >
          Create Event
        </button>
      </form>
    </div>
  );
};

export default CreateEvent;
