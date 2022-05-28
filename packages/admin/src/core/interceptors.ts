import { AxiosRequestConfig } from 'axios';
import {
    RouteLocationNormalized,
    NavigationGuardNext,
    NavigationFailure,
} from 'vue-router';
import { App } from 'vue';

export type FnCallback<T> = (config: T) => T;
export type RouterFnCallback<T> = (options: T) => void;
export type HttpRequestSuccess = FnCallback<AxiosRequestConfig>;

export interface HttpResponseSuccessOptions {
    retcode: number | string;
    data: any;
    message: string;
}

export type HttpRequestFailure = FnCallback<never | Promise<never>> | never;

export type HttpResponseSuccess = (
    data: HttpResponseSuccessOptions,
) => HttpResponseSuccess | HttpResponseSuccessOptions;

export type HttpResponseFailure = FnCallback<never | Promise<never>> | never;

export type RouterBeforeEachOptions = {
    from: RouteLocationNormalized;
    to: RouteLocationNormalized;
    next: NavigationGuardNext;
};
export type RouterBeforeEach = ({
    from,
    to,
    next,
}: RouterBeforeEachOptions) => void;

export type RouterAfterEachOptions = {
    from: RouteLocationNormalized;
    to: RouteLocationNormalized;
    failure: NavigationFailure | void | undefined;
};

export type RouterAfterEach = ({
    from,
    to,
    failure,
}: RouterAfterEachOptions) => void;

export interface Interceptors {
    isTimestampDisabled: boolean;
    httpRequestSuccess?: HttpRequestSuccess;
    httpRequestFailure?: HttpRequestFailure;
    httpResponseSuccess?: HttpResponseSuccess;
    httpResponseFailure?: HttpResponseFailure;
    routerBeforeEach?: RouterBeforeEach;
    routerAfterEach?: RouterAfterEach;
    routerBeforeResolve?: RouterBeforeEach;
    install: (app: App) => void;
    onGlobalConfigCallback: (context: Record<string, any>) => void;
}

const interceptors: Interceptors = Object.create({
    isTimestampDisabled: false,
});

export const onHttpRequestSuccess = (fn?: HttpRequestSuccess): void => {
    interceptors.httpRequestSuccess = (config) => {
        return fn ? fn(config) : config;
    };
};

export const onHttpRequestFailure = (fn?: HttpRequestFailure): void => {
    interceptors.httpRequestFailure = (error) => (fn ? fn(error) : error);
};

export const onHttpResponseSuccess = (fn?: HttpResponseSuccess): void => {
    interceptors.httpResponseSuccess = (res) => (fn ? fn(res) : res);
};

export const onHttpResponseFailure = (fn?: HttpResponseFailure): void => {
    interceptors.httpResponseFailure = (error) => (fn ? fn(error) : error);
};

export const onRouterBeforeEach = (fn?: RouterBeforeEach): void => {
    interceptors.routerBeforeEach = (options) => {
        fn && fn(options);
    };
};

export const onRouterAfterEach = (fn?: RouterAfterEach): void => {
    interceptors.routerAfterEach = (options) => {
        fn && fn(options);
    };
};

export const onRouterBeforeResolve = (fn?: RouterBeforeEach): void => {
    interceptors.routerBeforeResolve = (options) => {
        fn && fn(options);
    };
};

export const onGlobalConfig = (
    fn: (context: Record<string, any>) => void,
): void => {
    interceptors.onGlobalConfigCallback = fn;
};

export function createInterceptors(): Interceptors {
    interceptors.install = (app) => {
        app.config.globalProperties.$interceptors = interceptors;
        interceptors.onGlobalConfigCallback &&
            interceptors.onGlobalConfigCallback(app.config.globalProperties);
    };
    return interceptors;
}
