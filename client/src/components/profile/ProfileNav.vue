<template>
	<div id="profile-nav">
		<div id="nav-buttons">
			<button id="pokedex-button" class="nav-button active-button" @click="handlePokedexNav">
				POKÉDEX
			</button>
			<button id="medals-button" class="nav-button" @click="handleMedalsNav">MEDALS</button>
		</div>
		<hr id="separator" />
	</div>
</template>

<script>
export default {
	name: "ProfileNav",
    props: {
        onClick: {
            type: Function,
            required: true,
        }
    },
    methods: {
        handlePokedexNav: function () {
            // Handle button styling
            document.getElementById("pokedex-button").classList.add("active-button");
            document.getElementById("medals-button").classList.remove("active-button");
            this.onClick("pokedex");
        },
        handleMedalsNav: function () {
            // Handle button styling
            document.getElementById("medals-button").classList.add("active-button");
            document.getElementById("pokedex-button").classList.remove("active-button");
            this.onClick("medals");
        },
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
            text-align: center;
		}

		.active-button {
			background: $accent-color;
			color: $main-color;
			border: none;
		}
	}

	#separator {
		height: 2px;
		background: $accent-color;
		border: none;
	}
}

// Sticky hover
@media (hover: hover) {
    #profile-nav > #nav-buttons > .nav-button:hover {
        margin-top: -10px;
        height: 70px;
    }
}
</style>
