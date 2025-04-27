import jwt from 'jsonwebtoken';
import User from '../models/User.js';
import asyncHandler from 'express-async-handler';
import jwtConfig from '../config/jwtConfig.js';

// Générer un token JWT
const generateToken = (id) => {
  console.log('Clé JWT utilisée:', jwtConfig.secret);
  
  return jwt.sign({ id }, jwtConfig.secret, {
    expiresIn: jwtConfig.expiresIn
  });
};

// @desc    Inscrire un nouvel utilisateur
// @route   POST /api/auth/register
// @access  Public
export const registerUser = asyncHandler(async (req, res) => {
  const { username, email, password } = req.body;

  // Vérifier si l'utilisateur existe déjà
  const userExists = await User.findOne({ $or: [{ email }, { username }] });

  if (userExists) {
    res.status(400);
    throw new Error('Utilisateur déjà existant');
  }

  try {
    // Créer l'utilisateur
    const user = await User.create({
      username,
      email,
      password,
    });

    if (user) {
      res.status(201).json({
        _id: user._id,
        username: user.username,
        email: user.email,
        role: user.role,
        highScore: user.highScore,
        gamesPlayed: user.gamesPlayed,
        pokemonCaught: user.pokemonCaught,
        token: generateToken(user._id),
      });
    } else {
      res.status(400);
      throw new Error('Données utilisateur invalides');
    }
  } catch (error) {
    res.status(400);
    if (error.code === 11000) {
      // Erreur de duplication (clé unique violée)
      const field = Object.keys(error.keyPattern)[0];
      throw new Error(`Ce ${field} est déjà utilisé`);
    } else {
      throw new Error(error.message || 'Erreur lors de la création de l\'utilisateur');
    }
  }
});

// @desc    Authentifier un utilisateur et générer un token
// @route   POST /api/auth/login
// @access  Public
export const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  try {
    // Vérifier si l'utilisateur existe
    const user = await User.findOne({ email });

    if (!user) {
      res.status(401);
      throw new Error('Email ou mot de passe incorrect');
    }

    const isMatch = await user.matchPassword(password);
    
    if (isMatch) {
      res.json({
        _id: user._id,
        username: user.username,
        email: user.email,
        role: user.role,
        highScore: user.highScore,
        gamesPlayed: user.gamesPlayed,
        pokemonCaught: user.pokemonCaught,
        token: generateToken(user._id),
      });
    } else {
      res.status(401);
      throw new Error('Email ou mot de passe incorrect');
    }
  } catch (error) {
    res.status(401);
    throw new Error(error.message || 'Erreur lors de la connexion');
  }
});

// @desc    Obtenir les données de l'utilisateur connecté
// @route   GET /api/auth/profile
// @access  Private
export const getUserProfile = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id);

  if (user) {
    res.json({
      _id: user._id,
      username: user.username,
      email: user.email,
      role: user.role,
      highScore: user.highScore,
      gamesPlayed: user.gamesPlayed,
      pokemonCaught: user.pokemonCaught,
    });
  } else {
    res.status(404);
    throw new Error('Utilisateur non trouvé');
  }
});

// @desc    Mettre à jour le profil de l'utilisateur
// @route   PUT /api/auth/profile
// @access  Private
export const updateUserProfile = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id);

  if (user) {
    user.username = req.body.username || user.username;
    user.email = req.body.email || user.email;

    if (req.body.password) {
      user.password = req.body.password;
    }

    const updatedUser = await user.save();

    res.json({
      _id: updatedUser._id,
      username: updatedUser.username,
      email: updatedUser.email,
      role: updatedUser.role,
      highScore: updatedUser.highScore,
      gamesPlayed: updatedUser.gamesPlayed,
      pokemonCaught: updatedUser.pokemonCaught,
      token: generateToken(updatedUser._id),
    });
  } else {
    res.status(404);
    throw new Error('Utilisateur non trouvé');
  }
});

// @desc    Vérifier si l'utilisateur est authentifié
// @route   GET /api/auth/verify
// @access  Private
export const verifyUser = asyncHandler(async (req, res) => {
  res.status(200).json({ isAuthenticated: true, user: req.user });
});

// @desc    Mettre à jour le score de l'utilisateur
// @route   PUT /api/auth/score
// @access  Private
export const updateUserScore = asyncHandler(async (req, res) => {
  const { score, pokemonCaught } = req.body;
  const user = await User.findById(req.user._id);

  if (!user) {
    res.status(404);
    throw new Error('Utilisateur non trouvé');
  }

  // Mettre à jour le meilleur score si le nouveau score est plus élevé
  if (score > user.highScore) {
    user.highScore = score;
  }

  // Incrémenter le nombre de parties jouées
  user.gamesPlayed += 1;

  // Ajouter les pokémon capturés
  user.pokemonCaught += pokemonCaught || 0;

  const updatedUser = await user.save();

  res.json({
    _id: updatedUser._id,
    username: updatedUser.username,
    highScore: updatedUser.highScore,
    gamesPlayed: updatedUser.gamesPlayed,
    pokemonCaught: updatedUser.pokemonCaught,
  });
});

// @desc    Récupérer le leaderboard (top 10 des scores)
// @route   GET /api/auth/leaderboard
// @access  Public
export const getLeaderboard = asyncHandler(async (req, res) => {
  const leaderboard = await User.find({})
    .sort({ highScore: -1 }) // Tri par ordre décroissant de score
    .limit(10) // Limiter aux 10 meilleurs joueurs
    .select('username highScore gamesPlayed pokemonCaught'); // Sélectionner uniquement les champs nécessaires

  res.json(leaderboard);
}); 