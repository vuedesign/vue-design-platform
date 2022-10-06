import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { HYDRATE } from 'next-redux-wrapper';
import { baseURL } from '@/configs/globals.contants';
import * as apis from '@/configs/apis.contants';
import prepareHeaders from '@/modules/utils/prepareHeaders';

export type ReturnData = Record<
    string,
    Record<string, string> | Record<string, string>[]
>;

export const configureApi = createApi({
    reducerPath: 'configureApi',
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
        configures: builder.query<ReturnData, void>({
            query: () => ({
                url: `${apis.CONFIGURES}`,
                method: 'GET',
            }),
        }),
    }),
});

export const { useConfiguresQuery } = configureApi;
export const { configures } = configureApi.endpoints;
