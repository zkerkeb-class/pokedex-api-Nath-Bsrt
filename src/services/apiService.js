// apiService.js
// Fonctions utilitaires pour interagir avec l'API Pokémon

// URL de base pour les requêtes API
const API_BASE_URL = 'http://localhost:3000/api';

/**
 * Récupère tous les Pokémon depuis l'API
 * @returns {Promise<Array>} - Promise résolvant vers un tableau de Pokémon
 */
export const getAllPokemon = async () => {
  try {
    const response = await fetch(`${API_BASE_URL}/pokemons`);
    if (!response.ok) {
      throw new Error('Échec de récupération des Pokémon');
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Erreur lors de la récupération de tous les Pokémon:', error);
    throw error;
  }
};

/**
 * Récupère un seul Pokémon par son ID
 * @param {number} id - L'ID du Pokémon à récupérer
 * @returns {Promise<Object>} - Promise résolvant vers un objet Pokémon
 */
export const getPokemonById = async (id) => {
  try {
    const response = await fetch(`${API_BASE_URL}/pokemons/${id}`);
    if (!response.ok) {
      throw new Error(`Échec de récupération du Pokémon avec l'ID ${id}`);
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error(`Erreur lors de la récupération du Pokémon avec l'ID ${id}:`, error);
    throw error;
  }
};

/**
 * Compare deux Pokémon par leurs IDs
 * @param {number} id1 - L'ID du premier Pokémon
 * @param {number} id2 - L'ID du second Pokémon
 * @returns {Promise<Object>} - Promise résolvant vers un objet de résultat de comparaison
 */
export const comparePokemon = async (id1, id2) => {
  try {
    const response = await fetch(`${API_BASE_URL}/pokemons/compare/${id1}/${id2}`);
    if (!response.ok) {
      throw new Error(`Échec de comparaison des Pokémon avec les IDs ${id1} et ${id2}`);
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error(`Erreur lors de la comparaison des Pokémon avec les IDs ${id1} et ${id2}:`, error);
    throw error;
  }
};

/**
 * Crée un nouveau Pokémon
 * @param {Object} pokemonData - Les données du nouveau Pokémon
 * @returns {Promise<Object>} - Promise résolvant vers le Pokémon créé
 */
export const createPokemon = async (pokemonData) => {
  try {
    const response = await fetch(`${API_BASE_URL}/pokemons`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(pokemonData),
    });
    if (!response.ok) {
      throw new Error('Échec de création du Pokémon');
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Erreur lors de la création du Pokémon:', error);
    throw error;
  }
};

/**
 * Met à jour un Pokémon existant
 * @param {number} id - L'ID du Pokémon à mettre à jour
 * @param {Object} pokemonData - Les données mises à jour du Pokémon
 * @returns {Promise<Object>} - Promise résolvant vers le Pokémon mis à jour
 */
export const updatePokemon = async (id, pokemonData) => {
  try {
    const response = await fetch(`${API_BASE_URL}/pokemons/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(pokemonData),
    });
    if (!response.ok) {
      throw new Error(`Échec de mise à jour du Pokémon avec l'ID ${id}`);
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error(`Erreur lors de la mise à jour du Pokémon avec l'ID ${id}:`, error);
    throw error;
  }
};

/**
 * Supprime un Pokémon
 * @param {number} id - L'ID du Pokémon à supprimer
 * @returns {Promise<Object>} - Promise résolvant vers le résultat de la suppression
 */
export const deletePokemon = async (id) => {
  try {
    const response = await fetch(`${API_BASE_URL}/pokemons/${id}`, {
      method: 'DELETE',
    });
    if (!response.ok) {
      throw new Error(`Échec de suppression du Pokémon avec l'ID ${id}`);
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error(`Erreur lors de la suppression du Pokémon avec l'ID ${id}:`, error);
    throw error;
  }
}; 