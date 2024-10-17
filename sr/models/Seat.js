const mongoose = require('mongoose');

const seatSchema = new mongoose.Schema({
  seatNumber: { type: String, required: true },
  screen: { type: mongoose.Schema.Types.ObjectId, ref: 'Screen', required: true },
  theatre: { type: mongoose.Schema.Types.ObjectId, ref: 'Theatre', required: true }, // Added theatre reference
});

const Seat = mongoose.model('Seat', seatSchema);

module.exports = Seat;
