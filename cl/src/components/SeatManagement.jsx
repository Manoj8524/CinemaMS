// src/components/SeatManagement.js

import React, { useEffect, useState } from 'react';
import { Button, TextField, Typography } from '@mui/material';
import axios from 'axios';

const SeatManagement = () => {
  const [seats, setSeats] = useState([]);
  const [seatNumber, setSeatNumber] = useState('');
  const [isBooked, setIsBooked] = useState(false);

  useEffect(() => {
    fetchSeats();
  }, []);

  const fetchSeats = async () => {
    const response = await axios.get('http://localhost:5000/api/seats');
    setSeats(response.data);
  };

  const addSeat = async () => {
    await axios.post('http://localhost:5000/api/seats', { seatNumber, isBooked });
    fetchSeats();
    setSeatNumber('');
    setIsBooked(false);
  };

  const deleteSeat = async (id) => {
    await axios.delete(`http://localhost:5000/api/seats/${id}`);
    fetchSeats();
  };

  return (
    <div className="p-5">
      <Typography variant="h4" className="mb-4">Manage Seats</Typography>
      
      <TextField
        label="Seat Number"
        variant="outlined"
        value={seatNumber}
        onChange={(e) => setSeatNumber(e.target.value)}
        className="mr-2"
      />
      <Button variant="contained" color="primary" onClick={addSeat}>Add Seat</Button>

      <Typography variant="h6" className="mt-4">Available Seats</Typography>
      <div className="mt-2">
        {seats.map((seat) => (
          <div key={seat._id} className="flex justify-between items-center border-b py-2">
            <Typography>{seat.seatNumber} - {seat.isBooked ? 'Booked' : 'Available'}</Typography>
            <Button variant="contained" color="secondary" onClick={() => deleteSeat(seat._id)}>Delete</Button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SeatManagement;
