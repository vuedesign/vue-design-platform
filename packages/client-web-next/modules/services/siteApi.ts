import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { HYDRATE } from 'next-redux-wrapper';
import * as apis from '@/configs/apis.contants';
import { TOKEN_KEY, baseURL } from '@/configs/globals.contants';
import { RootState } from '@/modules/store';
import { isServer } from '@/modules/utils';
import { SiteListResponse, SiteItem } from '@/modules/types';
import { slice } from '@/modules/features/siteSlice';
import { stringify } from 'qs';

export const siteApi = createApi({
    reducerPath: 'siteApi',
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
        sites: builder.query<SiteListResponse, Record<string, any>>({
            query: (params = {}) => {
                return {
                    url: `${apis.SITES}?${stringify(params)}`,
                    method: 'get',
                };
            },
        }),
        site: builder.query<SiteItem, string>({
            query: (uuid) => ({
                url: `${apis.SITES}/${uuid}`,
                method: 'get',
            }),
        }),
        sitesAssociate: builder.query<SiteItem, Record<string, any>>({
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
