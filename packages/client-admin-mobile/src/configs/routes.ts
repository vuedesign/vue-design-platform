import globals from '../modules/globals/routes';
import homeRoutes from '../modules/home/routes';
import manageRoutes from '../modules/manage/routes';
import reportRoutes from '../modules/report/routes';
import mineRoutes from '../modules/mine/routes';

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
            ...manageRoutes,
            ...reportRoutes,
            ...mineRoutes,
        ],
    },
    ...globals,
];
