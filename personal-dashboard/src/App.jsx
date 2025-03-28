import React from 'react';
import './App.css'; //Basic layout styling

function App(){
  return(
    <div className = "dashboard-container">
      <h1>My Personal Dashboard</h1>
      <div className='widgets-area'>
        <div className='widget'>
          <h2>Weather</h2>
          <p>Weather information will go here...</p>
        </div>

        <div className='widget'>
          <h2>News Headlines</h2>
          <p>Latest news headlines will go here...</p>
        </div>
      </div>
    </div>
  );
}

export default App;