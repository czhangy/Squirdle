// Import model
let Pokemon = require("../models/pokemon.model.js");

// Gets a list of all Pokemon names => /api/pokemon/
exports.getPokemonNames = (req, res) => {
    // Fetch
    Pokemon.find({})
        .then((pokemonObjs) => {
            // Sort by dex number
            pokemonObjs = pokemonObjs.sort((a, b) => a.dex_num - b.dex_num);
            // Get names
            let pokemonList = pokemonObjs.map((pokemon) => pokemon.name);
            res.status(200).json(pokemonList);
        })
        .catch((err) => res.status(400).json("Error: " + err));
};

// Gets a Pokemon object, given the Pokemon's name => /api/pokemon/:name
exports.getPokemonByName = (req, res) => {
    // Fetch
    Pokemon.findOne({name: req.params.name})
        .then((pokemon) => {
            res.status(200).json(pokemon);
        })
        .catch((err) => res.status(400).json("Error: " + err));
};
