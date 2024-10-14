import axios from 'axios';

const API_URL = 'http://localhost:5000/api/theaters';

export const getTheaters = async () => {
  const res = await axios.get(API_URL);
  return res.data;
};

export const createTheater = async (theater) => {
  const res = await axios.post(API_URL, theater);
  return res.data;
};

export const updateTheater = async (id, theater) => {
  const res = await axios.put(`${API_URL}/${id}`, theater);
  return res.data;
};

export const deleteTheater = async (id) => {
  const res = await axios.delete(`${API_URL}/${id}`);
  return res.data;
};
