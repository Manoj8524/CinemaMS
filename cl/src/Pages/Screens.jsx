import React, { useEffect, useState } from 'react';
import { getScreens, createScreen, updateScreen, deleteScreen } from '../services/screenService';
import ScreenForm from '../components/ScreenForm';
import { Button } from '@mui/material';

const Screens = () => {
  const [screens, setScreens] = useState([]);
  const [selectedScreen, setSelectedScreen] = useState(null);

  useEffect(() => {
    loadScreens();
  }, []);

  const loadScreens = async () => {
    const data = await getScreens();
    setScreens(data);
  };

  const handleCreateOrUpdate = async (screen) => {
    if (selectedScreen) {
      await updateScreen(selectedScreen._id, screen);
    } else {
      await createScreen(screen);
    }
    loadScreens();
    setSelectedScreen(null);
  };

  const handleDelete = async (id) => {
    await deleteScreen(id);
    loadScreens();
  };

  const handleEdit = (screen) => {
    setSelectedScreen(screen);
  };

  return (
    <div className="p-4">
      <ScreenForm onSave={handleCreateOrUpdate} screen={selectedScreen} />
      <ul>
        {screens.map(screen => (
          <li key={screen._id} className="flex justify-between items-center border p-2 mb-2">
            {screen.name}
            <div>
              <Button onClick={() => handleEdit(screen)} variant="contained" className="mr-2">Edit</Button>
              <Button onClick={() => handleDelete(screen._id)} variant="outlined" color="error">Delete</Button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Screens;
