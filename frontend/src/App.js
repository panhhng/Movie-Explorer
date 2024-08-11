import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import MovieDetailsPage from './pages/MovieDetailsPage';
import Register from './components/Register';
import Login from './components/Login';
import MainPage from './components/MainPage';
import WatchlistPage from './pages/WatchlistPage';
import './App.css';

const App = () => {
  return (
    <Router>
      <div>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/movie/:id" element={<MovieDetailsPage />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/main" element={<MainPage />} />
          <Route path="/watchlist" element={<WatchlistPage />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
