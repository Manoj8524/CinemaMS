import axios from 'axios';

const API_URL = 'http://localhost:5000/api/showtimes';

export const getShowtimes = async () => {
  const res = await axios.get(API_URL);
  return res.data;
};

export const createShowtime = async (showtime) => {
  const res = await axios.post(API_URL, showtime);
  return res.data;
};

export const updateShowtime = async (id, showtime) => {
  const res = await axios.put(`${API_URL}/${id}`, showtime);
  return res.data;
};

export const deleteShowtime = async (id) => {
  const res = await axios.delete(`${API_URL}/${id}`);
  return res.data;
};
