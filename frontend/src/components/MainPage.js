import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const MainPage = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [movies, setMovies] = useState([]);
  const [watchlist, setWatchlist] = useState([]);
  const [error, setError] = useState('');

  const token = localStorage.getItem('token');
  const navigate = useNavigate();

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
      }
    };

    if (token) {
      fetchWatchlist();
    }
  }, [token]);

  const handleSearch = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.get(`https://api.themoviedb.org/3/search/movie`, {
        params: {
          api_key: process.env.REACT_APP_TMDB_API_KEY,
          query: searchTerm,
        },
      });
      setMovies(response.data.results);
    } catch (err) {
      console.error(err);
      setError('Failed to fetch movies');
    }
  };

  const addToWatchlist = async (movieId) => {
    try {
      const response = await axios.post(
        'http://localhost:5000/api/watchlist/add',
        { movieId },
        {
          headers: {
            Authorization: token,
          },
        }
      );
      setWatchlist(response.data.watchlist);
    } catch (err) {
      console.error(err);
    }
  };

  const removeFromWatchlist = async (movieId) => {
    try {
      const response = await axios.post(
        'http://localhost:5000/api/watchlist/remove',
        { movieId },
        {
          headers: {
            Authorization: token,
          },
        }
      );
      setWatchlist(response.data.watchlist);
    } catch (err) {
      console.error(err);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    window.location.href = '/';
  };

  const viewMovieDetails = (id) => {
    navigate(`/movie/${id}`);
  };

  const redirectToWatchlist = () => {
    navigate('/watchlist');
  };

  return (
    <div>
      <header>
        <h2>Main Page</h2>
        <div className="menu-bar">
          <button onClick={redirectToWatchlist}>Watchlist</button>
          <button onClick={handleLogout}>Logout</button>
        </div>
      </header>
      <form onSubmit={handleSearch}>
        <input
          type="text"
          placeholder="Search for a film"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <button type="submit">Search</button>
      </form>
      {error && <p style={{ color: 'red' }}>{error}</p>}

      <h2>Search Results</h2>
      <div className="grid-container">
        {movies.length === 0 && <p>No movies found</p>}
        {movies.map((movie) => (
          <div key={movie.id} className="movie-card">
            <img src={`https://image.tmdb.org/t/p/w200${movie.poster_path}`} alt={movie.title} />
            <h3>{movie.title}</h3>
            <p>Release Date: {movie.release_date}</p>
            <button onClick={() => viewMovieDetails(movie.id)}>View Details</button>
            <button onClick={() => addToWatchlist(movie.id)}>Add to Watchlist</button>
          </div>
        ))}
      </div>


      <h2>Your Watchlist:</h2>
      <ul>
        {watchlist.map((movieId) => (
          <li key={movieId}>
            {movieId}
            <button onClick={() => removeFromWatchlist(movieId)}>Remove</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default MainPage;