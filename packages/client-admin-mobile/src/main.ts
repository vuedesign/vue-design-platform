import { createApp } from 'vue';
import { createPinia } from 'pinia';
import { StyleProvider } from '@varlet/ui';
import { router } from '@/core';
import App from './App.vue';

const app = createApp(App);
// app.config.productionTip = false;
app.use(createPinia());
app.use(router);
// app.use(Varlet);
StyleProvider({
    // '--bottom-navigation-height': '64px',
});
app.mount('#app');
