// App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import SportsNews from './sportsnews/SportsNews';
import NewspaperFrontPage from './newspaperfrontpage/NewspaperFrontPage';
import PoliticalNewsPage from './politicalnewspage/PoliticalNewsPage';
import DataStorage from './data_storage/DataStorage';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/home" element={<NewspaperFrontPage />} />
        <Route path="/sports" element={<SportsNews />} />
        <Route path="/political" element={<PoliticalNewsPage />} />
        <Route path="/data-storage" element={<DataStorage />} />
      </Routes>
    </Router>
  );
}

export default App;
