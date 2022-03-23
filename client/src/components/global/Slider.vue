<template>
	<div class="slider" @click="toggleSlider">
		<div class="slider-thumb" />
	</div>
</template>

<script>
export default {
	name: "Slider",
	props: {
		sliderID: {
            type: Number,
            required: true,
        },
        setting: {
            type: String,
            required: true,
        }
	},
    methods: {
        // Slider control
        toggleSlider: function () {
            const slider = document.getElementsByClassName("slider")[this.sliderID];
            // Toggle on
			if (!localStorage[this.setting] || !JSON.parse(localStorage[this.setting])) {
				slider.classList.add("active");
				localStorage.setItem(this.setting, "true");
			} else {
				slider.classList.remove("active");
				localStorage.setItem(this.setting, "false");
			}
            // WIP management
            if (this.sliderID === 1) alert("This is a WIP");
        }
    }
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
