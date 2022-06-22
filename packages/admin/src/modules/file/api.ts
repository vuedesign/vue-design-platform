import { http } from '@/core';
import { FileItem } from './useFileStore';

export type PromiseList<T> = Promise<{
    list: T;
    total: number;
}>;

export function findData(params = {}): PromiseList<FileItem[]> {
    return http.get('/api/v1/files', { params });
}

export function findOneData(id: number): Promise<FileItem> {
    return http.get(`/api/v1/files/${id}`);
}

export function updateFieldData(id: number, data: Record<string, any>) {
    return http.patch(`/api/v1/files/${id}`, data);
}

export function createData(data: Record<string, any>) {
    return http.post(`/api/v1/files`, data);
}

export function updateData(data: Record<string, any>) {
    return http.put(`/api/v1/files/${data.id}`, data);
}

export function destroyData(id: number) {
    return http.delete(`/api/v1/files/${id}`);
}
