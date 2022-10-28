import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { HYDRATE } from 'next-redux-wrapper';
import { baseURL } from '@/configs/globals.contants';
import * as apis from '@/configs/apis.contants';
import prepareHeaders from '@/globals/utils/prepareHeaders';
import { Configure } from '../types/configure';

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
        configure: builder.query<Configure, string>({
            query: (key) => {
                return {
                    url: `${apis.CONFIGURES}/${key}/key`,
                    method: 'GET',
                };
            },
        }),
    }),
});

export const { useConfiguresQuery, useConfigureQuery } = configureApi;
export const { configures, configure } = configureApi.endpoints;
