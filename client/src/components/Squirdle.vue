<template>
	<div id="squirdle">
		<form id="guess" @submit.prevent="submitGuess">
			<input
				id="guess-input"
				type="search"
				list="guess-list"
				placeholder="Guess 1 of 6"
				v-model="guess"
			/>
			<datalist id="guess-list">
				<option v-for="(pokemon, i) in pokemonObjs" :key="i">
					{{ formatPokemonName(pokemon.name) }}
				</option>
			</datalist>
			<input type="submit" id="guess-button" value="→" />
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
				<SpriteTile />
				<TextTile v-for="j in 4" :key="j" />
			</div>
		</div>
	</div>
</template>

<script>
// Import global library
import axios from "axios";

// Import components
import SpriteTile from "@/components/SpriteTile.vue";
import TextTile from "@/components/TextTile.vue";

export default {
	name: "Squirdle",
	components: {
		SpriteTile,
		TextTile,
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
			// Target
			targetObj: {},
		};
	},
	methods: {
		// Fetch list of Pokemon
		fetchPokemonList: async function () {
			const url = "/api/pokemon";
			// Fetch
			await axios.get(url).then((response) => {
				this.pokemonObjs = response.data.results;
			});
		},
		// Fetch specific Pokemon
		fetchPokemon: async function (url) {
			const pokemon = {};
			// Fetch name and species
			await axios.get(url).then(async (response1) => {
				pokemon.name = response1.data.name;
				// Fetch generation and color
				await axios
					.get(response1.data.species.url)
					.then((response2) => {
						pokemon.generation = response2.data.generation.name
							.split("-")[1]
							.toUpperCase();
						pokemon.color = response2.data.color.name;
						console.log(pokemon);
					});
			});
			return pokemon;
		},
		// Capitalize Pokemon name
		formatPokemonName: function (name) {
			// Handle edge cases
			if (name === "mr-mime") return "Mr. Mime";
			else if (name === "mime-jr") return "Mime Jr.";
			else {
				// Replace hyphens with spaces
				name = name.replace(/-/g, " ");
				// Capitalize beginning of each word
				name = name
					.toLowerCase()
					.split(" ")
					.map((s) => s.charAt(0).toUpperCase() + s.substring(1))
					.join(" ");
				return name;
			}
		},
		// On submit
		submitGuess: async function () {
			// Guess is not a valid Pokemon
			if (this.validateGuess() === this.INVALID) {
				// Pokemon has already been guessed
			} else if (this.validateGuess() === this.DUPLICATE) {
			} else {
				// Guess is valid
				await this.updateGrid();
				this.updateGuess();
			}
		},
		// Handle validation
		validateGuess: function () {
			const validNames = this.pokemonObjs.map((pokemon) => pokemon.name);
			const guess = this.guess.toLowerCase();
			if (!validNames.includes(guess)) return this.INVALID;
			else if (this.guesses.includes(guess)) return this.DUPLICATE;
			else return this.VALID;
		},
		// Update guess
		updateGuess: function () {
			// Add to prior guesses
			this.guesses.push(this.guess.toLowerCase());
			// Clear guess
			this.guess = "";
			// Update placeholder
			document.getElementById("guess-input").placeholder = `Guess ${
				this.guesses.length + 1
			} of 6`;
		},
		// Update the game board
		updateGrid: async function () {
			// Fetch
			const guessURL = this.pokemonObjs.find(
				(obj) => obj.name === this.guess.toLowerCase()
			).url;
			const pokemon = await this.fetchPokemon(guessURL);
			// Update display data
			await this.updateSpriteTile(guessURL);
			await this.updateTextTiles(pokemon);
			// Update tile statuses
			this.updateTileStatuses(pokemon);
			// Flip tiles
			this.flipTiles();
		},
		// Update sprite tile
		updateSpriteTile: async function (url) {
			// Fetch box sprite
			await axios.get(url).then((response) => {
				document.getElementsByClassName("sprite")[
					this.guesses.length
				].src =
					response.data.sprites.versions[
						"generation-viii"
					].icons.front_default;
			});
		},
		// Update other tiles
		updateTextTiles: async function (pokemon) {
			const baseInd = this.guesses.length * 4;
			const tiles = document.getElementsByClassName("text");
			// Update generation
			tiles[baseInd].innerHTML = pokemon.generation;
		},
		// Set status of tiles
		updateTileStatuses: function (pokemon) {
			const baseInd = this.guesses.length * 4;
			const textTiles = document.getElementsByClassName("text-tile-back");
			// Update sprite tile
			if (this.guess.toLowerCase() === this.targetObj.name)
				document
					.getElementsByClassName("sprite-tile-back")
					[this.guesses.length].classList.add("correct");
			// Update generation tile
			if (pokemon.generation === this.targetObj.generation)
				textTiles[baseInd].classList.add("correct");
		},
		// Flip tiles animation
		flipTiles: function () {
			const baseInd = this.guesses.length * 4;
			const textTiles =
				document.getElementsByClassName("text-tile-inner");
			// Flip sprite tile
			document
				.getElementsByClassName("sprite-tile-inner")
				[this.guesses.length].classList.add("rotated");
			// Flip other tiles
			for (let i = 0; i < 4; i++)
				textTiles[baseInd + i].classList.add("rotated");
		},
	},
	mounted: async function () {
		const tempURL = "https://pokeapi.co/api/v2/pokemon/1/";
		await this.fetchPokemonList();
		this.targetObj = await this.fetchPokemon(tempURL);
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
			border: 2px solid $accent-color;
			border-right: none;
			border-radius: 5px 0 0 5px;
			box-sizing: border-box;
			// Typography
			color: $accent-color;
			font-family: "Helvetica Neue", Arial, sans-serif;
			font-size: 2rem;
			letter-spacing: 2px;
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
			border: 2px solid $accent-color;
			border-radius: 0 5px 5px 0;
			// Button sizing
			height: var(--input-height);
			// Spacing
			padding: 0 18px;
			// Typography
			color: $accent-color;
			font-size: 1rem;
			// Button styling
			background: $main-color;
			// Clickable
			cursor: pointer;
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
	#squirdle > #guess > #guess-button:hover {
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