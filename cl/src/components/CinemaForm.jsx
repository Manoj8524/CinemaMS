import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Form, Input, Button, notification, Space } from 'antd';

const API_URL = 'https://cinemams.onrender.com/api/cinemas';

const CinemaForm = ({ cinema, onSubmit, onClose }) => {
  const [form] = Form.useForm();
  const [theatres, setTheatres] = useState([]); 

  useEffect(() => {
    if (cinema) {
      form.setFieldsValue({
        name: cinema.name,
        location: cinema.location,
      });
      setTheatres(cinema.theatres); 
    } else {
      form.resetFields(); 
      setTheatres([]);
    }
  }, [cinema, form]);

  const handleSubmit = async (values) => {

    if (theatres.some((id) => !id)) {
      notification.error({
        message: 'Validation Error',
        description: 'Theatre IDs cannot be empty',
      });
      return;
    }

    const newCinema = {
      name: values.name,
      location: values.location,
      theatres: theatres, 
    };

    try {
      if (cinema) {
        await axios.put(`${API_URL}/${cinema._id}`, newCinema);
      } else {
        await axios.post(API_URL, newCinema);
      }
      notification.success({
        message: 'Success',
        description: 'Cinema saved successfully!',
      });
      form.resetFields(); 
      setTheatres([]); 
      onSubmit();
      onClose(); 
    } catch (err) {
      notification.error({
        message: 'Save Error',
        description: 'Failed to save cinema. Please check your input and try again.',
      });
    }
  };

  const addTheatreField = () => {
    setTheatres([...theatres, '']); 
  };

  const handleTheatreChange = (index, value) => {
    const newTheatres = [...theatres];
    newTheatres[index] = value; 
    setTheatres(newTheatres);
  };


  const formContainerStyle = {
    display: 'flex', 
    justifyContent: 'center',
    alignItems: 'center',
    height: '45vh',
    padding: 0, 
    margin: 0, 
  };

  return (
    <div style={formContainerStyle}>
      <Form form={form} layout="vertical" onFinish={handleSubmit} style={{ width: '100%', maxWidth: '600px', margin: '0' }}>
        {cinema && (
          <Form.Item label="Cinema ID">
            <Input disabled value={cinema._id} />
          </Form.Item>
        )}
        <Form.Item
          label="Cinema Name"
          name="name"
          rules={[{ required: true, message: 'Please input the cinema name!' }]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Location"
          name="location"
          rules={[{ required: true, message: 'Please input the location!' }]}
        >
          <Input />
        </Form.Item>

        <Form.Item label="Theatres">
          {theatres.map((theatre, index) => (
            <Space key={index} style={{ display: 'flex', alignItems: 'center', marginBottom: '8px' }}>
              <Input
                value={theatre}
                onChange={(e) => handleTheatreChange(index, e.target.value)}
                placeholder={`Theatre ID ${index + 1}`}
                style={{ width: 'calc(100% - 100px)' }} 
              />
              <Button type="link" onClick={() => setTheatres(theatres.filter((_, i) => i !== index))}>
                Remove
              </Button>
            </Space>
          ))}
          <Button type="dashed" onClick={addTheatreField} style={{ width: '100%' }}>
            Add Theatre ID
          </Button>
        </Form.Item>

        <Form.Item>
          <Button type="primary" htmlType="submit">
            {cinema ? 'Update Cinema' : 'Add Cinema'}
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default CinemaForm;
