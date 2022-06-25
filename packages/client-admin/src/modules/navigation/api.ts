import { http } from '@/core';
import { UpdateResult } from 'typeorm';
import {
    NavigationList,
    NavigationItem,
    NavigationListFilter,
} from './useNavigationStore';

export type PromiseList<T> = Promise<{
    list: T;
    total: number;
}>;

export function findData(
    params: NavigationListFilter,
): PromiseList<NavigationList> {
    return http.get('/api/v1/navigations', { params });
}

export function findOneData(id: number): Promise<NavigationItem> {
    return http.get(`/api/v1/navigations/${id}`);
}

export function findOneBySiteIdData(siteId: number): Promise<boolean> {
    return http.get(`/api/v1/navigations/site/${siteId}`);
}

export function updateFieldData(
    id: number,
    data: Record<string, any>,
): Promise<UpdateResult> {
    return http.patch(`/api/v1/navigations/${id}`, data);
}

export function createData(data: NavigationItem): Promise<UpdateResult> {
    return http.post(`/api/v1/navigations`, data);
}

export function updateData(data: NavigationItem): Promise<UpdateResult> {
    return http.put(`/api/v1/navigations/${data.id}`, data);
}

export function destroyData(id: number): Promise<UpdateResult> {
    return http.delete(`/api/v1/navigations/${id}`);
}
