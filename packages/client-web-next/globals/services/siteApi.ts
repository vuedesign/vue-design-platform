import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { HYDRATE } from 'next-redux-wrapper';
import * as apis from '@/configs/apis.contants';
import { baseURL } from '@/configs/globals.contants';
import { SiteListResponse, SiteItem } from '@/globals/types';
import { stringify } from 'qs';
import prepareHeaders from '@/globals/utils/prepareHeaders';

export const siteApi = createApi({
    reducerPath: 'siteApi',
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
        sites: builder.query<SiteListResponse, Record<string, any>>({
            query: (params = {}) => {
                return {
                    url: `${apis.SITES}?${stringify(params)}`,
                    method: 'get',
                };
            },
        }),
        site: builder.query<SiteItem, string>({
            query: (uuid) => {
                return {
                    url: `${apis.SITES}/${uuid}`,
                    method: 'get',
                };
            },
        }),
        sitesAssociate: builder.query<SiteListResponse, Record<string, any>>({
            query: (params = {}) => {
                const { uuid, ...query } = params;
                return {
                    url: `${apis.SITES}/${uuid}/associate?${stringify(query)}`,
                    method: 'get',
                };
            },
        }),
    }),
});

export const { useSitesQuery, useSiteQuery, useSitesAssociateQuery } = siteApi;
export const { sites, site, sitesAssociate } = siteApi.endpoints;
