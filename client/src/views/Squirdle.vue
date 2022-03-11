<template>
	<div id="squirdle">
		<GameOverModal
			v-if="target"
			ref="game-over-modal"
			:win="win"
			:guesses="guesses.length"
			:target="target"
		/>
		<ErrorModal ref="error-modal" :error="error" />
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
				<option v-for="(pokemon, i) in pokemonList" :key="i">
					{{ pokemon }}
				</option>
			</datalist>
			<input
				type="submit"
				id="guess-button"
				class="active-button"
				value="→"
			/>
		</form>
		<GameGrid ref="game-grid" :ind="guesses.length" :target="target" />
	</div>
</template>

<script>
// Import global library
import axios from "axios";

// Import components
import ErrorModal from "@/components/modals/ErrorModal.vue";
import GameOverModal from "@/components/modals/GameOverModal.vue";
import GameGrid from "@/components/squirdle/GameGrid.vue";

export default {
	name: "Squirdle",
	components: {
		ErrorModal,
		GameOverModal,
		GameGrid,
	},
	data() {
		return {
			// Global vars
			INVALID: 0,
			DUPLICATE: 1,
			VALID: 2,
			// State
			guess: "",
			pokemonList: null,
			guesses: [],
			win: true,
			error: "",
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
		// On submit
		submitGuess: function () {
			if (this.validateGuess() === this.INVALID) {
				this.error = "Not a valid Pokémon!";
				this.$refs["error-modal"].openModal();
			} else if (this.validateGuess() === this.DUPLICATE) {
				this.error = "Pokémon already guessed!";
				this.$refs["error-modal"].openModal();
			} else {
				// Guess is valid
				axios.get(`/api/pokemon/${this.guess}`).then((response) => {
					let pokemon = response.data;
					this.$refs["game-grid"].updateGrid(pokemon);
					this.updateGuess(pokemon);
				});
			}
		},
		// Handle validation
		validateGuess: function () {
			// Check if valid Pokemon
			if (!this.pokemonList.includes(this.guess)) return this.INVALID;
			// Check if Pokemon already guessed
			else if (this.guesses.includes(this.guess)) return this.DUPLICATE;
			else return this.VALID;
		},
		// Update guess
		updateGuess: function (pokemon) {
			// Add to prior guesses
			this.guesses.push(this.guess);
			// Check for win
			if (pokemon.name === this.target.name) this.handleGameOver(true);
			// Check for loss
			else if (this.guesses.length === 6) this.handleGameOver(false);
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
