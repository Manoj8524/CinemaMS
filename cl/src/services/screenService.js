import axios from 'axios';

const API_URL = 'http://localhost:5000/api/screens';

export const getScreens = async () => {
  const res = await axios.get(API_URL);
  return res.data;
};

export const createScreen = async (screen) => {
  const res = await axios.post(API_URL, screen);
  return res.data;
};

export const updateScreen = async (id, screen) => {
  const res = await axios.put(`${API_URL}/${id}`, screen);
  return res.data;
};

export const deleteScreen = async (id) => {
  const res = await axios.delete(`${API_URL}/${id}`);
  return res.data;
};
