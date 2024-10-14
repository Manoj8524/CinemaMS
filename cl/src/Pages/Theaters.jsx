import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Theatres = () => {
  const [theatres, setTheatres] = useState([]);
  const [name, setName] = useState('');
  const [cinema, setCinema] = useState('');
  const [screens, setScreens] = useState('');
  const [editingTheatre, setEditingTheatre] = useState(null);

  // Fetch theatres from the server
  useEffect(() => {
    const fetchTheatres = async () => {
      try {
        const response = await axios.get('/api/theatres');
        setTheatres(response.data);
      } catch (error) {
        console.error('Error fetching theatres:', error);
      }
    };

    fetchTheatres();
  }, []);

  // Handle form submission for adding or updating theatres
  const handleSubmit = async (e) => {
    e.preventDefault();

    const theatreData = { name, cinema, screens: screens.split(',') };

    try {
      if (editingTheatre) {
        // Update the existing theatre
        await axios.put(`/api/theatres/${editingTheatre}`, theatreData);
      } else {
        // Create a new theatre
        await axios.post('/api/theatres', theatreData);
      }
      // Reset form fields
      setName('');
      setCinema('');
      setScreens('');
      setEditingTheatre(null);

      // Refresh the theatre list
      const response = await axios.get('/api/theatres');
      setTheatres(response.data);
    } catch (error) {
      console.error('Error creating/updating theatre:', error);
    }
  };

  // Handle editing a theatre
  const handleEdit = (theatre) => {
    setName(theatre.name);
    setCinema(theatre.cinema);
    setScreens(theatre.screens.join(',')); // Convert array back to string
    setEditingTheatre(theatre._id);
  };

  // Handle deleting a theatre
  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this theatre?')) {
      try {
        await axios.delete(`/api/theatres/${id}`);
        const response = await axios.get('/api/theatres');
        setTheatres(response.data);
      } catch (error) {
        console.error('Error deleting theatre:', error);
      }
    }
  };

  return (
    <div>
      <h1>Theatres</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Theatre Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
        <input
          type="text"
          placeholder="Cinema ID"
          value={cinema}
          onChange={(e) => setCinema(e.target.value)}
          required
        />
        <input
          type="text"
          placeholder="Screen IDs (comma separated)"
          value={screens}
          onChange={(e) => setScreens(e.target.value)}
          required
        />
        <button type="submit">{editingTheatre ? 'Update' : 'Add'} Theatre</button>
      </form>
      <ul>
        {theatres.map((theatre) => (
          <li key={theatre._id}>
            {theatre.name}
            <button onClick={() => handleEdit(theatre)}>Edit</button>
            <button onClick={() => handleDelete(theatre._id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Theatres;
