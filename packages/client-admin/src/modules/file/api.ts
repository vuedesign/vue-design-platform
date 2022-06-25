import { http } from '@/core';
import { FileItem } from './useFileStore';
import { UpdateResult } from 'typeorm';

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

export function updateFieldData(
    id: number,
    data: Record<string, any>,
): Promise<UpdateResult> {
    return http.patch(`/api/v1/files/${id}`, data);
}

export function updateData(data: Record<string, any>): Promise<UpdateResult> {
    return http.put(`/api/v1/files/${data.id}`, data);
}

export function destroyData(id: number): Promise<UpdateResult> {
    return http.delete(`/api/v1/files/${id}`);
}
