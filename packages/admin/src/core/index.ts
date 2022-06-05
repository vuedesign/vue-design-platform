import { createInterceptors } from '@vue-design/core';
import '@/configs/interceptors';
import { createRouter } from '@vue-design/core';
import { createHttp } from '@vue-design/core';
import { createPinia } from 'pinia';
import routes from '@/configs/routes';

export * from '@vue-design/core';
export const http = createHttp({
    baseURL: '',
});
export const router = createRouter({ routes });
export const store = createPinia();
export const interceptors = createInterceptors();
