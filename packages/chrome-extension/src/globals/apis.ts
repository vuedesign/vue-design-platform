import ajax from './ajax';

export function loginData(data: Record<string, any> = {}) {
    return ajax.post('/auth/login', data);
}

export function profileData(options: Record<string, any> = {}) {
    return ajax.get('/auth/profile', options);
}

export function registerData(data: Record<string, any> = {}) {
    return ajax.post('/auth/register', data);
}
