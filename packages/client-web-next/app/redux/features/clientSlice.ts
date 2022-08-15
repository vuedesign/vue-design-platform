import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import type { RootState } from '../store';
import { SiteItem } from '../../../types/site';

type ClientState = {
  siteItem: SiteItem | null;
};

const initialState: ClientState = { siteItem: null };

const slice = createSlice({
  name: 'client',
  initialState,
  reducers: {
    setSiteItem: (state, { payload }: PayloadAction<SiteItem>) => {
      state.siteItem = payload;
    },
  },
});

export const { setSiteItem } = slice.actions;

export default slice.reducer;

export const selectCurrentSiteItem = (state: RootState) =>
  state.client.siteItem;
