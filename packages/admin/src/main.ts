import { createApp } from 'vue';
import { createPinia } from 'pinia';
import ElementPlus from 'element-plus';
import { router } from '@/core';
import App from './App.vue';

const app = createApp(App);
// app.config.productionTip = false;
app.use(createPinia());
app.use(router);
app.use(ElementPlus);
app.mount('#app');
