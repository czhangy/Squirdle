<template>
	<div id="pokedex">
		<div v-for="i in pokemon" :key="i" class="pokedex-entry">
			<img alt="" class="pokedex-sprite" />
		</div>
	</div>
</template>

<script>
// Vuex
import { mapGetters } from "vuex";

export default {
	name: "Pokedex",
	methods: {
		// Set all tile sprites
		setSprites: function () {
			const sprites = document.getElementsByClassName("pokedex-sprite");
			for (let i = 0; i < sprites.length; i++)
				sprites[
					i
				].src = `https://www.serebii.net/pokedex-swsh/icon/${this.$formatDexNum(
					i + 1
				)}.png`;
		},
	},
	computed: {
		// Map Vuex function
		...mapGetters(["pokemon"]),
	},
    watch: {
        pokemon: function () {
            // Set sprites when page initially loads
            this.$nextTick(() => this.setSprites());
        }
    },
	mounted: function () {
        this.setSprites();
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
	}
}

::-webkit-scrollbar {
	// Disable scrollbar
	display: none;
}
</style>
