<template>
	<div id="profile">
		<ProfileStats />
		<ProfileNav :onClick="handlePageNav" />
		<Pokedex />
	</div>
</template>

<script>
// Vuex
import { mapActions, mapGetters } from "vuex";

// Import local components
import ProfileStats from "@/components/profile/ProfileStats.vue";
import ProfileNav from "@/components/profile/ProfileNav.vue";
import Pokedex from "@/components/profile/Pokedex.vue";

export default {
	name: "Profile",
	components: {
		ProfileStats,
		ProfileNav,
		Pokedex,
	},
	data() {
		return {
			page: "pokedex",
		};
	},
	methods: {
		// Map Vuex functions
		...mapActions(["fetchPokemonList", "generateNewTarget"]),
		// Nav control
		handlePageNav: function (newPage) {
			this.page = newPage;
		},
	},
	computed: {
		...mapGetters(["pokemon"]),
	},
	mounted: async function () {
		// Initial fetch of all pokemon
		if (this.pokemon.length === 0) await this.fetchPokemonList();
	},
};
</script>

<style lang="scss" scoped>
#profile {
	height: 100%;
	width: 100%;
	padding: 32px;
}
</style>
