<template>
	<div id="squirdle">
		<form id="guess" @submit.prevent="submitGuess">
			<input
				placeholder="Guess 1 of 8"
				v-model="guess"
				id="guess-input"
			/>
			<input type="submit" id="guess-button" value="→" />
		</form>
	</div>
</template>

<script>
export default {
	name: "Squirdle",
	data() {
		return {
			guess: "",
			guessNum: 1,
		};
	},
	methods: {
		// On submit
		submitGuess: function () {
			this.clearGuess();
			this.updateGuessNum();
		},
		// Clear guess input
		clearGuess: function () {
			this.guess = "";
		},
		// Update number of guesses
		updateGuessNum: function () {
			this.guessNum++;
			// Change placeholder
			document.getElementById(
				"guess-input"
			).placeholder = `Guess ${this.guessNum} of 8`;
		},
	},
};
</script>

<style lang="scss" scoped>
#squirdle {
	// Spacing
	padding: 64px;

	#guess {
		// Centering
		display: flex;
		align-items: center;
		justify-content: center;

		#guess-input {
			// Bar styling
			background: $main-color;
			height: 60px;
			// Border
			border: 2px solid $accent-color;
			border-right: none;
			border-radius: 5px 0 0 5px;
			// Typography
			color: $accent-color;
			font-family: "Helvetica Neue", Arial, sans-serif;
			font-size: 2rem;
			font-weight: bold;
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

		#guess-button {
			// Border
			border: 2px solid $accent-color;
			border-radius: 0 5px 5px 0;
			// Button sizing
			height: 64px;
			// Spacing
			padding: 0 18px;
			// Typography
			color: $accent-color;
			font-size: 1rem;
			// Button styling
			background: $main-color;
			// Clickable
			cursor: pointer;

			&:hover {
				// Animate
				background: black;
			}
		}
	}
}
</style>