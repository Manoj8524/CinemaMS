import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Button, Input, notification, Space } from 'antd';

const ScreenForm = ({ screen, onSave, onCancel }) => {
  const [screenNumber, setScreenNumber] = useState('');
  const [theatre, setTheatre] = useState('');
  const [movies, setMovies] = useState([]);
  const [seats, setSeats] = useState([]);

  useEffect(() => {
    if (screen) {
      setScreenNumber(screen.screenNumber);
      setTheatre(screen.theatre);
      setMovies(screen.movies || []);
      setSeats(screen.seats || []);
    } else {
      clearForm();
    }
  }, [screen]);

  const clearForm = () => {
    setScreenNumber('');
    setTheatre('');
    setMovies([]);
    setSeats([]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newScreen = { screenNumber, theatre, movies, seats };

    if (!screenNumber || !theatre) {
      console.error('Screen number and theatre are required fields');
      return;
    }

    try {
      if (screen && screen._id) {
        await axios.put(`https://cinemams.onrender.com/api/screens/${screen._id}`, newScreen);
        notification.success({
          message: 'Screen Updated',
          description: 'The screen details have been successfully updated.',
        });
      } else {
        await axios.post('https://cinemams.onrender.com/api/screens', newScreen);
        notification.success({
          message: 'Screen Created',
          description: 'The new screen has been successfully created.',
        });
      }
      clearForm();
      onSave();
    } catch (error) {
      console.error('Error saving screen:', error);
      notification.error({
        message: 'Error',
        description: 'There was an error saving the screen. Please try again.',
      });
    }
  };

  const addMovieField = () => {
    setMovies([...movies, '']);
  };

  const handleMovieChange = (index, value) => {
    const newMovies = [...movies];
    newMovies[index] = value; 
    setMovies(newMovies);
  };

  const removeMovieField = (index) => {
    setMovies(movies.filter((_, i) => i !== index)); 
  };

  const addSeatField = () => {
    setSeats([...seats, '']); 
  };

  const handleSeatChange = (index, value) => {
    const newSeats = [...seats];
    newSeats[index] = value; 
    setSeats(newSeats);
  };

  const removeSeatField = (index) => {
    setSeats(seats.filter((_, i) => i !== index)); 
  };

  return (
    <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
      <Input
        placeholder="Screen Number"
        value={screenNumber}
        onChange={(e) => setScreenNumber(e.target.value)}
        required
      />
      <Input
        placeholder="Theatre ID"
        value={theatre}
        onChange={(e) => setTheatre(e.target.value)}
        required
      />

      <div>
        <div style={{ marginBottom: '8px' }}>Movies:</div>
        {movies.map((movie, index) => (
          <Space key={index} style={{ marginBottom: '8px' }}>
            <Input
              placeholder={`Movie ID ${index + 1}`}
              value={movie}
              onChange={(e) => handleMovieChange(index, e.target.value)}
            />
            <Button type="link" onClick={() => removeMovieField(index)}>Remove</Button>
          </Space>
        ))}
        <Button type="dashed" onClick={addMovieField} style={{ width: '100%' }}>
          Add Movie ID
        </Button>
      </div>

      <div>
        <div style={{ marginBottom: '8px' }}>Seats:</div>
        {seats.map((seat, index) => (
          <Space key={index} style={{ marginBottom: '8px' }}>
            <Input
              placeholder={`Seat ID ${index + 1}`}
              value={seat}
              onChange={(e) => handleSeatChange(index, e.target.value)}
            />
            <Button type="link" onClick={() => removeSeatField(index)}>Remove</Button>
          </Space>
        ))}
        <Button type="dashed" onClick={addSeatField} style={{ width: '100%' }}>
          Add Seat ID
        </Button>
      </div>

      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
        <Button type="primary" htmlType="submit">Save</Button>
        <Button onClick={() => { clearForm(); onCancel(); }}>Cancel</Button>
      </div>
    </form>
  );
};

export default ScreenForm;
