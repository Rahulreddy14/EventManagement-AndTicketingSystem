const express = require('express');
const { sendNotification, getNotificationsByUser } = require('../controllers/notificationController');
const router = express.Router();

// Route to send a notification
router.post('/send', sendNotification);

// Route to get all notifications for a specific user
router.get('/:userId', getNotificationsByUser);

module.exports = router;
