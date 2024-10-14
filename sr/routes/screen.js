const express = require('express');
const Screen = require('../models/Screen');
const router = express.Router();

// Create Screen
router.post('/screens', async (req, res) => {
  try {
    const newScreen = new Screen(req.body);
    await newScreen.save();
    res.status(201).json(newScreen);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Get all Screens
router.get('/screens', async (req, res) => {
  try {
    const screens = await Screen.find().populate('movies seats');
    res.json(screens);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get Screen by ID
router.get('/screens/:id', async (req, res) => {
  try {
    const screen = await Screen.findById(req.params.id).populate('movies seats');
    if (!screen) return res.status(404).json({ message: 'Screen not found' });
    res.json(screen);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Update Screen
router.put('/screens/:id', async (req, res) => {
  try {
    const updatedScreen = await Screen.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updatedScreen) return res.status(404).json({ message: 'Screen not found' });
    res.json(updatedScreen);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Delete Screen
router.delete('/screens/:id', async (req, res) => {
  try {
    const screen = await Screen.findByIdAndDelete(req.params.id);
    if (!screen) return res.status(404).json({ message: 'Screen not found' });
    res.json({ message: 'Screen deleted' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
