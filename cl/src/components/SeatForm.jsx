import React, { useEffect, useState } from 'react';
import { Button, Input, Typography, Row, Col, message } from 'antd';
import axios from 'axios';

const SeatForm = ({ seat, onClose }) => {  // Accept seat and onClose as props
  const [screenId, setScreenId] = useState(seat ? seat.screen : ''); // Populate screenId if seat exists
  const [theatreId, setTheatreId] = useState(seat ? seat.theatre : ''); // Populate theatreId if seat exists
  const [section, setSection] = useState(seat ? seat.seatNumber.split(':')[0] : 'A'); // Extract section if seat exists
  const [totalSeats, setTotalSeats] = useState(seat ? 1 : 10); // Default to 1 for editing

  const generateSeatNumbers = () => {
    let seatNumbers = [];
    for (let i = 1; i <= totalSeats; i++) {
      seatNumbers.push(`${section}:${i}`);
    }
    return seatNumbers;
  };

  const addOrUpdateSeats = async () => {
    const seatNumbers = generateSeatNumbers();
    try {
      if (seat) {
        // Update the existing seat
        await axios.put(`https://cinemams.onrender.com/api/seats/${seat._id}`, {
          seatNumber: seatNumbers[0], // For simplicity, assuming we're updating one seat
          screen: screenId,
          theatre: theatreId,
        });
      } else {
        // Create new seats
        for (const seatNumber of seatNumbers) {
          await axios.post('https://cinemams.onrender.com/api/seats', {
            seatNumber,
            screen: screenId,
            theatre: theatreId,
          });
        }
      }
      message.success(seat ? 'Seat updated successfully!' : 'Seats added successfully!'); // Show success message
    } catch (error) {
      message.error('Error while adding/updating seats'); // Handle error
    } finally {
      // Reset form fields after submission
      setScreenId('');
      setTheatreId('');
      setSection('A');
      setTotalSeats(10);
      if (onClose) onClose(); // Close the form if onClose function is provided
    }
  };

  useEffect(() => {
    if (seat) {
      setScreenId(seat.screen); // Populate form with seat data when editing
      setTheatreId(seat.theatre);
      setSection(seat.seatNumber.split(':')[0]);
      setTotalSeats(1); // Set to 1 if editing, assuming only one seat is edited
    }
  }, [seat]);

  return (
    <div style={{ width: '100%', margin: 'auto', padding: '20px', background: '#fff', borderRadius: '5px', boxShadow: '0 0 10px rgba(0,0,0,0.1)' }}>
      <Typography.Title level={4} style={{ textAlign: 'center' }}>Manage Seats</Typography.Title>
      <Row gutter={16}>
        <Col span={24}>
          <Input placeholder="Screen ID" value={screenId} onChange={(e) => setScreenId(e.target.value)} style={{ marginBottom: '16px' }} />
        </Col>
        <Col span={24}>
          <Input placeholder="Theatre ID" value={theatreId} onChange={(e) => setTheatreId(e.target.value)} style={{ marginBottom: '16px' }} />
        </Col>
        <Col span={12}>
          <Input placeholder="Section (e.g. A)" value={section} onChange={(e) => setSection(e.target.value)} style={{ marginBottom: '16px' }} />
        </Col>
        <Col span={12}>
          <Input placeholder="Total Seats" type="number" value={totalSeats} onChange={(e) => setTotalSeats(Number(e.target.value))} style={{ marginBottom: '16px' }} />
        </Col>
        <Col span={24}>
          <Button type="primary" block onClick={addOrUpdateSeats}>{seat ? 'Update Seat' : 'Add Seats'}</Button> {/* Conditional button text */}
        </Col>
      </Row>
    </div>
  );
};

export default SeatForm;
