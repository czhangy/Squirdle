<template>
	<div id="squirdle">
		<GameOverModal
			v-if="target"
			ref="game-over-modal"
			:target="target"
			:gameOver="gameOver"
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
			gameOver: false,
			numGuesses: 0,
			// Target
			target: null,
		};
	},
	methods: {
		// Translate edge cases
		translateName: function (name) {
			if (name === "mr. mime") return "mr.mime";
			else if (name === "mime jr.") return "mime_jr";
			else if (name === "farfetch’d") return "farfetchd";
			else return name;
		},
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
			const ind = Math.floor(Math.random() * 493);
			// Fetch target Pokemon by name
			axios
				.get(`/api/pokemon/${this.pokemonList[ind]}`)
				.then((response) => {
					this.target = response.data;
				});
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
				this.handleGameOver(true);
			else {
				let button = document.getElementById("guess-button");
				// Update placeholder
				document.getElementById("guess-input").placeholder = `Guess ${
					this.numGuesses + 1
				} of 8`;
				// Disable button temporarily
				button.disabled = true;
				button.classList.remove("active-button");
				setTimeout(() => {
					button.disabled = false;
					button.classList.add("active-button");
				}, 1000);
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
			this.gameOver = true;
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
