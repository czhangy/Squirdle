// Import PokeAPI
const Pokedex = require("pokeapi-js-wrapper");
const P = new Pokedex.Pokedex();

// Gets a list of all Pokemon => /api/pokemon/
exports.getAllPokemon = async (req, res) => {
    // Get all Gen IV Pokemon
    const interval = {
        limit: 151,
        offset: 0,
    };
    // Fetch from PokeAPI
    P.getPokemonsList(interval)
        .then((response) => {
            return res.status(200).json(response);
        })
        .catch((err) => {
            return res.status(400).json("Error: " + err);
        });
};

// Gets a Pokemon object by name => /api/pokemon/:name
exports.getPokemonByName = async (req, res) => {
    // Get Pokemon name
    const name = req.params.name;
    // Fetch from PokeAPI
    P.getPokemonByName(name)
        .then((response) => {
            return res.status(200).json(response);
        })
        .catch((err) => {
            return res.status(400).json("Error: " + err);
        });
};
