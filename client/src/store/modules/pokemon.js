// Import global library
import axios from "axios";

// Define model
let state = {
	pokemon: [],
	target: null,
};

// Define state modifiers
let mutations = {
	setPokemon: (state, pokemon) => {
		state.pokemon = pokemon;
	},
	setTarget: (state, newTarget) => {
		state.target = newTarget;
	},
};

// Define business logic
let actions = {
	fetchPokemonList: async ({ commit, state }) => {
		let pokemon = [];
		await axios.get("/api/pokemon/").then((response) => {
			pokemon = response.data;
		});
		commit("setPokemon", pokemon);
	},
	generateNewTarget: async ({ commit, state }, pokemon) => {
        let newTarget;
		// Randomly select dex number
		const ind = Math.floor(Math.random() * 493);
		// Fetch target Pokemon by name
		await axios.get(`/api/pokemon/${pokemon[ind]}`).then((response) => {
			newTarget = response.data;
		});
        commit("setTarget", newTarget);
	},
};

// Define getters
let getters = {
	pokemon: (state) => state.pokemon,
	target: (state) => state.target,
};

// Export
export default {
	state,
	mutations,
	actions,
	getters,
};
