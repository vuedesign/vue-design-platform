import {
    createRouter,
    createWebHistory,
    RouteRecordRaw,
    Router,
} from 'vue-router';
import { Interceptors } from './interceptors';

export default (
    routes: RouteRecordRaw[],
    interceptors: Interceptors,
): Router => {
    const router = createRouter({
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
            interceptors.routerBeforeResolve({ next });
    });

    return router;
};
