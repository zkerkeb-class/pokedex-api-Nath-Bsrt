import jwt from 'jsonwebtoken';
import User from '../models/User.js';
import asyncHandler from 'express-async-handler';

// Option 1: Désactiver complètement la protection (seulement pour le développement)
// Décommentez ce bloc et commentez celui en dessous pour un accès sans authentification
export const protect = asyncHandler(async (req, res, next) => {
  // Utilisateur factice pour le développement
  req.user = {
    _id: '123456789012345678901234',
    username: 'utilisateur_debug',
    email: 'debug@test.com',
    role: 'user',
    highScore: 0,
    gamesPlayed: 0,
    pokemonCaught: 0
  };
  return next();
});

// Option 2: Middleware standard avec vérification du token JWT
// Pour réactiver en production, commentez la version ci-dessus et décommentez celle-ci
/*
export const protect = asyncHandler(async (req, res, next) => {
  let token;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer')
  ) {
    try {
      // Obtenir le token du header
      token = req.headers.authorization.split(' ')[1];

      // Utiliser une clé secrète par défaut si process.env.JWT_SECRET est undefined
      const jwtSecret = process.env.JWT_SECRET || 'pokemon_secret_key_123456789';
      console.log('Clé JWT utilisée (middleware):', jwtSecret);
      
      // Vérifier le token
      const decoded = jwt.verify(token, jwtSecret);

      // Récupérer l'utilisateur du token (sans le mot de passe)
      req.user = await User.findById(decoded.id).select('-password');

      if (!req.user) {
        res.status(401);
        throw new Error('Utilisateur non trouvé');
      }

      next();
    } catch (error) {
      console.error(error);
      res.status(401);
      throw new Error('Non autorisé, token invalide');
    }
  }

  if (!token) {
    res.status(401);
    throw new Error('Non autorisé, pas de token');
  }
});
*/

// Middleware pour les routes réservées aux administrateurs
export const admin = (req, res, next) => {
  if (req.user && req.user.role === 'admin') {
    next();
  } else {
    res.status(403);
    throw new Error('Non autorisé, accès administrateur requis');
  }
}; 