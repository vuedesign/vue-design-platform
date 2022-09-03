import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { HYDRATE } from 'next-redux-wrapper';
import { RootState } from '@/modules/redux/store';
import { isServer } from '@/globals/utils';
import { TOKEN_KEY, baseURL } from '@/configs/globals.contants';
import * as apis from '@/configs/apis.contants';
import * as HttpStatus from '@/configs/http.contants';
import { UserResponse, LoginRequest } from '../types/auth';

export const authApi = createApi({
  reducerPath: 'authApi',
  baseQuery: fetchBaseQuery({
    baseUrl: baseURL,
    prepareHeaders: (headers, { getState }) => {
      let token: string =
        (isServer
          ? (getState() as RootState).auth.token
          : window.localStorage.getItem(TOKEN_KEY)) || '';
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
    login: builder.mutation<UserResponse, LoginRequest>({
      query: (data) => {
        return {
          url: apis.AUTH_LOGIN,
          method: 'POST',
          body: data,
        };
      },
    }),
    profile: builder.query<any, string>({
      query: (uuid) => ({
        url: apis.AUTH_PROFILE,
        method: 'GET',
      }),
      transformResponse: (data: any) => {
        if (data && data.status === HttpStatus.UNAUTHORIZED) {
          return null;
        }
        return data;
      },
    }),
    user: builder.query<any, string>({
      query: (uuid) => ({
        url: `${apis.AUTH_USERS}/${uuid}`,
        method: 'GET',
      }),
    }),
  }),
});

export const { useLoginMutation, useProfileQuery } = authApi;
export const { profile } = authApi.endpoints;
