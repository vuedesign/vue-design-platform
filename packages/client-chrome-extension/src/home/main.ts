import { createApp } from 'vue';
import App from './App.vue';
import router from '../globals/router';
import routes from './routes';

const app = createApp(App);
app.use(router);
app.mount('#app');
