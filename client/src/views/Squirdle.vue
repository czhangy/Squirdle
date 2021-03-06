<template>
	<div id="squirdle">
		<ErrorModal ref="error-modal" :errorCode="errorCode" />
		<GameDropdown
			v-if="!gameOver"
			:onError="displayError"
			:onSubmit="handleGuess"
		/>
		<button v-else id="reset-button" @click="resetGame">
			<img src="@/assets/icons/reset.png" alt="" id="reset-icon" />Reset
		</button>
		<GameGrid ref="game-grid" />
	</div>
</template>

<script>
// Import global constants
import { MAX_GUESSES } from "@/constants.js";

// Vuex
import { mapMutations, mapActions, mapGetters } from "vuex";

// Import modal components
import ErrorModal from "@/components/modals/ErrorModal.vue";

// Import game components
import GameDropdown from "@/components/squirdle/GameDropdown.vue";
import GameGrid from "@/components/squirdle/GameGrid.vue";

export default {
	name: "Squirdle",
	components: {
		ErrorModal,
		GameDropdown,
		GameGrid,
	},
	data() {
		return {
			// Global constants
			MAX_GUESSES,
			// State
			errorCode: 0,
		};
	},
	methods: {
		// Map Vuex functions for state modification
		...mapMutations([
			"storeGuess",
			"setTarget",
			"startGame",
			"endGame",
			"setGame",
		]),
		// Map Vuex functions for data generation
		...mapActions(["fetchPokemonList", "generateNewTarget"]),
		// Initialization function
		initGame: async function () {
			// Initial fetch of all pokemon
			if (this.pokemonList.length === 0) await this.fetchPokemonList();
			// Retrieve game saved in local storage
			if (localStorage.target) {
				this.setGame();
				this.setTarget(JSON.parse(localStorage.target));
			} else {
				this.startGame();
				this.generateNewTarget(this.pokemonList);
			}
		},
		// Reset function
		resetGame: function () {
			// Generate a new target Pokemon
			this.generateNewTarget(this.pokemonList);
			// Update Vuex state
			this.startGame();
		},
		// Execute on guess
		handleGuess: function (pokemon) {
			// Store guess into history
			this.storeGuess(pokemon);
			// Check for game over
			if (
				pokemon.name === this.target.name ||
				this.storedGuesses.length === MAX_GUESSES
			)
				this.handleGameOver(pokemon.name === this.target.name);
			// Update display
			this.$refs["game-grid"].updateGrid();
		},
		// Handle game end conditions
		handleGameOver: function (win) {
			// Disable input fields
			const input = document.getElementById("game-input");
			input.placeholder = "";
			input.disabled = true;
			document.getElementById("game-submit").disabled = true;
			// Update local storage
			this.setLocalStorage(win);
			// Update Vuex game state
			setTimeout(() => {
				this.endGame();
			}, 2500);
		},
		// Store target into local storage on game end for stats
		setLocalStorage: function (win) {
			// "Catch" Pokemon if win
			if (win) {
				let caught = localStorage.caught
					? JSON.parse(localStorage.caught)
					: [];
				if (!caught.includes(this.target.dex_num - 1)) {
					caught.push(this.target.dex_num - 1);
					localStorage.setItem("caught", JSON.stringify(caught));
				}
				// Add to streak
				let streak = localStorage.streak ? localStorage.streak : 0;
				streak++;
				localStorage.setItem("streak", streak);
				let maxStreak = localStorage.maxStreak
					? localStorage.maxStreak
					: 0;
				maxStreak = Math.max(maxStreak, streak);
				localStorage.setItem("maxStreak", maxStreak);
				// Add Pokemon to type 1
				let type1 = localStorage[this.target.type_1]
					? JSON.parse(localStorage[this.target.type_1])
					: [];
				if (!type1.includes(this.target.dex_num - 1)) {
					type1.push(this.target.dex_num - 1);
					localStorage.setItem(
						this.target.type_1,
						JSON.stringify(type1)
					);
				}
				// Add Pokemon to type 2 if it exists
				if (this.target.type_2) {
					let type2 = localStorage[this.target.type_2]
						? JSON.parse(localStorage[this.target.type_2])
						: [];
					if (!type2.includes(this.target.dex_num - 1)) {
						type2.push(this.target.dex_num - 1);
						localStorage.setItem(
							this.target.type_2,
							JSON.stringify(type2)
						);
					}
				}
				// Add Pokemon to generation
				let gen = localStorage[this.target.gen.toString()]
					? JSON.parse(localStorage[this.target.gen.toString()])
					: [];
				if (!gen.includes(this.target.dex_num - 1)) {
					gen.push(this.target.dex_num - 1);
					localStorage.setItem(
						this.target.gen.toString(),
						JSON.stringify(gen)
					);
				}
			}
			// Reset streak on loss
			else localStorage.setItem("streak", 0);
			// Mark Pokemon as "seen"
			let seen = localStorage.seen ? JSON.parse(localStorage.seen) : [];
			if (!seen.includes(this.target.dex_num - 1)) {
				seen.push(this.target.dex_num - 1);
				localStorage.setItem("seen", JSON.stringify(seen));
			}
		},
		// Trigger error modal
		displayError: function (errorCode) {
			this.errorCode = errorCode;
			this.$refs["error-modal"].openModal();
		},
	},
	computed: {
		// Map Vuex functions for state
		...mapGetters([
			"lightMode",
			"storedGuesses",
			"gameOver",
			"pokemonList",
			"target",
		]),
	},
	watch: {
		// Light mode styling on toggle
		lightMode: function () {
			this.$updateLightMode("#squirdle");
		},
	},
	mounted: function () {
		// Light mode styling on mount
		this.$updateLightMode("#squirdle");
		this.initGame();
	},
};
</script>

<style lang="scss" scoped>
#squirdle {
	padding: 64px 0;
	overflow-y: hidden;

	#reset-button {
		height: 60px;
		width: 350px;
		font-family: $alt-font;
		color: $accent-color;
		font-size: 2rem;
		letter-spacing: 1px;
		line-height: 2rem;
		border: 2px solid $accent-color;
		background: transparent;
		margin: 0 auto;
		margin-bottom: 36px;
		cursor: pointer;
		display: flex;
		justify-content: center;
		align-items: center;

		#reset-icon {
			height: 36px;
			filter: invert(100%);
			margin-right: 20px;
		}
	}
}

#squirdle.light-mode {
	#reset-button {
		color: $light-accent-color;
		border: 2px solid $light-accent-color;

		#reset-icon {
			filter: none;
		}
	}
}

// Mobile layout
@media screen and (max-width: $mobile) {
	#squirdle {
		padding: 32px 0;

		#reset-button {
			height: 45px;
			font-size: 1.5rem;
		}
	}
}

// Sticky hover
@media (hover: hover) {
	#squirdle > #reset-button:hover {
		background: $accent-color;
		border: none;
		color: $main-color;

		#reset-icon {
			filter: none;
		}
	}

	#squirdle.light-mode > #reset-button:hover {
		background: $light-accent-color;
		border: none;
		color: $light-main-color;

		#reset-icon {
			filter: invert(100%);
		}
	}
}
</style>
