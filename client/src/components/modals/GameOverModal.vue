<template>
	<Modal id="game-over-modal" ref="game-over-modal" modalID="game-over-modal">
		<div id="game-over">
			<h2 v-if="win && numGuesses === 1" id="game-over-header">
				YOU GOT IT IN {{ numGuesses }} GUESS!
			</h2>
			<h2 v-else-if="win" id="game-over-header">
				YOU GOT IT IN {{ numGuesses }} GUESSES!
			</h2>
			<h2 v-else id="game-over-header">BETTER LUCK NEXT TIME!</h2>
			<p class="game-over-text">The Pokémon was:</p>
			<br />
			<img id="target-sprite" alt="Target Pokemon" />
			<br />
			<br />
			<p id="target-name" class="game-over-text" />
		</div>
	</Modal>
</template>

<script>
// Import global component
import Modal from "@/components/global/Modal.vue";

export default {
	name: "GameOver",
	components: {
		Modal,
	},
	props: {
		win: {
			type: Boolean,
			required: true,
		},
		numGuesses: {
			type: Number,
			required: true,
		},
		target: {
			type: Object,
			required: true,
		},
	},
    methods: {
		openModal: function () {
			this.$refs["game-over-modal"].openModal();
		},
	},
};
</script>

<style lang="scss" scoped>
#game-over {
	// Sizing
	height: 100%;
	width: 100%;

	#game-over-header {
		// Typography
		font-family: $alt-font;
		font-size: 1.2rem;
		line-height: 1.2rem;
		color: white;
		text-decoration: underline;
		// Spacing
		margin-bottom: 32px;
	}

	.game-over-text {
		// Typography
		color: white;
		font-weight: bold;
		font-size: 1.5rem;
	}

	#target-name {
		// Typography
		font-family: $alt-font;
		line-height: 1.5rem;
		letter-spacing: 2px;
	}
}
</style>
