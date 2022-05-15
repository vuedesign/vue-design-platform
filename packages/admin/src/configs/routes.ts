import globals from '../modules/globals/routes';
import homeRoutes from '../modules/home/routes';

export default [
    {
        path: '/',
        name: 'contaniner',
        redirect: {
            name: 'home',
        },
        component: () => import(`@/modules/globals/components/VdContainer.vue`),
        children: [...homeRoutes],
    },
    ...globals,
];
