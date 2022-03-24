<template>
	<div id="page-not-found">
		<img id="error-img" src="@/assets/icons/error.png" alt="" />
		<p id="error-text">Hey now... stop poking around</p>
		<router-link id="error-link" to="/">Go to Squirdle</router-link>
	</div>
</template>

<script>
export default {
	name: "PageNotFound",
	mounted: function () {
		this.$initLightMode('#page-not-found');
	},
};
</script>

<style lang="scss" scoped>
#page-not-found {
	display: flex;
	height: 100vh;
	width: 100%;
	overflow-y: hidden;
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;

	#error-img {
		height: 400px;
		margin-bottom: 24px;
	}

	#error-text {
		font-family: $alt-font;
		color: $accent-color;
		font-size: 2rem;
		margin-bottom: 24px;
	}

	#error-link {
		color: $accent-color;
		font-family: $alt-font;
		text-decoration: none;
		font-size: 1.3rem;
		cursor: pointer;
		border: 2px solid $accent-color;
		padding: 8px 16px;
	}
}

#page-not-found.light-mode {
	#error-text {
		color: $light-accent-color;
	}

	#error-link {
		color: $light-accent-color;
		border: 2px solid $light-accent-color;
	}
}

// Sticky hover
@media (hover: hover) {
	#page-not-found > #error-link:hover {
		background: $accent-color;
		color: $main-color;
	}

	#page-not-found.light-mode > #error-link:hover {
		background: $light-accent-color;
		color: $light-main-color;
	}
}
</style>
