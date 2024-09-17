const Ticket = require('../models/Ticket');

// Purchase a ticket
exports.purchaseTicket = async (req, res) => {
   const { ticketId, userId } = req.body;

   try {
      // Find the ticket by ID
      const ticket = await Ticket.findById(ticketId);

      if (!ticket) {
         return res.status(404).json({ msg: 'Ticket not found' });
      }

      if (!ticket.available) {
         return res.status(400).json({ msg: 'Ticket is already sold' });
      }

      // Mark the ticket as sold and associate it with the user
      ticket.available = false;
      ticket.userId = userId;
      ticket.purchasedAt = Date.now();

      await ticket.save();

      res.status(200).json({ msg: 'Ticket purchased successfully', ticket });
   } catch (err) {
      console.error(err.message);
      res.status(500).send('Server error');
   }
};

// Get all tickets for a specific event
exports.getTicketsByEvent = async (req, res) => {
   const { eventId } = req.params;

   try {
      const tickets = await Ticket.find({ eventId });
      res.json(tickets);
   } catch (err) {
      console.error(err.message);
      res.status(500).send('Server error');
   }
};
