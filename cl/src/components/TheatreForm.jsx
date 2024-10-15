import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { TextField, Button } from '@mui/material';

const TheatreForm = ({ theatre, onSave, onCancel }) => {
  const [name, setName] = useState('');
  const [cinema, setCinema] = useState('');
  const [screens, setScreens] = useState('');
  const [error, setError] = useState(null);

  useEffect(() => {
    if (theatre) {
      setName(theatre.name || '');
      setCinema(theatre.cinema || '');
      setScreens(theatre.screens?.join(', ') || ''); // Assuming 'screens' is an array of IDs
    }
  }, [theatre]);

  const validateForm = () => {
    if (!name || !cinema || !screens) {
      setError('Please fill in all fields.');
      return false;
    }
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    const theatreData = {
      name,
      cinema,
      screens: screens.split(',').map(screen => screen.trim()) // Convert to array of IDs
    };

    try {
      if (theatre && theatre._id) {
        // PUT request for updating an existing theatre
        await axios.put(`http://localhost:5000/api/theatres/${theatre._id}`, theatreData);
      } else {
        // POST request for creating a new theatre
        await axios.post('http://localhost:5000/api/theatres', theatreData);
      }
      onSave(); // Refresh the list after save
    } catch (err) {
      setError('Failed to save theatre. Please check the input fields.');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {error && <p style={{ color: 'red' }}>{error}</p>} {/* Display error message */}
      <TextField
        label="Theatre Name"
        variant="outlined"
        value={name}
        onChange={(e) => setName(e.target.value)}
        fullWidth
        required
      />
      <TextField
        label="Cinema ID"
        variant="outlined"
        value={cinema}
        onChange={(e) => setCinema(e.target.value)}
        fullWidth
        required
      />
      <TextField
        label="Screens (comma-separated IDs)"
        variant="outlined"
        value={screens}
        onChange={(e) => setScreens(e.target.value)}
        fullWidth
        required
      />
      <div className="flex justify-between">
        <Button variant="contained" type="submit">Save</Button>
        <Button variant="outlined" onClick={onCancel}>Cancel</Button>
      </div>
    </form>
  );
};

export default TheatreForm;
