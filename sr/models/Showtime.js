const mongoose = require('mongoose');

const showtimeSchema = new mongoose.Schema({
  movie: { type: mongoose.Schema.Types.ObjectId, ref: 'Movie', required: true },
  screen: { type: mongoose.Schema.Types.ObjectId, ref: 'Screen', required: true },
  time: { type: String, required: true },
  date: { type: Date, required: true },
  price: { type: Number, required: true },
});

const Showtime = mongoose.model('Showtime', showtimeSchema);
module.exports = Showtime;
