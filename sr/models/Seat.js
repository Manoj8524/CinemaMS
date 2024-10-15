const mongoose = require('mongoose');

const seatSchema = new mongoose.Schema({
  seatNumber: { type: String, required: true }, // Example: A:1, A:2, B:1, etc.
  screen: { type: mongoose.Schema.Types.ObjectId, ref: 'Screen', required: true }, // Screen ID reference
});

const Seat = mongoose.model('Seat', seatSchema);

module.exports = Seat;
