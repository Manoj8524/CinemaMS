const mongoose = require('mongoose');

const screenSchema = new mongoose.Schema({
  screenNumber: { type: Number, required: true },
  theatre: { type: mongoose.Schema.Types.ObjectId, ref: 'Theatre', required: true },
  movies: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Movie' }],
  seats: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Seat' }],
});

const Screen = mongoose.model('Screen', screenSchema);
module.exports = Screen;
