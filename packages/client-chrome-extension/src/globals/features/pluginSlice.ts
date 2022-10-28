import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import type { RootState } from '@/globals/store';

export interface UserData {
    avatar: string;
    username: string;
}
export type SiteType = 'site' | 'code';
export interface Info {
    tabId?: number;
    title: string;
    description: string;
    tags: string[];
    type: SiteType;
    imgs: string[];
    thumbUrl: string;
    logoUrl: string;
    siteUrl: string;
    codeUrl: string;
    favIconUrl: string;
    star: string;
}

export interface PluginState {
    visible: boolean;
    loading: boolean;
    info: Info;
    user: UserData | null;
}

const initialState: PluginState = {
    visible: false,
    loading: false,
    info: {} as Info,
    user: null,
};

export const slice = createSlice({
    name: 'plugin',
    initialState,
    reducers: {
        setVisible: (state, { payload }: PayloadAction<boolean>) => {
            chrome.storage.local.set({
                visible: payload,
            });
            state.visible = payload;
        },
        setLoading: (state, { payload }: PayloadAction<boolean>) => {
            state.loading = payload;
        },
        setInfo: (state, { payload }) => {
            state.info = payload;
        },
        setUser: (state, { payload }: PayloadAction<any>) => {
            state.user = payload;
        },
    },
});

export const { setVisible, setLoading, setInfo, setUser } = slice.actions;

export default slice.reducer;
export const selectVisible = (state: RootState) => state.plugin.visible;
export const selectLoading = (state: RootState) => state.plugin.loading;
export const selectInfo = (state: RootState) => state.plugin.info;
export const selectUser = (state: RootState) => state.plugin.user;
export const selectImgWrapWidth = (state: RootState) => {
    if (!state.plugin.info?.imgs) {
        return 0;
    }
    return (
        state.plugin.info.imgs.length * 100 +
        (state.plugin.info.imgs.length - 1) * 7
    );
};
