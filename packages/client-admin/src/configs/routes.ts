import globals from '../modules/global/routes';
import homeRoutes from '../modules/home/routes';
import userRoutes from '../modules/user/routes';
import buriedRoutes from '../modules/buried/routes';
import fileRoutes from '../modules/file/routes';
import navigationRoutes from '../modules/navigation/routes';
import siteRoutes from '../modules/site/routes';
import countRoutes from '../modules/count/routes';
import tagRoutes from '../modules/tag/routes';
import configRoutes from '../modules/config/routes';

export default [
    {
        path: '/',
        name: 'contaniner',
        redirect: {
            name: 'home',
        },
        component: () => import(`@/modules/global/pages/VdContainer.vue`),
        children: [
            ...homeRoutes,
            ...userRoutes,
            ...buriedRoutes,
            ...countRoutes,
            ...fileRoutes,
            ...navigationRoutes,
            ...siteRoutes,
            ...tagRoutes,
            ...configRoutes,
        ],
    },
    ...globals,
];
