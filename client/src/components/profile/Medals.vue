<template>
	<div id="medals">
        Medals will be implemented soon!
    </div>
</template>

<script>
export default {
	name: "Medals",
	props: {
		caught: {
			type: Array,
			required: true,
		},
		seen: {
			type: Array,
			required: true,
		},
	},
};
</script>

<style lang="scss" scoped>
#medals {
    margin: 0 auto;
    margin-top: 16px;
    height: 400px;
    width: 350px;
    color: white;
    font-family: $alt-font;
    font-size: 2rem;
    line-height: 2.5rem;
}
</style>
