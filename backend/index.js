// backend/user-service/index.js
const express = require('express');
const dotenv = require('dotenv');
const mongoose = require('mongoose');
const cors = require('cors');
const userRoutes = require('./user-service/routes/userRoutes');
const eventRoutes = require('./event-service/routes/eventRoutes');
const ticketRoutes = require('./ticket-service/routes/ticketRoutes');
const notificationRoutes = require('./notification-service/routes/notificationRoutes');

dotenv.config();
const app = express();

// Configure CORS
app.use(cors({
  origin: 'http://localhost:3000', // Frontend URL
  credentials: true,
}));

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
