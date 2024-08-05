const mongoose = require('mongoose');

const MovieSchema = new mongoose.Schema({
  id: { type: Number, required: true, unique: true }, // Unique identifier from the API
  title: { type: String, required: true },
  poster_path: { type: String, required: true },
});

const Movie = mongoose.model('Movie', MovieSchema);

module.exports = Movie;
