const express = require('express');
const { createEvent, getEvents, getEventById } = require('../controllers/eventController');
const router = express.Router();

// Route to create a new event
router.post('/', createEvent);

// Route to get all events
router.get('/', getEvents);

// Route to get a specific event by ID
router.get('/:id', getEventById);

module.exports = router;
