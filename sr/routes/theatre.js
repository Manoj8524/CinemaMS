const express = require('express');
const Theatre = require('../models/Theatre');
const router = express.Router();


router.post('/theatres', async (req, res) => {
  try {
    const newTheatre = new Theatre(req.body);
    await newTheatre.save();
    res.status(201).json(newTheatre);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});


router.get('/theatres', async (req, res) => {
  try {
    const theatres = await Theatre.find()
      .populate({
        path: 'cinema',
        select: 'name location _id'
      })
      .populate({
        path: 'screens', 
        select: 'screenNumber' 
      });

    res.json(theatres);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});



router.put('/theatres/:id', async (req, res) => {
  try {
    const updatedTheatre = await Theatre.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updatedTheatre) return res.status(404).json({ message: 'Theatre not found' });
    res.json(updatedTheatre);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});


router.delete('/theatres/:id', async (req, res) => {
  try {
    const theatre = await Theatre.findByIdAndDelete(req.params.id);
    if (!theatre) return res.status(404).json({ message: 'Theatre not found' });
    res.json({ message: 'Theatre deleted' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
