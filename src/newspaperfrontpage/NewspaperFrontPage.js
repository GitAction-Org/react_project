import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

function NewspaperFrontPage() {
  const [articles, setArticles] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const apiUrl = process.env.REACT_APP_API_URL;
    axios.get(`${apiUrl}/home`)
      .then(response => {
        if (response.data) {
          setArticles(response.data);
        } else {
          setError('No articles found');
        }
      })
      .catch(error => {
        console.error('Error fetching articles:', error);
        setError('Error fetching articles');
      });
  }, []);

  return (
    <div className="newspaper-front-page">
      <header>
        <h1>......</h1>
        <nav>
          <ul>
            <li><Link to="/home">Home</Link></li>
            <li><Link to="/sports">Sports</Link></li>
            <li><Link to="/political">Political</Link></li>
            <li><Link to="/data-storage">Data Storage</Link></li>
          </ul>
        </nav>
      </header>
      <main>
        <section className="background-image">
          {/* Background image here */}
        </section>
        <section className="top-stories">
          <h2>Top Stories</h2>
          {error ? (
            <p>{error}</p>
          ) : (
            articles.map((article, index) => (
              <article key={index}>
                <h3>{article.title}</h3>
                <p>{article.content}</p>
              </article>
            ))
          )}
        </section>
        <section className="featured-article">
          <h2>Featured Article</h2>
          {/* Featured article goes here */}
        </section>
        <section className="side-bar">
          <h2>Popular News</h2>
          {/* Popular news articles go here */}
        </section>
      </main>
      <footer>
        <p>&copy; 2024 My Newspaper. All rights reserved.</p>
      </footer>
    </div>
  );
}

export default NewspaperFrontPage;
