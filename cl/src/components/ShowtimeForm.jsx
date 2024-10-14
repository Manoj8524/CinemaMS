import React, { useState, useEffect } from 'react';
import { createShowtime, getShowtimes } from '../api';
import { TextField, Button } from '@mui/material';
import ShowtimeList from './ShowtimeList';

const ShowtimeForm = () => {
    const [movie, setMovie] = useState('');
    const [screen, setScreen] = useState('');
    const [time, setTime] = useState('');
    const [date, setDate] = useState('');
    const [price, setPrice] = useState('');
    const [showtimes, setShowtimes] = useState([]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        await createShowtime({ movie, screen, time, date, price });
        fetchShowtimes();
        resetForm();
    };

    const fetchShowtimes = async () => {
        const response = await getShowtimes();
        setShowtimes(response.data);
    };

    const resetForm = () => {
        setMovie('');
        setScreen('');
        setTime('');
        setDate('');
        setPrice('');
    };

    useEffect(() => {
        fetchShowtimes();
    }, []);

    return (
        <div className="p-5 bg-white rounded shadow-lg">
            <h2 className="text-2xl font-semibold mb-4">Add Showtime</h2>
            <form onSubmit={handleSubmit} className="flex flex-col space-y-3">
                <TextField 
                    label="Movie" 
                    variant="outlined" 
                    value={movie} 
                    onChange={(e) => setMovie(e.target.value)} 
                    className="w-full"
                />
                <TextField 
                    label="Screen" 
                    variant="outlined" 
                    value={screen} 
                    onChange={(e) => setScreen(e.target.value)} 
                    className="w-full"
                />
                <TextField 
                    label="Time" 
                    variant="outlined" 
                    value={time} 
                    onChange={(e) => setTime(e.target.value)} 
                    className="w-full"
                />
                <TextField 
                    label="Date" 
                    type="date" 
                    variant="outlined" 
                    value={date} 
                    onChange={(e) => setDate(e.target.value)} 
                    InputLabelProps={{
                        shrink: true,
                    }}
                    className="w-full"
                />
                <TextField 
                    label="Price" 
                    type="number" 
                    variant="outlined" 
                    value={price} 
                    onChange={(e) => setPrice(e.target.value)} 
                    className="w-full"
                />
                <Button type="submit" variant="contained" color="primary">Add Showtime</Button>
            </form>
            <ShowtimeList showtimes={showtimes} fetchShowtimes={fetchShowtimes} />
        </div>
    );
};

export default ShowtimeForm;
