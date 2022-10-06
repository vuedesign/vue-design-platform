import { http } from '@/core';
import { UpdateResult } from 'typeorm';
import { ConfigList, ConfigItem } from './useConfigStore';

export type PromiseList<T> = Promise<{
    list: T;
    total: number;
}>;

export function findData(params = {}): PromiseList<ConfigList> {
    return http.get('/api/v1/configs', { params });
}

export function findOneData(id: number): Promise<ConfigItem> {
    return http.get(`/api/v1/configs/${id}`);
}

export function updateFieldData(
    id: number,
    data: Record<string, any>,
): Promise<UpdateResult> {
    return http.patch(`/api/v1/configs/${id}`, data);
}

export function createData(data: ConfigItem) {
    return http.post(`/api/v1/configs`, data);
}

export function updateData({
    id,
    ...otherData
}: ConfigItem): Promise<UpdateResult> {
    return http.put(`/api/v1/configs/${id}`, otherData);
}

export function destroyData(id: number) {
    return http.delete(`/api/v1/configs/${id}`);
}
