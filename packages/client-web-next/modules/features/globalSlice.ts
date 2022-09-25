import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import type { RootState } from '@/modules/store';

export interface GlobalState {
    isLoginOpen: boolean;
}

const initialState: GlobalState = {
    isLoginOpen: false,
};

export const slice = createSlice({
    name: 'global',
    initialState,
    reducers: {
        setOpen: (state, { payload }: PayloadAction<boolean>) => {
            state.isLoginOpen = payload;
        },
    },
});

export const { setOpen } = slice.actions;

export default slice.reducer;
export const selectIsLoginOpen = (state: RootState) => state.global.isLoginOpen;
