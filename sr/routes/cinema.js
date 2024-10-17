const express = require('express');
const Cinema = require('../models/Cinema'); // Cinema model import
const router = express.Router();

// Create Cinema
router.post('/cinemas', async (req, res) => {
  console.log(req.body); // Incoming request body log panrathu
  try {
    const newCinema = new Cinema(req.body); // New cinema create panrathu
    await newCinema.save(); // Save cinema to DB
    res.status(201).json(newCinema); // Success response
  } catch (error) {
    console.error(error); // Error log panrathu
    res.status(400).json({ message: error.message }); // Error response
  }
});

// Get all Cinemas
router.get('/cinemas', async (req, res) => {
  try {
    const cinemas = await Cinema.find().populate({
      path: 'theatres',
      select: 'name', // Select only the name field from Theatre
    });
    res.json(cinemas);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

// Get Cinema by ID
router.get('/cinemas/:id', async (req, res) => {
  try {
    const cinema = await Cinema.findById(req.params.id).populate('theatres'); // Cinema by ID fetch panrathu
    if (!cinema) return res.status(404).json({ message: 'Cinema not found' }); // Not found check
    res.json(cinema); // Response with cinema data
  } catch (error) {
    res.status(500).json({ message: error.message }); // Error response
  }
});

// Update Cinema
router.put('/cinemas/:id', async (req, res) => {
  try {
    const updatedCinema = await Cinema.findByIdAndUpdate(req.params.id, req.body, { new: true }); // Update cinema data
    if (!updatedCinema) return res.status(404).json({ message: 'Cinema not found' }); // Not found check
    res.json(updatedCinema); // Response with updated cinema data
  } catch (error) {
    console.error(error); // Error log panrathu
    res.status(400).json({ message: error.message }); // Error response
  }
});

// Delete Cinema
router.delete('/cinemas/:id', async (req, res) => {
  try {
    const cinema = await Cinema.findByIdAndDelete(req.params.id); // Cinema delete panrathu
    if (!cinema) return res.status(404).json({ message: 'Cinema not found' }); // Not found check
    res.json({ message: 'Cinema deleted' }); // Success response
  } catch (error) {
    console.error(error); // Error log panrathu
    res.status(500).json({ message: error.message }); // Error response
  }
});

module.exports = router; // Router export panrathu
