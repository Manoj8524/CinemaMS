const express = require('express');
const Movie = require('../models/Movie');
const router = express.Router();


router.post('/movies', async (req, res) => {
  try {
    const newMovie = new Movie(req.body);
    await newMovie.save();
    res.status(201).json(newMovie);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});



router.get('/movies', async (req, res) => {
  try {
    const movies = await Movie.find()
      .populate({
        path: 'runningAt',
        populate: {
          path: 'theatre', 
          select: 'name', 
        },
      });
    res.json(movies);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});


router.get('/movies/:id', async (req, res) => {
  try {
    const movie = await Movie.findById(req.params.id).populate('runningAt');
    if (!movie) return res.status(404).json({ message: 'Movie not found' });
    res.json(movie);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});


router.put('/movies/:id', async (req, res) => {
  try {
    const updatedMovie = await Movie.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updatedMovie) return res.status(404).json({ message: 'Movie not found' });
    res.json(updatedMovie);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});


router.delete('/movies/:id', async (req, res) => {
  try {
    const movie = await Movie.findByIdAndDelete(req.params.id);
    if (!movie) return res.status(404).json({ message: 'Movie not found' });
    res.json({ message: 'Movie deleted' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
