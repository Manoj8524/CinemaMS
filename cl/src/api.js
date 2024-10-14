import axios from 'axios';

const API_URL = 'http://localhost:5000/api';

export const createShowtime = async (showtime) => {
    return await axios.post(`${API_URL}/showtimes`, showtime);
};

export const getShowtimes = async () => {
    return await axios.get(`${API_URL}/showtimes`);
};

export const updateShowtime = async (id, updatedShowtime) => {
    return await axios.put(`${API_URL}/showtimes/${id}`, updatedShowtime);
};

export const deleteShowtime = async (id) => {
    return await axios.delete(`${API_URL}/showtimes/${id}`);
};
