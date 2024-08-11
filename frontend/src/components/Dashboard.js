// src/components/Dashboard.js

import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const Dashboard = () => {
  const [watchlist, setWatchlist] = useState([]);
  const [newItem, setNewItem] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchWatchlist = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/watchlist', {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        });
        setWatchlist(response.data);
      } catch (error) {
        console.error('Error fetching watchlist:', error);
      }
    };

    fetchWatchlist();
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/login');
  };

  const addItem = async () => {
    try {
      const response = await axios.post(
        'http://localhost:5000/api/watchlist',
        { movieId: newItem },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        }
      );
      setWatchlist(response.data);
      setNewItem('');
    } catch (error) {
      console.error('Error adding item to watchlist:', error);
    }
  };

  const removeItem = async (item) => {
    try {
      const response = await axios.delete('http://localhost:5000/api/watchlist', {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
        data: { movieId: item },
      });
      setWatchlist(response.data);
    } catch (error) {
      console.error('Error removing item from watchlist:', error);
    }
  };

  return (
    <div>
      <h2>Dashboard</h2>
      <p>Welcome to the dashboard!</p>
      <button onClick={handleLogout}>Logout</button>

      <h3>Your Watchlist</h3>
      <ul>
        {watchlist.map((item, index) => (
          <li key={index}>
            {item} <button onClick={() => removeItem(item)}>Remove</button>
          </li>
        ))}
      </ul>

      <div>
        <input
          type="text"
          value={newItem}
          onChange={(e) => setNewItem(e.target.value)}
          placeholder="Add a new item"
        />
        <button onClick={addItem}>Add</button>
      </div>
    </div>
  );
};

export default Dashboard;
