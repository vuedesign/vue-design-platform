import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import type { RootState } from '@/modules/store';

export interface GlobalState {
    isLoginOpen: boolean;
    cookie: string | null;
}

const initialState: GlobalState = {
    isLoginOpen: false,
    cookie: '',
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
    },
});

export const { setOpen, setCookie } = slice.actions;

export default slice.reducer;
export const selectIsLoginOpen = (state: RootState) => state.global.isLoginOpen;
export const selectCookie = (state: RootState) => state.global.cookie;
