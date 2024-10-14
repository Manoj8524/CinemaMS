import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { TextField, Button } from '@mui/material';

const TheatreForm = ({ theatre, onSave, onCancel }) => {
  const [name, setName] = useState('');
  const [cinema, setCinema] = useState('');

  useEffect(() => {
    if (theatre) {
      setName(theatre.name);
      setCinema(theatre.cinema);
    }
  }, [theatre]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const theatreData = { name, cinema };

    if (theatre) {
      await axios.put(`http://localhost:5000/api/theatres/${theatre._id}`, theatreData);
    } else {
      await axios.post('http://localhost:5000/api/theatres', theatreData);
    }

    onSave();
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
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
      <div className="flex justify-between">
        <Button variant="contained" type="submit">Save</Button>
        <Button variant="outlined" onClick={onCancel}>Cancel</Button>
      </div>
    </form>
  );
};

export default TheatreForm;
