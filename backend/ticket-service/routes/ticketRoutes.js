const express = require('express');
const { purchaseTicket, getTicketsByEvent } = require('../controllers/ticketController');
const router = express.Router();

// Route to purchase a ticket
router.post('/purchase', purchaseTicket);

// Route to get all tickets for a specific event
router.get('/:eventId', getTicketsByEvent);

module.exports = router;
