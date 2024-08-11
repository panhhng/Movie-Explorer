import React, { useState, useEffect } from 'react';
import axios from 'axios';

const WatchlistPage = () => {
  const [watchlist, setWatchlist] = useState([]);
  const [error, setError] = useState('');

  const token = localStorage.getItem('token');

  useEffect(() => {
    const fetchWatchlist = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/watchlist', {
          headers: {
            Authorization: token,
          },
        });
        setWatchlist(response.data.watchlist);
      } catch (err) {
        console.error(err);
        setError('Failed to fetch watchlist');
      }
    };

    if (token) {
      fetchWatchlist();
    }
  }, [token]);

  return (
    <div>
      <h2>Your Watchlist</h2>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      {watchlist.length === 0 ? (
        <p>No movies in your watchlist</p>
      ) : (
        <ul>
          {watchlist.map((movieId) => (
            <li key={movieId}>
              {movieId}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default WatchlistPage;