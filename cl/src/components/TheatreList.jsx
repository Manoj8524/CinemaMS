import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Button } from '@mui/material';
import TheatreForm from './TheatreForm';

const TheatreList = () => {
  const [theatres, setTheatres] = useState([]);
  const [editingTheatre, setEditingTheatre] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchTheatres = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/theatres');
        setTheatres(response.data);
        setLoading(false);
      } catch (err) {
        setError('Failed to load theatres.');
        setLoading(false);
      }
    };
    fetchTheatres();
  }, []);

  const handleEdit = (theatre) => {
    setEditingTheatre(theatre);
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/theatres/${id}`);
      setTheatres(theatres.filter(theatre => theatre._id !== id));
    } catch (err) {
      setError('Failed to delete theatre.');
    }
  };

  const handleSave = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/theatres');
      setTheatres(response.data);
      setEditingTheatre(null);
    } catch (err) {
      setError('Failed to refresh theatres.');
    }
  };

  return (
    <div>
      <h1 className="text-2xl font-bold">Theatres</h1>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      {loading ? (
        <p>Loading...</p>
      ) : (
        <div>
          <Button variant="contained" onClick={() => setEditingTheatre({})}>Add Theatre</Button>
          <ul className="mt-4">
            {theatres.map(theatre => (
              <li key={theatre._id} className="flex justify-between items-center py-2">
                <span>{theatre.name}</span>
                <div>
                  <Button variant="outlined" onClick={() => handleEdit(theatre)}>Edit</Button>
                  <Button variant="outlined" color="error" onClick={() => handleDelete(theatre._id)}>Delete</Button>
                </div>
              </li>
            ))}
          </ul>
        </div>
      )}
      {editingTheatre && (
        <div className="mt-4">
          <TheatreForm theatre={editingTheatre} onSave={handleSave} onCancel={() => setEditingTheatre(null)} />
        </div>
      )}
    </div>
  );
};

export default TheatreList;
