const mongoose = require('mongoose');

const showtimeSchema = new mongoose.Schema({
  movie: { type: mongoose.Schema.Types.ObjectId, ref: 'Movie' }, 
  screen: { type: mongoose.Schema.Types.ObjectId, ref: 'Screen', required: true },
  secondShow: { type: String, required: true },
  thirdShow: { type: String, required: true }, 
  fourthShow: { type: String, required: true }, 
  date: { type: Date, required: true },  
});

const Showtime = mongoose.model('Showtime', showtimeSchema);

module.exports = Showtime;
