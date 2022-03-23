<template>
	<div class="slider" @click="onClick">
		<div class="slider-thumb" />
	</div>
</template>

<script>
export default {
	name: "Slider",
	props: {
		onClick: {
			type: Function,
			required: true,
		},
	},
};
</script>

<style lang="scss" scoped>
.slider {
	cursor: pointer;
	width: 50px;
	height: 25px;
	background: grey;
	border: 2px solid $accent-color;
	border-radius: 20px;
	padding: 0 2px;
	display: flex;
	align-items: center;

	.slider-thumb {
		background: $accent-color;
		height: 18px;
		width: 18px;
		border-radius: 50%;
        transition: all 0.2s ease;
	}
}

.active {
	background: #4cbb17;

    .slider-thumb {
        transform: translateX(24px);
    }
}
</style>
