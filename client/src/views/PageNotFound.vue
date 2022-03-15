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
        color: white;
        font-size: 2rem;
        margin-bottom: 24px;
    }

    #error-link {
        color: white;
        font-family: $alt-font;
        text-decoration: none;
        font-size: 1.3rem;
        cursor: pointer;
        border: 2px solid white;
        padding: 8px 16px;
    }
}

// Sticky hover
@media (hover: hover) {
    #page-not-found > #error-link:hover {
        background: black;
    }
}
</style>
