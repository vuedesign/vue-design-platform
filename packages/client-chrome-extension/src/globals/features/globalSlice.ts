import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import type { RootState } from '@/globals/store';

export interface GlobalState {
    isLoginVisible: boolean;
    isSettingVisible: boolean;
    loginState: number;
    cookie: string | null;
}

const initialState: GlobalState = {
    isLoginVisible: false,
    isSettingVisible: false,
    cookie: '',
    loginState: 0,
};

export const slice = createSlice({
    name: 'global',
    initialState,
    reducers: {
        setOpen: (state, { payload }: PayloadAction<boolean>) => {
            state.isLoginVisible = payload;
        },
        setCookie: (state, { payload }: PayloadAction<string | null>) => {
            state.cookie = payload;
        },
        setLoginState: (state) => {
            state.loginState = state.loginState + 1;
        },
        setIsSettingVisible: (state, { payload }: PayloadAction<boolean>) => {
            state.isSettingVisible = payload;
        },
    },
});

export const { setOpen, setCookie, setLoginState, setIsSettingVisible } =
    slice.actions;

export default slice.reducer;
export const selectIsLoginVisible = (state: RootState) =>
    state.global.isLoginVisible;
export const selectCookie = (state: RootState) => state.global.cookie;
export const selectLoginState = (state: RootState) => state.global.loginState;
export const selectIsSettingVisible = (state: RootState) =>
    state.global.isSettingVisible;
