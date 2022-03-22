// Define model
let state = {
    numGuesses: 0,
	gameOver: false,
};

// Define state modifiers
let mutations = {
    resetGuesses: (state) => {
        state.numGuesses = 0;
    },
    incrementGuesses: (state) => {
        state.numGuesses++;
    },
	startGame: (state) => {
		state.gameOver = false;
	},
	endGame: (state) => {
		state.gameOver = true;
	},
};

// Define getters
let getters = {
    numGuesses: (state) => state.numGuesses,
	gameOver: (state) => state.gameOver,
};

// Export
export default {
	state,
	mutations,
	getters,
};
