import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { RootState } from '../store';
import * as apis from '../apis.contants';
import { User } from '../../../types/user';
import { TOKEN_KEY } from '../../../globals/globals.contants';
import { axiosBaseQuery } from '../../../globals/axios';
import { HYDRATE } from 'next-redux-wrapper';

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
  //   baseQuery: fetchBaseQuery({
  //     baseUrl: '/api/v1',
  //     prepareHeaders: (headers, { getState }) => {
  //       let token: string;
  //       if (typeof window !== 'undefined') {
  //         token = window.localStorage.getItem(TOKEN_KEY) || '';
  //         console.log('client', token);
  //       } else {
  //         token = (getState() as RootState).auth.token || '';
  //         console.log('server', token);
  //       }
  //       if (token) {
  //         headers.set('Authorization', `Bearer ${token}`);
  //       }
  //       return headers;
  //     },
  //   }),
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
          data,
        };
      },
    }),
    profile: builder.query<any, void>({
      query: () => ({
        url: apis.AUTH_PROFILE,
        method: 'GET',
      }),
    }),
  }),
});

export const { useLoginMutation, useProfileQuery } = authApi;
export const { profile } = authApi.endpoints;
