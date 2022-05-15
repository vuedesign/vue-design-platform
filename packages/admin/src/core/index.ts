import router from './router';
import createHttp, { setAuthorization } from './http';
import interceptors from './interceptors';

const http = createHttp(interceptors);
import('@/configs/interceptors').then(() => {
    interceptors.onGlobalConfigCallback &&
        interceptors.onGlobalConfigCallback(http);
});

export { router, http, setAuthorization };
