import {
  BaseQueryFn,
  createApi,
  fetchBaseQuery,
} from '@reduxjs/toolkit/query/react';
import { HYDRATE } from 'next-redux-wrapper';
// import queryString from 'query-string';
import axios from './axios';
import { AxiosRequestConfig, AxiosError } from 'axios';
import * as apis from './apis.contants';
import { NavigationListResponse } from '../types/navigation';
import { User } from '../types/user';
import { SiteListResponse } from '../types/site';
import { LoginFormData } from '../types/global';

const axiosBaseQuery =
  (): BaseQueryFn<
    {
      url: string;
      method: AxiosRequestConfig['method'];
      data?: AxiosRequestConfig['data'];
    },
    unknown,
    unknown
  > =>
  async ({ url, method, data }) => {
    try {
      const result = await axios({ url, method, data });
      return { data: result };
    } catch (axiosError) {
      const err = axiosError as AxiosError;
      console.log('err======', err);
      return {
        error: { status: err.response?.status, data: err.response?.data },
      };
    }
  };

// const baseUrl =
//   typeof window !== 'undefined' ? '/api/v1' : 'http://127.0.0.1:8083/api/v1';
export const clientApi = createApi({
  reducerPath: 'clientApi',
  baseQuery: axiosBaseQuery(),
  extractRehydrationInfo(action, { reducerPath }) {
    if (action.type === HYDRATE) {
      return action.payload[reducerPath];
    }
  },
  endpoints: (builder) => ({
    authLogin: builder.mutation<any, LoginFormData>({
      query: (data) => ({ url: apis.AUTH_LOGIN, method: 'post', data }),
    }),
    authProfile: builder.query<User, void>({
      query: () => ({ url: apis.AUTH_PROFILE, method: 'get' }),
    }),
    navigations: builder.query<NavigationListResponse, void>({
      query: () => ({ url: apis.NAVIGATIONS, method: 'get' }),
    }),
    sites: builder.query<SiteListResponse, void>({
      query: () => ({ url: apis.SITES, method: 'get' }),
    }),
  }),
});

// Export hooks for usage in functional components
export const {
  useAuthLoginMutation,
  useNavigationsQuery,
  useAuthProfileQuery,
  useSitesQuery,
  useLazySitesQuery,
} = clientApi;

export const { authLogin, authProfile, sites, navigations } =
  clientApi.endpoints;
