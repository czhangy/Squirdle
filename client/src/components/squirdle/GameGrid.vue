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
			<GameRow
				v-for="(contents, i) in rowContents"
				:key="i"
				:pokemon="contents"
			/>
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
			rowContents: Array(MAX_GUESSES).fill(null),
		};
	},
	methods: {
		// Main function
		updateGrid: function () {
			this.assignRows(this.storedGuesses.length - 1);
			this.scrollGrid();
		},
		// Reset function
		resetGrid: function () {
			this.rowContents = Array(MAX_GUESSES).fill(null);
		},
		// Persist function
		persistGrid: function () {
			for (let i = 0; i < this.storedGuesses.length; i++)
				this.assignRows(i);
			this.scrollGrid();
		},
		// Assign Pokemon to rows and create new rows if necessary
		assignRows: function (ind) {
			// Assign newest guess to the first unassigned row
			this.rowContents[ind] = this.storedGuesses[ind];
		},
		// Handle grid scroll if out of view
		scrollGrid: function () {
			if (
				this.storedGuesses.length >= VISIBLE_SIZE &&
				this.storedGuesses.length <= MAX_GUESSES
			) {
				// Delay to allow new row to render
				this.$nextTick(() => {
					// Delay to allow current row to finish animation
					setTimeout(() => {
						// Scroll newest row to bottom of grid
						document
							.getElementsByClassName("game-row")
							[this.storedGuesses.length].scrollIntoView({
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
		...mapGetters(["lightMode", "gameOver", "storedGuesses", "target"]),
	},
	watch: {
		// Reset component state on game reset
		gameOver: function () {
			if (!this.gameOver) this.resetGrid();
		},
		// Change styling to light mode on toggle
		lightMode: function () {
			this.$updateLightMode("#game-grid");
		},
		// Update grid on persist
		storedGuesses: function () {
			this.persistGrid();
		},
	},
	mounted: function () {
		// Change styling to light mode on mount
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
