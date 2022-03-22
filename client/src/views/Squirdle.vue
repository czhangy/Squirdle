<template>
	<div id="squirdle">
		<ErrorModal ref="error-modal" :errorCode="errorCode" />
		<GuessDropdown :onError="displayError" :onSubmit="handleGuess" />
		<GameGrid ref="game-grid" />
	</div>
</template>

<script>
// Import global constants
import { MAX_GUESSES } from "@/constants.js";

// Vuex
import { mapMutations, mapActions, mapGetters } from "vuex";

// Import modal components
import ErrorModal from "@/components/modals/ErrorModal.vue";

// Import game components
import GuessDropdown from "@/components/squirdle/GuessDropdown.vue";
import GameGrid from "@/components/squirdle/GameGrid.vue";

export default {
	name: "Squirdle",
	components: {
		ErrorModal,
		GuessDropdown,
		GameGrid,
	},
	data() {
		return {
			// Global constants
			MAX_GUESSES,
			// State
			errorCode: 0,
		};
	},
	methods: {
		// Map Vuex functions
		...mapMutations(["incrementGuesses", "endGame"]),
		...mapActions(["fetchPokemonList", "generateNewTarget"]),
		// Trigger error modal
		displayError: function (errorCode) {
			this.errorCode = errorCode;
			this.$refs["error-modal"].openModal();
		},
		// Guess handler
		handleGuess: function (pokemon) {
			this.incrementGuesses();
			// Check for game over
			if (
				pokemon.name === this.target.name ||
				this.numGuesses === MAX_GUESSES
			)
				this.handleGameOver(pokemon.name === this.target.name);
			// Update display
			this.$refs["game-grid"].updateGrid(pokemon);
		},
		// Handle game end conditions
		handleGameOver: function (win) {
			// Disable input fields
			const input = document.getElementById("guess-input");
			input.placeholder = "";
			input.disabled = true;
			document.getElementById("guess-button").disabled = true;
			// "Catch" Pokemon if win
			if (win) {
				let caught = JSON.parse(localStorage.caught);
				caught.push(this.target.dex_num - 1);
				localStorage.setItem("caught", JSON.stringify(caught));
			}
			// Pop up user modal
			setTimeout(() => {
				this.endGame();
			}, 2500);
		},
	},
	computed: {
		// Map Vuex functions
		...mapGetters(["numGuesses", "gameOver", "pokemon", "target"]),
	},
	mounted: async function () {
		// Initial fetch of all pokemon
		if (this.pokemon.length === 0) await this.fetchPokemonList();
		this.generateNewTarget(this.pokemon);
	},
};
</script>

<style lang="scss" scoped>
#squirdle {
	padding: 64px 0;
	overflow-y: hidden;
}

// Mobile layout
@media screen and (max-width: $mobile) {
	#squirdle {
		padding: 32px 0;
	}
}
</style>
