import { http } from '@/core';
import { ProjectList, ProjectItem } from './useProjectStore';

export type PromiseList<T> = Promise<{
    list: T;
    total: number;
}>;

export function findData(params = {}): PromiseList<ProjectList> {
    return http.get('/api/v1/projects', { params });
}

export function findOneData(id: number): Promise<ProjectItem> {
    return http.get(`/api/v1/projects/${id}`);
}

export function updateFieldData(id: number, data: Record<string, any>) {
    return http.patch(`/api/v1/projects/${id}`, data);
}

export function createData(data: Record<string, any>) {
    return http.post(`/api/v1/projects`, data);
}

export function updateData(data: Record<string, any>) {
    return http.put(`/api/v1/projects/${data.id}`, data);
}

export function destroyData(id: number) {
    return http.delete(`/api/v1/projects/${id}`);
}
