import { router, store, http, interceptors } from '@/core';
import App from '@/App.vue';

const app = createApp(App);
app.use(store);
app.use(router);
app.use(http);
app.use(interceptors);
app.mount('#app');
