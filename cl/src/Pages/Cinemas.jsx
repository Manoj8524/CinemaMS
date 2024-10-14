// src/pages/Cinemas.js
import React, { useState, useEffect } from 'react';
import CinemaForm from '../components/CinemaForm';
import CinemaList from '../components/CinemaList';
import axios from 'axios';

const Cinemas = () => {
  const [cinemas, setCinemas] = useState([]);

  useEffect(() => {
    fetchCinemas();
  }, []);

  const fetchCinemas = async () => {
    const response = await axios.get('http://localhost:5000/api/cinemas');
    setCinemas(response.data);
  };

  return (
    <div className="container mx-auto p-5">
      <h2 className="text-2xl mb-5">Cinemas</h2>
      <CinemaForm fetchCinemas={fetchCinemas} />
      <CinemaList cinemas={cinemas} fetchCinemas={fetchCinemas} />
    </div>
  );
};

export default Cinemas;
