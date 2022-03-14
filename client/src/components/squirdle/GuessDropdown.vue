<template>
	<form id="guess-dropdown" @submit.prevent="submitGuess">
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
		<input
			type="submit"
			id="guess-button"
			class="active-button"
			value="→"
		/>
	</form>
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
	// Vars
	--input-height: 60px;
	// Centering
	display: flex;
	align-items: center;
	justify-content: center;
	// Spacing
	margin-bottom: 36px;

	#dropdown-container {
		// Positioning for children
		position: relative;

		#guess-input {
			// Bar styling
			background: $main-color;
			height: var(--input-height);
			width: 300px;
			// Border
			border: 2px solid $tile-color;
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

		.dropdown {
			// Hide
			display: none;
			// Sizing
			width: 100%;
			// Position outside of flow
			position: absolute;
			// Hide overflow
			overflow-y: scroll;
			// Overlap tiles
			z-index: $overlap;
			// Border
			border: 2px solid $tile-color;
			border-top: none;

			&::-webkit-scrollbar {
				display: none;
			}

			.dropdown-option {
				// Clickable
				cursor: pointer;
				// Borders to separate
                border: none;
				border-bottom: 2px solid $tile-color;
				// Box styling
				background: $main-color;
				// Typography
				color: white;
				font-family: $alt-font;
                font-size: 1.2rem;
				// Sizing
				height: $option-height;
				// Layout
				display: flex;
				justify-content: flex-start;
				align-items: center;
				padding-left: 100px;
				// Positioning for children
				position: relative;
                // Sizing
                width: 100%;

				&:last-child {
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
			// Make visible
			display: block;
			max-height: 500px;
		}
	}

	#guess-button {
		// Border
		border: 2px solid $tile-color;
		border-left: none;
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

// Sticky hover
@media (hover: hover) {
	#guess-dropdown {
		#dropdown-container > .dropdown > .dropdown-option:hover {
			background: black;
		}

		.active-button:hover {
			// Animate
			background: black;
		}
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
