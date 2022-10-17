import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { HYDRATE } from 'next-redux-wrapper';
import { baseURL } from '@/configs/globals.contants';
import * as apis from '@/configs/apis.contants';
import { User, UserListResponse } from '@/globals/types';
import { stringify } from 'qs';
import prepareHeaders from '@/globals/utils/prepareHeaders';

export const userApi = createApi({
    reducerPath: 'userApi',
    baseQuery: fetchBaseQuery({
        baseUrl: baseURL,
        prepareHeaders,
    }),
    extractRehydrationInfo(action, { reducerPath }) {
        if (action.type === HYDRATE) {
            return action.payload[reducerPath];
        }
    },
    endpoints: (builder) => ({
        user: builder.query<User, string>({
            query: (uuid) => ({
                url: `${apis.USERS}/${uuid}`,
                method: 'GET',
            }),
        }),
        users: builder.query<UserListResponse, Record<string, number | string>>(
            {
                query: (params = {}) => ({
                    url: `${apis.USERS}?${stringify(params)}`,
                    method: 'GET',
                }),
            },
        ),
    }),
});

export const { useUserQuery, useUsersQuery } = userApi;
export const { user, users } = userApi.endpoints;
