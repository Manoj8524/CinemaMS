const express = require('express');
const Cinema = require('../models/Cinema'); 

// Create Cinema
router.post('/cinemas', async (req, res) => {
  console.log(req.body);
  try {
    const newCinema = new Cinema(req.body); 
    await newCinema.save(); 
    res.status(201).json(newCinema); 
  } catch (error) {
    console.error(error); 
    res.status(400).json({ message: error.message }); 
  }
});


router.get('/cinemas', async (req, res) => {
  try {
    const cinemas = await Cinema.find().populate({
      path: 'theatres',
      select: 'name', 
    });
    res.json(cinemas);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});


router.get('/cinemas/:id', async (req, res) => {
  try {
    const cinema = await Cinema.findById(req.params.id).populate('theatres'); // Cinema by ID fetch panrathu
    if (!cinema) return res.status(404).json({ message: 'Cinema not found' }); // Not found check
    res.json(cinema);
  } catch (error) {
    res.status(500).json({ message: error.message }); 
  }
});


router.put('/cinemas/:id', async (req, res) => {
  try {
    const updatedCinema = await Cinema.findByIdAndUpdate(req.params.id, req.body, { new: true }); // Update cinema data
    if (!updatedCinema) return res.status(404).json({ message: 'Cinema not found' }); // Not found check
    res.json(updatedCinema); 
  } catch (error) {
    console.error(error); 
    res.status(400).json({ message: error.message }); 
  }
});


router.delete('/cinemas/:id', async (req, res) => {
  try {
    const cinema = await Cinema.findByIdAndDelete(req.params.id); 
    if (!cinema) return res.status(404).json({ message: 'Cinema not found' }); 
    res.json({ message: 'Cinema deleted' });
  } catch (error) {
    console.error(error); 
    res.status(500).json({ message: error.message });
  }
});

module.exports = router; 