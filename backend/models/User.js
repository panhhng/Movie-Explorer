// models/User.js

const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  watchlist: {
    type: [String], // Assuming watchlist items are movie IDs or names
    default: [],
  },
});

module.exports = mongoose.model('User', userSchema);
