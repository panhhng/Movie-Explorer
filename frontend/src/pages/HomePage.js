import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const HomePage = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [movies, setMovies] = useState([]);
  const [recentMovies, setRecentMovies] = useState([]);
  const [trendingMovies, setTrendingMovies] = useState([]);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const loadMovies = async () => {
      try {
        // Fetch trending movies
        const trendingResponse = await axios.get(`https://api.themoviedb.org/3/trending/movie/week`, {
          params: {
            api_key: process.env.REACT_APP_TMDB_API_KEY,
          },
        });
        setTrendingMovies(trendingResponse.data.results);

        // Fetch recent movies (e.g., from the past month or year)
        const currentDate = new Date();
        const thirtyDaysAgo = new Date();
        thirtyDaysAgo.setDate(currentDate.getDate() - 30);

        const formatDate = (date) => {
          return date.toISOString().split('T')[0];
        };

        const recentResponse = await axios.get(
          `https://api.themoviedb.org/3/discover/movie`,
          {
            params: {
              api_key: process.env.REACT_APP_TMDB_API_KEY,
              sort_by: 'release_date.desc',
              'release_date.lte': formatDate(currentDate), // Current date
              'release_date.gte': formatDate(thirtyDaysAgo), // 30 days ago
            },
          }
        );
        setRecentMovies(recentResponse.data.results);
      } catch (err) {
        console.error(err);
        setError('Failed to fetch movies');
      }
    };
    loadMovies();
  }, []);

  const handleSearch = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.get(`https://api.themoviedb.org/3/search/movie`, {
        params: {
          api_key: process.env.REACT_APP_TMDB_API_KEY,
          query: searchQuery,
        },
      });
      setMovies(response.data.results);
    } catch (err) {
      console.error(err);
      setError('Failed to fetch movies');
    }
  };

  const viewMovieDetails = (id) => {
    navigate(`/movie/${id}`);
  };

  const redirectToLogin = () => {
    navigate('/login');
  };

  return (
    <div>
      <header>
        <h1>Movie Explorer</h1>
        <div className="menu-bar">
          <div>Login to unlock your watchlist
            <button onClick={redirectToLogin}>Login</button>
          </div>
        </div>
      </header>
      <form onSubmit={handleSearch}>
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Search for movies..."
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
          </div>
        ))}
      </div>

      <h2>Recent Movies</h2>
      <div className="grid-container">
        {recentMovies.length === 0 && <p>No recent movies found</p>}
        {recentMovies.map((movie) => (
          <div key={movie.id} className="movie-card">
            <img src={`https://image.tmdb.org/t/p/w200${movie.poster_path}`} alt={movie.title} />
            <h3>{movie.title}</h3>
            <p>Release Date: {movie.release_date}</p>
            <button onClick={() => viewMovieDetails(movie.id)}>View Details</button>
          </div>
        ))}
      </div>

      <h2>Trending Movies</h2>
      <div className="grid-container">
        {trendingMovies.map((movie) => (
          <div key={movie.id} className="movie-card">
            <img src={`https://image.tmdb.org/t/p/w200${movie.poster_path}`} alt={movie.title} />
            <h3>{movie.title}</h3>
            <p>Release Date: {movie.release_date}</p>
            <button onClick={() => viewMovieDetails(movie.id)}>View Details</button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default HomePage;
