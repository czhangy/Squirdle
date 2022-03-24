// Define model
let state = {
    numGuesses: 0,
	gameOver: false,
    lightMode: false,
    hardMode: false,
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
    setLightMode: (state, status) => {
        state.lightMode = status;
    },
    setHardMode: (state, status) => {
        state.hardMode = status;
    },
};

// Define getters
let getters = {
    numGuesses: (state) => state.numGuesses,
	gameOver: (state) => state.gameOver,
	lightMode: (state) => state.lightMode,
	hardMode: (state) => state.hardMode,
};

// Export
export default {
	state,
	mutations,
	getters,
};
