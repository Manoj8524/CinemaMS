// src/components/ScreenForm.jsx
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Button, TextField } from '@mui/material';

const ScreenForm = ({ screen, onSave, onCancel }) => {
  const [screenNumber, setScreenNumber] = useState('');
  const [theatre, setTheatre] = useState('');

  useEffect(() => {
    if (screen) {
      setScreenNumber(screen.screenNumber);
      setTheatre(screen.theatre);
    }
  }, [screen]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newScreen = { screenNumber, theatre };
    try {
      if (screen) {
        // Update existing screen
        await axios.put(`http://localhost:5000/api/screens/${screen._id}`, newScreen);
      } else {
        // Create new screen
        await axios.post('http://localhost:5000/api/screens', newScreen);
      }
      onSave(); // Callback to refresh the screen list
    } catch (error) {
      console.error('Error saving screen:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <TextField
        label="Screen Number"
        variant="outlined"
        value={screenNumber}
        onChange={(e) => setScreenNumber(e.target.value)}
        required
        fullWidth
      />
      <TextField
        label="Theatre ID"
        variant="outlined"
        value={theatre}
        onChange={(e) => setTheatre(e.target.value)}
        required
        fullWidth
      />
      <div className="flex justify-between">
        <Button variant="contained" type="submit">Save</Button>
        <Button variant="outlined" onClick={onCancel}>Cancel</Button>
      </div>
    </form>
  );
};

export default ScreenForm;
