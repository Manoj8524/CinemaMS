// src/components/MovieForm.js

import React, { useState } from 'react';
import { Button, TextField } from '@mui/material';

const MovieForm = ({ onAddMovie }) => {
  const [title, setTitle] = useState('');
  const [genre, setGenre] = useState('');
  const [duration, setDuration] = useState('');
  const [runningAt, setRunningAt] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    const movieData = { title, genre, duration, runningAt };
    
    // Call the API to create a new movie
    const response = await fetch('http://localhost:5000/api/movies', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(movieData),
    });

    if (response.ok) {
      const newMovie = await response.json();
      onAddMovie(newMovie);
      setTitle('');
      setGenre('');
      setDuration('');
      setRunningAt('');
    } else {
      console.error('Failed to create movie');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="mb-4">
      <TextField
        label="Movie Title"
        variant="outlined"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        required
        className="mr-2"
      />
      <TextField
        label="Genre"
        variant="outlined"
        value={genre}
        onChange={(e) => setGenre(e.target.value)}
        required
        className="mr-2"
      />
      <TextField
        label="Duration (min)"
        variant="outlined"
        type="number"
        value={duration}
        onChange={(e) => setDuration(e.target.value)}
        required
        className="mr-2"
      />
      <TextField
        label="Running At (Screen ID)"
        variant="outlined"
        value={runningAt}
        onChange={(e) => setRunningAt(e.target.value)}
        required
        className="mr-2"
      />
      <Button type="submit" variant="contained" color="primary">
        Add Movie
      </Button>
    </form>
  );
};

export default MovieForm;
