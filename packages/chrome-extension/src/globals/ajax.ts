import axios from 'axios';

const API_PREFIX = 'http://localhost:3000/api/v1';

const instance = axios.create({
    // headers: { 'Content-Type': 'multipart/form-data' }, //响应头部
    baseURL: API_PREFIX,
    timeout: 10000,
});

type LocalGetCallback = () => void;

instance.interceptors.request.use(
    function (config) {
        return config;
    },
    function (error) {
        return Promise.reject(error);
    },
);

instance.interceptors.response.use(
    function (response) {
        console.log('response', response);
        if (response.data.retcode === 0) {
            return response.data.data;
        } else if (response.data.retcode === 1) {
            chrome.storage.local.remove('token');
            return response.data;
        }
        return response.data;
    },
    function (error) {
        return Promise.reject(error);
    },
);

function setAuthorization(token: string) {
    instance.defaults.headers.common['Authorization'] = `Bearer ${token}`;
}

let onExtensionCallback: LocalGetCallback;
export const onExtensionReady = (callback: LocalGetCallback) => {
    callback && (onExtensionCallback = callback);
};

function localGetToken() {
    chrome.storage.local.get('token', ({ token }: { token: string }) => {
        setAuthorization(token);
        onExtensionCallback && onExtensionCallback();
    });
}

try {
    localGetToken();
    chrome.storage.onChanged.addListener((changes, namespace) => {
        if (namespace === 'local') {
            localGetToken();
        }
    });
} catch (error) {}

export default instance;
