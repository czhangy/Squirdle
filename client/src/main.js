// Import boilerplate
import { createApp } from "vue";
import App from "./App.vue";

// Import router and Vuex
import router from './router';
import store from './store';

createApp(App).use(router).use(store).mount("#app");
