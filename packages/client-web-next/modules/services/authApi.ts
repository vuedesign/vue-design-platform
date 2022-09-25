import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { HYDRATE } from 'next-redux-wrapper';
import { RootState } from '@/modules/store';
import { isServer } from '@/modules/utils';
import { TOKEN_KEY, baseURL } from '@/configs/globals.contants';
import * as apis from '@/configs/apis.contants';
import * as HttpStatus from '@/configs/http.contants';
import type {
    UserResponse,
    LoginRequest,
    User,
    SiteListResponse,
    SiteItem,
    LikeParam,
} from '@/modules/types';
import { stringify } from 'qs';

export const authApi = createApi({
    reducerPath: 'authApi',
    baseQuery: fetchBaseQuery({
        baseUrl: baseURL,
        prepareHeaders: (headers, { getState }) => {
            let token: string =
                (isServer
                    ? (getState() as RootState).auth.token
                    : window.localStorage.getItem(TOKEN_KEY)) || '';
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
        login: builder.mutation<UserResponse, LoginRequest>({
            query: (data) => {
                return {
                    url: apis.AUTH_LOGIN,
                    method: 'POST',
                    body: data,
                };
            },
        }),
        logout: builder.mutation<boolean, void>({
            query: () => {
                return {
                    url: apis.AUTH_LOGOUT,
                    method: 'GET',
                };
            },
        }),
        profile: builder.query<User, void>({
            query: () => ({
                url: apis.AUTH_PROFILE,
                method: 'GET',
            }),
            transformResponse: (data: any) => {
                if (data && data.status === HttpStatus.UNAUTHORIZED) {
                    return null;
                }
                return data;
            },
        }),
        sites: builder.query<SiteListResponse, Record<string, any>>({
            query: (qeury = {}) => {
                return {
                    url: `${apis.SITES_PROFILE}?${stringify(qeury)}`,
                    method: 'GET',
                };
            },
            transformResponse: (data: any) => {
                console.log('sites', data);
                if (data && data.status === HttpStatus.UNAUTHORIZED) {
                    return null;
                }
                return data;
            },
        }),
        counts: builder.query<any, void>({
            query: () => ({
                url: apis.COUNTS_PROFILE,
                method: 'GET',
            }),
            transformResponse: (data: any) => {
                if (data && data.status === HttpStatus.UNAUTHORIZED) {
                    return null;
                }
                return data;
            },
        }),
        like: builder.mutation<boolean, LikeParam>({
            query: (data) => {
                return {
                    url: apis.TOOLS_LIKE,
                    method: 'PATCH',
                    body: data,
                };
            },
        }),
    }),
});

export const {
    useLoginMutation,
    useLikeMutation,
    useProfileQuery,
    useCountsQuery,
    useSitesQuery,
    useLogoutMutation,
} = authApi;
export const { profile, counts, sites, like, logout } = authApi.endpoints;
