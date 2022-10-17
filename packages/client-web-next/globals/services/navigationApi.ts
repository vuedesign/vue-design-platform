import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { HYDRATE } from 'next-redux-wrapper';
import * as apis from '@/configs/apis.contants';
import { NavigationListResponse } from '@/globals/types';
import { baseURL } from '@/configs/globals.contants';
import prepareHeaders from '@/globals/utils/prepareHeaders';

export const navigationApi = createApi({
    reducerPath: 'navigationApi',
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
        navigations: builder.query<NavigationListResponse, void>({
            query: () => ({ url: apis.NAVIGATIONS, method: 'get' }),
        }),
    }),
});

export const { useNavigationsQuery } = navigationApi;
export const { navigations } = navigationApi.endpoints;
