const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

// Register a new user
exports.registerUser = async (req, res) => {
   const { name, email, password } = req.body;

   try {
      // Check if the user already exists
      let user = await User.findOne({ email });
      if (user) {
         return res.status(400).json({ msg: 'User already exists' });
      }

      // Create a new user
      user = new User({ name, email, password });
      await user.save();

      // Generate a JWT token
      const payload = { userId: user._id };
      const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '1h' });

      // Send the token to the client
      res.status(201).json({ token });
   } catch (err) {
      console.error(err.message);
      res.status(500).send('Server error');
   }
};

// Login a user
exports.loginUser = async (req, res) => {
   const { email, password } = req.body;

   try {
      // Find the user by email
      let user = await User.findOne({ email });
      if (!user) {
         return res.status(400).json({ msg: 'Invalid credentials' });
      }

      // Check if the password matches
      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
         return res.status(400).json({ msg: 'Invalid credentials' });
      }

      // Generate a JWT token
      const payload = { userId: user._id };
      const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '1h' });

      // Send the token to the client
      res.status(200).json({ token });
   } catch (err) {
      console.error(err.message);
      res.status(500).send('Server error');
   }
};
