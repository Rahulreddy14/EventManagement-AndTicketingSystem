const express = require('express');
const dotenv = require('dotenv');
const mongoose = require('mongoose');
const userRoutes = require('./user-service/routes/userRoutes');  // User routes
const eventRoutes = require('./event-service/routes/eventRoutes'); // Event routes
const ticketRoutes = require('./ticket-service/routes/ticketRoutes'); // Ticket routes
const notificationRoutes = require('./notification-service/routes/notificationRoutes'); // Notification routes

dotenv.config();
const app = express();

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI, {
   useNewUrlParser: true,
   useUnifiedTopology: true,
})
.then(() => console.log('MongoDB connected...'))
.catch(err => console.log('Error connecting to MongoDB:', err));

// Middleware to parse JSON
app.use(express.json());

// User, event, ticket, and notification routes
app.use('/api/users', userRoutes);
app.use('/api/events', eventRoutes);
app.use('/api/tickets', ticketRoutes);
app.use('/api/notifications', notificationRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
   console.log(`Server running on port ${PORT}`);
});
