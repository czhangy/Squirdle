// Import Express routing
const router = require('express').Router();

// Import controller
const PokemonCtrl = require('../controllers/pokemon.controller.js');

// Define routes
router.get("/", PokemonCtrl.getAllPokemon);
router.get("/pokemon/:name", PokemonCtrl.getPokemonByName);

// Export router
module.exports = router;
