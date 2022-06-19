import {
    router,
    onHttpRequestSuccess,
    onHttpRequestFailure,
    onHttpResponseSuccess,
    onHttpResponseFailure,
    onRouterBeforeEach,
    onRouterAfterEach,
    onRouterBeforeResolve,
    onGlobalConfig,
} from '@/core';
import { storeToRefs } from 'pinia';
import { SUCCESS_STATUS_CODE } from './constants';
import { useGlobalStore } from '@/modules/global/useGlobalStore';

// 拦截器配置
onGlobalConfig((context) => {
    // 时间戳注入开关
    context.isTimestampDisabled = false;
    const globalStore = useGlobalStore();
    const { token } = storeToRefs(globalStore);
    if (token.value) {
        context.$http.setAuthorization(`Bearer ${token.value}`);
    }
});

// 请求成功
onHttpRequestSuccess((config) => config);

// 请求失败
onHttpRequestFailure((error) => Promise.reject(error));

// 返回成功
onHttpResponseSuccess((response) => {
    console.log('response', response);
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
onHttpResponseFailure((error) => Promise.reject(error));

// 路由进入之前
onRouterBeforeEach(({ next, to }) => {
    if (to.name === 'home') {
        const globalStore = useGlobalStore();
        globalStore.resetActive(to.name);
        globalStore.resetBreadcrumb();
    }
    next();
});

// 路由进入之后
onRouterAfterEach(() => {
    console.warn('路由进入之后');
});

onRouterBeforeResolve(({ next }) => {
    next();
});
