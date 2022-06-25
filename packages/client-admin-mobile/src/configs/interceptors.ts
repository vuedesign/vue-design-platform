import { router, setAuthorization } from '@/core';
import { storeToRefs } from 'pinia';
import { SUCCESS_STATUS_CODE } from './constants';
import {
    onGlobalConfig,
    onHttpRequestSuccess,
    onHttpRequestFailure,
    onHttpResponseSuccess,
    onHttpResponseFailure,
    onRouterBeforeEach,
    onRouterAfterEach,
    onRouterBeforeResolve,
} from '@/core/interceptors';
import useGlobalStore from '../modules/globals/useGlobalStore';

type Config = Record<string, any>;

// 拦截器配置
onGlobalConfig((config: Config) => {
    // 时间戳注入开关
    config.isTimestampDisabled = false;
    const globalStore = useGlobalStore();
    const { token } = storeToRefs(globalStore);
    console.log('token', token);
    if (token.value) {
        setAuthorization(`Bearer ${token.value}`);
    }
});

// 请求成功
onHttpRequestSuccess((config: Config) => config);

// 请求失败
onHttpRequestFailure((error: any) => Promise.reject(error));

// 返回成功
onHttpResponseSuccess((response: Config) => {
    if (response.retcode === SUCCESS_STATUS_CODE) {
        return response.data;
    } else if (response.retcode === 1 && response.data.status === 401) {
        router.push({
            name: 'login',
        });
        return;
    }
    return Promise.reject(response);
});

// 返回失败
onHttpResponseFailure((error: any) => Promise.reject(error));

// 路由进入之前
onRouterBeforeEach(({ next }) => {
    next();
});

// 路由进入之后
onRouterAfterEach(() => {
    console.warn('路由进入之后');
});

onRouterBeforeResolve(({ next }) => {
    next();
});
