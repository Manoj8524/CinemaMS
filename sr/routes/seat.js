const express = require('express');
const Seat = require('../models/Seat');
const Screen = require('../models/Screen'); // Assuming this exists
const Theatre = require('../models/Theatre'); // Assuming this exists
const router = express.Router();

// Create Seat
router.post('/seats', async (req, res) => {
  try {
    const newSeat = new Seat(req.body);
    await newSeat.save();
    res.status(201).json(newSeat);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Get All Seats with populated Screen and Theatre
router.get('/seats', async (req, res) => {
  try {
    const seats = await Seat.find().populate('screen theatre');
    res.json(seats);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get Seat by ID with populated Screen and Theatre
router.get('/seats/:id', async (req, res) => {
  try {
    const seat = await Seat.findById(req.params.id).populate('screen theatre');
    if (!seat) return res.status(404).json({ message: 'Seat not found' });
    res.json(seat);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Update Seat
router.put('/seats/:id', async (req, res) => {
  try {
    const updatedSeat = await Seat.findByIdAndUpdate(req.params.id, req.body, { new: true }).populate('screen theatre');
    if (!updatedSeat) return res.status(404).json({ message: 'Seat not found' });
    res.json(updatedSeat);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Delete Seat
router.delete('/seats/:id', async (req, res) => {
  try {
    const seat = await Seat.findByIdAndDelete(req.params.id);
    if (!seat) return res.status(404).json({ message: 'Seat not found' });
    res.json({ message: 'Seat deleted' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
