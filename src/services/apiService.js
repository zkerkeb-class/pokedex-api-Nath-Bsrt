// apiService.js
// Utility functions for interacting with the Pokémon API

// Base URL for API requests
const API_BASE_URL = 'http://localhost:3000/api';

/**
 * Fetch all Pokémon from the API
 * @returns {Promise<Array>} - Promise resolving to an array of Pokémon
 */
export const getAllPokemon = async () => {
  try {
    const response = await fetch(`${API_BASE_URL}/pokemons`);
    if (!response.ok) {
      throw new Error('Failed to fetch Pokémon');
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching all Pokémon:', error);
    throw error;
  }
};

/**
 * Fetch a single Pokémon by its ID
 * @param {number} id - The ID of the Pokémon to fetch
 * @returns {Promise<Object>} - Promise resolving to a Pokémon object
 */
export const getPokemonById = async (id) => {
  try {
    const response = await fetch(`${API_BASE_URL}/pokemons/${id}`);
    if (!response.ok) {
      throw new Error(`Failed to fetch Pokémon with ID ${id}`);
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error(`Error fetching Pokémon with ID ${id}:`, error);
    throw error;
  }
};

/**
 * Compare two Pokémon by their IDs
 * @param {number} id1 - The ID of the first Pokémon
 * @param {number} id2 - The ID of the second Pokémon
 * @returns {Promise<Object>} - Promise resolving to a comparison result object
 */
export const comparePokemon = async (id1, id2) => {
  try {
    const response = await fetch(`${API_BASE_URL}/pokemons/compare/${id1}/${id2}`);
    if (!response.ok) {
      throw new Error(`Failed to compare Pokémon with IDs ${id1} and ${id2}`);
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error(`Error comparing Pokémon with IDs ${id1} and ${id2}:`, error);
    throw error;
  }
}; 