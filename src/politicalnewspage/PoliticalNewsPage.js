// PoliticalNewsPage.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';

function PoliticalNewsPage() {
  const [politicalNews, setPoliticalNews] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    
    const apiUrl = process.env.REACT_APP_API_URL

    axios.get(`${apiUrl}/political`)
      .then(response => {
        console.log(response.data); // Check the response data in console
        if (response.data && Array.isArray(response.data)) {
          setPoliticalNews(response.data);
        } else {
          setError('No political news found');
        }
      })
      .catch(error => {
        console.error('Error fetching political news:', error);
        setError('Error fetching political news');
      });
  }, []);

  return (
    <div>
      <h2>Political</h2>
      {error ? (
        <p>{error}</p>
      ) : (
        politicalNews.map((article, index) => (
          <article key={index}>
            <h3>{article.title}</h3>
            <p>{article.content}</p>
          </article>
        ))
      )}
    </div>
  );
}

export default PoliticalNewsPage;
