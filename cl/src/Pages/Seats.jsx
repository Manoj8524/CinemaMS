import React, { useEffect, useState } from 'react';
import { getSeats, createSeat, updateSeat, deleteSeat } from '../services/seatService';
import SeatForm from '../components/SeatForm';
import { Button } from '@mui/material';

const Seats = () => {
  const [seats, setSeats] = useState([]);
  const [selectedSeat, setSelectedSeat] = useState(null);

  useEffect(() => {
    loadSeats();
  }, []);

  const loadSeats = async () => {
    const data = await getSeats();
    setSeats(data);
  };

  const handleCreateOrUpdate = async (seat) => {
    if (selectedSeat) {
      await updateSeat(selectedSeat._id, seat);
    } else {
      await createSeat(seat);
    }
    loadSeats();
    setSelectedSeat(null);
  };

  const handleDelete = async (id) => {
    await deleteSeat(id);
    loadSeats();
  };

  const handleEdit = (seat) => {
    setSelectedSeat(seat);
  };

  return (
    <div className="p-4">
      <SeatForm onSave={handleCreateOrUpdate} seat={selectedSeat} />
      <ul>
        {seats.map(seat => (
          <li key={seat._id} className="flex justify-between items-center border p-2 mb-2">
            {seat.seatNumber}
            <div>
              <Button onClick={() => handleEdit(seat)} variant="contained" className="mr-2">Edit</Button>
              <Button onClick={() => handleDelete(seat._id)} variant="outlined" color="error">Delete</Button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Seats;
