import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Button, Table, Typography, Space, Spin } from 'antd';
import ScreenForm from './ScreenForm'; // Make sure you have a ScreenForm component

const ScreenList = () => {
  const [screens, setScreens] = useState([]);
  const [editingScreen, setEditingScreen] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchScreens = async () => {
      try {
        const response = await axios.get('https://cinemams.onrender.com/api/screens'); // Update with your API endpoint
        setScreens(response.data);
        setLoading(false);
      } catch (err) {
        setError('Failed to load screens.');
        setLoading(false);
      }
    };
    fetchScreens();
  }, []);

  const handleEdit = (screen) => {
    setEditingScreen(screen);
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`https://cinemams.onrender.com/api/screens/${id}`); // Update with your API endpoint
      setScreens(screens.filter((screen) => screen._id !== id));
    } catch (err) {
      setError('Failed to delete screen.');
    }
  };

  const handleSave = async () => {
    try {
      const response = await axios.get('https://cinemams.onrender.com/api/screens'); // Update with your API endpoint
      setScreens(response.data);
      setEditingScreen(null);
    } catch (err) {
      setError('Failed to refresh screens.');
    }
  };

  const columns = [
    {
      title: 'ID',
      dataIndex: '_id',
      key: '_id',
    },
    {
      title: 'Screen No',
      dataIndex: 'screenNumber',
      key: 'screenNumber',
    },
    {
      title: 'Theatre ID',
      dataIndex: 'theatre',
      key: 'theatreId',
      render: (theatre) => theatre ? theatre._id : 'N/A',
    },
    {
      title: 'Theatre Name',
      dataIndex: 'theatre',
      key: 'theatreName',
      render: (theatre) => theatre ? theatre.name : 'N/A',
    },
    {
      title: 'Movie ID',
      dataIndex: 'movies',
      key: 'movieIds',
      render: (movies) => movies ? movies.map(movie => movie._id).join(', ') : 'N/A',
    },
    {
      title: 'Movie Title',
      dataIndex: 'movies',
      key: 'movieTitles',
      render: (movies) => movies ? movies.map(movie => movie.title).join(', ') : 'N/A',
    },
    {
      title: 'Seats',
      dataIndex: 'seats',
      key: 'seatNumbers',
      render: (seats) => seats ? seats.map(seat => seat.seatNumber).join(', ') : 'N/A',
    },
    {
      title: 'Actions',
      key: 'actions',
      render: (text, screen) => (
        <Space size="middle">
          <Button onClick={() => handleEdit(screen)}>Edit</Button>
          <Button danger onClick={() => handleDelete(screen._id)}>Delete</Button>
        </Space>
      ),
    },
  ];
  

  return (
    <div style={{ display: 'flex', height: '100vh' }}>
      {/* Screen Form Section */}
      <div style={{ width: '20%', padding: '1rem', borderRight: '1px solid #eaeaea' }}>
        <Typography.Title level={4} style={{ textAlign: 'center' }}>
          Screen Form
        </Typography.Title>
        {/* Always visible ScreenForm */}
        <ScreenForm screen={editingScreen} onSave={handleSave} onCancel={() => setEditingScreen(null)} />
      </div>

      {/* Screen Table Section */}
      <div style={{ width: '80%', padding: '1rem' }}>
        <Typography.Title level={2} style={{ textAlign: 'center' }}>
          Screens
        </Typography.Title>
        {error && <p style={{ color: 'red' }}>{error}</p>}
        {loading ? (
          <Spin tip="Loading..." />
        ) : (
          <Table
            dataSource={screens}
            columns={columns}
            rowKey={(screen) => screen._id}
            pagination={false}
            style={{ marginTop: '1rem' }}
          />
        )}
      </div>
    </div>
  );
};

export default ScreenList;
