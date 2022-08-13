import axios, { AxiosRequestConfig, AxiosError } from 'axios';
import { TOKEN_KEY } from './globals.contants';
import * as HttpStatus from './http.contants';
import { BaseQueryFn } from '@reduxjs/toolkit/query/react';
import type { ThunkDispatch } from '@reduxjs/toolkit';

export interface BaseQueryApi {
  dispatch: ThunkDispatch<any, any, any>;
  getState: () => unknown;
  extra: unknown;
  endpoint: string;
  type: 'query' | 'mutation';
  forced?: boolean;
}

type MaybePromise<T> = T | PromiseLike<T>;
type FetchBaseQueryArgs = {
  baseUrl?: string;
  prepareHeaders?: (
    headers: Headers,
    api: Pick<
      BaseQueryApi,
      'getState' | 'extra' | 'endpoint' | 'type' | 'forced'
    >,
  ) => MaybePromise<Headers>;
  fetchFn?: (
    input: RequestInfo,
    init?: RequestInit | undefined,
  ) => Promise<Response>;
  paramsSerializer?: (params: Record<string, any>) => string;
} & RequestInit;

export const axiosBaseQuery =
  (
    options?: FetchBaseQueryArgs,
  ): BaseQueryFn<
    {
      url: string;
      method: AxiosRequestConfig['method'];
      data?: AxiosRequestConfig['data'];
    },
    unknown,
    unknown
  > =>
  async ({ url, method, data }, context) => {
    try {
      let headers = new Headers();
      if (options && options.prepareHeaders) {
        headers = await options.prepareHeaders(headers, context);
      }

      const baseURL =
        typeof window !== 'undefined'
          ? '/api/v1'
          : 'http://127.0.0.1:8083/api/v1';
      const instance = axios.create({
        baseURL,
      });
      instance.defaults.timeout = 5000;

      instance.interceptors.request.use(
        (config) => {
          // console.log('config', config);
          let token: string = '';
          if (typeof window === 'undefined') {
            console.log('interceptors server');
            token = headers.get('Authorization') || '';
          } else {
            console.log('interceptors client');
            token = window.localStorage.getItem(TOKEN_KEY) || '';
          }

          if (token) {
            Object.assign(config, {
              headers: {
                common: {
                  Authorization: token,
                },
              },
            });
          }

          return config;
        },
        (error) => {
          return Promise.reject(error);
        },
      );

      instance.interceptors.response.use(
        (response) => {
          if (
            response.data &&
            response.data.status === HttpStatus.UNAUTHORIZED
          ) {
            return null;
          }
          return response.data;
        },
        (error) => {
          return Promise.reject(error);
        },
      );
      const result = await instance({ url, method, data });

      return { data: result };
    } catch (axiosError) {
      const err = axiosError as AxiosError;
      console.log('err', err);
      return {
        error: { status: err.response?.status, data: err.response?.data },
      };
    }
  };
