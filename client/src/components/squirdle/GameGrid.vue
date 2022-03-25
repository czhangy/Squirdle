<template>
	<div id="game-grid">
		<div id="game-grid-labels">
			<label class="game-grid-label">Guess</label>
			<label class="game-grid-label">Gen</label>
			<label class="game-grid-label">Type</label>
			<label class="game-grid-label">Stage</label>
			<label class="game-grid-label">Length</label>
		</div>
		<hr id="separator" />
		<div id="game-grid-container">
			<GameRow :pokemon="guess" v-for="(guess, i) in guesses" :key="i" />
		</div>
	</div>
</template>

<script>
// Import global constants
import { VISIBLE_SIZE, MAX_GUESSES } from "@/constants.js";

// Import Vuex functions for game state
import { mapGetters } from "vuex";

// Import local component
import GameRow from "@/components/squirdle/GameRow.vue";

export default {
	name: "GameGrid",
	components: {
		GameRow,
	},
	data() {
		return {
			// Global constants
			VISIBLE_SIZE,
			MAX_GUESSES,
			// State
			guesses: Array(6).fill(null),
		};
	},
	methods: {
		// Main function
		updateGrid: function (pokemon) {
			this.assignRows(pokemon);
			this.scrollGrid();
		},
		// Reset function
		resetGrid: function () {
			// Reset component state
			this.guesses = Array(6).fill(null);
		},
		// Assign Pokemon to rows and create new rows if necessary
		assignRows: function (pokemon) {
			// Assign to the first unassigned row
			this.guesses[this.numGuesses - 1] = pokemon;
			// Make new row if necessary and allowed
			if (
				this.numGuesses === this.guesses.length &&
				this.guesses.length !== MAX_GUESSES
			)
				this.guesses.push(null);
		},
		// Handle grid scroll if out of view
		scrollGrid: function () {
			if (
				this.numGuesses >= VISIBLE_SIZE &&
				this.numGuesses <= MAX_GUESSES
			) {
				// Delay to allow new row to render
				this.$nextTick(() => {
					// Delay to allow current row to finish animation
					setTimeout(() => {
                        // Scroll newest row to bottom of grid
						document
							.getElementsByClassName("game-row")
							[this.guesses.length - 1].scrollIntoView({
								behavior: "smooth",
								block: "end",
							});
					}, 1750);
				});
			}
		},
	},
	computed: {
		// Map Vuex functions for game state
		...mapGetters(["lightMode", "gameOver", "numGuesses", "target"]),
	},
	watch: {
		gameOver: function () {
			if (!this.gameOver) this.resetGrid();
		},
		lightMode: function () {
			this.$updateLightMode("#game-grid");
		},
	},
	mounted: function () {
		this.$updateLightMode("#game-grid");
	},
};
</script>

<style lang="scss" scoped>
#game-grid {
	margin: 0 auto;
	width: 350px;

	#game-grid-labels {
		display: flex;
		justify-content: space-between;

		.game-grid-label {
			color: $accent-color;
			letter-spacing: 2px;
			width: 65px;
		}
	}

	#separator {
		height: 1px;
		background: $accent-color;
		margin: 10px 0;
		border: none;
	}

	#game-grid-container {
		height: 420px;
		overflow-y: scroll;
	}

	::-webkit-scrollbar {
		// Disable scrollbar
		display: none;
	}
}

#game-grid.light-mode {
	#game-grid-labels > .game-grid-label {
		color: $light-accent-color;
	}

	#separator {
		background: $light-accent-color;
	}
}
</style>
