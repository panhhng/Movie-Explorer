// routes/watchlist.js

const express = require('express');
const jwt = require('jsonwebtoken');
const User = require('../models/User');

const router = express.Router();

// Middleware to check authentication
const requireAuth = (req, res, next) => {
  const token = req.headers.authorization;
  if (!token) return res.status(401).json({ error: 'Unauthorized' });

  jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
    if (err) return res.status(401).json({ error: 'Unauthorized' });
    req.userId = decoded.userId;
    next();
  });
};

// Add to watchlist
router.post('/add', requireAuth, async (req, res) => {
  try {
    const { movieId } = req.body;
    const user = await User.findById(req.userId);

    if (!user.watchlist.includes(movieId)) {
      user.watchlist.push(movieId);
      await user.save();
    }

    res.json({ message: 'Movie added to watchlist', watchlist: user.watchlist });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Remove from watchlist
router.post('/remove', requireAuth, async (req, res) => {
  try {
    const { movieId } = req.body;
    const user = await User.findById(req.userId);

    user.watchlist = user.watchlist.filter((id) => id !== movieId);
    await user.save();

    res.json({ message: 'Movie removed from watchlist', watchlist: user.watchlist });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Get watchlist
router.get('/', requireAuth, async (req, res) => {
  try {
    const user = await User.findById(req.userId);
    res.json({ watchlist: user.watchlist });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

module.exports = router;