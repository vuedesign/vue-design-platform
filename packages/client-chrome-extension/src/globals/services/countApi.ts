import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import * as apis from '@/configs/apis.contants';
import { baseURL } from '@/configs/globals.contants';
import { CountItem } from '@/globals/types';
import prepareHeaders from '@/globals/utils/prepareHeaders';

export const countApi = createApi({
    reducerPath: 'countApi',
    baseQuery: fetchBaseQuery({
        baseUrl: baseURL,
        prepareHeaders,
    }),
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
