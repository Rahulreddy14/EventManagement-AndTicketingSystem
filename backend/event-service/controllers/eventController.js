const Event = require('../models/Event');

// Create a new event
exports.createEvent = async (req, res) => {
   const { name, description, date, location } = req.body;

   try {
      // Create and save the event
      const event = new Event({ name, description, date, location });
      await event.save();

      res.status(201).json(event);
   } catch (err) {
      console.error(err.message);
      res.status(500).send('Server error');
   }
};

// Get a list of all events
exports.getEvents = async (req, res) => {
   try {
      const events = await Event.find();
      res.json(events);
   } catch (err) {
      console.error(err.message);
      res.status(500).send('Server error');
   }
};

// Get details of a specific event
exports.getEventById = async (req, res) => {
   try {
      const event = await Event.findById(req.params.id);

      if (!event) {
         return res.status(404).json({ msg: 'Event not found' });
      }

      res.json(event);
   } catch (err) {
      console.error(err.message);
      res.status(500).send('Server error');
   }
};
