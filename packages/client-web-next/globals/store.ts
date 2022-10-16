import { configureStore } from '@reduxjs/toolkit';
import { createWrapper } from 'next-redux-wrapper';
import { siteApi } from '@/globals/services/siteApi';
import { authApi } from '@/globals/services/authApi';
import { navigationApi } from '@/globals/services/navigationApi';
import { countApi } from '@/globals/services/countApi';
import { userApi } from '@/globals/services/userApi';
import { tagApi } from '@/globals/services/tagApi';
import { configureApi } from '@/globals/services/configureApi';
import authReducer from '@/globals/features/authSlice';
import siteReducer from '@/globals/features/siteSlice';
import globalReducer from '@/globals/features/globalSlice';

export const makeStore = () =>
    configureStore({
        reducer: {
            [authApi.reducerPath]: authApi.reducer,
            [siteApi.reducerPath]: siteApi.reducer,
            [navigationApi.reducerPath]: navigationApi.reducer,
            [countApi.reducerPath]: countApi.reducer,
            [userApi.reducerPath]: userApi.reducer,
            [tagApi.reducerPath]: tagApi.reducer,
            [configureApi.reducerPath]: configureApi.reducer,
            auth: authReducer,
            site: siteReducer,
            global: globalReducer,
        },
        middleware: (getDefaultMiddleware) =>
            getDefaultMiddleware().concat(
                siteApi.middleware,
                authApi.middleware,
                navigationApi.middleware,
                countApi.middleware,
                userApi.middleware,
                tagApi.middleware,
                configureApi.middleware,
            ),
    });

export type AppStore = ReturnType<typeof makeStore>;
export type RootState = ReturnType<AppStore['getState']>;
export type AppDispatch = AppStore['dispatch'];
export const wrapper = createWrapper<AppStore>(makeStore, { debug: false });
