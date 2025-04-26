import mongoose from 'mongoose';
import Pokemon from '../models/Pokemon.js';

const checkData = async () => {
  try {
    console.log('Connexion à MongoDB...');
    await mongoose.connect('mongodb://localhost:27017/pokedex');
    console.log('Connecté à MongoDB');

    // Recherche de Herbizarre
    const herbizarre = await Pokemon.findOne({id: 2});
    if (herbizarre) {
      console.log('Données de Herbizarre:');
      console.log(JSON.stringify(herbizarre, null, 2));
      
      // Vérification spécifique des stats
      console.log('\nVérification des statistiques:');
      console.log('base.Sp_Attack:', herbizarre.base.Sp_Attack);
      console.log('base.Sp_Defense:', herbizarre.base.Sp_Defense);
      console.log('stats.specialAttack:', herbizarre.stats.specialAttack);
      console.log('stats.specialDefense:', herbizarre.stats.specialDefense);
    } else {
      console.log('Herbizarre non trouvé dans la base de données');
    }

    console.log('\nRecherche de quelques autres Pokémon pour comparaison:');
    const dracaufeu = await Pokemon.findOne({'name.french': 'Dracaufeu'});
    if (dracaufeu) {
      console.log('Dracaufeu - base.Sp_Attack:', dracaufeu.base.Sp_Attack, '- stats.specialAttack:', dracaufeu.stats.specialAttack);
      console.log('Dracaufeu - base.Sp_Defense:', dracaufeu.base.Sp_Defense, '- stats.specialDefense:', dracaufeu.stats.specialDefense);
    }

    mongoose.disconnect();
    process.exit();
  } catch (error) {
    console.error('Erreur:', error.message);
    process.exit(1);
  }
};

checkData(); 