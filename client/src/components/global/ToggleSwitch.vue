<template>
	<div class="toggle-switch" @click="onClick">
		<div class="switch-thumb" />
	</div>
</template>

<script>
export default {
	name: "ToggleSwitch",
	props: {
        // Function that is executed when the slider is toggled
		onClick: {
			type: Function,
			required: true,
		},
	},
};
</script>

<style lang="scss" scoped>
.toggle-switch {
	cursor: pointer;
	width: 50px;
	background: grey;
	border: 2px solid white;
	border-radius: 20px;
	padding: 2px;
	display: flex;
	align-items: center;

	.switch-thumb {
		background: white;
		height: 18px;
		width: 18px;
		border-radius: 50%;
		transition: all 0.2s ease;
	}
}

.active {
	background: #4cbb17;

	.switch-thumb {
		transform: translateX(24px);
	}
}
</style>
