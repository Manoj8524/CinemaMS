// src/pages/Movies.js

import React, { useEffect, useState } from 'react';
import MovieForm from '../components/MovieForm';
import MovieList from '../components/MovieList';

const Movies = () => {
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    const fetchMovies = async () => {
      const response = await fetch('http://localhost:5000/api/movies');
      const data = await response.json();
      setMovies(data);
    };
    fetchMovies();
  }, []);

  const handleAddMovie = (newMovie) => {
    setMovies((prevMovies) => [...prevMovies, newMovie]);
  };

  return (
    <div className="p-4">
      <h1 className="text-2xl mb-4">Manage Movies</h1>
      <MovieForm onAddMovie={handleAddMovie} />
      <MovieList movies={movies} />
    </div>
  );
};

export default Movies;
