import React, { useEffect, useState } from 'react';
import { getShowtimes, createShowtime, updateShowtime, deleteShowtime } from '../services/showtimeService';
import ShowtimeForm from '../components/ShowtimeForm';
import { Button } from '@mui/material';

const Showtimes = () => {
  const [showtimes, setShowtimes] = useState([]);
  const [selectedShowtime, setSelectedShowtime] = useState(null);

  useEffect(() => {
    loadShowtimes();
  }, []);

  const loadShowtimes = async () => {
    const data = await getShowtimes();
    setShowtimes(data);
  };

  const handleCreateOrUpdate = async (showtime) => {
    if (selectedShowtime) {
      await updateShowtime(selectedShowtime._id, showtime);
    } else {
      await createShowtime(showtime);
    }
    loadShowtimes();
    setSelectedShowtime(null);
  };

  const handleDelete = async (id) => {
    await deleteShowtime(id);
    loadShowtimes();
  };

  const handleEdit = (showtime) => {
    setSelectedShowtime(showtime);
  };

  return (
    <div className="p-4">
      <ShowtimeForm onSave={handleCreateOrUpdate} showtime={selectedShowtime} />
      <ul>
        {showtimes.map(showtime => (
          <li key={showtime._id} className="flex justify-between items-center border p-2 mb-2">
            {showtime.time}
            <div>
              <Button onClick={() => handleEdit(showtime)} variant="contained" className="mr-2">Edit</Button>
              <Button onClick={() => handleDelete(showtime._id)} variant="outlined" color="error">Delete</Button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Showtimes;
