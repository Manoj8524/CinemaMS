import React, { useEffect, useState } from 'react';
import { Button, TextField, Typography, Grid, Paper } from '@mui/material';
import axios from 'axios';

const SeatManagement = () => {
  const [seats, setSeats] = useState([]);
  const [screenId, setScreenId] = useState(''); // Screen ID field
  const [section, setSection] = useState('A'); // Section name (A, B, C)
  const [totalSeats, setTotalSeats] = useState(50); // Default total seats (can be adjusted)

  useEffect(() => {
    fetchSeats();
  }, []);

  const fetchSeats = async () => {
    const response = await axios.get('http://localhost:5000/api/seats');
    setSeats(response.data);
  };

  // Function to generate seat numbers based on section and total seats
  const generateSeatNumbers = () => {
    let seatNumbers = [];
    for (let i = 1; i <= totalSeats; i++) {
      seatNumbers.push(`${section}:${i}`); // Generates seat numbers like A:1, A:2, etc.
    }
    return seatNumbers;
  };

  const addSeats = async () => {
    const seatNumbers = generateSeatNumbers();

    for (const seatNumber of seatNumbers) {
      await axios.post('http://localhost:5000/api/seats', {
        seatNumber,
        screen: screenId, // Sending screen ID
      });
    }

    fetchSeats(); // Refresh the seats list
    setScreenId('');
  };

  const deleteSeat = async (id) => {
    await axios.delete(`http://localhost:5000/api/seats/${id}`);
    fetchSeats();
  };

  return (
    <Paper elevation={3} className="p-5" style={{ maxWidth: '600px', margin: 'auto' }}>
      <Typography variant="h4" className="mb-4" align="center">Manage Seats</Typography>

      <Grid container spacing={2}>
        <Grid item xs={12}>
          <TextField
            label="Screen ID"
            variant="outlined"
            fullWidth
            value={screenId}
            onChange={(e) => setScreenId(e.target.value)}
          />
        </Grid>
        <Grid item xs={6}>
          <TextField
            label="Section (e.g. A)"
            variant="outlined"
            fullWidth
            value={section}
            onChange={(e) => setSection(e.target.value)}
          />
        </Grid>
        <Grid item xs={6}>
          <TextField
            label="Total Seats"
            variant="outlined"
            type="number"
            fullWidth
            value={totalSeats}
            onChange={(e) => setTotalSeats(e.target.value)}
          />
        </Grid>
        <Grid item xs={12}>
          <Button variant="contained" color="primary" fullWidth onClick={addSeats}>
            Add Seats
          </Button>
        </Grid>
      </Grid>

      <Typography variant="h6" className="mt-4" align="center">Available Seats</Typography>

      <div className="mt-2">
        {seats.map((seat) => (
          <Grid container key={seat._id} alignItems="center" className="border-bottom py-2">
            <Grid item xs={8}>
            <Typography>{seat.seatNumber} - Screen: {seat.screen.screenNumber} (Theatre: {seat.screen.theatre})</Typography>


            </Grid>
            <Grid item xs={4} style={{ textAlign: 'right' }}>
              <Button variant="contained" color="secondary" onClick={() => deleteSeat(seat._id)}>Delete</Button>
            </Grid>
          </Grid>
        ))}
      </div>
    </Paper>
  );
};

export default SeatManagement;
