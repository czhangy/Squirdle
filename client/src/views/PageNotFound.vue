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
};
</script>

<style lang="scss" scoped>
#page-not-found {
	// Sizing
    display: flex;
    height: 100vh;
	width: 100%;
    // Hide scrollbar
    overflow-y: hidden;
    // Layout
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;

    #error-img {
        // Sizing
        height: 400px;
        // Spacing
        margin-bottom: 24px;
    }

    #error-text {
        // Typography
        font-family: $alt-font;
        color: white;
        font-size: 2rem;
        // Spacing
        margin-bottom: 24px;
    }

    #error-link {
        // Typography
        color: white;
        font-family: $alt-font;
        text-decoration: none;
        font-size: 1.3rem;
        // Button styling
        cursor: pointer;
        border: 2px solid white;
        padding: 8px 16px;
    }
}

// Sticky hover
@media (hover: hover) {
    #page-not-found > #error-link:hover {
        // Animate
        background: black;
    }
}
</style>
