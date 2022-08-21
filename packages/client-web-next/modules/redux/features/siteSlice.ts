import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import type { RootState } from '@/modules/redux/store';
import { SiteItem, SiteState } from '../../pages/site/site';

const initialState: SiteState = { siteItem: null };

const slice = createSlice({
  name: 'site',
  initialState,
  reducers: {
    setSiteItem: (state, { payload }: PayloadAction<SiteItem>) => {
      state.siteItem = payload;
    },
  },
});

export const { setSiteItem } = slice.actions;

export default slice.reducer;

export const selectCurrentSiteItem = (state: RootState) => state.site.siteItem;
