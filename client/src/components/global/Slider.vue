<template>
	<div class="slider" @click="onClick"></div>
</template>

<script>
export default {
	name: "Slider",
    props: {
        onClick: {
            type: Function,
            required: true,
        }
    }
};
</script>

<style lang="scss" scoped>
.slider {
	cursor: pointer;
}

.active {
}
</style>
