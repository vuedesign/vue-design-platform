import { isServer } from '@/globals/utils';
export const SUCCESS_STATUS_CODE = 0;
export const ERROR_STATUS_CODE = 1;
export const TOKEN_KEY = 'VUE_DESIGN_TOKEN';
export const baseURL = isServer ? 'http://127.0.0.1:8083/api/v1' : '/api/v1';

export type TypeItem = {
    value: string;
    label: string;
};
export const typeList: Array<TypeItem> = [
    {
        value: 'all',
        label: '全部',
    },
    {
        value: 'site',
        label: '网站',
    },
    {
        value: 'code',
        label: '代码',
    },
];
export const typeMap = new Map(
    typeList.map((item) => [item.value, item.label]),
);
