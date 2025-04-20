/**
 * Pokemon Evolution Chains Data
 * This file contains the correct evolution chains for Pokemon
 */

const evolutionChains = [
  // Bulbasaur family
  { chain: [1, 2, 3] }, // Bulbasaur -> Ivysaur -> Venusaur
  
  // Charmander family
  { chain: [4, 5, 6] }, // Charmander -> Charmeleon -> Charizard
  
  // Squirtle family
  { chain: [7, 8, 9] }, // Squirtle -> Wartortle -> Blastoise
  
  // Caterpie family
  { chain: [10, 11, 12] }, // Caterpie -> Metapod -> Butterfree
  
  // Weedle family
  { chain: [13, 14, 15] }, // Weedle -> Kakuna -> Beedrill
  
  // Pidgey family
  { chain: [16, 17, 18] }, // Pidgey -> Pidgeotto -> Pidgeot
  
  // Rattata family
  { chain: [19, 20] }, // Rattata -> Raticate
  
  // Spearow family
  { chain: [21, 22] }, // Spearow -> Fearow
  
  // Ekans family
  { chain: [23, 24] }, // Ekans -> Arbok
  
  // Pikachu family
  { chain: [172, 25, 26] }, // Pichu -> Pikachu -> Raichu
  
  // Sandshrew family
  { chain: [27, 28] }, // Sandshrew -> Sandslash
  
  // Nidoran♀ family
  { chain: [29, 30, 31] }, // Nidoran♀ -> Nidorina -> Nidoqueen
  
  // Nidoran♂ family
  { chain: [32, 33, 34] }, // Nidoran♂ -> Nidorino -> Nidoking
  
  // Clefairy family
  { chain: [173, 35, 36] }, // Cleffa -> Clefairy -> Clefable
  
  // Vulpix family
  { chain: [37, 38] }, // Vulpix -> Ninetales
  
  // Jigglypuff family
  { chain: [174, 39, 40] }, // Igglybuff -> Jigglypuff -> Wigglytuff
  
  // Zubat family
  { chain: [41, 42, 169] }, // Zubat -> Golbat -> Crobat
  
  // Oddish family
  { chain: [43, 44, 45] }, // Oddish -> Gloom -> Vileplume
  { chain: [43, 44, 182] }, // Oddish -> Gloom -> Bellossom
  
  // Paras family
  { chain: [46, 47] }, // Paras -> Parasect
  
  // Venonat family
  { chain: [48, 49] }, // Venonat -> Venomoth
  
  // Diglett family
  { chain: [50, 51] }, // Diglett -> Dugtrio
  
  // Meowth family
  { chain: [52, 53] }, // Meowth -> Persian
  
  // Psyduck family
  { chain: [54, 55] }, // Psyduck -> Golduck
  
  // Mankey family
  { chain: [56, 57] }, // Mankey -> Primeape
  
  // Growlithe family
  { chain: [58, 59] }, // Growlithe -> Arcanine
  
  // Poliwag family
  { chain: [60, 61, 62] }, // Poliwag -> Poliwhirl -> Poliwrath
  { chain: [60, 61, 186] }, // Poliwag -> Poliwhirl -> Politoed
  
  // Abra family
  { chain: [63, 64, 65] }, // Abra -> Kadabra -> Alakazam
  
  // Machop family
  { chain: [66, 67, 68] }, // Machop -> Machoke -> Machamp
  
  // Bellsprout family
  { chain: [69, 70, 71] }, // Bellsprout -> Weepinbell -> Victreebel
  
  // Tentacool family
  { chain: [72, 73] }, // Tentacool -> Tentacruel
  
  // Geodude family
  { chain: [74, 75, 76] }, // Geodude -> Graveler -> Golem
  
  // Ponyta family
  { chain: [77, 78] }, // Ponyta -> Rapidash
  
  // Slowpoke family
  { chain: [79, 80] }, // Slowpoke -> Slowbro
  { chain: [79, 199] }, // Slowpoke -> Slowking
  
  // Magnemite family
  { chain: [81, 82, 462] }, // Magnemite -> Magneton -> Magnezone
  
  // Farfetch'd (no evolution)
  { chain: [83] },
  
  // Doduo family
  { chain: [84, 85] }, // Doduo -> Dodrio
  
  // Seel family
  { chain: [86, 87] }, // Seel -> Dewgong
  
  // Grimer family
  { chain: [88, 89] }, // Grimer -> Muk
  
  // Shellder family
  { chain: [90, 91] }, // Shellder -> Cloyster
  
  // Gastly family
  { chain: [92, 93, 94] }, // Gastly -> Haunter -> Gengar
  
  // Onix family
  { chain: [95, 208] }, // Onix -> Steelix
  
  // Drowzee family
  { chain: [96, 97] }, // Drowzee -> Hypno
  
  // Krabby family
  { chain: [98, 99] }, // Krabby -> Kingler
  
  // Voltorb family
  { chain: [100, 101] }, // Voltorb -> Electrode
  
  // Exeggcute family
  { chain: [102, 103] }, // Exeggcute -> Exeggutor
  
  // Cubone family
  { chain: [104, 105] }, // Cubone -> Marowak
  
  // Hitmonlee, Hitmonchan, Hitmontop family
  { chain: [236, 106] }, // Tyrogue -> Hitmonlee
  { chain: [236, 107] }, // Tyrogue -> Hitmonchan
  { chain: [236, 237] }, // Tyrogue -> Hitmontop
  
  // Lickitung family
  { chain: [108, 463] }, // Lickitung -> Lickilicky
  
  // Koffing family
  { chain: [109, 110] }, // Koffing -> Weezing
  
  // Rhyhorn family
  { chain: [111, 112, 464] }, // Rhyhorn -> Rhydon -> Rhyperior
  
  // Chansey family
  { chain: [440, 113, 242] }, // Happiny -> Chansey -> Blissey
  
  // Tangela family
  { chain: [114, 465] }, // Tangela -> Tangrowth
  
  // Kangaskhan (no evolution)
  { chain: [115] },
  
  // Horsea family
  { chain: [116, 117, 230] }, // Horsea -> Seadra -> Kingdra
  
  // Goldeen family
  { chain: [118, 119] }, // Goldeen -> Seaking
  
  // Staryu family
  { chain: [120, 121] }, // Staryu -> Starmie
  
  // Mr. Mime family
  { chain: [439, 122] }, // Mime Jr. -> Mr. Mime
  
  // Scyther family
  { chain: [123, 212] }, // Scyther -> Scizor
  
  // Jynx family
  { chain: [238, 124] }, // Smoochum -> Jynx
  
  // Electabuzz family
  { chain: [239, 125, 466] }, // Elekid -> Electabuzz -> Electivire
  
  // Magmar family
  { chain: [240, 126, 467] }, // Magby -> Magmar -> Magmortar
  
  // Pinsir (no evolution)
  { chain: [127] },
  
  // Tauros (no evolution)
  { chain: [128] },
  
  // Magikarp family
  { chain: [129, 130] }, // Magikarp -> Gyarados
  
  // Lapras (no evolution)
  { chain: [131] },
  
  // Ditto (no evolution)
  { chain: [132] },
  
  // Eevee family
  { chain: [133, 134] }, // Eevee -> Vaporeon
  { chain: [133, 135] }, // Eevee -> Jolteon
  { chain: [133, 136] }, // Eevee -> Flareon
  { chain: [133, 196] }, // Eevee -> Espeon
  { chain: [133, 197] }, // Eevee -> Umbreon
  { chain: [133, 470] }, // Eevee -> Leafeon
  { chain: [133, 471] }, // Eevee -> Glaceon
  { chain: [133, 700] }, // Eevee -> Sylveon
  
  // Porygon family
  { chain: [137, 233, 474] }, // Porygon -> Porygon2 -> Porygon-Z
  
  // Omanyte family
  { chain: [138, 139] }, // Omanyte -> Omastar
  
  // Kabuto family
  { chain: [140, 141] }, // Kabuto -> Kabutops
  
  // Aerodactyl (no evolution)
  { chain: [142] },
  
  // Snorlax family
  { chain: [446, 143] }, // Munchlax -> Snorlax
  
  // Legendary birds (no evolution)
  { chain: [144] }, // Articuno
  { chain: [145] }, // Zapdos
  { chain: [146] }, // Moltres
  
  // Dratini family
  { chain: [147, 148, 149] }, // Dratini -> Dragonair -> Dragonite
  
  // Mewtwo (no evolution)
  { chain: [150] },
  
  // Mew (no evolution)
  { chain: [151] }
];

/**
 * Get full evolution chain for a Pokemon by its ID
 * @param {number} pokemonId - The ID of the Pokemon
 * @returns {number[]} Array of Pokemon IDs in the evolution chain
 */
const getEvolutionChain = (pokemonId) => {
  // Find the evolution chain containing this Pokemon
  const chain = evolutionChains.find(ec => ec.chain.includes(pokemonId));
  return chain ? chain.chain : [pokemonId]; // Return just the Pokemon itself if no chain found
};

export default getEvolutionChain; 