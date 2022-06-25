import { http } from '@/core';
import { UpdateResult } from 'typeorm';
import { UserList, UserItem } from './useUserStore';

export type PromiseList<T> = Promise<{
    list: T;
    total: number;
}>;

export function findData(params = {}): PromiseList<UserList> {
    return http.get('/api/v1/users', { params });
}

export function findOneData(id: number): Promise<UserItem> {
    return http.get(`/api/v1/users/${id}`);
}

export function updateFieldData(
    id: number,
    data: Record<string, any>,
): Promise<UpdateResult> {
    return http.patch(`/api/v1/users/${id}`, data);
}

export function createData(data: UserItem) {
    return http.post(`/api/v1/users`, data);
}

export function updateData(data: UserItem): Promise<UpdateResult> {
    return http.put(`/api/v1/users/${data.id}`, data);
}

export function destroyData(id: number) {
    return http.delete(`/api/v1/users/${id}`);
}
