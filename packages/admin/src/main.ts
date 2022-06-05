import { router, store, http, interceptors } from '@/core';
import App from '@/App.vue';
import { Plugin } from 'vue';

const app = createApp(App);
app.use(store);
app.use(router);
app.use(http as Plugin);
app.use(interceptors as Plugin);
app.mount('#app');
