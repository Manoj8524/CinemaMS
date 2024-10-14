import React, { useState, useEffect } from 'react';
import { createCinema, updateCinema } from '../services/cinemaService';
import { TextField, Button } from '@mui/material';

const CinemaForm = ({ cinema, onSubmit }) => {
  const [name, setName] = useState(cinema ? cinema.name : '');
  const [location, setLocation] = useState(cinema ? cinema.location : '');

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newCinema = { name, location };
    if (cinema) {
      await updateCinema(cinema._id, newCinema);
    } else {
      await createCinema(newCinema);
    }
    onSubmit();
    setName('');
    setLocation('');
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
      <Button type="submit" variant="contained" color="primary">
        {cinema ? 'Update Cinema' : 'Add Cinema'}
      </Button>
    </form>
  );
};

export default CinemaForm;
