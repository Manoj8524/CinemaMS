// src/components/MovieForm.js
import React, { useState, useEffect } from 'react';
import { Form, Input, Button, Space } from 'antd';
import { useNavigate } from 'react-router-dom';

const MovieForm = ({ selectedMovie, setSelectedMovie }) => {
  const [form] = Form.useForm();
  const [screenIds, setScreenIds] = useState(['']); // Initial state for screen IDs
  const navigate = useNavigate();

  useEffect(() => {
    if (selectedMovie) {
      form.setFieldsValue(selectedMovie);
      setScreenIds(selectedMovie.runningAt || ['']); // Set the screen IDs from selected movie
    } else {
      form.resetFields();
      setScreenIds(['']); // Reset the screen IDs for adding a new movie
    }
  }, [selectedMovie, form]);

  const handleSubmit = async () => {
    try {
      const values = await form.validateFields();
      // Add screen IDs to the form values
      values.runningAt = screenIds.filter(id => id); // Filter out any empty IDs

      if (selectedMovie) {
        // Update existing movie
        await fetch(`https://cinemams.onrender.com/api/movies/${selectedMovie._id}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(values),
        });
      } else {
        // Create new movie
        await fetch('https://cinemams.onrender.com/api/movies', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(values),
        });
      }
      // Reset selected movie after submission
      setSelectedMovie(null);
      navigate('/'); // Optionally navigate after submission
    } catch (error) {
      console.error('Validation Failed:', error);
    }
  };

  const addScreenIdField = () => {
    setScreenIds([...screenIds, '']); // Add a new empty field for screen ID
  };

  const handleScreenIdChange = (value, index) => {
    const newScreenIds = [...screenIds];
    newScreenIds[index] = value; // Update the specific screen ID
    setScreenIds(newScreenIds);
  };

  const removeScreenIdField = (index) => {
    const newScreenIds = screenIds.filter((_, i) => i !== index); // Remove the specified index
    setScreenIds(newScreenIds);
  };

  return (
    <Form form={form} layout="vertical" onFinish={handleSubmit}>
      <Form.Item
        label="Movie Title"
        name="title"
        rules={[{ required: true, message: 'Please input the movie title!' }]}
      >
        <Input placeholder="Enter movie title" />
      </Form.Item>
      <Form.Item
        label="Genre"
        name="genre"
        rules={[{ required: true, message: 'Please input the genre!' }]}
      >
        <Input placeholder="Enter genre" />
      </Form.Item>
      <Form.Item
        label="Duration (min)"
        name="duration"
        rules={[{ required: true, message: 'Please input the duration!' }]}
      >
        <Input type="number" placeholder="Enter duration in minutes" />
      </Form.Item>

      <Form.Item label="Running At (Screen IDs)">
        {screenIds.map((id, index) => (
          <Space key={index} style={{ display: 'flex', marginBottom: 8 }} align="baseline">
            <Input
              placeholder={`Enter screen ID ${index + 1}`}
              value={id}
              onChange={(e) => handleScreenIdChange(e.target.value, index)}
            />
            <Button type="link" onClick={() => removeScreenIdField(index)}>
              Remove
            </Button>
          </Space>
        ))}
        <Button type="dashed" onClick={addScreenIdField} style={{ width: '100%' }}>
          Add Screen ID
        </Button>
      </Form.Item>

      <Form.Item>
        <Button type="primary" htmlType="submit">
          {selectedMovie ? 'Update Movie' : 'Add Movie'}
        </Button>
      </Form.Item>
    </Form>
  );
};

export default MovieForm;
