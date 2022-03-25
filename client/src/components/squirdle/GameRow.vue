<template>
	<div class="game-row">
		<GameTile
			:srcs="boxSprite"
			:close="false"
			:correct="correct[0]"
			:rotated="rotated[0]"
		/>
		<GameTile
			:content="gen"
			:close="close[1]"
			:correct="correct[1]"
			:rotated="rotated[1]"
		/>
		<GameTile
			:srcs="types"
			:close="close[2]"
			:correct="correct[2]"
			:rotated="rotated[2]"
		/>
		<GameTile
			:content="stage"
			:close="close[3]"
			:correct="correct[3]"
			:rotated="rotated[3]"
		/>
		<GameTile
			:content="len"
			:close="close[4]"
			:correct="correct[4]"
			:rotated="rotated[4]"
		/>
	</div>
</template>

<script>
// Vuex for target checking and state saving
import { mapMutations, mapGetters } from "vuex";

// Import local component
import GameTile from "@/components/squirdle/GameTile.vue";

export default {
	name: "GameRow",
	components: {
		GameTile,
	},
	props: {
        // Pokemon that is represented by this row
		pokemon: {
			type: null,
		},
	},
	data() {
		return {
			// State
			boxSprite: [],
			gen: "",
			types: [],
			stage: "",
			len: "",
			close: Array(5).fill(false),
			correct: Array(5).fill(false),
			rotated: Array(5).fill(false),
		};
	},
	methods: {
		// Map Vuex function for state saving
		...mapMutations(["updateCorrectFound"]),
		// Main function
		updateRow: function () {
			this.setContent();
			this.setColors();
			this.flipTiles();
		},
		// Reset function
		resetRow: function () {
			this.boxSprite = [];
			this.gen = "";
			this.types = [];
			this.stage = "";
			this.len = "";
			this.close = Array(5).fill(false);
			this.correct = Array(5).fill(false);
			this.rotated = Array(5).fill(false);
		},
		// Set attributes of given row's Pokemon for display
		setContent: function () {
			// Set sprite tile
			this.boxSprite.push(
				`https://www.serebii.net/pokedex-swsh/icon/${this.$formatDexNum(
					this.pokemon.dex_num
				)}.png`
			);
			// Set generation
			this.gen = this.$intToRoman(this.pokemon.gen);
			// Set type(s)
			this.types.push(
				`https://www.serebii.net/pokedex-bw/type/${this.pokemon.type_1}.gif`
			);
			if (this.pokemon.type_2 !== "")
				this.types.push(
					`https://www.serebii.net/pokedex-bw/type/${this.pokemon.type_2}.gif`
				);
			// Set stage
			this.stage = this.$intToRoman(this.pokemon.stage);
			// Set length
			this.len = this.pokemon.name.length;
		},
		// Set color of tiles based on similarity to target
		setColors: function () {
			// Set sprite tile color
			if (this.pokemon.name === this.target.name) this.correct[0] = true;
			// Set generation tile color
			if (this.$isCorrectGen(this.pokemon, this.target)) {
				this.correct[1] = true;
				this.updateCorrectFound(0);
			} else if (this.$isCloseGen(this.pokemon, this.target))
				this.close[1] = true;
			// Set type tile color
			if (this.$isCorrectType(this.pokemon, this.target)) {
				this.correct[2] = true;
				this.updateCorrectFound(1);
			} else if (this.$isCloseType(this.pokemon, this.target))
				this.close[2] = true;
			// Set stage tile color
			if (this.$isCorrectStage(this.pokemon, this.target)) {
				this.correct[3] = true;
				this.updateCorrectFound(2);
			} else if (this.$isCloseStage(this.pokemon, this.target))
				this.close[3] = true;
			// Set length tile color
			if (this.$isCorrectLength(this.pokemon, this.target)) {
				this.correct[4] = true;
				this.updateCorrectFound(3);
			} else if (this.$isCloseLength(this.pokemon, this.target))
				this.close[4] = true;
		},
		// Flip tiles in this row at timed intervals
		flipTiles: function () {
			// Start animation at 0.25s intervals
			for (let i = 0; i < 5; i++)
				setTimeout(() => {
					this.rotated[i] = true;
				}, 250 * (i + 1));
		},
	},
	computed: {
		// Map Vuex function for target checking
		...mapGetters(["target", "gameOver"]),
	},
	watch: {
		// When pokemon is passed from GameGrid, update
		pokemon: function () {
			if (this.pokemon) this.updateRow();
		},
		// Reset component state on game reset
		gameOver: function () {
			if (!this.gameOver) this.resetRow();
		},
	},
};
</script>

<style lang="scss" scoped>
.game-row {
	margin-bottom: 5px;
	display: flex;
	justify-content: space-between;
	width: 100%;
}
</style>
