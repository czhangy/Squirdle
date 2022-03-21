<template>
	<div id="profile">
		<ProfileStats />
		<ProfileNav :onClick="handlePageNav" />
	</div>
</template>

<script>
// Import local components
import ProfileStats from "@/components/profile/ProfileStats.vue";
import ProfileNav from "@/components/profile/ProfileNav.vue";

export default {
	name: "Profile",
	components: {
		ProfileStats,
		ProfileNav,
	},
	data() {
		return {
			page: "pokedex",
		};
	},
	methods: {
		handlePageNav: function (newPage) {
			this.page = newPage;
		},
	},
};
</script>

<style lang="scss" scoped>
#profile {
	height: 100%;
	width: 100%;
	padding: 32px;
}
</style>
