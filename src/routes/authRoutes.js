import express from 'express';
import { 
  registerUser, 
  loginUser, 
  getUserProfile, 
  updateUserProfile, 
  verifyUser,
  updateUserScore,
  getLeaderboard,
  devLogin,
  createDevUser
} from '../controllers/authController.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

// Routes publiques
router.post('/register', registerUser);
router.post('/login', loginUser);
router.get('/leaderboard', getLeaderboard);
// Routes de développement - ne pas utiliser en production
router.get('/dev-login', devLogin);
router.get('/create-dev-user', createDevUser);

// Routes protégées
router.get('/profile', protect, getUserProfile);
router.put('/profile', protect, updateUserProfile);
router.get('/verify', protect, verifyUser);
router.put('/score', protect, updateUserScore);

export default router; 