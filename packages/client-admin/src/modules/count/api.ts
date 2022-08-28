import { http } from '@/core';
import { CountList, CountItem } from './useCountStore';

export type PromiseList<T> = Promise<{
    list: T;
    total: number;
}>;

export function findData(params = {}): PromiseList<CountList> {
    return http.get('/api/v1/counts', { params });
}

export function findOneData(id: number): Promise<CountItem> {
    return http.get(`/api/v1/counts/${id}`);
}

export function updateFieldData(id: number, data: Record<string, any>) {
    return http.patch(`/api/v1/counts/${id}`, data);
}

export function createData(data: Record<string, any>) {
    return http.post(`/api/v1/counts`, data);
}

export function updateData(data: Record<string, any>) {
    return http.put(`/api/v1/counts/${data.id}`, data);
}

export function destroyData(id: number) {
    return http.delete(`/api/v1/counts/${id}`);
}
