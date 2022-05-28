import { createInterceptors } from './interceptors';
import '@/configs/interceptors';
import routes from '@/configs/routes';
import { createRouter } from './router';
import { createHttp } from './http';
import { createPinia } from 'pinia';

const interceptors = createInterceptors();
const http = createHttp({ interceptors });
const router = createRouter({ routes, interceptors });
const store = createPinia();

export * from './interceptors';
export * from './keys';
export { router, http, interceptors, store };
