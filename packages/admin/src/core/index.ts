import '@/configs/interceptors';
import routes from '@/configs/routes';
import createRouter from './router';
import createHttp from './http';
import createInterceptors from './interceptors';
import { createPinia, Pinia } from 'pinia';
export * from './keys';

const interceptors = createInterceptors();
const http = createHttp(interceptors);
const router = createRouter(routes, interceptors);
const store: Pinia = createPinia();

export { router, http, interceptors, store };
