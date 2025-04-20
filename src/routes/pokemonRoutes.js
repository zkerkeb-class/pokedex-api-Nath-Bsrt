import express from 'express';
import Pokemon from '../models/Pokemon.js';  // Importation du modèle de données Pokémon

const router = express.Router();

// Fonction pour s'assurer que les objets Pokémon ont le bon format pour le frontend
const formatPokemonForFrontend = (pokemon) => {
  const pokemonObj = pokemon.toObject ? pokemon.toObject() : { ...pokemon };
  
  // S'assurer que type et types sont présents et corrects
  if (pokemonObj.type && !pokemonObj.types) {
    pokemonObj.types = pokemonObj.type;
  } else if (!pokemonObj.type && pokemonObj.types) {
    pokemonObj.type = pokemonObj.types;
  } else if (!pokemonObj.type && !pokemonObj.types) {
    // Si ni type ni types n'est présent, créer un tableau vide
    pokemonObj.type = [];
    pokemonObj.types = [];
  }
  
  // Assurer que base existe bien, même si absent dans la BD
  if (!pokemonObj.base && pokemonObj.stats) {
    pokemonObj.base = {
      "HP": pokemonObj.stats.hp,
      "Attack": pokemonObj.stats.attack,
      "Defense": pokemonObj.stats.defense,
      "Sp. Attack": pokemonObj.stats.specialAttack,
      "Sp. Defense": pokemonObj.stats.specialDefense,
      "Speed": pokemonObj.stats.speed
    };
  } else if (pokemonObj.base) {
    // S'assurer que tous les champs nécessaires de base sont présents
    if (!pokemonObj.base.HP) pokemonObj.base.HP = 0;
    if (!pokemonObj.base.Attack) pokemonObj.base.Attack = 0;
    if (!pokemonObj.base.Defense) pokemonObj.base.Defense = 0;
    if (!pokemonObj.base["Sp. Attack"]) pokemonObj.base["Sp. Attack"] = 0;
    if (!pokemonObj.base["Sp. Defense"]) pokemonObj.base["Sp. Defense"] = 0;
    if (!pokemonObj.base.Speed) pokemonObj.base.Speed = 0;
  } else {
    // Si base n'existe pas du tout, le créer avec des valeurs par défaut
    pokemonObj.base = {
      "HP": 0,
      "Attack": 0,
      "Defense": 0,
      "Sp. Attack": 0,
      "Sp. Defense": 0,
      "Speed": 0
    };
  }
  
  return pokemonObj;
};

// GET - Récupérer tous les pokémons
router.get('/', async (req, res) => {
  try {
    const pokemons = await Pokemon.find({});  // Récupérer tous les Pokémon
    
    // Transformer les données pour s'assurer qu'elles sont dans le bon format pour le frontend
    const formattedPokemons = pokemons.map(formatPokemonForFrontend);
    
    res.status(200).json(formattedPokemons);
  } catch (error) {
    res.status(500).json({
      message: "Erreur lors de la récupération des pokémons",
      error: error.message
    });
  }
});

// GET - Récupérer un pokémon par son ID
router.get('/:id', async (req, res) => {
  try {
    const pokemon = await Pokemon.findOne({ id: req.params.id });  // Chercher le Pokémon par ID
    if (!pokemon) {
      return res.status(404).json({ message: "Pokémon non trouvé" });
    }
    
    // Transformer pour le frontend
    const formattedPokemon = formatPokemonForFrontend(pokemon);
    
    res.status(200).json(formattedPokemon);  // Retourner le Pokémon trouvé
  } catch (error) {
    res.status(500).json({
      message: "Erreur lors de la récupération du pokémon",
      error: error.message
    });
  }
});

// POST - Créer un nouveau pokémon
router.post('/', async (req, res) => {
  try {
    // Vérifier si l'ID existe déjà dans la base de données
    const existingPokemon = await Pokemon.findOne({ id: req.body.id });
    if (existingPokemon) {
      return res.status(400).json({ message: "Un pokémon avec cet ID existe déjà" });
    }
    const newPokemon = new Pokemon(req.body);  // Créer un nouvel objet Pokémon
    await newPokemon.save();  // Sauvegarder le Pokémon dans la base de données
    
    // Transformer pour le frontend
    const formattedPokemon = formatPokemonForFrontend(newPokemon);
    
    res.status(201).json(formattedPokemon);  // Retourner le Pokémon créé
  } catch (error) {
    res.status(400).json({
      message: "Erreur lors de la création du pokémon",
      error: error.message
    });
  }
});

// PUT - Mettre à jour un pokémon
router.put('/:id', async (req, res) => {
  try {
    // Mettre à jour le Pokémon par son ID
    const updatedPokemon = await Pokemon.findOneAndUpdate(
      { id: req.params.id },  // Trouver le Pokémon par son ID
      req.body,  // Données mises à jour
      { new: true, runValidators: true }  // Récupérer la version mise à jour
    );
    if (!updatedPokemon) {
      return res.status(404).json({ message: "Pokémon non trouvé" });
    }
    
    // Transformer pour le frontend
    const formattedPokemon = formatPokemonForFrontend(updatedPokemon);
    
    res.status(200).json(formattedPokemon);  // Retourner le Pokémon mis à jour
  } catch (error) {
    res.status(400).json({
      message: "Erreur lors de la mise à jour du pokémon",
      error: error.message
    });
  }
});

// DELETE - Supprimer un pokémon
router.delete('/:id', async (req, res) => {
  try {
    // Supprimer un Pokémon par son ID
    const deletedPokemon = await Pokemon.findOneAndDelete({ id: req.params.id });
    if (!deletedPokemon) {
      return res.status(404).json({ message: "Pokémon non trouvé" });
    }
    
    // Transformer pour le frontend
    const formattedPokemon = formatPokemonForFrontend(deletedPokemon);
    
    res.status(200).json({
      message: "Pokémon supprimé avec succès",
      pokemon: formattedPokemon
    });
  } catch (error) {
    res.status(500).json({
      message: "Erreur lors de la suppression du pokémon",
      error: error.message
    });
  }
});

export default router;
