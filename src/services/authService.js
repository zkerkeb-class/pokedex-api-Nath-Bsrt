// authService.js
// Fonctions utilitaires pour interagir avec l'API d'authentification

// URL de base pour les requêtes API
const API_BASE_URL = 'http://localhost:3000/api';

/**
 * Récupère les informations du profil utilisateur
 * @returns {Promise<Object>} - Promise résolvant vers les données du profil utilisateur
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
      throw new Error('Échec de récupération du profil utilisateur');
    }
    
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Erreur lors de la récupération du profil utilisateur:', error);
    throw error;
  }
};

/**
 * Met à jour le score de l'utilisateur
 * @param {number} score - Le score de l'utilisateur
 * @param {number} pokemonCaught - Nombre de Pokémon capturés
 * @returns {Promise<Object>} - Promise résolvant vers les données utilisateur mises à jour
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
      throw new Error('Échec de mise à jour du score');
    }
    
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Erreur lors de la mise à jour du score:', error);
    throw error;
  }
};

/**
 * Récupère le classement (top 10 des joueurs)
 * @returns {Promise<Array>} - Promise résolvant vers les données du classement
 */
export const getLeaderboard = async () => {
  try {
    const response = await fetch(`${API_BASE_URL}/auth/leaderboard`);
    
    if (!response.ok) {
      throw new Error('Échec de récupération du classement');
    }
    
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Erreur lors de la récupération du classement:', error);
    throw error;
  }
}; 