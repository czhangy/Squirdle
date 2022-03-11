<template>
	<div id="squirdle">
		<GameOverModal
			v-if="target"
			ref="game-over-modal"
			:win="win"
			:numGuesses="numGuesses"
			:target="target"
		/>
		<ErrorModal ref="error-modal" />
		<GuessDropdown
			:pokemonList="pokemonList"
			:onError="displayError"
			:onSubmit="handleGuess"
		/>
		<GameGrid ref="game-grid" :ind="numGuesses" :target="target" />
	</div>
</template>

<script>
// Import global library
import axios from "axios";

// Import modal components
import GameOverModal from "@/components/modals/GameOverModal.vue";
import ErrorModal from "@/components/modals/ErrorModal.vue";

// Import game components
import GuessDropdown from "@/components/squirdle/GuessDropdown.vue";
import GameGrid from "@/components/squirdle/GameGrid.vue";

export default {
	name: "Squirdle",
	components: {
		ErrorModal,
		GameOverModal,
		GuessDropdown,
		GameGrid,
	},
	data() {
		return {
			// State
			pokemonList: [],
			win: true,
			numGuesses: 0,
			// Target
			target: null,
		};
	},
	methods: {
		// Fetch list of Pokemon
		fetchPokemonList: async function () {
			// Fetch
			await axios.get("/api/pokemon/").then((response) => {
				this.pokemonList = response.data;
			});
		},
		// Randomly select target Pokemon
		generateTarget: function () {
			// Randomly select dex number
			const ind = Math.floor(Math.random() * 151);
			// Fetch target Pokemon by name
			axios
				.get(`/api/pokemon/${this.pokemonList[ind]}`)
				.then((response) => {
					this.target = response.data;
					// Set info on game over modal
					this.$nextTick(() => {
						document.getElementById(
							"target-sprite"
						).src = `https://www.serebii.net/swordshield/pokemon/${this.target.dex_num
							.toString()
							.padStart(3, "0")}.png`;
						document.getElementById("target-name").innerHTML = `
				#${this.target.dex_num.toString().padStart(3, "0")}: 
				${this.target.name}`;
					});
				});
		},
		// Trigger error modal
		displayError: function (error) {
			this.$refs["error-modal"].openModal(error);
		},
		// Guess handler
		handleGuess: function (pokemon) {
            this.numGuesses++;
            // Check for win
			if (pokemon.name === this.target.name) this.handleGameOver(true);
			// Check for loss
			else if (this.numGuesses === 6) this.handleGameOver(false);
			else {
				// Update placeholder
				document.getElementById("guess-input").placeholder = `Guess ${
					this.numGuesses + 1
				} of 6`;
			}
            // Update display
            this.$refs["game-grid"].updateGrid(pokemon);
        },
		// Handle game end conditions
		handleGameOver: function (status) {
			const input = document.getElementById("guess-input");
			// Change placeholder
			document.getElementById("guess-input").placeholder = "";
			// Disable input
			input.disabled = true;
			document
				.getElementById("guess-button")
				.classList.remove("active-button");
			this.win = status;
			// Pop up loss modal
			setTimeout(() => {
				this.$refs["game-over-modal"].openModal();
			}, 2500);
		},
	},
	mounted: async function () {
		await this.fetchPokemonList();
		this.generateTarget();
	},
};
</script>

<style lang="scss" scoped>
#squirdle {
	// Spacing
	padding: 64px;
}
</style>
