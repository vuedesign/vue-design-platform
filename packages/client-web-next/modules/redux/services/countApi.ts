import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { HYDRATE } from 'next-redux-wrapper';
import * as apis from '@/configs/apis.contants';
import { TOKEN_KEY, baseURL } from '@/configs/globals.contants';
import { RootState } from '@/modules/redux/store';
import { isServer } from '@/globals/utils';
import { CountListResponse, CountItem } from '../types/count';

export const countApi = createApi({
  reducerPath: 'countApi',
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
    count: builder.query<number, number | undefined>({
      query: (authorId?: number) => {
        console.log('authorId', authorId);
        return {
          url: `${apis.COUNTS}/${authorId}`,
          method: 'get',
        };
      },
    }),
  }),
});

export const { useCountQuery } = countApi;
export const { count } = countApi.endpoints;
