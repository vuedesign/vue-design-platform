import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { HYDRATE } from 'next-redux-wrapper';
import { baseURL } from '@/configs/globals.contants';
import * as apis from '@/configs/apis.contants';

export const userApi = createApi({
    reducerPath: 'userApi',
    baseQuery: fetchBaseQuery({
        baseUrl: baseURL,
    }),
    extractRehydrationInfo(action, { reducerPath }) {
        if (action.type === HYDRATE) {
            return action.payload[reducerPath];
        }
    },
    endpoints: (builder) => ({
        user: builder.query<any, string>({
            query: (uuid) => ({
                url: `${apis.USERS}/${uuid}`,
                method: 'GET',
            }),
        }),
    }),
});

export const { useUserQuery } = userApi;
export const { user } = userApi.endpoints;
