const mongoose = require('mongoose');

const theatreSchema = new mongoose.Schema({
  name: { type: String, required: true },
  cinema: { type: mongoose.Schema.Types.ObjectId, ref: 'Cinema', required: true },
  screens: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Screen' }],
});

const Theatre = mongoose.model('Theatre', theatreSchema);
module.exports = Theatre;
