import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { baseURL } from '@/configs/globals.contants';
import * as apis from '@/configs/apis.contants';
import { TagListResponse, TagItem } from '@/globals/types';
import prepareHeaders from '@/globals/utils/prepareHeaders';

export const tagApi = createApi({
    reducerPath: 'tagApi',
    baseQuery: fetchBaseQuery({
        baseUrl: baseURL,
        prepareHeaders,
    }),
    endpoints: (builder) => ({
        tags: builder.query<TagListResponse, void>({
            query: () => {
                return {
                    url: apis.TAGS,
                    method: 'get',
                };
            },
        }),
        tag: builder.query<TagItem, number | undefined>({
            query: (id?: number) => {
                return {
                    url: `${apis.TAGS}/${id}`,
                    method: 'get',
                };
            },
        }),
    }),
});

export const { useTagQuery, useTagsQuery } = tagApi;
export const { tag, tags } = tagApi.endpoints;
