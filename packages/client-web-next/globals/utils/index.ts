export const isServer = typeof window === 'undefined';
export const isClient = typeof window !== 'undefined';

export function getUuid(uuid?: string | string[]) {
    if (!uuid || uuid === 'string') {
        return '';
    }
    if (Array.isArray(uuid)) {
        return uuid[0];
    }
    return uuid;
}

export function getParamsByContext<C extends Record<string, any>>(
    context: C,
    filed: string,
): string {
    let params = new URLSearchParams(context.params);
    if (!filed || !params.has(filed)) {
        return '';
    }
    if (params.has(filed) && params.get(filed) === 'string') {
        const referrer =
            context.req.headers.referrer || context.req.headers.referer;
        const uuid = referrer.match(
            /([0-9a-f]{8}(-[0-9a-f]{4}){3}-[0-9a-f]{12})/gi,
        );
        if (!uuid) {
            return '';
        }
        return uuid[0];
    }
    return params.get(filed) || '';
}

export type BufferJSON = {
    type: 'Buffer';
    data: number[];
};

export function encrypt(
    data: string,
    publicKeyJSON?: BufferJSON,
): string | false {
    if (typeof window === 'undefined' || !publicKeyJSON) {
        return '';
    }
    const { JSEncrypt } = require('jsencrypt');
    const publicKey = Buffer.from(publicKeyJSON?.data || []).toString();
    const encrypt = new JSEncrypt();
    encrypt.setPublicKey(publicKey);
    const encrypted = encrypt.encrypt(data);
    return encrypted;
}

export function diffObject(
    cacheData: Record<string, any>,
    data: Record<string, any>,
) {
    return Object.keys(data).every((key) => data[key] === cacheData[key]);
}
