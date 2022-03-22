<template>
	<div id="guess-dropdown">
		<div
			id="dropdown-overlay"
			class="dropdown-overlay"
			@click="closeDropdown"
		/>
		<div id="dropdown-container" class="overlay">
			<input
				id="guess-input"
				type="text"
				:placeholder="`Guess 1 of ${MAX_GUESSES}`"
				spellcheck="false"
				v-model="guess"
				@input="filterDropdown"
				@click="openDropdown"
			/>
			<div id="dropdown" class="dropdown">
				<button
					class="dropdown-option"
					v-for="(pokemon, i) in filteredList"
					:key="i"
					@click="setGuess(pokemon)"
				>
					<img class="dropdown-sprite" alt="" />
					{{ pokemon }}
				</button>
			</div>
		</div>
		<button id="guess-button" @click="submitGuess">→</button>
	</div>
</template>

<script>
// Import global constants
import { MAX_GUESSES, VALID, INVALID, DUPLICATE } from "@/constants.js";

// Axios and Vuex
import axios from "axios";
import { mapGetters } from "vuex";

export default {
	name: "GuessDropdown",
	props: {
		onError: {
			type: Function,
			required: true,
		},
		onSubmit: {
			type: Function,
			required: true,
		},
	},
	data() {
		return {
			// Global constants
			MAX_GUESSES,
			VALID,
			INVALID,
			DUPLICATE,
			// State
			guess: "",
			guesses: [],
			filteredList: [],
		};
	},
	methods: {
		// Set dropdown sprites
		setSprites: function () {
			const sprites = document.getElementsByClassName("dropdown-sprite");
			for (let i = 0; i < sprites.length; i++) {
				sprites[
					i
				].src = `https://www.serebii.net/pokedex-swsh/icon/${this.$formatDexNum(
					this.pokemon.findIndex(
						(name) => name === this.filteredList[i]
					) + 1
				)}.png`;
			}
		},
		// Dropdown controls
		openDropdown: function () {
			document
				.getElementById("dropdown-overlay")
				.classList.add("show-overlay");
			document.getElementById("dropdown").classList.add("show-dropdown");
		},
		closeDropdown: function () {
			document
				.getElementById("dropdown-overlay")
				.classList.remove("show-overlay");
			document
				.getElementById("dropdown")
				.classList.remove("show-dropdown");
		},
		// Filter options
		filterDropdown: function () {
			// Hide all options on empty query
			if (this.guess === "") this.filteredList = [];
			// Filter by substring
			else
				this.filteredList = this.pokemon.filter((name) =>
					name.includes(this.guess.toLowerCase())
				);
		},
		// Select option
		setGuess: function (guess) {
			this.guess = guess;
			// Close dropdown after click
			this.closeDropdown();
		},
		// Handle validation
		validateGuess: function () {
			// Check if valid Pokemon
			if (!this.pokemon.includes(this.guess)) return INVALID;
			// Check if Pokemon already guessed
			else if (this.guesses.includes(this.guess)) return DUPLICATE;
			else return VALID;
		},
		// On submit
		submitGuess: function () {
			// Standardize capitalization
			this.guess = this.guess.toLowerCase();
			// Close dropdown
			this.closeDropdown();
			// Disable button temporarily
			let button = document.getElementById("guess-button");
			button.disabled = true;
			setTimeout(() => {
				button.disabled = false;
			}, 1750);
			// Perform validation
			let errorCode = this.validateGuess();
			if (errorCode !== VALID) this.onError(errorCode);
			else {
				// Guess is valid
				axios.get(`/api/pokemon/${this.guess}`).then((response) => {
					// Add to prior guesses
					this.guesses.push(this.guess);
					// Clear guess
					this.guess = "";
					// Update placeholder
					document.getElementById(
						"guess-input"
					).placeholder = `Guess ${
						this.numGuesses + 2
					} of ${MAX_GUESSES}`;
					this.onSubmit(response.data);
				});
			}
		},
	},
	computed: {
		// Map Vuex function
		...mapGetters(["gameOver", "numGuesses", "pokemon"]),
	},
	watch: {
		filteredList: function () {
			// Set sprites
			this.$nextTick(() => this.setSprites());
			// Hide bottom border of dropdown on empty list
			let dropdown = document.getElementById("dropdown");
			if (this.filteredList.length === 0)
				dropdown.style.borderBottomWidth = "0";
			else dropdown.style.borderBottomWidth = "2px";
		},
		guess: function () {
			// Update filters on input
			this.filterDropdown();
		},
		gameOver: function () {
			// Reset component state
			if (!this.gameOver) this.guesses = [];
		},
	},
	mounted: function () {
		// Enable Enter submission
		document
			.getElementById("guess-input")
			.addEventListener("keyup", (e) => {
				if (e.code === "Enter") this.submitGuess();
			});
	},
	beforeUnmount: function () {
		// Clean up
		document
			.getElementById("guess-input")
			.removeEventListener("keyup", (e) => {
				if (e.code === "Enter") this.submitGuess();
			});
	},
};
</script>

<style lang="scss" scoped>
#guess-dropdown {
	// Var
	--input-height: 60px;
	display: flex;
	align-items: center;
	justify-content: center;
	margin-bottom: 36px;

	.dropdown-overlay {
		z-index: $dropdown-overlay;
		display: none;
		// Allow navbar access on overlay
		height: calc(100% - #{$navbar-height});
		width: 100%;
		position: absolute;
		bottom: 0;
	}

	.show-overlay {
		// Show
		display: block;
	}

	#dropdown-container {
		position: relative;
		// Overlap tiles
		z-index: $dropdown;

		#guess-input {
			background: $main-color;
			height: var(--input-height);
			width: 300px;
			border: 2px solid $tile-color;
			border-radius: 0;
			font-family: $alt-font;
			color: $accent-color;
			font-size: 2rem;
			letter-spacing: 1px;
			padding: 0 12px;

			&:focus {
				outline: none;
				background: $focus-color;
			}
		}

		.dropdown {
			display: none;
			max-height: 500px;
			width: 100%;
			position: absolute;
			overflow-y: scroll;
			border: 2px solid $tile-color;
			border-top: none;
			// Initialize to hidden
			border-bottom-width: 0;

			&::-webkit-scrollbar {
				display: none;
			}

			.dropdown-option {
				cursor: pointer;
				// Separators
				border: none;
				border-bottom: 2px solid $tile-color;
				background: $main-color;
				color: $accent-color;
				font-family: $alt-font;
				font-size: 1.2rem;
				display: flex;
				justify-content: flex-start;
				align-items: center;
				padding-left: 100px;
				position: relative;
				height: 50px;
				width: 100%;

				&:last-child {
					// Remove last divider
					border-bottom: none;
				}

				.dropdown-sprite {
					// Remove from flow to prevent jumpy loads
					position: absolute;
					left: 40px;
					width: 32px;
				}
			}
		}

		.show-dropdown {
			// Keep dropdown open for click handler
			display: block;
		}
	}

	#guess-button {
		border: 2px solid $tile-color;
		border-left: none;
		border-radius: 0;
		height: var(--input-height);
        width: 50px;
		color: $accent-color;
		font-size: 1rem;
		// Overlap overlay
		z-index: $dropdown;
		cursor: pointer;
		background: $main-color;

		&:disabled {
			cursor: auto;
		}
	}
}

// Sticky hover
@media (hover: hover) {
	#guess-dropdown {
		#dropdown-container > .dropdown > .dropdown-option:hover {
			background: $focus-color;
		}

		#guess-button:hover:enabled {
			background: $focus-color;
		}
	}
}

// Mobile design
@media screen and (max-width: $mobile) {
	#guess-dropdown {
		--input-height: 45px;

		#dropdown-container > #guess-input {
			font-size: 1.5rem;
		}
	}
}
</style>
