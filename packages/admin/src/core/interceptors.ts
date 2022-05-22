import { AxiosRequestConfig } from 'axios';
import { NavigationGuard } from 'vue-router';

export type FnCallback<T> = (config: T) => T;
export type HttpRequestSuccess =
    | FnCallback<AxiosRequestConfig>
    | AxiosRequestConfig;
export type HttpRequestFailure = FnCallback<any> | any;
export type HttpResponseSuccess = FnCallback<any> | any;
export type HttpResponseFailure = FnCallback<any> | any;
export type RouterBeforeEach = FnCallback<any> | any;

export interface Interceptors {
    isTimestampDisabled: boolean;
    httpRequestSuccess?: HttpRequestSuccess;
    httpRequestFailure?: HttpRequestFailure;
    httpResponseSuccess?: HttpResponseSuccess;
    httpResponseFailure?: HttpResponseFailure;
    routerBeforeEach?: RouterBeforeEach;
    install: (app: App) => void;
    onGlobalConfigCallback: (context: Record<string, any>) => void;
}

const interceptors: Interceptors = Object.create({
    isTimestampDisabled: false,
});

export const onHttpRequestSuccess = (
    fn?: FnCallback<AxiosRequestConfig>,
): void => {
    Object.assign(interceptors, {
        httpRequestSuccess: (config: AxiosRequestConfig) =>
            fn ? fn(config) : config,
    });
};

export const onHttpRequestFailure = (fn?: FnCallback<any>): void => {
    Object.assign(interceptors, {
        httpRequestFailure: (error: any) => (fn ? fn(error) : error),
    });
};

export const onHttpResponseSuccess = (fn?: FnCallback<any>): void => {
    Object.assign(interceptors, {
        httpResponseSuccess: (res) => (fn ? fn(res) : res),
    });
};

export const onHttpResponseFailure = (fn?: FnCallback<any>): void => {
    Object.assign(interceptors, {
        httpResponseFailure: (error: any) => (fn ? fn(error) : error),
    });
};

export const onRouterBeforeEach = (fn?: FnCallback<NavigationGuard>): void => {
    Object.assign(interceptors, {
        routerBeforeEach: (options: NavigationGuard) => {
            return fn ? fn(options) : options;
        },
    });
};

export const onRouterAfterEach = (fn?: FnCallback<NavigationGuard>): void => {
    Object.assign(interceptors, {
        routerAfterEach: (options: NavigationGuard) =>
            fn ? fn(options) : options,
    });
};

export const onRouterBeforeResolve = (
    fn?: FnCallback<NavigationGuard>,
): void => {
    Object.assign(interceptors, {
        routerBeforeResolve: (options: NavigationGuard) =>
            fn ? fn(options) : options,
    });
};

export const onGlobalConfig = (
    fn: (context: Record<string, any>) => void,
): void => {
    interceptors.onGlobalConfigCallback = fn;
};

export default () => {
    interceptors.install = (app) => {
        app.config.globalProperties.$interceptors = interceptors;
        interceptors.onGlobalConfigCallback &&
            interceptors.onGlobalConfigCallback(app.config.globalProperties);
    };
    return interceptors;
};
