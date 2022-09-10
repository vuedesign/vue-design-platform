import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { HYDRATE } from 'next-redux-wrapper';
import * as apis from '@/configs/apis.contants';
import { TOKEN_KEY, baseURL } from '@/configs/globals.contants';
import { RootState } from '@/modules/store';
import { isServer } from '@/modules/utils';
import { CountListResponse, CountItem } from '@/modules/types';

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
        countProfile: builder.query<CountItem, void>({
            query: () => {
                return {
                    url: apis.COUNTS_PROFILE,
                    method: 'get',
                };
            },
        }),
        count: builder.query<CountItem, number | undefined>({
            query: (authorId?: number) => {
                return {
                    url: `${apis.COUNTS}/${authorId}`,
                    method: 'get',
                };
            },
        }),
    }),
});

export const { useCountQuery, useCountProfileQuery } = countApi;
export const { count, countProfile } = countApi.endpoints;
