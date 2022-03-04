import { createRouter, createWebHistory } from "vue-router";

const routes = [
    {
        path: "/",
        name: "Squirdle",
        component: () => import("@/views/Squirdle.vue"),
    },
    //   {
    //     path: "/:catchAll(.*)",
    //     name: "Error",
    //     component: () => import("@/views/Error.vue"),
    //   },
];

const router = createRouter({
    history: createWebHistory(process.env.BASE_URL),
    routes,
});

export default router;
