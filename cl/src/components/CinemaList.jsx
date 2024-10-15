// CinemaList.jsx
import React, { useEffect, useState } from 'react';
import { getCinemas, deleteCinema } from '../services/cinemaService';
import { Button, List, ListItem, ListItemText } from '@mui/material';
import CinemaForm from './CinemaForm';

const CinemaList = () => {
  const [cinemas, setCinemas] = useState([]);
  const [editingCinema, setEditingCinema] = useState(null);
  const [refresh, setRefresh] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchCinemas = async () => {
      try {
        const data = await getCinemas();
        setCinemas(data);
      } catch (err) {
        setError('Failed to fetch cinemas');
      }
    };
    fetchCinemas();
  }, [refresh]);

  const handleDelete = async (id) => {
    try {
      await deleteCinema(id);
      setRefresh(!refresh); // Refresh the list after deletion
    } catch (err) {
      setError('Failed to delete cinema');
    }
  };

  const handleEdit = (cinema) => {
    setEditingCinema(cinema);
  };

  const handleFormSubmit = () => {
    setEditingCinema(null);
    setRefresh(!refresh);
  };

  return (
    <div>
      <CinemaForm cinema={editingCinema} onSubmit={handleFormSubmit} />
      {error && <p style={{ color: 'red' }}>{error}</p>} {/* Display error message */}
      <List>
        {cinemas.map((cinema) => (
          <ListItem key={cinema._id}>
            <ListItemText
              primary={cinema.name}
              secondary={`Location: ${cinema.location}, Theatres: ${cinema.theatres.join(', ')}`} // Display theatre IDs
            />
            <Button variant="outlined" onClick={() => handleEdit(cinema)}>Edit</Button>
            <Button variant="outlined" color="secondary" onClick={() => handleDelete(cinema._id)}>Delete</Button>
          </ListItem>
        ))}
      </List>
    </div>
  );
};

export default CinemaList;
