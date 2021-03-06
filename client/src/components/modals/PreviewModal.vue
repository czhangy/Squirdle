<template>
	<Modal id="preview-modal" ref="preview-modal" modalID="preview-modal">
		<div id="preview">
			<h2 id="preview-header">Current Pokémon</h2>
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
			<div id="preview-labels" :class="gameOver ? 'show' : 'hidden'">
				<label class="preview-label">Guess</label>
				<label class="preview-label">Gen</label>
				<label class="preview-label">Type</label>
				<label class="preview-label">Stage</label>
				<label class="preview-label">Len.</label>
			</div>
			<hr id="separator" :class="gameOver ? 'show' : 'hidden'" />
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
// Vuex for image rendering and light mode
import { mapGetters } from "vuex";

// Import global component
import Modal from "@/components/global/Modal.vue";

export default {
	name: "PreviewModal",
	components: {
		Modal,
	},
	methods: {
		// Modal control
		openModal: function () {
			this.$refs["preview-modal"].openModal();
		},
		// Dyanamically set images
		setImages: function () {
			// Set main sprite
			document.getElementById(
				"target-sprite"
			).src = `https://projectpokemon.org/images/normal-sprite/${this.$translateName(
				this.target.name
			)}.gif`;
			// Set box sprite
			document.getElementById(
				"target-box-sprite"
			).src = `https://www.serebii.net/pokedex-swsh/icon/${this.$formatDexNum(
				this.target.dex_num
			)}.png`;
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
		// Map Vuex functions for light mode and image rendering
		...mapGetters(["lightMode", "gameOver", "target"]),
	},
	watch: {
		// Dynamically set images when target is generated
		target: function () {
            // Delay to allow tiles to render
			this.$nextTick(() => {
				this.setImages();
			});
		},
		// Open modal on game over
		gameOver: function () {
			if (this.gameOver) this.openModal();
		},
        // Light mode styling on toggle
		lightMode: function () {
			this.$updateLightMode("#preview");
		},
	},
	mounted: function () {
		this.$updateLightMode("#preview");
	},
};
</script>

<style lang="scss" scoped>
#preview {
	height: 100%;
	width: 100%;
	color: $accent-color;

	#preview-header {
		font-family: $alt-font;
		font-size: 1.2rem;
		line-height: 1.2rem;
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
		letter-spacing: 2px;
	}

	#preview-labels {
		display: flex;
		justify-content: space-evenly;
		width: 75%;
		margin: 0 auto;
		margin-top: 8px;

		.preview-label {
			color: $accent-color;
			letter-spacing: 1px;
			width: 20%;
			font-size: 0.9rem;
			text-align: center;
		}
	}

	#separator {
		height: 1px;
		background: $accent-color;
		margin: 8px auto;
		border: none;
		width: 75%;
	}

	#tile-container {
		justify-content: space-between;
		margin: 8px auto;
		margin-bottom: 0;
		width: 75%;

		.target-tile {
			background: $tile-color;
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

	.hidden,
	#preview-labels.hidden {
		display: none;
	}
}

#preview.light-mode {
	color: $light-accent-color;

	#preview-labels > .preview-label {
		color: $light-accent-color;
	}

	#separator {
		background: $light-accent-color;
	}
}
</style>
