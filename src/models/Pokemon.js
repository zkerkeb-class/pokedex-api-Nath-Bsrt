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
    // enum supprimé pour permettre la flexibilité des types
  }],
  type: [{
    type: String
  }],
  base: {
    HP: Number,
    Attack: Number,
    Defense: Number,
    Sp_Attack: Number,
    Sp_Defense: Number,
    Speed: Number
  },
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
