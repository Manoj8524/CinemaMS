import axios from 'axios';

const API_URL = 'http://localhost:5000/api/seats';

export const getSeats = async () => {
  const res = await axios.get(API_URL);
  return res.data;
};

export const createSeat = async (seat) => {
  const res = await axios.post(API_URL, seat);
  return res.data;
};

export const updateSeat = async (id, seat) => {
  const res = await axios.put(`${API_URL}/${id}`, seat);
  return res.data;
};

export const deleteSeat = async (id) => {
  const res = await axios.delete(`${API_URL}/${id}`);
  return res.data;
};
