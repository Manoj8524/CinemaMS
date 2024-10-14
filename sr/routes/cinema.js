const express = require('express');
const Cinema = require('../models/Cinema');
const router = express.Router();

// Create Cinema
router.post('/cinemas', async (req, res) => {
  try {
    const newCinema = new Cinema(req.body);
    await newCinema.save();
    res.status(201).json(newCinema);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Get all Cinemas
router.get('/cinemas', async (req, res) => {
  try {
    const cinemas = await Cinema.find().populate('theatres');
    res.json(cinemas);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get Cinema by ID
router.get('/cinemas/:id', async (req, res) => {
  try {
    const cinema = await Cinema.findById(req.params.id).populate('theatres');
    if (!cinema) return res.status(404).json({ message: 'Cinema not found' });
    res.json(cinema);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Update Cinema
router.put('/cinemas/:id', async (req, res) => {
  try {
    const updatedCinema = await Cinema.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updatedCinema) return res.status(404).json({ message: 'Cinema not found' });
    res.json(updatedCinema);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Delete Cinema
router.delete('/cinemas/:id', async (req, res) => {
  try {
    const cinema = await Cinema.findByIdAndDelete(req.params.id);
    if (!cinema) return res.status(404).json({ message: 'Cinema not found' });
    res.json({ message: 'Cinema deleted' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
