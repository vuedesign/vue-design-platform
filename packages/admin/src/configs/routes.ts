import globals from '../modules/globals/routes';
import homeRoutes from '../modules/home/routes';
import userRoutes from '../modules/user/routes';
import buriedRoutes from '../modules/buried/routes';
import materialRoutes from '../modules/material/routes';
import navigationRoutes from '../modules/navigation/routes';

export default [
    {
        path: '/',
        name: 'contaniner',
        redirect: {
            name: 'home',
        },
        component: () => import(`@/modules/globals/components/VdContainer.vue`),
        children: [
            ...homeRoutes,
            ...userRoutes,
            ...buriedRoutes,
            ...materialRoutes,
            ...navigationRoutes,
        ],
    },
    ...globals,
];
