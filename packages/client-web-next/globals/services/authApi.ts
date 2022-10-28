import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { HYDRATE } from 'next-redux-wrapper';
import { baseURL } from '@/configs/globals.contants';
import * as apis from '@/configs/apis.contants';
import * as HttpStatus from '@/configs/http.contants';
import type {
    UserResponse,
    LoginRequest,
    User,
    SiteListResponse,
    LikeParam,
    BufferJSON,
} from '@/globals/types';
import { stringify } from 'qs';
import { Tool } from '../types';
import prepareHeaders from '@/globals/utils/prepareHeaders';

export const authApi = createApi({
    reducerPath: 'authApi',
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
        publicKey: builder.mutation<BufferJSON, void>({
            query: () => {
                return {
                    url: apis.AUTH_PUBLIC_KEY,
                    method: 'GET',
                };
            },
        }),
        login: builder.mutation<UserResponse, LoginRequest>({
            query: (body) => {
                return {
                    url: apis.AUTH_LOGIN,
                    method: 'POST',
                    body,
                };
            },
        }),
        register: builder.mutation<UserResponse, LoginRequest>({
            query: (body) => {
                return {
                    url: apis.AUTH_REGISTER,
                    method: 'POST',
                    body,
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
        profile: builder.query<User | null, void>({
            query: () => ({
                url: apis.AUTH_PROFILE,
                method: 'GET',
            }),
        }),
        updateProfile: builder.mutation<User | null, Partial<User>>({
            query: (body) => ({
                url: apis.AUTH_PROFILE,
                method: 'PUT',
                body,
            }),
        }),
        sites: builder.query<SiteListResponse, Record<string, any>>({
            query: (qeury = {}) => {
                return {
                    url: `${apis.SITES_PROFILE}?${stringify(qeury)}`,
                    method: 'GET',
                };
            },
        }),
        counts: builder.query<any, void>({
            query: () => ({
                url: apis.COUNTS_PROFILE,
                method: 'GET',
            }),
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
        tool: builder.query<Tool | null, number | undefined>({
            query: (siteId: number) => {
                return {
                    url: `${apis.TOOLS}/${siteId}`,
                    method: 'GET',
                };
            },
        }),
    }),
});

export const {
    useLoginMutation,
    usePublicKeyMutation,
    useRegisterMutation,
    useLogoutMutation,
    useLikeMutation,
    useProfileQuery,
    useUpdateProfileMutation,
    useCountsQuery,
    useSitesQuery,
    useToolQuery,
} = authApi;
export const {
    profile,
    counts,
    sites,
    like,
    logout,
    publicKey,
    tool,
    updateProfile,
} = authApi.endpoints;
