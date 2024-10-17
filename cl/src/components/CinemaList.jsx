import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {
  Table,
  Typography,
  Button,
  notification,
  Spin,
} from 'antd';
import CinemaForm from './CinemaForm'; // Import CinemaForm

const API_URL = 'http://localhost:5000/api/cinemas';

const CinemaList = () => {
  const [cinemas, setCinemas] = useState([]);
  const [editingCinema, setEditingCinema] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCinemas = async () => {
      setLoading(true);
      try {
        const response = await axios.get(API_URL);
        setCinemas(response.data);
      } catch (err) {
        notification.error({
          message: 'Error',
          description: 'Failed to fetch cinemas',
        });
      } finally {
        setLoading(false);
      }
    };
    fetchCinemas();
  }, []);

  const handleDelete = async (id) => {
    try {
      await axios.delete(`${API_URL}/${id}`);
      setCinemas(cinemas.filter(cinema => cinema._id !== id));
      notification.success({
        message: 'Success',
        description: 'Cinema deleted successfully!',
      });
    } catch (error) {
      notification.error({
        message: 'Error',
        description: 'Failed to delete cinema.',
      });
    }
  };

  const handleEdit = (cinema) => {
    setEditingCinema(cinema);
  };

  const handleFormSubmit = () => {
    setEditingCinema(null);
    // Refresh the cinema list
    const fetchCinemas = async () => {
      const response = await axios.get(API_URL);
      setCinemas(response.data);
    };
    fetchCinemas();
    notification.success({
      message: 'Success',
      description: 'Cinema saved successfully!',
    });
  };

  const containerStyle = {
    display: 'flex',
    padding: '20px',
    alignItems: 'flex-start', // Align items to the top of the container
  };

  const formStyle = {
    flex: '0 0 20%', // 10% width for the form
    marginRight: '20px',
  };

  const tableStyle = {
    flex: '0 0 80%', // 80% width for the table
  };

  return (
    <div style={containerStyle}>
      {/* Left side - Cinema Form */}
      <div style={formStyle}>
        <Typography.Title level={3}>Cinema Management</Typography.Title>
        <CinemaForm
          cinema={editingCinema}
          onSubmit={handleFormSubmit}
          onClose={() => setEditingCinema(null)}
        />
      </div>

      {/* Right side - Table */}
      <div style={tableStyle}>
        {loading ? (
          <Spin tip="Loading..." />
        ) : (
          <Table dataSource={cinemas} rowKey="_id" style={{ width: '100%' }}>
            <Table.Column title="Multiple complex ID" dataIndex="_id" />
            <Table.Column title="Multiple complex Name" dataIndex="name" />
            <Table.Column title="Location" dataIndex="location" />
            <Table.Column
              title="Theatre Names"
              render={(text, cinema) =>
                cinema.theatres.map(theatre => theatre.name).join(', ')
              }
            />
            <Table.Column
              title="Theatre IDs"
              render={(text, cinema) =>
                cinema.theatres.map(theatre => theatre._id).join(', ')
              }
            />
            <Table.Column
              title="Actions"
              render={(text, cinema) => (
                <>
                  <Button
                    type="primary"
                    onClick={() => handleEdit(cinema)}
                    style={{ marginRight: '8px' }}
                  >
                    Edit
                  </Button>
                  <Button
                    type="danger"
                    onClick={() => handleDelete(cinema._id)}
                  >
                    Delete
                  </Button>
                </>
              )}
            />
          </Table>
        )}
      </div>
    </div>
  );
};

export default CinemaList;
