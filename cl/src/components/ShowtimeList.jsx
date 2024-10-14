import React from 'react';
import { Button } from '@mui/material';
import { deleteShowtime } from '../api';

const ShowtimeList = ({ showtimes, fetchShowtimes }) => {
    const handleDelete = async (id) => {
        await deleteShowtime(id);
        fetchShowtimes(); // Refresh the showtime list
    };

    return (
        <div className="mt-5">
            <h2 className="text-2xl font-semibold mb-4">Showtime List</h2>
            <ul className="space-y-2">
                {showtimes.map((showtime) => (
                    <li key={showtime._id} className="flex justify-between items-center bg-gray-100 p-4 rounded shadow">
                        <div>
                            <strong>Movie:</strong> {showtime.movie} | 
                            <strong> Screen:</strong> {showtime.screen} | 
                            <strong> Time:</strong> {showtime.time} | 
                            <strong> Date:</strong> {new Date(showtime.date).toLocaleDateString()} | 
                            <strong> Price:</strong> ${showtime.price}
                        </div>
                        <Button 
                            variant="outlined" 
                            color="secondary" 
                            onClick={() => handleDelete(showtime._id)}
                        >
                            Delete
                        </Button>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default ShowtimeList;
