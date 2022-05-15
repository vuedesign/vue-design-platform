import { AxiosInstance, AxiosRequestConfig } from 'axios';

export type FnCallback<T> = (config: T) => T;
export type HttpRequestSuccess =
    | FnCallback<AxiosRequestConfig>
    | AxiosRequestConfig;
export type HttpRequestFailure = FnCallback<any> | any;
export type HttpResponseSuccess = FnCallback<any> | any;
export type HttpResponseFailure = FnCallback<any> | any;

export interface Interceptors {
    isTimestampDisabled: boolean;
    httpRequestSuccess?: HttpRequestSuccess;
    httpRequestFailure?: HttpRequestFailure;
    httpResponseSuccess?: HttpResponseSuccess;
    httpResponseFailure?: HttpResponseFailure;
    onGlobalConfigCallback: (http: AxiosInstance) => void;
}

const interceptors: Interceptors = Object.create({
    isTimestampDisabled: false,
});

export const onHttpRequestSuccess = (
    fn?: FnCallback<AxiosRequestConfig>,
): void => {
    // interceptors.httpRequestSuccess = (config: AxiosRequestConfig) => fn ? fn(config) : config;
    Object.assign(interceptors, {
        httpRequestSuccess: (config: AxiosRequestConfig) =>
            fn ? fn(config) : config,
    });
};

export const onHttpRequestFailure = (fn?: FnCallback<any>): void => {
    Object.assign(interceptors, {
        httpRequestFailure: (error: any) => (fn ? fn(error) : error),
    });
    // interceptors.httpRequestFailure = error => fn ? fn(error) : error;
};

export const onHttpResponseSuccess = (fn?: FnCallback<any>): void => {
    // interceptors.httpResponseSuccess = fn;
    // Object.assign(interceptors, {
    //     httpResponseSuccess: fn
    // });
    interceptors.httpResponseSuccess = (res) => (fn ? fn(res) : res);
};

export const onHttpResponseFailure = (fn?: FnCallback<any>): void => {
    Object.assign(interceptors, {
        httpResponseFailure: (error: any) => (fn ? fn(error) : error),
    });
    // interceptors.httpResponseFailure = error => fn ? fn(error) : error;
};

export const onRouterBeforeEach = (fn?: FnCallback<any>): void => {
    Object.assign(interceptors, {
        routerBeforeEach: (options: any) => (fn ? fn(options) : options),
    });
    // interceptors.routerBeforeEach = options => fn ? fn(options) : options;
};

export const onRouterAfterEach = (fn?: FnCallback<any>): void => {
    Object.assign(interceptors, {
        routerAfterEach: (options: any) => (fn ? fn(options) : options),
    });
    // interceptors.routerAfterEach = options => fn ? fn(options) : options;
};

export const onRouterBeforeResolve = (fn?: FnCallback<any>): void => {
    Object.assign(interceptors, {
        routerBeforeResolve: (options: any) => (fn ? fn(options) : options),
    });
    // interceptors.routerBeforeResolve = options => fn ? fn(options) : options;
};

export const onGlobalConfig = (fn: (http: AxiosInstance) => void): void => {
    interceptors.onGlobalConfigCallback = fn;
};
export default interceptors;
