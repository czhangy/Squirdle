// Import Express routing
const router = require('express').Router();

// Import controller
const PokemonCtrl = require('../controllers/pokemon.controller.js');

// Define routes
router.get("/", PokemonCtrl.getPokemonNames);
router.get("/:name", PokemonCtrl.getPokemonByName);

// Export router
module.exports = router;
