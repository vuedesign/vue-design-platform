// import { RootState } from '@/modules/store';
export const isServer = typeof window === 'undefined';
import { TOKEN_KEY } from '@/configs/globals.contants';
export default function prepareHeaders(
    headers: Headers,
    { getState }: { getState: () => any },
) {
    let token = '';
    if (isServer) {
        token = getState().auth.token || '';
        const cookie = getState().global.cookie || '';
        cookie && headers.set('Cookie', cookie);
    } else {
        token = window.localStorage.getItem(TOKEN_KEY) || '';
    }
    if (token) {
        headers.set('Authorization', `Bearer ${token}`);
    }
    return headers;
}
