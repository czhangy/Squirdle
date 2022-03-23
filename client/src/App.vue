<template>
	<Navbar v-if="validRoute" />
	<router-view />
</template>

<script>
// Import global component
import Navbar from "@/components/global/Navbar.vue";

export default {
	name: "App",
	components: {
		Navbar,
	},
	computed: {
		validRoute: function () {
			return this.$route.name !== "PageNotFound";
		},
	},
	mounted: function () {
		// Init local storage for first-time users
		if (!localStorage.streak) localStorage.setItem("streak", 0);
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
</style>
