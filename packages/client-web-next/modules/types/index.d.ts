export * from './globals';
export * from './auth';
export * from './count';
export * from './navigation';
export * from './site';
export * from './tag';
export * from './tool';

export interface DataResponse<D, E = null> {
    data: D;
    error: E;
}
