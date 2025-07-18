const express = require('express');
const ClaimHistory = require('../models/ClaimHistory');
const router = express.Router();

// GET /history - Get claim history (optionally filter by user)
router.get('/', async (req, res) => {
  try {
    const { userId } = req.query;
    let query = {};
    
    if (userId) {
      query.userId = userId;
    }

    const history = await ClaimHistory.find(query)
      .populate('userId', 'name')
      .sort({ claimedAt: -1 });

    res.json(history);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching history', error: error.message });
  }
});

module.exports = router;