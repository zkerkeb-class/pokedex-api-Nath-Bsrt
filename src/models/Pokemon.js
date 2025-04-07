import mongoose from 'mongoose';

const pokemonSchema = new mongoose.Schema({
  id: {
    type: Number,
    required: true,
    unique: true
  },
  name: {
    french: String, // Nom en français
    english: String, // Nom en anglais
    japanese: String, // Nom en japonais
    chinese : String // Nom en chinois
  },
  types: [{
    type: String,
    enum: [
      "fire", "water", "grass", "electric", "ice", "fighting",
      "poison", "ground", "flying", "psychic", "bug", "rock",
      "ghost", "dragon", "dark", "steel", "fairy"
    ]
  }],
  image: {
    type: String
  },
  stats: {
    hp: Number,
    attack: Number,
    defense: Number,
    specialAttack: Number,
    specialDefense: Number,
    speed: Number
  },
  evolutions: [{
    type: Number,
    ref: 'Pokemon'
  }]
}, {
  timestamps: true
});

const Pokemon = mongoose.model('Pokemon', pokemonSchema);

export default Pokemon;
