// Import global library
import axios from "axios";

// Define model
let state = {
	pokemonList: [],
	target: null,
};

// Define state modifiers
let mutations = {
	setPokemonList: (state, pokemonList) => {
		state.pokemonList = pokemonList;
	},
	setTarget: (state, newTarget) => {
		state.target = newTarget;
		localStorage.setItem("target", JSON.stringify(newTarget));
	},
};

// Define business logic
let actions = {
	fetchPokemonList: async ({ commit, state }) => {
		let pokemonList = [];
		await axios.get("/api/pokemon/").then((response) => {
			pokemonList = response.data;
		});
		commit("setPokemonList", pokemonList);
	},
	generateNewTarget: async ({ commit, state }, pokemonList) => {
		let newTarget;
		// Randomly select dex number
		const ind = Math.floor(Math.random() * 493);
		// Fetch target Pokemon by name
		await axios.get(`/api/pokemon/${pokemonList[ind]}`).then((response) => {
			newTarget = response.data;
		});
		commit("setTarget", newTarget);
	},
};

// Define getters
let getters = {
	pokemonList: (state) => state.pokemonList,
	target: (state) => state.target,
};

// Export
export default {
	state,
	mutations,
	actions,
	getters,
};
