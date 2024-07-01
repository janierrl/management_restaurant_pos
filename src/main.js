import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
import "@/axios";

import { library } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import { faRobot } from '@fortawesome/free-solid-svg-icons';

library.add(faRobot);

const app = createApp(App);

app.component('font-awesome-icon', FontAwesomeIcon);
app.use(router).use(store).mount('#app');
