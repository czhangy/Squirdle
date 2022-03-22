<template>
	<div id="profile-stats">
		<div class="profile-stat">
			<label class="stat-label">CAUGHT</label>
			<p class="stat-count">{{ caught.length }}</p>
		</div>
		<div class="profile-stat">
			<label class="stat-label">SEEN</label>
			<p class="stat-count">{{ seen.length }}</p>
		</div>
		<div class="profile-stat">
			<label class="stat-label">STREAK</label>
			<p class="stat-count">{{ streak }}</p>
		</div>
	</div>
</template>

<script>
export default {
	name: "ProfileStats",
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
	data() {
		return {
			streak: localStorage.streak,
		};
	},
};
</script>

<style lang="scss" scoped>
#profile-stats {
	margin: 0 auto;
	width: calc(min(100%, 650px));
	display: flex;
	justify-content: space-between;

	.profile-stat {
		color: white;

		.stat-label {
			font-size: 2rem;
			letter-spacing: 2px;
			font-weight: bold;
			text-decoration: underline;
			margin-bottom: 16px;
			display: block;
		}

		.stat-count {
			font-size: 2.5rem;
			line-height: 2.5rem;
			font-family: $alt-font;
		}
	}
}

// Mobile layout
@media screen and (max-width: $mobile) {
	#profile-stats {
		width: auto;
		flex-direction: column;

		.profile-stat {
			margin-bottom: 8px;
            display: flex;
            align-items: center;
            justify-content: center;

			.stat-label {
				font-size: 1.5rem;
				margin-bottom: 0;
                width: 120px;
                text-align: right;
                margin-right: 16px;
			}

            .stat-count {
                font-size: 2rem;
                line-height: 2rem;
                width: 50px;
            }
		}
	}
}
</style>
