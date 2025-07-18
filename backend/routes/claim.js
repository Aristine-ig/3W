const express = require('express');
const User = require('../models/User');
const ClaimHistory = require('../models/ClaimHistory');
const router = express.Router();

// POST /claim - Claim random points for a user
router.post('/', async (req, res) => {
  try {
    const { userId } = req.body;
    
    if (!userId) {
      return res.status(400).json({ message: 'User ID is required' });
    }

    // Find the user
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Generate random points between 1 and 10
    const pointsAwarded = Math.floor(Math.random() * 10) + 1;

    // Update user's total points
    user.totalPoints += pointsAwarded;
    await user.save();

    // Create claim history
    const claimHistory = new ClaimHistory({
      userId: user._id,
      points: pointsAwarded
    });
    await claimHistory.save();

    // Get updated leaderboard
    const updatedUsers = await User.find().sort({ totalPoints: -1 });
    const updatedLeaderboard = updatedUsers.map((u, index) => ({
      _id: u._id,
      name: u.name,
      totalPoints: u.totalPoints,
      rank: index + 1
    }));

    // Emit real-time update to all connected clients
    if (req.io) {
      req.io.emit('leaderboardUpdate', {
        pointsAwarded,
        updatedUser: {
          _id: user._id,
          name: user.name,
          totalPoints: user.totalPoints
        },
        updatedLeaderboard
      });
    }

    res.json({
      pointsAwarded,
      updatedUser: {
        _id: user._id,
        name: user.name,
        totalPoints: user.totalPoints
      },
      updatedLeaderboard
    });
  } catch (error) {
    res.status(500).json({ message: 'Error claiming points', error: error.message });
  }
});

module.exports = router;