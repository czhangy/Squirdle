// Import boilerplate
import { createApp } from "vue";
import App from "./App.vue";

// Import Vue Router and Vuex
import router from "@/router";
import store from "@/store";

// Import plugins
import helpers from "@/plugins/helpers.js";

createApp(App).use(router).use(store).use(helpers).mount("#app");
