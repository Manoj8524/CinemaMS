const express = require('express');
const Showtime = require('../models/Showtime');
const router = express.Router();


router.post('/showtimes', async (req, res) => {
  try {
    const newShowtime = new Showtime(req.body);
    await newShowtime.save();
    res.status(201).json(newShowtime);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});


router.get('/showtimes', async (req, res) => {
  try {
    const showtimes = await Showtime.find()
      .populate('movie', 'title')
      .populate('screen', 'screenNumber'); 
    res.json(showtimes);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.get('/showtimes/:id', async (req, res) => {
  try {
    const showtime = await Showtime.findById(req.params.id)
      .populate('movie', 'title')
      .populate('screen', 'screenNumber');
    if (!showtime) return res.status(404).json({ message: 'Showtime not found' });
    res.json(showtime);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});


router.put('/showtimes/:id', async (req, res) => {
  try {
    const updatedShowtime = await Showtime.findByIdAndUpdate(req.params.id, req.body, { new: true })
      .populate('movie', 'title')
      .populate('screen', 'screenNumber');
    if (!updatedShowtime) return res.status(404).json({ message: 'Showtime not found' });
    res.json(updatedShowtime);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});


router.delete('/showtimes/:id', async (req, res) => {
  try {
    const showtime = await Showtime.findByIdAndDelete(req.params.id);
    if (!showtime) return res.status(404).json({ message: 'Showtime not found' });
    res.json({ message: 'Showtime deleted' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
