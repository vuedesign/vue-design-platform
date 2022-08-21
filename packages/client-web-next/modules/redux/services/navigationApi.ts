import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { HYDRATE } from 'next-redux-wrapper';
import * as apis from '@/configs/apis.contants';
import { NavigationListResponse } from '@/globals/types/navigation';
import { TOKEN_KEY, baseURL } from '@/configs/globals.contants';
import { RootState } from '@/modules/redux/store';
import { isServer } from '@/globals/utils';

export const navigationApi = createApi({
  reducerPath: 'navigationApi',
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
  }),
});

export const { useNavigationsQuery } = navigationApi;
export const { navigations } = navigationApi.endpoints;
