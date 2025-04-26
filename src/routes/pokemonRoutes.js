import express from 'express';
import Pokemon from '../models/Pokemon.js';  // Importation du modèle de données Pokémon

const router = express.Router();

// Fonction pour s'assurer que les objets Pokémon ont le bon format pour le frontend
const formatPokemonForFrontend = (pokemon) => {
  const pokemonObj = pokemon.toObject ? pokemon.toObject() : { ...pokemon };
  
  console.log("Pokemon original:", JSON.stringify({
    id: pokemonObj.id,
    base: pokemonObj.base,
    stats: pokemonObj.stats
  }, null, 2));
  
  // S'assurer que name existe et contient toutes les langues
  if (!pokemonObj.name) {
    pokemonObj.name = {};
  }
  
  // S'assurer que toutes les variantes de langue existent
  pokemonObj.name.french = pokemonObj.name.french || '';
  pokemonObj.name.english = pokemonObj.name.english || '';
  pokemonObj.name.japanese = pokemonObj.name.japanese || '';
  pokemonObj.name.chinese = pokemonObj.name.chinese || '';
  
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
  
  // S'assurer que stats existe (le créer si nécessaire)
  if (!pokemonObj.stats) {
    pokemonObj.stats = {
      hp: 0,
      attack: 0,
      defense: 0,
      specialAttack: 0,
      specialDefense: 0,
      speed: 0
    };
  }
  
  // S'assurer que base existe (le créer si nécessaire)
  if (!pokemonObj.base) {
    pokemonObj.base = {
      "HP": 0,
      "Attack": 0,
      "Defense": 0,
      "Sp. Attack": 0,
      "Sp. Defense": 0,
      "Speed": 0
    };
  }
  
  // Log pour debugging des noms
  console.log(`Pokemon ID ${pokemonObj.id} - Name Data:`, JSON.stringify({
    name: pokemonObj.name
  }, null, 2));
  
  // Mettre à jour stats en fonction de base si base contient les bonnes valeurs
  if (pokemonObj.base["Sp. Attack"] !== undefined && pokemonObj.base["Sp. Attack"] !== 0) {
    pokemonObj.stats.specialAttack = pokemonObj.base["Sp. Attack"];
  } else if (pokemonObj.base.Sp_Attack !== undefined && pokemonObj.base.Sp_Attack !== 0) {
    pokemonObj.stats.specialAttack = pokemonObj.base.Sp_Attack;
    pokemonObj.base["Sp. Attack"] = pokemonObj.base.Sp_Attack;
  }
  
  if (pokemonObj.base["Sp. Defense"] !== undefined && pokemonObj.base["Sp. Defense"] !== 0) {
    pokemonObj.stats.specialDefense = pokemonObj.base["Sp. Defense"];
  } else if (pokemonObj.base.Sp_Defense !== undefined && pokemonObj.base.Sp_Defense !== 0) {
    pokemonObj.stats.specialDefense = pokemonObj.base.Sp_Defense;
    pokemonObj.base["Sp. Defense"] = pokemonObj.base.Sp_Defense;
  }
  
  // Mettre à jour base en fonction de stats si stats contient les bonnes valeurs
  if (pokemonObj.stats.specialAttack !== undefined && pokemonObj.stats.specialAttack !== 0) {
    pokemonObj.base["Sp. Attack"] = pokemonObj.stats.specialAttack;
    if (pokemonObj.base.Sp_Attack === undefined || pokemonObj.base.Sp_Attack === 0) {
      pokemonObj.base.Sp_Attack = pokemonObj.stats.specialAttack;
    }
  }
  
  if (pokemonObj.stats.specialDefense !== undefined && pokemonObj.stats.specialDefense !== 0) {
    pokemonObj.base["Sp. Defense"] = pokemonObj.stats.specialDefense;
    if (pokemonObj.base.Sp_Defense === undefined || pokemonObj.base.Sp_Defense === 0) {
      pokemonObj.base.Sp_Defense = pokemonObj.stats.specialDefense;
    }
  }
  
  // Assurer cohérence entre HP et hp
  pokemonObj.base.HP = pokemonObj.base.HP || pokemonObj.stats.hp || 0;
  pokemonObj.stats.hp = pokemonObj.stats.hp || pokemonObj.base.HP || 0;
  
  // Assurer cohérence entre Attack et attack
  pokemonObj.base.Attack = pokemonObj.base.Attack || pokemonObj.stats.attack || 0;
  pokemonObj.stats.attack = pokemonObj.stats.attack || pokemonObj.base.Attack || 0;
  
  // Assurer cohérence entre Defense et defense
  pokemonObj.base.Defense = pokemonObj.base.Defense || pokemonObj.stats.defense || 0;
  pokemonObj.stats.defense = pokemonObj.stats.defense || pokemonObj.base.Defense || 0;
  
  // Assurer cohérence entre Speed et speed
  pokemonObj.base.Speed = pokemonObj.base.Speed || pokemonObj.stats.speed || 0;
  pokemonObj.stats.speed = pokemonObj.stats.speed || pokemonObj.base.Speed || 0;
  
  // Log pour debugging
  console.log(`Pokemon ID ${pokemonObj.id} - Formatted Data:`, JSON.stringify({
    base: {
      "HP": pokemonObj.base.HP,
      "Attack": pokemonObj.base.Attack,
      "Defense": pokemonObj.base.Defense,
      "Sp. Attack": pokemonObj.base["Sp. Attack"],
      "Sp. Defense": pokemonObj.base["Sp. Defense"],
      "Speed": pokemonObj.base.Speed
    },
    stats: pokemonObj.stats
  }, null, 2));
  
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

// GET - Comparer deux pokémons
router.get('/compare/:id1/:id2', async (req, res) => {
  try {
    const pokemon1 = await Pokemon.findOne({ id: req.params.id1 });
    const pokemon2 = await Pokemon.findOne({ id: req.params.id2 });
    
    if (!pokemon1 || !pokemon2) {
      return res.status(404).json({ message: "Un ou plusieurs Pokémon non trouvés" });
    }
    
    // Transformer pour le frontend
    const formattedPokemon1 = formatPokemonForFrontend(pokemon1);
    const formattedPokemon2 = formatPokemonForFrontend(pokemon2);
    
    // Tableau des types et leurs efficacités
    const typeEffectiveness = {
      normal: { weaknesses: ['fighting'], resistances: [], immunities: ['ghost'] },
      fire: { weaknesses: ['water', 'ground', 'rock'], resistances: ['fire', 'grass', 'ice', 'bug', 'steel', 'fairy'], immunities: [] },
      water: { weaknesses: ['electric', 'grass'], resistances: ['fire', 'water', 'ice', 'steel'], immunities: [] },
      electric: { weaknesses: ['ground'], resistances: ['electric', 'flying', 'steel'], immunities: [] },
      grass: { weaknesses: ['fire', 'ice', 'poison', 'flying', 'bug'], resistances: ['water', 'electric', 'grass', 'ground'], immunities: [] },
      ice: { weaknesses: ['fire', 'fighting', 'rock', 'steel'], resistances: ['ice'], immunities: [] },
      fighting: { weaknesses: ['flying', 'psychic', 'fairy'], resistances: ['bug', 'rock', 'dark'], immunities: [] },
      poison: { weaknesses: ['ground', 'psychic'], resistances: ['grass', 'fighting', 'poison', 'bug', 'fairy'], immunities: [] },
      ground: { weaknesses: ['water', 'grass', 'ice'], resistances: ['poison', 'rock'], immunities: ['electric'] },
      flying: { weaknesses: ['electric', 'ice', 'rock'], resistances: ['grass', 'fighting', 'bug'], immunities: ['ground'] },
      psychic: { weaknesses: ['bug', 'ghost', 'dark'], resistances: ['fighting', 'psychic'], immunities: [] },
      bug: { weaknesses: ['fire', 'flying', 'rock'], resistances: ['grass', 'fighting', 'ground'], immunities: [] },
      rock: { weaknesses: ['water', 'grass', 'fighting', 'ground', 'steel'], resistances: ['normal', 'fire', 'poison', 'flying'], immunities: [] },
      ghost: { weaknesses: ['ghost', 'dark'], resistances: ['poison', 'bug'], immunities: ['normal', 'fighting'] },
      dragon: { weaknesses: ['ice', 'dragon', 'fairy'], resistances: ['fire', 'water', 'electric', 'grass'], immunities: [] },
      dark: { weaknesses: ['fighting', 'bug', 'fairy'], resistances: ['ghost', 'dark'], immunities: ['psychic'] },
      steel: { weaknesses: ['fire', 'fighting', 'ground'], resistances: ['normal', 'grass', 'ice', 'flying', 'psychic', 'bug', 'rock', 'dragon', 'steel', 'fairy'], immunities: ['poison'] },
      fairy: { weaknesses: ['poison', 'steel'], resistances: ['fighting', 'bug', 'dark'], immunities: ['dragon'] }
    };
    
    // Comparer les statistiques de base
    const statsComparison = {
      hp: { pokemon1: formattedPokemon1.stats.hp, pokemon2: formattedPokemon2.stats.hp, winner: formattedPokemon1.stats.hp > formattedPokemon2.stats.hp ? formattedPokemon1.name?.french || 'Pokemon 1' : formattedPokemon1.stats.hp < formattedPokemon2.stats.hp ? formattedPokemon2.name?.french || 'Pokemon 2' : 'Égalité' },
      attack: { pokemon1: formattedPokemon1.stats.attack, pokemon2: formattedPokemon2.stats.attack, winner: formattedPokemon1.stats.attack > formattedPokemon2.stats.attack ? formattedPokemon1.name?.french || 'Pokemon 1' : formattedPokemon1.stats.attack < formattedPokemon2.stats.attack ? formattedPokemon2.name?.french || 'Pokemon 2' : 'Égalité' },
      defense: { pokemon1: formattedPokemon1.stats.defense, pokemon2: formattedPokemon2.stats.defense, winner: formattedPokemon1.stats.defense > formattedPokemon2.stats.defense ? formattedPokemon1.name?.french || 'Pokemon 1' : formattedPokemon1.stats.defense < formattedPokemon2.stats.defense ? formattedPokemon2.name?.french || 'Pokemon 2' : 'Égalité' },
      specialAttack: { pokemon1: formattedPokemon1.stats.specialAttack, pokemon2: formattedPokemon2.stats.specialAttack, winner: formattedPokemon1.stats.specialAttack > formattedPokemon2.stats.specialAttack ? formattedPokemon1.name?.french || 'Pokemon 1' : formattedPokemon1.stats.specialAttack < formattedPokemon2.stats.specialAttack ? formattedPokemon2.name?.french || 'Pokemon 2' : 'Égalité' },
      specialDefense: { pokemon1: formattedPokemon1.stats.specialDefense, pokemon2: formattedPokemon2.stats.specialDefense, winner: formattedPokemon1.stats.specialDefense > formattedPokemon2.stats.specialDefense ? formattedPokemon1.name?.french || 'Pokemon 1' : formattedPokemon1.stats.specialDefense < formattedPokemon2.stats.specialDefense ? formattedPokemon2.name?.french || 'Pokemon 2' : 'Égalité' },
      speed: { pokemon1: formattedPokemon1.stats.speed, pokemon2: formattedPokemon2.stats.speed, winner: formattedPokemon1.stats.speed > formattedPokemon2.stats.speed ? formattedPokemon1.name?.french || 'Pokemon 1' : formattedPokemon1.stats.speed < formattedPokemon2.stats.speed ? formattedPokemon2.name?.french || 'Pokemon 2' : 'Égalité' },
      total: { 
        pokemon1: formattedPokemon1.stats.hp + formattedPokemon1.stats.attack + formattedPokemon1.stats.defense + formattedPokemon1.stats.specialAttack + formattedPokemon1.stats.specialDefense + formattedPokemon1.stats.speed, 
        pokemon2: formattedPokemon2.stats.hp + formattedPokemon2.stats.attack + formattedPokemon2.stats.defense + formattedPokemon2.stats.specialAttack + formattedPokemon2.stats.specialDefense + formattedPokemon2.stats.speed,
        winner: ''
      }
    };
    
    // Déterminer le gagnant du total
    statsComparison.total.winner = statsComparison.total.pokemon1 > statsComparison.total.pokemon2 
      ? formattedPokemon1.name?.french || 'Pokemon 1' 
      : statsComparison.total.pokemon1 < statsComparison.total.pokemon2 
        ? formattedPokemon2.name?.french || 'Pokemon 2' 
        : 'Égalité';
    
    // Analyser les avantages de type
    const typeAdvantage = {
      pokemon1: { effective: [], ineffective: [], immune: [] },
      pokemon2: { effective: [], ineffective: [], immune: [] }
    };
    
    // Convertir les types en minuscules pour la comparaison
    const pokemon1Types = (formattedPokemon1.types || []).map(t => t.toLowerCase());
    const pokemon2Types = (formattedPokemon2.types || []).map(t => t.toLowerCase());
    
    // Analyser les efficacités pour le Pokémon 1
    pokemon1Types.forEach(type1 => {
      if (typeEffectiveness[type1]) {
        pokemon2Types.forEach(type2 => {
          if (typeEffectiveness[type1].weaknesses.includes(type2)) {
            typeAdvantage.pokemon2.effective.push(`${type2} est super efficace contre ${type1}`);
          }
          if (typeEffectiveness[type1].resistances.includes(type2)) {
            typeAdvantage.pokemon2.ineffective.push(`${type2} n'est pas très efficace contre ${type1}`);
          }
          if (typeEffectiveness[type1].immunities.includes(type2)) {
            typeAdvantage.pokemon2.immune.push(`${type1} est immunisé contre ${type2}`);
          }
        });
      }
    });
    
    // Analyser les efficacités pour le Pokémon 2
    pokemon2Types.forEach(type2 => {
      if (typeEffectiveness[type2]) {
        pokemon1Types.forEach(type1 => {
          if (typeEffectiveness[type2].weaknesses.includes(type1)) {
            typeAdvantage.pokemon1.effective.push(`${type1} est super efficace contre ${type2}`);
          }
          if (typeEffectiveness[type2].resistances.includes(type1)) {
            typeAdvantage.pokemon1.ineffective.push(`${type1} n'est pas très efficace contre ${type2}`);
          }
          if (typeEffectiveness[type2].immunities.includes(type1)) {
            typeAdvantage.pokemon1.immune.push(`${type2} est immunisé contre ${type1}`);
          }
        });
      }
    });
    
    // Calcul du score global basé sur les stats et les avantages de type
    let pokemon1Score = 0;
    let pokemon2Score = 0;
    
    // Ajouter des points basés sur les stats
    Object.keys(statsComparison).forEach(stat => {
      if (stat !== 'total') {
        if (statsComparison[stat].pokemon1 > statsComparison[stat].pokemon2) {
          pokemon1Score += 1;
        } else if (statsComparison[stat].pokemon1 < statsComparison[stat].pokemon2) {
          pokemon2Score += 1;
        }
      }
    });
    
    // Ajouter des points basés sur les avantages de type
    pokemon1Score += typeAdvantage.pokemon1.effective.length * 2;
    pokemon1Score -= typeAdvantage.pokemon2.effective.length * 2;
    pokemon1Score += typeAdvantage.pokemon1.immune.length * 3;
    pokemon1Score -= typeAdvantage.pokemon2.immune.length * 3;
    
    pokemon2Score += typeAdvantage.pokemon2.effective.length * 2;
    pokemon2Score -= typeAdvantage.pokemon1.effective.length * 2;
    pokemon2Score += typeAdvantage.pokemon2.immune.length * 3;
    pokemon2Score -= typeAdvantage.pokemon1.immune.length * 3;
    
    // Déterminer le gagnant global
    let overallWinner = '';
    if (pokemon1Score > pokemon2Score) {
      overallWinner = formattedPokemon1.name?.french || 'Pokemon 1';
    } else if (pokemon1Score < pokemon2Score) {
      overallWinner = formattedPokemon2.name?.french || 'Pokemon 2';
    } else {
      overallWinner = 'Égalité';
    }
    
    // Résultat final
    const result = {
      pokemon1: formattedPokemon1,
      pokemon2: formattedPokemon2,
      statsComparison,
      typeAdvantage,
      overallWinner,
      scores: {
        pokemon1: pokemon1Score,
        pokemon2: pokemon2Score
      }
    };
    
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({
      message: "Erreur lors de la comparaison des pokémons",
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
    
    // Log détaillé pour debugging
    console.log(`Pokemon ID ${req.params.id} - Detail Request - Full Data:`, JSON.stringify({
      id: formattedPokemon.id,
      name: formattedPokemon.name,
      types: formattedPokemon.types,
      base: formattedPokemon.base,
      stats: formattedPokemon.stats
    }, null, 2));
    
    res.status(200).json(formattedPokemon);  // Retourner le Pokémon trouvé
  } catch (error) {
    console.error(`Error fetching pokemon with ID ${req.params.id}:`, error);
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