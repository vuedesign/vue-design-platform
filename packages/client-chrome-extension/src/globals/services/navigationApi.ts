import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
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
    endpoints: (builder) => ({
        navigations: builder.query<NavigationListResponse, void>({
            query: () => ({ url: apis.NAVIGATIONS, method: 'get' }),
        }),
    }),
});

export const { useNavigationsQuery } = navigationApi;
export const { navigations } = navigationApi.endpoints;
