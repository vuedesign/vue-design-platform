import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import type { RootState } from '@/modules/store';

export interface GlobalState {
    isLoginOpen: boolean;
    loginState: number;
    cookie: string | null;
}

const initialState: GlobalState = {
    isLoginOpen: false,
    cookie: '',
    loginState: 0,
};

export const slice = createSlice({
    name: 'global',
    initialState,
    reducers: {
        setOpen: (state, { payload }: PayloadAction<boolean>) => {
            state.isLoginOpen = payload;
        },
        setCookie: (state, { payload }: PayloadAction<string | null>) => {
            state.cookie = payload;
        },
        setLoginState: (state) => {
            state.loginState = state.loginState + 1;
        },
    },
});

export const { setOpen, setCookie, setLoginState } = slice.actions;

export default slice.reducer;
export const selectIsLoginOpen = (state: RootState) => state.global.isLoginOpen;
export const selectCookie = (state: RootState) => state.global.cookie;
export const selectLoginState = (state: RootState) => state.global.loginState;
