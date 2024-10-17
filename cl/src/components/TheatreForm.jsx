import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Input, Button, Form, message, Space } from 'antd';

const TheatreForm = ({ theatre, onSave, onCancel }) => {
  const [name, setName] = useState('');
  const [cinema, setCinema] = useState('');
  const [screens, setScreens] = useState([]); // Change to an array for multiple screen IDs
  const [id, setId] = useState(''); // State for ID
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (theatre) {
      setId(theatre._id || ''); // Set ID if editing
      setName(theatre.name || '');
      setCinema(theatre.cinema || '');
      setScreens(theatre.screens || []); // Directly set screens to array
    }
  }, [theatre]);

  const validateForm = () => {
    if (!name || !cinema || screens.length === 0) {
      message.error('Please fill in all fields and add at least one screen ID.');
      return false;
    }
    return true;
  };

  const handleSubmit = async () => {
    if (!validateForm()) return;
    
    const theatreData = {
      name,
      cinema,
      screens, // Use the current state of screen IDs
    };

    try {
      setLoading(true);
      if (theatre && theatre._id) {
        // PUT request for updating an existing theatre
        await axios.put(`http://localhost:5000/api/theatres/${theatre._id}`, theatreData);
        message.success('Theatre updated successfully.');
      } else {
        // POST request for creating a new theatre
        await axios.post('http://localhost:5000/api/theatres', theatreData);
        message.success('Theatre created successfully.');
      }
      onSave(); // Refresh the list after save
    } catch (err) {
      message.error('Failed to save theatre. Please check the input fields.');
    } finally {
      setLoading(false);
    }
  };

  const addScreenField = () => {
    setScreens([...screens, '']); // Add a new empty screen ID
  };

  const handleScreenChange = (index, value) => {
    const newScreens = [...screens];
    newScreens[index] = value; // Update the screen ID at the specific index
    setScreens(newScreens);
  };

  const removeScreenField = (index) => {
    const newScreens = screens.filter((_, i) => i !== index); // Remove screen ID at the index
    setScreens(newScreens);
  };

  return (
    <Form layout="vertical" onFinish={handleSubmit} style={{ maxWidth: 600, margin: '0 auto' }}>
      <Form.Item label="Theatre ID" required>
        <Input value={id} readOnly placeholder="Theatre ID" />
      </Form.Item>
      <Form.Item label="Theatre Name" required>
        <Input
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Enter theatre name"
        />
      </Form.Item>
      <Form.Item label="Cinema ID" required>
        <Input
          value={cinema}
          onChange={(e) => setCinema(e.target.value)}
          placeholder="Enter cinema ID"
        />
      </Form.Item>
      <Form.Item label="Screens">
        {screens.map((screen, index) => (
          <Space key={index} style={{ display: 'flex', alignItems: 'center', marginBottom: '8px' }}>
            <Input
              value={screen}
              onChange={(e) => handleScreenChange(index, e.target.value)}
              placeholder={`Screen ID ${index + 1}`}
              style={{ width: 'calc(100% - 100px)' }} // Adjust width as necessary
            />
            <Button type="link" onClick={() => removeScreenField(index)}>
              Remove
            </Button>
          </Space>
        ))}
        <Button type="dashed" onClick={addScreenField} style={{ width: '100%' }}>
          Add Screen ID
        </Button>
      </Form.Item>
      <Form.Item>
        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
          <Button type="primary" htmlType="submit" loading={loading}>
            {theatre ? 'Update Theatre' : 'Add Theatre'}
          </Button>
          <Button type="default" onClick={onCancel}>
            Cancel
          </Button>
        </div>
      </Form.Item>
    </Form>
  );
};

export default TheatreForm;
