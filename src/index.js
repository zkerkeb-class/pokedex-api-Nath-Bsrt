import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "./config/db.js";
import pokemonRoutes from "./routes/pokemonRoutes.js";
import authRoutes from "./routes/authRoutes.js";
import { notFound, errorHandler } from "./middleware/errorMiddleware.js";
import path from "path";
import { fileURLToPath } from "url";

// Configuration des variables d'environnement - doit être appelé avant d'importer les autres modules
dotenv.config();

// Afficher les variables d'environnement pour le débogage
console.log("-------------------------------------");
console.log("Variables d'environnement :");
console.log("PORT:", process.env.PORT);
console.log("MONGODB_URI:", process.env.MONGODB_URI);
console.log("FRONTEND_URL:", process.env.FRONTEND_URL);
console.log("JWT_SECRET présent:", process.env.JWT_SECRET ? "Oui" : "Non");
console.log("NODE_ENV:", process.env.NODE_ENV);
console.log("-------------------------------------");

// Définir une valeur par défaut pour JWT_SECRET si elle n'existe pas
if (!process.env.JWT_SECRET) {
  process.env.JWT_SECRET = "pokemon_secret_key_123456789";
  console.log("JWT_SECRET défini par défaut:", process.env.JWT_SECRET);
}

// Connexion à MongoDB
connectDB();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Configuration d'Express
const app = express();
const PORT = process.env.PORT || 3000;

// Middleware pour parser le JSON
app.use(express.json());

app.use("/assets", express.static(path.join(__dirname, "../assets")));

// Configuration CORS très permissive pour le développement
app.use(cors({
  origin: '*', // Autorise toutes les origines en mode développement
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization", "X-Requested-With"]
}));

// Log de toutes les requêtes en mode développement
app.use((req, res, next) => {
  console.log(`${new Date().toISOString()} - ${req.method} ${req.originalUrl}`);
  next();
});

// Routes
app.use("/api/pokemons", pokemonRoutes);
app.use("/api/auth", authRoutes);

// Route de test pour vérifier que l'API fonctionne
app.get("/api/test", (req, res) => {
  res.json({ message: "L'API fonctionne correctement !" });
});

// Route de base
app.get("/", (req, res) => {
  res.send("Bienvenue sur l'API Pokémon avec MongoDB");
});

// Middlewares d'erreur
app.use(notFound);
app.use(errorHandler);

// Démarrage du serveur
app.listen(PORT, '0.0.0.0', () => {
  console.log(`Serveur démarré sur http://0.0.0.0:${PORT}`);
  console.log("-------------------------------------");
  console.log("Routes disponibles :");
  console.log("📝 POST /api/auth/register - Inscription");
  console.log("🔑 POST /api/auth/login - Connexion");
  console.log("🔑 GET /api/auth/dev-login - Connexion rapide (dev)");
  console.log("🏆 GET /api/auth/leaderboard - Classement");
  console.log("-------------------------------------");
});
