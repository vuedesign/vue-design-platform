import axios, { AxiosInstance, AxiosRequestConfig } from 'axios';
import { HttpSetAuthorizationKey, HttpKey } from './keys';

let instance: AxiosInstance = axios;

export function setAuthorization(Authorization: string): void {
    instance.defaults.headers.common['Authorization'] = Authorization;
}

/**
 * 在api请求时注入时间戳
 * @param config
 */
function injectionTimestamp(config: AxiosRequestConfig) {
    const timestamp = new Date().getTime();
    const { params = {} } = config;
    Object.assign(params, {
        timestamp,
    });
}

export default (interceptors: any) => {
    console.log(
        'import.meta.env.VITE_API_BASE_URL',
        import.meta.env.VITE_API_BASE_URL,
    );
    instance = axios.create({
        baseURL:
            import.meta.env.VITE_API_BASE_URL || interceptors.baseURL || '',
    });

    const requestSuccess = (config: AxiosRequestConfig) => {
        // 在 interceptors.js 关闭时间戳注入
        // export const isTimestampDisabled = false;
        if (!interceptors.isTimestampDisabled) {
            injectionTimestamp(config);
        }
        if (interceptors.httpRequestSuccess) {
            return interceptors.httpRequestSuccess(config);
        }
        return config;
    };
    const requestError = (error: Error) => {
        if (interceptors.httpRequestFailure) {
            return interceptors.httpRequestFailure(error);
        }
        return Promise.reject(error);
    };
    const responseSuccess = (response: { data: Record<string, any> }) => {
        if (interceptors.httpResponseSuccess) {
            return interceptors.httpResponseSuccess(response.data);
        }
        return response.data;
    };
    const responseError = (error: Error) => {
        if (interceptors.httpResponseFailure) {
            return interceptors.httpResponseFailure(error);
        }
        return Promise.reject(error);
    };

    instance.interceptors.request.use(requestSuccess, requestError);
    instance.interceptors.response.use(responseSuccess, responseError);
    instance.install = (app, context) => {
        app.config.globalProperties.$http = instance;
        app.config.globalProperties.$setAuthorization = setAuthorization;
        app.provide(HttpKey, instance);
        app.provide(HttpSetAuthorizationKey, setAuthorization);
    };
    return instance;
};
