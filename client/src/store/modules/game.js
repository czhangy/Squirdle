// Define model
let state = {
	storedGuesses: [],
	gameOver: false,
	correctFound: [false, false, false, false],
	lightMode: false,
	hardMode: false,
};

// Define state modifiers
let mutations = {
	startGame: (state) => {
		state.gameOver = false;
		localStorage.setItem("gameOver", "false");
		state.correctFound = [false, false, false, false];
		localStorage.setItem(
			"correctFound",
			JSON.stringify(state.correctFound)
		);
		state.storedGuesses = [];
		localStorage.setItem("storedGuesses", JSON.stringify([]));
	},
	endGame: (state) => {
		state.gameOver = true;
		localStorage.setItem("gameOver", "true");
	},
	setGame: (state) => {
		state.gameOver = JSON.parse(localStorage.gameOver);
		state.correctFound = JSON.parse(localStorage.correctFound);
		state.storedGuesses = JSON.parse(localStorage.storedGuesses);
	},
	storeGuess: (state, guess) => {
		state.storedGuesses.push(guess);
		// Store guess into local storage history
		let storedGuesses = localStorage.storedGuesses
			? JSON.parse(localStorage.storedGuesses)
			: [];
		storedGuesses.push(guess);
		localStorage.setItem("storedGuesses", JSON.stringify(storedGuesses));
	},
	updateCorrectFound: (state, ind) => {
		state.correctFound[ind] = true;
		let correctFound = localStorage.correctFound
			? JSON.parse(localStorage.correctFound)
			: [false, false, false, false];
		correctFound[ind] = true;
		localStorage.setItem("correctFound", JSON.stringify(correctFound));
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
	storedGuesses: (state) => state.storedGuesses,
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
