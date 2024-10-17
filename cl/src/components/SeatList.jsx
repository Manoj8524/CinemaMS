import React, { useEffect, useState } from 'react';
import { Table, Button, Space } from 'antd';
import axios from 'axios';
import SeatForm from './SeatForm';

const SeatList = () => {
  const [seats, setSeats] = useState([]);
  const [editingSeat, setEditingSeat] = useState(null); // State for the seat being edited

  useEffect(() => {
    fetchSeats();
  }, []);

  const fetchSeats = async () => {
    const response = await axios.get('http://localhost:5000/api/seats');
    setSeats(response.data);
  };

  const deleteSeat = async (id) => {
    await axios.delete(`http://localhost:5000/api/seats/${id}`);
    setSeats((prevSeats) => prevSeats.filter((seat) => seat._id !== id));
  };

  const editSeat = (record) => {
    setEditingSeat(record); // Set the seat to be edited
  };

  const columns = [
    {
      title: 'Seat ID',
      dataIndex: '_id',
      key: '_id',
    },
    {
      title: 'Seat Number',
      dataIndex: 'seatNumber',
      key: 'seatNumber',
    },
    {
      title: 'Screen ID',
      dataIndex: 'screen',
      key: 'screen',
      render: (text, record) => record.screen._id,
    },
    {
      title: 'Screen Number', // New column for Screen Number
      dataIndex: 'screen',
      key: 'screenNumber',
      render: (text, record) => record.screen.screenNumber,
    },
    {
      title: 'Theatre ID',
      dataIndex: 'theatre',
      key: 'theatre',
      render: (text, record) => record.theatre._id,
    },
    {
      title: 'Theatre Name',
      dataIndex: 'theatre',
      key: 'theatreName',
      render: (text, record) => record.theatre.name,
    },
    {
      title: 'Action',
      key: 'action',
      render: (text, record) => (
        <Space size="middle">
          <Button type="primary" onClick={() => editSeat(record)}>Edit</Button>
          <Button type="primary" danger onClick={() => deleteSeat(record._id)}>Delete</Button>
        </Space>
      ),
    },
  ];

  return (
    <div style={{ display: 'flex', width: '100%', margin: 'auto', padding: '20px' }}>
      <div style={{ width: '20%', marginRight: '20px' }}>
        <SeatForm seat={editingSeat} onClose={() => setEditingSeat(null)} /> {/* Pass seat data to SeatForm */}
      </div>
      <div style={{ width: '80%' }}>
        <Table columns={columns} dataSource={seats} rowKey="_id" pagination={false} />
      </div>
    </div>
  );
};

export default SeatList;
