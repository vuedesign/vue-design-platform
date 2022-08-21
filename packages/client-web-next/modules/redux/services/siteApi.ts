import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { HYDRATE } from 'next-redux-wrapper';
import * as apis from '@/configs/apis.contants';
import { TOKEN_KEY, baseURL } from '@/configs/globals.contants';
import { RootState } from '@/modules/redux/store';
import { isServer } from '@/globals/utils';
import { SiteListResponse, SiteItem } from '../../pages/site/site';

export const siteApi = createApi({
  reducerPath: 'siteApi',
  baseQuery: fetchBaseQuery({
    baseUrl: baseURL,
    prepareHeaders: (headers, { getState }) => {
      let token: string;
      if (isServer) {
        token = (getState() as RootState).auth.token || '';
      } else {
        token = window.localStorage.getItem(TOKEN_KEY) || '';
      }
      if (token) {
        headers.set('Authorization', `Bearer ${token}`);
      }
      return headers;
    },
  }),
  extractRehydrationInfo(action, { reducerPath }) {
    if (action.type === HYDRATE) {
      return action.payload[reducerPath];
    }
  },
  endpoints: (builder) => ({
    sites: builder.query<SiteListResponse, void>({
      query: () => ({ url: apis.SITES, method: 'get' }),
    }),
    site: builder.query<SiteItem, string>({
      query: (uuid: string) => ({
        url: `${apis.SITES}/${uuid}`,
        method: 'get',
      }),
    }),
  }),
});

export const { useSitesQuery, useSiteQuery } = siteApi;
export const { sites, site } = siteApi.endpoints;
