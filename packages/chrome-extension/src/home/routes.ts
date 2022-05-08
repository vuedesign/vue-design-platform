export default [
    {
        path: '/',
        component: () => import('../home/pages/Home.vue'),
        children: [
            {
                path: 'modal-push',
                component: () => import('../home/pages/ModalPush.vue'),
            },
        ],
    },
];
