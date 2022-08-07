import { configureStore } from '@reduxjs/toolkit';
import { createWrapper } from 'next-redux-wrapper';
import { clientApi } from '../../globals/apis';

export const makeStore = () =>
  configureStore({
    reducer: {
      [clientApi.reducerPath]: clientApi.reducer,
    },
    middleware: (gDM) => gDM().concat(clientApi.middleware),
  });

export type AppStore = ReturnType<typeof makeStore>;
export type RootState = ReturnType<AppStore['getState']>;
export type AppDispatch = AppStore['dispatch'];

export const wrapper = createWrapper<AppStore>(makeStore, { debug: true });
