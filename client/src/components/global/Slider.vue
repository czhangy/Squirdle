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
	background: grey;
	border: 2px solid white;
	border-radius: 20px;
	padding: 2px;
	display: flex;
	align-items: center;

	.slider-thumb {
		background: white;
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
