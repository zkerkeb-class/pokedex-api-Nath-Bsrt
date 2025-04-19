// Fichier de configuration pour JWT
const jwtConfig = {
  // Utiliser la clé secrète de l'environnement ou une valeur par défaut
  secret: process.env.JWT_SECRET || 'pokemon_secret_key_123456789',
  expiresIn: '30d'
};

export default jwtConfig; 