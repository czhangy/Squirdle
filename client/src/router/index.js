import { createRouter, createWebHistory } from "vue-router";

const routes = [
	{
		path: "/",
		name: "Squirdle",
		component: () => import("@/views/Squirdle.vue"),
	},
    {
        path: "/profile",
        name: "Profile",
        component: () => import("@/views/Profile.vue"),
    },
	{
		path: "/:catchAll(.*)",
		name: "PageNotFound",
		component: () => import("@/views/PageNotFound.vue"),
	},
];

const router = createRouter({
	history: createWebHistory(process.env.BASE_URL),
	routes,
});

export default router;
