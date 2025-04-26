// authService.js
// Utility functions for interacting with the Auth API

// Base URL for API requests
const API_BASE_URL = 'http://localhost:3000/api';

/**
 * Get user profile information
 * @returns {Promise<Object>} - Promise resolving to user profile data
 */
export const getUserProfile = async () => {
  try {
    const token = localStorage.getItem('token');
    const response = await fetch(`${API_BASE_URL}/auth/profile`, {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });
    
    if (!response.ok) {
      throw new Error('Failed to fetch user profile');
    }
    
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching user profile:', error);
    throw error;
  }
};

/**
 * Update user score
 * @param {number} score - The user's score
 * @param {number} pokemonCaught - Number of Pokémon caught
 * @returns {Promise<Object>} - Promise resolving to updated user data
 */
export const updateScore = async (score, pokemonCaught) => {
  try {
    const token = localStorage.getItem('token');
    const response = await fetch(`${API_BASE_URL}/auth/score`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify({ score, pokemonCaught })
    });
    
    if (!response.ok) {
      throw new Error('Failed to update score');
    }
    
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error updating score:', error);
    throw error;
  }
};

/**
 * Get leaderboard (top 10 players)
 * @returns {Promise<Array>} - Promise resolving to leaderboard data
 */
export const getLeaderboard = async () => {
  try {
    const response = await fetch(`${API_BASE_URL}/auth/leaderboard`);
    
    if (!response.ok) {
      throw new Error('Failed to fetch leaderboard');
    }
    
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching leaderboard:', error);
    throw error;
  }
}; 