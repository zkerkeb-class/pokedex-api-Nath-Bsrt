import mongoose from 'mongoose';
import dotenv from 'dotenv';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import Pokemon from '../models/Pokemon.js';

dotenv.config();

// Obtenir le chemin du répertoire actuel
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const importData = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);

    // Charger les données depuis le fichier JSON
    const pokemonsFilePath = path.join(__dirname, '../data/pokemons.json');
    const pokemonsData = JSON.parse(fs.readFileSync(pokemonsFilePath, 'utf8'));

    await Pokemon.deleteMany(); // Vide la collection avant d'insérer

    // Vérifier et compléter les données avant l'importation
    const completePokemons = pokemonsData.map(pokemon => {
      const completePokemon = { ...pokemon };
      
      // S'assurer que base existe et contient tous les champs nécessaires
      if (!completePokemon.base) {
        completePokemon.base = {};
      }
      
      // Remplacer les clés avec des points par des underscores pour éviter les problèmes avec MongoDB
      if (completePokemon.base["Sp. Attack"] !== undefined) {
        completePokemon.base["Sp_Attack"] = completePokemon.base["Sp. Attack"];
        delete completePokemon.base["Sp. Attack"];
      }
      if (completePokemon.base["Sp. Defense"] !== undefined) {
        completePokemon.base["Sp_Defense"] = completePokemon.base["Sp. Defense"];
        delete completePokemon.base["Sp. Defense"];
      }
      
      // Compléter les champs manquants dans base avec des valeurs par défaut
      if (!completePokemon.base.HP) completePokemon.base.HP = 0;
      if (!completePokemon.base.Attack) completePokemon.base.Attack = 0;
      if (!completePokemon.base.Defense) completePokemon.base.Defense = 0;
      if (!completePokemon.base.Sp_Attack) completePokemon.base.Sp_Attack = 0;
      if (!completePokemon.base.Sp_Defense) completePokemon.base.Sp_Defense = 0;
      if (!completePokemon.base.Speed) completePokemon.base.Speed = 0;
      
      // S'assurer que type est un tableau
      if (!completePokemon.type) {
        completePokemon.type = completePokemon.types || [];
      } else if (!Array.isArray(completePokemon.type)) {
        completePokemon.type = [completePokemon.type];
      }
      
      // Copier type vers types pour compatibilité avec le schéma
      completePokemon.types = [...completePokemon.type];
      
      // Ajouter le champ stats pour compatibilité avec le schéma Mongoose
      completePokemon.stats = {
        hp: completePokemon.base.HP || 0,
        attack: completePokemon.base.Attack || 0,
        defense: completePokemon.base.Defense || 0,
        specialAttack: completePokemon.base["Sp. Attack"] || 0,
        specialDefense: completePokemon.base["Sp. Defense"] || 0,
        speed: completePokemon.base.Speed || 0
      };
      
      // S'assurer que base.Sp_Attack et base.Sp_Defense sont correctement définis
      completePokemon.base.Sp_Attack = completePokemon.base["Sp. Attack"] || 0;
      completePokemon.base.Sp_Defense = completePokemon.base["Sp. Defense"] || 0;
      
      // S'assurer que les URLs des images contiennent bien http://localhost:3000
      if (completePokemon.image && !completePokemon.image.includes('http://localhost:3000')) {
        if (completePokemon.image.startsWith('/')) {
          completePokemon.image = `http://localhost:3000${completePokemon.image}`;
        } else {
          completePokemon.image = `http://localhost:3000/${completePokemon.image}`;
        }
      }
      
      return completePokemon;
    });

    await Pokemon.insertMany(completePokemons);

    console.log('✔ Données importées depuis pokemons.json vers MongoDB');
    process.exit();
  } catch (error) {
    console.error("❌ Erreur d'import :", error.message);
    process.exit(1);
  }
};

importData();