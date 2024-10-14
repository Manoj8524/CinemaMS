import React from 'react';

import CinemaList from './components/CinemaList';
import TheatreList from './components/TheatreList';
import ScreenList from './components/ScreenList';
import SeatManagement from './components/SeatManagement';
import ShowtimeForm from './components/ShowtimeForm';
import Movies from './Pages/Movies';
const App = () => {
  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Cinema Theatre System</h1>
      <CinemaList />

      <h1 className="text-2xl font-bold mb-4">Cinema Theatre System</h1>
      <TheatreList />

      <h1 className="text-3xl font-bold">Cinema Theatre Management</h1>
      <ScreenList />

      <h1 className="text-center text-3xl font-bold my-5">Cinema Theatre System</h1>
      <SeatManagement />

      <h1 className="text-2xl font-bold mb-4">Cinema Theatre System</h1>
      <ShowtimeForm />

      <h1 className="text-2xl font-bold mb-4">Cinema Theatre System</h1>
      <Movies />
    </div>
    
  );
};

export default App;
