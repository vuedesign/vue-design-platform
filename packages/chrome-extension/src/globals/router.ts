import { createRouter, createWebHashHistory } from 'vue-router';
import routes from '../home/routes';

export default createRouter({
    history: createWebHashHistory(),
    routes,
});
