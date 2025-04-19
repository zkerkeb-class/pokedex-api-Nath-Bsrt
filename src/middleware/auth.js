import jwt from 'jsonwebtoken';
import User from '../models/User.js';

// Middleware pour vérifier le JWT et protéger les routes
export const authenticateToken = async (req, res, next) => {
  try {
    // Récupérer le token d'autorisation du header
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1]; // Format: "Bearer TOKEN"
    
    if (!token) {
      return res.status(401).json({ message: "Accès non autorisé - Token manquant" });
    }
    
    // Vérifier et décoder le token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    
    // Trouver l'utilisateur associé au token
    const user = await User.findById(decoded.id).select('-password');
    
    if (!user) {
      return res.status(404).json({ message: "Utilisateur non trouvé" });
    }
    
    // Attacher l'utilisateur à la requête pour utilisation dans les routes protégées
    req.user = user;
    next();
  } catch (error) {
    if (error.name === 'JsonWebTokenError') {
      return res.status(401).json({ message: "Token invalide" });
    }
    if (error.name === 'TokenExpiredError') {
      return res.status(401).json({ message: "Token expiré" });
    }
    console.error('Erreur d\'authentification :', error);
    return res.status(500).json({ message: "Erreur serveur" });
  }
};

// Middleware pour vérifier si l'utilisateur est administrateur
export const isAdmin = (req, res, next) => {
  if (req.user && req.user.role === 'admin') {
    next();
  } else {
    res.status(403).json({ message: "Accès refusé - Droits administrateur requis" });
  }
}; 