import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Button, Table, Typography, Space } from 'antd';
import TheatreForm from './TheatreForm';

const TheatreList = () => {
  const [theatres, setTheatres] = useState([]);
  const [editingTheatre, setEditingTheatre] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchTheatres = async () => {
      try {
        const response = await axios.get('https://cinemams.onrender.com/api/theatres');
        setTheatres(response.data);
        setLoading(false);
      } catch (err) {
        setError('Failed to load theatres.');
        setLoading(false);
      }
    };
    fetchTheatres();
  }, []);

  const handleEdit = (theatre) => {
    setEditingTheatre(theatre);
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`https://cinemams.onrender.com/api/theatres/${id}`);
      setTheatres(theatres.filter((theatre) => theatre._id !== id));
    } catch (err) {
      setError('Failed to delete theatre.');
    }
  };

  const handleSave = async () => {
    try {
      const response = await axios.get('https://cinemams.onrender.com/api/theatres');
      setTheatres(response.data);
      setEditingTheatre(null);
    } catch (err) {
      setError('Failed to refresh theatres.');
    }
  };
  const columns = [
    {
      title: 'ID',
      dataIndex: '_id',
      key: '_id',
    },
    {
      title: 'Theatre Name',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'Cinema ID',
      dataIndex: 'cinema',
      key: 'cinemaId',
      render: (cinema) => cinema ? cinema._id : 'N/A',
    },
    {
      title: 'Cinema Name',
      dataIndex: 'cinema',
      key: 'cinemaName',
      render: (cinema) => cinema ? cinema.name : 'N/A',
    },
    {
      title: 'Cinema Location',
      dataIndex: 'cinema',
      key: 'cinemaLocation',
      render: (cinema) => cinema ? cinema.location : 'N/A',
    },
    {
      title: 'Screens',
      dataIndex: 'screens',
      key: 'screens',
      render: (screens) => screens.length > 0 ? screens.map(screen => screen.screenNumber).join(', ') : 'No Screens', // Show screen numbers
    },
    {
      title: 'Actions',
      key: 'actions',
      render: (text, theatre) => (
        <Space size="middle">
          <Button onClick={() => handleEdit(theatre)}>Edit</Button>
          <Button danger onClick={() => handleDelete(theatre._id)}>Delete</Button>
        </Space>
      ),
    },
  ];
  

  return (
    <div style={{ display: 'flex', height: '100vh' }}>
      {/* Theatre Form Section */}
      <div style={{ width: '20%', padding: '1rem', borderRight: '1px solid #eaeaea' }}>
        <Typography.Title level={4} style={{ textAlign: 'center' }}>
          Theatre Form
        </Typography.Title>
        {/* Always visible TheatreForm */}
        <TheatreForm theatre={editingTheatre} onSave={handleSave} onCancel={() => setEditingTheatre(null)} />
      </div>

      {/* Theatre Table Section */}
      <div style={{ width: '80%', padding: '1rem' }}>
        <Typography.Title level={2} style={{ textAlign: 'center' }}>
          Theatres
        </Typography.Title>
        {error && <p style={{ color: 'red' }}>{error}</p>}
        {loading ? (
          <p>Loading...</p>
        ) : (
          <Table
            dataSource={theatres}
            columns={columns}
            rowKey={(theatre) => theatre._id}
            pagination={false}
            style={{ marginTop: '1rem' }}
          />
        )}
      </div>
    </div>
  );
};

export default TheatreList;
