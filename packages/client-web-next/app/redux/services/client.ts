import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { HYDRATE } from 'next-redux-wrapper';
import * as apis from '../apis.contants';
import { NavigationListResponse } from '../../../types/navigation';
import { SiteListResponse, SiteItem } from '../../../types/site';
import { TOKEN_KEY, baseURL } from '../globals.contants';
import { RootState } from '../store';
import { isServer } from '../../utils';

export const clientApi = createApi({
  reducerPath: 'clientApi',
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
    navigations: builder.query<NavigationListResponse, void>({
      query: () => ({ url: apis.NAVIGATIONS, method: 'get' }),
    }),
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

export const { useNavigationsQuery, useSitesQuery, useSiteQuery } = clientApi;
export const { sites, navigations, site } = clientApi.endpoints;
