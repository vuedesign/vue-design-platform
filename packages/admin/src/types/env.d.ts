/// <reference types="vite/client" />
import type { Http } from '@vue-design/core';

declare module '@/core';
declare module '@/configs/routes';
declare module '@/configs/interceptors';
declare module '@/configs/constants';
declare module '@/utils/useTable';

declare module '@vue/runtime-core' {
    export interface ComponentCustomProperties {
        $http: Http;
    }
}

export {};
