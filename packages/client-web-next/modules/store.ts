import { configureStore } from '@reduxjs/toolkit';
import { createWrapper } from 'next-redux-wrapper';
import { siteApi } from '@/modules/services/siteApi';
import { authApi } from '@/modules/services/authApi';
import { navigationApi } from '@/modules/services/navigationApi';
import { countApi } from '@/modules/services/countApi';
import { userApi } from '@/modules/services/userApi';
import { tagApi } from '@/modules/services/tagApi';
import authReducer from '@/modules/features/authSlice';
import siteReducer from '@/modules/features/siteSlice';

export const makeStore = () =>
    configureStore({
        reducer: {
            [authApi.reducerPath]: authApi.reducer,
            [siteApi.reducerPath]: siteApi.reducer,
            [navigationApi.reducerPath]: navigationApi.reducer,
            [countApi.reducerPath]: countApi.reducer,
            [userApi.reducerPath]: userApi.reducer,
            [tagApi.reducerPath]: tagApi.reducer,
            auth: authReducer,
            site: siteReducer,
        },
        middleware: (getDefaultMiddleware) =>
            getDefaultMiddleware().concat(
                siteApi.middleware,
                authApi.middleware,
                navigationApi.middleware,
                countApi.middleware,
                userApi.middleware,
                tagApi.middleware,
            ),
    });

export type AppStore = ReturnType<typeof makeStore>;
export type RootState = ReturnType<AppStore['getState']>;
export type AppDispatch = AppStore['dispatch'];
export const wrapper = createWrapper<AppStore>(makeStore, { debug: false });
