import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './Components/Navbar';
import SearchByEmployee from './Components/SearchByEmployee';
import SearchByDate from './Components/SearchByDate';
import DailyAttendance from './Components/DailyAttendance';

const App = () => {
  return (
      <Router>
          <Navbar />
          <div className="container">
              <Routes>
              <Route path="/" element={<DailyAttendance />} />
                <Route path="/employee-details" element={<SearchByEmployee/>} />
                <Route path="/date-attendance" element={<SearchByDate />} />
                  
              </Routes>
          </div>
      </Router>
  );
};

export default App;
