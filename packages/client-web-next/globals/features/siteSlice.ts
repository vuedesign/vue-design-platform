import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import type { RootState } from '@/modules/store';
import { SiteItem, SiteState, SiteQuery } from '@/globals/types/site';

const initialState: SiteState = {
    siteItem: null,
    query: {
        order: 'new',
        type: 'all',
    },
};

export const slice = createSlice({
    name: 'site',
    initialState,
    reducers: {
        setSiteItem: (state, { payload }: PayloadAction<SiteItem>) => {
            state.siteItem = payload;
        },
        setQuery: (state, { payload }: PayloadAction<SiteQuery>) => {
            Object.assign(state.query, payload);
        },
    },
});

export const { setSiteItem, setQuery } = slice.actions;

export default slice.reducer;

export const selectCurrentSiteItem = (state: RootState) => state.site.siteItem;
export const selectCurrentQuery = (state: RootState) => state.site.query;
