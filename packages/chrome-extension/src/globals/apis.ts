import ajax from './ajax';

type LoginResult = Promise<{
    token: string;
}>;

export function loginData<D, R>(data: D): Promise<R> {
    return ajax.post('/auth/login', data);
}

export function profileData<O, T>(options: O = {} as O): Promise<T> {
    return ajax.get('/auth/profile', options);
}

export function registerData<D, R>(data: D): Promise<R> {
    return ajax.post('/auth/register', data);
}

export function createSiteData<D, R>(data: D): Promise<R> {
    return ajax.post('/sites', data);
}

export function findSiteData<O, T>(options: O = {} as O): Promise<T> {
    return ajax.get('/sites', options);
}
