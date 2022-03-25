<template>
	<div id="pokedex">
		<div v-for="i in pokemonList" :key="i" class="pokedex-entry">
			<img alt="" class="pokedex-sprite" />
			<p class="alt-entry" />
		</div>
	</div>
</template>

<script>
// Vuex for data and light mode
import { mapGetters } from "vuex";

export default {
	name: "Pokedex",
	props: {
        // Dex indices of all caught Pokemon
		caught: {
			type: Array,
			required: true,
		},
        // Dex indices of all seen Pokemon
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
				// Show entries based on status
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
		// Map Vuex functions for light mode and data
		...mapGetters(["lightMode", "pokemonList"]),
	},
	watch: {
		// Set sprites when page initially loads
		caught: function () {
            // Delay to allow for rendering
			this.$nextTick(() => this.setSprites());
		},
        // Light mode styling on toggle
		lightMode: function () {
			this.$updateLightMode("#pokedex");
		},
	},
	mounted: function () {
		this.$updateLightMode("#pokedex");
		// Set sprites when page initially loads
		this.$nextTick(() => this.setSprites());
	},
};
</script>

<style lang="scss" scoped>
#pokedex {
	width: 350px;
	height: 350px;
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

#pokedex.light-mode {
    .pokedex-entry > .alt-entry {
        color: $light-accent-color;
    }
}

::-webkit-scrollbar {
	// Disable scrollbar
	display: none;
}
</style>
