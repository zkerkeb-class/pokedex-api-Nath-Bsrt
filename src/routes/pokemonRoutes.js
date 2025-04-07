import express from 'express';
import Pokemon from '../models/Pokemon.js';  // Importation du modèle de données Pokémon

const router = express.Router();

// GET - Récupérer tous les pokémons
router.get('/', async (req, res) => {
  try {
    const pokemons = await Pokemon.find({});  // Récupérer tous les Pokémon
    console.log(pokemons);
    res.status(200).json(pokemons);
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
    res.status(200).json(pokemon);  // Retourner le Pokémon trouvé
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
    res.status(201).json(newPokemon);  // Retourner le Pokémon créé
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
    res.status(200).json(updatedPokemon);  // Retourner le Pokémon mis à jour
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
    res.status(200).json({
      message: "Pokémon supprimé avec succès",
      pokemon: deletedPokemon
    });
  } catch (error) {
    res.status(500).json({
      message: "Erreur lors de la suppression du pokémon",
      error: error.message
    });
  }
});

export default router;
