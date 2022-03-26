<template>
	<div id="profile">
		<ProfileStats :caught="caught" :seen="seen" />
		<ProfileNav :onClick="handlePageNav" />
		<Pokedex v-if="page === 'pokedex'" :caught="caught" :seen="seen" />
		<Medals v-if="page === 'medals'" :caught="caught" :seen="seen" />
	</div>
</template>

<script>
// Vuex
import { mapActions, mapGetters } from "vuex";

// Import local components
import ProfileStats from "@/components/profile/ProfileStats.vue";
import ProfileNav from "@/components/profile/ProfileNav.vue";
import Pokedex from "@/components/profile/Pokedex.vue";
import Medals from "@/components/profile/Medals.vue";

export default {
	name: "Profile",
	components: {
		ProfileStats,
		ProfileNav,
		Pokedex,
        Medals
	},
	data() {
		return {
			page: "pokedex",
			caught: [],
			seen: [],
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
		...mapGetters(["pokemonList"]),
	},
	mounted: async function () {
		// Initial fetch of all pokemon
		if (this.pokemonList.length === 0) await this.fetchPokemonList();
		// Fetch data from local storage
		this.caught = localStorage.caught ? JSON.parse(localStorage.caught) : [];
		this.seen = localStorage.seen ? JSON.parse(localStorage.seen) : [];
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
