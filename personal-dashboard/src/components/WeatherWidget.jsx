import React, { useState, useEffect } from 'react';
import axios from 'axios'; // Make sure you ran 'npm install axios'
import './WeatherWidget.css'; // We'll create this CSS file next

function WeatherWidget() {
  // State variables
  const [weatherData, setWeatherData] = useState(null); // Holds the fetched weather data
  const [loading, setLoading] = useState(true);       // Tracks if data is being loaded
  const [error, setError] = useState(null);           // Holds any error messages
  const [city] = useState('Kuala Lumpur'); // Default city (can be made dynamic later)

  // Fetch data when component mounts
  useEffect(() => {
    const fetchWeatherData = async () => {
      // Get API key from environment variables
      const apiKey = import.meta.env.VITE_OPENWEATHERMAP_API_KEY;

      // Check if API key is available
      if (!apiKey) {
        setError('Weather API key is missing. Please add it to your .env file.');
        setLoading(false);
        return; // Stop execution if key is missing
      }

      // Construct the API URL
      // Units=metric for Celsius, remove it or use units=imperial for Fahrenheit
      const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

      try {
        setLoading(true); // Start loading
        setError(null);   // Reset previous errors
        const response = await axios.get(apiUrl); // Make the API call
        setWeatherData(response.data);           // Store the successful response data
      } catch (err) {
        // Handle different types of errors
        if (err.response) {
          // The request was made and the server responded with a status code
          // that falls out of the range of 2xx
          console.error("API Error Data:", err.response.data);
          console.error("API Error Status:", err.response.status);
          setError(`Failed to fetch weather: ${err.response.data.message || 'Server error'}`);
        } else if (err.request) {
          // The request was made but no response was received
          console.error("Network Error:", err.request);
          setError('Network error. Could not reach weather service.');
        } else {
          // Something happened in setting up the request that triggered an Error
          console.error('Error', err.message);
          setError(`An error occurred: ${err.message}`);
        }
      } finally {
        setLoading(false); // Stop loading regardless of success or failure
      }
    };

    fetchWeatherData(); // Call the function to fetch data
  }, [city]); // Dependency array: refetch if 'city' changes (though it's static for now)

  // --- Render Logic ---

  // Display loading message
  if (loading) {
    return <div className="widget weather-widget"><h2>Weather</h2><p>Loading weather...</p></div>;
  }

  // Display error message
  if (error) {
    return <div className="widget weather-widget error"><h2>Weather</h2><p>{error}</p></div>;
  }

  // Display weather data if available
  if (!weatherData) {
     // Should not happen if loading is false and no error, but good fallback
    return <div className="widget weather-widget"><h2>Weather</h2><p>No weather data available.</p></div>;
  }

  // Extract relevant data (check OpenWeatherMap API docs for structure)
  const { name } = weatherData;
  const { temp } = weatherData.main;
  const { description, icon } = weatherData.weather[0];
  const iconUrl = `https://openweathermap.org/img/wn/${icon}.png`;

  return (
    <div className="widget weather-widget">
      <h2>Weather in {name}</h2>
      <div className="weather-content">
        <img src={iconUrl} alt={description} className="weather-icon" />
        <div className="weather-details">
          <p className="temperature">{Math.round(temp)}°C</p>
          <p className="description">{description}</p>
        </div>
      </div>
    </div>
  );
}

export default WeatherWidget;