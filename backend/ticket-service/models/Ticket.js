const mongoose = require('mongoose');

const TicketSchema = new mongoose.Schema({
   eventId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Event',
      required: true,
   },
   price: {
      type: Number,
      required: true,
   },
   available: {
      type: Boolean,
      default: true,
   },
   userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      default: null,  // Set to the user ID when a ticket is purchased
   },
   purchasedAt: {
      type: Date,
   },
});

const Ticket = mongoose.model('Ticket', TicketSchema);

module.exports = Ticket;
