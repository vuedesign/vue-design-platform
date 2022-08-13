import { createApi } from '@reduxjs/toolkit/query/react';
import { HYDRATE } from 'next-redux-wrapper';
import { axiosBaseQuery } from '../../../globals/axios';
import * as apis from '../apis.contants';
import { NavigationListResponse } from '../../../types/navigation';
import { SiteListResponse } from '../../../types/site';
import { TOKEN_KEY } from '../../../globals/globals.contants';
import { RootState } from '../store';

// const axiosBaseQuery =
//   (): BaseQueryFn<
//     {
//       url: string;
//       method: AxiosRequestConfig['method'];
//       data?: AxiosRequestConfig['data'];
//     },
//     unknown,
//     unknown
//   > =>
//   async ({ url, method, data }) => {
//     try {
//       const result = await axios({ url, method, data });
//       return { data: result };
//     } catch (axiosError) {
//       const err = axiosError as AxiosError;
//       return {
//         error: { status: err.response?.status, data: err.response?.data },
//       };
//     }
//   };

// const baseUrl =
//   typeof window !== 'undefined' ? '/api/v1' : 'http://127.0.0.1:8083/api/v1';
export const clientApi = createApi({
  reducerPath: 'clientApi',
  baseQuery: axiosBaseQuery({
    prepareHeaders: (headers, { getState }) => {
      let token: string;
      if (typeof window !== 'undefined') {
        token = window.localStorage.getItem(TOKEN_KEY) || '';
        console.log('client', token);
      } else {
        token = (getState() as RootState).auth.token || '';
        console.log('server', token);
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
  }),
});

export const { useNavigationsQuery, useSitesQuery } = clientApi;
export const { sites, navigations } = clientApi.endpoints;
