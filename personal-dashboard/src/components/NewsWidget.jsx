import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './NewsWidget.css'; // We'll create this CSS file next

function NewsWidget() {
  const [articles, setArticles] = useState([]); // Holds the news articles
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [country] = useState('my'); // 'my' for Malaysia, 'us' for USA etc.

  useEffect(() => {
    const fetchNews = async () => {
      const apiKey = import.meta.env.VITE_NEWSAPI_API_KEY;

      if (!apiKey) {
        setError('News API key is missing. Please add it to your .env file.');
        setLoading(false);
        return;
      }

      // NewsAPI endpoint for top headlines in a specific country
      const apiUrl = `https://newsapi.org/v2/top-headlines?country=${country}&apiKey=${apiKey}&pageSize=5`; // Fetch top 5 headlines

      try {
        setLoading(true);
        setError(null);
        const response = await axios.get(apiUrl);

        // Check if response structure is as expected
        if (response.data && response.data.articles) {
          setArticles(response.data.articles);
        } else {
          // Handle unexpected response structure
          console.error("Unexpected API response structure:", response.data);
          setArticles([]); // Set empty array if structure is wrong
          setError('Received unexpected data structure from News API.');
        }

      } catch (err) {
        // Handle errors similarly to the Weather widget
        if (err.response) {
          console.error("API Error Data:", err.response.data);
          console.error("API Error Status:", err.response.status);
           // NewsAPI often puts specific error messages in err.response.data.message
          setError(`Failed to fetch news: ${err.response.data.message || 'Server error'}`);
        } else if (err.request) {
          console.error("Network Error:", err.request);
          setError('Network error. Could not reach news service.');
        } else {
          console.error('Error', err.message);
          setError(`An error occurred: ${err.message}`);
        }
        setArticles([]); // Ensure articles is empty on error
      } finally {
        setLoading(false);
      }
    };

    fetchNews();
  }, [country]); // Refetch if country changes

  // --- Render Logic ---

  if (loading) {
    return <div className="widget news-widget"><h2>Top Headlines</h2><p>Loading news...</p></div>;
  }

  if (error) {
    return <div className="widget news-widget error"><h2>Top Headlines</h2><p>{error}</p></div>;
  }

  // Handle case where articles might be empty even without an error
  if (!articles || articles.length === 0) {
    return <div className="widget news-widget"><h2>Top Headlines</h2><p>No news articles found.</p></div>;
  }

  return (
    <div className="widget news-widget">
      <h2>Top Headlines ({country.toUpperCase()})</h2>
      <ul className="news-list">
        {articles.map((article, index) => (
          <li key={article.url || index} className="news-item"> {/* Use URL as key if available */}
            <a href={article.url} target="_blank" rel="noopener noreferrer" className="news-link">
              {article.title}
            </a>
            <span className="news-source">{article.source?.name}</span> {/* Optional chaining for safety */}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default NewsWidget;