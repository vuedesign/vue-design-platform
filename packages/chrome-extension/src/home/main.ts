import { createApp } from 'vue';
import App from './App.vue';
import createRouter from '../globals/router';
import routes from './routes';

const app = createApp(App);
const router = createRouter(routes);
app.use(router);
app.mount('#app');
