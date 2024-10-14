import React, { useEffect, useState } from 'react';
import { getCinemas, deleteCinema } from '../services/cinemaService';
import { Button, List, ListItem, ListItemText } from '@mui/material';
import CinemaForm from './CinemaForm';

const CinemaList = () => {
  const [cinemas, setCinemas] = useState([]);
  const [editingCinema, setEditingCinema] = useState(null);
  const [refresh, setRefresh] = useState(false);

  useEffect(() => {
    const fetchCinemas = async () => {
      const data = await getCinemas();
      setCinemas(data);
    };
    fetchCinemas();
  }, [refresh]);

  const handleDelete = async (id) => {
    await deleteCinema(id);
    setRefresh(!refresh);
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
      <List>
        {cinemas.map((cinema) => (
          <ListItem key={cinema._id}>
            <ListItemText primary={cinema.name} secondary={cinema.location} />
            <Button variant="outlined" onClick={() => handleEdit(cinema)}>Edit</Button>
            <Button variant="outlined" color="secondary" onClick={() => handleDelete(cinema._id)}>Delete</Button>
          </ListItem>
        ))}
      </List>
    </div>
  );
};

export default CinemaList;
