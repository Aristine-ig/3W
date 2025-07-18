const express = require('express');
const User = require('../models/User');
const router = express.Router();

// GET /users - Get all users with rankings
router.get('/', async (req, res) => {
  try {
    const users = await User.find().sort({ totalPoints: -1 });
    
    // Add rank to each user
    const usersWithRank = users.map((user, index) => ({
      _id: user._id,
      name: user.name,
      totalPoints: user.totalPoints,
      rank: index + 1
    }));

    res.json(usersWithRank);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching users', error: error.message });
  }
});

// POST /users - Add a new user
router.post('/', async (req, res) => {
  try {
    const { name } = req.body;
    
    if (!name || name.trim().length === 0) {
      return res.status(400).json({ message: 'Name is required' });
    }

    // Check if user already exists
    const existingUser = await User.findOne({ name: name.trim() });
    if (existingUser) {
      return res.status(400).json({ message: 'User already exists' });
    }

    const user = new User({
      name: name.trim()
    });

    const savedUser = await user.save();
    res.status(201).json(savedUser);
  } catch (error) {
    res.status(500).json({ message: 'Error creating user', error: error.message });
  }
});

module.exports = router;