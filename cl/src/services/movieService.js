import axios from 'axios';

const API_URL = 'http://localhost:5000/api/movies';

export const getMovies = async () => {
  const res = await axios.get(API_URL);
  return res.data;
};

export const createMovie = async (movie) => {
  const res = await axios.post(API_URL, movie);
  return res.data;
};

export const updateMovie = async (id, movie) => {
  const res = await axios.put(`${API_URL}/${id}`, movie);
  return res.data;
};

export const deleteMovie = async (id) => {
  const res = await axios.delete(`${API_URL}/${id}`);
  return res.data;
};
