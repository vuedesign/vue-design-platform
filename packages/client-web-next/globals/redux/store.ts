import { configureStore } from '@reduxjs/toolkit';
import { createWrapper } from 'next-redux-wrapper';
import { siteApi } from '@/modules/site/api';
import { authApi } from '@/modules/auth/api';
import { navigationApi } from '@/modules/navigation/api';
import authReducer from '@/modules/auth/slice';
import siteReducer from '@/modules/site/slice';

export const makeStore = () =>
  configureStore({
    reducer: {
      [authApi.reducerPath]: authApi.reducer,
      [siteApi.reducerPath]: siteApi.reducer,
      [navigationApi.reducerPath]: navigationApi.reducer,
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
