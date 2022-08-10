import axios from 'axios';
import {
  SUCCESS_STATUS_CODE,
  ERROR_STATUS_CODE,
  TOKEN_KEY,
} from './globals.contants';
import * as HttpStatus from './http.contants';

const baseURL =
  typeof window !== 'undefined'
    ? 'http://127.0.0.1:8083/api/v1'
    : 'http://127.0.0.1:8083/api/v1';
const instance = axios.create({
  baseURL,
});
instance.defaults.timeout = 5000;

instance.interceptors.request.use(
  (config) => {
    console.log('config', config);
    // if (window && window.localStorage) {
    //   const token = window.localStorage.getItem(TOKEN_KEY);
    //   if (token) {
    //     Object.assign(config, {
    //       headers: {
    //         common: {
    //           Authorization: token,
    //         },
    //       },
    //     });
    //   }
    // }
    return config;
  },
  (error) => {
    // Do something with request error
    return Promise.reject(error);
  },
);

instance.interceptors.response.use(
  (response) => {
    // console.log('response.data', response);
    // if (response.data && response.data.retcode === SUCCESS_STATUS_CODE) {
    //   return response.data;
    // } else if (response.data && response.data.retcode === ERROR_STATUS_CODE) {
    //   if (response.data.data.status === HttpStatus.UNAUTHORIZED) {
    //     return {
    //       error: response.data.data,
    //     };
    //   }
    //   return response.data;
    // }
    return response.data;
  },
  (error) => {
    return Promise.reject(error);
  },
);

export default instance;
