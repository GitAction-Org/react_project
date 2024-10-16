// SportsNews.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';

function SportsNews() {
  const [sportsNews, setSportsNews] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const apiUrl = process.env.REACT_APP_API_URL;
    axios.get(`${apiUrl}/sports`)
      .then(response => {
        console.log(response.data); // Check the response data in console
        if (response.data && Array.isArray(response.data)) {
          setSportsNews(response.data);
        } else {
          setError('No sports news found');
        }
      })
      .catch(error => {
        console.error('Error fetching sports news:', error);
        setError('Error fetching sports news');
      });
  }, []);

  return (
    <div>
      <h2>Sports</h2>
      {error ? (
        <p>{error}</p>
      ) : (
        sportsNews.map((article, index) => (
          <article key={index}>
            <h3>{article.title}</h3>
            <p>{article.content}</p>
          </article>
        ))
      )}
    </div>
  );
}

export default SportsNews;
