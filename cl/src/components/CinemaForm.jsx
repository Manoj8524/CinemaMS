import React, { useState, useEffect } from 'react';
import { createCinema, updateCinema } from '../services/cinemaService'; // Adjust the import path as needed
import { TextField, Button } from '@mui/material';

const CinemaForm = ({ cinema, onSubmit }) => {
  const [name, setName] = useState(cinema ? cinema.name : '');
  const [location, setLocation] = useState(cinema ? cinema.location : '');
  const [theatres, setTheatres] = useState(cinema ? cinema.theatres.join(',') : '');
  const [error, setError] = useState('');

  useEffect(() => {
    if (cinema) {
      setName(cinema.name);
      setLocation(cinema.location);
      setTheatres(cinema.theatres.join(','));
    }
  }, [cinema]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    // Validate inputs
    if (!name || !location) {
      setError('All fields are required');
      return;
    }

    const theatreIds = theatres.split(',').map((theatre) => theatre.trim());

    // Validate theatre IDs
    if (theatreIds.some((id) => !id)) {
      setError('Theatre IDs cannot be empty');
      return;
    }

    const newCinema = {
      name,
      location,
      theatres: theatreIds,
    };

    try {
      if (cinema) {
        await updateCinema(cinema._id, newCinema);
      } else {
        await createCinema(newCinema);
      }
      onSubmit();
      setName('');
      setLocation('');
      setTheatres('');
    } catch (err) {
      setError('Failed to save cinema. Please check your input and try again.');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <TextField
        label="Cinema Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        required
        fullWidth
      />
      <TextField
        label="Location"
        value={location}
        onChange={(e) => setLocation(e.target.value)}
        required
        fullWidth
      />
      <TextField
        label="Theatres (comma-separated IDs)"
        value={theatres}
        onChange={(e) => setTheatres(e.target.value)}
        fullWidth
        helperText="Enter theatre IDs separated by commas"
      />
      {error && <p style={{ color: 'red' }}>{error}</p>} {/* Display error message */}
      <Button type="submit" variant="contained" color="primary">
        {cinema ? 'Update Cinema' : 'Add Cinema'}
      </Button>
    </form>
  );
};

export default CinemaForm;
