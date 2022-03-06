// Import model
let Pokemon = require("../models/pokemon.model.js");

// Gets a list of all Pokemon => /api/pokemon/
exports.getAllPokemon = (req, res) => {
	// Fetch
	Pokemon.find({})
		.then((pokemon) => res.status(200).json(pokemon))
		.catch((err) => res.status(400).json("Error: " + err));
};
