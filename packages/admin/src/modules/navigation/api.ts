import { http } from '@/core';
import { UserList, UserItem } from './useNavigationStore';

export type PromiseList<T> = Promise<{
    list: T;
    total: number;
}>;

export function findData(params = {}): PromiseList<UserList> {
    return http.get('/api/v1/navigations', { params });
}

export function findOneData(id: number): Promise<UserItem> {
    return http.get(`/api/v1/navigations/${id}`);
}

export function updateFieldData(id: number, data: Record<string, any>) {
    return http.patch(`/api/v1/navigations/${id}`, data);
}

export function createData(data: Record<string, any>) {
    return http.post(`/api/v1/navigations`, data);
}

export function updateData(data: Record<string, any>) {
    return http.put(`/api/v1/users/${data.id}`, data);
}

export function destroyData(id: number) {
    return http.delete(`/api/v1/users/${id}`);
}
