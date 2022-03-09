<template>
	<div id="squirdle">
		<Modal id="game-over-modal" :onClose="closeGameOverModal">
			<GameOver
				v-if="targetObj"
				:win="win"
				:guesses="guesses.length"
				:target="targetObj"
			/>
		</Modal>
		<form id="guess" @submit.prevent="submitGuess">
			<input
				id="guess-input"
				type="search"
				list="guess-list"
				placeholder="Guess 1 of 6"
				spellcheck="false"
				v-model="guess"
			/>
			<datalist id="guess-list">
				<option v-for="(pokemon, i) in pokemonObjs" :key="i">
					{{ pokemon.name }}
				</option>
			</datalist>
			<input
				type="submit"
				id="guess-button"
				class="active-button"
				value="→"
			/>
		</form>
		<div id="game-grid">
			<div id="game-grid-labels">
				<label class="game-grid-label">Guess</label>
				<label class="game-grid-label">Gen</label>
				<label class="game-grid-label">Type</label>
				<label class="game-grid-label">Stage</label>
				<label class="game-grid-label">Color</label>
			</div>
			<hr id="separator" />
			<div class="game-grid-row" v-for="i in 6" :key="i">
				<GameTile type="sprite" />
				<GameTile />
				<GameTile v-if="guessTypes[i - 1]" type="monotype" />
				<GameTile v-else type="dualtype" />
				<GameTile />
				<GameTile type="color" />
			</div>
		</div>
	</div>
</template>

<script>
// Import global library
import axios from "axios";

// Import components
import Modal from "@/components/Modal.vue";
import GameOver from "@/components/GameOver.vue";
import GameTile from "@/components/GameTile.vue";

export default {
	name: "Squirdle",
	components: {
		Modal,
		GameOver,
		GameTile,
	},
	data() {
		return {
			// Global vars
			INVALID: 0,
			DUPLICATE: 1,
			VALID: 2,
			// State
			guess: "",
			pokemonObjs: null,
			guesses: [],
			guessTypes: [],
			numDualtypes: 0,
			win: true,
			// Target
			targetObj: {},
		};
	},
	methods: {
		// Fetch list of Pokemon
		fetchPokemonList: async function () {
			// Fetch
			await axios.get("/api/pokemon").then(async (response) => {
				// Sort by dex number
				this.pokemonObjs = response.data.sort(
					(a, b) => a.dex_num - b.dex_num
				);
			});
		},
		// Randomly select target Pokemon
		generateTarget: function () {
			const ind = Math.floor(Math.random() * 151) + 1;
			this.targetObj = this.pokemonObjs[ind];
			// Set info on game over modal
			document.getElementById(
				"target-sprite"
			).src = `https://www.serebii.net/swordshield/pokemon/${this.targetObj.dex_num
				.toString()
				.padStart(3, "0")}.png`;
			document.getElementById("target-name").innerHTML = `
				#${this.targetObj.dex_num.toString().padStart(3, "0")}: 
				${this.targetObj.name}`;
		},
		// On submit
		submitGuess: function () {
			// Guess is not a valid Pokemon
			if (this.validateGuess() === this.INVALID) {
				// Pokemon has already been guessed
			} else if (this.validateGuess() === this.DUPLICATE) {
			} else {
				// Guess is valid
				this.updateGrid();
				this.updateGuess();
			}
		},
		// Handle validation
		validateGuess: function () {
			const validNames = this.pokemonObjs.map((pokemon) => pokemon.name);
			const guess = this.guess;
			if (!validNames.includes(guess)) return this.INVALID;
			else if (this.guesses.includes(guess)) return this.DUPLICATE;
			else return this.VALID;
		},
		// Update the game board
		updateGrid: function () {
			// Find in array
			const ind = this.pokemonObjs.findIndex(
				(obj) => obj.name === this.guess
			);
			// Add to types
			this.guessTypes[this.guesses.length] =
				this.pokemonObjs[ind].type_2 === "" ? true : false;
			// Update display data
			this.updateSpriteTile(ind);
			this.updateTextTiles(this.pokemonObjs[ind]);
			this.updateTypeTile(this.pokemonObjs[ind]);
			// Update tile statuses
			this.setTileStatuses(this.pokemonObjs[ind]);
			// Flip tiles
			this.flipTiles();
		},
		// Update sprite tile
		updateSpriteTile: function (ind) {
			const dexNum = (ind + 1).toString().padStart(3, "0");
			// Fetch box sprite
			document.getElementsByClassName("sprite")[
				this.guesses.length
			].src = `https://www.serebii.net/pokedex-swsh/icon/${dexNum}.png`;
		},
		// Update text tiles
		updateTextTiles: function (pokemon) {
			const baseInd = this.guesses.length * 3;
			const textTiles = document.getElementsByClassName("text");
			// Update gen tile
			textTiles[baseInd].innerHTML = this.intToRoman(pokemon.gen);
			// Update stage tile
			textTiles[baseInd + 1].innerHTML = this.intToRoman(pokemon.stage);
			// Update color tile
			textTiles[baseInd + 2].innerHTML = pokemon.color;
		},
		// Update type tile
		updateTypeTile: function (pokemon) {
			const primaryType = pokemon.type_1.toLowerCase();
			// Check if mono or dual type
			if (pokemon.type_2 !== "") {
				const secondaryType = pokemon.type_2.toLowerCase();
				// Handle primary type
				document.getElementsByClassName("monotype")[
					this.guesses.length
				].src = `https://www.serebii.net/pokedex-bw/type/${primaryType}.gif`;
				// Handle secondary type
				document.getElementsByClassName("dualtype")[
					this.numDualtypes
				].src = `https://www.serebii.net/pokedex-bw/type/${secondaryType}.gif`;
				this.numDualtypes++;
			} else {
				this.$nextTick(() => {
					document.getElementsByClassName("monotype")[
						this.guesses.length - 1
					].src = `https://www.serebii.net/pokedex-bw/type/${primaryType}.gif`;
				});
			}
		},
		// Convert numbers to roman numerals
		intToRoman: function (num) {
			switch (num) {
				case 1:
					return "I";
				case 2:
					return "II";
				case 3:
					return "III";
				case 4:
					return "IV";
				case 5:
					return "V";
				case 6:
					return "VI";
				case 7:
					return "VII";
				case 8:
					return "VIII";
			}
		},
		// Set status of tiles
		setTileStatuses: function (pokemon) {
			const baseInd = this.guesses.length * 5;
			const tiles = document.getElementsByClassName("game-tile-back");
			// Update sprite tile
			if (this.guess === this.targetObj.name)
				tiles[baseInd].classList.add("correct");
			// Update generation tile
			if (pokemon.gen === this.targetObj.gen)
				tiles[baseInd + 1].classList.add("correct");
			else if (Math.abs(pokemon.gen - this.targetObj.gen) === 1)
				tiles[baseInd + 1].classList.add("hint");
			// Update type tile
			this.$nextTick(() => {
				if (
					pokemon.type_1 === this.targetObj.type_1 &&
					pokemon.type_2 === this.targetObj.type_2
				)
					tiles[baseInd + 2].classList.add("correct");
				else if (
					pokemon.type_1 === this.targetObj.type_2 ||
					pokemon.type_1 === this.targetObj.type_1 ||
					pokemon.type_2 === this.targetObj.type_1 ||
					pokemon.type_2 === this.targetObj.type_2
				)
					tiles[baseInd + 2].classList.add("hint");
			});
			// Update stage tile
			if (pokemon.stage === this.targetObj.stage)
				tiles[baseInd + 3].classList.add("correct");
			else if (Math.abs(pokemon.stage - this.targetObj.stage) === 1)
				tiles[baseInd + 3].classList.add("hint");
			// Update color tile
			if (pokemon.color === this.targetObj.color)
				tiles[baseInd + 4].classList.add("correct");
			else if (this.similarColor(pokemon.color))
				tiles[baseInd + 4].classList.add("hint");
		},
		// Define what colors are similar
		similarColor: function (color) {
			const targetColor = this.targetObj.color;
			switch (color) {
				case "Red":
					return (
						targetColor === "Brown" ||
						targetColor === "Yellow" ||
						targetColor === "Pink"
					);
				case "Blue":
					return targetColor === "Purple" || targetColor === "Green";
				case "Yellow":
					return targetColor === "Red";
				case "Green":
					return targetColor === "Blue";
				case "Black":
					return targetColor === "Brown" || targetColor === "Gray";
				case "Brown":
					return targetColor === "Black" || targetColor === "Red";
				case "Purple":
					return targetColor === "Blue" || targetColor === "Red";
				case "Gray":
					return targetColor === "Black" || targetColor === "White";
				case "White":
					return targetColor === "Gray";
				case "Pink":
					return targetColor === "Red";
			}
		},
		// Flip tiles animation
		flipTiles: function () {
			const baseInd = this.guesses.length * 5;
			const tiles = document.getElementsByClassName("game-tile-inner");
			// Start animation at 0.25s intervals
			for (let i = 0; i < 5; i++)
				setTimeout(function () {
					tiles[baseInd + i].classList.add("rotated");
				}, 250 * (i + 1));
		},
		// Update guess
		updateGuess: function () {
			// Add to prior guesses
			this.guesses.push(this.guess);
			// Get object for comparison
			const pokemon = this.pokemonObjs.find(
				(obj) => obj.name === this.guess
			);
			// Check for win
			if (pokemon === this.targetObj) this.handleWin();
			else if (this.guesses.length === 6)
				// Check for loss
				this.handleLoss();
			else {
				// Update placeholder
				document.getElementById("guess-input").placeholder = `Guess ${
					this.guesses.length + 1
				} of 6`;
			}

			// Clear guess
			this.guess = "";
		},
		// Handle game end conditions
		handleWin: function () {
			const input = document.getElementById("guess-input");
			// Change placeholder
			input.placeholder = "";
			// Disable input
			input.disabled = true;
			document
				.getElementById("guess-button")
				.classList.remove("active-button");
			// Pop up win modal
			setTimeout(() => {
				this.openGameOverModal();
			}, 2500);
		},
		handleLoss: function () {
			const input = document.getElementById("guess-input");
			// Change placeholder
			document.getElementById("guess-input").placeholder = "";
			// Disable input
			input.disabled = true;
			document
				.getElementById("guess-button")
				.classList.remove("active-button");
			this.win = false;
			// Pop up loss modal
			setTimeout(() => {
				this.openGameOverModal();
			}, 2500);
		},
		// Game over modal control
		openGameOverModal: function () {
			document.getElementById("game-over-modal").classList.add("overlay");
			document.getElementById("game-over-modal").classList.add("show");
		},
		closeGameOverModal: function () {
			document.getElementById("game-over-modal").classList.remove("show");
			setTimeout(() => {
				document
					.getElementById("game-over-modal")
					.classList.remove("overlay");
			}, 400);
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
	// Vars
	--input-height: 60px;

	#guess {
		// Centering
		display: flex;
		align-items: center;
		justify-content: center;
		// Spacing
		margin-bottom: 36px;

		#guess-input {
			// Bar styling
			background: $main-color;
			height: var(--input-height);
			width: 300px;
			// Border
			border: 2px solid $tile-color;
			border-right: none;
			border-radius: 0;
			// Typography
            font-family: $alt-font;
			color: $accent-color;
			font-size: 2rem;
			letter-spacing: 1px;
			// Spacing
			padding: 0 12px;

			&:focus {
				// Remove default styling
				outline: none;
				// Highlight
				background: black;
			}
		}

		// Chrome fixes
		::-webkit-calendar-picker-indicator,
		::-webkit-search-decoration,
		::-webkit-search-cancel-button,
		::-webkit-search-results-button,
		::-webkit-search-results-decoration {
			// Hide buttons on search
			display: none !important;
		}

		// IE fixes
		::-ms-clear,
		::-ms-reveal {
			// Hide X on search
			display: none;
			width: 0;
			height: 0;
		}

		#guess-button {
			// Border
			border: 2px solid $tile-color;
			border-radius: 0;
			// Button sizing
			height: var(--input-height);
			// Spacing
			padding: 0 18px;
			// Typography
			color: $accent-color;
			font-size: 1rem;
		}

		.active-button {
			// Clickable
			cursor: pointer;
			// Button styling
			background: $main-color;
		}
	}

	#game-grid {
		// Centering
		margin: 0 auto;
		// Sizing
		width: 350px;

		#game-grid-labels {
			// Layout
			display: flex;
			justify-content: space-between;

			.game-grid-label {
				// Typography
				color: $accent-color;
				letter-spacing: 2px;
				// Sizing
				width: 65px;
			}
		}

		#separator {
			// Bar styling
			height: 1px;
			background: $accent-color;
			// Spacing
			margin: 10px 0;
			// Remove default styling
			border: none;
		}

		.game-grid-row {
			// Spacing
			margin-bottom: 5px;
			// Layout
			display: flex;
			justify-content: space-between;
		}
	}
}

// Sticky hover
@media (hover: hover) {
	#squirdle > #guess > .active-button:hover {
		// Animate
		background: black;
	}
}

// Mobile design
@media screen and (max-width: $mobile) {
	#squirdle {
		// Reduce spacing
		padding: 32px;
		// Update var
		--input-height: 48px;

		#guess > #guess-input {
			// Typography
			font-size: 1.5rem;
		}
	}
}
</style>
