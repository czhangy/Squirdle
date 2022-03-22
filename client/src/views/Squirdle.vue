<template>
	<div id="squirdle">
		<ErrorModal ref="error-modal" :errorCode="errorCode" />
		<GuessDropdown
			v-if="!gameOver"
			:onError="displayError"
			:onSubmit="handleGuess"
		/>
		<button v-else id="reset-button" @click="handleGameReset">Reset</button>
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
		...mapMutations([
			"resetGuesses",
			"incrementGuesses",
			"startGame",
			"endGame",
		]),
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
				// Add to streak
				let streak = localStorage.streak;
				streak++;
				localStorage.setItem("streak", streak);
			}
			// Reset streak
			else localStorage.setItem("streak", 0);
			// Mark Pokemon as "seen"
			let seen = JSON.parse(localStorage.seen);
			seen.push(this.target.dex_num - 1);
			localStorage.setItem("seen", JSON.stringify(seen));
			// Pop up user modal
			setTimeout(() => {
				this.endGame();
			}, 2500);
		},
		// Handle game reset conditions
		handleGameReset: function () {
			// Generate a new target Pokemon
			this.generateNewTarget(this.pokemon);
			// Update Vuex state
			this.startGame();
			this.resetGuesses();
			// Re-enable input fields
			// const input = document.getElementById("guess-input");
			// input.placeholder = `Guess 1 of ${MAX_GUESSES}`;
			// input.disabled = false;
			// document.getElementById("guess-button").disabled = false;
			// Reset grid
			const tileContainers =
				document.getElementsByClassName("game-tile-inner");
			const tiles = document.getElementsByClassName("game-tile-back");
			for (let i = 0; i < tiles.length; i++) {
				tileContainers[i].classList.remove("rotated");
				tiles[i].classList.remove("hint");
				tiles[i].classList.remove("correct");
			}
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

	#reset-button {
		height: 60px;
		width: 350px;
		font-family: $alt-font;
		color: $accent-color;
		font-size: 2rem;
		letter-spacing: 1px;
        line-height: 2rem;
        border: 2px solid $accent-color;
        background: $main-color;
        margin-bottom: 36px;
        cursor: pointer;
	}
}

// Mobile layout
@media screen and (max-width: $mobile) {
	#squirdle {
		padding: 32px 0;

		#reset-button {
			height: 45px;
			font-size: 1.5rem;
		}
	}
}

// Sticky hover
@media (hover: hover) {
    #squirdle > #reset-button:hover {
        background: $accent-color;
        border: none;
        color: $main-color;
    }
}
</style>
