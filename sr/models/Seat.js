const mongoose = require('mongoose');

const seatSchema = new mongoose.Schema({
  seatNumber: { type: String, required: true },
  isBooked: { type: Boolean, default: false },
  screen: { type: mongoose.Schema.Types.ObjectId, ref: 'Screen', required: true },
});

const Seat = mongoose.model('Seat', seatSchema);
module.exports = Seat;
