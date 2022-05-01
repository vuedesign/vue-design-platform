import { createRouter, createWebHashHistory } from 'vue-router';

export default (routes: Array<any>) => {
    return createRouter({
        history: createWebHashHistory(),
        routes,
    });
};
