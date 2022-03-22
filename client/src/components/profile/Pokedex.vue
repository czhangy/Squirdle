<template>
	<div id="pokedex">
		<div v-for="i in pokemon" :key="i" class="pokedex-entry">
			<img alt="" class="pokedex-sprite" />
			<p class="alt-entry" />
		</div>
	</div>
</template>

<script>
// Vuex
import { mapGetters } from "vuex";

export default {
	name: "Pokedex",
	props: {
		caught: {
			type: Array,
			required: true,
		},
		seen: {
			type: Array,
			required: true,
		},
	},
	methods: {
		// Set all tile sprites
		setSprites: function () {
			const sprites = document.getElementsByClassName("pokedex-sprite");
			for (let i = 0; i < sprites.length; i++) {
				const dexNum = this.$formatDexNum(i + 1);
				sprites[
					i
				].src = `https://www.serebii.net/pokedex-swsh/icon/${dexNum}.png`;
				// Handle entries based on status
				if (this.caught.includes(i)) continue;
				if (this.seen.includes(i))
					sprites[i].classList.add("silhouette");
				else {
					sprites[i].classList.add("hide");
					document.getElementsByClassName("alt-entry")[
						i
					].innerHTML = `#${dexNum}`;
				}
			}
		},
	},
	computed: {
		// Map Vuex function
		...mapGetters(["pokemon"]),
	},
	watch: {
		caught: function () {
			// Set sprites when page initially loads
			this.$nextTick(() => this.setSprites());
		},
	},
	mounted: function () {
		// Set sprites when page initially loads
		this.$nextTick(() => this.setSprites());
	},
};
</script>

<style lang="scss" scoped>
#pokedex {
	width: 350px;
	height: 420px;
	overflow-y: scroll;
	margin: 0 auto;
	margin-top: 10px;
	display: grid;
	grid-gap: 5px;
	grid-template-columns: repeat(5, 1fr);

	.pokedex-entry {
		height: 66px;
		width: 66px;
		border: 1px solid $tile-color;
		display: flex;
		justify-content: center;
		align-items: center;

		.pokedex-sprite {
			min-height: 40px;
			min-width: 40px;
			max-height: 60px;
			max-width: 60px;
		}

		.silhouette {
			// Create silhouette of image
			filter: contrast(0%) brightness(50%);
		}

		.hide {
			display: none;
		}

		.alt-entry {
			font-family: $alt-font;
			color: $accent-color;
		}
	}
}

::-webkit-scrollbar {
	// Disable scrollbar
	display: none;
}
</style>
