<template>
	<div class="medal" :class="{ obtained: obtained }">
		<img
			v-if="medal.type === 'bronze'"
			src="@/assets/icons/bronze.png"
			alt="Bronze Medal"
			class="medal-icon"
		/>
		<img
			v-else-if="medal.type === 'silver'"
			src="@/assets/icons/silver.png"
			alt="Silver Medal"
			class="medal-icon"
		/>
		<img
			v-else
			src="@/assets/icons/gold.png"
			alt="Gold Medal"
			class="medal-icon"
		/>
		<div class="medal-text">
			<p class="medal-title">{{ medal.title }}</p>
			<p v-if="obtained" class="medal-desc">{{ medal.desc }}</p>
			<p v-else class="medal-desc">???</p>
		</div>
	</div>
</template>

<script>
export default {
	name: "Medal",
	props: {
        // Boolean value that determines if the medal has been obtained
		obtained: {
			type: Boolean,
			default: false,
		},
        // Object containing medal information
		medal: {
			type: Object,
			required: true,
		},
	},
};
</script>

<style lang="scss" scoped>
.medal {
	width: 100%;
	height: 100px;
	border: 1px solid $tile-color;
	display: flex;
	justify-content: space-evenly;
	align-items: center;
	padding: 24px;
	margin-bottom: 8px;

	&:last-child {
		margin-bottom: 0;
	}

	.medal-icon {
		height: 50px;
		filter: brightness(30%);
	}

	.medal-text {
		color: $accent-color;
		text-align: left;
		
		width: 70%;

		.medal-title {
			font-family: $alt-font;
			line-height: 1rem;
			margin-bottom: 8px;
		}

		.medal-desc {
			letter-spacing: 1px;
		}
	}
}

.obtained {
    // Separate filters so the borders aren't dimmed
	.medal-icon {
		filter: brightness(100%);
	}

    .medal-text {
        filter: brightness(100%);
    }
}

.medal.light-mode {
    .medal-text {
        color: $light-accent-color !important;
    }
}
</style>
