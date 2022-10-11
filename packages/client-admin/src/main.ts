import { router, store, http, interceptors } from '@/core';
import App from '@/App.vue';
import { Plugin } from 'vue';
// 修复message-box 与 message 样式导入问题，临时方案
import '@vue-design/theme-2n-demands/message-box/scss';
import '@vue-design/theme-2n-demands/message/scss';
import '@vue-design/theme-2n-demands/notification/scss';

const app = createApp(App);
app.use(store);
app.use(router as Plugin);
app.use(http as Plugin);
app.use(interceptors as Plugin);
app.mount('#app');
