<template>
	<div id="profile-nav">
		<div id="nav-buttons">
			<button
				id="pokedex-button"
				class="nav-button active-button"
				@click="handlePokedexNav"
			>
				POKÉDEX
			</button>
			<button
				id="medals-button"
				class="nav-button"
				@click="handleMedalsNav"
			>
				MEDALS
			</button>
		</div>
		<hr id="separator" />
	</div>
</template>

<script>
// Vuex for light mode
import { mapGetters } from "vuex";

export default {
	name: "ProfileNav",
	props: {
		// Function that executes in Profile on button click
		onClick: {
			type: Function,
			required: true,
		},
	},
	methods: {
		// Nav controls
		handlePokedexNav: function () {
			// Handle button styling
			document
				.getElementById("pokedex-button")
				.classList.add("active-button");
			document
				.getElementById("medals-button")
				.classList.remove("active-button");
			this.onClick("pokedex");
		},
		handleMedalsNav: function () {
			// Handle button styling
			document
				.getElementById("medals-button")
				.classList.add("active-button");
			document
				.getElementById("pokedex-button")
				.classList.remove("active-button");
			this.onClick("medals");
		},
	},
	computed: {
		// Map Vuex function for light mode
		...mapGetters(["lightMode"]),
	},
	watch: {
		// Light mode styling on toggle
		lightMode: function () {
			this.$updateLightMode("#profile-nav");
		},
	},
	mounted: function () {
		this.$updateLightMode("#profile-nav");
	},
};
</script>

<style lang="scss" scoped>
#profile-nav {
	margin: 0 auto;
	margin-top: 64px;
	width: 350px;

	#nav-buttons {
		display: flex;
		justify-content: space-evenly;

		.nav-button {
			cursor: pointer;
			height: 60px;
			width: 150px;
			font-family: $alt-font;
			font-size: 1.5rem;
			line-height: 1.5rem;
			background: $main-color;
			color: $accent-color;
			border: 2px solid $accent-color;
			border-bottom: none;
			transition: all 0.2s ease;
			// Disable transitions on color change
			transition: color 0s ease;
			// Center button text
			display: flex;
			justify-content: center;
			align-items: center;
		}

		.active-button {
			background: $accent-color;
			color: $main-color;
		}
	}

	#separator {
		height: 2px;
		background: $accent-color;
		border: none;
	}
}

#profile-nav.light-mode {
	#nav-buttons {
		.nav-button {
			background: $light-main-color;
			color: $light-accent-color;
			border-color: $light-accent-color;
		}

		.active-button {
			background: $light-accent-color;
			color: $light-main-color;
		}
	}

	#separator {
		background: $light-accent-color;
	}
}

// Sticky hover
@media (hover: hover) {
	#profile-nav > #nav-buttons > .nav-button:hover {
		margin-top: -10px;
		height: 70px;
	}
}

// Mobile layout
@media screen and (max-width: $mobile) {
	#profile-nav {
		// Chill on spacing
		margin-top: 32px;
	}
}
</style>
