// src/App.jsx
import React from 'react';
import './App.css';
import WeatherWidget from './components/WeatherWidget'; // <--- Import the component

function App() {
  return (
    <div className="dashboard-container">
      <h1>My Personal Dashboard</h1>
      <div className="widgets-area">
        {/* Use the WeatherWidget component */}
        <WeatherWidget />

        <div className="widget"> {/* Keep the news placeholder for now */}
          <h2>News Headlines</h2>
          <p>Latest news headlines will go here...</p>
        </div>
      </div>
    </div>
  );
}

export default App;