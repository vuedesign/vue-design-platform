import { configureStore } from '@reduxjs/toolkit';
import { createWrapper } from 'next-redux-wrapper';
import { siteApi } from '@/modules/redux/services/siteApi';
import { authApi } from '@/modules/redux/services/authApi';
import { navigationApi } from '@/modules/redux/services/navigationApi';
import { countApi } from '@/modules/redux/services/countApi';
import authReducer from '@/modules/redux/features/authSlice';
import siteReducer from '@/modules/redux/features/siteSlice';

export const makeStore = () =>
  configureStore({
    reducer: {
      [authApi.reducerPath]: authApi.reducer,
      [siteApi.reducerPath]: siteApi.reducer,
      [navigationApi.reducerPath]: navigationApi.reducer,
      [countApi.reducerPath]: countApi.reducer,
      auth: authReducer,
      site: siteReducer,
    },
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware().concat(siteApi.middleware, authApi.middleware),
  });

export type AppStore = ReturnType<typeof makeStore>;
export type RootState = ReturnType<AppStore['getState']>;
export type AppDispatch = AppStore['dispatch'];

export const wrapper = createWrapper<AppStore>(makeStore, { debug: true });
