const mongoose = require('mongoose');

const NotificationSchema = new mongoose.Schema({
   userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
   },
   eventId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Event',
      required: true,
   },
   message: {
      type: String,
      required: true,
   },
   createdAt: {
      type: Date,
      default: Date.now,
   },
});

const Notification = mongoose.model('Notification', NotificationSchema);

module.exports = Notification;
