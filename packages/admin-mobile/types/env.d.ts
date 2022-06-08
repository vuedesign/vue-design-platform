/// <reference types="vite/client" />

import { AxiosInstance } from 'axios';
import { Canvas } from 'fabric/fabric-impl';
import { Router } from 'vue-router';
declare module '@/core' {
    export const http: AxiosInstance;
    export const router: Router;
    export const setAuthorization: (a: string) => void;
}

declare module '@/core/interceptors';

declare global {
    interface Window {
         __editor__: undefined | Canvas;
    }
}

export {};
