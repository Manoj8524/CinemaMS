import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar';
// import Sidebar from './components/Sidebar';
import CinemaList from './components/CinemaList';
import TheatreList from './components/TheatreList';
import ScreenList from './components/ScreenList';
import SeatManagement from './components/SeatList';
import ShowtimeForm from './components/ShowtimeForm';
import Movies from './components/MovieList';

const App = () => {
  return (
    <Router>
      <div className="flex">
        {/* <Sidebar /> */}
        <div className="flex-1">
           <Navbar /> 
          <div className="container mx-auto p-4">
            <Routes>
              <Route path="/" element={<CinemaList />} />
              <Route path="/theatres" element={<TheatreList />} />
              <Route path="/screens" element={<ScreenList />} />
              <Route path="/seats" element={<SeatManagement />} />
              <Route path="/showtime" element={<ShowtimeForm />} />
              <Route path="/movies" element={<Movies />} />
            </Routes>
          </div>
        </div>
      </div>
    </Router>
  );
};

export default App;
