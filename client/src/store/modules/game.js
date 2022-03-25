// Define model
let state = {
	numGuesses: 0,
	gameOver: false,
	correctFound: [false, false, false, false],
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
	updateCorrectFound: (state, ind) => {
		state.correctFound[ind] = true;
	},
	startGame: (state) => {
		state.gameOver = false;
		state.correct = [false, false, false, false];
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
	correctFound: (state) => state.correctFound,
	lightMode: (state) => state.lightMode,
	hardMode: (state) => state.hardMode,
};

// Export
export default {
	state,
	mutations,
	getters,
};
