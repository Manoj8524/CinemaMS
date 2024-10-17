const mongoose = require('mongoose');

const showtimeSchema = new mongoose.Schema({
  movie: { type: mongoose.Schema.Types.ObjectId, ref: 'Movie' }, // Movie reference
  screen: { type: mongoose.Schema.Types.ObjectId, ref: 'Screen', required: true }, // Screen reference
  firstShow: { type: String, required: true },  // First Show time as string
  secondShow: { type: String, required: true }, // Second Show time
  thirdShow: { type: String, required: true },  // Third Show time
  fourthShow: { type: String, required: true }, // Fourth Show time
  date: { type: Date, required: true },  // Date of the shows
});

const Showtime = mongoose.model('Showtime', showtimeSchema);

module.exports = Showtime;
