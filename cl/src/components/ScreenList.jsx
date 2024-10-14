// src/components/ScreenList.jsx
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Button } from '@mui/material';
import ScreenForm from './ScreenForm';

const ScreenList = () => {
  const [screens, setScreens] = useState([]);
  const [editingScreen, setEditingScreen] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchScreens = async () => {
      const response = await axios.get('http://localhost:5000/api/screens');
      setScreens(response.data);
      setLoading(false);
    };
    fetchScreens();
  }, []);

  const handleEdit = (screen) => {
    setEditingScreen(screen);
  };

  const handleDelete = async (id) => {
    await axios.delete(`http://localhost:5000/api/screens/${id}`);
    setScreens(screens.filter((screen) => screen._id !== id));
  };

  const handleSave = async () => {
    const response = await axios.get('http://localhost:5000/api/screens');
    setScreens(response.data);
    setEditingScreen(null);
  };

  return (
    <div>
      <h1 className="text-2xl font-bold">Screens</h1>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <div>
          <Button variant="contained" onClick={() => setEditingScreen({})}>Add Screen</Button>
          <ul className="mt-4">
            {screens.map((screen) => (
              <li key={screen._id} className="flex justify-between items-center py-2">
                <span>Screen Number: {screen.screenNumber}, Theatre: {screen.theatre}</span>
                <div>
                  <Button variant="outlined" onClick={() => handleEdit(screen)}>Edit</Button>
                  <Button variant="outlined" color="error" onClick={() => handleDelete(screen._id)}>Delete</Button>
                </div>
              </li>
            ))}
          </ul>
        </div>
      )}
      {editingScreen && (
        <div className="mt-4">
          <ScreenForm screen={editingScreen} onSave={handleSave} onCancel={() => setEditingScreen(null)} />
        </div>
      )}
    </div>
  );
};

export default ScreenList;
