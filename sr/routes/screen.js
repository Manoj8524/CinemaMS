const express = require('express');
const Screen = require('../models/Screen');
const router = express.Router();


router.post('/screens', async (req, res) => {
  try {
    const newScreen = new Screen(req.body);
    await newScreen.save();
    res.status(201).json(newScreen);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

router.get('/screens', async (req, res) => {
  try {
    const screens = await Screen.find()
      .populate({
        path: 'theatre',
        select: 'name',
      })
      .populate({
        path: 'movies',
        select: 'title', 
      })
      .populate({
        path: 'seats', 
        select: 'seatNumber', 
      });

    res.json(screens);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});





router.get('/screens/:id', async (req, res) => {
  try {
    const screen = await Screen.findById(req.params.id).populate('movies seats');
    if (!screen) return res.status(404).json({ message: 'Screen not found' });
    res.json(screen);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});


router.put('/screens/:id', async (req, res) => {
  const { screenNumber, theatre, movies, seats } = req.body;


  if (!screenNumber || !theatre) {
    return res.status(400).json({ message: 'Screen number and theatre are required' });
  }

  try {
    const updatedScreen = await Screen.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updatedScreen) return res.status(404).json({ message: 'Screen not found' });
    res.json(updatedScreen);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});


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
