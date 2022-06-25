import { createRouter, createWebHistory } from 'vue-router';
import routes from '../configs/routes';

export default createRouter({
    history: createWebHistory(),
    routes,
});
