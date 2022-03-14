<template>
	<form id="guess-dropdown" @submit.prevent="submitGuess">
		<div id="dropdown-container">
			<input
				id="guess-input"
				type="text"
				placeholder="Guess 1 of 6"
				spellcheck="false"
				v-model="guess"
                @focus="showDropdown"
                @blur="hideDropdown"
			/>
			<div id="dropdown" class="dropdown">
                <div class="dropdown-option">
                    <option>bulbasaur</option>
                    <hr />
                </div>
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
		};
	},
	methods: {
        // Dropdown controls
        showDropdown: function () {
            document.getElementById("dropdown").classList.add("show");
            document.getElementById("dropdown").classList.add("overlay");
        },
        hideDropdown: function () {
            document.getElementById("dropdown").classList.remove('show');
            document.getElementById("dropdown").classList.remove("overlay");
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
            // Sizing
			max-height: 500px;
			width: 300px;
            // Position outside of flow
            position: absolute;
            z-index: $hidden;
            // Reset transition
		    transform: translateY(-10px);
            opacity: 0;
            // Smooth animation
		    transition: all 0.1s ease;
            // Border
            border: 2px solid $tile-color;
            border-top: none;
		}

        .show {
            // Make visible
            opacity: 1;
            transform: translateY(0px);
        }

        .overlay {
            // Move to front
            z-index: $overlap;
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
	#guess-dropdown > .active-button:hover {
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
