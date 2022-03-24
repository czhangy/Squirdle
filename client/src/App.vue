<template>
	<Navbar v-if="validRoute" />
	<router-view />
</template>

<script>
// Vuex
import { mapGetters, mapMutations } from "vuex";

// Import global component
import Navbar from "@/components/global/Navbar.vue";

export default {
	name: "App",
	components: {
		Navbar,
	},
	methods: {
		// Map Vuex functions
		...mapMutations(["setLightMode", "setHardMode"]),
		// Set game state based on local storage
		restoreGameState: function () {
			// Restore light mode
			if (localStorage.lightMode)
				this.setLightMode(JSON.parse(localStorage.lightMode));
			// Restore hard mode
			if (localStorage.hardMode)
				this.setHardMode(JSON.parse(localStorage.hardMode));
		},
	},
	computed: {
		// Map Vuex function for light mode
		...mapGetters(["lightMode"]),
		validRoute: function () {
			return this.$route.name !== "PageNotFound";
		},
	},
	watch: {
		lightMode: function () {
			this.$updateLightMode('html');
		},
	},
	mounted: function () {
		this.restoreGameState();
        this.$updateLightMode('html');
	},
};
</script>

<style lang="scss">
// Import font
@import url("https://fonts.googleapis.com/css2?family=Bungee&display=swap");

#app {
	font-family: $main-font;
	-webkit-font-smoothing: antialiased;
	-moz-osx-font-smoothing: grayscale;
	text-align: center;
	// Site color
	background: $main-color;
	// Site sizing
	width: 100%;
}

* {
	// Remove default spacing
	margin: 0;
	box-sizing: border-box;
}

html {
	// Handle background on overscroll
	background: $main-color;
}

html.light-mode {
	// Handle background on overscroll
	background: $light-main-color !important;

	#app {
		background: $light-main-color;
	}
}
</style>
