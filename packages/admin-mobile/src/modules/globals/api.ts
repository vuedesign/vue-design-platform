import { http } from '@/core';
import { Profile, Tag } from './useGlobalStore';

export function findProfileData(): Promise<Profile> {
    return http.get('/api/v1/auth/profile');
}

export function loginData(data): Promise<{ token: string }> {
    return http.post('/api/v1/auth/login', data);
}

export function findTagData(): Promise<Tag> {
    return http.get('/api/v1/tags');
}
