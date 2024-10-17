import React, { useState, useEffect } from 'react';
import { Table, Button } from 'antd';
import { useNavigate } from 'react-router-dom';
import MovieForm from './MovieForm';

const MovieList = () => {
  const [movies, setMovies] = useState([]);
  const [selectedMovie, setSelectedMovie] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchMovies = async () => {
      const response = await fetch('https://cinemams.onrender.com/api/movies');
      const data = await response.json();
      setMovies(data);
    };
    fetchMovies();
  }, []);

  const handleDeleteMovie = async (id) => {
    const response = await fetch(`https://cinemams.onrender.com/api/movies/${id}`, {
      method: 'DELETE',
    });

    if (response.ok) {
      setMovies((prevMovies) => prevMovies.filter((movie) => movie._id !== id));
    }
  };

  const handleEditMovie = (movie) => {
    setSelectedMovie(movie);
  };

  const columns = [
    {
      title: 'ID',
      dataIndex: '_id',
      key: '_id',
    },
    {
      title: 'Title',
      dataIndex: 'title',
      key: 'title',
    },
    {
      title: 'Genre',
      dataIndex: 'genre',
      key: 'genre',
    },
    {
      title: 'Duration (min)',
      dataIndex: 'duration',
      key: 'duration',
    },
    {
      title: 'Screen IDs',
      key: 'screenIds',
      render: (text, record) => record.runningAt.map(screen => screen._id).join(', '),
    },
    {
      title: 'Screen Numbers',
      key: 'screenNumbers',
      render: (text, record) => record.runningAt.map(screen => screen.screenNumber).join(', '),
    },
    {
      title: 'Theatre Name',
      key: 'theatreName',
      render: (text, record) => record.runningAt.map(screen => screen.theatre.name).join(', '),
    },
    {
      title: 'Actions',
      key: 'actions',
      render: (text, record) => (
        <span>
          <Button onClick={() => handleEditMovie(record)}>Edit</Button>
          <Button
            onClick={() => handleDeleteMovie(record._id)}
            style={{ marginLeft: 8 }}
            danger
          >
            Delete
          </Button>
        </span>
      ),
    },
  ];

  return (
    <div style={{ display: 'flex' }}>
      <div style={{ width: '20%', padding: '20px', borderRight: '1px solid #ddd' }}>
        <MovieForm selectedMovie={selectedMovie} setSelectedMovie={setSelectedMovie} />
      </div>
      <div style={{ width: '80%', padding: '20px' }}>
        <Table
          dataSource={movies}
          columns={columns}
          rowKey="_id"
          pagination={false}
          style={{ marginTop: 20 }}
        />
      </div>
    </div>
  );
};

export default MovieList;
