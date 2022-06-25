export default [
    {
        name: 'login',
        path: '/login',
        component: () => import('./pages/Login.vue'),
    },
    {
        name: 'register',
        path: '/register',
        component: () => import('./pages/Register.vue'),
    },
];
