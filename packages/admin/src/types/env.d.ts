import { Ref } from 'vue';
/// <reference types="vite/client" />

import { AxiosInstance } from 'axios';
import { Router } from 'vue-router';
declare module '@/core' {
    export const http: AxiosInstance;
    export const router: Router;
    export const setAuthorization: (a: string) => void;
}

declare module '@/core/interceptors';

declare module '@/utils/useTable' {
    const useTableMaxHeight: Ref<number>;
}

export {};
