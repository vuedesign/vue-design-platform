import { http } from '@/core';
import { SiteList, SiteItem } from './useSiteStore';
import { UpdateResult } from 'typeorm';
import { UpdateFieldParmas } from '@/types/globals';

export type PromiseList<T> = Promise<{
    list: T;
    total: number;
}>;

export function findData(params = {}): PromiseList<SiteList> {
    return http.get('/api/v1/sites', { params });
}

export function findOneData(id: number): Promise<SiteItem> {
    return http.get(`/api/v1/sites/${id}`);
}

export function updateFieldData(
    id: number,
    data: Partial<UpdateFieldParmas>,
): Promise<UpdateResult> {
    return http.patch(`/api/v1/sites/${id}`, data);
}

export function createData(data: SiteItem): Promise<UpdateResult> {
    return http.post(`/api/v1/sites`, data);
}

export function updateData(data: SiteItem): Promise<UpdateResult> {
    return http.put(`/api/v1/sites/${data.id}`, data);
}

export function destroyData(id: number): Promise<UpdateResult> {
    return http.delete(`/api/v1/sites/${id}`);
}
