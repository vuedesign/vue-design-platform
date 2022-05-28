import { createInterceptors } from './interceptors';
import '@/configs/interceptors';
import routes from '@/configs/routes';
import { createRouter } from './router';
import { createHttp } from './http';
import { createPinia } from 'pinia';

const http = createHttp({});
const router = createRouter({ routes });
const store = createPinia();
const interceptors = createInterceptors();

export * from './interceptors';
export * from './keys';
export { router, http, store, interceptors };
