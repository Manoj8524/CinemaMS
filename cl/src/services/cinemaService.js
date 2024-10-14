import axios from 'axios';

const API_URL = 'http://localhost:5000/api/cinemas';

export const getCinemas = async () => {
  const response = await axios.get(API_URL);
  return response.data;
};

export const createCinema = async (cinema) => {
  const response = await axios.post(API_URL, cinema);
  return response.data;
};

export const updateCinema = async (id, cinema) => {
  const response = await axios.put(`${API_URL}/${id}`, cinema);
  return response.data;
};

export const deleteCinema = async (id) => {
  await axios.delete(`${API_URL}/${id}`);
};
