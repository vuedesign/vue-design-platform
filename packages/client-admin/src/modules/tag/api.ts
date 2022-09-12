import { http } from '@/core';
import { UpdateResult } from 'typeorm';
import { TagList, TagItem } from './useTagStore';

export type PromiseList<T> = Promise<{
    list: T;
    total: number;
}>;

export function findData(params = {}): PromiseList<TagList> {
    return http.get('/api/v1/tags', { params });
}

export function findOneData(id: number): Promise<TagItem> {
    return http.get(`/api/v1/tags/${id}`);
}

export function updateFieldData(
    id: number,
    data: Record<string, any>,
): Promise<UpdateResult> {
    return http.patch(`/api/v1/tags/${id}`, data);
}

export function createData(data: TagItem) {
    return http.post(`/api/v1/tags`, data);
}

export function updateData(data: TagItem): Promise<UpdateResult> {
    return http.put(`/api/v1/tags/${data.id}`, data);
}

export function destroyData(id: number) {
    return http.delete(`/api/v1/tags/${id}`);
}
