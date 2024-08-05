const mongoose = require('mongoose');

const watchlistSchema = new mongoose.Schema({
  userId: { type: String, required: true },
  movies: [{ id: String, title: String, poster_path: String, release_date: String }],
});

module.exports = mongoose.model('Watchlist', watchlistSchema);