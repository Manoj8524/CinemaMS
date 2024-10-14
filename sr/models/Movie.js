const mongoose = require('mongoose');

const movieSchema = new mongoose.Schema({
  title: { type: String, required: true },
  genre: { type: String, required: true },
  duration: { type: Number, required: true },
  runningAt: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Screen' }],
});

const Movie = mongoose.model('Movie', movieSchema);
module.exports = Movie;
