const mongoose = require('mongoose');

const cinemaSchema = new mongoose.Schema({
  name: { type: String, required: true },
  location: { type: String, required: true },
  theatres: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Theatre' }],
});

const Cinema = mongoose.model('Cinema', cinemaSchema);
module.exports = Cinema;
