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
			<div class="game-grid-row" v-for="i in numRows" :key="i">
				<GameTile :tileType="SPRITE" />
				<GameTile :tileType="TEXT" />
				<GameTile
					v-if="guessTypes[i - 1] === MONOTYPE"
					:tileType="MONOTYPE"
				/>
				<GameTile v-else :tileType="DUALTYPE" />
				<GameTile :tileType="TEXT" />
				<GameTile :tileType="TEXT" />
			</div>
		</div>
	</div>
</template>

<script>
// Import global constants
import {
	VISIBLE_SIZE,
	MAX_GUESSES,
	SPRITE,
	TEXT,
	MONOTYPE,
	DUALTYPE,
} from "@/constants.js";

// Import Vuex functions for game state
import { mapMutations, mapGetters } from "vuex";

// Import local component
import GameTile from "@/components/squirdle/GameTile.vue";

export default {
	name: "GameGrid",
	components: {
		GameTile,
	},
	data() {
		return {
			// Global constants
			VISIBLE_SIZE,
			MAX_GUESSES,
			SPRITE,
			TEXT,
			MONOTYPE,
			DUALTYPE,
			// State
			numRows: 6,
			guessTypes: [],
			numDualtypes: 0,
		};
	},
	methods: {
		// Map Vuex functions for updating past close/correct statuses
		...mapMutations(["updateCorrect", "updateClose"]),
		// Update the game board
		updateGrid: function (pokemon) {
			// Add to type information for indexing
			this.guessTypes[this.numGuesses - 1] =
				pokemon.type_2 === "" ? MONOTYPE : DUALTYPE;
			// Update tile display data
			this.updateSpriteTile(pokemon);
			this.updateTextTiles(pokemon);
			this.updateTypeTile(pokemon);
			// Update tile colors
			this.setTileStatuses(pokemon);
			// Flip tiles
			this.flipTiles();
			// Scroll up if needed
			this.scrollGrid();
		},
		// Update sprite tile
		updateSpriteTile: function (pokemon) {
			// Fetch box sprite
			document.getElementsByClassName("tile-sprite")[
				this.numGuesses - 1
			].src = `https://www.serebii.net/pokedex-swsh/icon/${this.$formatDexNum(
				pokemon.dex_num
			)}.png`;
		},
		// Update text tiles
		updateTextTiles: function (pokemon) {
			const baseInd = (this.numGuesses - 1) * 3;
			const textTiles = document.getElementsByClassName("tile-text");
			// Update gen tile
			textTiles[baseInd].innerHTML = this.$intToRoman(pokemon.gen);
			// Update stage tile
			textTiles[baseInd + 1].innerHTML = this.$intToRoman(pokemon.stage);
			// Update length tile
			textTiles[baseInd + 2].innerHTML = pokemon.name.length;
		},
		// Update type tile
		updateTypeTile: function (pokemon) {
			// Check if mono or dual type
			if (this.guessTypes[this.numGuesses - 1] === DUALTYPE) {
				// Handle primary type
				document.getElementsByClassName("monotype")[
					this.numGuesses - 1
				].src = `https://www.serebii.net/pokedex-bw/type/${pokemon.type_1}.gif`;
				// Handle secondary type
				document.getElementsByClassName("dualtype")[
					this.numDualtypes
				].src = `https://www.serebii.net/pokedex-bw/type/${pokemon.type_2}.gif`;
				// Track number of dualtype guesses
				this.numDualtypes++;
			} else {
				// Delay to prevent overwriting of src
				this.$nextTick(() => {
					document.getElementsByClassName("monotype")[
						this.numGuesses - 1
					].src = `https://www.serebii.net/pokedex-bw/type/${pokemon.type_1}.gif`;
				});
			}
		},
		// Set status of tiles
		setTileStatuses: function (pokemon) {
			const baseInd = (this.numGuesses - 1) * 5;
			const tiles = document.getElementsByClassName("game-tile-back");
			// Update sprite tile
			if (pokemon.name === this.target.name)
				tiles[baseInd].classList.add("correct");
			// Update generation tile
			if (this.$isCorrectGen(pokemon, this.target)) {
				tiles[baseInd + 1].classList.add("correct");
				this.updateCorrect(0);
			} else if (this.$isCloseGen(pokemon, this.target)) {
				tiles[baseInd + 1].classList.add("close");
				this.updateClose(0);
			}
			// Update type tile, delay to prevent style overwrite on img render
			this.$nextTick(() => {
				if (this.$isCorrectType(pokemon, this.target)) {
					tiles[baseInd + 2].classList.add("correct");
					this.updateCorrect(1);
				} else if (this.$isCloseType(pokemon, this.target)) {
					tiles[baseInd + 2].classList.add("close");
					this.updateClose(1);
				}
			});
			// Update stage tile
			if (this.$isCorrectStage(pokemon, this.target)) {
				tiles[baseInd + 3].classList.add("correct");
				this.updateCorrect(2);
			} else if (this.$isCloseStage(pokemon, this.target)) {
				tiles[baseInd + 3].classList.add("close");
				this.updateClose(2);
			}
			// Update length tile
			if (this.$isCorrectLength(pokemon, this.target)) {
				tiles[baseInd + 4].classList.add("correct");
				this.updateCorrect(3);
			} else if (this.$isCloseLength(pokemon, this.target)) {
				tiles[baseInd + 4].classList.add("close");
				this.updateClose(3);
			}
		},
		// Flip tiles animation
		flipTiles: function () {
			const baseInd = (this.numGuesses - 1) * 5;
			const tiles = document.getElementsByClassName("game-tile-inner");
			// Start animation at 0.25s intervals
			for (let i = 0; i < 5; i++)
				setTimeout(() => {
					tiles[baseInd + i].classList.add("rotated");
				}, 250 * (i + 1));
		},
		// Handle grid scroll if out of view
		scrollGrid: function () {
			if (
				this.numGuesses >= VISIBLE_SIZE &&
				this.numGuesses < MAX_GUESSES
			) {
				this.numRows++;
				this.$nextTick(() => {
					setTimeout(() => {
						document
							.getElementsByClassName("game-grid-row")
							[this.numGuesses].scrollIntoView({
								behavior: "smooth",
								block: "end",
							});
					}, 1750);
				});
			}
		},
		// Reset grid state
		resetGrid: function () {},
	},
	computed: {
		// Map Vuex functions
		...mapGetters(["lightMode", "gameOver", "numGuesses", "target"]),
	},
	watch: {
		gameOver: function () {
			if (!this.gameOver) {
				// Reset component state
				this.numRows = 6;
				this.guessTypes = [];
				this.numDualtypes = 0;
			}
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

		.game-grid-row {
			margin-bottom: 5px;
			display: flex;
			justify-content: space-between;
		}
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
