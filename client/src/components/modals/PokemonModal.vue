<template>
	<Modal id="pokemon-modal" ref="pokemon-modal" modalID="pokemon-modal">
		<div id="pokemon">
			<h2 id="pokemon-header">Today's Pokémon</h2>
			<img
				id="target-sprite"
				alt="Target Pokemon"
				:class="gameOver ? 'show' : 'hidden'"
			/>
			<img
				id="mystery-sprite"
				:class="gameOver ? 'hidden' : 'show'"
				src="@/assets/icons/mystery.png"
				alt="Mystery Pokemon"
			/>
			<p v-if="gameOver" id="target-name">
				#{{ $formatDexNum(target.dex_num) }}:
				{{ target.name }}
			</p>
			<p v-else id="target-name">???</p>
			<div
				v-if="target"
				id="tile-container"
				:class="gameOver ? 'show' : 'hidden'"
			>
				<div class="target-tile">
					<img alt="Box Sprite" id="target-box-sprite" />
				</div>
				<div class="target-tile">{{ $intToRoman(target.gen) }}</div>
				<div class="target-tile">
					<img id="target-primary-type" alt="Type 1 Plaque" />
					<img
						v-if="target.type_2"
						id="target-secondary-type"
						alt="Type 2 Plaque"
					/>
				</div>
				<div class="target-tile">{{ $intToRoman(target.stage) }}</div>
				<div class="target-tile">{{ target.name.length }}</div>
			</div>
		</div>
	</Modal>
</template>

<script>
// Vuex
import { mapGetters } from "vuex";

// Import global component
import Modal from "@/components/global/Modal.vue";

export default {
	name: "PokemonModal",
	components: {
		Modal,
	},
	methods: {
		// Modal control
		openModal: function () {
			this.$refs["pokemon-modal"].openModal();
		},
		// Translate edge cases
		translateName: function (name) {
			if (name === "mr. mime") return "mr.mime";
			else if (name === "mime jr.") return "mime_jr";
			else if (name === "farfetch’d") return "farfetchd";
			else return name;
		},
		// Dyanamically set images
		setImages: function () {
			// Set main sprite
			document.getElementById(
				"target-sprite"
			).src = `https://projectpokemon.org/images/normal-sprite/${this.translateName(
				this.target.name
			)}.gif`;
			// Set box sprite
			document.getElementById(
				"target-box-sprite"
			).src = `https://www.serebii.net/pokedex-swsh/icon/${this.target.dex_num
				.toString()
				.padStart(3, "0")}.png`;
			// Set types
			document.getElementById(
				"target-primary-type"
			).src = `https://www.serebii.net/pokedex-bw/type/${this.target.type_1}.gif`;
			if (this.target.type_2 !== "")
				document.getElementById(
					"target-secondary-type"
				).src = `https://www.serebii.net/pokedex-bw/type/${this.target.type_2}.gif`;
		},
	},
	computed: {
		// Map Vuex functions
		...mapGetters(["gameOver", "target"]),
	},
	watch: {
		// Dynamically set images when target is generated
		target: function () {
			this.$nextTick(() => {
				this.setImages();
			});
		},
		// Open modal on game over
		gameOver: function () {
			if (this.gameOver) this.openModal();
		},
	},
};
</script>

<style lang="scss" scoped>
#pokemon {
	height: 100%;
	width: 100%;

	#pokemon-header {
		font-family: $alt-font;
		font-size: 1.2rem;
		line-height: 1.2rem;
		color: $accent-color;
		text-decoration: underline;
		margin-bottom: 16px;
	}

	#target-sprite {
		margin: 16px auto;
		margin-top: 32px;
	}

	#mystery-sprite {
		margin: 16px auto;
		margin-top: 32px;
		height: 150px;
	}

	#target-name {
		font-family: $alt-font;
		font-size: 1.2rem;
		color: $accent-color;
		letter-spacing: 2px;
	}

	#tile-container {
		justify-content: space-between;
		margin: 8px auto;
		margin-bottom: 0;
		width: 75%;

		.target-tile {
			border: 1px solid $tile-color;
			height: 50px;
			width: 50px;
			display: flex;
			flex-direction: column;
			justify-content: space-evenly;
			align-items: center;
			font-size: 1.5rem;
			color: white;
			line-height: 45px;
			font-family: $alt-font;
		}
	}

	.show {
		display: flex;
	}

	.hidden {
		display: none;
	}
}
</style>
