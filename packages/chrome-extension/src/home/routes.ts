export default [
    {
        path: '/',
        component: () => import('./pages/Home.vue'),
        children: [
            {
                path: 'modal-push',
                component: () => import('./pages/ModalPush.vue'),
            },
        ],
    },
];
