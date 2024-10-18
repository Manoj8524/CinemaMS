// src/components/MovieForm.js
import React, { useState, useEffect } from 'react';
import { Form, Input, Button, Space } from 'antd';
import { useNavigate } from 'react-router-dom';

const MovieForm = ({ selectedMovie, setSelectedMovie }) => {
  const [form] = Form.useForm();
  const [screenIds, setScreenIds] = useState(['']); 
  const navigate = useNavigate();

  useEffect(() => {
    if (selectedMovie) {
      form.setFieldsValue(selectedMovie);
      setScreenIds(selectedMovie.runningAt || ['']); 
    } else {
      form.resetFields();
      setScreenIds(['']); 
    }
  }, [selectedMovie, form]);

  const handleSubmit = async () => {
    try {
      const values = await form.validateFields();
     
      values.runningAt = screenIds.filter(id => id); 

      if (selectedMovie) {
       
        await fetch(`https://cinemams.onrender.com/api/movies/${selectedMovie._id}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(values),
        });
      } else {
       
        await fetch('https://cinemams.onrender.com/api/movies', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(values),
        });
      }
      
      setSelectedMovie(null);
      navigate('/'); 
    } catch (error) {
      console.error('Validation Failed:', error);
    }
  };

  const addScreenIdField = () => {
    setScreenIds([...screenIds, '']);
  };

  const handleScreenIdChange = (value, index) => {
    const newScreenIds = [...screenIds];
    newScreenIds[index] = value; 
    setScreenIds(newScreenIds);
  };

  const removeScreenIdField = (index) => {
    const newScreenIds = screenIds.filter((_, i) => i !== index); 
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
