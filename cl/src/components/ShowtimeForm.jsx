import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Input, Button, Form, DatePicker, TimePicker } from 'antd';
import moment from 'moment';
import ShowtimeList from './ShowtimeList';

const ShowtimeForm = () => {
    const [movie, setMovie] = useState('');
    const [screen, setScreen] = useState('');
    const [firstShow, setFirstShow] = useState(null);
    const [secondShow, setSecondShow] = useState(null);
    const [thirdShow, setThirdShow] = useState(null);
    const [fourthShow, setFourthShow] = useState(null);
    const [date, setDate] = useState('');
    const [showtimes, setShowtimes] = useState([]);
    const [editing, setEditing] = useState(false);
    const [currentShowtime, setCurrentShowtime] = useState(null);

    const placeholderTimes = {
        firstShow: moment('10:30', 'HH:mm'),
        secondShow: moment('14:30', 'HH:mm'),
        thirdShow: moment('18:00', 'HH:mm'),
        fourthShow: moment('21:00', 'HH:mm'),
    };

    const createShowtime = async (showtime) => {
        return await axios.post('https://cinemams.onrender.com/api/showtimes', showtime);
    };

    const updateShowtime = async (id, showtime) => {
        return await axios.put(`https://cinemams.onrender.com/api/showtimes/${id}`, showtime);
    };

    const handleSubmit = async () => {
        const formattedFirstShow = firstShow ? firstShow.format('HH:mm') : 'N/A';
        const formattedSecondShow = secondShow ? secondShow.format('HH:mm') : 'N/A';
        const formattedThirdShow = thirdShow ? thirdShow.format('HH:mm') : 'N/A';
        const formattedFourthShow = fourthShow ? fourthShow.format('HH:mm') : 'N/A';
        const formattedDate = date ? date.format('YYYY-MM-DD') : '';

        const showtimeData = {
            movie,
            screen,
            firstShow: formattedFirstShow,
            secondShow: formattedSecondShow,
            thirdShow: formattedThirdShow,
            fourthShow: formattedFourthShow,
            date: formattedDate,
        };

        if (editing) {
            await updateShowtime(currentShowtime._id, showtimeData);
        } else {
            await createShowtime(showtimeData);
        }

        fetchShowtimes();
        resetForm();
    };

    const fetchShowtimes = async () => {
        const response = await axios.get('https://cinemams.onrender.com/api/showtimes');
        setShowtimes(response.data);
    };

    const resetForm = () => {
        setMovie('');
        setScreen('');
        setFirstShow(null);
        setSecondShow(null);
        setThirdShow(null);
        setFourthShow(null);
        setDate('');
        setEditing(false);
        setCurrentShowtime(null);
    };

    const setEditShowtime = (showtime) => {
        setMovie(showtime.movie ? showtime.movie._id : '');
        setScreen(showtime.screen ? showtime.screen._id : '');
        setFirstShow(showtime.firstShow ? moment(showtime.firstShow, 'HH:mm') : null);
        setSecondShow(showtime.secondShow ? moment(showtime.secondShow, 'HH:mm') : null);
        setThirdShow(showtime.thirdShow ? moment(showtime.thirdShow, 'HH:mm') : null);
        setFourthShow(showtime.fourthShow ? moment(showtime.fourthShow, 'HH:mm') : null);
        setDate(moment(showtime.date.split('T')[0], 'YYYY-MM-DD'));
        setEditing(true);
        setCurrentShowtime(showtime);
    };

    useEffect(() => {
        fetchShowtimes();
    }, []);

    return (
        <div style={{ display: 'flex', height: '100vh' }}>
            
            <div style={{ width: '20%', padding: '20px', backgroundColor: 'white', borderRadius: '8px', boxShadow: '0 0 10px rgba(0,0,0,0.1)' }}>
                <h2 style={{ fontSize: '24px', fontWeight: '600', marginBottom: '20px' }}>{editing ? 'Edit Showtime' : 'Add Showtime'}</h2>
                <Form layout="vertical" onFinish={handleSubmit}>
                    <Form.Item label="Movie ID" required>
                        <Input value={movie} onChange={(e) => setMovie(e.target.value)} style={{ height: '40px' }} />
                    </Form.Item>
                    <Form.Item label="Screen ID" required>
                        <Input value={screen} onChange={(e) => setScreen(e.target.value)} style={{ height: '40px' }} />
                    </Form.Item>
                    <Form.Item label="First Show" required>
                        <TimePicker 
                            value={firstShow} 
                            onChange={setFirstShow} 
                            format="HH:mm" 
                            placeholder={placeholderTimes.firstShow.format('HH:mm')}
                            style={{ height: '40px', width: '100%' }}
                        />
                    </Form.Item>
                    <Form.Item label="Second Show" required>
                        <TimePicker 
                            value={secondShow} 
                            onChange={setSecondShow} 
                            format="HH:mm" 
                            placeholder={placeholderTimes.secondShow.format('HH:mm')}
                            style={{ height: '40px', width: '100%' }}
                        />
                    </Form.Item>
                    <Form.Item label="Third Show" required>
                        <TimePicker 
                            value={thirdShow} 
                            onChange={setThirdShow} 
                            format="HH:mm" 
                            placeholder={placeholderTimes.thirdShow.format('HH:mm')}
                            style={{ height: '40px', width: '100%' }}
                        />
                    </Form.Item>
                    <Form.Item label="Fourth Show" required>
                        <TimePicker 
                            value={fourthShow} 
                            onChange={setFourthShow} 
                            format="HH:mm" 
                            placeholder={placeholderTimes.fourthShow.format('HH:mm')}
                            style={{ height: '40px', width: '100%' }}
                        />
                    </Form.Item>
                    <Form.Item label="Date" required>
                        <DatePicker value={date} onChange={(value) => setDate(value)} format="YYYY-MM-DD" style={{ width: '100%', height: '40px' }} />
                    </Form.Item>
                    <Button type="primary" htmlType="submit" style={{ width: '100%', height: '40px' }}>
                        {editing ? 'Update Showtime' : 'Add Showtime'}
                    </Button>
                </Form>
            </div>

         
            <div style={{ width: '80%', padding: '20px', overflowY: 'auto' }}>
                <ShowtimeList showtimes={showtimes} fetchShowtimes={fetchShowtimes} setEditShowtime={setEditShowtime} />
            </div>
        </div>
    );
};

export default ShowtimeForm;

