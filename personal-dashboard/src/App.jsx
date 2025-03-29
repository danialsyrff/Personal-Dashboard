// src/App.jsx
import React from 'react';
import './App.css';
import WeatherWidget from './components/WeatherWidget';
import NewsWidget from './components/NewsWidget'; // <--- Import the NewsWidget

function App() {
  return (
    <div className="dashboard-container">
      <h1>My Personal Dashboard</h1>
      <div className="widgets-area">
        <WeatherWidget />
        <NewsWidget /> {/* <--- Use the NewsWidget component */}
      </div>
    </div>
  );
}

export default App;