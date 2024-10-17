import React from "react";
import axios from "axios";
import { Table, Button } from "antd";

const ShowtimeList = ({ showtimes, fetchShowtimes, setEditShowtime }) => {
    // Handle delete operation
    const handleDelete = async (id) => {
        try {
            await axios.delete(`https://cinemams.onrender.com/api/showtimes/${id}`);
            fetchShowtimes(); // Refresh showtime list after delete
        } catch (error) {
            console.error("Error deleting showtime:", error);
        }
    };

    // Define table columns
    const columns = [
        {
            title: 'ID',
            dataIndex: '_id',
            key: '_id',
        },
        {
            title: 'Movie Title',
            dataIndex: ['movie', 'title'],
            key: 'movieTitle',
            render: (text) => text || 'N/A',
        },
        {
            title: 'Screen Number',
            dataIndex: ['screen', 'screenNumber'],
            key: 'screenNumber',
            render: (text) => text || 'N/A',
        },
        {
            title: 'First Show',
            dataIndex: 'firstShow',
            key: 'firstShow',
        },
        {
            title: 'Second Show',
            dataIndex: 'secondShow',
            key: 'secondShow',
        },
        {
            title: 'Third Show',
            dataIndex: 'thirdShow',
            key: 'thirdShow',
        },
        {
            title: 'Fourth Show',
            dataIndex: 'fourthShow',
            key: 'fourthShow',
        },
        {
            title: 'Date',
            dataIndex: 'date',
            key: 'date',
            render: (text) => new Date(text).toLocaleDateString(),
        },
        {
            title: 'Actions',
            key: 'actions',
            render: (text, record) => (
                <span>
                    <Button
                        type="primary"
                        onClick={() => setEditShowtime(record)}
                        style={{ marginRight: 8 }}
                    >
                        Edit
                    </Button>
                    <Button type="danger" onClick={() => handleDelete(record._id)}>
                        Delete
                    </Button>
                </span>
            ),
        },
    ];

    return (
        <div className="mt-5">
        <h2 className="text-2xl font-semibold mb-4 text-center">Showtime List</h2>
        <Table
            columns={columns}
            dataSource={showtimes}
            rowKey="_id"
            pagination={{ pageSize: 5 }}
        />
    </div>
    
    );
};

export default ShowtimeList;
