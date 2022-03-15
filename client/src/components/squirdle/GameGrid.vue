<template>
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
</template>

<script>
// Import local component
import GameTile from "@/components/squirdle/GameTile.vue";

export default {
	name: "GameGrid",
	components: {
		GameTile,
	},
	props: {
		ind: {
			type: Number,
			required: true,
		},
		target: {
			type: null,
		},
	},
	data() {
		return {
			guessTypes: [],
			numDualtypes: 0,
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
		// Update the game board
		updateGrid: function (pokemon) {
			// Add to types
			this.guessTypes[this.ind] = pokemon.type_2 === "" ? true : false;
			// Update display data
			this.updateSpriteTile(pokemon);
			this.updateTextTiles(pokemon);
			this.updateTypeTile(pokemon);
			// Update tile statuses
			this.setTileStatuses(pokemon);
			// Flip tiles
			this.flipTiles();
		},
		// Update sprite tile
		updateSpriteTile: function (pokemon) {
			// Fetch box sprite
			document.getElementsByClassName("sprite")[
				this.ind
			].src = `https://raw.githubusercontent.com/msikma/pokesprite/master/pokemon-gen8/regular/${this.translateNames(
				pokemon.name
			)}.png`;
		},
		// Update text tiles
		updateTextTiles: function (pokemon) {
			const baseInd = this.ind * 3;
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
			// Check if mono or dual type
			if (pokemon.type_2 !== "") {
				// Handle primary type
				document.getElementsByClassName("monotype")[
					this.ind
				].src = `https://www.serebii.net/pokedex-bw/type/${pokemon.type_1}.gif`;
				// Handle secondary type
				document.getElementsByClassName("dualtype")[
					this.numDualtypes
				].src = `https://www.serebii.net/pokedex-bw/type/${pokemon.type_2}.gif`;
				this.numDualtypes++;
			} else {
				this.$nextTick(() => {
					document.getElementsByClassName("monotype")[
						this.ind - 1
					].src = `https://www.serebii.net/pokedex-bw/type/${pokemon.type_1}.gif`;
				});
			}
		},
		// Set status of tiles
		setTileStatuses: function (pokemon) {
			const baseInd = this.ind * 5;
			const tiles = document.getElementsByClassName("game-tile-back");
			// Update sprite tile
			if (pokemon.name === this.target.name)
				tiles[baseInd].classList.add("correct");
			// Update generation tile
			if (pokemon.gen === this.target.gen)
				tiles[baseInd + 1].classList.add("correct");
			else if (Math.abs(pokemon.gen - this.target.gen) === 1)
				tiles[baseInd + 1].classList.add("hint");
			// Update type tile
			this.$nextTick(() => {
				if (
					pokemon.type_1 === this.target.type_1 &&
					pokemon.type_2 === this.target.type_2
				)
					tiles[baseInd + 2].classList.add("correct");
				else if (
					pokemon.type_1 === this.target.type_2 ||
					pokemon.type_1 === this.target.type_1 ||
					pokemon.type_2 === this.target.type_1 ||
					pokemon.type_2 === this.target.type_2
				)
					tiles[baseInd + 2].classList.add("hint");
			});
			// Update stage tile
			if (pokemon.stage === this.target.stage)
				tiles[baseInd + 3].classList.add("correct");
			else if (Math.abs(pokemon.stage - this.target.stage) === 1)
				tiles[baseInd + 3].classList.add("hint");
			// Update color tile
			if (pokemon.color === this.target.color)
				tiles[baseInd + 4].classList.add("correct");
			else if (this.similarColor(pokemon.color))
				tiles[baseInd + 4].classList.add("hint");
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
		// Define what colors are similar
		similarColor: function (color) {
			const targetColor = this.target.color;
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
			const baseInd = this.ind * 5;
			const tiles = document.getElementsByClassName("game-tile-inner");
			// Start animation at 0.25s intervals
			for (let i = 0; i < 5; i++)
				setTimeout(function () {
					tiles[baseInd + i].classList.add("rotated");
				}, 250 * (i + 1));
		},
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

	.game-grid-row {
		margin-bottom: 5px;
		display: flex;
		justify-content: space-between;
	}
}
</style>
