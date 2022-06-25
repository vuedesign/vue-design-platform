import { http } from '@/core';
import { Profile, LoginFormData } from './useGlobalStore';

export function findProfileData(): Promise<Profile> {
    return http.get('/api/v1/auth/profile');
}

export function loginData(data: LoginFormData): Promise<{ token: string }> {
    return http.post('/api/v1/auth/login', data);
}

export function logoutData(): Promise<boolean> {
    return http.get('/api/v1/auth/logout');
}
