<template>
	<div id="squirdle">
		<ErrorModal ref="error-modal" />
		<GuessDropdown
			:pokemonList="pokemon"
			:onError="displayError"
			:onSubmit="handleGuess"
		/>
		<GameGrid ref="game-grid" :ind="numGuesses" :target="target" />
	</div>
</template>

<script>
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
			// State
			numGuesses: 0,
		};
	},
	methods: {
		// Map Vuex functions
		...mapMutations(["endGame"]),
		...mapActions(["fetchPokemonList", "generateNewTarget"]),
		// Translate edge cases
		translateName: function (name) {
			if (name === "mr. mime") return "mr.mime";
			else if (name === "mime jr.") return "mime_jr";
			else if (name === "farfetch’d") return "farfetchd";
			else return name;
		},
		// Trigger error modal
		displayError: function (error) {
			this.$refs["error-modal"].openModal(error);
		},
		// Guess handler
		handleGuess: function (pokemon) {
			this.numGuesses++;
			// Check for game over
			if (pokemon.name === this.target.name || this.numGuesses === 8)
				this.handleGameOver();
			else {
				// Update placeholder
				document.getElementById("guess-input").placeholder = `Guess ${
					this.numGuesses + 1
				} of 8`;
			}
			// Update display
			this.$refs["game-grid"].updateGrid(pokemon, this.numGuesses);
		},
		// Handle game end conditions
		handleGameOver: function () {
			const input = document.getElementById("guess-input");
			// Change placeholder
			document.getElementById("guess-input").placeholder = "";
			// Disable input
			input.disabled = true;
			document
				.getElementById("guess-button")
				.classList.remove("active-button");
			// Pop up loss modal
			setTimeout(() => {
				this.endGame();
			}, 2500);
		},
	},
	computed: {
		// Map Vuex functions
		...mapGetters(["gameOver", "pokemon", "target"]),
	},
	mounted: async function () {
		// Initial fetch of all pokemon
		await this.fetchPokemonList();
		// Initial target generation
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
