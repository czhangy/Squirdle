<template>
	<div id="guess-dropdown">
		<div id="dropdown-container">
			<input
				id="guess-input"
				type="text"
				placeholder="Guess 1 of 6"
				spellcheck="false"
				v-model="guess"
				@input="filterDropdown"
			/>
			<div id="dropdown" class="dropdown">
				<button
					class="dropdown-option"
					v-for="(pokemon, i) in filteredList"
					:key="i"
					@click="setGuess(pokemon)"
				>
					<img class="dropdown-icon" alt="" />
					{{ pokemon }}
				</button>
			</div>
		</div>
		<button id="guess-button" class="active-button" @click="submitGuess">
			→
		</button>
	</div>
</template>

<script>
// Import global library
import axios from "axios";

export default {
	name: "GuessDropdown",
	props: {
		pokemonList: {
			type: Array,
			default: [],
		},
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
			// Global vars
			INVALID: 0,
			DUPLICATE: 1,
			VALID: 2,
			// State
			guess: "",
			guesses: [],
			filteredList: [],
		};
	},
	methods: {
		// Translate edge cases
		translateNames: function (name) {
			// Handle all edge cases
			if (name === "nidoran♀") return "nidoran-f";
			else if (name === "nidoran♂") return "nidoran-m";
			else if (name === "farfetch’d") return "farfetchd";
			else if (name === "mr. mime") return "mr-mime";
			else return name;
		},
		// Set dropdown sprites
		setSprites: function () {
			const sprites = document.getElementsByClassName("dropdown-icon");
			for (let i = 0; i < sprites.length; i++) {
				sprites[
					i
				].src = `https://raw.githubusercontent.com/msikma/pokesprite/master/pokemon-gen7x/regular/${this.translateNames(
					this.filteredList[i]
				)}.png`;
			}
		},
		// Filter options
		filterDropdown: function () {
			// Hide all options on empty query
			if (this.guess === "") this.filteredList = [];
			else {
				// Filter by substring
				this.filteredList = this.pokemonList.filter((name) =>
					name.includes(this.guess.toLowerCase())
				);
			}
		},
		// Select option
		setGuess: function (guess) {
			this.guess = guess;
			// Clear focus
			if (document.activeElement) document.activeElement.blur();
		},
		// Handle validation
		validateGuess: function () {
			// Check if valid Pokemon
			if (!this.pokemonList.includes(this.guess)) return this.INVALID;
			// Check if Pokemon already guessed
			else if (this.guesses.includes(this.guess)) return this.DUPLICATE;
			else return this.VALID;
		},
		// On submit
		submitGuess: function () {
			// Standardize capitalization
			this.guess = this.guess.toLowerCase();
			if (this.validateGuess() === this.INVALID)
				this.onError("Not a valid Pokémon!");
			else if (this.validateGuess() === this.DUPLICATE)
				this.onError("Pokémon already guessed!");
			else {
				// Guess is valid
				axios.get(`/api/pokemon/${this.guess}`).then((response) => {
					let pokemon = response.data;
					// Add to prior guesses
					this.guesses.push(this.guess);
					// Clear guess
					this.guess = "";
					this.onSubmit(pokemon);
				});
			}
		},
	},
	watch: {
		filteredList: function () {
			// Set sprites
			this.$nextTick(() => this.setSprites());
            // Hide bottom border of dropdown on empty list
            let dropdown = document.getElementById('dropdown');
            if (this.filteredList.length === 0) dropdown.style.borderBottomWidth = '0';
            else dropdown.style.borderBottomWidth = '2px';

		},
		guess: function () {
			// Update filters
			this.filterDropdown();
		},
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

	#dropdown-container {
		position: relative;

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
				background: black;
			}
		}

		.dropdown {
			display: none;
			width: 100%;
			position: absolute;
			overflow-y: scroll;
			// Overlap tiles
			z-index: $overlap;
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
				color: white;
				font-family: $alt-font;
				font-size: 1.2rem;
				display: flex;
				justify-content: flex-start;
				align-items: center;
				padding-left: 100px;
				position: relative;
				width: 100%;

				&:last-child {
					// Remove last divider
					border-bottom: none;
				}

				.dropdown-icon {
					// Adjust for sprites
					margin-top: -28px;
					// Remove from flow to prevent jumpy loads
					position: absolute;
					left: 40px;
				}
			}
		}

		&:focus-within > .dropdown {
			// Keep dropdown open for click handler
			display: block;
			max-height: 500px;
		}
	}

	#guess-button {
		border: 2px solid $tile-color;
		border-left: none;
		border-radius: 0;
		height: var(--input-height);
		padding: 0 18px;
		color: $accent-color;
		font-size: 1rem;
	}

	.active-button {
		cursor: pointer;
		background: $main-color;
	}
}

// Sticky hover
@media (hover: hover) {
	#guess-dropdown {
		#dropdown-container > .dropdown > .dropdown-option:hover {
			background: black;
		}

		.active-button:hover {
			background: black;
		}
	}
}

// Mobile design
@media screen and (max-width: $mobile) {
	#guess > #guess-input {
		font-size: 1.5rem;
	}
}
</style>
