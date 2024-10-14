// src/components/MovieList.js

import React from 'react';

const MovieList = ({ movies }) => {
  return (
    <div>
      <h2 className="text-xl mb-4">Movies</h2>
      <ul>
        {movies.map((movie) => (
          <li key={movie._id} className="border p-2 mb-2">
            <h3 className="font-bold">{movie.title}</h3>
            <p>Genre: {movie.genre}</p>
            <p>Duration: {movie.duration} min</p>
            <p>Running At: {movie.runningAt.join(', ')}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default MovieList;
