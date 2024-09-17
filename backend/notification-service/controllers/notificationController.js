const Notification = require('../models/Notification');

// Send a notification to a user
exports.sendNotification = async (req, res) => {
   const { userId, eventId, message } = req.body;

   try {
      // Create and save the notification
      const notification = new Notification({ userId, eventId, message });
      await notification.save();

      res.status(201).json({ msg: 'Notification sent', notification });
   } catch (err) {
      console.error(err.message);
      res.status(500).send('Server error');
   }
};

// Get all notifications for a user
exports.getNotificationsByUser = async (req, res) => {
   const { userId } = req.params;

   try {
      const notifications = await Notification.find({ userId });
      res.json(notifications);
   } catch (err) {
      console.error(err.message);
      res.status(500).send('Server error');
   }
};
