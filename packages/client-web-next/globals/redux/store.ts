import { configureStore } from '@reduxjs/toolkit';
import { createWrapper } from 'next-redux-wrapper';
import { clientApi } from '../../modules/site/api';
import { authApi } from '../../modules/auth/api';
import authReducer from '../../modules/auth/slice';
import clientReducer from '../../modules/site/slice';

export const makeStore = () =>
  configureStore({
    reducer: {
      [authApi.reducerPath]: authApi.reducer,
      [clientApi.reducerPath]: clientApi.reducer,
      auth: authReducer,
      client: clientReducer,
    },
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware().concat(clientApi.middleware, authApi.middleware),
  });

export type AppStore = ReturnType<typeof makeStore>;
export type RootState = ReturnType<AppStore['getState']>;
export type AppDispatch = AppStore['dispatch'];

export const wrapper = createWrapper<AppStore>(makeStore, { debug: true });
