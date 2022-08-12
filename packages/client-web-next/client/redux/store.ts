import { configureStore, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { createWrapper } from 'next-redux-wrapper';
import { clientApi } from '../../globals/apis';

interface State {
  token: string;
}
const initialState: State = {
  token: '',
};

const app = createSlice({
  name: 'app',
  initialState,
  reducers: {
    setToken(state, action: PayloadAction<{ token: string }>) {
      const { token } = action.payload;
      //   localStorage.setItem('theme', theme);
      state.token = token;
    },
  },
});

export const { setToken } = app.actions;

export const makeStore = () =>
  configureStore({
    reducer: {
      app: app.reducer,
      [clientApi.reducerPath]: clientApi.reducer,
    },
    middleware: (gDM) => gDM().concat(clientApi.middleware),
  });

export type AppStore = ReturnType<typeof makeStore>;
export type RootState = ReturnType<AppStore['getState']>;
export type AppDispatch = AppStore['dispatch'];

export const wrapper = createWrapper<AppStore>(makeStore, { debug: true });
