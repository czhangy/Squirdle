// Define model
let state = {
	gameOver: false,
};

// Define state modifiers
let mutations = {
	startGame: (state) => {
		state.gameOver = false;
	},
	endGame: (state) => {
		state.gameOver = true;
	},
};

// Define getters
let getters = {
	gameOver: (state) => state.gameOver,
};

// Export
export default {
	state,
	mutations,
	getters,
};
