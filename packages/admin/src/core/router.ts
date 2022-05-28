import {
    createRouter as _createRouter,
    createWebHistory,
    RouteRecordRaw,
    Router,
} from 'vue-router';
import interceptors from './interceptors';

export interface CreateRouterOptions {
    routes: RouteRecordRaw[];
}
export function createRouter({ routes }: CreateRouterOptions): Router {
    const router = _createRouter({
        history: createWebHistory(),
        routes,
    });
    router.beforeEach((to, from, next) => {
        console.log('beforeEach');
        interceptors.routerBeforeEach &&
            interceptors.routerBeforeEach({ to, from, next });
    });
    router.afterEach((to, from, failure) => {
        console.log('afterEach');
        interceptors.routerBeforeEach &&
            interceptors.routerAfterEach({ to, from, failure });
    });
    router.beforeResolve((to, from, next) => {
        console.log('afterEach');
        interceptors.routerBeforeResolve &&
            interceptors.routerBeforeResolve({ to, from, next });
    });

    return router;
}
