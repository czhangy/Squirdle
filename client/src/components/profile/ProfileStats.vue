<template>
	<div id="profile-stats">
		<div class="profile-stat">
			<label class="stat-label">CAUGHT</label>
			<p class="stat-count">{{ caught.length }}</p>
		</div>
		<div class="profile-stat">
			<label class="stat-label wide">SEEN</label>
			<p class="stat-count">{{ seen.length }}</p>
		</div>
	</div>
</template>

<script>
export default {
	name: "ProfileStats",
	data() {
		return {
			caught: [],
			seen: [],
		};
	},
	mounted() {
		// Fetch from local storage
		this.caught = JSON.parse(localStorage.caught);
		this.seen = JSON.parse(localStorage.seen);
	},
};
</script>

<style lang="scss" scoped>
#profile-stats {
	margin: 0 auto;
	width: calc(min(100%, 400px));
	display: flex;
	justify-content: space-between;

	.profile-stat {
		color: white;
		width: 150px;

		.stat-label {
			font-size: 2rem;
			letter-spacing: 1px;
			font-weight: bold;
			text-decoration: underline;
			margin-bottom: 16px;
			display: block;
		}

		.wide {
			letter-spacing: 5px;
		}

		.stat-count {
			font-size: 2.5rem;
			line-height: 2.5rem;
			font-family: $alt-font;
		}
	}
}
</style>
