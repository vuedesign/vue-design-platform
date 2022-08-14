import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { RootState } from '../store';
import * as apis from '../apis.contants';
import { User } from '../../../types/user';
import { TOKEN_KEY, baseURL } from '../globals.contants';
import * as HttpStatus from '../http.contants';
import { HYDRATE } from 'next-redux-wrapper';
import { isServer } from '../../utils';

export interface UserResponse {
  user: User;
  token: string;
}

export interface LoginRequest {
  account: string;
  password: string;
}

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
    profile: builder.query<any, void>({
      query: () => ({
        url: apis.AUTH_PROFILE,
        method: 'GET',
      }),
      transformResponse: (data: any) => {
        console.log('data', data);
        if (data && data.status === HttpStatus.UNAUTHORIZED) {
          return null;
        }
        return data;
      },
    }),
  }),
});

export const { useLoginMutation, useProfileQuery } = authApi;
export const { profile } = authApi.endpoints;
