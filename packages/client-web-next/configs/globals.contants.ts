import { isServer } from '@/modules/utils';

export const SUCCESS_STATUS_CODE = 0;
export const ERROR_STATUS_CODE = 1;
export const TOKEN_KEY = 'VUE_DESIGN_TOKEN';
export const baseURL = isServer ? 'http://127.0.0.1:8083/api/v1' : '/api/v1';
